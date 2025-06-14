
// Utility functions for processing markdown content

// Extract YouTube video ID from various YouTube URL formats
export const extractYouTubeId = (url: string): string | null => {
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&\n?#]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^&\n?#]+)/,
    /(?:https?:\/\/)?youtu\.be\/([^&\n?#]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([^&\n?#]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
};

// Process YouTube shortcodes in markdown content
export const processYouTubeEmbeds = (content: string): string => {
  // Pattern to match: [youtube](url "title" caption)
  const youtubePattern = /\[youtube\]\(([^)]+)(?:\s+"([^"]*)")?(?:\s+(.+))?\)/g;
  
  return content.replace(youtubePattern, (match, url, title, caption) => {
    const videoId = extractYouTubeId(url.trim());
    if (!videoId) return match; // Return original if can't extract ID
    
    const titleAttr = title ? ` title="${title.trim()}"` : '';
    const captionAttr = caption ? ` caption="${caption.trim()}"` : '';
    
    return `<YouTubeEmbed videoId="${videoId}"${titleAttr}${captionAttr} />`;
  });
};

// Clean frontmatter from content
export const cleanContent = (content: string): string => {
  // Remove frontmatter block
  const withoutFrontmatter = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
  
  // Process YouTube embeds
  return processYouTubeEmbeds(withoutFrontmatter);
};
