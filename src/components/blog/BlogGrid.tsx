
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";

// Blog posts data - easy to modify (could be loaded from markdown files)
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React and TypeScript",
    excerpt: "Learn how to set up a modern React application with TypeScript, including best practices for type safety and project structure.",
    date: "2024-01-15",
    readTime: "5 min read",
    tags: ["React", "TypeScript", "Frontend"]
  },
  {
    id: 2,
    title: "Building Responsive Layouts with Tailwind CSS",
    excerpt: "Explore advanced techniques for creating beautiful, responsive web layouts using Tailwind CSS utilities and components.",
    date: "2024-01-08",
    readTime: "7 min read",
    tags: ["CSS", "Tailwind", "Design"]
  },
  {
    id: 3,
    title: "API Design Best Practices",
    excerpt: "A comprehensive guide to designing RESTful APIs that are scalable, maintainable, and developer-friendly.",
    date: "2024-01-01",
    readTime: "10 min read",
    tags: ["API", "Backend", "Architecture"]
  },
  {
    id: 4,
    title: "Modern JavaScript: ES2023 Features",
    excerpt: "Discover the latest JavaScript features and how they can improve your code quality and development experience.",
    date: "2023-12-20",
    readTime: "6 min read",
    tags: ["JavaScript", "ES2023", "Web Development"]
  },
  {
    id: 5,
    title: "Performance Optimization in React Apps",
    excerpt: "Practical tips and techniques for optimizing React application performance, from bundle size to runtime efficiency.",
    date: "2023-12-15",
    readTime: "8 min read",
    tags: ["React", "Performance", "Optimization"]
  },
  {
    id: 6,
    title: "Introduction to Web Accessibility",
    excerpt: "Learn the fundamentals of web accessibility and how to make your applications inclusive for all users.",
    date: "2023-12-10",
    readTime: "9 min read",
    tags: ["Accessibility", "UX", "Web Standards"]
  }
];

const BlogGrid = () => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogPosts.map((post) => (
        <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <CardHeader>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{formatDate(post.date)}</span>
              <span className="mx-2">•</span>
              <span>{post.readTime}</span>
            </div>
            <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
              {post.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Button 
              variant="ghost" 
              className="p-0 h-auto font-medium text-blue-600 hover:text-blue-800 group"
            >
              Read More
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BlogGrid;
