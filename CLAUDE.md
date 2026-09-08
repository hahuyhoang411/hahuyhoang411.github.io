# Portfolio site

Personal portfolio and markdown blog for Hoang Ha, deployed at https://hahuyhoang411.github.io. It is a React + TypeScript single-page app built with Vite and deployed to GitHub Pages.

## Commands

```bash
npm ci             # reproducible install from package-lock.json
npm run dev        # development server
npm run build      # production build, SPA 404 fallback, sitemap
npm run lint       # ESLint
npm run typecheck  # TypeScript project build
npm test           # desktop-window model behavior tests
npm run preview    # preview the production build
node scripts/build-vietnam-stickers.mjs  # rebuild derived Vietnam sticker PNGs
npm run deploy     # build then publish dist/ with gh-pages
```

npm and `package-lock.json` are the canonical package-manager contract.

## Architecture

`src/App.tsx` mounts a BrowserRouter and the desktop shell. `src/components/desktop/DesktopShell.tsx` owns desktop composition, routes, window focus, and panels; `CareerExplorer.tsx` is the Career and education view inside About; `WindowFrame.tsx` owns the draggable/resizable window chrome; `model.ts` holds pure window-state rules covered by `test/desktop-model.test.ts`.

Routes:

- `/` and `/about` — About
- `/projects` — Projects
- `/research` — Research
- `/travel` — Travel destinations
- `/blog` — Writing index
- `/blog/:slug` — Article reader
- `/contact` — Contact

Blog markdown lives in `src/data/blog-posts/`; `src/utils/blogUtils.ts` parses it with Vite's raw `import.meta.glob` loader. Article rendering is lazy-loaded from `src/components/blog/BlogPostContent.tsx`. SEO helpers are in `src/components/SEO.tsx` and `src/components/JsonLd.tsx`; their schema constructors are in `src/data/schema.ts`.

`@/` maps to `src/` in `vite.config.ts` and `tsconfig.json`. Static assets live in `public/assets/`. The GitHub Pages build copies `dist/index.html` to `dist/404.html` for direct SPA links.


## Vietnam sticker assets

Rebuild derived sticker copies after changing crop bounds or masks in the static manifest:

```bash
node scripts/build-vietnam-stickers.mjs
```

The builder reads `src/components/desktop/stickers.json`, uses the already-declared `sharp` development dependency, and writes only `public/assets/vietnam-stickers/`. Treat `public/assets/vietnam-sketchboard.png` and `public/assets/vietnam-stickers-extra.png` as immutable source artwork.
