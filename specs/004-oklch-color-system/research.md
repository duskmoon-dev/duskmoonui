# Research: OKLCH Color System Migration

**Feature**: 004-oklch-color-system
**Date**: 2025-12-23
**Status**: Complete

## HSL to OKLCH Conversion

### Decision: Use full OKLCH syntax with wrapper

**Rationale**: Following DaisyUI 5 pattern, store complete OKLCH values in CSS variables.

**Current Format (HSL space-separated)**:
```css
--color-primary: 30 90% 55%;
/* Usage: hsl(var(--color-primary)) */
```

**New Format (OKLCH with wrapper)**:
```css
--color-primary: oklch(70% 0.18 50);
/* Usage: var(--color-primary) - no wrapper needed */
```

**Alternatives Considered**:
1. **Raw OKLCH values without wrapper** (like DaisyUI 5 internal): Rejected because it requires `oklch(var(--color))` at every usage point
2. **Keep HSL format**: Rejected because constitution v1.3.0 mandates OKLCH

### OKLCH Color Space Explained

OKLCH uses three components:
- **L (Lightness)**: 0% (black) to 100% (white) - perceptually uniform
- **C (Chroma)**: 0 (gray) to ~0.4 (most saturated) - colorfulness
- **H (Hue)**: 0-360 degrees - color angle on color wheel

**Key Advantages**:
- Perceptually uniform lightness (unlike HSL where 50% L varies by hue)
- Consistent color mixing results
- Wide gamut support (P3, Rec2020)
- Native CSS manipulation via `color-mix()`

## HSL to OKLCH Conversion Formula

### Conversion Tool

For accurate conversion, use browser DevTools or online converters. Manual approximations:

| HSL Hue | OKLCH Hue (approx) |
|---------|-------------------|
| 0 (red) | 29 |
| 30 (orange) | 50 |
| 40 (yellow-orange) | 70 |
| 145 (green) | 145 |
| 175 (teal) | 185 |
| 200 (blue) | 240 |
| 220 (blue) | 255 |
| 270 (purple) | 300 |
| 280 (violet) | 305 |
| 340 (pink) | 0 |

**Lightness Conversion** (approximate):
- HSL 10% → OKLCH 25%
- HSL 25% → OKLCH 40%
- HSL 40% → OKLCH 55%
- HSL 50% → OKLCH 65%
- HSL 60% → OKLCH 72%
- HSL 70% → OKLCH 80%
- HSL 90% → OKLCH 95%
- HSL 100% → OKLCH 100%

**Chroma Estimation** (from HSL saturation):
- HSL S 0% → C 0
- HSL S 50% → C 0.10-0.15
- HSL S 80% → C 0.18-0.22
- HSL S 90% → C 0.22-0.28
- HSL S 100% → C 0.25-0.37 (varies by hue)

## Color-Mix for Hover States

### Decision: Replace `-focus` tokens with `color-mix()`

**Rationale**: DaisyUI 5 removed separate focus color tokens. Dynamic mixing is more maintainable.

**Current Pattern**:
```css
--color-primary: 30 90% 55%;
--color-primary-focus: 30 90% 45%;  /* Separate token */

.btn-primary:hover {
  background-color: hsl(var(--color-primary-focus));
}
```

**New Pattern**:
```css
--color-primary: oklch(70% 0.18 50);
/* No separate focus token needed */

.btn-primary:hover {
  background-color: color-mix(in oklch, var(--color-primary), black 10%);
}
```

**Benefits**:
- Fewer tokens to maintain (reduce from 65+ to ~55)
- Consistent darkening across all colors
- No saturation shift during hover (common HSL problem)

### Color-Mix Patterns

```css
/* Darken by 10% (hover state) */
color-mix(in oklch, var(--color-primary), black 10%)

/* Darken by 20% (pressed state) */
color-mix(in oklch, var(--color-primary), black 20%)

/* Lighten by 30% (disabled/muted) */
color-mix(in oklch, var(--color-primary), white 30%)

/* Create semi-transparent overlay */
color-mix(in oklch, var(--color-primary) 50%, transparent)
```

## Browser Support

### Decision: Target 92%+ browser support, provide @supports fallback

**Supported Browsers**:
- Chrome 111+ (March 2023)
- Safari 15.4+ (March 2022)
- Firefox 113+ (May 2023)
- Edge 111+ (March 2023)

**Global Support**: ~92% as of December 2024

**Fallback Strategy**:
```css
/* Fallback for older browsers */
.btn-primary {
  background-color: hsl(30, 90%, 55%);  /* Fallback */
}

@supports (color: oklch(0% 0 0)) {
  .btn-primary {
    background-color: var(--color-primary);
  }
}
```

**Decision**: Implement fallbacks only for critical components (buttons, text). Low-usage browsers can receive degraded but functional experience.

## Sunshine Theme Conversion (Sample)

### Primary Colors

| Token | Current HSL | New OKLCH |
|-------|-------------|-----------|
| --color-primary | 30 90% 55% | oklch(72% 0.18 55) |
| --color-primary-content | 0 0% 100% | oklch(100% 0 0) |
| --color-primary-container | 30 80% 92% | oklch(95% 0.05 55) |
| --color-on-primary-container | 30 90% 20% | oklch(35% 0.12 55) |

### Secondary Colors

| Token | Current HSL | New OKLCH |
|-------|-------------|-----------|
| --color-secondary | 340 80% 60% | oklch(68% 0.20 5) |
| --color-secondary-content | 0 0% 100% | oklch(100% 0 0) |
| --color-secondary-container | 340 70% 92% | oklch(95% 0.05 5) |
| --color-on-secondary-container | 340 80% 25% | oklch(40% 0.15 5) |

### Tertiary Colors

| Token | Current HSL | New OKLCH |
|-------|-------------|-----------|
| --color-tertiary | 270 70% 60% | oklch(65% 0.18 300) |
| --color-tertiary-content | 0 0% 100% | oklch(100% 0 0) |
| --color-tertiary-container | 270 60% 92% | oklch(95% 0.04 300) |
| --color-on-tertiary-container | 270 70% 25% | oklch(38% 0.12 300) |

## Tokens to Remove (Replaced by color-mix)

The following `-focus` tokens can be removed:
- `--color-primary-focus` → use `color-mix(in oklch, var(--color-primary), black 10%)`
- `--color-secondary-focus` → use `color-mix(in oklch, var(--color-secondary), black 10%)`
- `--color-tertiary-focus` → use `color-mix(in oklch, var(--color-tertiary), black 10%)`

This reduces token count from ~65 to ~62 while improving consistency.

## Accessibility Validation

### Contrast Ratio Validation

Must verify WCAG AA compliance (4.5:1) after conversion:

| Combination | Target Ratio |
|-------------|--------------|
| primary-content on primary | ≥ 4.5:1 |
| secondary-content on secondary | ≥ 4.5:1 |
| tertiary-content on tertiary | ≥ 4.5:1 |
| on-surface on surface | ≥ 4.5:1 |
| on-surface-variant on surface | ≥ 4.5:1 |
| Semantic colors (info, success, warning, error) | ≥ 4.5:1 |

**Validation Method**: Use browser DevTools color picker or online contrast checker after conversion.

## Sources

- [MDN: OKLCH Colors](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch)
- [MDN: color-mix()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix)
- [DaisyUI 5 Colors Documentation](https://daisyui.com/docs/colors/)
- [Evil Martians: OKLCH in CSS](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl)
- [Can I Use: OKLCH](https://caniuse.com/mdn-css_types_color_oklch)
- [OKLCH Color Picker](https://oklch.com/)
