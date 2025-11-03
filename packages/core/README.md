# @duskmoon-dev/core

> DuskMoonUI - A Tailwind CSS component library with extended color system

[![npm version](https://img.shields.io/npm/v/@duskmoon-dev/core.svg)](https://www.npmjs.com/package/@duskmoon-dev/core)
[![npm downloads](https://img.shields.io/npm/dm/@duskmoon-dev/core.svg)](https://www.npmjs.com/package/@duskmoon-dev/core)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@duskmoon-dev/core)](https://bundlephobia.com/package/@duskmoon-dev/core)
[![license](https://img.shields.io/npm/l/@duskmoon-dev/core.svg)](https://github.com/duskmoon-dev/duskmoonui/blob/main/LICENSE)

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

## Components

DuskMoonUI now includes **32 components** (5 original + 13 Phase 1 + 14 Phase 2 components):

### Original Components
- **Button** - Multiple variants (filled, outlined, text, tonal), sizes, semantic colors
- **Card** - Surface elevation, interactive cards, header/body/actions
- **Input** - Text inputs, textarea, select, checkbox, radio
- **Badge** - Status indicators, notification badges
- **Alert** - Info/success/warning/error alerts

### Phase 1 Components (NEW!)

**Navigation** (3 components)
- **Navbar** - Primary app navigation with responsive mobile menu
- **Tabs** - Horizontal/vertical tabs with multiple style variants
- **Drawer** - Side navigation with modal/permanent/rail variants

**Layout** (2 components)
- **Divider** - Horizontal/vertical separators with label support
- **App Bar** - Top/bottom action bars with elevation

**Feedback** (4 components)
- **Tooltip** - Contextual information with auto-positioning
- **Snackbar** - Toast notifications with action buttons
- **Dialog** - Modal dialogs with multiple sizes
- **Progress** - Linear and circular progress indicators

**Data Display** (2 components)
- **Table** - Data tables with sorting, selection, pagination
- **List** - Vertical lists with icons, avatars, nested items

**Forms** (1 component)
- **Switch** - Toggle switches with MD3 styling

**Overlay** (1 component)
- **Menu** - Dropdown menus with icons, dividers, keyboard navigation

### Phase 2 Components (NEW!)

**Navigation** (4 components)
- **Breadcrumbs** - Navigation hierarchy with multiple separator styles
- **Bottom Navigation** - Mobile-first navigation bar with badges
- **Pagination** - Page navigation with outlined/tonal variants
- **Stepper** - Multi-step process guide (horizontal/vertical)

**Feedback** (1 component)
- **Skeleton** - Loading placeholders with pulse/wave animations

**Data Display** (2 components)
- **Chip** - Tags, filters with input/filter/assist variants
- **Avatar** - User representations with status indicators, groups

**Forms** (4 components)
- **Slider** - Range selection with discrete/continuous modes
- **Autocomplete** - Search input with suggestions and multi-select
- **Date Picker** - Calendar date selection with range support
- **File Upload** - Drag-and-drop file uploads with previews

**Interactive** (1 component)
- **Accordion** - Expandable content panels with multiple variants

**Overlay** (2 components)
- **Popover** - Contextual overlay with arrow positioning
- **Bottom Sheet** - Mobile-first bottom panel with drag handle

## Usage

### Using Components

```jsx
<!-- Button -->
<button className="btn btn-primary">Primary Button</button>
<button className="btn btn-outlined-tertiary">Outlined Tertiary</button>

<!-- Navbar -->
<nav className="navbar navbar-surface-container-high navbar-fixed">
  <div className="navbar-start">
    <a href="/" className="navbar-brand">Brand</a>
  </div>
  <div className="navbar-end">
    <a href="#" className="navbar-item">Home</a>
    <a href="#" className="navbar-item navbar-item-active">About</a>
  </div>
</nav>

<!-- Tabs -->
<div className="tabs">
  <button className="tab tab-active">Tab 1</button>
  <button className="tab">Tab 2</button>
  <button className="tab">Tab 3</button>
</div>

<!-- Progress -->
<div className="progress progress-primary">
  <div className="progress-bar" style="width: 60%"></div>
</div>

<!-- Table -->
<table className="table table-hover table-striped">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td>john@example.com</td>
      <td><span className="badge badge-success">Active</span></td>
    </tr>
  </tbody>
</table>
```

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
