
import { motion } from 'framer-motion';
import Timeline from "@/components/about/Timeline";

const About = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
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
        delay: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const sectionVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            variants={heroVariants}
            className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          >
            Hi, I'm Alex
          </motion.h1>
          <motion.p 
            variants={heroVariants}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            A passionate web developer creating beautiful, functional, and user-centered digital experiences. 
            I specialize in modern web technologies and love bringing ideas to life through code.
          </motion.p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* About Text */}
            <motion.div
              variants={sectionVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">About Me</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  With over 5 years of experience in web development, I've had the privilege of working 
                  with diverse teams and clients to build scalable, performant applications that make a difference.
                </p>
                <p>
                  My journey started with a curiosity about how websites work, and it's evolved into a 
                  deep passion for creating exceptional user experiences through clean, efficient code.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source 
                  projects, or sharing knowledge with the developer community.
                </p>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              variants={sectionVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-900">Skills & Technologies</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'React & Next.js',
                  'TypeScript',
                  'Node.js',
                  'Python',
                  'PostgreSQL',
                  'AWS',
                  'Docker',
                  'GraphQL'
                ].map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-blue-50 px-4 py-3 rounded-lg text-blue-700 font-medium"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={sectionVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">My Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A timeline of my professional experience and key milestones
            </p>
          </motion.div>
          <Timeline />
        </div>
      </section>
    </motion.div>
  );
};

export default About;
