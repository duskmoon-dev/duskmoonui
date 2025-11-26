# Plugin API Contract

**Version**: 1.0.0
**Last Updated**: 2025-11-19

## Overview

The @duskmoon-dev/core plugin provides a Tailwind CSS v4 compatible interface for adding Material Design 3 color tokens and component styles to any project. The plugin follows Tailwind v4's CSS-first architecture using `@plugin` directives.

## Installation Contract

### Package Import

```css
/* User's CSS file (e.g., src/styles/global.css) */
@plugin "@duskmoon-dev/core";
```

**Behavior**:
- Injects 65+ color tokens as CSS custom properties
- Loads default themes (sunshine, moonlight)
- Registers component styles in utilities layer
- Does NOT require tailwind.config.js configuration

### With Configuration

```css
@plugin "@duskmoon-dev/core" {
  themes: sunshine --default, moonlight --prefersdark;
  include: button, card, input;
  prefix: "dm-";
}
```

## Configuration API

### Plugin Options

```typescript
interface PluginConfig {
  /** Themes to include (default: ['sunshine', 'moonlight']) */
  themes?: Array<string | ThemeDefinition>;

  /** Components to include (default: 'all') */
  include?: ComponentName[] | 'all';

  /** Components to exclude (default: []) */
  exclude?: ComponentName[];

  /** Class name prefix (default: '') */
  prefix?: string;

  /** Enable console logs (default: false) */
  logs?: boolean;
}

type ComponentName =
  | 'button'
  | 'card'
  | 'input'
  | 'form'
  | 'navigation'
  | 'modal';

interface ThemeDefinition {
  name: string;
  default?: boolean;
  prefersDark?: boolean;
  colorScheme: 'light' | 'dark';
  colors: {
    // Required brand colors
    primary: string;
    secondary: string;
    tertiary: string;

    // Required neutral colors
    base100: string;
    baseContent: string;

    // Optional (auto-generated if not provided)
    primaryContent?: string;
    secondaryContent?: string;
    tertiaryContent?: string;

    // Optional semantic colors
    info?: string;
    infoContent?: string;
    success?: string;
    successContent?: string;
    warning?: string;
    warningContent?: string;
    error?: string;
    errorContent?: string;

    // Optional neutral shades
    base200?: string;
    base300?: string;
    // ... base400-base900
  };
}
```

### Examples

**Example 1: Default Configuration**
```css
@plugin "@duskmoon-dev/core";
```

**Result**:
- All components included
- Both built-in themes (sunshine, moonlight) loaded
- No prefix
- sunshine set as default
- moonlight used when `prefers-color-scheme: dark`

**Example 2: Selective Components**
```css
@plugin "@duskmoon-dev/core" {
  include: button, card, input;
}
```

**Result**:
- Only button, card, and input components
- Reduced bundle size
- All themes still available

**Example 3: Custom Theme**
```css
@plugin "@duskmoon-dev/core" {
  themes: mycustom --default;
}

@plugin "@duskmoon-dev/core/theme" {
  name: "mycustom";
  color-scheme: light;
  --color-primary: 200 90% 55%;
  --color-secondary: 280 85% 60%;
  --color-tertiary: 340 80% 65%;
  --color-base-100: 0 0% 100%;
  --color-base-content: 0 0% 20%;
}
```

**Result**:
- Custom theme "mycustom" as default
- Content colors auto-generated
- Built-in themes not loaded

**Example 4: Prefixed Classes**
```css
@plugin "@duskmoon-dev/core" {
  prefix: "dm-";
}
```

**Result**:
- Classes: `dm-btn`, `dm-card`, `dm-btn-primary`, etc.
- Useful to avoid conflicts with existing libraries

## Error Handling Contract

### Invalid Configuration

**Input**:
```css
@plugin "@duskmoon-dev/core" {
  include: nonexistent-component;
}
```

**Behavior**:
- **Build-time error** with clear message
- Error message format: `[@duskmoon-dev/core] Unknown component: "nonexistent-component". Valid components: button, card, input, form, navigation, modal`
- Build process MUST fail (do not silently ignore)

### Missing Required Colors

**Input**:
```css
@plugin "@duskmoon-dev/core/theme" {
  name: "incomplete";
  --color-primary: 200 90% 55%;
  /* Missing secondary, tertiary, base-100, base-content */
}
```

**Behavior**:
- **Build-time error** with clear message
- Error message: `[@duskmoon-dev/core] Theme "incomplete" missing required colors: secondary, tertiary, base-100, base-content`
- Build process MUST fail

### Invalid Color Format

**Input**:
```css
@plugin "@duskmoon-dev/core/theme" {
  name: "broken";
  --color-primary: hsl(200, 90%, 55%);  /* Wrong format */
}
```

**Behavior**:
- **Build-time error** with clear message
- Error message: `[@duskmoon-dev/core] Invalid color format for "primary" in theme "broken". Expected space-separated HSL (e.g., "200 90% 55%"), got "hsl(200, 90%, 55%)"`
- Build process MUST fail

### Low Contrast Warning

**Input**:
```css
@plugin "@duskmoon-dev/core/theme" {
  name: "lowcontrast";
  --color-primary: 60 90% 70%;           /* Light yellow */
  --color-primary-content: 55 80% 80%;   /* Also light */
}
```

**Behavior**:
- **Build-time warning** (not error)
- Warning message: `[@duskmoon-dev/core] Low contrast detected: "primary" (60 90% 70%) and "primary-content" (55 80% 80%) have contrast ratio 1.8:1. WCAG AA requires 4.5:1. Consider auto-generating content color.`
- Build continues (user override allowed, but warned)

## Output Contract

### CSS Variables Generated

**Guaranteed Output** (when plugin loads):

```css
:root {
  /* Brand colors (18 variables) */
  --color-primary: [hsl-value];
  --color-primary-focus: [hsl-value];
  --color-primary-content: [hsl-value];
  --color-primary-container: [hsl-value];
  --color-on-primary-container: [hsl-value];

  --color-secondary: [hsl-value];
  --color-secondary-focus: [hsl-value];
  --color-secondary-content: [hsl-value];
  --color-secondary-container: [hsl-value];
  --color-on-secondary-container: [hsl-value];

  --color-tertiary: [hsl-value];
  --color-tertiary-focus: [hsl-value];
  --color-tertiary-content: [hsl-value];
  --color-tertiary-container: [hsl-value];
  --color-on-tertiary-container: [hsl-value];

  /* Neutral colors (13 variables) */
  --color-base-100: [hsl-value];
  --color-base-200: [hsl-value];
  --color-base-300: [hsl-value];
  --color-base-content: [hsl-value];

  /* Surface colors (12 variables) */
  --color-surface: [hsl-value];
  --color-surface-dim: [hsl-value];
  --color-surface-bright: [hsl-value];
  --color-surface-container-lowest: [hsl-value];
  --color-surface-container-low: [hsl-value];
  --color-surface-container: [hsl-value];
  --color-surface-container-high: [hsl-value];
  --color-surface-container-highest: [hsl-value];
  --color-surface-variant: [hsl-value];
  --color-on-surface: [hsl-value];
  --color-on-surface-variant: [hsl-value];

  /* Semantic colors (16 variables) */
  --color-info: [hsl-value];
  --color-info-content: [hsl-value];
  --color-success: [hsl-value];
  --color-success-content: [hsl-value];
  --color-warning: [hsl-value];
  --color-warning-content: [hsl-value];
  --color-error: [hsl-value];
  --color-error-content: [hsl-value];

  /* Outline colors (2 variables) */
  --color-outline: [hsl-value];
  --color-outline-variant: [hsl-value];

  /* Design tokens (3 variables) */
  --radius-box: 1rem;
  --radius-field: 0.5rem;
  --radius-selector: 0.25rem;
}
```

**Total**: 65+ CSS custom properties

### Component Classes Generated

**Guaranteed Output** (when component included):

```css
@layer components {
  /* Button base */
  .btn { /* ... */ }
  .btn-primary { /* ... */ }
  .btn-secondary { /* ... */ }
  .btn-tertiary { /* ... */ }
  .btn-outline { /* ... */ }
  .btn-ghost { /* ... */ }
  .btn-xs { /* ... */ }
  .btn-sm { /* ... */ }
  .btn-lg { /* ... */ }

  /* Card base */
  .card { /* ... */ }
  .card-body { /* ... */ }
  .card-title { /* ... */ }
  .card-actions { /* ... */ }
  .card-bordered { /* ... */ }
  .card-compact { /* ... */ }

  /* Input base */
  .input { /* ... */ }
  .input-bordered { /* ... */ }
  .input-primary { /* ... */ }
  .input-secondary { /* ... */ }
  .input-tertiary { /* ... */ }
  .input-xs { /* ... */ }
  .input-sm { /* ... */ }
  .input-lg { /* ... */ }

  /* Form base */
  .form-control { /* ... */ }
  .label { /* ... */ }
  .label-text { /* ... */ }
  .label-text-alt { /* ... */ }

  /* Navigation base */
  .navbar { /* ... */ }
  .navbar-start { /* ... */ }
  .navbar-center { /* ... */ }
  .navbar-end { /* ... */ }

  /* Modal base */
  .modal { /* ... */ }
  .modal-box { /* ... */ }
  .modal-action { /* ... */ }
  .modal-backdrop { /* ... */ }
}
```

## Performance Contract

### Bundle Size Guarantee

- **Maximum bundle size**: 10KB minified
- **Base styles only**: <1KB
- **Per component**: <1.5KB average
- **Measurement**: Minified CSS output (gzip not included)

**Verification**:
```bash
bun run build:core
ls -lh dist/index.css | awk '{print $5}'  # Must show <10KB
```

### Build Time Guarantee

- **Plugin load time**: <100ms
- **Full build time**: <5 seconds
- **Watch mode rebuild**: <1 second

**Verification**:
```bash
time bun run build:core  # Must complete <5s
```

## Compatibility Contract

### Tailwind CSS Version

- **Required**: Tailwind CSS >= 4.0.0
- **Incompatible**: Tailwind CSS v3.x (breaking change)

**Verification**:
```json
{
  "peerDependencies": {
    "tailwindcss": "^4.0.0"
  }
}
```

**Error if v3 detected**:
```
[@duskmoon-dev/core] ERROR: Tailwind CSS v4.0.0 or higher required. Detected v3.4.1.
Migration guide: https://tailwindcss.com/docs/upgrade-guide-v4
```

### Node.js Version

- **Required**: Node.js >= 18.0.0
- **Recommended**: Bun >= 1.0.0 (for development)

### Browser Support

- **Minimum**: Browsers with CSS custom properties support
  - Chrome 49+
  - Firefox 31+
  - Safari 9.1+
  - Edge 15+

**Graceful Degradation**:
- Plugin does NOT provide fallbacks for older browsers
- Developers must use PostCSS plugins if IE11 support needed

## Deprecation Policy

### Breaking Changes

Breaking changes (v1 → v2) will be announced with:
1. **6-month deprecation period** with console warnings
2. **Migration guide** in CHANGELOG.md
3. **Automated migration script** (if feasible)

### Deprecation Example

```css
/* v1.x (deprecated) */
@plugin "duskmoonui" {
  themes: sunshine, moonlight;
}

/* v2.x (current) */
@plugin "@duskmoon-dev/core" {
  themes: sunshine, moonlight;
}
```

**Deprecation warning** (v1.99.0):
```
[@duskmoon-dev/core] DEPRECATION WARNING: Package name changed to "@duskmoon-dev/core".
Update import: @plugin "duskmoonui" → @plugin "@duskmoon-dev/core"
This import will be removed in v2.0.0 (release date: 2025-06-01)
Migration guide: https://github.com/duskmoon-dev/duskmoonui/blob/main/MIGRATION-v2.md
```

## Versioning Contract

Plugin follows **Semantic Versioning 2.0.0**:

- **MAJOR** (v1 → v2): Breaking changes (Tailwind v4 → v5, removed components, renamed classes)
- **MINOR** (v1.0 → v1.1): New components, new themes, new features (backward compatible)
- **PATCH** (v1.0.0 → v1.0.1): Bug fixes, documentation updates, performance improvements

**Current Version**: 1.0.0 (after refactor from v0.x)
