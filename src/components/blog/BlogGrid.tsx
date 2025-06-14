
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { getBlogPosts, BlogPost as BlogPostType } from '@/utils/blogUtils';
import BlogPost from './BlogPost';

const BlogGrid = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await getBlogPosts();
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handlePostClick = (post: BlogPostType) => {
    setSelectedPost(post);
  };

  const handleBackToGrid = () => {
    setSelectedPost(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (selectedPost) {
    return <BlogPost post={selectedPost} onBack={handleBackToGrid} />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {blogPosts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1,
            ease: "easeOut"
          }}
          whileHover={{ 
            y: -8,
            transition: { duration: 0.2 }
          }}
        >
          <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 h-full">
            <CardHeader>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{formatDate(post.date)}</span>
                <span className="mx-2">•</span>
                <Clock className="w-4 h-4 mr-1" />
                <span>{post.readTime}</span>
              </div>
              <CardTitle className="text-xl group-hover:text-blue-600 transition-colors duration-200">
                {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between flex-1">
              <div>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      whileHover={{ scale: 1.05 }}
                      className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full transition-colors hover:bg-gray-200"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              <Button 
                variant="ghost" 
                onClick={() => handlePostClick(post)}
                className="p-0 h-auto font-medium text-blue-600 hover:text-blue-800 group self-start"
              >
                Read More
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BlogGrid;
