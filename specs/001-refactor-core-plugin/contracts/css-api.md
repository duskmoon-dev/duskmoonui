# CSS Component API Contract

**Version**: 1.0.0
**Last Updated**: 2025-11-19

## Component Classes

### Button

**Base Class**: `.btn`
**Variants**: `.btn-primary`, `.btn-secondary`, `.btn-tertiary`, `.btn-outline`, `.btn-ghost`
**Sizes**: `.btn-xs`, `.btn-sm`, `.btn-lg`
**States**: hover, active, focus, disabled

```html
<!-- Basic button -->
<button class="btn btn-primary">Click me</button>

<!-- With Tailwind utilities -->
<button class="btn btn-secondary rounded-full px-8 shadow-lg">
  Custom Button
</button>

<!-- Size variants -->
<button class="btn btn-primary btn-xs">Extra Small</button>
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary">Medium (default)</button>
<button class="btn btn-primary btn-lg">Large</button>

<!-- Style variants -->
<button class="btn btn-outline btn-primary">Outline</button>
<button class="btn btn-ghost">Ghost</button>

<!-- States -->
<button class="btn btn-primary" disabled>Disabled</button>
```

### Card

**Base Class**: `.card`
**Sub-components**: `.card-body`, `.card-title`, `.card-actions`
**Variants**: `.card-bordered`, `.card-compact`, `.card-side`

```html
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

### Input

**Base Class**: `.input`
**Variants**: `.input-bordered`, `.input-primary`, `.input-secondary`, `.input-tertiary`
**Sizes**: `.input-xs`, `.input-sm`, `.input-lg`
**States**: focus, disabled, error

```html
<!-- Basic input -->
<input type="text" class="input input-bordered" placeholder="Type here" />

<!-- Color variants -->
<input type="text" class="input input-bordered input-primary" />
<input type="text" class="input input-bordered input-secondary" />
<input type="text" class="input input-bordered input-tertiary" />

<!-- Sizes -->
<input type="text" class="input input-bordered input-xs" />
<input type="text" class="input input-bordered input-sm" />
<input type="text" class="input input-bordered" />
<input type="text" class="input input-bordered input-lg" />
```

### Form

**Base Class**: `.form-control`
**Sub-components**: `.label`, `.label-text`, `.label-text-alt`

```html
<div class="form-control">
  <label class="label">
    <span class="label-text">Email</span>
  </label>
  <input type="email" class="input input-bordered" />
  <label class="label">
    <span class="label-text-alt">Helper text</span>
  </label>
</div>
```

### Navigation

**Base Class**: `.navbar`
**Sub-components**: `.navbar-start`, `.navbar-center`, `.navbar-end`

```html
<div class="navbar bg-base-100">
  <div class="navbar-start">
    <a class="btn btn-ghost">Logo</a>
  </div>
  <div class="navbar-center">
    <span>Center Content</span>
  </div>
  <div class="navbar-end">
    <button class="btn btn-primary">CTA</button>
  </div>
</div>
```

### Modal

**Base Class**: `.modal`
**Sub-components**: `.modal-box`, `.modal-action`, `.modal-backdrop`

```html
<div class="modal" id="my-modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Modal Title</h3>
    <p>Modal content goes here.</p>
    <div class="modal-action">
      <button class="btn">Cancel</button>
      <button class="btn btn-primary">Confirm</button>
    </div>
  </div>
  <div class="modal-backdrop"></div>
</div>
```

## Customization Patterns

### Method 1: Tailwind Utilities (Recommended)

```html
<button class="btn btn-primary rounded-full px-8 py-4 shadow-2xl">
  <!-- Utilities override spacing, borders, shadows -->
</button>
```

### Method 2: CSS Variables

```css
.my-custom-button {
  --btn-bg: linear-gradient(to right, var(--color-primary), var(--color-secondary));
  --btn-padding: 1.5rem 3rem;
}
```

```html
<button class="btn my-custom-button">Custom</button>
```

### Method 3: CSS @apply

```css
@utility btn-gradient {
  @apply bg-gradient-to-r from-primary to-secondary text-white;
}
```

```html
<button class="btn btn-gradient">Gradient Button</button>
```

## Color Utility Classes

All color tokens available as Tailwind utilities:

```html
<!-- Backgrounds -->
<div class="bg-primary">Primary background</div>
<div class="bg-secondary/60">Secondary with 60% opacity</div>

<!-- Text -->
<span class="text-primary-content">Primary content text</span>
<span class="text-tertiary">Tertiary text</span>

<!-- Borders -->
<div class="border border-outline">With border</div>
<div class="border-2 border-primary">Primary border</div>

<!-- Gradients -->
<div class="bg-gradient-to-r from-primary via-secondary to-tertiary">
  Gradient
</div>
```
