import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { TimelineEntry } from "@/data/timeline";

interface TimelineItemProps {
  item: TimelineEntry;
  index: number;
  onClick: () => void;
}

const TimelineItem = ({ item, index, onClick }: TimelineItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
  // Calculate a delay for stagger
  const delay = index * 0.15;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1],
        delay: inView ? delay : 0
      }}
      className={`relative flex items-center ${
        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Timeline line and dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
        <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10 relative"></div>
      </div>

      {/* Content card */}
      <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
          onClick={onClick}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl font-bold text-blue-600">{item.title}</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <Calendar className="w-3 h-3 mr-1" />
                {item.year}
              </Badge>
            </div>

            <p className="text-lg font-medium text-gray-700 mb-1">{item.company}</p>

            <div className="flex items-center text-gray-500 mb-4">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{item.location}</span>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {item.technologies.slice(0, 3).map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {item.technologies.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{item.technologies.length - 3} more
                </Badge>
              )}
            </div>

            <div className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <ExternalLink className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">View Details</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
