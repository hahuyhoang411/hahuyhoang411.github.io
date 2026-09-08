import { createServer } from "node:http";
import { readFile, mkdir, writeFile, stat, rm } from "node:fs/promises";
import { join, normalize } from "node:path";
import { chromium } from "playwright";
import { outputFileForRoute, prerenderRoutes, SITE_URL } from "./site-routes.mjs";

const dist = join(process.cwd(), "dist");
const host = "127.0.0.1";
const shell = join(dist, ".prerender-shell.html");
const contentType = (path) => path.endsWith(".js") ? "text/javascript" : path.endsWith(".css") ? "text/css" : path.endsWith(".svg") ? "image/svg+xml" : path.endsWith(".png") ? "image/png" : path.endsWith(".webp") ? "image/webp" : "text/html; charset=utf-8";

async function resolveFile(url) {
  const pathname = decodeURIComponent(new URL(url, `http://${host}`).pathname);
  const safePath = normalize(pathname).replace(/^[/\\]+/, "");
  const direct = join(dist, safePath);
  try {
    if ((await stat(direct)).isFile()) return direct;
  } catch {}
  if (pathname.endsWith("/")) {
    const directoryIndex = join(direct, "index.html");
    try { if ((await stat(directoryIndex)).isFile()) return directoryIndex; } catch {}
  }
  return shell;
}

async function startServer() {
  const server = createServer(async (request, response) => {
    try {
      const file = await resolveFile(request.url ?? "/");
      response.writeHead(200, { "content-type": contentType(file), "cache-control": "no-store" });
      response.end(await readFile(file));
    } catch (error) {
      response.writeHead(500, { "content-type": "text/plain" });
      response.end(error instanceof Error ? error.message : String(error));
    }
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, host, resolve);
  });
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("Could not allocate loopback prerender port");
  return { server, origin: `http://${host}:${address.port}` };
}

async function waitForRoute(page, route) {
  await page.waitForSelector(`main[data-route="${route === "/" ? "/" : route.slice(0, -1)}"]`);
  if (route.startsWith("/blog/") && route !== "/blog/") {
    await page.waitForSelector("[data-article-body-ready='true']");
  } else if (route === "/blog/") {
    await page.waitForSelector(".post-list");
  } else {
    await page.waitForSelector("#desktop-content h1");
  }
  const visibleText = await page.locator("#desktop-content").innerText();
  if (!visibleText.trim()) throw new Error(`Route ${route} rendered no visible content`);
  const expectedMetadata = {
    canonical: `${SITE_URL}${route === "/about/" ? "/" : route}`,
    requiresSchema: route === "/" || (route.startsWith("/blog/") && route !== "/blog/"),
  };
  try {
    await page.waitForFunction(
      ({ canonical, requiresSchema }) =>
        document.title.length > 0 &&
        document.querySelector('link[rel="canonical"]')?.getAttribute("href") === canonical &&
        document.querySelector('meta[name="description"]') !== null &&
        (!requiresSchema || document.querySelector('script[type="application/ld+json"]') !== null),
      expectedMetadata,
    );
  } catch {
    const observed = await page.evaluate(() => ({
      title: document.title,
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
      description: document.querySelector('meta[name="description"]')?.getAttribute("content"),
      hasSchema: document.querySelector('script[type="application/ld+json"]') !== null,
    }));
    throw new Error(`Route ${route} metadata did not become ready: expected ${JSON.stringify(expectedMetadata)}, observed ${JSON.stringify(observed)}`);
  }
}

async function capture(page, origin, route) {
  const errors = [];
  const onError = (error) => errors.push(error.message);
  const onConsole = (message) => { if (message.type() === "error" && !message.text().startsWith("Failed to load resource")) errors.push(message.text()); };
  page.on("pageerror", onError);
  page.on("console", onConsole);
  try {
    const response = await page.goto(`${origin}${route}`, { waitUntil: "domcontentloaded" });
    if (!response?.ok()) throw new Error(`Route ${route} returned ${response?.status()}`);
    await waitForRoute(page, route);
    if (errors.length) throw new Error(`Route ${route} emitted browser errors: ${errors.join(" | ")}`);
    const html = snapshotHtml(await page.content());
    if (!html.includes("<main")) throw new Error(`Route ${route} snapshot has no main content`);
    const output = join(dist, outputFileForRoute(route));
    await mkdir(join(output, ".."), { recursive: true });
    await writeFile(output, html);
    return output;
  } finally {
    page.off("pageerror", onError);
    page.off("console", onConsole);
  }
}

function snapshotHtml(html) {
  // The renderer runs the client entry, which marks an interactive document.
  // A static snapshot must start in its preboot state so CSS can make it usable
  // before that same entry takes ownership in a visitor's browser.
  return html.replace(/(<html\b[^>]*?)\sdata-js(?:=(?:"[^"]*"|'[^']*'|[^\s>]+))?/i, "$1");
}

let server;
let browser;
try {
  await writeFile(shell, await readFile(join(dist, "index.html")));
  server = await startServer();
  browser = await chromium.launch({ channel: "chrome", headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  await context.route(/^https?:\/\//, (route) => new URL(route.request().url()).origin === server.origin ? route.continue() : route.abort());
  const page = await context.newPage();
  const routes = prerenderRoutes();
  for (const { path } of routes) await capture(page, server.origin, path);
  const missing = await context.newPage();
  await missing.goto(`${server.origin}/__not-found__/`, { waitUntil: "domcontentloaded" });
  await missing.waitForSelector("#desktop-content h1");
  const missingHtml = snapshotHtml(await missing.content());
  if (!/noindex, nofollow/.test(missingHtml)) throw new Error("Not-found snapshot is missing noindex");
  await writeFile(join(dist, "404.html"), missingHtml);
  await context.close();
  console.log(`Prerendered ${routes.length} public routes and 404.html → dist/`);
} finally {
  await browser?.close();
  await new Promise((resolve) => server?.server.close(resolve) ?? resolve());
  await rm(shell, { force: true });
}
