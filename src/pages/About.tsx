
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import Timeline from "@/components/about/Timeline";
import SEO from '@/components/SEO';
import JsonLd, { personSchema } from '@/components/JsonLd';
import { pageVariants, heroVariants } from '@/constants/animations';

const About = () => {
  const { pathname } = useLocation();

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-background"
    >
      <SEO
        title={pathname === '/' ? undefined : "About"}
        description="Huy Hoang Ha — AI researcher, pharmacist, and open-source contributor building AI solutions for healthcare."
        path="/"
      />
      <JsonLd data={personSchema} />
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Bio Text */}
            <motion.div
              variants={heroVariants}
              className="flex flex-col gap-6"
            >
              <h1 className="font-serif text-5xl lg:text-6xl text-foreground mb-6">
                Hi, I'm <span className="text-primary font-serif italic">Huy Hoang Ha</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                I'm Hoang, a pharmacist with a deep passion for AI. I'm constantly exploring ideas to apply AI in healthcare, aiming to make quality care accessible to as many people as possible.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                For me, AI, Healthcare, and Education are the three pillars of my life. I believe AI has the potential to improve lives for everyone, especially for healthcare professionals and patients. I'm eager to connect with like-minded individuals to build a better future together.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Badge variant="secondary">Solo Entrepreneurship</Badge>
                <Badge variant="secondary">LLM Researcher</Badge>
                <Badge variant="secondary">Pharmacist</Badge>
                <Badge variant="secondary">Open Source Contributor</Badge>
                <Badge variant="secondary">Chasing a unicorn 🦄</Badge>
              </div>
            </motion.div>

            {/* Right: Profile Image */}
            <motion.div
              variants={heroVariants}
              transition={{ delay: 0.4 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                <div className="w-96 h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/assets/about/founder.webp"
                    alt="Huy Hoang Ha - Portrait"
                    className="w-full h-full object-cover object-center"
                    // @ts-expect-error React 18 doesn't type fetchpriority yet
                    fetchpriority="high"
                    decoding="async"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay: 0.4 }
        }}
      >
        <Timeline />
      </motion.div>
    </motion.div>
  );
};

export default About;
