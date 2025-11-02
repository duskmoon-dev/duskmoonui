# DuskMoonUI Next.js Starter

A minimal Next.js starter template featuring DuskMoonUI components with Material Design 3 styling.

## Features

- ⚡ Next.js 14 with App Router
- 🎨 DuskMoonUI component library
- 🌓 Sunshine & Moonlight themes
- 💎 TypeScript
- 🎯 Tailwind CSS 3.4
- 📦 All 5 core components (Button, Card, Input, Badge, Alert)

## Getting Started

### Installation

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

```bash
npm run build
npm run start
```

## Project Structure

```
nextjs-starter/
├── src/
│   └── app/
│       ├── globals.css          # Tailwind imports
│       ├── layout.tsx           # Root layout with theme
│       └── page.tsx             # Home page with component showcase
├── tailwind.config.ts           # Tailwind + DuskMoonUI config
├── next.config.mjs             # Next.js configuration
└── package.json
```

## Usage

### Theme Switching

Themes are controlled via the `data-theme` attribute on the `<html>` element:

```tsx
// Toggle between themes
document.documentElement.setAttribute('data-theme', 'moonlight');
```

### Using Components

All components are available as Tailwind CSS classes:

```tsx
// Buttons
<button className="btn btn-primary">Primary Button</button>
<button className="btn btn-outlined">Outlined Button</button>

// Cards
<div className="card">
  <div className="card-body">
    <h3 className="card-title">Card Title</h3>
    <p>Card content</p>
  </div>
</div>

// Inputs
<input type="text" className="input" placeholder="Text input" />
<textarea className="textarea" placeholder="Textarea" />

// Badges
<span className="badge badge-success">Success</span>

// Alerts
<div className="alert alert-info">
  <div className="alert-content">
    <div className="alert-title">Info</div>
    <div className="alert-description">Message here</div>
  </div>
</div>
```

## Customization

### Adding Custom Themes

Edit `tailwind.config.ts`:

```ts
import duskmoonui from '@duskmoon-dev/core';

export default {
  plugins: [
    duskmoonui({
      themes: [
        'sunshine',
        'moonlight',
        {
          mytheme: {
            primary: '200 100% 50%',
            secondary: '280 100% 50%',
            // ... other colors
          },
        },
      ],
    }),
  ],
};
```

### Selecting Components

```ts
duskmoonui({
  components: ['button', 'card', 'input'], // Only include specific components
  // or
  components: 'all', // Include all components (default)
})
```

## Learn More

- [DuskMoonUI Documentation](https://github.com/duskmoon-dev/duskmoonui)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## License

MIT
