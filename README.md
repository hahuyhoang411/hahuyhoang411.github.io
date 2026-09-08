# Hoang Ha

Personal portfolio and markdown blog for Hoang Ha, pharmacist and LLM researcher. The site is a Vite + React + TypeScript single-page application deployed to GitHub Pages at [hahuyhoang411.github.io](https://hahuyhoang411.github.io).

## Local development

```sh
npm ci
npm run dev
```

npm and `package-lock.json` are the canonical package-manager contract.

## Commands

```sh
npm run build      # production assets, SPA 404 fallback, sitemap
npm run typecheck  # TypeScript project build
npm run lint       # ESLint
npm test           # desktop-window behavior tests
npm run preview    # preview the built app
node scripts/build-vietnam-stickers.mjs  # rebuild derived Vietnam sticker PNGs
npm run deploy     # build and publish dist/ with gh-pages
```

## Architecture

`src/App.tsx` mounts React Router and the desktop shell. `src/components/desktop/DesktopShell.tsx` composes the desktop apps and routing; `WindowFrame.tsx` owns window chrome; `model.ts` contains testable window-state rules. Posts are markdown files in `src/data/blog-posts/`, parsed by `src/utils/blogUtils.ts`; the article renderer is lazy-loaded.

Routes: `/` and `/about` (About, including Career Explorer), `/projects`, `/research`, `/travel`, `/blog`, `/blog/:slug`, and `/contact`.

The production build copies `index.html` to `404.html` for GitHub Pages SPA routing and generates the sitemap.


## Vietnam sticker assets

Run `node scripts/build-vietnam-stickers.mjs` to rebuild the derived sticker PNGs. It reads the static `src/components/desktop/stickers.json` manifest, uses the already-declared `sharp` development dependency, and writes only `public/assets/vietnam-stickers/`. The two source files, `public/assets/vietnam-sketchboard.png` and `public/assets/vietnam-stickers-extra.png`, are immutable.
