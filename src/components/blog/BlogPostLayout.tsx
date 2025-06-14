
import React from 'react';
import { motion } from 'framer-motion';
import TableOfContents from './TableOfContents';
import BlogPostContent from './BlogPostContent';

interface BlogPostLayoutProps {
  tocItems: Array<{ id: string; title: string; level: number }>;
  content: string;
}

const BlogPostLayout: React.FC<BlogPostLayoutProps> = ({ tocItems, content }) => {
  return (
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
            <BlogPostContent content={content} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BlogPostLayout;
