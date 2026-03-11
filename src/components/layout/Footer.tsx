
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, GraduationCap } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { Icon: Github, href: "https://github.com/hahuyhoang411", label: "GitHub" },
    { Icon: Linkedin, href: "https://www.linkedin.com/in/hoanghavn/", label: "LinkedIn" },
    { Icon: Twitter, href: "https://x.com/HaHoang411", label: "Twitter" },
    { Icon: GraduationCap, href: "https://scholar.google.com/citations?user=3voc4NEAAAAJ&hl=en&authuser=1", label: "Google Scholar" }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-muted border-t"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-muted-foreground text-sm">
            © {currentYear} Huy Hoang Ha
          </div>

          <div className="flex gap-6">
            {socialLinks.map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-200"
                aria-label={label}
                whileHover={{
                  scale: 1.2,
                  y: -2
                }}
              >
                <Icon className="size-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
