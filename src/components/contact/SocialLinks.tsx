
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, GraduationCap, Mail, AtSign } from "lucide-react";
import XIcon from "@/components/icons/XIcon";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/hahuyhoang411",
    description: "Code and open-source projects"
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/hoanghavn/",
    description: "Professional profile"
  },
  {
    name: "X",
    icon: XIcon,
    url: "https://x.com/HaHoang411",
    description: "Thoughts on AI and healthcare"
  },
  {
    name: "Google Scholar",
    icon: GraduationCap,
    url: "https://scholar.google.com/citations?user=3voc4NEAAAAJ&hl=en&authuser=1",
    description: "Research publications"
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:hahuyhoanghhh41@gmail.com",
    description: "hahuyhoanghhh41@gmail.com"
  },
  {
    name: "Threads",
    icon: AtSign,
    url: "https://www.threads.com/@hahuyhoanghhh",
    description: "@hahuyhoanghhh"
  }
];

const SocialLinks = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-4">Elsewhere</h3>
      <div className="grid grid-cols-1 gap-3">
        {socialLinks.map((link) => {
          const IconComponent = link.icon;
          return (
            <Card key={link.name} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="flex-shrink-0">
                    <IconComponent className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {link.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {link.description}
                    </div>
                  </div>
                </a>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SocialLinks;
