
import React, { useState, useEffect, useRef } from 'react';
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

const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
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
      className="bg-gray-50 rounded-lg p-6 border border-gray-200"
    >
      <div className="flex items-center mb-4">
        <List className="w-5 h-5 mr-2 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Table of Contents</h3>
      </div>
      
      <nav className="space-y-2">
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
                ? 'bg-blue-100 text-blue-700 font-medium border-l-4 border-blue-500' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
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
