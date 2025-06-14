
import { Link, useLocation } from "react-router-dom";
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
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
            Your Blog
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/about"
              className={cn(
                "text-gray-600 hover:text-gray-900 transition-colors font-medium",
                isActive("/about") && "text-gray-900 border-b-2 border-gray-900"
              )}
            >
              About
            </Link>
            <Link
              to="/blog"
              className={cn(
                "text-gray-600 hover:text-gray-900 transition-colors font-medium",
                isActive("/blog") && "text-gray-900 border-b-2 border-gray-900"
              )}
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className={cn(
                "text-gray-600 hover:text-gray-900 transition-colors font-medium",
                isActive("/contact") && "text-gray-900 border-b-2 border-gray-900"
              )}
            >
              Contact
            </Link>
          </nav>

          {/* Mobile menu button - simplified for now */}
          <div className="md:hidden">
            <div className="flex flex-col space-y-1">
              <Link to="/about" className="text-sm text-gray-600 hover:text-gray-900">About</Link>
              <Link to="/blog" className="text-sm text-gray-600 hover:text-gray-900">Blog</Link>
              <Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
