
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { getBlogPost, BlogPost } from '@/utils/blogUtils';
import { cleanContent } from '@/utils/markdownUtils';
import BlogPostHero from '@/components/blog/BlogPostHero';
import BlogPostLayout from '@/components/blog/BlogPostLayout';

// Helper function to generate slug IDs (matches rehype-slug behavior)
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [tocItems, setTocItems] = useState<Array<{ id: string; title: string; level: number }>>([]);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;
      
      try {
        const blogPost = await getBlogPost(slug);
        setPost(blogPost);
        
        // Extract headings for TOC
        if (blogPost) {
          const headings = extractHeadings(blogPost.content);
          setTocItems(headings);
        }
      } catch (error) {
        console.error('Error loading blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  const extractHeadings = (content: string) => {
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

  const handleBack = () => {
    navigate('/blog');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
        <Button onClick={handleBack}>Back to Blog</Button>
      </div>
    );
  }

  // Clean the content to remove frontmatter and process YouTube embeds
  const cleanedContent = cleanContent(post.content);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      {/* Hero Section with Background Image */}
      <BlogPostHero
        title={post.title}
        date={post.date}
        readTime={post.readTime}
        tags={post.tags}
        heroImage={post.heroImage}
        onBack={handleBack}
      />

      {/* Main Content */}
      <BlogPostLayout
        tocItems={tocItems}
        content={cleanedContent}
      />
    </motion.div>
  );
};

export default BlogPostPage;
