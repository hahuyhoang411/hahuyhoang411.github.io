
import BlogGrid from "@/components/blog/BlogGrid";

const Blog = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            My Writings
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Thoughts, insights, and experiences from my journey in web development, 
            technology trends, and software engineering best practices.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogGrid />
        </div>
      </section>
    </div>
  );
};

export default Blog;
