# DuskMoonUI

> A CSS-only component library for Tailwind CSS v4 with Material Design 3's extended color system

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **Extended Color System** - 65+ Material Design 3 color tokens in OKLCH format
- **49 Components** - Buttons, cards, forms, modals, navigation, and more
- **Beautiful Themes** - Sunshine (light) and Moonlight (dark) built-in themes
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

DuskMoonUI includes 49 components organized by category:

**Forms:** Button, Input, Checkbox, Radio, Select, Textarea, Switch, Slider, Autocomplete, Datepicker, File Upload, Rating

**Data Display:** Card, Badge, Avatar, Chip, Table, List, Timeline

**Feedback:** Alert, Dialog, Modal, Toast, Snackbar, Progress, Skeleton, Tooltip

**Navigation:** Navbar, Tabs, Drawer, Breadcrumbs, Pagination, Stepper, Bottom Navigation

**Layout:** Divider, App Bar

**Overlay:** Menu, Popover, Bottom Sheet, Collapse, Accordion

## Built-in Themes

### Sunshine (Light)

Warm, energetic light theme with golden and vibrant accents.

- Primary: Warm Orange
- Secondary: Pink
- Tertiary: Purple

### Moonlight (Dark)

Serene, elegant dark theme with cool tones and soft accents.

- Primary: Soft Blue
- Secondary: Purple
- Tertiary: Teal

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
# Build core package
bun run build:core

# Watch mode for development
bun run dev:core

# Type checking
bun run typecheck

# Run unit tests
cd packages/core && bun test tests/unit

# Run visual regression tests
cd packages/core && bun run test:visual

# Run all tests
cd packages/core && bun run test:all
```

## Project Structure

```
duskmoonui/
├── packages/
│   └── core/                 # @duskmoon-dev/core
│       ├── src/
│       │   ├── base/         # Color token definitions
│       │   ├── themes/       # Built-in themes (sunshine, moonlight)
│       │   ├── components/   # 49 component CSS files
│       │   ├── generators/   # CSS variable generators
│       │   └── types/        # TypeScript definitions
│       ├── tests/
│       │   ├── unit/         # Unit tests
│       │   ├── visual/       # Visual regression tests
│       │   └── accessibility/# a11y tests
│       └── dist/             # Built files
└── examples/
    ├── demo/                 # Interactive demo
    ├── astro-starter/        # Astro example
    └── nextjs-starter/       # Next.js example
```

## Who Uses This

- **[duskmoon-elements](https://github.com/duskmoon-dev/duskmoon-elements)** - Web Components library that uses `@duskmoon-dev/core` CSS for its custom elements

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Material Design 3 for the comprehensive color system
- Tailwind CSS for the utility-first framework
- Bun for the fast JavaScript runtime
