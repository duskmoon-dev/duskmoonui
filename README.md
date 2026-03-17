# DuskMoonUI

> A CSS-only component library for Tailwind CSS v4 with Material Design 3's extended color system

[![CI](https://github.com/duskmoon-dev/duskmoonui/actions/workflows/ci.yml/badge.svg)](https://github.com/duskmoon-dev/duskmoonui/actions/workflows/ci.yml)
[![@duskmoon-dev/core](https://img.shields.io/npm/v/@duskmoon-dev/core)](https://www.npmjs.com/package/@duskmoon-dev/core)
[![@duskmoon-dev/css-art](https://img.shields.io/npm/v/@duskmoon-dev/css-art)](https://www.npmjs.com/package/@duskmoon-dev/css-art)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **Extended Color System** - 65+ Material Design 3 color tokens in OKLCH format
- **50+ Components** - Buttons, cards, forms, modals, navigation, and more
- **5 Themes** - Sunshine, Moonlight, Ocean, Forest, Sunset built-in
- **CSS-Only** - No JavaScript runtime, works with any framework
- **Tailwind CSS v4** - Native CSS imports, modern color functions
- **Accessible** - WCAG AA contrast ratios with on-color variants

## Quick Start

### Installation

```bash
bun add @duskmoon-dev/core tailwindcss@^4.0.0

# or npm
npm install @duskmoon-dev/core tailwindcss@^4.0.0
```

### Setup

Import the library in your CSS file:

#### Option A: CSS `@import` (Recommended)

```css
@import "tailwindcss";
@import "@duskmoon-dev/core";
```

#### Option B: Tailwind `@plugin` Directive

```css
@import "tailwindcss";
@plugin "@duskmoon-dev/core/plugin";
```

The `@plugin` approach registers Material Design 3 color tokens into Tailwind's theme, enabling utility classes like `bg-primary`, `text-on-surface`, etc.

Set the theme in your HTML:

```html
<html data-theme="sunshine">
  <!-- Your app -->
</html>
```

### Usage

Use the component classes:

```html
<!-- Buttons -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary btn-outline">Outlined</button>
<button class="btn btn-tertiary btn-ghost">Ghost</button>

<!-- Cards -->
<div class="card">
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>Card content goes here.</p>
  </div>
</div>

<!-- Form inputs -->
<input type="text" class="input" placeholder="Enter text..." />
<input type="text" class="input input-primary" placeholder="Primary input" />
```

Or use the color utilities directly:

```html
<div class="bg-primary text-primary-content">Primary background</div>
<div class="bg-surface-container text-on-surface">Surface container</div>
```

## Components

DuskMoonUI includes 50+ components organized by category:

**Forms:** Button, Input, Checkbox, Radio, Select, Textarea, Switch, Slider, Autocomplete, Datepicker, File Upload, Rating

**Data Display:** Card, Badge, Avatar, Chip, Table, List, Timeline

**Feedback:** Alert, Dialog, Modal, Toast, Snackbar, Progress, Skeleton, Tooltip

**Navigation:** Navbar, Tabs, Drawer, Breadcrumbs, Pagination, Stepper, Bottom Navigation

**Layout:** Divider, App Bar

**Overlay:** Menu, Popover, Bottom Sheet, Collapse, Accordion

## Built-in Themes

Five themes are included. Apply via `data-theme` on `<html>`:

| Theme | Style | Primary | Secondary | Tertiary |
|-------|-------|---------|-----------|----------|
| `sunshine` | Light | Warm Orange | Pink | Purple |
| `moonlight` | Dark | Soft Blue | Purple | Teal |
| `ocean` | Dark-cool | Cyan | Indigo | Green |
| `forest` | Dark-warm | Green | Amber | Teal |
| `sunset` | Light-warm | Rose | Orange | Gold |

Switch themes dynamically:

```html
<button onclick="document.documentElement.dataset.theme = 'moonlight'">
  Dark Mode
</button>
```

## Color System

DuskMoonUI uses OKLCH color format for perceptually uniform colors. Focus states are generated dynamically using `color-mix()`:

```css
/* Hover states use color-mix() */
.btn-primary:hover {
  background-color: color-mix(in oklch, var(--color-primary), black 10%);
}
```

### Color Tokens

**Brand Colors** (Primary, Secondary, Tertiary):
- `{color}` - Main color
- `{color}-content` - Text on main color
- `{color}-container` - Tinted background
- `on-{color}-container` - Text on container

**Surface Elevation:**
- `surface` - Base surface
- `surface-dim`, `surface-bright` - Dimmed/brightened variants
- `surface-container-{lowest,low,default,high,highest}` - 5 elevation levels
- `on-surface`, `on-surface-variant` - Text colors

**Semantic Colors:**
- `info`, `success`, `warning`, `error` - Status colors
- `{status}-content` - Text on status colors
- `{status}-container`, `on-{status}-container` - Container variants

**Outline:**
- `outline` - Borders and dividers
- `outline-variant` - Subtle borders

## Development

### Prerequisites

- [Bun](https://bun.sh/) v1.0 or later
- Node.js v18 or later (optional)

### Setup

```bash
git clone https://github.com/duskmoon-dev/duskmoonui.git
cd duskmoonui
bun install
```

### Commands

```bash
# Build packages
bun run build:core        # CSS bundle + TS declarations + ESM/CJS plugin
bun run build:css-art     # CSS art package
bun run build:docs        # Docs site (includes astro check + pagefind indexing)

# Development
bun run dev               # Docs site with hot-reload (localhost:4321/duskmoonui/)
bun run dev:core          # Watch mode for core CSS

# Tests (run from packages/core/)
bun test tests/unit                          # Unit tests (~360)
bun test tests/unit/button.test.ts           # Single test file
bun run test:visual                          # Playwright visual regression
bun run test:a11y                            # axe-core accessibility

# Type checking
bun run typecheck
```

## Project Structure

```
duskmoonui/
├── packages/
│   ├── core/                 # @duskmoon-dev/core (published)
│   │   ├── src/
│   │   │   ├── base/         # Color token definitions (@theme)
│   │   │   ├── themes/       # 5 built-in themes (.css + .ts per theme)
│   │   │   ├── components/   # 50+ component CSS files
│   │   │   └── tailwind-plugin.ts
│   │   ├── tests/
│   │   │   ├── unit/         # CSS assertion tests (~360)
│   │   │   ├── visual/       # Playwright visual regression
│   │   │   └── accessibility/# axe-core a11y tests
│   │   └── dist/             # Built files
│   ├── css-art/              # @duskmoon-dev/css-art (published)
│   │   └── src/              # Pure CSS illustrations
│   └── docs/                 # Documentation site (Astro 5, MDX, i18n)
│       └── src/content/docs/en/components/  # Component MDX pages
└── examples/
    ├── astro-starter/
    └── nextjs-starter/
```

## Who Uses This

- **[duskmoon-elements](https://github.com/duskmoon-dev/duskmoon-elements)** - Web Components library (`<el-dm-*>`) that adopts `@duskmoon-dev/core` CSS via `CSSStyleSheet`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Material Design 3 for the comprehensive color system
- Tailwind CSS for the utility-first framework
- Bun for the fast JavaScript runtime
