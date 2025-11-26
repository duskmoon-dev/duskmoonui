# Quickstart Guide: DuskMoonUI Refactored Plugin

**Version**: 1.0.0
**Date**: 2025-11-19

## Installation

```bash
# Using Bun (recommended)
bun add @duskmoon-dev/core tailwindcss

# Using npm
npm install @duskmoon-dev/core tailwindcss

# Using pnpm
pnpm add @duskmoon-dev/core tailwindcss
```

**Requirements**:
- Tailwind CSS >= 4.0.0
- Node.js >= 18.0.0

## Setup

### Step 1: Import Plugin in CSS

Create or update your main CSS file (e.g., `src/styles/global.css`):

```css
/* src/styles/global.css */
@plugin "@duskmoon-dev/core";
```

### Step 2: Set Theme in HTML

```html
<!DOCTYPE html>
<html data-theme="sunshine">
<head>
  <link rel="stylesheet" href="/styles/global.css">
</head>
<body>
  <!-- Your content -->
</body>
</html>
```

### Step 3: Use Components

```html
<button class="btn btn-primary">Click me</button>

<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>Card content goes here.</p>
    <div class="card-actions">
      <button class="btn btn-primary">Action</button>
    </div>
  </div>
</div>
```

## Theme Switching

### HTML Only (Simplest)

```html
<html data-theme="sunshine">
  <!-- Light theme -->
</html>

<html data-theme="moonlight">
  <!-- Dark theme -->
</html>
```

### With JavaScript

```html
<button onclick="toggleTheme()">Toggle Theme</button>

<script>
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'sunshine' ? 'moonlight' : 'sunshine';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

// Load saved theme on page load
const saved = localStorage.getItem('theme');
if (saved) {
  document.documentElement.setAttribute('data-theme', saved);
}
</script>
```

### Auto-Detect System Preference

```javascript
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const theme = localStorage.getItem('theme') || (prefersDark ? 'moonlight' : 'sunshine');
document.documentElement.setAttribute('data-theme', theme);
```

## Using Color Tokens

### As Utilities

```html
<!-- Backgrounds -->
<div class="bg-primary text-primary-content p-4">
  Primary colored div
</div>

<!-- With opacity -->
<div class="bg-secondary/60">Semi-transparent</div>

<!-- Borders -->
<div class="border-2 border-outline rounded-lg">
  With border
</div>
```

### In Custom CSS

```css
.my-component {
  background-color: hsl(var(--color-primary) / 1);
  color: hsl(var(--color-primary-content) / 1);
  border: 1px solid hsl(var(--color-outline) / 1);
}
```

## Customization

### Method 1: Combine with Tailwind Utilities

```html
<button class="btn btn-primary rounded-full px-8 py-4 shadow-2xl">
  Customized Button
</button>
```

### Method 2: Custom Themes

```css
/* global.css */
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

### Method 3: Selective Components

```css
/* Only load specific components */
@plugin "@duskmoon-dev/core" {
  include: button, card, input;
}
```

## Next Steps

- **Documentation**: Visit the full documentation site at [URL]
- **Examples**: Browse component examples with live previews
- **GitHub**: Report issues or contribute at [github.com/duskmoon-dev/duskmoonui](https://github.com/duskmoon-dev/duskmoonui)

## Common Issues

### Issue: Colors not showing

**Solution**: Ensure Tailwind CSS v4.0.0 or higher is installed:

```bash
npm list tailwindcss
# Should show: tailwindcss@4.x.x

# If v3.x.x, upgrade:
npm install tailwindcss@^4.0.0
```

### Issue: Components not styled

**Solution**: Make sure `@plugin` directive is in your CSS file (NOT tailwind.config.js):

```css
/* ✅ Correct */
@plugin "@duskmoon-dev/core";

/* ❌ Wrong (v3 syntax) */
// tailwind.config.js
plugins: [require('@duskmoon-dev/core')]
```

### Issue: Theme not switching

**Solution**: Check `data-theme` attribute is on HTML element:

```html
<!-- ✅ Correct -->
<html data-theme="moonlight">

<!-- ❌ Wrong -->
<body data-theme="moonlight">
```

## Full Example

```html
<!DOCTYPE html>
<html lang="en" data-theme="sunshine">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DuskMoonUI Example</title>
  <style>
    @plugin "@duskmoon-dev/core";
  </style>
</head>
<body class="bg-base-100 text-base-content">
  <!-- Header -->
  <div class="navbar bg-base-200">
    <div class="navbar-start">
      <span class="text-xl font-bold">DuskMoonUI</span>
    </div>
    <div class="navbar-end">
      <button onclick="toggleTheme()" class="btn btn-ghost">
        Toggle Theme
      </button>
    </div>
  </div>

  <!-- Content -->
  <main class="container mx-auto p-8">
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Welcome to DuskMoonUI!</h2>
        <p>Try clicking the buttons below:</p>
        <div class="card-actions">
          <button class="btn btn-primary">Primary</button>
          <button class="btn btn-secondary">Secondary</button>
          <button class="btn btn-tertiary">Tertiary</button>
        </div>
      </div>
    </div>
  </main>

  <script>
    function toggleTheme() {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme');
      const next = current === 'sunshine' ? 'moonlight' : 'sunshine';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    }

    // Load saved theme
    const saved = localStorage.getItem('theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    }
  </script>
</body>
</html>
```
