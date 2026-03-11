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
    <section className="py-20 bg-gradient-to-br from-muted to-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Where I've worked, what I've built.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary/30 to-primary/60 hidden md:block"
               style={{ height: 'calc(100% - 2rem)' }}></div>

          <div className="flex flex-col gap-12">
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
              <div className="flex flex-col gap-6">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-foreground">
                    {selectedItem.title}
                  </DialogTitle>
                  <DialogDescription asChild>
                    <div>
                      <p className="text-lg text-primary font-medium mt-1 mb-1">
                        {selectedItem.company}
                      </p>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="size-4 mr-1" />
                        <span>{selectedItem.location}</span>
                        <Calendar className="size-4 ml-4 mr-1" />
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
                  <h4 className="text-lg font-semibold text-foreground mb-3">Description</h4>
                  <p className="text-foreground/80 leading-relaxed">{selectedItem.description}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">Key Achievements</h4>
                  <ul className="flex flex-col gap-2">
                    {selectedItem.achievements.map((achievement) => (
                      <li key={achievement} className="flex items-start">
                        <span className="size-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></span>
                        <span className="text-foreground/80">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
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
