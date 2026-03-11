
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Twitter, GraduationCap, Mail, Bell } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/hahuyhoang411",
    description: "Check out my code and open source contributions"
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/hoanghavn/",
    description: "Connect with me professionally"
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://x.com/HaHoang411",
    description: "Follow me for tech updates and thoughts"
  },
  {
    name: "Google Scholar",
    icon: GraduationCap,
    url: "https://scholar.google.com/citations?user=3voc4NEAAAAJ&hl=en&authuser=1",
    description: "View my academic publications and research"
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:hahuyhoanghhh41@gmail.com",
    description: "Send me a direct email"
  },
  {
    name: "Threads",
    icon: Bell,
    url: "https://www.threads.com/@hahuyhoanghhh",
    description: "Follow me for my thoughts"
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
