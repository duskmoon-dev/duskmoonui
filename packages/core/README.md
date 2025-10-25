# @duskmoon-dev/core

> DuskMoonUI - A Tailwind CSS component library with extended color system

## Features

- 🎨 Extended color system with tertiary colors
- 🌓 Built-in Sunshine and Moonlight themes
- 📦 65+ Material Design 3 color tokens
- ⚡ JavaScript-based CSS generation
- 🚀 Optimized for Bun runtime
- 🎯 Full TypeScript support

## Installation

```bash
# Using Bun (recommended)
bun add @duskmoon-dev/core tailwindcss

# Using npm
npm install @duskmoon-dev/core tailwindcss

# Using pnpm
pnpm add @duskmoon-dev/core tailwindcss
```

## Quick Start

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

Then set the theme in your HTML:

```html
<html data-theme="sunshine">
  <!-- Your app -->
</html>
```

## Usage

### Using Theme Colors

```jsx
<div className="bg-primary text-primary-content">
  Primary button
</div>

<div className="bg-secondary text-secondary-content">
  Secondary button
</div>

<div className="bg-tertiary text-tertiary-content">
  Tertiary button (NEW!)
</div>
```

### Custom Themes

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

## Color System

DuskMoonUI extends the standard Tailwind color system with:

- **Tertiary colors** - A third brand color for more design flexibility
- **Surface containers** - Material Design 3 surface elevation system
- **On-color variants** - Guaranteed accessible text colors
- **Container colors** - Tinted backgrounds for components

### Available Color Tokens

- Primary: `primary`, `primary-focus`, `primary-content`, `primary-container`, `on-primary-container`
- Secondary: `secondary`, `secondary-focus`, `secondary-content`, `secondary-container`, `on-secondary-container`
- Tertiary: `tertiary`, `tertiary-focus`, `tertiary-content`, `tertiary-container`, `on-tertiary-container`
- Surface: `surface`, `surface-dim`, `surface-bright`, `surface-container-{lowest|low|default|high|highest}`
- Semantic: `info`, `success`, `warning`, `error` (with `-content` variants)

## Plugin Options

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

## Development

```bash
# Install dependencies
bun install

# Build the package
bun run build

# Watch mode
bun run dev

# Type check
bun run typecheck

# Run tests
bun test
```

## License

MIT
