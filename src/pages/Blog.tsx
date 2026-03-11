
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BlogGrid from "@/components/blog/BlogGrid";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import SEO from '@/components/SEO';
import { getCategories } from '@/utils/blogUtils';
import { pageVariants, heroVariants } from '@/constants/animations';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState<string[]>(['All']);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-background"
    >
      <SEO
        title="Blog"
        description="Thoughts, tutorials, and insights about AI, web development, and healthcare technology."
        path="/blog"
      />
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            variants={heroVariants}
            className="font-serif text-5xl lg:text-6xl text-foreground mb-6"
          >
            My Writings
          </motion.h1>
          <motion.p
            variants={heroVariants}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Writing about AI, healthcare, and the tools I build along the way.
          </motion.p>

          {/* Search and Filter Section */}
          <motion.div
            variants={heroVariants}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground size-5" />
              <Input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg border-2 border-border rounded-xl focus:border-primary focus:ring-0 shadow-sm"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-background text-muted-foreground border border-border hover:border-primary/30 hover:text-primary'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                delay: 0.4
              }
            }}
          >
            <BlogGrid searchTerm={searchTerm} selectedCategory={selectedCategory} />
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Blog;
