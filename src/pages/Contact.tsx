
import { motion } from 'motion/react';
import ContactForm from "@/components/contact/ContactForm";
import SocialLinks from "@/components/contact/SocialLinks";
import SEO from '@/components/SEO';
import { pageVariants, heroVariants } from '@/constants/animations';

const Contact = () => (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-background"
    >
      <SEO
        title="Contact"
        description="Get in touch with Huy Hoang Ha — open to collaboration, research opportunities, and interesting conversations."
        path="/contact"
      />
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            variants={heroVariants}
            className="font-serif text-5xl lg:text-6xl text-foreground mb-6"
          >
            Get In Touch
          </motion.h1>
          <motion.p
            variants={heroVariants}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Questions, ideas, or just want to talk? Reach out.
          </motion.p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={heroVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">Send a Message</h2>
              <ContactForm />
            </motion.div>

            {/* Contact Info & Social Links */}
            <motion.div
              className="flex flex-col gap-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Connect With Me</h2>
                <div className="flex flex-col gap-4 text-muted-foreground">
                  <p>
                    I work on AI for healthcare. If that overlaps with what you're doing, let's talk.
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

export default Contact;
