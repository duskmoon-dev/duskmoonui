# DuskMoonUI

> A Tailwind CSS component library with Material Design 3's extended color system

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎨 **Extended Color System** - 65+ Material Design 3 color tokens
- ⭐ **Tertiary Colors** - Third brand color for additional design flexibility
- 🌓 **Beautiful Themes** - Sunshine (light) and Moonlight (dark) built-in themes
- 📦 **Modular Architecture** - Clean TypeScript codebase with full type support
- ⚡ **Optimized for Bun** - Fast builds and development experience
- 🎯 **Accessible by Default** - Guaranteed color contrast with on-color variants
- 🔧 **Developer Friendly** - TypeScript types and autocomplete support

## 🎨 Color System

DuskMoonUI extends Tailwind CSS with Material Design 3's comprehensive color system:

### Core Brand Colors

- **Primary** - Main brand color with focus, content, and container variants
- **Secondary** - Complementary brand color
- **Tertiary** ⭐ NEW! - Third brand color for additional variety

### Surface System

- **Surface Containers** - 5 elevation levels (lowest → highest)
- **Surface Variants** - Tinted surfaces for depth
- **On-Surface** - Guaranteed readable text colors

### Semantic Colors

- Info, Success, Warning, Error
- Each with content variants for accessible text

## 📦 Packages

This monorepo contains:

- **@duskmoon-dev/core** - Main Tailwind CSS plugin
- **examples/demo** - Interactive demonstration

## 🚀 Quick Start

### Installation

```bash
# Using Bun (recommended)
bun add @duskmoon-dev/core tailwindcss

# Using npm
npm install @duskmoon-dev/core tailwindcss

# Using pnpm
pnpm add @duskmoon-dev/core tailwindcss
```

### Setup

Add the plugin to your `tailwind.config.js`:

```js
import duskmoonui from '@duskmoon-dev/core';

export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  plugins: [
    duskmoonui({
      themes: ['sunshine', 'moonlight'],
      darkTheme: 'moonlight',
    }),
  ],
};
```

### Usage

Set the theme in your HTML:

```html
<html data-theme="sunshine">
  <!-- Your app -->
</html>
```

Use the colors in your components:

```jsx
<button className="bg-primary text-primary-content hover:bg-primary-focus">
  Primary Button
</button>

<button className="bg-secondary text-secondary-content hover:bg-secondary-focus">
  Secondary Button
</button>

<button className="bg-tertiary text-tertiary-content hover:bg-tertiary-focus">
  Tertiary Button
</button>
```

## 🎭 Built-in Themes

### Sunshine (Light Theme)

Warm, energetic light theme with golden and vibrant accents.

- Primary: Warm Orange (#f59e0b)
- Secondary: Pink (#ec4899)
- Tertiary: Purple (#8b5cf6)

### Moonlight (Dark Theme)

Serene, elegant dark theme with cool tones and soft accents.

- Primary: Soft Blue (#3b82f6)
- Secondary: Purple (#a78bfa)
- Tertiary: Teal (#14b8a6)

## 🎨 Custom Themes

Create your own themes by passing color values:

```js
duskmoonui({
  themes: [
    'sunshine',
    'moonlight',
    {
      mytheme: {
        primary: '200 100% 50%',
        secondary: '280 100% 50%',
        tertiary: '340 100% 50%',
        // ... other colors
      },
    },
  ],
});
```

## 📖 Color Tokens

### Primary Colors

- `primary` - Main brand color
- `primary-focus` - Hover/active state
- `primary-content` - Text on primary
- `primary-container` - Tinted background
- `on-primary-container` - Text on container

### Secondary Colors

Same pattern as primary: `secondary`, `secondary-focus`, `secondary-content`, `secondary-container`, `on-secondary-container`

### Tertiary Colors ⭐

Same pattern as primary: `tertiary`, `tertiary-focus`, `tertiary-content`, `tertiary-container`, `on-tertiary-container`

### Surface Elevation

- `surface` - Base surface
- `surface-dim` - Darker surface
- `surface-bright` - Brighter surface
- `surface-container-lowest` - Level 0
- `surface-container-low` - Level 1
- `surface-container` - Level 2 (default)
- `surface-container-high` - Level 3
- `surface-container-highest` - Level 4
- `surface-variant` - Tinted surface
- `on-surface` - Text on surface
- `on-surface-variant` - Secondary text

### Semantic Colors

- `info`, `info-content`
- `success`, `success-content`
- `warning`, `warning-content`
- `error`, `error-content`
- `error-container`, `on-error-container`

### Outline Colors

- `outline` - Borders and dividers
- `outline-variant` - Subtle borders

## 🛠️ Development

### Prerequisites

- [Bun](https://bun.sh/) v1.0 or later
- Node.js v18 or later (optional)

### Setup

```bash
# Clone the repository
git clone https://github.com/duskmoon-dev/duskmoonui.git
cd duskmoonui

# Install dependencies
bun install

# Build the core package
cd packages/core
bun run build
```

### Commands

```bash
# Build core package
bun run build:core

# Watch mode for development
bun run dev:core

# Type checking
bun run typecheck

# Run tests
bun test
```

## 📁 Project Structure

```
duskmoonui/
├── packages/
│   └── core/                 # @duskmoon-dev/core
│       ├── src/
│       │   ├── types/        # TypeScript type definitions
│       │   ├── themes/       # Built-in themes
│       │   ├── generators/   # CSS variable generators
│       │   ├── components/   # Component styles (TODO)
│       │   └── utilities/    # Utility classes (TODO)
│       └── dist/             # Built files
├── examples/
│   └── demo/                 # Interactive demo
│       ├── standalone.html   # Standalone demo (works immediately)
│       └── index.html        # Full demo (requires build)
├── tsconfig.json
├── bunfig.toml
└── package.json
```

## 🎯 Try the Demo

Open `examples/demo/standalone.html` in your browser to see DuskMoonUI in action!

The standalone demo includes:
- All color tokens demonstrated
- Interactive theme switcher
- Responsive design
- Real-world component examples
- Working light/dark mode toggle

## 🗺️ Roadmap

- [x] Core color system
- [x] Sunshine and Moonlight themes
- [x] TypeScript type definitions
- [x] Plugin architecture
- [x] CSS variable generation
- [ ] Component styles (buttons, cards, forms, etc.)
- [ ] Utility classes
- [ ] Animation system
- [ ] RTL support
- [ ] Additional themes
- [ ] Documentation site
- [ ] npm package publication

## 📝 Plugin Options

```typescript
interface DuskMoonUIOptions {
  themes?: ThemeConfig[];          // Themes to include
  darkTheme?: string;              // Default dark theme name
  prefix?: string;                 // Component prefix
  components?: string[] | 'all';   // Components to include
  utilities?: boolean;             // Enable utility classes
  rtl?: boolean;                   // RTL support
  styled?: boolean;                // Generate component styles
  base?: boolean;                  // Include base styles
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Material Design 3 for the comprehensive color system
- Tailwind CSS for the amazing utility-first framework
- Bun for the incredible JavaScript runtime

---

Built with ❤️ using Bun, TypeScript, and Material Design 3
