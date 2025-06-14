
import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/" || path === "/about") {
      return location.pathname === "/" || location.pathname === "/about";
    }
    return location.pathname === path;
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-sm border-b sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors duration-200">
              Hoang's Space
            </Link>
          </motion.div>
          
          <nav className="hidden md:flex space-x-8">
            {[
              { path: "/about", label: "About" },
              { path: "/blog", label: "Blog" },
              { path: "/contact", label: "Contact" }
            ].map((item) => (
              <motion.div
                key={item.path}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={item.path}
                  className={cn(
                    "text-gray-600 hover:text-gray-900 transition-all duration-200 font-medium relative",
                    isActive(item.path) && "text-gray-900"
                  )}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gray-900"
                      initial={false}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile menu - simplified for now */}
          <div className="md:hidden">
            <div className="flex flex-col space-y-1">
              <Link to="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">About</Link>
              <Link to="/blog" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Blog</Link>
              <Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
