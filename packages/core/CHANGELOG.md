# Changelog

All notable changes to `@duskmoon-dev/core` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **CSS Variables for component padding** - Button and card components now expose padding via CSS custom properties for easy customization:
  - `--btn-p` and `--btn-py` for button horizontal and vertical padding
  - `--card-p` for card body, header, and footer padding
- **Logical CSS properties** - Components now use logical properties (`padding-inline`, `padding-block`, `margin-block-start`) for automatic RTL layout support
- **Card header and footer** - New `.card-header` and `.card-footer` classes with proper padding and border separators

## [1.0.0] - 2025-01-XX

### Breaking Changes

- **Requires Tailwind CSS v4.0.0 or later** - This version is not compatible with Tailwind CSS v3.x
- **CSS-first architecture** - No longer exports a JavaScript plugin function; use `@import` instead of `plugins: []`
- **Changed import syntax** - Use `@import "@duskmoon-dev/core"` in CSS instead of importing in `tailwind.config.js`
- **Removed JavaScript configuration** - Themes and colors are now defined in pure CSS using CSS custom properties
- **Color format changed** - Colors now use HSL space-separated format (`240 80% 60%`) instead of hex values

### Added

- **65+ Material Design 3 color tokens** - Full MD3 color system including:
  - Brand colors: primary, secondary, tertiary (with -focus, -content, -container variants)
  - Surface colors: surface, surface-dim, surface-bright, surface-container hierarchy
  - Semantic colors: info, success, warning, error (with -content, -container variants)
  - Neutral colors: base-100 through base-900
  - Outline colors: outline, outline-variant
- **Built-in themes** - Two production-ready themes:
  - `sunshine` - Light theme with warm, accessible colors
  - `moonlight` - Dark theme optimized for low-light viewing
- **6 core components** - Minimal, composable component styles:
  - Button (btn, btn-primary, btn-secondary, btn-tertiary, btn-outline, btn-ghost, sizes)
  - Card (card, card-body, card-title, card-actions, card-bordered, card-compact)
  - Input (input, input-bordered, input-primary, input-secondary, input-tertiary, sizes)
  - Form (form-control, label, label-text, label-text-alt)
  - Navigation (navbar, navbar-start, navbar-center, navbar-end)
  - Modal (modal, modal-box, modal-action, modal-backdrop)
- **WCAG AA compliance** - All color combinations meet 4.5:1 contrast ratio minimum
- **Theme switching** - Instant theme changes via `data-theme` attribute (no JavaScript required)
- **TypeScript types** - Full type definitions for theme configuration

### Changed

- **Zero JavaScript runtime** - All styling is now pure CSS with CSS custom properties
- **Smaller bundle size** - Under 7KB gzipped (down from ~15KB in v0.x)
- **Simpler setup** - Just two lines in your CSS file to get started

### Removed

- JavaScript plugin API (`duskmoonui()` function)
- JavaScript configuration options
- Runtime theme generation
- `tailwind.config.js` integration

---

## [0.1.0] - 2025-10-25

### Added

#### Color System
- Complete Material Design 3 color system with 65+ color tokens
- Primary, Secondary, and **Tertiary** color families (first Tailwind plugin with tertiary support)
- Surface elevation system with 5 container levels (lowest, low, default, high, highest)
- Semantic colors: info, success, warning, error with content variants
- On-color variants for guaranteed accessible contrast ratios
- Outline and outline-variant tokens for borders and dividers
- Inverse colors for Material Design 3 patterns

#### Themes
- **Sunshine Theme** - Warm, energetic light theme
  - Primary: Amber (#f59e0b)
  - Secondary: Pink (#ec4899)
  - Tertiary: Violet (#8b5cf6)
- **Moonlight Theme** - Serene, elegant dark theme
  - Primary: Blue (#3b82f6)
  - Secondary: Purple (#a78bfa)
  - Tertiary: Teal (#14b8a6)

#### Core Features
- Tailwind CSS v3.4+ support (JavaScript plugin API)
- TypeScript type definitions for all color tokens and plugin options
- CSS variable generation with HSL color format
- Theme switching via `data-theme` attribute
- Custom theme support with full type safety

### Browser Support

Modern browsers with CSS custom properties support:
- Chrome/Edge 88+
- Firefox 89+
- Safari 14.1+

---

[1.0.0]: https://github.com/duskmoon-dev/duskmoonui/releases/tag/v1.0.0
[0.1.0]: https://github.com/duskmoon-dev/duskmoonui/releases/tag/v0.1.0
