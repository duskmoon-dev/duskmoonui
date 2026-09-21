---
name: duskmoon-dev-core
description: Install, configure, and use the @duskmoon-dev/core Tailwind CSS v4 component library, its themes, component exports, native interaction contracts, and optional effects.
---

# @duskmoon-dev/core

Use this skill when a project consumes `@duskmoon-dev/core`. The package is a CSS-first, Material Design 3-inspired library for Tailwind CSS v4. It supplies 85 component entry points, 61 color tokens, four themes, utilities, and optional effects; it does not ship an application state framework.

## Install

```bash
bun add @duskmoon-dev/core tailwindcss@^4.0.0
# npm install @duskmoon-dev/core tailwindcss@^4.0.0
# pnpm add @duskmoon-dev/core tailwindcss@^4.0.0
```

## Choose an Entry Point

For the complete styled library:

```css
@import "tailwindcss";
@import "@duskmoon-dev/core";
```

The Tailwind plugin registers tokens but does not inject component styles:

```css
@import "tailwindcss";
@plugin "@duskmoon-dev/core/plugin";
@import "@duskmoon-dev/core/components/button.css";
```

Other public CSS entries:

- `@duskmoon-dev/core/base.css` — base tokens and utilities
- `@duskmoon-dev/core/components` — all component styles
- `@duskmoon-dev/core/standalone.css` — prebuilt standalone stylesheet
- `@duskmoon-dev/core/effects.css` — all optional effects
- `@duskmoon-dev/core/effects/{name}.css` — one optional effect

### Available Component Exports

| Import path | Format | Purpose |
| --- | --- | --- |
| `@duskmoon-dev/core` | CSS | Complete Core bundle |
| `@duskmoon-dev/core/base.css` | CSS | Base tokens and utilities |
| `@duskmoon-dev/core/components` | CSS | Aggregate component barrel from `components/index.css` |
| `@duskmoon-dev/core/components/{name}.css` | CSS | One of the 85 component styles |
| `@duskmoon-dev/core/components/{name}` | JavaScript + types | One component's `css`, `styles`, and default exports |
| `@duskmoon-dev/core/plugin` | ESM/CJS + types | Tailwind CSS v4 plugin |
| `@duskmoon-dev/core/standalone.css` | CSS | Prebuilt standalone stylesheet |
| `@duskmoon-dev/core/themes/{name}` | CSS | One built-in theme |
| `@duskmoon-dev/core/effects.css` | CSS | Aggregate optional effects |
| `@duskmoon-dev/core/effects/{name}.css` | CSS | One optional effect stylesheet |
| `@duskmoon-dev/core/effects` | JavaScript + types | Aggregate optional-effect stylesheet module |
| `@duskmoon-dev/core/effects/{name}` | JavaScript + types | One optional-effect stylesheet module |

## Themes

Set a theme on the document root:

```html
<html data-theme="sunshine">
```

Available themes are `sunshine`, `moonlight`, `ocean`, and `forest`. Theme-only imports use `@duskmoon-dev/core/themes/{name}`.

Theme authors edit YAML under `packages/design/tokens/`; generated CSS under Core is shipped output, not an authoring surface. `packages/core/src/themes/defaults.css` supplies the root `sunshine` fallback and preferred-dark `moonlight` fallback separately from the generated `[data-theme]` blocks.

```javascript
document.documentElement.dataset.theme = "moonlight";
```

Prefer semantic Tailwind utilities and CSS variables:

```html
<section class="bg-surface-container text-on-surface">
  <button class="btn btn-primary">Save</button>
</section>
```

```css
.custom-panel {
  color: var(--color-on-surface);
  background: var(--color-surface-container);
  border-color: var(--color-outline-variant);
}
```

The token contract includes primary, secondary, tertiary, info, success, warning, error, surface, outline, inverse, scrim, and shadow roles. Use role tokens instead of literal colors.

## Component Inventory and Key Classes

Every name in backticks is an actual individual export. Import its CSS as `@duskmoon-dev/core/components/{name}.css`, or its stylesheet module as `@duskmoon-dev/core/components/{name}`.
The source `components/index.css` file is the aggregate barrel behind `@duskmoon-dev/core/components`, not an additional component.

### Actions

- `button` — `.btn`; semantic `.btn-primary` through `.btn-error`; `.btn-outlined`, `.btn-ghost`, `.btn-text`, `.btn-tonal`, size and loading modifiers.
- `circle-menu` — `.circle-menu`, `.circle-menu-toggler`, `.circle-menu-list`, `.circle-menu-item`; semantic and size modifiers.
- `dropdown` — `.dropdown` with native Popover `.dropdown-content`; placement uses `.dropdown-block-start`, `.dropdown-block-end`, `.dropdown-inline-start`, or `.dropdown-inline-end`.
- `fab` — `.fab`, `.fab-trigger`, `.fab-speed-dial`, `.fab-actions`, `.fab-action`, `.fab-label`; use native Popover or `.fab-controlled` plus `.fab-open`.
- `swap` — `.swap`, `.swap-input`, `.swap-on`, `.swap-off`; optional `.swap-rotate` and `.swap-active`.
- `theme-controller` — `.theme-controller`, `.theme-controller-item`, `.theme-controller-label`; dropdown form uses `.theme-controller-dropdown`, `.theme-controller-trigger`, `.theme-controller-menu`.
- `toggle` — `.toggle-btn`, `.toggle-btn-active`; `.toggle-group`, `.toggle-segmented`, `.toggle-chip`, `.toggle-filled`, `.toggle-outlined`.

### Data Entry

- `autocomplete` — `.autocomplete`, `.autocomplete-input`, `.autocomplete-toggle`, `.autocomplete-dropdown`, `.autocomplete-option`; the controller owns filtering and selection.
- `cascader` — `.cascader`, `.cascader-trigger`, `.cascader-dropdown`, `.cascader-panels`, `.cascader-panel`, `.cascader-option`; use a native Popover surface.
- `checkbox` — `.checkbox`; sizes, semantic variants, and native `:indeterminate` styling.
- `datepicker` — `.datepicker`, `.datepicker-input`, `.datepicker-trigger`, `.datepicker-dropdown`, `.datepicker-calendar`, `.datepicker-day`; native inputs are preferred when sufficient.
- `file-input` — `.file-input`; size, semantic, and `.file-input-ghost` variants.
- `file-upload` — `.file-upload`, `.file-upload-dropzone`, `.file-upload-input`, `.file-upload-list`, `.file-upload-item`; the application owns drag/drop and uploads.
- `filter-group` — `.filter-group` composed with `.chip`; semantic modifiers such as `.filter-group-primary`.
- `form` — compatibility aggregate for input, checkbox, radio, toggle switch, select, textarea, range, and form-group styles; it adds no classes.
- `form-group` — `.form-group`, `.form-label`, `.form-control`, `.helper-text`, `.fieldset`, `.fieldset-legend`.
- `input` — `.input`; semantic, size, `.input-outlined`, `.input-filled`, and `.input-ghost` modifiers.
- `multi-select` — `.multi-select`, `.multi-select-trigger`, `.multi-select-tags`, `.multi-select-tag`, `.multi-select-dropdown`, `.multi-select-option`.
- `otp-input` — `.otp-input`, `.otp-input-field`, `.otp-separator`; layout, fill, size, and semantic modifiers.
- `pin-input` — `.pin-input`, `.pin-input-field`; `.pin-input-visible`, `.pin-input-circle`, `.pin-input-dots`, sizes and semantic modifiers.
- `radio` — `.radio`; sizes and semantic variants; use native radio grouping.
- `range` — `.range`; size and semantic variants for a native range input.
- `rating` — `.rating`, `.rating-input`, `.rating-icon`; `.rating-half`, size, semantic, and read-only modifiers.
- `segment-control` — `.segment-control`, `.segment-item`, `.segment-item-active`; sizes and semantic variants.
- `select` — `.select`; `.select-filled`, `.select-outlined`, sizes, semantic variants, and `.select-ghost`.
- `slider` — composite `.slider`, `.slider-track`, `.slider-track-filled`, `.slider-thumb`, `.slider-mark`; the application owns its value model.
- `switch` — `.switch`; sizes, semantic variants, `.switch-ghost`, `.switch-label`, and `.switch-group` around a native checkbox.
- `textarea` — `.textarea`; container/label/helper classes, semantic variants, fill and resize modifiers.
- `time-input` — `.time-input`, `.time-input-segments`, `.time-input-segment`, `.time-input-period`; use native time inputs when sufficient.
- `toggle-switch` — `.toggle`; compact native-checkbox switch with sizes, semantic variants, and `.toggle-ghost`.
- `tree-select` — `.tree-select`, `.tree-select-trigger`, `.tree-select-dropdown`, `.tree-select-options`, `.tree-select-node`, `.tree-select-node-toggle`; use a native Popover surface.
- `validator` — state styles shared by `.form-group`, native validity selectors, and data-input classes; use `.info`, `.warning`, `.success`, or `.error` deliberately.

### Data Display

- `avatar` — `.avatar`, `.avatar-placeholder`; sizes, shapes, semantic variants, groups, and status indicators.
- `badge` — `.badge`; semantic, outline, tonal, dot, indicator, and size variants.
- `card` — `.card`, `.card-body`, `.card-header`, `.card-footer`, `.card-title`, `.card-actions`; surface and interaction variants.
- `carousel` — `.carousel`, `.carousel-item`; horizontal/vertical scroll snap and start/center/end alignment.
- `chat` — `.chat`, `.chat-start`, `.chat-end`, `.chat-bubble`, `.chat-reasoning`, `.chat-tool`, `.chat-typing`, plus optional scroll indicators.
- `chip` — `.chip`; semantic, outlined, tonal, ghost, clickable, selected, disabled, and size variants.
- `code-block` — `.code-block`, `.code-header`, `.code-title`, `.code-language`, `.copy-button`, `.code-content`.
- `countdown` — `.countdown`, `.countdown-value`; size, animation, and semantic modifiers. The application updates time.
- `diff` — `.diff`, `.diff-before`, `.diff-after`, `.diff-label`; set `--diff-position` or use the range controller.
- `indicator` — `.indicator`, `.indicator-item`; block and inline placement modifiers.
- `kbd` — `.kbd`; sizes, semantic variants, and `.kbd-ghost`.
- `list` — `.list`, `.list-item`, `.list-item-content`, `.list-item-leading`, `.list-item-trailing`; density and interaction variants.
- `loading` — `.loading`; `.loading-spinner`, `.loading-dots`, `.loading-bars`, sizes and semantic variants.
- `mask` — `.mask`; `.mask-circle`, `.mask-squircle`, `.mask-square`, `.mask-diamond`, `.mask-hexagon`, `.mask-triangle`.
- `progress` — `.progress`, `.progress-bar`; semantic, size, striped, and indeterminate variants.
- `radial-progress` — `.radial-progress`; set `--radial-progress-value`, with size and semantic modifiers.
- `skeleton` — `.skeleton`; text, circle, rect, rounded, avatar, button, image, card, group, size, and static variants.
- `stat` — `.stats`, `.stat`, `.stat-title`, `.stat-value`, `.stat-desc`, `.stat-figure`, `.stat-actions`; responsive and semantic variants.
- `table` — `.table`; surface, zebra/striped, hover, border, density, sticky-header, sortable, selectable, pinned-column, and responsive variants.
- `timeline` — `.timeline`, `.timeline-item`, `.timeline-marker`, `.timeline-content`; semantic and layout variants.

### Feedback and Overlays

- `alert` — `.alert`, `.alert-icon`, `.alert-content`, `.alert-title`, `.alert-actions`; semantic, layout, outline, filled, and ghost variants.
- `bottomsheet` — `.bottomsheet`, `.bottomsheet-backdrop`, `.bottomsheet-header`, `.bottomsheet-content`, `.bottomsheet-footer`; supports native and controlled open states.
- `collapse` — `.collapse`, `.collapse-trigger`, `.collapse-content`; native `details[open]` or controlled `.collapse-open` / `.collapse-closed`.
- `dialog` — style a native `<dialog class="dialog">`; `.dialog-box`, `.dialog-header`, `.dialog-body`, `.dialog-footer`, sizes and placement modifiers.
- `drawer` — `.drawer`, `.drawer-header`, `.drawer-body`, `.drawer-footer`; native Popover or Dialog variants and controlled directional aliases.
- `modal` — `.modal`, `.modal-box`, `.modal-backdrop`, `.modal-action`; controlled compatibility surface with sizes, placement, and animation modifiers.
- `popover` — `.popover`, `.popover-body`, `.popover-header`, `.popover-footer`; placement, size, color, modal, and arrow modifiers.
- `snackbar` — `.snackbar-container`, `.snackbar`, `.snackbar-message`, `.snackbar-action`, `.snackbar-close`; positions, open aliases, and semantic variants.
- `toast` — `.toast-container`, `.toast`, `.toast-content`, `.toast-actions`; native Popover or controlled aliases, positions, and semantic variants.
- `tooltip` — `.tooltip` on `popover="hint"`; placement, color, size, multiline, and no-arrow modifiers.

### Navigation

- `bottom-navigation` — `.bottom-nav`, `.bottom-nav-item`, `.bottom-nav-icon`, `.bottom-nav-label`; active, surface, semantic, and size modifiers.
- `breadcrumbs` — `.breadcrumbs`, `.breadcrumb-item`, `.breadcrumb-link`, `.breadcrumb-separator`; separator, semantic, size, contained, and nowrap variants.
- `link` — `.link`; hover, semantic, neutral, and inherit variants.
- `megamenu` — `.megamenu`, `.megamenu-bar`, `.megamenu-trigger`, `.megamenu-panel`, `.megamenu-grid`; native Popover desktop and disclosure mobile compositions.
- `menu` — `.menu`, `.menu-item`, `.menu-title`; native Popover positioning, horizontal/vertical, and compact variants.
- `navbar` — `.navbar`, `.navbar-start`, `.navbar-center`, `.navbar-end`, `.navbar-brand`, `.navbar-item`; semantic, responsive, sticky, bordered, and size variants.
- `navigation` — compatibility aggregate for dropdown, navbar, menu, breadcrumbs, tabs, pagination, link, and megamenu; it adds no classes.
- `nested-menu` — `.nested-menu`, `.nested-menu-title`; native nested `details`, sizes, bordered, and compact variants.
- `pagination` — `.pagination`, `.pagination-item`, `.pagination-prev`, `.pagination-next`, `.pagination-ellipsis`, `.pagination-info`; style and semantic variants.
- `stepper` — `.stepper`, `.stepper-step`, `.stepper-step-button`, `.stepper-step-icon`, `.stepper-step-content`; active, completed, error, disabled, vertical, and semantic states.
- `tabs` — `.tabs`, `.tab`, `.tab-active`; pill, tonal, boxed, lifted, vertical, scrolling, alignment, size, and semantic variants.

### Layout and Pages

- `accordion` — `.accordion`, `.accordion-item`, `.accordion-header`, `.accordion-content`; native `details` or controlled open aliases and style modifiers.
- `appbar` — `.appbar`, `.appbar-nav`, `.appbar-title-group`, `.appbar-actions`; fixed/sticky, top/bottom, surface, semantic, and size variants.
- `console-page` — `.console-page`, `.console-page-frame`, `.console-page-appbar`, `.console-page-sidebar`, `.console-page-main`; compact and mobile menu composition.
- `divider` — `.divider`; vertical, thickness, line-style, semantic, inset, content, and spacing variants.
- `footer` — `.footer`; horizontal/vertical, title, and centered layouts.
- `hero` — `.hero`, `.hero-content`, `.hero-overlay`; start/center/end alignment.
- `home-page` — `.home-page`, `.home-page-frame`, `.home-page-header`, `.home-page-nav`, `.home-page-main`, `.home-page-hero`, `.home-page-footer`.
- `join` — `.join`, `.join-item`; horizontal or vertical grouping.
- `markdown-body` — apply `.markdown-body` to rendered Markdown content.
- `sidebar-layout` — `.sidebar-layout`, `.sidebar-layout-sidebar`, `.sidebar-layout-content`; start/end, compact, and hidden variants.
- `sign-page` — `.sign-page`, `.sign-page-frame`, `.sign-page-aside`, `.sign-page-main`, `.sign-page-content`.
- `stack` — `.stack`; top/bottom/start/end offsets.

## Common Examples

```html
<button class="btn btn-primary">Save</button>
<input class="input input-primary" placeholder="Name" />

<article class="card card-outlined">
  <div class="card-body">
    <h2 class="card-title">Account</h2>
    <p>Manage your profile.</p>
  </div>
</article>
```

For native Popover components, connect the trigger and surface and give each demo a unique ID:

```html
<button class="tree-select-trigger" popovertarget="demo-team-tree">Choose team</button>
<div id="demo-team-tree" class="tree-select-dropdown" popover="auto">
  <div class="tree-select-options">...</div>
</div>
```

The application owns composite selection, filtering, value display, validation, and ARIA synchronization. Opening and closing the Popover surface is browser-owned.

## Utilities

Grid utilities accept any positive integer and convert it to `0.25rem` spacing:

```html
<div class="grid grid-cols-auto-fill-48 gap-4">...</div>
<div class="grid grid-cols-auto-fit-72 gap-4">...</div>
```

Use `.sr-only` for visually hidden accessible text and `focus:not-sr-only` for a focus-revealed skip link.

## Optional Effects

Effects are excluded from the default core and standalone bundles. Import all effects or one effect explicitly:

```css
@import "@duskmoon-dev/core/effects.css";
@import "@duskmoon-dev/core/effects/aura.css";
```

The available effects are `aura`, `hover-3d`, `hover-gallery`, and `text-rotate`. Stylesheet modules use `@duskmoon-dev/core/effects` and `@duskmoon-dev/core/effects/{name}`; SSR returns `null` constructable stylesheets.

Hover Gallery and Text Rotate animate from their documented child markup without JavaScript. An optional Text Rotate pause button needs a small application controller to toggle `.text-rotate-paused` and synchronize `aria-pressed`.

## Native State and Accessibility

- Native `details[open]` wins over disclosure class aliases. Controlled Accordion accepts `.open` / `.accordion-item-open`; Collapse `.collapse-closed` wins over `.collapse-open` / `.show`.
- Native Popover and Dialog state should be authoritative where supported. Do not maintain a second conflicting visibility state.
- Applications synchronize controlled ARIA state, `hidden`/`inert`, values, and focus. Never hide focusable controls with CSS clipping alone.
- Native exclusive details may use `name`; otherwise the application owns exclusivity.
- Tooltips use `interestfor` plus `popover="hint"`. Preserve an accessible name or description outside the visual-only styling.

## JavaScript and Custom Elements

Each extensionless component and effect module exports:

- `css: string` — stylesheet text, including its cascade layer
- `styles: CSSStyleSheet | null` — constructable stylesheet when the runtime supports it
- a default export equal to `styles`

```javascript
import { css, styles } from "@duskmoon-dev/core/components/button";

if (styles) {
  shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, styles];
} else {
  const style = document.createElement("style");
  style.textContent = css;
  shadowRoot.append(style);
}
```

Keep the `@layer components` wrapper unless the target shadow-DOM cascade strategy specifically requires unlayered rules.
