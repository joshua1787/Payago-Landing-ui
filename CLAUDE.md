# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start local dev server
pnpm build        # Static export to ./out/
pnpm lint         # Run ESLint
```

> **Package manager:** pnpm only. Do not use npm or yarn — the CI workflow detects the lockfile.

## Architecture

**PayaGo Landing** is a fully static Next.js 16 marketing site (no backend, no API routes). It uses `output: 'export'` which generates a static `./out/` directory deployed to GitHub Pages via [.github/workflows/nextjs.yml](.github/workflows/nextjs.yml).

### Key constraints
- `typescript.ignoreBuildErrors: true` — TS errors won't break the build, but type correctness still matters
- `images.unoptimized: true` — all images are served as-is; no Next.js image optimization
- Form submissions are **mock only** (setTimeout + useState); there is no backend or email service wired up
- No state management library — component-level `useState` only

### Directory structure
```
app/              # App Router pages — each subfolder is a route
components/       # Feature components (navbar, hero, sections, footer, etc.)
components/ui/    # shadcn/ui primitives — do not hand-edit these
lib/utils.ts      # cn() helper (clsx + tailwind-merge)
hooks/            # use-mobile (breakpoint), use-toast
public/images/    # Travel photos + logo variants
styles/globals.css # Global CSS: OKLCH theme tokens, aurora, film grain, animations
```

### Styling conventions
- Tailwind CSS v4 with `@tailwindcss/postcss` — no `tailwind.config.ts` file; config is CSS-first
- Theme colors are OKLCH CSS variables defined in [styles/globals.css](styles/globals.css)
- Use `cn()` from `@/lib/utils` for conditional class merging
- Fonts loaded via `next/font/google`: `--font-inter`, `--font-outfit`, `--font-michroma`

### Animation patterns
- **Lenis** smooth scroll is initialized globally in [components/smooth-scroll.tsx](components/smooth-scroll.tsx) via `<SmoothScroll />` in the root layout
- **Framer Motion** for complex entrance/exit animations
- **Intersection Observer** for scroll-triggered fade-ins (used directly in section components)
- **CSS animations** (aurora, float, film-grain, gradient-text) defined in globals.css

### Adding new pages
Create `app/<route>/page.tsx`. Include per-page metadata export. Reuse `<Navbar />` and `<Footer />` from `@/components/`.

### shadcn/ui
Config is in [components.json](components.json) (style: `new-york`, base color: `neutral`). Add components with:
```bash
pnpm dlx shadcn@latest add <component>
```

### Design language (skills.md)
This project follows a **cinematic dark aesthetic** — deep navy/black backgrounds, OKLCH accent colors (cyan, violet, gold), film grain overlay, aurora gradients, and GPU-accelerated parallax. When building new UI, maintain this direction. Avoid generic layouts, Inter/Roboto fonts, or purple-on-white patterns.
