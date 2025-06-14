import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getBlogPost, BlogPost } from '@/utils/blogUtils';
import TableOfContents from '@/components/blog/TableOfContents';

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

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      {/* Hero Section with Background Image */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&h=1080&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Button 
              variant="ghost" 
              onClick={handleBack}
              className="text-white hover:text-gray-200 hover:bg-white/10 p-0 h-auto font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            {post.title}
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 text-white/90 mb-6"
          >
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span>{post.readTime}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Table of Contents - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="lg:sticky lg:top-8">
                <TableOfContents items={tocItems} />
              </div>
            </motion.div>

            {/* Blog Content - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="lg:col-span-3"
            >
              <article className="prose prose-lg max-w-none">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm, remarkToc]}
                  rehypePlugins={[
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: 'wrap' }]
                  ]}
                  components={{
                    h1: ({children}) => <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-6 first:mt-0">{children}</h1>,
                    h2: ({children, ...props}) => <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4 scroll-mt-20" {...props}>{children}</h2>,
                    h3: ({children, ...props}) => <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3 scroll-mt-20" {...props}>{children}</h3>,
                    p: ({children}) => <p className="text-gray-700 leading-relaxed mb-6">{children}</p>,
                    ul: ({children}) => <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2">{children}</ul>,
                    li: ({children}) => <li className="leading-relaxed">{children}</li>,
                    code: ({children}) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">{children}</code>,
                    pre: ({children}) => <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6 text-sm">{children}</pre>,
                    blockquote: ({children}) => <blockquote className="border-l-4 border-blue-500 pl-6 italic text-gray-600 mb-6 bg-blue-50 py-4">{children}</blockquote>,
                    strong: ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>,
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </article>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default BlogPostPage;
