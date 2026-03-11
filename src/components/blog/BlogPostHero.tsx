
import { motion } from 'motion/react';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
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
  const hasImage = !!heroImage;

  return (
    <section className={cn(
      "relative py-24 lg:py-32 overflow-hidden",
      !hasImage && "bg-secondary"
    )}>
      {hasImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${heroImage}")` }}
          />
          <div className="absolute inset-0 bg-overlay/60" />
        </>
      )}
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
            className={cn(
              "p-0 h-auto",
              hasImage
                ? "text-primary-foreground hover:text-primary-foreground/80"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to Blog
          </Button>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className={cn(
            "text-4xl lg:text-6xl font-bold font-serif mb-6 leading-tight",
            hasImage ? "text-primary-foreground" : "text-foreground"
          )}
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={cn(
            "flex flex-wrap items-center justify-center gap-6 mb-6",
            hasImage ? "text-primary-foreground/90" : "text-muted-foreground"
          )}
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
              variant={hasImage ? "outline" : "secondary"}
              className={hasImage ? "bg-hero-glass/20 backdrop-blur-xs text-primary-foreground border-hero-glass/30 px-4 py-1.5" : "px-4 py-1.5"}
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
