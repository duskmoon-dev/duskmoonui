# Quickstart: OKLCH Color System

**Feature**: 004-oklch-color-system
**Audience**: Developers using DuskMoonUI v2.x (post-migration)

## Overview

DuskMoonUI v2.0 migrates from HSL to OKLCH color format for better color consistency and native CSS manipulation. This guide covers the changes and how to use the new color system.

## What Changed

### Color Variable Format

**Before (v1.x - HSL)**:
```css
:root {
  --color-primary: 30 90% 55%;  /* H S% L% */
}
.my-element {
  background-color: hsl(var(--color-primary));
}
```

**After (v2.x - OKLCH)**:
```css
:root {
  --color-primary: oklch(72% 0.18 55);  /* L% C H */
}
.my-element {
  background-color: var(--color-primary);  /* Direct usage */
}
```

### Removed Tokens

The `-focus` tokens are removed. Use `color-mix()` instead:

```css
/* Old way (v1.x) */
.btn:hover {
  background-color: hsl(var(--color-primary-focus));
}

/* New way (v2.x) */
.btn:hover {
  background-color: color-mix(in oklch, var(--color-primary), black 10%);
}
```

## Using OKLCH Colors

### Basic Usage

```css
/* Apply primary color as background */
.card {
  background-color: var(--color-primary);
  color: var(--color-primary-content);
}

/* Apply with transparency */
.overlay {
  background-color: color-mix(in oklch, var(--color-primary) 50%, transparent);
}
```

### Creating Hover States

```css
.btn-primary {
  background-color: var(--color-primary);
}

.btn-primary:hover {
  /* Darken by 10% */
  background-color: color-mix(in oklch, var(--color-primary), black 10%);
}

.btn-primary:active {
  /* Darken by 20% */
  background-color: color-mix(in oklch, var(--color-primary), black 20%);
}
```

### Creating Lighter Variants

```css
.badge-subtle {
  /* Lighten by 70% (mix with white) */
  background-color: color-mix(in oklch, var(--color-primary), white 70%);
  color: var(--color-primary);
}
```

### Semantic Color Manipulation

```css
/* Error state with lighter background */
.input-error {
  border-color: var(--color-error);
  background-color: color-mix(in oklch, var(--color-error), white 90%);
}
```

## Custom Theme Creation

### Define Theme Colors

```css
[data-theme="custom"] {
  /* Primary - Teal */
  --color-primary: oklch(65% 0.15 185);
  --color-primary-content: oklch(98% 0 0);
  --color-primary-container: oklch(92% 0.04 185);
  --color-on-primary-container: oklch(30% 0.10 185);

  /* Secondary - Purple */
  --color-secondary: oklch(60% 0.18 300);
  --color-secondary-content: oklch(98% 0 0);
  --color-secondary-container: oklch(92% 0.04 300);
  --color-on-secondary-container: oklch(30% 0.12 300);

  /* Tertiary - Gold */
  --color-tertiary: oklch(75% 0.15 80);
  --color-tertiary-content: oklch(20% 0.05 80);
  --color-tertiary-container: oklch(95% 0.04 80);
  --color-on-tertiary-container: oklch(30% 0.10 80);
}
```

### OKLCH Values Explained

```
oklch(L% C H)
      │  │ └── Hue: 0-360 (color wheel angle)
      │  └──── Chroma: 0-0.4 (colorfulness, 0 = gray)
      └─────── Lightness: 0%-100% (perceptually uniform)
```

**Common Hue Values**:
- Red: ~30
- Orange: ~55
- Yellow: ~90
- Green: ~145
- Teal: ~185
- Blue: ~255
- Purple: ~300
- Pink: ~0/360

## Migration Checklist

For existing DuskMoonUI v1.x users:

1. **Update package**: `bun add @duskmoon-dev/core@^2.0.0`

2. **Update color usage** in custom CSS:
   ```css
   /* Before */
   background-color: hsl(var(--color-primary));

   /* After */
   background-color: var(--color-primary);
   ```

3. **Replace focus token usage**:
   ```css
   /* Before */
   border-color: hsl(var(--color-primary-focus));

   /* After */
   border-color: color-mix(in oklch, var(--color-primary), black 10%);
   ```

4. **Test visual appearance**: Run visual regression tests or manually verify colors

## Browser Support

OKLCH is supported in:
- Chrome 111+ (March 2023)
- Safari 15.4+ (March 2022)
- Firefox 113+ (May 2023)
- Edge 111+ (March 2023)

**Global support**: ~92%

For older browsers, colors will fall back to a safe default. Core functionality is preserved.

## Verification Commands

```bash
# Build core package
bun run build:core

# Run visual tests
bun run test:visual

# Build documentation
bun run build:docs
```

## Resources

- [OKLCH Color Picker](https://oklch.com/) - Interactive tool for creating OKLCH colors
- [MDN: OKLCH](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch)
- [MDN: color-mix()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix)
