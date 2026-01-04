# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DuskMoonUI is a CSS-only component library built as a Tailwind CSS v4 plugin. It implements Material Design 3's extended color system with 65+ color tokens and provides 40+ pre-styled components.

**Key characteristics:**
- CSS-only library (no JavaScript runtime)
- Uses OKLCH color format with `color-mix()` for dynamic states
- Themes are applied via `data-theme` attribute on HTML elements
- Two built-in themes: `sunshine` (light) and `moonlight` (dark)

## Commands

```bash
# Build core package (CSS + TypeScript declarations)
bun run build:core

# Watch mode for development
bun run dev:core

# Run unit tests (in packages/core)
cd packages/core && bun test tests/unit

# Run specific test file
cd packages/core && bun test tests/unit/button.test.ts

# Visual regression tests (requires Playwright)
cd packages/core && bun run test:visual

# Integration tests
cd packages/core && bun run test:integration

# Accessibility tests
cd packages/core && bun run test:a11y

# Type checking
bun run typecheck
```

## Architecture

### Monorepo Structure
```
packages/core/          # @duskmoon-dev/core - main library
  src/
    base/               # Root styles and color token definitions
      colors.css        # 65+ color token declarations using @theme
    themes/             # Theme definitions (sunshine.ts, moonlight.ts)
    components/         # 40+ component CSS files
    generators/         # CSS variable generation utilities
    types/              # TypeScript type definitions
  scripts/
    build-css.ts        # Custom CSS build script (inlines imports)
  tests/
    unit/               # Bun test unit tests
    visual/             # Playwright visual regression tests
    integration/        # Playwright integration tests
    accessibility/      # axe-core accessibility tests
examples/               # Demo apps (Astro, Next.js starters)
```

### Build Pipeline
The build process (`packages/core/scripts/build-css.ts`) reads `src/index.css`, recursively inlines all `@import` statements, and outputs a single bundled CSS file to `dist/index.css`. No PostCSS or LightningCSS processing at build time.

### Color System
Colors are defined in OKLCH format and registered via Tailwind CSS v4's `@theme` directive in `base/colors.css`. Focus states use `color-mix()` rather than separate tokens:
```css
.bg-primary-focus { background-color: color-mix(in oklch, var(--color-primary), black 10%); }
```

### Component Pattern
Each component has:
- A CSS file in `src/components/` (e.g., `button.css`)
- A TypeScript file exporting styles object (e.g., `button.ts`)
- Optional unit tests in `tests/unit/`

Components use CSS custom properties for theming and support variants via modifier classes (e.g., `.btn-primary`, `.btn-outline`).

## Usage

Import the library in CSS:
```css
@import "@duskmoon-dev/core";
```

Apply themes:
```html
<html data-theme="sunshine">
```

## Active Technologies
- CSS3 with Tailwind CSS v4.0.0+ + Tailwind CSS v4, @duskmoon-dev/core (005-component-padding)
- N/A (CSS-only changes) (005-component-padding)
- CSS3 with Tailwind CSS v4.0.0+ + Tailwind CSS v4, @duskmoon-dev/core (color tokens) (001-markdown-body)
- N/A (CSS-only component) (001-markdown-body)

## Recent Changes
- 005-component-padding: Added CSS3 with Tailwind CSS v4.0.0+ + Tailwind CSS v4, @duskmoon-dev/core
