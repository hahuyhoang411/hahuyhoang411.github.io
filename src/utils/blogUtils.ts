
// Blog post metadata interface
export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  tags: string[];
  content: string;
  heroImage?: string;
}

// Parse frontmatter from markdown content with improved parsing
const parseFrontmatter = (content: string) => {
  // More robust frontmatter regex that handles different line endings
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    console.log('No frontmatter found in content');
    return { metadata: {}, content: content.trim() };
  }

  const [, frontmatter, markdownContent] = match;
  const metadata: Record<string, any> = {};
  
  // Split by lines and process each line
  const lines = frontmatter.split(/\r?\n/).filter(line => line.trim() !== '');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = line.substring(0, colonIndex).trim();
    let value: any = line.substring(colonIndex + 1).trim();
    
    if (!key || !value) continue;
    
    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    
    // Parse arrays (tags) - handle both formats: [tag1, tag2] and ["tag1", "tag2"]
    if (value.startsWith('[') && value.endsWith(']')) {
      const arrayContent = value.slice(1, -1);
      if (arrayContent.trim()) {
        value = arrayContent.split(',').map((item: string) => 
          item.trim().replace(/^["']|["']$/g, '')
        ).filter((item: string) => item.length > 0);
      } else {
        value = [];
      }
    }
    
    metadata[key] = value;
  }

  console.log('Parsed metadata:', metadata);
  return { metadata, content: markdownContent.trim() };
};

// Use Vite's glob import to get all markdown files
const markdownFiles = import.meta.glob('/src/data/blog-posts/*.md', { as: 'raw', eager: true });

// Get all blog posts
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const posts: BlogPost[] = [];

  for (const path in markdownFiles) {
    try {
      const rawContent = markdownFiles[path];
      const { metadata, content } = parseFrontmatter(rawContent);
      
      const id = path.split('/').pop()?.replace('.md', '') || '';

      posts.push({
        id,
        title: metadata.title || 'Untitled',
        date: metadata.date || new Date().toISOString().split('T')[0],
        excerpt: metadata.excerpt || metadata.description || '',
        readTime: metadata.readTime || '5 min read',
        tags: Array.isArray(metadata.tags) ? metadata.tags : [],
        content,
        heroImage: metadata.heroImage
      });
    } catch (error) {
      console.error(`Error processing blog post ${path}:`, error);
    }
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Get a single blog post by ID
export const getBlogPost = async (id: string): Promise<BlogPost | null> => {
  const posts = await getBlogPosts();
  return posts.find(post => post.id === id) || null;
};
