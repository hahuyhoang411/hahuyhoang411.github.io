
import { Card, CardContent } from "@/components/ui/card";

// Timeline data - easy to modify
const timelineData = [
  {
    year: "2024",
    title: "Senior Full Stack Developer",
    description: "Leading development of scalable web applications using React, Node.js, and cloud technologies. Mentoring junior developers and driving technical decisions.",
    type: "work"
  },
  {
    year: "2023",
    title: "Started Personal Blog",
    description: "Launched my personal blog to share insights about web development, best practices, and emerging technologies in the tech industry.",
    type: "project"
  },
  {
    year: "2022",
    title: "Full Stack Developer",
    description: "Developed and maintained multiple client applications using modern JavaScript frameworks. Improved application performance by 40%.",
    type: "work"
  },
  {
    year: "2021",
    title: "Master's Degree in Computer Science",
    description: "Completed Master's degree with focus on software engineering and distributed systems. Graduated with honors.",
    type: "education"
  },
  {
    year: "2020",
    title: "Junior Developer",
    description: "Started my professional journey as a junior developer, working on frontend applications and learning industry best practices.",
    type: "work"
  },
  {
    year: "2019",
    title: "Bachelor's Degree",
    description: "Graduated with Bachelor's degree in Computer Science. Built strong foundation in programming, algorithms, and software design.",
    type: "education"
  }
];

const Timeline = () => {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-blue-200"></div>
      
      <div className="space-y-8">
        {timelineData.map((item, index) => (
          <div
            key={index}
            className={`relative flex items-center ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Timeline dot */}
            <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
            
            {/* Content card */}
            <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
