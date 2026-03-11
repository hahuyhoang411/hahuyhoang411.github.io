
import { Github, Linkedin, GraduationCap } from "lucide-react";
import XIcon from "@/components/icons/XIcon";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { Icon: Github, href: "https://github.com/hahuyhoang411", label: "GitHub" },
    { Icon: Linkedin, href: "https://www.linkedin.com/in/hoanghavn/", label: "LinkedIn" },
    { Icon: XIcon, href: "https://x.com/HaHoang411", label: "X" },
    { Icon: GraduationCap, href: "https://scholar.google.com/citations?user=3voc4NEAAAAJ&hl=en&authuser=1", label: "Google Scholar" }
  ];

  return (
    <footer className="bg-muted border-t">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-muted-foreground text-sm">
            © {currentYear} Huy Hoang Ha
          </div>

          <div className="flex gap-6">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-200"
                aria-label={label}
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
