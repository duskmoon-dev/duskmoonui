---
name: duskmoon-dev-css-art
description: When using npm package `@duskmoon-dev/css-art`, this skill shows how to install, configure, and use the pure CSS art component library
---

# @duskmoon-dev/css-art Skill

## Overview

`@duskmoon-dev/css-art` is a pure CSS art component library — decorative illustrations built entirely with CSS. No images, no SVGs, no JavaScript. Each art piece is a self-contained CSS class with customizable properties.

## Installation

```bash
# Bun
bun add @duskmoon-dev/css-art

# npm
npm install @duskmoon-dev/css-art

# pnpm
pnpm add @duskmoon-dev/css-art
```

## Setup

### CSS Import

```css
@import "@duskmoon-dev/css-art";
```

All art styles are wrapped in `@layer css-art { }`, so they won't conflict with `@duskmoon-dev/core`'s `@layer components { }`.

### Using with @duskmoon-dev/core

```css
@import "tailwindcss";
@import "@duskmoon-dev/core";
@import "@duskmoon-dev/css-art";
```

## Available Art Components

### Celestial

- `art-moon` — Moon with craters, crescent variant, and animated glow
  - Variants: `art-moon-crescent`, `art-moon-glow`
  - Sizes: `art-moon-sm` (4rem), default (8rem), `art-moon-lg` (12rem), `art-moon-xl` (16rem)
  - Custom properties: `--art-moon-size`, `--art-moon-color`, `--art-moon-shadow`, `--art-moon-glow`

- `art-sun` — Sun with radial gradient, spinning rays, and pulse animation
  - Variants: `art-sun-rays`, `art-sun-sunset`, `art-sun-pulse`
  - Sizes: `art-sun-sm` (4rem), default (8rem), `art-sun-lg` (12rem), `art-sun-xl` (16rem)
  - Custom properties: `--art-sun-size`, `--art-sun-color`, `--art-sun-corona`, `--art-sun-glow`

### Landscape

- `art-mountain` — Mountain peak with snow cap, range variant with multiple peaks
  - Variants: `art-mountain-range`, `art-mountain-sunset`, `art-mountain-forest`
  - Sizes: `art-mountain-sm` (10rem×6rem), default (16rem×10rem), `art-mountain-lg` (24rem×15rem)
  - Children (range): `.art-peak` — individual peaks within a range
  - Custom properties: `--art-mountain-width`, `--art-mountain-height`, `--art-mountain-color`, `--art-mountain-shadow`, `--art-mountain-snow`

## Usage Examples

### Basic Moon

```html
<div class="art-moon"></div>
```

### Crescent Moon with Glow

```html
<div class="art-moon art-moon-crescent art-moon-glow"></div>
```

### Sun with Animated Rays

```html
<div class="art-sun art-sun-rays"></div>
```

### Sunset Sun

```html
<div class="art-sun art-sun-sunset art-sun-rays"></div>
```

### Single Mountain

```html
<div class="art-mountain"></div>
```

### Mountain Range

```html
<div class="art-mountain-range">
  <div class="art-peak"></div>
  <div class="art-peak"></div>
  <div class="art-peak"></div>
</div>
```

### Custom Colors

Override CSS custom properties to customize any art piece:

```html
<!-- Blue moon -->
<div class="art-moon" style="--art-moon-color: oklch(80% 0.08 240);"></div>

<!-- Custom-sized sun -->
<div class="art-sun" style="--art-sun-size: 6rem;"></div>
```

### Composing a Night Scene

```html
<div style="background: oklch(15% 0.02 260); padding: 3rem; position: relative;">
  <div class="art-moon art-moon-crescent art-moon-glow" style="position: absolute; top: 1rem; right: 2rem;"></div>
  <div class="art-mountain-range" style="position: absolute; bottom: 0;">
    <div class="art-peak"></div>
    <div class="art-peak"></div>
    <div class="art-peak"></div>
  </div>
</div>
```

## CSS Architecture

- All classes prefixed with `.art-` to avoid collisions
- All custom properties prefixed with `--art-` for namespacing
- Uses `@layer css-art` to avoid cascade conflicts with other libraries
- Colors use OKLCH format for perceptual uniformity
- Animations use `@keyframes` with `art-` prefixed names

## Importing Individual Art Pieces

```css
/* Import only what you need */
@import "@duskmoon-dev/css-art/art";
```

## Development Commands

```bash
# Build css-art package
bun run build:css-art

# Watch mode
bun run dev:css-art

# Unit tests
cd packages/css-art && bun test tests/unit
```

## Bundle Size

- Unminified: ~8 KB
- Minified: ~6 KB
