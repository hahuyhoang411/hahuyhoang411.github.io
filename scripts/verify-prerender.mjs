import assert from "node:assert/strict";
import { createServer } from "node:http";
import { mkdir, readFile, stat } from "node:fs/promises";
import { join, normalize } from "node:path";
import { chromium } from "playwright";
import { publicRoutes } from "./site-routes.mjs";

const dist = join(process.cwd(), "dist");
const host = "127.0.0.1";
const evidenceDir = "/tmp/seo-prerender-evidence";
const contentType = (path) => path.endsWith(".xml") ? "application/xml" : path.endsWith(".js") ? "text/javascript" : path.endsWith(".css") ? "text/css" : "text/html; charset=utf-8";
async function waitForMetadata(page, expected) {
  await page.waitForFunction(
    ({ title, canonical, robots }) =>
      document.title === title &&
      document.querySelector('link[rel="canonical"]')?.getAttribute("href") === canonical &&
      (robots === null
        ? document.querySelector('meta[name="robots"]') === null
        : document.querySelector('meta[name="robots"]')?.getAttribute("content") === robots),
    expected,
  );
}
async function fileFor(pathname) {
  const clean = normalize(decodeURIComponent(pathname)).replace(/^[/\\]+/, "");
  const direct = join(dist, clean);
  try { if ((await stat(direct)).isFile()) return direct; } catch {}
  if (pathname.endsWith("/")) {
    const index = join(direct, "index.html");
    try { if ((await stat(index)).isFile()) return index; } catch {}
  }
  return join(dist, "404.html");
}
async function directoryIndexFor(pathname) {
  if (pathname === "/" || pathname.endsWith("/")) return undefined;
  const clean = normalize(decodeURIComponent(pathname)).replace(/^[/\\]+/, "");
  const index = join(dist, clean, "index.html");
  try {
    return (await stat(index)).isFile() ? index : undefined;
  } catch {
    return undefined;
  }
}
const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", "http://localhost");
  const pathname = url.pathname;
  if (await directoryIndexFor(pathname)) {
    response.writeHead(301, { location: `${pathname}/${url.search}` });
    response.end();
    return;
  }
  const file = await fileFor(pathname);
  const missing = file.endsWith("404.html") && pathname !== "/404.html";
  response.writeHead(missing ? 404 : 200, { "content-type": contentType(file) });
  response.end(await readFile(file));
});
await new Promise((resolve, reject) => { server.once("error", reject); server.listen(0, host, resolve); });
const address = server.address();
if (!address || typeof address === "string") throw new Error("No verification port");
const origin = `http://${host}:${address.port}`;
try {
  const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text();
  const routes = [...sitemap.matchAll(/<loc>https:\/\/hahuyhoang411\.github\.io(.*?)<\/loc>/g)].map((match) => match[1]);
  const expectedRoutes = publicRoutes().map((route) => route.path);
  assert.deepEqual(routes, expectedRoutes, "sitemap should exactly match the shared source route inventory");
  for (const route of expectedRoutes.filter((path) => path !== "/")) {
    const response = await fetch(`${origin}${route.slice(0, -1)}`, { redirect: "manual" });
    assert.equal(response.status, 301, `${route.slice(0, -1)} should redirect to its generated directory route`);
    assert.equal(response.headers.get("location"), route, `${route.slice(0, -1)} should retain the canonical trailing slash`);
  }
  for (const route of routes) {
    const response = await fetch(`${origin}${route}`);
    const html = await response.text();
    assert.equal(response.status, 200, `${route} should be a physical 200 route`);
    assert.doesNotMatch(html, /<html[^>]*\sdata-js(?:=|\s|>)/, `${route} snapshot must retain the no-JavaScript preboot state`);
    assert.equal((html.match(/<title>/g) ?? []).length, 1, `${route} raw snapshot has exactly one title`);
    assert.match(html, /<main[\s>]/, `${route} should contain visible application content`);
    assert.equal((html.match(/<link rel="canonical"/g) ?? []).length, 1, `${route} has one canonical`);
    assert.equal((html.match(/<meta name="description"/g) ?? []).length, 1, `${route} has one description`);
    const canonical = `https://hahuyhoang411.github.io${route}`;
    assert.match(html, new RegExp(`<link rel="canonical" href="${canonical}"`), `${route} canonical matches its public URL`);
    assert.match(html, new RegExp(`<meta property="og:url" content="${canonical}"`), `${route} og:url matches its public URL`);
    assert.doesNotMatch(html, /<meta name="robots" content="noindex, nofollow"/, `${route} must remain indexable`);
    if (route === "/" || (route.startsWith("/blog/") && route !== "/blog/")) {
      assert.match(html, /<script type="application\/ld\+json">/, `${route} should carry route schema`);
    }
  }
  const article = await (await fetch(`${origin}/blog/open-dllm/`)).text();
  assert.match(article, /data-article-body-ready="true"/);
  assert.match(article, /I knew about diffusion language models/);
  const about = await (await fetch(`${origin}/about/`)).text();
  assert.match(about, /<link rel="canonical" href="https:\/\/hahuyhoang411\.github\.io\/"/);
  const missing = await fetch(`${origin}/invented-route/`);
  assert.equal(missing.status, 404);
  assert.match(await missing.text(), /noindex, nofollow/);
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  try {
    await mkdir(evidenceDir, { recursive: true });
    for (const viewport of [
      { width: 390, height: 844, name: "390" },
      { width: 768, height: 720, name: "768" },
      { width: 1024, height: 768, name: "1024" },
      { width: 1440, height: 1000, name: "1440" },
    ]) {
      const context = await browser.newContext({ viewport, javaScriptEnabled: false });
      const page = await context.newPage();
      await page.goto(`${origin}/`, { waitUntil: "domcontentloaded" });
      assert.equal(await page.locator("#desktop-content h1").count(), 1, `no-JS ${viewport.name} has homepage text`);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `no-JS ${viewport.name} must not horizontally overflow`);
      if (viewport.name === "390") {
        assert.equal(await page.locator(".desktop-icons").evaluate((element) => getComputedStyle(element).display), "none", "mobile no-JS hides the desktop launcher rail");
        assert.equal(await page.locator(".window-titlebar").evaluate((element) => getComputedStyle(element).display), "none", "mobile no-JS hides inert window chrome");
        assert.equal(await page.locator(".desktop-taskbar").evaluate((element) => getComputedStyle(element).display), "none", "mobile no-JS hides the inert taskbar");
      } else if (viewport.width < 1200) {
        const windowBox = await page.locator(".desktop-window.is-active").boundingBox();
        const headingBox = await page.locator("#desktop-content h1").boundingBox();
        assert.ok(windowBox && windowBox.x >= 0 && windowBox.x + windowBox.width <= viewport.width, `no-JS ${viewport.name} keeps the active window inbounds`);
        assert.ok(headingBox && headingBox.x >= 0 && headingBox.x + headingBox.width <= viewport.width, `no-JS ${viewport.name} keeps the current heading readable inbounds`);
      }
      await page.screenshot({ path: join(evidenceDir, `home-no-js-${viewport.name}.png`), fullPage: true });
      await context.close();
    }
    for (const viewport of [{ width: 390, height: 844, name: "390" }, { width: 1440, height: 1000, name: "1440" }]) {
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();
      await page.goto(`${origin}/`, { waitUntil: "domcontentloaded" });
      await page.waitForFunction(() => document.documentElement.dataset.js === "true");
      await page.locator("#desktop-content h1").waitFor();
      await page.screenshot({ path: join(evidenceDir, `home-post-js-${viewport.name}.png`), fullPage: true });
      await context.close();
    }
    const hydrated = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const hydratedPage = await hydrated.newPage();
    await hydratedPage.goto(`${origin}/blog/`, { waitUntil: "domcontentloaded" });
    await hydratedPage.locator(".post-list").waitFor();
    assert.equal(await hydratedPage.locator("head title").count(), 1, "client replacement keeps one writing title");
    assert.equal(await hydratedPage.locator('link[rel="canonical"]').count(), 1, "client replacement keeps one canonical");
    assert.equal(await hydratedPage.title(), "Writing | Hoang's Space", "client owns the writing title after replacement");
    assert.equal(await hydratedPage.locator('meta[name="description"]').getAttribute("content"), "Notes on language models, research, and building clinical AI.", "client owns the writing description after replacement");
    assert.equal(await hydratedPage.locator('meta[property="og:url"]').getAttribute("content"), "https://hahuyhoang411.github.io/blog/", "client owns the writing og:url after replacement");
    const articleLink = hydratedPage.locator('a[href="/blog/open-dllm/"]');
    assert.equal(await articleLink.count(), 1, "article discovery is a real navigation anchor");
    await articleLink.click();
    await hydratedPage.locator("[data-article-body-ready='true']").waitFor();
    assert.equal(await hydratedPage.locator("head title").count(), 1, "client navigation keeps one article title");
    assert.equal(await hydratedPage.title(), "Two Weekends, 23 Bugs, and a 144M Diffusion Language Model | Hoang's Space", "client navigation replaces the writing title");
    assert.equal(await hydratedPage.locator('link[rel="canonical"]').getAttribute("href"), "https://hahuyhoang411.github.io/blog/open-dllm/", "client navigation replaces the canonical");
    assert.equal(await hydratedPage.locator('meta[property="og:url"]').getAttribute("content"), "https://hahuyhoang411.github.io/blog/open-dllm/", "client navigation replaces og:url");
    assert.equal(await hydratedPage.locator('script[type="application/ld+json"]').count(), 1, "client navigation retains exactly one article schema");
    assert.match(await hydratedPage.locator('script[type="application/ld+json"]').textContent() ?? "", /"@type":"BlogPosting"/, "client navigation replaces Person schema with BlogPosting schema");
    await hydratedPage.goto(`${origin}/blog/not-real/`, { waitUntil: "domcontentloaded" });
    await hydratedPage.getByRole("heading", { name: "Article not found" }).waitFor();
    await waitForMetadata(hydratedPage, {
      title: "Article not found | Hoang's Space",
      canonical: "https://hahuyhoang411.github.io/blog/not-real/",
      robots: "noindex, nofollow",
    });
    assert.equal(await hydratedPage.locator("head title").count(), 1, "invalid article keeps one title");
    assert.equal(await hydratedPage.locator('meta[name="robots"]').getAttribute("content"), "noindex, nofollow", "invalid article remains noindex after client replacement");
    await hydratedPage.getByRole("link", { name: "Back to writing" }).click();
    await hydratedPage.locator(".post-list").waitFor();
    await waitForMetadata(hydratedPage, {
      title: "Writing | Hoang's Space",
      canonical: "https://hahuyhoang411.github.io/blog/",
      robots: null,
    });
    assert.equal(await hydratedPage.locator("head title").count(), 1, "missing-article recovery keeps one title");
    assert.equal(await hydratedPage.title(), "Writing | Hoang's Space", "opening Writing after a missing article restores its title");
    assert.equal(await hydratedPage.locator('link[rel="canonical"]').getAttribute("href"), "https://hahuyhoang411.github.io/blog/", "opening Writing after a missing article restores its canonical");
    assert.equal(await hydratedPage.locator('meta[name="robots"]').count(), 0, "a retained missing article cannot poison Writing with noindex");
    const articlePagePromise = hydrated.waitForEvent("page");
    await articleLink.click({ modifiers: ["Meta"] });
    const articlePage = await articlePagePromise;
    await articlePage.waitForLoadState("domcontentloaded");
    await articlePage.locator("[data-article-body-ready='true']").waitFor();
    assert.match(await articlePage.url(), /\/blog\/open-dllm\/$/, "modified click keeps native new-page navigation");
    assert.equal(await hydratedPage.locator(".post-list").count(), 1, "modified click leaves the existing workspace open");
    await articlePage.close();
    await hydrated.close();
  } finally { await browser.close(); }
  console.log(`Verified ${routes.length}/${expectedRoutes.length} sitemap routes, 404 noindex, article readiness, no-JS snapshots, and client replacement.`);
} finally {
  await new Promise((resolve) => server.close(resolve));
}
