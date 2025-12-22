# Research: Button Style Fix

## Color System Architecture

### Theme Variable Format

DuskMoonUI themes define color variables using **space-separated HSL values** without the `hsl()` function wrapper:

```css
/* From packages/core/src/themes/sunshine.css */
[data-theme="sunshine"] {
  --color-primary: 30 90% 55%;           /* Warm Orange */
  --color-primary-focus: 30 90% 45%;
  --color-primary-content: 0 0% 100%;
  --color-secondary: 340 80% 60%;        /* Coral Pink */
  --color-tertiary: 270 70% 60%;         /* Violet */
  --color-error: 0 75% 55%;              /* Red */
  --color-success: 145 65% 42%;          /* Green */
  /* ... */
}
```

### Correct Usage Pattern

Components must wrap these variables in `hsl()` when using them as color values:

```css
/* CORRECT - from switch.css:181 */
background-color: hsl(var(--color-success));

/* CORRECT - from toast.css:164 */
border-color: hsl(var(--color-info));

/* INCORRECT - current button.css:56 */
background-color: var(--color-primary);  /* Outputs: "30 90% 55%" - invalid! */
```

### Why This Matters

When CSS sees `background-color: 30 90% 55%;` (the raw value), it's not a valid color and gets ignored. The browser falls back to transparent/inherited, making buttons appear colorless.

## Component Class Name Conventions

### Documentation vs Implementation Audit

| Documentation Class | Current CSS Class | Status |
|---------------------|-------------------|--------|
| `.btn` | `.btn` | ✅ Match |
| `.btn-primary` | `.btn-primary` | ✅ Match (needs hsl fix) |
| `.btn-secondary` | `.btn-secondary` | ✅ Match (needs hsl fix) |
| `.btn-tertiary` | `.btn-tertiary` | ✅ Match (needs hsl fix) |
| `.btn-info` | `.btn-info` | ✅ Match (needs hsl fix) |
| `.btn-success` | `.btn-success` | ✅ Match (needs hsl fix) |
| `.btn-warning` | `.btn-warning` | ✅ Match (needs hsl fix) |
| `.btn-error` | `.btn-error` | ✅ Match (needs hsl fix) |
| `.btn-outlined` | `.btn-outline` | ❌ Mismatch |
| `.btn-text` | `.btn-ghost` | ❌ Mismatch |
| `.btn-tonal` | (missing) | ❌ Missing |
| `.btn-sm` | `.btn-sm` | ✅ Match |
| `.btn-md` | (missing) | ❌ Missing |
| `.btn-lg` | `.btn-lg` | ✅ Match |

### Naming Convention Sources

- **Material Design 3**: Uses "Outlined", "Tonal", "Text" for button variants
- **DaisyUI**: Uses "ghost", "outline"
- **DuskMoonUI Docs**: Follows MD3 naming (outlined, text, tonal)

### Recommended Approach

Add **aliases** rather than renaming to maintain backward compatibility:

```css
/* Primary names (documentation-aligned) */
.btn-outlined { /* styles */ }
.btn-text { /* styles */ }
.btn-tonal { /* new variant */ }

/* Aliases for backward compatibility */
.btn-outline { /* same as .btn-outlined */ }
.btn-ghost { /* same as .btn-text */ }
```

## Accessibility Requirements

### prefers-reduced-motion

All other components in the library include motion reduction support:

```css
/* From switch.css:266 */
@media (prefers-reduced-motion: reduce) {
  .switch-track,
  .switch-thumb {
    transition: none;
  }
}

/* From stepper.css:307 */
@media (prefers-reduced-motion: reduce) {
  .stepper-step-icon {
    transition: none;
  }
}
```

Button.css is missing this but has transitions on:
- `.btn` base (line 25): `transition: all 150ms ease-in-out;`
- Loading animation (line 304): `animation: btn-spin 0.6s linear infinite;`

### WCAG Compliance

The color tokens already ensure WCAG AA contrast ratios through the `-content` variants:
- `--color-primary-content` on `--color-primary` background
- `--color-error-content` on `--color-error` background

No additional contrast work needed if colors display correctly.

## Padding Analysis

Current button padding values are reasonable:

| Size | Padding | Effective Pixels |
|------|---------|------------------|
| `.btn` (default) | `0.625rem 1.25rem` | 10px 20px |
| `.btn-xs` | `0.25rem 0.5rem` | 4px 8px |
| `.btn-sm` | `0.375rem 0.75rem` | 6px 12px |
| `.btn-lg` | `0.875rem 1.75rem` | 14px 28px |

The spec mentions MD3 specifications of ~10px 20px for medium, which matches the current default. **No padding changes required.**

## Color Properties to Update

Full list of color properties in button.css that need `hsl()` wrapping:

### Brand Colors (primary, secondary, tertiary)
- Lines 56-58: `.btn-primary` background, color, border
- Lines 62-63: `.btn-primary:hover` background, border
- Lines 68: `.btn-primary:focus-visible` outline
- Lines 73-75: `.btn-secondary` background, color, border
- Lines 79-80: `.btn-secondary:hover` background, border
- Lines 85: `.btn-secondary:focus-visible` outline
- Lines 90-92: `.btn-tertiary` background, color, border
- Lines 96-97: `.btn-tertiary:hover` background, border
- Lines 102: `.btn-tertiary:focus-visible` outline

### Outline Variant Colors
- Lines 108, 118, 119, 123-124, 128, 129, 133-134, 138, 139, 143-144

### Ghost Variant Colors
- Lines 160, 164-165, 169, 173-174, 178, 182-183

### Semantic Colors (info, success, warning, error)
- Lines 188-190: `.btn-info`
- Lines 194-195: `.btn-info:hover`
- Lines 200-202: `.btn-success`
- Lines 206-207: `.btn-success:hover`
- Lines 212-214: `.btn-warning`
- Lines 218-219: `.btn-warning:hover`
- Lines 224-226: `.btn-error`
- Lines 230-231: `.btn-error:hover`

### Base/Surface Colors (NO change needed)
Properties using `var(--color-surface-*)` and `var(--color-on-surface)` appear to work correctly because these are likely defined as full color values rather than HSL components. However, verification is recommended.

## Summary

| Issue | Root Cause | Fix |
|-------|-----------|-----|
| Colors not displaying | Missing `hsl()` wrapper around CSS variables | Wrap all `var(--color-*)` in `hsl()` |
| Class name mismatch | CSS uses different names than docs | Add aliases (.btn-outlined, .btn-text) |
| Missing tonal variant | Not implemented | Create new `.btn-tonal` styles |
| Missing .btn-md | Not implemented | Add explicit medium size class |
| Missing motion reduction | Not implemented | Add `@media (prefers-reduced-motion)` |
