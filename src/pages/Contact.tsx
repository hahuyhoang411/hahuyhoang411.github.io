
import { motion } from 'framer-motion';
import ContactForm from "@/components/contact/ContactForm";
import SocialLinks from "@/components/contact/SocialLinks";

const Contact = () => {
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.3
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
        ease: "easeOut"
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
            variants={sectionVariants}
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            Get In Touch
          </motion.h1>
          <motion.p 
            variants={sectionVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Have a question, want to collaborate, or just say hello? 
            I'd love to hear from you. Drop me a message below!
          </motion.p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={sectionVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
              <ContactForm />
            </motion.div>

            {/* Contact Info & Social Links */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Connect With Me</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    I'm always open to discussing new opportunities, interesting projects, 
                    or just having a good conversation about technology and development.
                  </p>
                  <p>
                    Feel free to reach out through the form or connect with me on social media. 
                    I typically respond within 24-48 hours.
                  </p>
                </div>
              </div>

              <SocialLinks />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
