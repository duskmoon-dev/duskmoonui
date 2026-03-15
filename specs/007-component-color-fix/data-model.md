# Data Model: Form Component Color Token Variants & Bug Fixes

This feature is purely CSS + MDX documentation — no runtime data models or database entities.
The "entities" below represent the structural contracts between CSS classes and design tokens.

---

## Component Color Contract

Every in-scope component MUST satisfy this contract:

```
ComponentContract {
  baseClass: string              // e.g., ".input"
  defaultColor: "--color-on-surface"  // foreground always on-surface
  pattern: "currentColor" | "bg+content" | "color-only"

  variants: [
    "primary", "secondary", "tertiary",
    "info", "success", "warning", "error"
  ]

  ghost?: boolean                // required when pattern = "currentColor"
  focusRing: "color-mix-oklch" | "outline"  // all interactive → color-mix-oklch
}
```

---

## Pattern Assignments

### currentColor pattern (form/interactive components)
Base: `color: var(--color-on-surface); border: 1px solid currentColor`
Variant: `color: var(--color-{role})` (border inherits via currentColor)
Ghost: `border-color: transparent`
Focus: `box-shadow: 0 0 0 3px color-mix(in oklch, currentColor 20%, transparent)`

Applies to: autocomplete, cascader, datepicker, input, multi-select, otp-input,
pin-input, select, textarea, time-input, tree-select

### bg+content pattern (display/selection components)
Base: `color: var(--color-on-surface)`
Variant: `background: var(--color-{role}); color: var(--color-{role}-content)`
Focus: `box-shadow: 0 0 0 3px color-mix(in oklch, currentColor 20%, transparent)`

Applies to: checkbox, radio, segment-control, slider, switch, toggle, form, form-group

### color-only pattern (icon-only components)
Base: `color: var(--color-on-surface)`
Variant: `color: var(--color-{role})`
No border, no background.

Applies to: rating (justified exception — icon fill only, no text or border)

---

## Token Reference

Status tokens (defined in all 5 themes):

| Token                    | Purpose                        |
|--------------------------|--------------------------------|
| `--color-info`           | Info background or icon color  |
| `--color-info-content`   | Text on info background        |
| `--color-success`        | Success background or icon     |
| `--color-success-content`| Text on success background     |
| `--color-warning`        | Warning background or icon     |
| `--color-warning-content`| Text on warning background     |
| `--color-error`          | Error background or icon       |
| `--color-error-content`  | Text on error background       |

Brand tokens (defined in all 5 themes):

| Token                       | Purpose                   |
|-----------------------------|---------------------------|
| `--color-primary`           | Primary brand color       |
| `--color-primary-content`   | Text on primary           |
| `--color-secondary`         | Secondary brand color     |
| `--color-secondary-content` | Text on secondary         |
| `--color-tertiary`          | Tertiary brand color      |
| `--color-tertiary-content`  | Text on tertiary          |
| `--color-on-surface`        | Default foreground        |

---

## Docs Page Structure (per component)

Each MDX page for a form component MUST include ComponentShowcase blocks in this order:

1. Default state (no modifier) — demonstrates `on-surface` default
2. Color variants section: primary → secondary → tertiary → info → success → warning → error
3. Ghost variant (if component has one)
4. States section: focus / disabled / invalid (where applicable)
