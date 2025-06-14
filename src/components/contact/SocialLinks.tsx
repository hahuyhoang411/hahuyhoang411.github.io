
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Twitter, GraduationCap, Mail } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/yourusername",
    description: "Check out my code and open source contributions"
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/in/yourusername",
    description: "Connect with me professionally"
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com/yourusername",
    description: "Follow me for tech updates and thoughts"
  },
  {
    name: "Google Scholar",
    icon: GraduationCap,
    url: "https://scholar.google.com/citations?user=youruserid",
    description: "View my academic publications and research"
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:your.email@example.com",
    description: "Send me a direct email"
  }
];

const SocialLinks = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Find Me Online</h3>
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
                  className="flex items-center space-x-3 group"
                >
                  <div className="flex-shrink-0">
                    <IconComponent className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {link.name}
                    </div>
                    <div className="text-xs text-gray-500">
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
