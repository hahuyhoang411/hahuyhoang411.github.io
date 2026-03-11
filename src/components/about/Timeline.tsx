import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { timelineData, TimelineEntry } from "@/data/timeline";
import TimelineItem from "./TimelineItem";

const Timeline = () => {
  const [selectedItem, setSelectedItem] = useState<TimelineEntry | null>(null);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            My Professional Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A timeline of my career progression, key achievements, and the technologies I've mastered along the way.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-200 to-blue-400 hidden md:block"
               style={{ height: 'calc(100% - 2rem)' }}></div>

          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </div>
        </div>

        {/* Detailed Modal */}
        <Dialog open={!!selectedItem} onOpenChange={(open) => { if (!open) setSelectedItem(null); }}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedItem && (
              <div className="space-y-6">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-gray-900">
                    {selectedItem.title}
                  </DialogTitle>
                  <DialogDescription asChild>
                    <div>
                      <p className="text-lg text-blue-600 font-medium mt-1 mb-1">
                        {selectedItem.company}
                      </p>
                      <div className="flex items-center text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{selectedItem.location}</span>
                        <Calendar className="w-4 h-4 ml-4 mr-1" />
                        <span>{selectedItem.year}</span>
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>

                <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Description</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedItem.description}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Achievements</h4>
                  <ul className="space-y-2">
                    {selectedItem.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                        <span className="text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-blue-100 text-blue-800">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Timeline;
