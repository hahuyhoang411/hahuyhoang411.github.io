import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const Blog = lazy(() => import("./pages/Blog"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const Contact = lazy(() => import("./pages/Contact"));

const LazyFallback = () => (
  <div className="flex justify-center items-center min-h-[400px]">
    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <HelmetProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <AnimatePresence mode="wait">
            <main id="main-content" className="flex-1">
              <Suspense fallback={<LazyFallback />}>
                <Routes>
                  <Route path="/" element={<About />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPostPage />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
          </AnimatePresence>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </HelmetProvider>
);

export default App;
