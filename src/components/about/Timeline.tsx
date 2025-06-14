
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Timeline data
const timelineData = [
  {
    id: 1,
    year: "2024",
    title: "Senior Full Stack Developer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA",
    description: "Leading a team of 8 developers in building scalable web applications using React, Node.js, and AWS. Implemented microservices architecture that improved system performance by 40%.",
    technologies: ["React", "Node.js", "TypeScript", "AWS", "Docker", "GraphQL"],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=450&fit=crop",
    achievements: [
      "Reduced deployment time by 60% through CI/CD pipeline optimization",
      "Mentored 3 junior developers and led code review processes",
      "Architected and implemented real-time notification system"
    ]
  },
  {
    id: 2,
    year: "2022",
    title: "Full Stack Developer",
    company: "Digital Solutions Ltd.",
    location: "New York, NY",
    description: "Developed and maintained multiple client applications using modern web technologies. Collaborated with design teams to create intuitive user interfaces.",
    technologies: ["React", "Vue.js", "Python", "PostgreSQL", "Redis"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    achievements: [
      "Built responsive web applications for 15+ clients",
      "Optimized database queries resulting in 50% faster load times",
      "Implemented automated testing reducing bugs by 35%"
    ]
  },
  {
    id: 3,
    year: "2020",
    title: "Frontend Developer",
    company: "Creative Agency",
    location: "Austin, TX",
    description: "Specialized in creating beautiful, responsive user interfaces for various web applications. Worked closely with UX designers to bring mockups to life.",
    technologies: ["JavaScript", "CSS3", "HTML5", "jQuery", "Bootstrap"],
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=450&fit=crop",
    achievements: [
      "Delivered 20+ responsive websites with 99% client satisfaction",
      "Improved website load times by 45% through optimization",
      "Created reusable component library used across projects"
    ]
  },
  {
    id: 4,
    year: "2018",
    title: "Junior Web Developer",
    company: "StartUp Hub",
    location: "Remote",
    description: "Started my journey in web development, learning modern frameworks and contributing to various projects. Gained experience in both frontend and backend development.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=450&fit=crop",
    achievements: [
      "Completed 10+ projects during internship program",
      "Learned full-stack development fundamentals",
      "Contributed to open-source projects"
    ]
  }
];

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
              <span className="text-2xl font-bold text-blue-600">{item.year}</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <Calendar className="w-3 h-3 mr-1" />
                {item.year}
              </Badge>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
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

const Timeline = () => {
  const [selectedItem, setSelectedItem] = useState<typeof timelineData[0] | null>(null);

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
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedItem && (
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedItem.title}
                    </h3>
                    <p className="text-lg text-blue-600 font-medium mb-1">
                      {selectedItem.company}
                    </p>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{selectedItem.location}</span>
                      <Calendar className="w-4 h-4 ml-4 mr-1" />
                      <span>{selectedItem.year}</span>
                    </div>
                  </div>
                </div>

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
