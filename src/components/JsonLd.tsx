import { Helmet } from "react-helmet-async";

interface JsonLdProps {
  data: Record<string, unknown>;
}

const JsonLd = ({ data }: JsonLdProps) => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify(data)}</script>
  </Helmet>
);

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Huy Hoang Ha",
  url: "https://hahuyhoang411.github.io",
  jobTitle: "AI Researcher",
  sameAs: [
    "https://github.com/hahuyhoang411",
    "https://www.linkedin.com/in/hoanghavn/",
    "https://x.com/HaHoang411",
    "https://scholar.google.com/citations?user=3voc4NEAAAAJ&hl=en&authuser=1",
  ],
};

export const blogPostingSchema = (post: {
  title: string;
  date: string;
  excerpt: string;
  heroImage?: string;
  slug: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  datePublished: post.date,
  description: post.excerpt,
  image: `https://hahuyhoang411.github.io${post.heroImage ?? "/thumbnail.png"}`,
  url: `https://hahuyhoang411.github.io/blog/${post.slug}`,
  author: {
    "@type": "Person",
    name: "Huy Hoang Ha",
    url: "https://hahuyhoang411.github.io",
  },
});

export default JsonLd;
