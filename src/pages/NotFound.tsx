import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import SEO from "@/components/SEO";
import { pageVariants } from "@/constants/animations";

const NotFound = () => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="min-h-[60vh] flex items-center justify-center"
  >
    <SEO
      title="Page Not Found"
      path="/404"
    />
    <Helmet>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <div className="text-center px-4">
      <h1 className="text-8xl font-bold text-foreground/10 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-foreground mb-2">Page not found</h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  </motion.div>
);

export default NotFound;
