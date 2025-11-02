# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
- Tailwind CSS v3.4+ and v4.0+ support
- TypeScript type definitions for all color tokens and plugin options
- CSS variable generation with HSL color format
- Theme switching via `data-theme` attribute
- Custom theme support with full type safety

#### Build & Distribution
- ESM and CommonJS module formats
- TypeScript declaration files with source maps
- Optimized bundle sizes (ESM: 6.3KB, CJS: 7.4KB)
- Tree-shakeable exports

#### Documentation
- Comprehensive README with usage examples
- Interactive standalone demo (examples/demo/standalone.html)
- Color token reference documentation
- Theme customization guide

### Technical Details

**Package Structure:**
```
@duskmoon-dev/core/
├── dist/
│   ├── index.js          # ESM format
│   ├── index.cjs         # CommonJS format
│   ├── index.d.ts        # TypeScript declarations
│   └── ...               # Additional type files
├── LICENSE (MIT)
├── README.md
└── CHANGELOG.md
```

**Color Token Naming:**
- Base colors: `primary`, `secondary`, `tertiary`
- Interaction states: `-focus` suffix for hover/active states
- Text colors: `-content` suffix for text on colored backgrounds
- Container colors: `-container` suffix for tinted backgrounds
- On-container: `on-{color}-container` for text on containers

**Theme Configuration:**
```javascript
// tailwind.config.js
import duskmoonui from '@duskmoon-dev/core';

export default {
  plugins: [
    duskmoonui({
      themes: ['sunshine', 'moonlight'],
      darkTheme: 'moonlight',
    }),
  ],
};
```

**Usage Example:**
```html
<html data-theme="sunshine">
  <button class="bg-primary text-primary-content hover:bg-primary-focus">
    Primary Button
  </button>
  <button class="bg-tertiary text-tertiary-content">
    Tertiary Button ⭐
  </button>
</html>
```

### Dependencies

**Peer Dependencies:**
- `tailwindcss: ^3.4.0 || ^4.0.0`

**Development Dependencies:**
- `@types/bun: latest`
- `typescript: ^5.6.0`
- `tailwindcss: ^3.4.0`

### Browser Support

Modern browsers with CSS custom properties support:
- Chrome/Edge 88+
- Firefox 89+
- Safari 14.1+

### Known Limitations

- Component library not yet implemented (planned for v0.2.0)
- Utility classes not yet implemented (planned for v0.2.0)
- Animation system not included (planned for future release)
- RTL support not yet implemented (planned for future release)

### Breaking Changes

None (initial release)

### Migration Guide

This is the initial release. No migration needed.

### Contributors

- DuskMoon Development Team

---

## Roadmap

### v0.2.0 (Planned)
- Component library (Button, Card, Input, Badge, Alert)
- Utility classes for Material Design patterns
- Component documentation site
- Unit tests and CI/CD pipeline

### v0.3.0 (Planned)
- Advanced components (Modal, Dropdown, Tabs, Table)
- Animation utilities
- Figma design system kit
- VS Code extension for color previews

### v1.0.0 (Planned)
- Stable API
- Complete component library (60+ components)
- Framework adapters (React, Vue, Svelte)
- Enterprise-ready with comprehensive documentation

---

[0.1.0]: https://github.com/duskmoon-dev/duskmoonui/releases/tag/v0.1.0
