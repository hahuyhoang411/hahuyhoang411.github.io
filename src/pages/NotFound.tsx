import { Link } from "react-router";
import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
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
      <Button asChild>
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  </motion.div>
);

export default NotFound;
