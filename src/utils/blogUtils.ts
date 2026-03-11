
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

// Parse frontmatter from markdown content
const parseFrontmatter = (content: string) => {
  // Updated regex to handle optional whitespace at the beginning
  const frontmatterRegex = /^\s*---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { metadata: {}, content };
  }

  const [, frontmatter, markdownContent] = match;
  const metadata: Record<string, string | string[]> = {};
  
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      let value: string | string[] = valueParts.join(':').trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // Parse arrays (tags)
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map((item: string) => 
          item.trim().replace(/['"]/g, '')
        );
      }
      
      metadata[key.trim()] = value;
    }
  });

  return { metadata, content: markdownContent };
};

// Use Vite's glob import to get all markdown files
const markdownFiles = import.meta.glob('/src/data/blog-posts/*.md', { as: 'raw', eager: true });

// Get all blog posts
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const posts: BlogPost[] = [];

  for (const path in markdownFiles) {
    const rawContent = markdownFiles[path];
    const { metadata, content } = parseFrontmatter(rawContent);
    
    const id = path.split('/').pop()?.replace('.md', '') || '';

    posts.push({
      id,
      title: (metadata.title as string) || 'Untitled',
      date: (metadata.date as string) || new Date().toISOString().split('T')[0],
      excerpt: (metadata.excerpt as string) || (metadata.description as string) || '',
      readTime: (metadata.readTime as string) || '5 min read',
      tags: (metadata.tags as string[]) || [],
      content,
      heroImage: metadata.heroImage as string | undefined,
    });
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Get a single blog post by ID
export const getBlogPost = async (id: string): Promise<BlogPost | null> => {
  const posts = await getBlogPosts();
  return posts.find(post => post.id === id) || null;
};

// Derive unique categories from all blog post tags
export const getCategories = async (): Promise<string[]> => {
  const posts = await getBlogPosts();
  const tags = new Set(posts.flatMap(post => post.tags));
  return ['All', ...Array.from(tags).sort()];
};
