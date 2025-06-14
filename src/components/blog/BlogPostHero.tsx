
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogPostHeroProps {
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  heroImage?: string;
  onBack: () => void;
}

const BlogPostHero: React.FC<BlogPostHeroProps> = ({
  title,
  date,
  readTime,
  tags,
  heroImage,
  onBack
}) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: heroImage
            ? `url("${heroImage}")`
            : `url("https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&h=1080&fit=crop")`,
        }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Button 
            variant="ghost" 
            onClick={onBack}
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
          {title}
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 text-white/90 mb-6"
        >
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            <span>{formatDate(date)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            <span>{readTime}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {tags.map((tag) => (
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
  );
};

export default BlogPostHero;
