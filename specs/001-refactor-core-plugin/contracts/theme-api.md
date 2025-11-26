# Theme API Contract

**Version**: 1.0.0
**Last Updated**: 2025-11-19

## Overview

Themes define color palettes and design tokens for @duskmoon-dev/core. Users can use built-in themes (sunshine, moonlight) or create custom themes.

## Theme Definition

### CSS Syntax

```css
@plugin "@duskmoon-dev/core/theme" {
  name: "mytheme";
  default: false;
  prefersdark: false;
  color-scheme: light;

  /* Required: Brand colors */
  --color-primary: 240 80% 60%;
  --color-secondary: 280 70% 65%;
  --color-tertiary: 200 85% 55%;

  /* Required: Neutral colors */
  --color-base-100: 0 0% 100%;
  --color-base-content: 0 0% 20%;

  /* Optional: Auto-generated if not provided */
  --color-primary-content: 0 0% 100%;
  --color-secondary-content: 0 0% 100%;
  --color-tertiary-content: 0 0% 100%;

  /* Optional: Semantic colors */
  --color-info: 200 100% 50%;
  --color-success: 150 60% 50%;
  --color-warning: 40 100% 50%;
  --color-error: 0 80% 60%;
}
```

### TypeScript Syntax

```typescript
import type { ThemeDefinition } from '@duskmoon-dev/core';

const myTheme: ThemeDefinition = {
  name: 'mytheme',
  default: false,
  prefersDark: false,
  colorScheme: 'light',
  colors: {
    primary: '240 80% 60%',
    secondary: '280 70% 65%',
    tertiary: '200 85% 55%',
    base100: '0 0% 100%',
    baseContent: '0 0% 20%',
    // Optional colors omitted, will be auto-generated
  }
};
```

## Applying Themes

### HTML Attribute

```html
<!-- Default theme (sunshine) -->
<html data-theme="sunshine">
  <body>
    <button class="btn btn-primary">Sunshine Button</button>
  </body>
</html>

<!-- Moonlight theme -->
<html data-theme="moonlight">
  <body>
    <button class="btn btn-primary">Moonlight Button</button>
  </body>
</html>

<!-- Scoped theme -->
<div data-theme="mycustom">
  <button class="btn btn-primary">Custom Theme Button</button>
</div>
```

### JavaScript (Optional)

```javascript
// Set theme
function setTheme(name) {
  document.documentElement.setAttribute('data-theme', name);
  localStorage.setItem('theme', name);
}

// Get theme
function getTheme() {
  return localStorage.getItem('theme') || 'sunshine';
}

// Auto-detect system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(prefersDark ? 'moonlight' : 'sunshine');
```

## Built-In Themes

### Sunshine (Light)
- Primary: Warm Orange (#f59e0b)
- Secondary: Pink (#ec4899)
- Tertiary: Purple (#8b5cf6)
- Base: White backgrounds

### Moonlight (Dark)
- Primary: Soft Blue (#3b82f6)
- Secondary: Purple (#a78bfa)
- Tertiary: Teal (#14b8a6)
- Base: Dark backgrounds

## Validation

### Required Fields
- `name` (string, unique, kebab-case)
- `color-scheme` ('light' | 'dark')
- `--color-primary` (HSL format)
- `--color-secondary` (HSL format)
- `--color-tertiary` (HSL format)
- `--color-base-100` (HSL format)
- `--color-base-content` (HSL format)

### Auto-Generated Fields
- `--color-primary-content` (if missing)
- `--color-secondary-content` (if missing)
- `--color-tertiary-content` (if missing)
- All surface colors (if missing)
- All container colors (if missing)

### Contrast Validation
- Content colors MUST achieve 4.5:1 contrast ratio with base colors
- Build warning if contrast < 4.5:1
- Auto-generation ensures WCAG AA compliance
