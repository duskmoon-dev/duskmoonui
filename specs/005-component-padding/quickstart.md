# Quickstart: Component Padding with CSS Variables

## Overview

DuskMoonUI button and card components now expose padding via CSS custom properties, enabling easy customization and automatic RTL support.

## Button Padding

### Default Usage

```html
<button class="btn">Default Button</button>
<button class="btn btn-primary">Primary Button</button>
```

### Size Variants

```html
<button class="btn btn-xs">Extra Small</button>
<button class="btn btn-sm">Small</button>
<button class="btn btn-md">Medium (default)</button>
<button class="btn btn-lg">Large</button>
```

### Custom Padding

Override the `--btn-p` variable to customize horizontal padding:

```css
.btn-custom {
  --btn-p: 2rem;  /* Extra wide padding */
}
```

```html
<button class="btn btn-custom">Custom Padding</button>
```

## Card Padding

### Default Usage

```html
<div class="card">
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>Card content with default padding.</p>
  </div>
</div>
```

### Compact Variant

```html
<div class="card card-compact">
  <div class="card-body">
    <h2 class="card-title">Compact Card</h2>
    <p>Reduced padding for dense layouts.</p>
  </div>
</div>
```

### Custom Padding

Override the `--card-p` variable to customize padding:

```css
.card-spacious .card-body {
  --card-p: 2.5rem;
}
```

```html
<div class="card card-spacious">
  <div class="card-body">
    <h2 class="card-title">Spacious Card</h2>
    <p>Extra padding for emphasis.</p>
  </div>
</div>
```

## RTL Support

Components automatically adapt to RTL layouts. No additional configuration needed:

```html
<html dir="rtl">
  <body>
    <button class="btn btn-primary">כפתור ראשי</button>
  </body>
</html>
```

## CSS Variables Reference

| Variable | Default | Component | Description |
|----------|---------|-----------|-------------|
| `--btn-p` | `1rem` | `.btn` | Horizontal (inline) padding |
| `--btn-py` | `0.625rem` | `.btn` | Vertical (block) padding |
| `--card-p` | `1.5rem` | `.card-body` | All-sides padding |

## Size Variant Values

### Button Sizes

| Class | `--btn-p` | `--btn-py` |
|-------|-----------|------------|
| `.btn-xs` | 0.5rem | 0.25rem |
| `.btn-sm` | 0.75rem | 0.375rem |
| `.btn-md` | 1rem | 0.625rem |
| `.btn-lg` | 1.25rem | 0.875rem |

### Card Sizes

| Class | `--card-p` |
|-------|------------|
| default | 1.5rem |
| `.card-compact` | 1rem |
