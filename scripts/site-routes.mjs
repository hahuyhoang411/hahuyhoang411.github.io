import { readdirSync, readFileSync } from "node:fs";
import { SITE_URL, canonicalPath } from "../src/data/site.ts";
export { SITE_URL };
import { join } from "node:path";

const blogDir = join(process.cwd(), "src/data/blog-posts");

const pageRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
  { path: "/contact", priority: "0.6", changefreq: "monthly" },
  { path: "/projects", priority: "0.8", changefreq: "weekly" },
  { path: "/research", priority: "0.8", changefreq: "weekly" },
  { path: "/travel", priority: "0.6", changefreq: "monthly" },
];

function blogPosts() {
  return readdirSync(blogDir)
    .filter((file) => file.endsWith(".md"))
    .sort()
    .map((file) => {
      const slug = file.slice(0, -3);
      const source = readFileSync(join(blogDir, file), "utf8");
      const date = source.match(/date:\s*"?(\d{4}-\d{2}-\d{2})"?/)?.[1];
      if (!date) throw new Error(`Blog post ${file} has no YYYY-MM-DD frontmatter date`);
      return { path: `/blog/${slug}`, priority: "0.7", changefreq: "monthly", lastmod: date };
    });
}

export const publicRoutes = () => [
  ...pageRoutes.map((route) => ({ ...route, path: canonicalPath(route.path) })),
  ...blogPosts().map((route) => ({ ...route, path: canonicalPath(route.path) })),
];

export const prerenderRoutes = () => [...publicRoutes(), { path: "/about/", alias: true }];

export const outputFileForRoute = (route) =>
  route === "/" ? "index.html" : `${route.slice(1)}index.html`;
