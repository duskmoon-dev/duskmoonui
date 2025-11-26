# @duskmoon-dev/core

> DuskMoonUI - A Tailwind CSS v4 plugin with Material Design 3 color system

[![npm version](https://img.shields.io/npm/v/@duskmoon-dev/core.svg)](https://www.npmjs.com/package/@duskmoon-dev/core)
[![npm downloads](https://img.shields.io/npm/dm/@duskmoon-dev/core.svg)](https://www.npmjs.com/package/@duskmoon-dev/core)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@duskmoon-dev/core)](https://bundlephobia.com/package/@duskmoon-dev/core)
[![license](https://img.shields.io/npm/l/@duskmoon-dev/core.svg)](https://github.com/duskmoon-dev/duskmoonui/blob/main/LICENSE)

## Features

- 🎨 **Three-color system** - Primary, secondary, and tertiary brand colors with automatic content colors
- 🌓 **Built-in themes** - Sunshine (light) and Moonlight (dark) themes ready to use
- 📦 **65+ Material Design 3 color tokens** - Full MD3 color system
- 🚀 **Zero runtime JS** - Pure CSS with CSS custom properties for theme switching
- ♿ **Accessible by default** - WCAG AA compliant contrast ratios (4.5:1 minimum)
- 🎯 **Tailwind v4 native** - Pure CSS using `@import`, no JavaScript configuration
- 📦 **Tiny bundle** - Under 7KB gzipped

## Installation

```bash
# Using Bun (recommended)
bun add @duskmoon-dev/core tailwindcss@^4.0.0

# Using npm
npm install @duskmoon-dev/core tailwindcss@^4.0.0

# Using pnpm
pnpm add @duskmoon-dev/core tailwindcss@^4.0.0
```

## Quick Start

### 1. Import the plugin in your CSS

```css
/* src/styles.css */
@import "tailwindcss";
@import "@duskmoon-dev/core";
```

### 2. Add the theme attribute to your HTML

```html
<html data-theme="sunshine">
  <body>
    <button class="btn btn-primary">Click me</button>
  </body>
</html>
```

### 3. Use the color utilities

```html
<!-- Brand colors -->
<div class="bg-primary text-primary-content">Primary</div>
<div class="bg-secondary text-secondary-content">Secondary</div>
<div class="bg-tertiary text-tertiary-content">Tertiary</div>

<!-- Surface colors -->
<div class="bg-surface text-on-surface">Surface</div>
<div class="bg-surface-container">Container</div>

<!-- Semantic colors -->
<div class="bg-success text-success-content">Success</div>
<div class="bg-error text-error-content">Error</div>
```

## Theme Switching

Switch themes by changing the `data-theme` attribute - no JavaScript required:

```html
<!-- Light theme -->
<html data-theme="sunshine">

<!-- Dark theme -->
<html data-theme="moonlight">
```

Theme switching is instant and uses pure CSS custom properties.

## Components

@duskmoon-dev/core includes **6 core components** designed for utility class composition:

### Button
```html
<button class="btn">Default</button>
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-tertiary">Tertiary</button>
<button class="btn btn-outline">Outline</button>
<button class="btn btn-ghost">Ghost</button>

<!-- Sizes -->
<button class="btn btn-xs">Extra small</button>
<button class="btn btn-sm">Small</button>
<button class="btn btn-lg">Large</button>

<!-- Custom with Tailwind utilities -->
<button class="btn btn-primary rounded-full px-8 shadow-lg">
  Custom Button
</button>
```

### Card
```html
<div class="card">
  <div class="card-body">
    <h2 class="card-title">Card title</h2>
    <p>Card content goes here.</p>
    <div class="card-actions">
      <button class="btn btn-primary">Action</button>
    </div>
  </div>
</div>

<!-- Variants -->
<div class="card card-bordered">Bordered card</div>
<div class="card card-compact">Compact card</div>
```

### Input
```html
<input type="text" class="input" placeholder="Default input" />
<input type="text" class="input input-bordered" placeholder="Bordered" />
<input type="text" class="input input-primary" placeholder="Primary" />

<!-- Sizes -->
<input type="text" class="input input-xs" placeholder="Extra small" />
<input type="text" class="input input-sm" placeholder="Small" />
<input type="text" class="input input-lg" placeholder="Large" />
```

### Form
```html
<div class="form-control">
  <label class="label">
    <span class="label-text">Email</span>
  </label>
  <input type="email" class="input input-bordered" />
  <label class="label">
    <span class="label-text-alt">Enter your email address</span>
  </label>
</div>
```

### Navigation
```html
<nav class="navbar">
  <div class="navbar-start">Logo</div>
  <div class="navbar-center">Menu</div>
  <div class="navbar-end">Actions</div>
</nav>
```

### Modal
```html
<dialog class="modal">
  <div class="modal-box">
    <h3>Modal title</h3>
    <p>Modal content</p>
    <div class="modal-action">
      <button class="btn">Close</button>
    </div>
  </div>
  <div class="modal-backdrop"></div>
</dialog>
```

## Color System

### Brand Colors (15 tokens)
- `primary`, `primary-focus`, `primary-content`, `primary-container`, `on-primary-container`
- `secondary`, `secondary-focus`, `secondary-content`, `secondary-container`, `on-secondary-container`
- `tertiary`, `tertiary-focus`, `tertiary-content`, `tertiary-container`, `on-tertiary-container`

### Surface Colors (10 tokens)
- `surface`, `surface-dim`, `surface-bright`
- `surface-container-lowest`, `surface-container-low`, `surface-container`, `surface-container-high`, `surface-container-highest`
- `on-surface`, `on-surface-variant`

### Semantic Colors (12 tokens)
- `info`, `info-content`, `info-container`, `on-info-container`
- `success`, `success-content`, `success-container`, `on-success-container`
- `warning`, `warning-content`, `warning-container`, `on-warning-container`
- `error`, `error-content`, `error-container`, `on-error-container`

### Neutral Colors (10 tokens)
- `base-100` through `base-900`
- `base-content`

### Outline Colors (2 tokens)
- `outline`, `outline-variant`

## Custom Themes

Define custom themes in your CSS:

```css
[data-theme="custom"] {
  color-scheme: light;

  --color-primary: 240 80% 60%;
  --color-primary-content: 0 0% 100%;
  --color-secondary: 280 70% 65%;
  --color-secondary-content: 0 0% 100%;
  --color-tertiary: 200 85% 55%;
  --color-tertiary-content: 0 0% 100%;

  /* Base colors */
  --color-base-100: 0 0% 100%;
  --color-base-200: 220 20% 97%;
  --color-base-300: 220 20% 94%;
  --color-base-content: 220 20% 20%;

  /* Add remaining tokens... */
}
```

## Requirements

- Tailwind CSS v4.0.0 or later
- Modern browsers with CSS custom properties support (Chrome 49+, Firefox 31+, Safari 9.1+, Edge 15+)

## Development

```bash
# Install dependencies
bun install

# Build the package
bun run build

# Watch mode
bun run dev

# Type check
bun run typecheck

# Run tests
bun run test
bun run test:visual
bun run test:integration
bun run test:a11y
```

## Migration from v0.x

v1.0.0 introduces breaking changes for Tailwind CSS v4 support:

### Before (v0.x with Tailwind v3)
```js
// tailwind.config.js
import duskmoonui from '@duskmoon-dev/core';

export default {
  plugins: [duskmoonui()],
};
```

### After (v1.0.0 with Tailwind v4)
```css
/* src/styles.css */
@import "tailwindcss";
@import "@duskmoon-dev/core";
```

See [MIGRATION.md](./MIGRATION.md) for detailed migration guide.

## License

MIT
