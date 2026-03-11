
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { List } from 'lucide-react';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

const TableOfContents = ({ items }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>('');
  const isClickScrolling = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return; // Don't update while scrolling from a click

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80px 0px',
        threshold: 0.5
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [items]);

  const scrollToSection = (id: string) => {
    isClickScrolling.current = true;
    setActiveId(id); // Immediately highlight the clicked item

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    // After scrolling, re-enable the observer
    timeoutRef.current = window.setTimeout(() => {
      isClickScrolling.current = false;
    }, 1000); // 1 second delay
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-muted rounded-lg p-6 border border-border"
    >
      <div className="flex items-center mb-4">
        <List className="size-5 mr-2 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Table of Contents</h3>
      </div>
      
      <nav className="flex flex-col gap-2">
        {items.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => scrollToSection(item.id)}
            className={`
              block w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200
              ${item.level === 3 ? 'ml-4' : ''}
              ${activeId === item.id
                ? 'bg-accent text-accent-foreground font-medium border-l-4 border-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }
            `}
          >
            {item.title}
          </motion.button>
        ))}
      </nav>
    </motion.div>
  );
};

export default TableOfContents;
