
import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion, useInView } from "framer-motion";

// Timeline data with images and captions
const timelineData = [
  {
    year: "2024",
    title: "Senior Full Stack Developer",
    description: "Leading development of scalable web applications using React, Node.js, and cloud technologies. Mentoring junior developers and driving technical decisions.",
    type: "work",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
    caption: "Working on complex web applications and leading technical teams."
  },
  {
    year: "2023",
    title: "Started Personal Blog",
    description: "Launched my personal blog to share insights about web development, best practices, and emerging technologies in the tech industry.",
    type: "project",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
    caption: "Writing and sharing knowledge with the developer community."
  },
  {
    year: "2022",
    title: "Full Stack Developer",
    description: "Developed and maintained multiple client applications using modern JavaScript frameworks. Improved application performance by 40%.",
    type: "work",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
    caption: "Building modern web applications with cutting-edge technologies."
  },
  {
    year: "2021",
    title: "Master's Degree in Computer Science",
    description: "Completed Master's degree with focus on software engineering and distributed systems. Graduated with honors.",
    type: "education",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    caption: "Advancing my knowledge in computer science and software engineering."
  },
  {
    year: "2020",
    title: "Junior Developer",
    description: "Started my professional journey as a junior developer, working on frontend applications and learning industry best practices.",
    type: "work",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
    caption: "Beginning my career in software development and learning the fundamentals."
  },
  {
    year: "2019",
    title: "Bachelor's Degree",
    description: "Graduated with Bachelor's degree in Computer Science. Built strong foundation in programming, algorithms, and software design.",
    type: "education",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=300&fit=crop",
    caption: "Completing my undergraduate studies and building foundational knowledge."
  }
];

// Animation variants for timeline items
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1], // easeOut cubic-bezier alternative
    },
  },
};

const TimelineItem = ({
  item,
  index,
  onClick,
}: {
  item: typeof timelineData[0];
  index: number;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
  // We'll calculate a delay for stagger
  const delay = index * 0.14;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={itemVariants}
      transition={{ 
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1],
        delay
      }}
      className={`relative flex items-center ${
        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Timeline dot */}
      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
      {/* Content card */}
      <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
        <Card 
          className="hover:shadow-lg transition-shadow duration-300 cursor-pointer hover:bg-gray-50"
          onClick={onClick}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
                {item.year}
              </span>
              <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                item.type === 'work' ? 'bg-green-100 text-green-800' :
                item.type === 'education' ? 'bg-purple-100 text-purple-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {item.type}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600">
              {item.description}
            </p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

const Timeline = () => {
  const [selectedItem, setSelectedItem] = useState<typeof timelineData[0] | null>(null);

  return (
    <>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-blue-200"></div>
        <div className="space-y-8">
          {timelineData.map((item, index) => (
            <TimelineItem
              key={index}
              item={item}
              index={index}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
      </div>

      {/* Dialog for timeline item details */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              {selectedItem?.title} ({selectedItem?.year})
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 flex flex-col items-center">
            {/* Use AspectRatio for 16:9 images */}
            <div className="w-full flex justify-center">
              <div className="w-full max-w-3xl rounded-xl overflow-hidden shadow-lg">
                <AspectRatio ratio={16 / 9}>
                  <img 
                    src={selectedItem?.image}
                    alt={selectedItem?.title}
                    className="w-full h-full object-cover object-center"
                  />
                </AspectRatio>
              </div>
            </div>
            <p className="text-gray-600 text-center italic">
              {selectedItem?.caption}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Timeline;

