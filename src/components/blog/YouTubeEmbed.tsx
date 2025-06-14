
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
  const [hasPlayed, setHasPlayed] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed && autoplay) {
          setIsVisible(true);
          setHasPlayed(true);
        }
      },
      { threshold: 0.5 }
    );

    if (iframeRef.current) {
      observer.observe(iframeRef.current);
    }

    return () => observer.disconnect();
  }, [hasPlayed, autoplay]);

  const embedUrl = `https://www.youtube.com/embed/${videoId}?${isVisible && autoplay ? 'autoplay=1&' : ''}mute=1&rel=0&modestbranding=1`;

  return (
    <div className="video-container my-8 text-center">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
        />
      </div>
      {caption && (
        <p className="video-caption text-sm text-gray-600 italic mt-2">
          {caption}
        </p>
      )}
    </div>
  );
};

export default YouTubeEmbed;
