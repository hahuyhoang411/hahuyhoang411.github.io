# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and blog site for Huy Hoang Ha, deployed at https://hahuyhoang411.github.io. React SPA with markdown-based blogging, built with Vite and deployed to GitHub Pages.

## Commands

```bash
bun run dev        # Dev server on localhost:8080
bun run build      # Production build (also copies dist/index.html → dist/404.html for SPA routing)
bun run lint       # ESLint
bun run preview    # Preview production build locally
bun run deploy     # Build + deploy to GitHub Pages via gh-pages
```

No test framework is configured.

## Architecture

**Stack:** React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui (Radix primitives) + Framer Motion

**Routing** (`src/App.tsx`): React Router with AnimatePresence for page transitions.
- `/` and `/about` → About (homepage)
- `/blog` → Blog listing with search/filter
- `/blog/:slug` → Individual blog post
- `/contact` → Contact form

**Path alias:** `@/` maps to `src/` (configured in both `vite.config.ts` and `tsconfig.json`).

### Source Layout

- `src/pages/` — Route-level page components. Each uses Framer Motion `pageVariants` for enter/exit animations.
- `src/components/layout/` — Header (nav with active indicator) and Footer.
- `src/components/blog/` — Blog-specific components (grid, post layout, hero, ToC, YouTube embed).
- `src/components/about/` — Timeline component for experience display.
- `src/components/contact/` — Contact form (sonner toast, mailto) and social links.
- `src/components/ui/` — shadcn/ui components. Add new ones via `bunx --bun shadcn@latest add <component>`.
- `src/data/blog-posts/` — Markdown files with YAML frontmatter (title, date, excerpt, readTime, tags, heroImage).
- `src/utils/blogUtils.ts` — Frontmatter parser + Vite `import.meta.glob` loader for blog posts.
- `src/utils/markdownUtils.ts` — Markdown rendering config (remark-gfm, rehype-slug, etc.).
- `src/hooks/` — Custom hooks directory (currently empty, aliased for shadcn).
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge).
- `public/assets/` — Static images referenced by blog posts and pages.

### Blog Content System

Blog posts are markdown files in `src/data/blog-posts/`. Vite's `import.meta.glob('/src/data/blog-posts/*.md', { query: '?raw', import: 'default', eager: true })` loads them at build time. Results are cached at module level after first parse. Frontmatter format:

```yaml
---
title: "Post Title"
date: "2025-01-23"
excerpt: "Short description"
readTime: "7 min read"
tags: ["Tag1", "Tag2"]
heroImage: "/assets/path/to/image.jpg"
---
```

The filename (without `.md`) becomes the post slug/ID used in the `/blog/:slug` route.

### Styling

- Design tokens via CSS custom properties in `src/index.css` (HSL color system).
- Dark mode supported via Tailwind `class` strategy.
- shadcn/ui config in `components.json` (style: default, baseColor: slate, cssVariables: true).
- Animations: Framer Motion for page transitions and interactions; `tailwindcss-animate` for CSS keyframes.

### Deployment

GitHub Pages SPA — the build copies `index.html` to `404.html` so client-side routing works on direct URL access. The `gh-pages` package pushes `dist/` to the deployment branch.
