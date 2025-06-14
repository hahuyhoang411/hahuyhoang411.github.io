
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
  autoplay = true 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoplay) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && !shouldPlay) {
          // Delay autoplay slightly to ensure smooth loading
          setTimeout(() => setShouldPlay(true), 500);
        }
      },
      { threshold: 0.5 } // Play when 50% of video is visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, [autoplay, shouldPlay]);

  const embedUrl = `https://www.youtube.com/embed/${videoId}?${new URLSearchParams({
    ...(shouldPlay && autoplay ? { autoplay: '1' } : {}),
    mute: '1', // Required for autoplay to work in most browsers
    controls: '1',
    modestbranding: '1',
    rel: '0'
  })}`;

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
