# Quickstart: Button Style Fix Implementation

## Pre-Implementation Checklist

- [ ] Read `research.md` to understand the color system architecture
- [ ] Verify current button.css displays broken colors (view in browser)
- [ ] Confirm documentation uses `.btn-outlined`, `.btn-text`, `.btn-tonal`

## Implementation Steps

### Step 1: Fix Color Variable Syntax

Update all color properties to use `hsl(var(--color-*))` syntax.

**Before:**
```css
.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-primary-content);
  border-color: var(--color-primary);
}
```

**After:**
```css
.btn-primary {
  background-color: hsl(var(--color-primary));
  color: hsl(var(--color-primary-content));
  border-color: hsl(var(--color-primary));
}
```

Apply this pattern to:
- Primary, secondary, tertiary button variants
- Semantic color variants (info, success, warning, error)
- Outline and ghost variant color overrides
- Hover and focus states

### Step 2: Add Class Aliases

Add documentation-aligned class names as aliases:

```css
/* Outlined Variant (alias for .btn-outline) */
.btn-outlined {
  background-color: transparent;
  border: 1px solid hsl(var(--color-outline));
  color: hsl(var(--color-on-surface));
}
/* Copy all .btn-outline styles to .btn-outlined */

/* Text Variant (alias for .btn-ghost) */
.btn-text {
  background-color: transparent;
  border-color: transparent;
  color: hsl(var(--color-on-surface));
}
/* Copy all .btn-ghost styles to .btn-text */
```

### Step 3: Add Tonal Variant

Create new `.btn-tonal` variant using container colors:

```css
/* Tonal Variant - uses container colors for subtle appearance */
.btn-tonal {
  background-color: hsl(var(--color-primary-container));
  color: hsl(var(--color-on-primary-container));
  border-color: transparent;
}

.btn-tonal:hover {
  filter: brightness(0.95);
}

.btn-tonal.btn-secondary {
  background-color: hsl(var(--color-secondary-container));
  color: hsl(var(--color-on-secondary-container));
}

.btn-tonal.btn-tertiary {
  background-color: hsl(var(--color-tertiary-container));
  color: hsl(var(--color-on-tertiary-container));
}
```

### Step 4: Add Medium Size Class

Add explicit `.btn-md` that matches default:

```css
.btn-md {
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  border-radius: 0.5rem;
}
```

### Step 5: Add Reduced Motion Support

Add at the end of the `@layer components` block:

```css
/* Reduce Motion */
@media (prefers-reduced-motion: reduce) {
  .btn {
    transition: none;
  }

  .btn-loading::after {
    animation: none;
  }
}
```

## Verification Steps

### Visual Testing

1. Start dev server: `bun run dev`
2. Navigate to button documentation page
3. Verify all button variants display correct colors:
   - Primary: Warm orange (sunshine) / Cool blue (moonlight)
   - Secondary: Coral pink (sunshine) / Soft teal (moonlight)
   - Tertiary: Violet (sunshine) / Lavender (moonlight)
   - Semantic: Info (blue), Success (green), Warning (amber), Error (red)

### Class Name Testing

Test each documented class name:
```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-outlined">Outlined</button>
<button class="btn btn-text">Text</button>
<button class="btn btn-tonal">Tonal</button>
<button class="btn btn-sm">Small</button>
<button class="btn btn-md">Medium</button>
<button class="btn btn-lg">Large</button>
```

### Accessibility Testing

1. Enable "Reduce Motion" in OS settings
2. Verify button transitions are disabled
3. Verify loading spinner is static

## Build Verification

```bash
# Build the core package
bun run build:core

# Build the docs site
bun run build:docs

# Both should succeed without errors
```

## Files Modified

- `packages/core/src/components/button.css` - Primary changes
