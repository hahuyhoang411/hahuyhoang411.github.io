import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <SEO title="Page Not Found" description="The page you're looking for doesn't exist." />
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-4">Page not found</p>
      <Link to="/" className="text-blue-500 hover:text-blue-700 underline">
        Return to Home
      </Link>
    </div>
  </div>
);

export default NotFound;
