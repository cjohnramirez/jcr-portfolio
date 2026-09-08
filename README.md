# jcr-portfolio

Portfolio for **John Carl Ramirez** — full-stack developer, researcher, and brand designer.

Built as a **brand identity manual**: each route is a *plate* resting on a presentation
ground, with document furniture and a printer's registration-mark annotation layer.

## Stack

Next.js 16 (App Router, all routes prerendered static) · React 19 · TypeScript ·
Tailwind v4 (CSS-first, no config file) · Framer Motion · Playwright.

## Getting started

```bash
pnpm install
pnpm dev
```

Copy `.env.example` to `.env.local` first. Without `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
images fall back to `public/portfolio`, which works but is the heavier path.

## Commands

| Command | What it does |
|---|---|
| `pnpm dev` | Development server |
| `pnpm build` | Production build; every route prerenders static |
| `pnpm lint` / `pnpm typecheck` | ESLint / `tsc --noEmit` |
| `pnpm test` | Baseline behaviour + axe-core accessibility. Must stay green. |
| `pnpm test:redesign` | The design contract — routing, theming, motion, image budgets |
| `pnpm images:compress` | Re-encode oversized sources and regenerate the image manifest |

Tests build and serve the production output rather than reusing a running dev server, so
they never report results for stale code. A rebuild per run is the cost of that.

## Layout

```
app/                    13 routes — cover, about, work, designs, archive, contact
components/portfolio/
  shared/               Plate, AnnotatedFrame, Reveal, CloudinaryImage, IndexGrid
  work/ creative/       Case and identity detail plates
lib/
  portfolio-data.ts     All content, typed against portfolio-types.ts
  routes.ts             Plate manifest and slug helpers — the routing source of truth
  image-manifest.ts     GENERATED — dimensions and blur placeholders
scripts/                Image manifest generator
tests/                  Playwright: baseline, accessibility, redesign contract
docs/                   Design language, QA checklist, progress log
```

## Documentation

- `docs/portfolio-design-language.md` — tokens, type, the annotation layer, motion rules
- `docs/portfolio-qa-checklist.md` — what to verify before shipping
- `docs/PROGRESS.md` — the overhaul log: decisions, reasoning, and what is outstanding
- `docs/cloudinary.md` — image delivery setup
- `AGENTS.md` — read `node_modules/next/dist/docs/` before writing code; this Next version
  differs from what a model is likely to assume
