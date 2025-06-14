
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
    year: "September 2018",
    title: "BSc. Pharmacy",
    company: "University of Medicine and Pharmacy (UMP)",
    location: "Ho Chi Minh City, Vietnam",
    description: "After 11 years of studying physics, I made a major shift and chose health care as my life goal, starting my journey in pharmacy.",
    technologies: ["Pharmacy", "Health Care", "Physics"],
    image: "/images/timeline-1.png",
    achievements: [
      "Enrolled in the Faculty of Pharmacy to pursue a Bachelor of Science degree."
    ]
  },
  {
    id: 2,
    year: "June 2021",
    title: "First AI Research",
    company: "Clinical Pharmacy Laboratory, UMP",
    location: "Ho Chi Minh City, Vietnam",
    description: "Meeting a senior passionate about bioinformatics inspired me to start studying AI. Although our project didn't go as planned, it motivated me to begin my own research journey.",
    technologies: ["Machine Learning", "AI", "Bioinformatics", "Clinical Pharmacy"],
    image: "/assets/timeline/timeline-2.png",
    achievements: [
      "Project: Development of a Machine Learning model for Drug Recommendation in Coronary Syndrome ICU.",
      "Won Third Prize in a competition."
    ]
  },
  {
    id: 3,
    year: "June 2022",
    title: "AI Research",
    company: "Clinical Pharmacy Laboratory, UMP",
    location: "Ho Chi Minh City, Vietnam",
    description: "Continued my research journey in applying AI to healthcare.",
    technologies: ["AI", "Virtual Health Assistant", "Community Care"],
    image: "",
    achievements: [
      "Project: Development of a Virtual Health Assistant for Community Respiratory Care."
    ]
  },
  {
    id: 4,
    year: "Sep 2022 - Dec 2022",
    title: "First Internship",
    company: "Master Data",
    location: "Ho Chi Minh City, Vietnam",
    description: "This period was a quiet break, allowing me to gain practical experience in data management within a corporate environment.",
    technologies: ["ERP", "Inventory Management", "Data Maintenance"],
    image: "",
    achievements: [
      "Maintained over 3000 items and tests in ERP and Inventory Management software."
    ]
  },
  {
    id: 5,
    year: "January 2023",
    title: "AI Research (BSc Thesis)",
    company: "Clinical Pharmacy Laboratory, UMP",
    location: "Ho Chi Minh City, Vietnam",
    description: "Understanding the trend of LLMs, I shifted my research focus to apply them in healthcare, embodying the spirit of 'What doesn't kill you makes you stronger'.",
    technologies: ["LLM", "Healthcare AI", "Prescription Assessment", "Streamlit"],
    image: "/images/timeline-4.png",
    achievements: [
      "BSc thesis: Development of an Outpatient Medication Copilot for Prescription Assessment."
    ]
  },
  {
    id: 6,
    year: "June 2023 - Sep 2024",
    title: "TA / AI Researcher",
    company: "VietAI",
    location: "Vietnam (Non-profit)",
    description: "After completing my thesis, I focused on improving my AI skills, becoming a top student and eventually a TA and AI researcher for a nonprofit AI education organization.",
    technologies: ["LLM", "VLM (Vision Language Model)", "AI Education", "PyTorch"],
    image: "/images/timeline-5.png",
    achievements: [
      "Co-authored the Vista family - the open-source Vietnamese Vision Language Model.",
      "Assisted in teaching LLM across 4 courses to over 200 students from enterprises and universities.",
      "Contributed to a 700,000+ sample Vietnamese vision-language open-source dataset."
    ]
  },
  {
    id: 7,
    year: "Oct 2023 - Jan 2025",
    title: "LLM Researcher",
    company: "Menlo Research",
    location: "AI Startup",
    description: "After graduating, I was fortunate to be accepted as an LLM researcher at an AI startup — marking the next turning point in my career.",
    technologies: ["LLM", "Mixed-Modal AI", "Early-Fusion", "Real-time Voice Assistant", "LLM Optimization"],
    image: "/images/timeline-6.png",
    achievements: [
      "Published a model that ranked 1st within 7B models in Hugging Face's OpenLLM leaderboard (Nov 2023).",
      "Authored Ichigo, a mixed-modal early-fusion real-time voice assistant.",
      "Speaker at FOSDEM2025 on LLM application and inference optimization.",
      "Speaker at GOSIM2025 on LLMs in embodiment."
    ]
  },
  {
    id: 8,
    year: "February 2025",
    title: "LLM Researcher (Solo)",
    company: "Solo Research",
    location: "Remote",
    description: "Driven by my curiosity in the LLM field, I began several solo research projects to satisfy my thirst for knowledge.",
    technologies: ["LLM", "Multimodal Models", "AI Benchmarking", "Cross-lingual Models"],
    image: "/images/timeline-7.png",
    achievements: [
      "Authored Pensez – an efficient French-English Reasoning LLM for Limited Resources.",
      "Founded OpenMedical – a project for creating benchmarks and multimodal models for healthcare."
    ]
  },
  {
    id: 9,
    year: "February 2025",
    title: "Master Internship",
    company: "LIGLAB",
    location: "Remote",
    description: "Developed MedMeta, a novel benchmark for evaluating LLMs' ability to generate conclusions from medical meta-analyses using reference abstracts. The benchmark includes 81 samples across 24 medical topics from 2018-2025.",
    technologies: ["LLM", "RAG", "Benchmarking", "Medical AI", "Human Evaluation"],
    image: "/images/timeline-7.png",
    achievements: [
      "Created MedMeta benchmark with 81 samples spanning 24 medical topics from PubMed",
      "Evaluated various LLMs (8B-27B parameters) across different RAG strategies",
      "Developed a crowdsourcing platform for human evaluation comparison with automated metrics",
      "Developed a LLM Workflow to generate conclusions from medical meta-analyses using reference abstracts"
    ]
  },
  {
    id: 10,
    year: "May 2025",
    title: "Meddies Founder",
    company: "DeepMed (Passion Project)",
    location: "Remote",
    description: "In my free time, I continue working on the project I've been passionate about and always wanted to pursue: applying AI to create practical healthcare solutions.",
    technologies: ["Agentic Workflows", "Generative AI", "Decision Support Systems", "API Integration"],
    image: "/images/timeline-8.png",
    achievements: [
      "Developing 'Open Medical Research Assistant' using agentic workflows.",
      "The tool aims to create decision-making support reports for healthcare providers."
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
