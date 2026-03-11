
import { Github, Linkedin, GraduationCap, Mail, AtSign, ArrowUpRight } from "lucide-react";
import XIcon from "@/components/icons/XIcon";

const socialLinks = [
  {
    label: "GitHub",
    icon: Github,
    url: "https://github.com/hahuyhoang411",
  },
  {
    label: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/hoanghavn/",
  },
  {
    label: "X",
    icon: XIcon,
    url: "https://x.com/HaHoang411",
  },
  {
    label: "Google Scholar",
    icon: GraduationCap,
    url: "https://scholar.google.com/citations?user=3voc4NEAAAAJ&hl=en&authuser=1",
  },
  {
    label: "Email",
    icon: Mail,
    url: "mailto:hahuyhoanghhh41@gmail.com",
  },
  {
    label: "Threads",
    icon: AtSign,
    url: "https://www.threads.com/@hahuyhoanghhh",
  }
];

const SocialLinks = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-4">Elsewhere</h3>
      <div className="flex flex-col gap-3">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-muted/50 transition-colors text-foreground group"
          >
            <link.icon className="size-5 text-muted-foreground" />
            <span className="font-medium">{link.label}</span>
            <ArrowUpRight className="size-4 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;
