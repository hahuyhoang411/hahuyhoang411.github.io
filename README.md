# Hoang Ha

Personal portfolio and markdown blog for Hoang Ha, pharmacist and LLM researcher. The site is a Vite + React + TypeScript single-page application deployed to GitHub Pages at [hahuyhoang411.github.io](https://hahuyhoang411.github.io).

## Local development

```sh
npm ci
npm run dev
```

npm and `package-lock.json` are the canonical package-manager contract.
The build and test scripts require Node.js 22.18.0 or newer on the 22.x line, or Node.js 24 or newer, because they use Node's TypeScript stripping runtime.

## Commands

```sh
npm run build      # production assets, browser-prerendered route HTML, sitemap
npm run test:seo   # production-shaped static-route, raw HTML, 404, and no-JavaScript checks
npm run typecheck  # TypeScript project build
npm run lint       # ESLint
npm test           # desktop-window behavior tests
npm run preview    # preview the built app
node scripts/build-vietnam-stickers.mjs  # rebuild derived Vietnam sticker PNGs
npm run deploy     # build and publish dist/ with gh-pages
```

`npm run build` uses Playwright's `channel: "chrome"` to prerender the real app. An installed Google Chrome is therefore a build prerequisite; no bundled browser download or dependency installation is implied.

## Architecture

`src/App.tsx` mounts React Router and the desktop shell. `src/components/desktop/DesktopShell.tsx` composes the desktop apps and routing; `WindowFrame.tsx` owns window chrome; `model.ts` contains testable window-state rules. Posts are markdown files in `src/data/blog-posts/`, parsed by `src/utils/blogUtils.ts`; the article renderer is lazy-loaded.

Routes: `/` and `/about` (About, including Career Explorer), `/projects`, `/research`, `/travel`, `/blog`, `/blog/:slug`, and `/contact`.

The production build captures the real browser-rendered app into `dist/<route>/index.html` for each public route and writes a separate noindex `dist/404.html`. `scripts/site-routes.mjs` is the shared route inventory for sitemap generation and capture. The capture uses loopback-only Google Chrome, permits requests only to its exact ephemeral capture origin, waits for explicit content selectors, and cleans up its server and browser on success or failure. `npm run test:seo` captures temporary no-JavaScript and post-JavaScript screenshots under `/tmp/seo-prerender-evidence/`; production builds write no screenshot evidence.


## Vietnam sticker assets

Run `node scripts/build-vietnam-stickers.mjs` to rebuild the 42 derived sticker PNGs. It reads the static `src/components/desktop/stickers.json` manifest, uses the already-declared `sharp` development dependency, and writes only `public/assets/vietnam-stickers/`. The seven direct landmark PNGs (`42.png` through `48.png`) are preserved by the builder and use the same manifest for placement. The two source files, `public/assets/vietnam-sketchboard.png` and `public/assets/vietnam-stickers-extra.png`, are immutable.
