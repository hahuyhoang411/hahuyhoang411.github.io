
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
  
  const processedContent = content.replace(
    /<youtube\s+videoId="([^"]+)"(?:\s+title="([^"]*)")?(?:\s+caption="([^"]*)")?\s*\/?>/g,
    (match, videoId, title, caption) => {
      const embedId = `youtube-embed-${embedCounter++}`;
      embeds.push({ id: embedId, videoId, title, caption });
      return `<div data-youtube-embed="${embedId}"></div>`;
    }
  );
  
  return { content: processedContent, embeds };
};

// Helper function to extract headings
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
