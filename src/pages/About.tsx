
import { Card, CardContent } from "@/components/ui/card";
import Timeline from "@/components/about/Timeline";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Bio */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Hello, I'm <span className="text-blue-600">Your Name</span>
              </h1>
              <div className="text-lg text-gray-600 space-y-4">
                <p>
                  Welcome to my personal space on the web! I'm a passionate developer, writer, and lifelong learner with a love for creating meaningful digital experiences.
                </p>
                <p>
                  With over X years of experience in web development, I specialize in modern technologies and enjoy sharing my knowledge through writing and open-source contributions.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies, reading about design patterns, or contributing to the developer community.
                </p>
              </div>
            </div>

            {/* Right side - Profile Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-80 rounded-full overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 rounded-full ring-4 ring-blue-100"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              My Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A timeline of my career milestones, education, and key achievements that have shaped my professional journey.
            </p>
          </div>
          <Timeline />
        </div>
      </section>
    </div>
  );
};

export default About;
