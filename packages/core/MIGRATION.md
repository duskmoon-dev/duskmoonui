# Migration Guide: v0.x to v1.0.0

This guide covers migrating from `@duskmoon-dev/core` v0.x (Tailwind CSS v3) to v1.0.0 (Tailwind CSS v4).

## Overview

v1.0.0 is a complete rewrite for Tailwind CSS v4's new CSS-first architecture. The main changes are:

1. **No JavaScript plugin** - Use CSS `@import` instead of `plugins: []`
2. **Pure CSS** - All configuration is now in CSS, not JavaScript
3. **New color format** - HSL space-separated values instead of hex

## Step-by-Step Migration

### Step 1: Update Dependencies

```bash
# Remove old version and install new
bun remove @duskmoon-dev/core
bun add @duskmoon-dev/core tailwindcss@^4.0.0

# Or with npm
npm uninstall @duskmoon-dev/core
npm install @duskmoon-dev/core tailwindcss@^4.0.0
```

### Step 2: Remove JavaScript Configuration

**Before (v0.x):**
```js
// tailwind.config.js
import duskmoonui from '@duskmoon-dev/core';

export default {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  plugins: [
    duskmoonui({
      themes: ['sunshine', 'moonlight'],
      darkTheme: 'moonlight',
    }),
  ],
};
```

**After (v1.0.0):**

Delete your `tailwind.config.js` file (or keep it minimal for other Tailwind settings).

### Step 3: Update CSS Import

**Before (v0.x):**
```css
/* src/styles.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**After (v1.0.0):**
```css
/* src/styles.css */
@import "tailwindcss";
@import "@duskmoon-dev/core";
```

### Step 4: Update HTML Theme Attribute

The `data-theme` attribute works the same way:

```html
<!-- Light theme -->
<html data-theme="sunshine">

<!-- Dark theme -->
<html data-theme="moonlight">
```

No changes needed here.

### Step 5: Update Custom Themes (if applicable)

**Before (v0.x):**
```js
// tailwind.config.js
duskmoonui({
  themes: {
    custom: {
      primary: '#3b82f6',
      'primary-content': '#ffffff',
      secondary: '#8b5cf6',
      // ...
    },
  },
});
```

**After (v1.0.0):**
```css
/* src/styles.css */
@import "tailwindcss";
@import "@duskmoon-dev/core";

[data-theme="custom"] {
  color-scheme: light;

  --color-primary: 217 91% 60%;  /* HSL values without commas */
  --color-primary-content: 0 0% 100%;
  --color-secondary: 258 90% 66%;
  /* ... */
}
```

### Step 6: Update Color Format in Custom CSS

If you used custom colors in your CSS, update them from hex to HSL:

**Before:**
```css
.my-element {
  background-color: var(--color-primary);
}
```

**After:**
```css
.my-element {
  background-color: hsl(var(--color-primary));
}
```

Or use Tailwind's utility classes which handle this automatically:
```html
<div class="bg-primary">...</div>
```

## Breaking Changes Summary

| v0.x | v1.0.0 |
|------|--------|
| `plugins: [duskmoonui()]` | `@import "@duskmoon-dev/core"` |
| JavaScript configuration | CSS custom properties |
| Hex colors (`#3b82f6`) | HSL space-separated (`217 91% 60%`) |
| `tailwind.config.js` required | Optional (only for other settings) |
| Runtime theme generation | Static CSS themes |

## Unchanged Features

- `data-theme` attribute for theme switching
- All color token names (`primary`, `secondary`, `tertiary`, etc.)
- Component class names (`btn`, `card`, `input`, etc.)
- WCAG AA accessibility compliance

## Common Issues

### Issue: Colors look different

HSL color format may render slightly differently than hex in some browsers. The visual difference is minimal and shouldn't affect design intent.

### Issue: Custom theme doesn't work

Make sure your custom theme CSS is loaded after the `@import "@duskmoon-dev/core"` line:

```css
@import "tailwindcss";
@import "@duskmoon-dev/core";

/* Custom themes MUST come after the import */
[data-theme="custom"] {
  --color-primary: 217 91% 60%;
}
```

### Issue: Build errors about missing plugin

If you see errors like "Cannot find module '@duskmoon-dev/core'", ensure:
1. You've installed v1.0.0 (`bun add @duskmoon-dev/core@^1.0.0`)
2. You're using Tailwind CSS v4 (`bun add tailwindcss@^4.0.0`)
3. Your CSS uses `@import` not `@plugin`

## Getting Help

- [Documentation](https://duskmoon-dev.github.io/duskmoonui/)
- [GitHub Issues](https://github.com/duskmoon-dev/duskmoonui/issues)
- [Changelog](./CHANGELOG.md)
