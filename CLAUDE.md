# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Start Vite dev server (http://localhost:5173)
pnpm build            # Production build
```

No test runner or linter is configured.

## Architecture

This is a **React 18 + TypeScript portfolio website** built with Vite, originally exported from Figma. It showcases Maria Szczudło's Product & UX Design work.

### Tech Stack
- **React 18** with TypeScript
- **Vite 6** with `@tailwindcss/vite` plugin
- **Tailwind CSS v4** (configured via `src/styles/tailwind.css`, not a tailwind.config file)
- **shadcn/ui** components (Radix UI primitives) in `src/app/components/ui/`
- **Motion** for animations
- **pnpm** as package manager

### Path Alias
`@` is aliased to `./src` in `vite.config.ts`.

### App Structure

- `src/main.tsx` — React entry point
- `src/app/App.tsx` — Main component with a **theme variant switcher** that toggles between 4 color themes (Cosmic Purple, Green Tech, Warm Sunset, Ocean Blue)
- `src/app/AppVariant1.tsx`, `AppVariant2.tsx`, `AppVariant3.tsx` — Alternate theme variants (variant 0/default is defined inline in App.tsx)

Each variant renders the same page sections:
1. **HeroSection** — Intro with profile image, tagline, CTA buttons
2. **ProjectsSection** — 6 portfolio projects with lightbox zoom, alternating layout
3. **AboutSection** — Bio, languages, expertise, experience timeline
4. **ContactSection** — Email, LinkedIn, Behance links
5. **Footer**

Sections are defined as inline components within each variant file.

### Styling

- **Theming**: Custom CSS variables using OKLch color space in `src/styles/theme.css`, with `.dark` class variant
- **Fonts**: Inter and Space Grotesk via Google Fonts (`src/styles/fonts.css`)
- **Patterns**: Glassmorphism (backdrop-blur + semi-transparent backgrounds), gradient text (`bg-clip-text text-transparent`), scroll-based parallax transforms
- The 47 shadcn/ui components in `src/app/components/ui/` are pre-generated — most are unused but available for extension

### Images

All project images are in `src/assets/` as PNGs with Figma hash-based filenames (~12MB total). They are imported using `figma:asset/[hash].png` syntax via Vite's asset handling.
