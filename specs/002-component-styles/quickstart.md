# Quickstart: Using DuskMoonUI Components

**Feature**: 002-component-styles
**Date**: 2025-12-05

## Prerequisites

- Tailwind CSS v4.0.0 or later
- Node.js 18+ or Bun 1.0+

## Installation

```bash
# Using Bun (recommended)
bun add @duskmoon-dev/core tailwindcss

# Using npm
npm install @duskmoon-dev/core tailwindcss

# Using pnpm
pnpm add @duskmoon-dev/core tailwindcss
```

## Setup

### 1. Import the CSS

In your main CSS file:

```css
/* app.css */
@import "tailwindcss";
@import "@duskmoon-dev/core";
```

### 2. Set the Theme

Add the `data-theme` attribute to your HTML:

```html
<html data-theme="sunshine">
  <!-- Your app -->
</html>
```

Available themes:
- `sunshine` - Light theme with warm colors
- `moonlight` - Dark theme with cool colors

## Basic Usage

### Buttons

```html
<!-- Primary button -->
<button class="btn btn-primary">Primary</button>

<!-- Secondary button -->
<button class="btn btn-secondary">Secondary</button>

<!-- Tertiary button -->
<button class="btn btn-tertiary">Tertiary</button>

<!-- Outlined variant -->
<button class="btn btn-outlined btn-primary">Outlined</button>

<!-- Size variants -->
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary btn-lg">Large</button>
```

### Cards

```html
<div class="card card-elevated">
  <div class="card-body">
    <h3 class="card-title">Card Title</h3>
    <p>Card content goes here.</p>
  </div>
</div>

<!-- Outlined card -->
<div class="card card-outlined">
  <div class="card-body">Content</div>
</div>
```

### Form Inputs

```html
<!-- Text input -->
<input type="text" class="input" placeholder="Enter text" />

<!-- Input with error state -->
<input type="text" class="input input-error" placeholder="Error state" />

<!-- Input group -->
<div class="input-group">
  <label class="label">Email</label>
  <input type="email" class="input" placeholder="you@example.com" />
  <span class="helper-text">We'll never share your email.</span>
</div>
```

### Alerts

```html
<!-- Info alert -->
<div class="alert alert-info">
  <span class="alert-title">Information</span>
  <span class="alert-description">This is an info message.</span>
</div>

<!-- Success alert -->
<div class="alert alert-success">
  Operation completed successfully!
</div>

<!-- Warning alert -->
<div class="alert alert-warning">
  Please review before continuing.
</div>

<!-- Error alert -->
<div class="alert alert-error">
  An error occurred.
</div>
```

### Badges

```html
<span class="badge badge-primary">Primary</span>
<span class="badge badge-secondary">Secondary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-error">Error</span>
```

### Chips

```html
<span class="chip chip-primary">Chip</span>
<span class="chip chip-outlined">Outlined</span>
<span class="chip chip-primary">
  <span class="chip-label">With Icon</span>
  <button class="chip-close">×</button>
</span>
```

## Theme Switching

Toggle between themes with JavaScript:

```javascript
// Switch to dark theme
document.documentElement.setAttribute('data-theme', 'moonlight');

// Switch to light theme
document.documentElement.setAttribute('data-theme', 'sunshine');

// Toggle based on system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.setAttribute('data-theme', prefersDark ? 'moonlight' : 'sunshine');
```

## Combining with Tailwind Utilities

DuskMoonUI components work alongside Tailwind utilities:

```html
<!-- Button with extra margin and custom width -->
<button class="btn btn-primary mt-4 w-full">Full Width Button</button>

<!-- Card with grid layout -->
<div class="grid grid-cols-3 gap-4">
  <div class="card card-elevated">Card 1</div>
  <div class="card card-elevated">Card 2</div>
  <div class="card card-elevated">Card 3</div>
</div>
```

## Component Categories

### Navigation
- `navbar` - Top navigation bar
- `tabs` - Tab navigation
- `breadcrumbs` - Breadcrumb navigation
- `pagination` - Page navigation
- `stepper` - Step progress indicator
- `bottom-nav` - Mobile bottom navigation
- `drawer` - Slide-out navigation
- `menu` - Dropdown menus

### Data Display
- `card` - Content container
- `table` - Data tables
- `list` - Item lists
- `avatar` - User avatars
- `badge` - Status badges
- `chip` - Tags and filters

### Data Entry
- `input` - Text inputs
- `textarea` - Multi-line text
- `select` - Dropdown select
- `checkbox` - Checkboxes
- `radio` - Radio buttons
- `switch` - Toggle switches
- `slider` - Range sliders
- `rating` - Star ratings
- `datepicker` - Date selection
- `autocomplete` - Search with suggestions
- `file-upload` - File input

### Feedback
- `alert` - Informational messages
- `dialog` - Modal dialogs
- `toast` - Temporary notifications
- `snackbar` - Action notifications
- `progress` - Loading indicators
- `skeleton` - Loading placeholders
- `tooltip` - Hover information

### Layout
- `divider` - Content separators
- `appbar` - Application header

### Surfaces
- `modal` - Modal overlays
- `bottomsheet` - Bottom slide-up panels
- `popover` - Floating content
- `accordion` - Collapsible sections
- `collapse` - Expandable content

## Next Steps

- Visit the [documentation site](https://duskmoon-dev.github.io/duskmoonui) for full component reference
- Check out the [examples](https://github.com/duskmoon-dev/duskmoonui/tree/main/examples) for integration patterns
- Read the [API reference](https://duskmoon-dev.github.io/duskmoonui/docs/en/components/) for all variants and options
