# Research: DaisyUI Architecture Analysis

**Date**: 2025-11-19
**Purpose**: Research DaisyUI's proven architecture patterns to inform @duskmoon-dev/core refactor

## Executive Summary

DaisyUI (39.4k GitHub stars) provides a proven blueprint for building Tailwind CSS component libraries. Key findings:

1. **Pure CSS Architecture**: Zero runtime JavaScript, ~1KB base styles
2. **HSL Color System**: Space-separated HSL values enable theme switching without style duplication
3. **Utilities Layer**: Components in utilities layer (not components layer) for proper CSS specificity
4. **Theme Switching**: CSS-only via `data-theme` attribute
5. **Customization**: Three levels - built-in variants, Tailwind utilities, CSS variable overrides

## Component Structure

### File Organization

```
src/
├── themes/           # Theme definitions
├── base/             # Foundation styles (~1KB)
├── components/       # Individual component CSS files
└── utilities/        # Utility class definitions
```

### Component Definition Pattern

```css
/* button.css */
@layer components {
  .btn {
    /* Minimal base styles: display, transitions, cursor */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    flex-shrink: 0;
    transition-property: color, background-color, border-color;
    transition-duration: 200ms;

    /* Color from CSS variables (theme-aware) */
    background-color: hsl(var(--btn-bg) / var(--tw-bg-opacity, 1));
    color: hsl(var(--btn-content) / var(--tw-text-opacity, 1));
    border: 1px solid hsl(var(--btn-border) / var(--tw-border-opacity, 1));

    /* Sizing can be overridden with Tailwind utilities */
    padding: 0.5rem 1rem;
    border-radius: var(--radius-field, 0.5rem);
  }

  .btn-primary {
    --btn-bg: var(--color-primary);
    --btn-content: var(--color-primary-content);
    --btn-border: var(--color-primary);
  }

  .btn-secondary {
    --btn-bg: var(--color-secondary);
    --btn-content: var(--color-secondary-content);
    --btn-border: var(--color-secondary);
  }

  /* State modifiers */
  .btn:hover {
    filter: brightness(1.05);
  }

  .btn:active {
    filter: brightness(0.95);
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

**Key Insights**:
- **Minimal base styles**: Only essential properties (display, transitions)
- **CSS variable-based colors**: Enables theme switching without duplicating styles
- **Modifier pattern**: Base class + variant classes (`.btn` + `.btn-primary`)
- **State handling**: Hover/active/disabled via pseudo-classes
- **Customizable via utilities**: Padding, margins, borders can be overridden

## Color Variant System

### HSL Format (Space-Separated)

```css
/* Theme definition */
[data-theme="moonlight"] {
  /* Space-separated HSL (no hsl() wrapper) */
  --color-primary: 240 80% 60%;             /* Hue Saturation Lightness */
  --color-primary-content: 0 0% 100%;       /* Auto-calculated for contrast */

  --color-secondary: 280 70% 65%;
  --color-secondary-content: 0 0% 100%;

  --color-tertiary: 200 85% 55%;
  --color-tertiary-content: 0 0% 0%;

  /* Neutral colors */
  --color-base-100: 220 20% 98%;            /* Background */
  --color-base-200: 220 20% 95%;            /* Slightly darker */
  --color-base-300: 220 20% 90%;            /* Even darker */
  --color-base-content: 220 20% 20%;        /* Text on base */

  /* Semantic colors */
  --color-info: 200 100% 50%;
  --color-info-content: 0 0% 100%;

  --color-success: 150 100% 40%;
  --color-success-content: 0 0% 100%;

  --color-warning: 40 100% 50%;
  --color-warning-content: 0 0% 0%;

  --color-error: 0 100% 50%;
  --color-error-content: 0 0% 100%;
}
```

### Usage in CSS

```css
/* Component uses color via hsl() function */
.btn-primary {
  background-color: hsl(var(--color-primary) / var(--tw-bg-opacity, 1));
  color: hsl(var(--color-primary-content) / var(--tw-text-opacity, 1));
}

/* Supports opacity modifiers from Tailwind */
/* bg-primary/60 → --tw-bg-opacity: 0.6 */
```

### Automatic Content Colors

**Decision**: Generate `-content` colors automatically for accessibility

**Rationale**:
- Ensures WCAG AA contrast ratios (4.5:1 minimum)
- Reduces configuration burden
- Prevents accessibility regressions

**Algorithm** (from DaisyUI):
```javascript
// Pseudo-code for content color generation
function generateContentColor(baseColor) {
  const [h, s, l] = parseHSL(baseColor);

  // If lightness > 50%, use dark text (low lightness)
  // If lightness <= 50%, use light text (high lightness)
  const contentLightness = l > 50 ? 20 : 100;

  // Reduce saturation for better readability
  const contentSaturation = Math.min(s, 20);

  return `${h} ${contentSaturation}% ${contentLightness}%`;
}
```

## Theme Switching Mechanism

### CSS-Only Implementation

```css
/* Default theme on :root */
:root {
  --color-primary: 30 80% 50%;              /* Orange (sunshine) */
  --color-primary-content: 0 0% 100%;
  /* ... other colors */
}

/* Alternative theme via data-theme attribute */
[data-theme="moonlight"] {
  --color-primary: 240 80% 60%;             /* Blue (moonlight) */
  --color-primary-content: 0 0% 100%;
  /* ... other colors */
}

/* Scoped themes */
.card[data-theme="dark"] {
  /* This card uses dark theme regardless of root theme */
  --color-primary: 0 0% 20%;
  /* ... */
}
```

### JavaScript Theme Switcher (Optional)

```javascript
// User-facing API (NOT required by plugin)
function setTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('theme', themeName);
}

// Auto-detect system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');
const theme = savedTheme || (prefersDark ? 'moonlight' : 'sunshine');
setTheme(theme);
```

**Key Insight**: Theme switching is pure CSS - JavaScript is optional for UX convenience only.

## Customization Patterns

### Level 1: Built-In Variants (Easiest)

```html
<!-- Use component variants -->
<button class="btn btn-primary btn-outline btn-lg">
  Click me
</button>
```

**Provides**: 80% of common use cases

### Level 2: Tailwind Utilities (Common)

```html
<!-- Combine with Tailwind utilities -->
<button class="btn btn-primary rounded-full px-8 shadow-2xl">
  Custom Button
</button>
```

**Overrides**: Spacing, sizing, borders, shadows, effects

### Level 3: CSS Variable Overrides (Advanced)

```css
/* Global customization */
[data-theme="mytheme"] {
  --color-primary: 200 90% 55%;
  --radius-field: 1rem;                    /* Rounder buttons */
}

/* Component-specific */
.btn-custom {
  --btn-bg: linear-gradient(to right, var(--color-primary), var(--color-secondary));
  --btn-padding: 1.5rem 3rem;
}
```

**Provides**: Full control without writing component CSS

## Plugin Architecture

### Entry Point Structure

```javascript
// index.js (CommonJS for Tailwind v3/v4 compatibility)
module.exports = function duskmoonuiPlugin() {
  return {
    // PostCSS plugin interface
    postcssPlugin: '@duskmoon-dev/core',

    // Tailwind v4 CSS-first approach
    Once(root, { result }) {
      // Load CSS files: themes, base, components, utilities
      // Process @plugin directives
      // Generate color tokens
      // Inject component styles into appropriate layers
    }
  };
};

module.exports.postcss = true;  // PostCSS 8 plugin marker
```

### Tailwind v4 CSS Entry Point

```css
/* src/index.css - Main plugin entry */
@import './themes/index.css';
@import './base/index.css';
@import './components/index.css';
@import './utilities/index.css';
```

### Plugin Configuration (Tailwind v4)

```css
/* User's CSS file */
@plugin "@duskmoon-dev/core" {
  themes: sunshine --default, moonlight --prefersdark;
  include: button, card, input;   /* Only these components */
  prefix: "dm-";                  /* Prefix all classes: dm-btn */
}
```

## TypeScript Strategy

### Core Plugin Types

```typescript
// types/plugin.ts
export interface DuskMoonUIOptions {
  /** Themes to include (built-in names or custom theme objects) */
  themes?: Array<string | ThemeDefinition>;

  /** Components to include (default: all) */
  include?: ComponentName[] | 'all';

  /** Components to exclude */
  exclude?: ComponentName[];

  /** Class name prefix */
  prefix?: string;

  /** Enable console logs */
  logs?: boolean;
}

export type ComponentName =
  | 'button'
  | 'card'
  | 'input'
  | 'form'
  | 'navigation'
  | 'modal';

// types/theme.ts
export interface ThemeDefinition {
  name: string;
  default?: boolean;
  prefersDark?: boolean;
  colorScheme: 'light' | 'dark';
  colors: ThemeColors;
}

export interface ThemeColors {
  // Brand colors (required)
  primary: string;
  primaryContent?: string;           // Auto-generated if not provided

  secondary: string;
  secondaryContent?: string;

  tertiary: string;
  tertiaryContent?: string;

  // Neutral colors (required)
  base100: string;
  base200?: string;                  // Auto-generated if not provided
  base300?: string;
  baseContent: string;

  // Semantic colors (optional)
  info?: string;
  infoContent?: string;

  success?: string;
  successContent?: string;

  warning?: string;
  warningContent?: string;

  error?: string;
  errorContent?: string;
}
```

### No Types for Pure CSS Plugin

**Decision**: Core plugin doesn't export types (DaisyUI pattern)

**Rationale**:
- Tailwind v4 plugins are pure CSS/PostCSS
- Configuration is minimal and well-documented
- Types add complexity without significant benefit for CSS-only API

**Exception**: Export TypeScript types for:
1. **Custom theme definitions** (when creating themes in TypeScript config)
2. **React wrapper** (future: `@duskmoon-dev/react` with full component types)

## Testing Strategy

### Unit Tests (Vitest)

```typescript
// tests/unit/colors.test.ts
import { describe, it, expect } from 'vitest';
import { generateContentColor } from '../src/colors';

describe('Color Token Generation', () => {
  it('generates light content for dark backgrounds', () => {
    const result = generateContentColor('240 80% 30%');  // Dark blue
    expect(result).toBe('240 20% 100%');                  // Light text
  });

  it('generates dark content for light backgrounds', () => {
    const result = generateContentColor('240 80% 80%');  // Light blue
    expect(result).toBe('240 20% 20%');                   // Dark text
  });

  it('meets WCAG AA contrast ratio (4.5:1)', () => {
    const bg = 'hsl(240 80% 50%)';
    const fg = generateContentColor('240 80% 50%');
    const contrast = calculateContrast(bg, fg);
    expect(contrast).toBeGreaterThanOrEqual(4.5);
  });
});
```

### Visual Regression (Playwright)

```typescript
// tests/visual/components.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Button Component', () => {
  test('renders primary variant correctly', async ({ page }) => {
    await page.goto('/test-harness/button');
    await expect(page.locator('.btn-primary')).toHaveScreenshot();
  });

  test('renders across themes', async ({ page }) => {
    for (const theme of ['sunshine', 'moonlight']) {
      await page.evaluate((t) => {
        document.documentElement.setAttribute('data-theme', t);
      }, theme);

      await expect(page.locator('.btn-primary')).toHaveScreenshot(`button-primary-${theme}.png`);
    }
  });
});
```

### Integration Tests (Playwright)

```typescript
// tests/integration/theme-switch.spec.ts
test('theme switches without page reload', async ({ page }) => {
  await page.goto('/');

  // Verify sunshine theme
  const primaryBg = await page.locator('.btn-primary').evaluate(
    el => getComputedStyle(el).backgroundColor
  );
  expect(primaryBg).toBe('rgb(245, 158, 11)');  // Orange

  // Switch to moonlight
  await page.click('[data-theme-switcher="moonlight"]');

  // Verify color changed instantly (no reload)
  const newPrimaryBg = await page.locator('.btn-primary').evaluate(
    el => getComputedStyle(el).backgroundColor
  );
  expect(newPrimaryBg).toBe('rgb(59, 130, 246)');  // Blue
});
```

### Accessibility Audits (axe-core)

```typescript
// tests/accessibility/a11y.spec.ts
import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Accessibility', () => {
  test('button meets WCAG AA', async ({ page }) => {
    await page.goto('/test-harness/button');
    await injectAxe(page);

    await checkA11y(page, '.btn-primary', {
      detailedReport: true,
      detailedReportOptions: { html: true },
      rules: {
        'color-contrast': { enabled: true }
      }
    });
  });

  test('all components pass automated audit', async ({ page }) => {
    await page.goto('/test-harness/all-components');
    await injectAxe(page);

    const results = await checkA11y(page);
    expect(results.violations).toHaveLength(0);
  });
});
```

## Key Takeaways for DuskMoonUI

1. **Adopt HSL Color System**: Space-separated values enable theme switching without style duplication
2. **Pure CSS Architecture**: No JavaScript dependencies, CSS-only theme switching
3. **Minimal Component Styles**: Only colors/states in components, allow Tailwind utility overrides
4. **Utilities Layer**: Place components in utilities layer for proper CSS specificity
5. **Auto-Generate Content Colors**: Calculate accessible text colors automatically
6. **Three Customization Levels**: Built-in variants → Tailwind utilities → CSS variables
7. **Comprehensive Testing**: Unit + visual + integration + a11y for quality assurance
8. **TypeScript for React Only**: Core plugin doesn't need types, React wrapper does

## Alternatives Considered

### Alternative 1: JavaScript Plugin API (Tailwind v3)
**Rejected**: Constitution Principle II mandates Tailwind v4 CSS-first approach only

### Alternative 2: RGB Color Format
**Rejected**: HSL provides better programmatic manipulation for theme generation

### Alternative 3: Components Layer
**Rejected**: DaisyUI research shows utilities layer provides better specificity for customization

### Alternative 4: Separate CSS Files per Theme
**Rejected**: CSS variables enable single-file approach with runtime theme switching
