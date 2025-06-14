import React from 'react';
import { motion } from 'framer-motion';
import Timeline from "@/components/about/Timeline";

const About = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  const heroVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2
      }
    }
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-white"
    >
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Bio Text */}
            <motion.div 
              variants={heroVariants}
              className="space-y-6"
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Hi, I'm <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Your Name</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                I'm a passionate full-stack developer with over 5 years of experience 
                creating elegant solutions to complex problems. I specialize in modern 
                web technologies and love building applications that make a difference.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, 
                contributing to open source projects, or sharing my knowledge through 
                writing and mentoring. I believe in the power of clean code and 
                user-centered design to create meaningful digital experiences.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  Full-Stack Developer
                </span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                  React Specialist
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  Open Source Contributor
                </span>
              </div>
            </motion.div>

            {/* Right: Profile Image */}
            <motion.div 
              variants={heroVariants}
              transition={{ delay: 0.4 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-indigo-200 rounded-full opacity-30"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 0.6,
                delay: 0.4
              }
            }}
          >
            <Timeline />
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
