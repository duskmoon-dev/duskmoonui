# @duskmoon-dev/core Documentation Site

This is the documentation website for @duskmoon-dev/core, built with [Astro](https://astro.build).

## Installation

The documentation site has been set up but dependencies need to be installed. Due to a global Bun configuration pointing to a Nexus registry, you may need to manually resolve the installation:

### Option 1: Temporarily rename global bunfig

```bash
# Backup your global bunfig
mv ~/.bunfig.toml ~/.bunfig.toml.backup

# Install dependencies
cd /Users/gao/Workspace/duskmoon-dev/duskmoonui
bun install

# Restore your global bunfig
mv ~/.bunfig.toml.backup ~/.bunfig.toml
```

### Option 2: Use npm instead

```bash
# From the monorepo root
npm install --legacy-peer-deps
```

### Option 3: Configure Nexus authentication

If you need to use the Nexus registry, add authentication to `~/.npmrc`:

```
//nexus.gsmlg.net/repository/npm-org/:_auth=YOUR_AUTH_TOKEN
```

## Development

Once dependencies are installed:

```bash
# From monorepo root
bun run dev

# Or from docs package
cd packages/docs
bun run dev
```

Visit `http://localhost:4321` to see the site.

## Project Structure

```
packages/docs/
├── src/
│   ├── assets/           # Static assets
│   ├── components/       # Reusable components
│   │   ├── demo/        # Component demo containers
│   │   ├── layout/      # Layout components
│   │   ├── navigation/  # Navigation components
│   │   ├── showcase/    # Component showcases
│   │   └── ui/          # UI components (ThemeToggle, etc.)
│   ├── content/          # Content collections
│   │   ├── config.ts    # Content schema
│   │   └── docs/        # Documentation MDX files
│   │       └── en/
│   │           ├── getting-started/
│   │           ├── components/
│   │           ├── design-system/
│   │           ├── theming/
│   │           ├── guides/
│   │           └── api/
│   ├── layouts/          # Page layouts
│   │   ├── BaseLayout.astro      # Base HTML
│   │   └── DocsLayout.astro      # Docs pages
│   ├── pages/            # File-based routing
│   │   ├── index.astro           # Home page
│   │   ├── components/           # Component showcase
│   │   │   └── index.astro
│   │   └── docs/                 # Documentation
│   │       └── [...slug].astro
│   ├── styles/           # Global styles
│   │   ├── global.css   # Base styles
│   │   └── themes.css   # Theme definitions
│   └── utils/            # Utility functions
├── public/               # Static files
│   └── favicon.svg
├── astro.config.mjs      # Astro configuration
├── tailwind.config.mjs   # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Package configuration
```

## Features Implemented

### ✅ Home Page
- DaisyUI-inspired design
- Hero section with gradient background
- Feature cards showcase
- Statistics display
- Call-to-action buttons
- Responsive footer

### ✅ Theme System
- Sunshine theme (light)
- Moonlight theme (dark)
- Theme toggle component
- Smooth transitions
- localStorage persistence
- No FOUC (Flash of Unstyled Content)

### ✅ Layouts
- BaseLayout: Core HTML structure
- DocsLayout: Documentation pages with navigation

### ✅ Content System
- Content collections configured
- MDX support for rich documentation
- Frontmatter schema validation
- Dynamic routing for docs

### ✅ Styling
- Tailwind CSS 4.0+ configured
- DuskMoonUI core integration
- CSS variables for theming
- Responsive design
- Typography system

### ✅ Integrations
- React for interactive components
- MDX for enhanced documentation
- Sitemap generation
- Tailwind CSS

## Adding Documentation

Create new documentation pages in `src/content/docs/en/`:

```mdx
---
title: Your Page Title
description: Page description
category: getting-started
order: 1
published: true
tags: ['tag1', 'tag2']
---

# Your Content Here

Write your documentation using MDX.
```

## Adding Components

1. Create showcase in `src/components/showcase/`
2. Add route in `src/pages/components/`
3. Update component index in `src/pages/components/index.astro`

## Build

```bash
# Type check
bun run astro check

# Build for production
bun run build

# Preview production build
bun run preview
```

## Configuration

### Astro Config
- Located in `astro.config.mjs`
- Configured for i18n (en, fr, es)
- Markdown syntax highlighting
- Sitemap generation

### Tailwind Config
- Located in `tailwind.config.mjs`
- Uses @duskmoon-dev/core Tailwind plugin
- Scans all source files for classes

### TypeScript Config
- Strict mode enabled
- React JSX configured
- Extends Astro's strict config

## Troubleshooting

### Dependencies won't install
- Check Bun registry configuration in `~/.bunfig.toml`
- Try using npm instead: `npm install --legacy-peer-deps`
- Clear cache: `rm -rf node_modules .bun-cache bun.lockb`

### Theme toggle not working
- Ensure React component has `client:load` directive
- Check browser console for errors
- Verify localStorage is accessible

### Styles not loading
- Verify `global.css` is imported in `BaseLayout.astro`
- Check Tailwind configuration
- Restart dev server

## Next Steps

1. **Add more documentation pages**
   - Quick start guide
   - Configuration options
   - Framework integrations

2. **Create component showcases**
   - Button component page
   - Card component page
   - Form components
   - Navigation components

3. **Enhance navigation**
   - Add sidebar to docs layout
   - Implement search functionality
   - Add breadcrumbs

4. **Add interactive demos**
   - Live code previews
   - Copy to clipboard buttons
   - Variant switchers

5. **Internationalization**
   - Add French translations
   - Add Spanish translations
   - Language switcher component

## License

MIT License - see LICENSE file for details
