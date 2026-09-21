---
name: duskmoon-dev-css-art
description: Install and use the @duskmoon-dev/css-art package, including its 15 CSS art pieces, required child markup, modifiers, custom properties, and individual imports.
---

# @duskmoon-dev/css-art

Use this skill when a project consumes `@duskmoon-dev/css-art`. The package renders illustrations and animations with CSS. It has no JavaScript runtime; some pieces accept normal HTML content such as gallery images or input controls.

## Install and Import

```bash
bun add @duskmoon-dev/css-art
# npm install @duskmoon-dev/css-art
# pnpm add @duskmoon-dev/css-art
```

Import the complete bundle:

```css
@import "@duskmoon-dev/css-art";
```

It can follow core and Tailwind imports:

```css
@import "tailwindcss";
@import "@duskmoon-dev/core";
@import "@duskmoon-dev/css-art";
```

All art rules are wrapped in `@layer css-art`. To import only the art barrel or one generated stylesheet, use an exported path:

```css
@import "@duskmoon-dev/css-art/art";
@import "@duskmoon-dev/css-art/dist/art/moon.css";
```

The source `art/index.css` file is the aggregate barrel behind `@duskmoon-dev/css-art/art`, not an additional art piece.

## Art Inventory

The package contains 15 art entry points under `packages/css-art/src/art/`.

### Celestial and Weather

- `moon.css` — `.art-moon`; `.art-moon-crescent`, `.art-moon-glow`, and `sm`/`lg`/`xl` sizes. Customize `--art-moon-size`, `--art-moon-color`, `--art-moon-shadow`, and `--art-moon-glow`.
- `sun.css` — `.art-sun`; `.art-sun-rays`, `.art-sun-sunset`, `.art-sun-pulse`, and `sm`/`lg`/`xl` sizes. Customize `--art-sun-size`, `--art-sun-color`, `--art-sun-corona`, and `--art-sun-glow`.
- `atom.css` — `.art-atom` with `.electron`, `.electron-alpha`, and `.electron-omega`; `sm`/`lg` sizes. Customize `--art-atom-size`, `--art-atom-color`, `--art-atom-nucleus-size`, `--art-atom-electron-color`, `--art-atom-electron-size`, `--art-atom-orbit-size`, `--art-atom-speed`, `--art-atom-speed-alpha`, and `--art-atom-speed-omega`.
- `eclipse.css` — `.art-eclipse` with `.layer.layer-1` through `.layer-6`; `sm`/`lg` sizes. Customize `--art-eclipse-size` and `--art-eclipse-bg`.
- `snow.css` — `.art-snowflake`; optional `.art-snowflake-unicode` and `.art-snowflake-fall`. Customize `--art-snowflake-size`, `--art-snowflake-color`, and `--art-snowflake-duration`.

### Scenes

- `mountain.css` — `.art-mountain` night landscape composed from `.mountain`, `.tree`, `.lights`, and `.borealis` children; `sm`/`lg` sizes. Customize `--art-mountain-size`.
- `cat-stargazer.css` — `.art-cat-stargazer` with `.moon` and a `.cat` assembled from `.bubble`, `.backpack`, `.tail`, `.body`, `.leg`, `.paw`, `.ear`, `.head`, `.whisker`, `.nose`, and `.eye`; `sm`/`lg` sizes. Customize `--art-cat-stargazer-size`.
- `flower-animation.css` — `.art-flower-animation` with `.night`, `.flowers`, `.flower`, leaf/line elements, and optional `.bubbles`; `sm`/`lg` sizes. Customize `--art-flower-animation-size` and `--art-flower-animation-bg`.
- `synthwave-starfield.css` — `.art-synthwave-starfield` with `.art-synthwave-starfield-sides`, `.art-synthwave-starfield-lefrig`, `.art-synthwave-starfield-topbot`, and `.art-synthwave-starfield-stars`; `sm`/`lg` sizes and `.art-synthwave-starfield-paused`. Customize `--art-synthwave-starfield-size` and `--art-synthwave-starfield-line-color`.

### Interactive and UI

- `plasma-ball.css` — `.art-plasma-ball` composed from `.switcher`, `.glassball`, `.electrode`, `.rays`, `.ray`, `.bigwave`, `.hide-electrode`, `.base`, and `.switch`; `sm`/`lg` sizes and `.art-plasma-ball-no-base`. A checked input drives its CSS-only toggle. Customize `--art-plasma-ball-size`, `--art-plasma-ball-base-color`, and `--art-plasma-ball-switch-size`.
- `circular-gallery.css` — `.art-circular-gallery` containing a title and indexed card elements with linked images; `sm`/`lg` sizes. It uses motion paths, anchor positioning, and `:target`. Customize `--art-circular-gallery-size`, `--art-circular-gallery-radius`, `--art-circular-gallery-card-width`, `--art-circular-gallery-card-border-radius`, `--art-circular-gallery-arc-size`, `--art-circular-gallery-arc-center`, `--art-circular-gallery-arc-start`, `--art-circular-gallery-arc-shift-delta`, `--art-circular-gallery-card-trans-duration`, `--art-circular-gallery-card-trans-easing`, and `--art-circular-gallery-rotation`; each card supplies `--i`.
- `gemini-input.css` — `.art-gemini-input`, `.art-gemini-input-border`, `.art-gemini-input-inner`, `.art-gemini-input-btn`, and `.art-gemini-input-field`; `sm`/`lg` sizes. Customize `--art-gemini-input-width`, `--art-gemini-input-border-size`, `--art-gemini-input-gradient`, and `--art-gemini-input-rotation`.
- `csswitch.css` — `.art-csswitch` game-controller scene with its documented controller, frame, screen, Joy-Con, button, and logo children; `sm`/`lg` sizes. Customize `--art-csswitch-size`, `--joycon-left`, `--joycon-left-shadow`, `--joycon-right`, and `--joycon-right-shadow`; descendant color variables are internal to the composition.

### Abstract and Loading

- `color-spin.css` — `.art-color-spin` with a required `ul` and four `li` rings; `sm`/`lg` sizes. Customize `--art-color-spin-size`, `--art-color-spin-color1` through `--art-color-spin-color4`, and each ring's `--i`.
- `snowball-preloader.css` — `.art-snowball-preloader` with outer/inner rings, track cover, ball, texture, and shadow children; `sm`/`lg` sizes. Customize `--art-snowball-preloader-size` and `--art-snowball-preloader-bg`.

## Examples

Simple art pieces need only the root class:

```html
<div class="art-moon art-moon-crescent art-moon-glow"></div>
<div class="art-sun art-sun-rays art-sun-pulse"></div>
<div class="art-snowflake art-snowflake-unicode art-snowflake-fall"></div>
```

Structured pieces require the documented children because selectors use their order and relationships:

```html
<div class="art-atom">
  <div class="electron"></div>
  <div class="electron-alpha"></div>
  <div class="electron-omega"></div>
</div>
```

```html
<div class="art-eclipse">
  <div class="layer layer-1"></div>
  <div class="layer layer-2"></div>
  <div class="layer layer-3"></div>
  <div class="layer layer-4"></div>
  <div class="layer layer-5"></div>
  <div class="layer layer-6"></div>
</div>
```

```html
<div class="art-color-spin">
  <ul>
    <li style="--i: 1"></li>
    <li style="--i: 2"></li>
    <li style="--i: 3"></li>
    <li style="--i: 4"></li>
  </ul>
</div>
```

The gallery uses consumer-provided images. Keep links and alternative text meaningful:

```html
<div class="art-circular-gallery">
  <h1>Field notes</h1>
  <div style="--i: 1" data-title="Dawn">
    <a href="#dawn"><img src="dawn.jpg" alt="Dawn over the ridge" /></a>
  </div>
  <div style="--i: 2" data-title="Dusk">
    <a href="#dusk"><img src="dusk.jpg" alt="Dusk over the lake" /></a>
  </div>
</div>
```

Customize only the public custom properties:

```html
<div
  class="art-moon art-moon-glow"
  style="--art-moon-size: 6rem; --art-moon-color: oklch(88% 0.06 240)"
></div>
```

## Accessibility and Motion

- Treat purely decorative art as hidden from assistive technology with `aria-hidden="true"`.
- Give meaningful art an accessible name through surrounding text or an appropriate `aria-label`.
- Preserve real semantics for interactive inputs, links, images, and buttons inside an art piece.
- Do not remove the package's reduced-motion fallbacks. Application-level pause controls must update their accessible state.
- CSS-only does not mean every browser supports every effect. Circular Gallery relies on newer CSS motion/anchor features, Gemini Input uses `field-sizing`, and Snowball Preloader uses relative color syntax. Use the component documentation to choose a fallback for the supported browser matrix.

## Development Commands

From the repository root:

```bash
bun run dev:css-art
bun run build:css-art
cd packages/css-art && bun run test:unit
```

The current built bundle is approximately 143 KB unminified and 108 KB minified (decimal units). Rebuild before reporting exact package sizes because generated output changes with the source.
