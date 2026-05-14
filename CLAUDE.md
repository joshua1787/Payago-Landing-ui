# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start local dev server
pnpm typecheck    # Fail on TypeScript errors
pnpm build        # Static export to ./out/
pnpm preview      # Serve ./out/ on http://localhost:4173
pnpm lint         # Alias for TypeScript validation
```

> **Package manager:** pnpm only. Do not use npm or yarn — the CI workflow detects the lockfile.

## Architecture

**PayaGo Landing** is a fully static Next.js 16 marketing site (no backend, no API routes). It uses `output: 'export'` which generates a static `./out/` directory deployed to GitHub Pages via [.github/workflows/nextjs.yml](.github/workflows/nextjs.yml).

### Key constraints
- TypeScript errors fail the build. Do not re-enable `ignoreBuildErrors`.
- `images.unoptimized: true` — all images are served as-is; no Next.js image optimization
- Form submissions post to `NEXT_PUBLIC_WAITLIST_ENDPOINT` / `NEXT_PUBLIC_CONTACT_ENDPOINT` when configured, with a `mailto:` fallback for static hosting.
- No state management library — component-level `useState` only

### Directory structure
```
app/              # App Router pages — each subfolder is a route
components/       # Feature components (navbar, hero, sections, footer, etc.)
components/ui/    # shadcn/ui primitives — do not hand-edit these
lib/utils.ts      # cn() helper (clsx + tailwind-merge)
hooks/            # use-mobile (breakpoint), use-toast
public/images/    # Travel photos + logo variants
app/globals.css   # Global CSS: OKLCH theme tokens, aurora, film grain, animations
```

### Styling conventions
- Tailwind CSS v4 with `@tailwindcss/postcss` — no `tailwind.config.ts` file; config is CSS-first
- Theme colors are OKLCH CSS variables defined in [app/globals.css](app/globals.css)
- Use `cn()` from `@/lib/utils` for conditional class merging
- Font variables are defined in `app/globals.css`; keep font guidance aligned with the current CSS rather than adding a new font loader.

### Animation patterns
- Native browser anchor scrolling is used. Do not add scroll hijacking libraries for global page scroll.
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
