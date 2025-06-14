
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
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('YouTubeEmbed loading with videoId:', videoId);
    
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

  // Use standard YouTube embed URL with minimal parameters
  const embedUrl = `https://www.youtube.com/embed/${videoId}?${new URLSearchParams({
    ...(shouldPlay && autoplay ? { autoplay: '1' } : {}),
    controls: '1',
    modestbranding: '1',
    rel: '0'
  })}`;

  const handleIframeError = () => {
    console.error('YouTube iframe failed to load for video:', videoId);
    setHasError(true);
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
            <p className="text-gray-600 mb-4">This video has embedding restrictions. You can watch it directly on YouTube.</p>
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

  return (
    <div ref={videoRef} className="video-container my-8">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
        <iframe
          src={embedUrl}
          title={title}
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onError={handleIframeError}
          onLoad={() => console.log('YouTube iframe loaded successfully')}
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
