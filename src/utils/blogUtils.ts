
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
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { metadata: {}, content };
  }

  const [, frontmatter, markdownContent] = match;
  const metadata: Record<string, any> = {};
  
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      let value: any = valueParts.join(':').trim();
      
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
      title: metadata.title || 'Untitled',
      date: metadata.date || new Date().toISOString().split('T')[0],
      excerpt: metadata.excerpt || metadata.description || '',
      readTime: metadata.readTime || '5 min read',
      tags: metadata.tags || [],
      content,
      heroImage: metadata.heroImage
    });
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Get a single blog post by ID
export const getBlogPost = async (id: string): Promise<BlogPost | null> => {
  const posts = await getBlogPosts();
  return posts.find(post => post.id === id) || null;
};
