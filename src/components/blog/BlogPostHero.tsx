
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/utils/formatDate';

interface BlogPostHeroProps {
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  heroImage?: string;
  onBack: () => void;
}

const BlogPostHero = ({
  title,
  date,
  readTime,
  tags,
  heroImage,
  onBack
}: BlogPostHeroProps) => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: heroImage
            ? `url("${heroImage}")`
            : `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.7))`,
        }}
      />
      <div className="absolute inset-0 bg-overlay/60" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Button
            variant="link"
            onClick={onBack}
            className="text-primary-foreground hover:text-primary-foreground/80 p-0 h-auto"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to Blog
          </Button>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl lg:text-6xl font-bold font-serif text-primary-foreground mb-6 leading-tight"
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 text-primary-foreground/90 mb-6"
        >
          <div className="flex items-center">
            <Calendar className="size-5 mr-2" />
            <span>{formatDate(date)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="size-5 mr-2" />
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
            <Badge
              key={tag}
              variant="outline"
              className="bg-hero-glass/20 backdrop-blur-sm text-primary-foreground border-hero-glass/30 px-4 py-1.5"
            >
              {tag}
            </Badge>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPostHero;
