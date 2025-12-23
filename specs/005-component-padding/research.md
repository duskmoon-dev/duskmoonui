# Research: Component Padding with Logical Properties

**Feature**: 005-component-padding
**Date**: 2025-12-23

## DaisyUI 5 Padding Pattern

### Decision
Follow DaisyUI 5's CSS variable pattern for padding abstraction.

### Rationale
- Proven pattern in production (DaisyUI 5 is widely used)
- Enables easy theming without selector overrides
- Size variants simply override the variable value
- Clean separation between structure and values

### Alternatives Considered
1. **Hardcoded values** - Rejected: no theming flexibility
2. **Tailwind utilities only** - Rejected: less control for library authors

## Button Padding Implementation

### Decision
Use `padding-inline: var(--btn-p)` for horizontal padding with size variants overriding `--btn-p`.

### DaisyUI 5 Reference Values

| Size | `--btn-p` Value | Current DuskMoonUI |
|------|-----------------|-------------------|
| xs   | 0.5rem          | 0.25rem 0.5rem    |
| sm   | 0.75rem         | 0.375rem 0.75rem  |
| md   | 1rem            | 0.625rem 1.25rem  |
| lg   | 1.25rem         | 0.875rem 1.75rem  |

### Proposed Implementation

```css
.btn {
  --btn-p: 1rem;           /* Default (md) */
  --btn-py: 0.625rem;      /* Vertical padding */
  padding-inline: var(--btn-p);
  padding-block: var(--btn-py);
}

.btn-xs { --btn-p: 0.5rem; --btn-py: 0.25rem; }
.btn-sm { --btn-p: 0.75rem; --btn-py: 0.375rem; }
.btn-md { --btn-p: 1rem; --btn-py: 0.625rem; }
.btn-lg { --btn-p: 1.25rem; --btn-py: 0.875rem; }
```

### Rationale
- Maintains current visual appearance (same pixel values)
- Enables RTL support via `padding-inline`
- CSS variable enables user customization

## Card Padding Implementation

### Decision
Use `padding: var(--card-p)` shorthand for uniform padding.

### DaisyUI 5 Reference Values

| Variant | `--card-p` Value | Current DuskMoonUI |
|---------|-----------------|-------------------|
| default | 1.5rem          | 1.5rem (card-body) |
| compact | 1rem            | 1rem              |

### Proposed Implementation

```css
.card-body {
  --card-p: 1.5rem;
  padding: var(--card-p);
}

.card-compact .card-body {
  --card-p: 1rem;
}

.card-actions {
  padding-block-start: 0.5rem;
}
```

### Rationale
- `padding` shorthand works for RTL (symmetric)
- CSS variable enables user customization
- Maintains current visual appearance

## Logical Properties Browser Support

### Decision
Use logical properties directly (no fallbacks needed).

### Browser Support
- Chrome 87+ (Dec 2020)
- Firefox 66+ (Mar 2019)
- Safari 14.1+ (Apr 2021)
- Edge 87+ (Dec 2020)

### Rationale
All target browsers support logical properties. The constitution specifies "modern browsers" which aligns with this support matrix.

## Migration Strategy

### Decision
In-place replacement of physical properties with logical equivalents.

### Changes Required

| File | Current | After |
|------|---------|-------|
| button.css | `padding: 0.625rem 1.25rem` | `padding-inline: var(--btn-p); padding-block: var(--btn-py);` |
| card.css | `padding: 1.5rem` | `padding: var(--card-p)` |
| card.css | `padding-top: 0.5rem` | `padding-block-start: 0.5rem` |

### Rationale
- Minimal changes (refactor, not rewrite)
- Visual regression tests catch any unintended changes
- RTL support is automatic after migration
