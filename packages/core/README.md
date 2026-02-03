# @duskmoon-dev/core

> DuskMoonUI - A Tailwind CSS v4 plugin with Material Design 3 color system and 42 component styles

[![npm version](https://img.shields.io/npm/v/@duskmoon-dev/core.svg)](https://www.npmjs.com/package/@duskmoon-dev/core)
[![npm downloads](https://img.shields.io/npm/dm/@duskmoon-dev/core.svg)](https://www.npmjs.com/package/@duskmoon-dev/core)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@duskmoon-dev/core)](https://bundlephobia.com/package/@duskmoon-dev/core)
[![license](https://img.shields.io/npm/l/@duskmoon-dev/core.svg)](https://github.com/duskmoon-dev/duskmoonui/blob/main/LICENSE)

## Features

- 🎨 **Three-color system** - Primary, secondary, and tertiary brand colors with automatic content colors
- 🌓 **Built-in themes** - Sunshine (light) and Moonlight (dark) themes ready to use
- 📦 **55+ Material Design 3 color tokens** - Full MD3 color system with OKLCH format
- 🧩 **42 UI components** - Complete component library with consistent styling
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

### 1. Add DuskMoonUI to your CSS

#### Option A: CSS `@import` (recommended)

```css
/* src/styles.css */
@import "tailwindcss";
@import "@duskmoon-dev/core";
```

#### Option B: Tailwind `@plugin` directive

```css
/* src/styles.css */
@import "tailwindcss";
@plugin "@duskmoon-dev/core/plugin";
```

The `@plugin` approach registers Material Design 3 color tokens directly into Tailwind's theme, enabling utility classes like `bg-primary`, `text-on-surface`, etc. Use this when you need Tailwind-aware color utilities alongside the component styles.

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

@duskmoon-dev/core includes **42 components** organized into 7 categories:

### Core Components (6)

| Component | Classes | Description |
|-----------|---------|-------------|
| Button | `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-ghost` | Buttons with variants, sizes, and states |
| Card | `.card`, `.card-body`, `.card-title`, `.card-bordered` | Content containers with headers and actions |
| Input | `.input`, `.input-bordered`, `.input-primary` | Text inputs with sizes and states |
| Form | `.form-control`, `.label`, `.checkbox`, `.radio`, `.toggle`, `.select`, `.textarea` | Form elements and layouts |
| Navigation | `.navbar`, `.menu`, `.breadcrumbs`, `.tabs`, `.pagination`, `.dropdown` | Navigation patterns |
| Modal | `.modal`, `.modal-box`, `.modal-action` | Dialog overlays |

### Data Display (5)

| Component | Classes | Description |
|-----------|---------|-------------|
| Avatar | `.avatar`, `.avatar-sm`, `.avatar-lg`, `.avatar-group` | User avatars with sizes and groups |
| Badge | `.badge`, `.badge-primary`, `.badge-outline`, `.badge-dot` | Status indicators and labels |
| Chip | `.chip`, `.chip-primary`, `.chip-outlined`, `.chip-closeable` | Interactive tags |
| List | `.list`, `.list-item`, `.list-bordered`, `.list-hoverable` | Vertical item lists |
| Table | `.table`, `.table-zebra`, `.table-hover`, `.table-bordered` | Data tables |

### Data Entry (6)

| Component | Classes | Description |
|-----------|---------|-------------|
| Autocomplete | `.autocomplete`, `.autocomplete-dropdown`, `.autocomplete-option` | Searchable dropdowns |
| Datepicker | `.datepicker`, `.datepicker-dropdown`, `.datepicker-day` | Date selection |
| File Upload | `.file-upload`, `.file-upload-dropzone`, `.file-upload-item` | File uploads with drag-drop |
| Rating | `.rating`, `.rating-item`, `.rating-half` | Star ratings |
| Slider | `.slider`, `.slider-thumb`, `.slider-track` | Range inputs |
| Switch | `.switch`, `.switch-track`, `.switch-thumb` | Toggle switches |

### Feedback (7)

| Component | Classes | Description |
|-----------|---------|-------------|
| Alert | `.alert`, `.alert-info`, `.alert-success`, `.alert-warning`, `.alert-error` | Alert messages |
| Dialog | `.dialog`, `.dialog-header`, `.dialog-body`, `.dialog-footer` | Confirmation dialogs |
| Progress | `.progress`, `.progress-bar`, `.progress-circular` | Progress indicators |
| Skeleton | `.skeleton`, `.skeleton-text`, `.skeleton-circle`, `.skeleton-wave` | Loading placeholders |
| Snackbar | `.snackbar`, `.snackbar-message`, `.snackbar-action` | Brief notifications |
| Toast | `.toast`, `.toast-container`, `.toast-info`, `.toast-success` | Toast notifications |
| Tooltip | `.tooltip`, `.tooltip-content`, `.tooltip-top`, `.tooltip-bottom` | Hover tooltips |

### Layout (2)

| Component | Classes | Description |
|-----------|---------|-------------|
| App Bar | `.appbar`, `.appbar-title`, `.appbar-nav`, `.appbar-actions` | Top app bars |
| Divider | `.divider`, `.divider-vertical`, `.divider-text` | Content separators |

### Navigation (3)

| Component | Classes | Description |
|-----------|---------|-------------|
| Bottom Navigation | `.bottom-nav`, `.bottom-nav-item`, `.bottom-nav-indicator` | Mobile navigation |
| Drawer | `.drawer`, `.drawer-content`, `.drawer-nav-item` | Side navigation |
| Stepper | `.stepper`, `.stepper-step`, `.stepper-indicator` | Multi-step processes |

### Surfaces (4)

| Component | Classes | Description |
|-----------|---------|-------------|
| Accordion | `.accordion`, `.accordion-item`, `.accordion-header`, `.accordion-content` | Expandable panels |
| Bottom Sheet | `.bottomsheet`, `.bottomsheet-handle`, `.bottomsheet-content` | Mobile sheets |
| Collapse | `.collapse`, `.collapse-content`, `.collapse-toggle` | Collapsible content |
| Popover | `.popover`, `.popover-content`, `.popover-arrow` | Floating content |

### Misc (1)

| Component | Classes | Description |
|-----------|---------|-------------|
| Timeline | `.timeline`, `.timeline-item`, `.timeline-marker` | Event timelines |

## Component Examples

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
```

### Avatar
```html
<div class="avatar">
  <img src="user.jpg" alt="User" />
</div>
<div class="avatar avatar-lg avatar-rounded">
  <img src="user.jpg" alt="User" />
</div>
<div class="avatar-group">
  <div class="avatar"><img src="user1.jpg" /></div>
  <div class="avatar"><img src="user2.jpg" /></div>
  <div class="avatar"><img src="user3.jpg" /></div>
</div>
```

### Alert
```html
<div class="alert alert-info">
  <span class="alert-icon">ℹ</span>
  <span class="alert-message">Information message</span>
</div>
<div class="alert alert-success">Success!</div>
<div class="alert alert-warning">Warning!</div>
<div class="alert alert-error">Error!</div>
```

### Progress
```html
<!-- Linear -->
<div class="progress">
  <div class="progress-bar" style="width: 60%"></div>
</div>

<!-- Indeterminate -->
<div class="progress progress-indeterminate">
  <div class="progress-bar"></div>
</div>

<!-- Circular -->
<div class="progress-circular">
  <svg><circle class="progress-circular-track" /><circle class="progress-circular-bar" /></svg>
</div>
```

### Toast
```html
<div class="toast-container toast-container-top-right">
  <div class="toast toast-success show">
    <span class="toast-icon">✓</span>
    <div class="toast-content">
      <span class="toast-title">Success</span>
      <span class="toast-message">Your changes have been saved.</span>
    </div>
    <button class="toast-close">×</button>
  </div>
</div>
```

### Stepper
```html
<div class="stepper">
  <div class="stepper-step completed">
    <div class="stepper-indicator">1</div>
    <span class="stepper-title">Step 1</span>
  </div>
  <div class="stepper-step active">
    <div class="stepper-indicator">2</div>
    <span class="stepper-title">Step 2</span>
  </div>
  <div class="stepper-step">
    <div class="stepper-indicator">3</div>
    <span class="stepper-title">Step 3</span>
  </div>
</div>
```

## Color System

DuskMoonUI v2.0 uses the OKLCH color format for perceptually uniform color manipulation.

### Brand Colors (12 tokens)
- `primary`, `primary-content`, `primary-container`, `on-primary-container`
- `secondary`, `secondary-content`, `secondary-container`, `on-secondary-container`
- `tertiary`, `tertiary-content`, `tertiary-container`, `on-tertiary-container`

> **Note**: `-focus` tokens are removed in v2.0. Use `color-mix()` instead:
> ```css
> .btn:hover {
>   background-color: color-mix(in oklch, var(--color-primary), black 10%);
> }
> ```

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

Define custom themes using OKLCH format:

```css
[data-theme="custom"] {
  color-scheme: light;

  /* OKLCH format: oklch(L% C H) */
  /* L = Lightness (0-100%), C = Chroma (0-0.4), H = Hue (0-360) */
  --color-primary: oklch(65% 0.18 255);
  --color-primary-content: oklch(100% 0 0);
  --color-secondary: oklch(60% 0.18 300);
  --color-secondary-content: oklch(100% 0 0);
  --color-tertiary: oklch(70% 0.15 80);
  --color-tertiary-content: oklch(20% 0 0);

  /* Base colors */
  --color-base-100: oklch(100% 0 0);
  --color-base-200: oklch(98% 0.01 85);
  --color-base-300: oklch(96% 0.01 85);
  --color-base-content: oklch(27% 0.02 260);

  /* Add remaining tokens... */
}
```

### OKLCH Color Values

| Hue | Color |
|-----|-------|
| 0/360 | Pink |
| 30 | Red |
| 55 | Orange |
| 80 | Yellow |
| 145 | Green |
| 185 | Teal |
| 235 | Blue |
| 255 | Indigo |
| 300 | Purple |

## Accessibility

All components include:

- **Keyboard navigation** - Full keyboard support with focus indicators
- **Screen reader support** - Proper ARIA attributes and semantic HTML
- **Color contrast** - WCAG AA compliant (4.5:1 minimum)
- **Reduced motion** - Respects `prefers-reduced-motion` preference

## Requirements

- Tailwind CSS v4.0.0 or later
- Modern browsers with OKLCH and `color-mix()` support:
  - Chrome 111+ (March 2023)
  - Safari 15.4+ (March 2022)
  - Firefox 113+ (May 2023)
  - Edge 111+ (March 2023)
- Global browser support: ~92%

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

## Migration from v1.x

v2.0.0 introduces OKLCH color format (breaking change):

### Color Format Change

**Before (v1.x - HSL)**:
```css
/* Theme values stored as HSL components */
--color-primary: 30 90% 55%;
background-color: hsl(var(--color-primary));
```

**After (v2.0 - OKLCH)**:
```css
/* Theme values stored as full OKLCH */
--color-primary: oklch(72% 0.18 55);
background-color: var(--color-primary);
```

### Removed Tokens

The `-focus` tokens are removed. Use `color-mix()` instead:

```css
/* Before */
background-color: hsl(var(--color-primary-focus));

/* After */
background-color: color-mix(in oklch, var(--color-primary), black 10%);
```

### Transparency

```css
/* Before */
background-color: rgba(var(--color-primary-rgb), 0.5);

/* After */
background-color: color-mix(in oklch, var(--color-primary) 50%, transparent);
```

See [specs/004-oklch-color-system/quickstart.md](./specs/004-oklch-color-system/quickstart.md) for detailed migration guide.

## License

MIT
