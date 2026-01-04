# Research: Markdown Body Component

**Feature Branch**: `001-markdown-body`
**Date**: 2026-01-04

## Research Summary

This document consolidates research findings for implementing the markdown-body CSS component, inspired by github-markdown-css but using DuskMoonUI's color system.

---

## 1. GitHub Markdown CSS Patterns

**Decision**: Adopt github-markdown-css structure and element coverage, adapt to DuskMoonUI conventions

**Rationale**: github-markdown-css is the industry standard for markdown rendering. It's battle-tested, comprehensive, and familiar to developers.

**Key Patterns Extracted**:

### Container Structure
- Single wrapper class: `.markdown-body`
- All element styles scoped within container
- Recommended max-width: 980px with auto margins

### Typography Scale
```
h1: 2em, font-weight 600, bottom border
h2: 1.5em, font-weight 600, bottom border
h3: 1.25em, font-weight 600
h4: 1em, font-weight 600
h5: 0.875em, font-weight 600
h6: 0.85em, font-weight 600, muted color
Base: 16px, line-height 1.5
```

### Spacing System (converted to logical properties)
```
Block margin (paragraphs, lists): margin-block-end: 1rem
Heading margin: margin-block-start: 1.5rem, margin-block-end: 1rem
List padding: padding-inline-start: 2em
Blockquote padding: padding-inline-start: 1em
Code block padding: 1rem all sides
```

### Element-Specific Patterns
- **Code blocks**: 85% font-size, 1.45 line-height, horizontal scroll
- **Tables**: collapse borders, zebra striping on nth-child(2n)
- **Blockquotes**: 0.25em left border, muted text color
- **Task lists**: negative margin for checkbox alignment

**Alternatives Considered**:
- Tailwind Typography (@tailwindcss/typography): Rejected - different styling philosophy, doesn't match GitHub aesthetic
- Custom from scratch: Rejected - reinventing proven patterns unnecessarily

---

## 2. DuskMoonUI Color Token Mapping

**Decision**: Map github-markdown-css color concepts to DuskMoonUI tokens

**Rationale**: Ensures automatic theme switching and design system consistency.

| GitHub Token | DuskMoonUI Token | Usage |
|--------------|------------------|-------|
| `--fgColor-default` | `--color-on-surface` | Primary text |
| `--fgColor-muted` | `--color-on-surface-variant` | Secondary text, h6, blockquote |
| `--fgColor-accent` | `--color-primary` | Links |
| `--bgColor-default` | `--color-surface` | Container background |
| `--bgColor-muted` | `--color-surface-container` | Code blocks, table headers |
| `--bgColor-neutral-muted` | `--color-surface-container-high` | Inline code |
| `--borderColor-default` | `--color-outline-variant` | Table borders, hr |
| `--borderColor-muted` | `--color-outline-variant` (with opacity) | Heading borders |

**Alternatives Considered**:
- Define new markdown-specific tokens: Rejected - adds complexity, existing tokens sufficient
- Use hardcoded colors: Rejected - breaks theme switching

---

## 3. Logical Properties Conversion

**Decision**: Convert all physical CSS properties to logical equivalents per Constitution II

**Rationale**: Ensures RTL language support without additional CSS overrides.

| Physical Property | Logical Property |
|-------------------|------------------|
| `margin-top` | `margin-block-start` |
| `margin-bottom` | `margin-block-end` |
| `margin-left` | `margin-inline-start` |
| `margin-right` | `margin-inline-end` |
| `padding-top` | `padding-block-start` |
| `padding-bottom` | `padding-block-end` |
| `padding-left` | `padding-inline-start` |
| `padding-right` | `padding-inline-end` |
| `border-left` | `border-inline-start` |
| `text-align: left` | `text-align: start` |

**Note**: `border-bottom` on headings remains physical (visual convention, not flow-dependent).

---

## 4. Font Stack

**Decision**: Use system font stack matching DuskMoonUI and github-markdown-css

**Rationale**: Consistent with existing components, fast loading, native feel.

**Text Font Stack**:
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
```

**Monospace Font Stack**:
```css
font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
```

---

## 5. Accessibility Considerations

**Decision**: Inherit DuskMoonUI's accessible color tokens, add focus styles

**Rationale**: DuskMoonUI tokens already meet WCAG AA. Focus on keyboard navigation and semantic HTML.

**Focus Styles**:
```css
a:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

**Color Contrast** (inherited from DuskMoonUI):
- `--color-on-surface` on `--color-surface`: ≥4.5:1
- `--color-primary` on `--color-surface`: ≥4.5:1
- `--color-on-surface-variant` on `--color-surface`: ≥4.5:1

---

## 6. Reduced Motion Support

**Decision**: Disable transitions when prefers-reduced-motion is active

**Rationale**: Accessibility requirement for users sensitive to motion.

```css
@media (prefers-reduced-motion: reduce) {
  .markdown-body * {
    transition: none;
  }
}
```

---

## 7. Elements to Style

**Decision**: Style all standard markdown-generated HTML elements

**Complete Element List**:

**Typography**: h1, h2, h3, h4, h5, h6, p, strong, em, del, small, sub, sup

**Links**: a, a:hover, a:focus-visible, a:visited (optional)

**Lists**: ul, ol, li, dl, dt, dd

**Code**: code (inline), pre, pre > code, kbd, samp

**Tables**: table, thead, tbody, tr, th, td

**Blockquotes**: blockquote

**Media**: img, figure, figcaption

**Separators**: hr

**Task Lists**: .task-list-item, input[type="checkbox"]

**Other**: abbr, mark, details, summary

---

## 8. CSS Size Estimation

**Decision**: Target <10KB uncompressed (within 15KB spec limit)

**Rationale**: Similar components (tooltip: 7KB, snackbar: 7KB) suggest 8-10KB is achievable.

**Breakdown Estimate**:
- Base container + typography: ~2KB
- Headings (h1-h6): ~1KB
- Lists (ul, ol, dl): ~1KB
- Code (inline, blocks, kbd): ~1.5KB
- Tables: ~1KB
- Blockquotes: ~0.5KB
- Images/figures: ~0.5KB
- Task lists: ~0.5KB
- Miscellaneous (hr, abbr, mark, etc.): ~1KB
- **Total**: ~9KB

---

## Research Complete

All NEEDS CLARIFICATION items resolved. Ready for Phase 1 design.
