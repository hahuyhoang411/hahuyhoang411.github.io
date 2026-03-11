import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const SITE_URL = "https://hahuyhoang411.github.io";
const BLOG_DIR = join(process.cwd(), "src/data/blog-posts");
const OUTPUT = join(process.cwd(), "dist/sitemap.xml");

const staticPages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.9", changefreq: "monthly" },
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
  { path: "/contact", priority: "0.6", changefreq: "monthly" },
];

function getBlogSlugs() {
  try {
    return readdirSync(BLOG_DIR)
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(".md", ""));
  } catch {
    console.warn("No blog posts directory found");
    return [];
  }
}

function getDateFromFrontmatter(slug) {
  try {
    const content = readFileSync(join(BLOG_DIR, `${slug}.md`), "utf-8");
    const match = content.match(/date:\s*"?(\d{4}-\d{2}-\d{2})"?/);
    return match ? match[1] : new Date().toISOString().split("T")[0];
  } catch {
    return new Date().toISOString().split("T")[0];
  }
}

const blogSlugs = getBlogSlugs();
const today = new Date().toISOString().split("T")[0];

const urls = [
  ...staticPages.map(
    (p) => `  <url>
    <loc>${SITE_URL}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  ),
  ...blogSlugs.map(
    (slug) => `  <url>
    <loc>${SITE_URL}/blog/${slug}</loc>
    <lastmod>${getDateFromFrontmatter(slug)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
  ),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

writeFileSync(OUTPUT, sitemap, "utf-8");
console.log(`Sitemap generated with ${urls.length} URLs → dist/sitemap.xml`);
