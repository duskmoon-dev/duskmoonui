# DuskMoonUI Astro Starter

A minimal Astro starter template featuring DuskMoonUI components with Material Design 3 styling.

## Features

- ⚡ Astro 4.x
- 🎨 DuskMoonUI component library
- 🌓 Sunshine & Moonlight themes with localStorage
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

Open [http://localhost:4321](http://localhost:4321) with your browser to see the result.

### Build

```bash
npm run build
npm run preview
```

## Project Structure

```
astro-starter/
├── src/
│   ├── layouts/
│   │   └── Layout.astro         # Base layout with global styles
│   └── pages/
│       └── index.astro          # Home page with component showcase
├── astro.config.mjs             # Astro configuration
├── tailwind.config.mjs          # Tailwind + DuskMoonUI config
└── package.json
```

## Usage

### Theme Switching

The starter includes a theme toggle button that persists the selected theme in localStorage:

```astro
<script>
  const currentTheme = localStorage.getItem('theme') || 'sunshine';
  document.documentElement.setAttribute('data-theme', currentTheme);
</script>
```

### Using Components

All components are available as Tailwind CSS classes in your `.astro` files:

```astro
<!-- Buttons -->
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-outlined">Outlined Button</button>

<!-- Cards -->
<div class="card">
  <div class="card-body">
    <h3 class="card-title">Card Title</h3>
    <p>Card content</p>
  </div>
</div>

<!-- Inputs -->
<input type="text" class="input" placeholder="Text input" />
<textarea class="textarea" placeholder="Textarea"></textarea>

<!-- Badges -->
<span class="badge badge-success">Success</span>

<!-- Alerts -->
<div class="alert alert-info">
  <div class="alert-content">
    <div class="alert-title">Info</div>
    <div class="alert-description">Message here</div>
  </div>
</div>
```

## Customization

### Adding Custom Themes

Edit `tailwind.config.mjs`:

```js
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

```js
duskmoonui({
  components: ['button', 'card', 'input'], // Only include specific components
  // or
  components: 'all', // Include all components (default)
})
```

### Global Styles

Global styles including Tailwind directives are defined in `src/layouts/Layout.astro`:

```astro
<style is:global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
```

## Interactive Features

### Client-Side Scripts

Astro components are static by default. For interactivity, use `<script>` tags:

```astro
<button id="my-button" class="btn btn-primary">Click me</button>

<script>
  document.getElementById('my-button')?.addEventListener('click', () => {
    alert('Button clicked!');
  });
</script>
```

### Framework Components

You can add React, Vue, or Svelte components for more complex interactivity:

```bash
npx astro add react
```

Then use React components:

```astro
---
import MyReactComponent from '../components/MyReactComponent';
---

<MyReactComponent client:load />
```

## Learn More

- [DuskMoonUI Documentation](https://github.com/duskmoon-dev/duskmoonui)
- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com/docs)

## License

MIT
