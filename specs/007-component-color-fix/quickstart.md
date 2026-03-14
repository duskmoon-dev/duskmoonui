# Quickstart: Verifying Component Color Variants

## Prerequisites

```bash
# Start the docs dev server
bun run dev
# Server runs at http://localhost:4321 (default Astro port)
```

## How to verify a component

### 1. Open the docs page in Chrome

Navigate to `http://localhost:4321/en/components/{name}` (e.g., `/en/components/input`).

### 2. Check default color

Inspect the base component (no modifier class). Computed `color` should resolve to
the theme's `--color-on-surface` value.

### 3. Check color variants

The page should show all 7 semantic variants in a single section:

```html
<div class="input input-primary">Primary</div>
<div class="input input-secondary">Secondary</div>
<div class="input input-tertiary">Tertiary</div>
<div class="input input-info">Info</div>
<div class="input input-success">Success</div>
<div class="input input-warning">Warning</div>
<div class="input input-error">Error</div>
```

### 4. Check ghost variant (form/interactive only)

```html
<div class="input input-ghost">Ghost</div>
```
No visible border should appear.

### 5. Verify focus ring

Click into a form/interactive component and inspect the `box-shadow` in DevTools.
It must be: `0 0 0 3px color-mix(in oklch, currentColor 20%, transparent)`.

### 6. Switch themes

Use the theme switcher in the docs site to switch between sunshine/moonlight/ocean/forest/sunset.
All variant colors must update. No variant should remain static or invisible.

## Adding variants to a CSS file

```css
/* currentColor pattern (form/interactive) */
.input {
  color: var(--color-on-surface);
  border: 1px solid currentColor;
}
.input:focus {
  box-shadow: 0 0 0 3px color-mix(in oklch, currentColor 20%, transparent);
}
.input-primary  { color: var(--color-primary); }
.input-secondary { color: var(--color-secondary); }
.input-tertiary  { color: var(--color-tertiary); }
.input-info      { color: var(--color-info); }
.input-success   { color: var(--color-success); }
.input-warning   { color: var(--color-warning); }
.input-error     { color: var(--color-error); }
.input-ghost     { border-color: transparent; }

/* bg+content pattern (display/selection) */
.checkbox {
  color: var(--color-on-surface);
}
.checkbox:focus {
  box-shadow: 0 0 0 3px color-mix(in oklch, currentColor 20%, transparent);
}
.checkbox-primary  { background: var(--color-primary);   color: var(--color-primary-content); }
.checkbox-secondary{ background: var(--color-secondary); color: var(--color-secondary-content); }
/* ... */
```

## Adding variants to an MDX docs page

Use `ComponentShowcase` with tabs for each variant:

```mdx
<ComponentShowcase title="Color Variants" code={`...`}>
  <div class="input input-primary" ...>Primary</div>
  <div class="input input-secondary" ...>Secondary</div>
  <div class="input input-tertiary" ...>Tertiary</div>
  <div class="input input-info" ...>Info</div>
  <div class="input input-success" ...>Success</div>
  <div class="input input-warning" ...>Warning</div>
  <div class="input input-error" ...>Error</div>
</ComponentShowcase>
```
