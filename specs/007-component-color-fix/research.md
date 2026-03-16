# Research: Form Component Color Token Variants & Bug Fixes

## Current State Audit

### 1. Theme Token Coverage

**Decision**: All 5 theme files (sunshine, moonlight, ocean, forest, sunset) already define all 8
required status tokens. No theme file changes needed for FR-011.

| Theme    | info | info-content | success | success-content | warning | warning-content | error | error-content |
|----------|------|--------------|---------|-----------------|---------|-----------------|-------|---------------|
| sunshine | ✅   | ✅           | ✅      | ✅              | ✅      | ✅              | ✅    | ✅            |
| moonlight| ✅   | ✅           | ✅      | ✅              | ✅      | ✅              | ✅    | ✅            |
| ocean    | ✅   | ✅           | ✅      | ✅              | ✅      | ✅              | ✅    | ✅            |
| forest   | ✅   | ✅           | ✅      | ✅              | ✅      | ✅              | ✅    | ✅            |
| sunset   | ✅   | ✅           | ✅      | ✅              | ✅      | ✅              | ✅    | ✅            |

**Rationale**: FR-011 is already satisfied. No CSS changes needed in `src/themes/`.

---

### 2. Component CSS Audit

| Component      | on-surface base | Variants (of 7) | Ghost | Pattern         | Focus ring          |
|----------------|-----------------|-----------------|-------|-----------------|---------------------|
| autocomplete   | ✅              | 7/7             | ✅    | currentColor    | color-mix (oklch) ✅ |
| cascader       | ✅              | 7/7             | ✅    | currentColor    | color-mix (oklch) ✅ |
| checkbox       | ❌              | 7/7             | ❌    | bg+content      | outline (2px solid) |
| datepicker     | ✅              | 7/7             | ✅    | currentColor    | color-mix (oklch) ✅ |
| form           | ❌              | 4/7 ⚠️         | ❌    | bg+content      | outline (2px solid) |
| input          | ✅              | 7/7             | ✅    | currentColor    | color-mix (oklch) ✅ |
| multi-select   | ✅              | 7/7             | ✅    | currentColor    | color-mix (oklch) ✅ |
| otp-input      | ✅              | 7/7             | ✅    | currentColor    | color-mix (oklch) ✅ |
| pin-input      | ✅              | 7/7             | ✅    | currentColor    | color-mix (oklch) ✅ |
| radio          | ❌              | 7/7             | ❌    | bg+content      | outline (2px solid) |
| rating         | ❌              | 7/7             | ❌    | color-only ⚠️  | outline (2px solid) |
| segment-control| ❌              | 7/7             | ✅    | bg+content      | outline (2px solid) |
| select         | ✅              | 7/7             | ✅    | currentColor    | color-mix (oklch) ✅ |
| slider         | ❌              | 6/7 ⚠️         | ❌    | color-only ⚠️  | outline/box-shadow  |
| switch         | ❌              | 7/7             | ❌    | bg+content      | outline (2px solid) |
| textarea       | ✅              | 7/7             | ✅    | currentColor    | color-mix (oklch) ✅ |
| time-input     | ✅              | 7/7             | ✅    | currentColor    | color-mix (oklch) ✅ |
| toggle         | ❌              | 7/7             | ✅    | bg+content      | outline (2px solid) |
| tree-select    | ✅              | 7/7             | ✅    | currentColor    | color-mix (oklch) ✅ |
| form-group     | ❌              | 0/7             | ❌    | N/A (layout)    | N/A                 |

**CSS issues requiring fixes:**

- **form.css** — Missing 3 variants: `tertiary`, `info`, `warning` (⚠️)
- **slider.css** — Missing `secondary` variant for base; uses color-only pattern — needs bg+content
  for the track/thumb (display component)
- **Display components without `on-surface` base** (checkbox, radio, rating, segment-control,
  switch, toggle, form, form-group): These use bg+content for colored variants. Their unmodified
  base should still set `color: var(--color-on-surface)` for label text legibility.
- **rating.css** — Uses color-only pattern (sets icon color). This is acceptable for an icon-only
  component but should still have `on-surface` as the default color.
- **Focus ring on display components** (checkbox, radio, segment-control, switch, toggle):
  Uses `outline: 2px solid` instead of `color-mix` box-shadow. Per Principle VIII FR-006 this
  applies to **interactive** components. These are interactive, so they should use the
  `color-mix(in oklch, currentColor 20%, transparent)` focus ring pattern.

---

### 3. Docs MDX Pages Audit

| Component      | MDX exists | Color variants | Ghost demo |
|----------------|------------|---------------|------------|
| autocomplete   | ✅         | ❌ none       | ❌         |
| cascader       | ✅         | ❌ none       | ❌         |
| checkbox       | ✅         | ✅ all 7      | ❌         |
| datepicker     | ✅         | ⚠️ partial (3/7) | ❌      |
| form           | ✅         | ❌ none       | ❌         |
| input          | ✅         | ✅ all 7 + ghost | ✅      |
| multi-select   | ✅         | ⚠️ partial    | ❌         |
| otp-input      | ✅         | ❌ none       | ❌         |
| pin-input      | ✅         | ❌ none       | ❌         |
| radio          | ✅         | ✅ all 7      | ❌         |
| rating         | ✅         | ⚠️ partial (4/7) | ❌      |
| segment-control| ✅         | ⚠️ partial (3/7) | ❌      |
| select         | ✅         | ⚠️ partial (3/7) | ❌      |
| slider         | ✅         | ⚠️ partial (3/7) | ❌      |
| switch         | ✅         | ✅ all 7      | ❌         |
| textarea       | ✅         | ⚠️ partial (3/7) | ❌      |
| time-input     | ✅         | ❌ none       | ❌         |
| toggle         | ✅         | ⚠️ partial    | ❌         |
| tree-select    | ✅         | ❌ none       | ❌         |

**Note**: `form-group` — no dedicated MDX page; covered under Form page.

**MDX gaps requiring updates:**
- 7 pages with zero color variant demos: autocomplete, cascader, form, otp-input, pin-input,
  time-input, tree-select
- 9 pages with only partial variants (missing info/success/warning/error or ghost): datepicker,
  multi-select, rating, segment-control, select, slider, textarea, toggle, checkbox (missing ghost),
  radio (missing ghost)
- Ghost demos: need to be added to all 11 form/interactive components that have a ghost CSS class

---

### 4. Pattern Decisions

**Decision: Display components should still set `color: var(--color-on-surface)` on the base class**

Rationale: Even though colored variants use bg+content pairs, the unmodified component sits on a
surface background. Without `on-surface` as the default, the label/icon inherits from the cascade
(potentially transparent or wrong color on non-default themes).

**Decision: Rating uses color-only pattern (acceptable exception)**

Rationale: Rating is icon-only — there is no text content or border. Setting a background color
would break the icon appearance. The `color-only` approach (sets icon fill color) is the correct
pattern for icon-only display components. Document this as a justified pattern exception.

**Decision: focus ring on display interactive components (checkbox, radio, switch, toggle)**

Rationale: Principle VIII FR-006 specifies `color-mix(in oklch, currentColor 20%, transparent)`
for the focus ring. These are interactive (keyboard-focusable) components and MUST comply.
The current `outline: 2px solid` approach must be replaced.
