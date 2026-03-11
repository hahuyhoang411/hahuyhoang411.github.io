import { lazy, Suspense, type ReactNode } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { AnimatePresence, MotionConfig } from "motion/react";
import { Spinner } from "@/components/ui/spinner";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const Blog = lazy(() => import("./pages/Blog"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const Contact = lazy(() => import("./pages/Contact"));

const LazyFallback = () => <Spinner className="min-h-[50vh]" />;

const Lazy = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<LazyFallback />}>{children}</Suspense>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Lazy><Blog /></Lazy>} />
        <Route path="/blog/:slug" element={<Lazy><BlogPostPage /></Lazy>} />
        <Route path="/contact" element={<Lazy><Contact /></Lazy>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <HelmetProvider>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <MotionConfig reducedMotion="user">
          <div className="min-h-screen flex flex-col">
            <Header />
            <main id="main-content" className="flex-1">
              <AnimatedRoutes />
            </main>
            <Footer />
          </div>
        </MotionConfig>
      </BrowserRouter>
    </TooltipProvider>
  </HelmetProvider>
);

export default App;
