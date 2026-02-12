# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DuskMoonUI is a CSS-only component library built as a Tailwind CSS v4 plugin. It implements Material Design 3's extended color system with 65+ color tokens in OKLCH format and provides 50 pre-styled components across 5 themes.

## Commands

```bash
# Build core package (CSS bundle + TypeScript declarations + ESM/CJS plugin)
bun run build:core

# Watch mode for development (rebuilds on file change)
bun run dev:core

# Run unit tests (~240 tests)
cd packages/core && bun test tests/unit

# Run a single test file
cd packages/core && bun test tests/unit/button.test.ts

# Visual regression tests (Playwright)
cd packages/core && bun run test:visual

# Integration tests (Playwright)
cd packages/core && bun run test:integration

# Accessibility tests (axe-core + Playwright)
cd packages/core && bun run test:a11y

# Type checking (core + docs)
bun run typecheck

# Run docs site locally (hot-reloads core CSS changes)
bun run dev

# Build docs site (includes astro check + pagefind indexing)
bun run build:docs
```

## Architecture

### Monorepo Layout

- `packages/core/` — `@duskmoon-dev/core`, the published library
- `packages/docs/` — `@duskmoon-dev/docs`, Astro-based docs site (MDX content, i18n: en/fr/es)
- `examples/` — Starter apps (Astro, Next.js)

### Build Pipeline

`packages/core/scripts/build-css.ts` is a custom build script (no PostCSS/LightningCSS) that:
1. Reads `src/index.css` and recursively inlines all `@import` statements into a single `dist/index.css` (~370 KB)
2. Copies individual theme CSS files to `dist/themes/`
3. Copies individual component CSS files to `dist/components/` and generates ESM modules (wrapping CSS in `CSSStyleSheet` for web component adoption)
4. Bundles `src/tailwind-plugin.ts` into ESM + CJS via Bun.build

### CSS Layering

All component styles are wrapped in `@layer components { }`. Color tokens are registered via Tailwind CSS v4's `@theme` directive in `base/colors.css` (declarations set to `initial`, actual values provided by theme CSS files).

### Color System

Colors use **OKLCH format** (`oklch(L% C H)`). Key conventions:
- Brand colors (primary/secondary/tertiary) each have 4 tokens: `{color}`, `{color}-content`, `{color}-container`, `on-{color}-container`
- Surface elevation uses 5 container levels: `surface-container-{lowest,low,default,high,highest}`
- Focus/hover states use `color-mix()` rather than separate tokens: `color-mix(in oklch, var(--color-primary), black 10%)`
- **OKLCH chroma (C) pitfall**: C controls saturation. Neutral backgrounds need C ≤ 0.01. A C of 0.1+ produces vivid saturated colors — use only for accent colors, never for base/surface tokens.

### Theme System

5 themes: `sunshine` (light), `moonlight` (dark), `ocean`, `forest`, `sunset`. Applied via `data-theme` attribute.

Each theme has two source files:
- **`.css` file** (e.g., `sunshine.css`) — OKLCH values, the browser's source of truth. Contains two blocks that **must be kept in sync**: `[data-theme="sunshine"] { ... }` and `:root { ... }` (default fallback)
- **`.ts` file** (e.g., `sunshine.ts`) — HSL values for the Tailwind plugin API. These are a legacy interface; the CSS files are authoritative.

### Component Pattern

Each component has:
- A CSS file in `src/components/` using `@layer components` — defines base class + variant modifiers (e.g., `.btn`, `.btn-primary`, `.btn-outline`, `.btn-sm`)
- An ESM module auto-generated at build time (wraps CSS in `CSSStyleSheet` for web component use via `duskmoon-elements`)
- Unit tests in `tests/unit/` that read source CSS and assert on class names and property patterns

### Docs Site

**Constitution**: The docs site is strictly a consumer of `@duskmoon-dev/core`. All visual styling and components must come from core. If a component is missing, request it as a feature in core — never create custom component styles in docs. See `packages/docs/CLAUDE.md` for full rules.

Astro 5 with MDX content collections. Key patterns:
- In dev mode, Vite aliases `@duskmoon-dev/core` to the core source directory for hot reload
- `ComponentShowcase.astro` renders live previews with code tabs
- Component docs live in `packages/docs/src/content/docs/en/components/*.mdx`
- **ID collision risk**: Markdown headings auto-generate IDs that can shadow element IDs used by `popovertarget` — prefix demo element IDs with `demo-` to avoid collisions

### Skills

When developing components or pages for this project, use the `frontend-design` skill to produce high-quality, production-grade UI.

### CSS Anchor Positioning

The popover component uses CSS Anchor Positioning (`anchor()` functions). Known issues:
- `position-area` has a rendering bug on Chrome at HiDPI (DPR ≥ 2) — use explicit `anchor()` functions instead
- `ComponentShowcase.astro` has a JS positioning fallback guarded by `CSS.supports('top', 'anchor(bottom)')` — it only runs on browsers without native support
