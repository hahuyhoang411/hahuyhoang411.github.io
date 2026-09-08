import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// The static snapshot has Helmet-managed route metadata. Hand ownership back to
// Helmet before React replaces the snapshot, without touching unrelated head nodes.
document.documentElement.dataset.js = "true";
document.head
  .querySelectorAll(
    'title, link[rel="canonical"], meta[name="description"], meta[property^="og:"], meta[name^="twitter:"], meta[property="article:published_time"], meta[name="robots"], script[type="application/ld+json"]',
  )
  .forEach((node) => node.remove());

createRoot(document.getElementById("root")!).render(<App />);
