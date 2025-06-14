
// Helper function to generate slug IDs (matches rehype-slug behavior)
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

// Helper function to process YouTube embeds in markdown content
export const processYouTubeEmbeds = (content: string): { content: string; embeds: Array<{ id: string; videoId: string; title?: string; caption?: string }> } => {
  const embeds: Array<{ id: string; videoId: string; title?: string; caption?: string }> = [];
  let embedCounter = 0;
  
  // More robust regex to handle various youtube tag formats
  const youtubeRegex = /<youtube\s+(?:videoId="([^"]+)"|videoId='([^']+)')(?:\s+(?:title="([^"]*)"|title='([^']*)'))?(?:\s+(?:caption="([^"]*)"|caption='([^']*)'))?[^>]*\/?>/g;
  
  const processedContent = content.replace(youtubeRegex, (match, videoId1, videoId2, title1, title2, caption1, caption2) => {
    const videoId = videoId1 || videoId2;
    const title = title1 || title2;
    const caption = caption1 || caption2;
    
    if (!videoId) return match; // Return original if no videoId found
    
    const embedId = `youtube-embed-${embedCounter++}`;
    embeds.push({ id: embedId, videoId, title, caption });
    return `<div data-youtube-embed="${embedId}"></div>`;
  });
  
  console.log('Processed YouTube embeds:', embeds);
  return { content: processedContent, embeds };
};

// Helper function to extract headings from processed content
export const extractHeadings = (content: string) => {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Array<{ id: string; title: string; level: number }> = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    // Use the same slug generation as rehype-slug
    const id = generateSlug(title);
    
    headings.push({ id, title, level });
  }

  console.log('Extracted headings:', headings);
  return headings;
};

// Helper function to format date
export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Helper function to clean content and ensure no frontmatter leaks through
export const cleanMarkdownContent = (content: string): string => {
  // Remove any remaining frontmatter that might have slipped through
  const frontmatterRegex = /^---\r?\n[\s\S]*?\r?\n---\r?\n/;
  const cleanedContent = content.replace(frontmatterRegex, '').trim();
  
  // Remove any stray frontmatter lines that might appear
  const lines = cleanedContent.split('\n');
  const filteredLines = lines.filter(line => {
    const trimmedLine = line.trim();
    // Skip lines that look like frontmatter
    if (trimmedLine.includes(': ') && 
        (trimmedLine.startsWith('title:') || 
         trimmedLine.startsWith('date:') || 
         trimmedLine.startsWith('excerpt:') || 
         trimmedLine.startsWith('readTime:') || 
         trimmedLine.startsWith('tags:') || 
         trimmedLine.startsWith('heroImage:'))) {
      return false;
    }
    return true;
  });
  
  return filteredLines.join('\n').trim();
};
