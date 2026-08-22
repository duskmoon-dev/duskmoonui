---
name: css-art
description: >
  Use when creating, adding, or modifying CSS art pieces in this repo
  (packages/css-art). Trigger when the user asks to "add CSS art", "create a CSS
  art piece", "port this CSS art", or pastes raw HTML/CSS art to integrate.
  Covers the full 5-step workflow: CSS file, import, docs MDX, sidebar entry,
  and index entry.
---

# CSS Art Workflow

Every CSS art piece requires **5 files** touched. Don't stop after the CSS — the
docs and index entries are equally required.

## 1. CSS Component

**File:** `packages/css-art/src/art/{name}.css`

Rules:
- Wrap everything in `@layer css-art { }`
- Root class: `.art-{name}` (kebab-case)
- CSS custom properties: `--art-{name}-*` (e.g. `--art-moon-size`)
- `@keyframes` names: `art-{name}-*` (namespaced to avoid collisions)
- Size variants via CSS custom property, not hardcoded: default + `sm` + `lg`
- Use `position: relative` on the root class; children use `position: absolute`

**Skeleton:**
```css
@layer css-art {
  @keyframes art-{name}-{animation} {
    /* ... */
  }

  .art-{name} {
    --art-{name}-size: 400px;
    /* other tokens */

    position: relative;
    width: var(--art-{name}-size);
    /* ... */
  }

  .art-{name}-sm { --art-{name}-size: 200px; }
  .art-{name}-lg { --art-{name}-size: 600px; }
}
```

**Porting from external CSS art (body/figure globals):**
When the source uses `body` or `figure` with `vmin`/`vh` units and `em` sizing:
- The outer container replaces the global + sets `font-size: calc(var(--size) / N)`
  where N is the `width` value in `em` from the original (e.g. `width: 90em` → divide by 90).
  This preserves all internal `em` ratios.
- Child elements that had their own `font-size` in `vmin` — convert to `em` using the
  same ratio: `0.4vmin` on a `1vmin` root → `font-size: 0.4em` on the child.
- Namespace `@keyframes` (add `art-{name}-` prefix).
- Fix any CSS typos from the original (e.g. `rotatE` → `rotate`).
- Drop unrelated elements (YouTube links, standalone `<figure>` wrappers, etc.).

## 2. Register the Import

**File:** `packages/css-art/src/art/index.css`

Append at the end:
```css
@import "./{name}.css";
```

## 3. Docs MDX Page

**File:** `packages/docs/src/content/docs/en/css-art/{name}.mdx`

Frontmatter fields (all required):
```yaml
---
title: {Human Name}
description: {One-line description for SEO}
category: css-art
order: {next available integer}
published: true
tags: ['css-art', '{name}', ...]
---
```

Page structure — all sections are required:

1. `import ComponentShowcase from '../../../../components/showcase/ComponentShowcase.astro';`
2. `# {Title}` + one paragraph describing what the art is and how it works technically
3. `## Basic Usage` — minimal working example in a `<ComponentShowcase>`
4. `## Sizes` — show sm / default / lg side by side (skip if no size variants)
5. `## CSS` — fenced `css` block with the **complete source CSS** of the component
6. `## HTML Structure` — fenced `html` block with the full required HTML markup
7. `## CSS Custom Properties` — markdown table of every `--art-{name}-*` token:
   `| Property | Default | Description |`
8. `## API Reference` — markdown table of every class:
   `| Class | Description |`

Credit the original artist if the art is ported from an external source.

**ComponentShowcase usage:**
```mdx
<ComponentShowcase
  title="Basic {Name}"
  code={`<div class="art-{name}">
  <!-- child elements if needed -->
</div>`}
/>
```

**CSS section example:**
````mdx
## CSS

```css
@layer css-art {
  .art-{name} {
    /* full source */
  }
}
```
````

**HTML Structure section example:**
````mdx
## HTML Structure

```html
<div class="art-{name}">
  <div class="child-element"></div>
</div>
```
````

**CSS Custom Properties section example:**
```mdx
## CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--art-{name}-size` | `400px` | Overall container size |
| `--art-{name}-color` | `#fff` | Primary color |
```

## 4. Sidebar Nav Entry

**File:** `packages/docs/src/components/navigation/Sidebar.astro`

Find the `CSS Art` section and append:
```js
{ title: '{Human Name}', href: `${base}docs/en/css-art/{name}/`, badge: 'new' },
```

## 5. Index Page Entry

**File:** `packages/docs/src/pages/css-art/index.astro`

Add to the `artPieces` array. Either append to an existing category that fits, or
create a new category object:

```js
// Append to existing category:
{ name: '{Human Name}', slug: '{name}', description: '{short description}' },

// Or new category:
{
  name: '{Category Name}',
  items: [
    { name: '{Human Name}', slug: '{name}', description: '{short description}' },
  ],
},
```

Category names in use: `Celestial`, `Landscape`, `Weather`, `Interactive`, `Characters`.

---

## Checklist

Before finishing, confirm all five are done:
- [ ] `packages/css-art/src/art/{name}.css` created
- [ ] `packages/css-art/src/art/index.css` import appended
- [ ] `packages/docs/src/content/docs/en/css-art/{name}.mdx` created
- [ ] Sidebar entry added (with `badge: 'new'`)
- [ ] Index page entry added under appropriate category
