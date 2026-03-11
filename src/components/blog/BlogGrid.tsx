import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Calendar, Clock } from "lucide-react";
import { getBlogPosts, BlogPost as BlogPostType } from '@/utils/blogUtils';
import { formatDate } from '@/utils/formatDate';

interface BlogGridProps {
  searchTerm: string;
  selectedCategory: string;
}

const BlogGrid = ({ searchTerm, selectedCategory }: BlogGridProps) => {
  const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = searchTerm === '' ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' ||
        post.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [blogPosts, searchTerm, selectedCategory]);

  const handlePostClick = (post: BlogPostType) => {
    navigate(`/blog/${post.id}`);
  };

  if (loading) {
    return <Spinner className="min-h-[400px]" />;
  }

  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground text-lg mb-2">No posts found</div>
        <div className="text-muted-foreground/70 text-sm">
          {searchTerm || selectedCategory !== 'All'
            ? 'Try adjusting your search or filter criteria'
            : 'Check back later for new content'
          }
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {filteredPosts.map((post) => (
        <motion.div
          key={post.id}
          variants={cardVariants}
          whileHover={{
            y: -4,
            transition: { duration: 0.2 }
          }}
          className="cursor-pointer"
          role="article"
          tabIndex={0}
          aria-label={`Read post: ${post.title}`}
          onClick={() => handlePostClick(post)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlePostClick(post); } }}
        >
          <Card className="group hover:shadow-2xl transition-all duration-300 h-full border-0 shadow-lg hover:shadow-primary/10">
            {post.heroImage && (
              <div className="aspect-[16/9] overflow-hidden rounded-t-lg">
                <img
                  src={post.heroImage}
                  alt={`Cover image for ${post.title}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            )}
            <CardHeader className="pb-4">
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <Calendar className="size-4 mr-1" />
                <span>{formatDate(post.date)}</span>
                <span className="mx-2">•</span>
                <Clock className="size-4 mr-1" />
                <span>{post.readTime}</span>
              </div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300 line-clamp-2">
                {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between flex-1 pt-0">
              <div>
                <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-default">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BlogGrid;
