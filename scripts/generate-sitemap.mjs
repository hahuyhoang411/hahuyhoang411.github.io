import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { SITE_URL, publicRoutes } from "./site-routes.mjs";

const output = join(process.cwd(), "dist/sitemap.xml");
const today = new Date().toISOString().slice(0, 10);
const urls = publicRoutes().map((route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${route.lastmod ?? today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`);
writeFileSync(output, `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`, "utf8");
console.log(`Sitemap generated with ${urls.length} URLs → dist/sitemap.xml`);
