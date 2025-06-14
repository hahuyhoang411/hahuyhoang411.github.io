
// Blog post metadata interface
export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  tags: string[];
  content: string;
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

// Blog posts data with markdown content
const blogPostsData = [
  {
    id: 'getting-started-react-typescript',
    filename: 'getting-started-react-typescript.md'
  },
  {
    id: 'modern-javascript-es2023',
    filename: 'modern-javascript-es2023.md'
  },
  // Legacy posts (without markdown files)
  {
    id: 'building-responsive-layouts',
    title: "Building Responsive Layouts with Tailwind CSS",
    excerpt: "Explore advanced techniques for creating beautiful, responsive web layouts using Tailwind CSS utilities and components.",
    date: "2024-01-08",
    readTime: "7 min read",
    tags: ["CSS", "Tailwind", "Design"],
    content: "This is a placeholder for the full blog post content about building responsive layouts with Tailwind CSS."
  },
  {
    id: 'api-design-best-practices',
    title: "API Design Best Practices",
    excerpt: "A comprehensive guide to designing RESTful APIs that are scalable, maintainable, and developer-friendly.",
    date: "2024-01-01",
    readTime: "10 min read",
    tags: ["API", "Backend", "Architecture"],
    content: "This is a placeholder for the full blog post content about API design best practices."
  }
];

// Simulate loading markdown files (in a real app, you'd fetch these)
const loadMarkdownContent = async (filename: string): Promise<string> => {
  // In a real application, you would fetch the markdown file
  // For this demo, we'll simulate with the content we created
  const markdownFiles: Record<string, string> = {
    'getting-started-react-typescript.md': `---
title: "Getting Started with React and TypeScript"
date: "2024-01-15"
excerpt: "Learn how to set up a modern React application with TypeScript, including best practices for type safety and project structure."
readTime: "5 min read"
tags: ["React", "TypeScript", "Frontend"]
---

# Getting Started with React and TypeScript

TypeScript has become an essential tool for modern React development, providing type safety and improved developer experience. In this post, we'll explore how to set up a new React project with TypeScript and cover some best practices.

## Why TypeScript with React?

TypeScript offers several advantages when working with React:

- **Type Safety**: Catch errors at compile time rather than runtime
- **Better IntelliSense**: Enhanced autocomplete and refactoring support
- **Self-documenting Code**: Types serve as inline documentation
- **Easier Refactoring**: Safe and confident code changes

## Setting Up the Project

To create a new React project with TypeScript, you can use Create React App:

\`\`\`bash
npx create-react-app my-app --template typescript
cd my-app
npm start
\`\`\`

This will create a new React project with TypeScript configuration already set up.

## Basic Component Types

Here's how to type a simple React component:

\`\`\`typescript
interface Props {
  title: string;
  count?: number;
  onIncrement: () => void;
}

const Counter: React.FC<Props> = ({ title, count = 0, onIncrement }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>Count: {count}</p>
      <button onClick={onIncrement}>Increment</button>
    </div>
  );
};
\`\`\`

## Conclusion

TypeScript and React make a powerful combination for building maintainable and scalable applications. Start small, gradually add types, and enjoy the improved development experience!`,

    'modern-javascript-es2023.md': `---
title: "Modern JavaScript: ES2023 Features"
date: "2023-12-20"
excerpt: "Discover the latest JavaScript features and how they can improve your code quality and development experience."
readTime: "6 min read"
tags: ["JavaScript", "ES2023", "Web Development"]
---

# Modern JavaScript: ES2023 Features

JavaScript continues to evolve with new features that make our code more expressive and efficient. Let's explore some of the most exciting ES2023 features.

## Array.prototype.findLast() and findLastIndex()

These methods allow you to search arrays from the end:

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];

// Find the last even number
const lastEven = numbers.findLast(n => n % 2 === 0);
console.log(lastEven); // 2

// Find the index of the last even number
const lastEvenIndex = numbers.findLastIndex(n => n % 2 === 0);
console.log(lastEvenIndex); // 7
\`\`\`

## Array.prototype.toReversed()

Create a new reversed array without mutating the original:

\`\`\`javascript
const original = [1, 2, 3, 4, 5];
const reversed = original.toReversed();

console.log(original); // [1, 2, 3, 4, 5]
console.log(reversed); // [5, 4, 3, 2, 1]
\`\`\`

## Hashbang Grammar

You can now use hashbang (\`#!\`) at the beginning of JavaScript files for better CLI integration:

\`\`\`javascript
#!/usr/bin/env node

console.log("Hello from a JavaScript CLI tool!");
\`\`\`

## Conclusion

These new features make JavaScript more powerful and developer-friendly. While browser support is still rolling out, you can start using many of these features today with modern tooling and transpilation.

Stay tuned for more JavaScript updates, and happy coding!`
  };

  return markdownFiles[filename] || '';
};

// Get all blog posts
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const posts: BlogPost[] = [];

  for (const postData of blogPostsData) {
    if (postData.filename) {
      // Load markdown file
      const markdownContent = await loadMarkdownContent(postData.filename);
      const { metadata, content } = parseFrontmatter(markdownContent);
      
      posts.push({
        id: postData.id,
        title: metadata.title || 'Untitled',
        date: metadata.date || new Date().toISOString().split('T')[0],
        excerpt: metadata.excerpt || '',
        readTime: metadata.readTime || '5 min read',
        tags: metadata.tags || [],
        content
      });
    } else {
      // Legacy post without markdown file
      posts.push(postData as BlogPost);
    }
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Get a single blog post by ID
export const getBlogPost = async (id: string): Promise<BlogPost | null> => {
  const posts = await getBlogPosts();
  return posts.find(post => post.id === id) || null;
};
