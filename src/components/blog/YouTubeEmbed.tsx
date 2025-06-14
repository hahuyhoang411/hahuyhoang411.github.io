
import React, { useEffect, useRef, useState } from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  caption?: string;
  autoplay?: boolean;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ 
  videoId, 
  title = "YouTube video", 
  caption,
  autoplay = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [embedAttempted, setEmbedAttempted] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    console.log('YouTubeEmbed loading with videoId:', videoId);
    
    // Check if video exists and is embeddable
    const checkVideoAvailability = async () => {
      try {
        const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
        if (!response.ok) {
          console.error('Video not available for embedding:', videoId);
          setHasError(true);
          return;
        }
        const data = await response.json();
        console.log('Video data:', data);
        setEmbedAttempted(true);
      } catch (error) {
        console.error('Error checking video availability:', error);
        setHasError(true);
      }
    };

    checkVideoAvailability();

    if (!autoplay) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && !shouldPlay) {
          setTimeout(() => setShouldPlay(true), 500);
        }
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, [autoplay, shouldPlay, videoId]);

  // Use standard YouTube embed URL with privacy-enhanced mode
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?${new URLSearchParams({
    ...(shouldPlay && autoplay ? { autoplay: '1' } : {}),
    controls: '1',
    modestbranding: '1',
    rel: '0',
    fs: '1',
    playsinline: '1'
  })}`;

  const handleIframeError = () => {
    console.error('YouTube iframe failed to load for video:', videoId);
    setHasError(true);
  };

  const handleIframeLoad = () => {
    console.log('YouTube iframe loaded successfully');
    
    // Additional check: listen for messages from the iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.youtube-nocookie.com' && event.origin !== 'https://www.youtube.com') {
        return;
      }
      
      console.log('YouTube iframe message:', event.data);
      
      // Check for error messages from YouTube
      if (event.data && typeof event.data === 'string') {
        if (event.data.includes('error') || event.data.includes('unavailable')) {
          console.error('YouTube playback error detected');
          setHasError(true);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  };

  // Fallback content if embedding fails
  if (hasError) {
    return (
      <div className="video-container my-8">
        <div className="relative w-full bg-gray-100 rounded-lg p-8 text-center" style={{ paddingBottom: '56.25%' }}>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="mb-4">
              <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Video Cannot Be Embedded</h3>
            <p className="text-gray-600 mb-4">This video has embedding restrictions or is not publicly available.</p>
            <a 
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Watch on YouTube
            </a>
          </div>
        </div>
        {caption && (
          <p className="video-caption text-sm text-gray-600 italic text-center mt-2">
            {caption}
          </p>
        )}
      </div>
    );
  }

  // Don't render iframe until we've checked availability
  if (!embedAttempted) {
    return (
      <div className="video-container my-8">
        <div className="relative w-full bg-gray-100 rounded-lg flex items-center justify-center" style={{ paddingBottom: '56.25%' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={videoRef} className="video-container my-8">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title={title}
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          onError={handleIframeError}
          onLoad={handleIframeLoad}
        />
      </div>
      {caption && (
        <p className="video-caption text-sm text-gray-600 italic text-center mt-2">
          {caption}
        </p>
      )}
    </div>
  );
};

export default YouTubeEmbed;
