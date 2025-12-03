# Research: Documentation Component Showcase Enhancement

**Date**: 2025-12-01
**Feature**: 001-docs-component-showcase

## Overview

This research documents the technical decisions and best practices for converting static code blocks to interactive ComponentShowcase components across all documentation pages.

---

## Research Item 1: Centering Issue Analysis

### Context
The `/duskmoonui/components/` page reportedly has content that is not centered.

### Investigation
Examined `packages/docs/src/pages/components/index.astro`:
- The page uses `<div class="max-w-7xl mx-auto px-4 py-8">` which should center content
- The page uses `BaseLayout` which wraps content in a flex column

Examined `packages/docs/src/layouts/BaseLayout.astro`:
- No explicit container or centering styles applied to the slot

### Decision
The centering issue is likely a container inheritance problem from `BaseLayout`. The fix should ensure the container class is properly applied.

**Rationale**: The `mx-auto` class requires a defined width constraint (`max-w-*`) to center content. If the parent doesn't allow block-level centering, `mx-auto` has no effect.

**Alternatives considered**:
1. Add centering to BaseLayout globally - Rejected: Could affect other pages unintentionally
2. Use `DocsLayout` for components page - Rejected: DocsLayout has different header/nav structure
3. Add container wrapper in index.astro - Selected: Targeted fix without side effects

---

## Research Item 2: ComponentShowcase Pattern Analysis

### Context
The Button component MDX file uses `ComponentShowcase` for all examples. Other components use static markdown code blocks.

### Button Implementation Pattern (Reference)
```mdx
import ComponentShowcase from '../../../../components/showcase/ComponentShowcase.astro';

<ComponentShowcase
  title="Basic Button"
  code={`<button class="btn btn-primary">Primary Button</button>`}
/>
```

### Decision
All HTML/CSS examples should be converted to `ComponentShowcase` format. Framework examples (React, Vue) should remain as static code blocks.

**Rationale**:
- HTML examples benefit from live preview (shows actual styled output)
- React/Vue code cannot be rendered as live HTML
- Consistent pattern improves maintainability

**Alternatives considered**:
1. Create separate React/Vue preview components - Rejected: Adds complexity, would require runtime React/Vue
2. Use iframe sandboxes for all code - Rejected: Performance overhead, styling isolation issues
3. Keep all as static code - Rejected: Loses the interactive preview benefit

---

## Research Item 3: Migration Scope Analysis

### Context
Need to determine which code blocks to convert and which to preserve.

### Decision
Convert code blocks that meet ALL criteria:
- Language is `html` (not `tsx`, `vue`, `jsx`)
- Code demonstrates UI component usage (not configuration or framework integration)
- Code can render independently (doesn't require JavaScript runtime)

Preserve code blocks that:
- Are React/Vue component examples
- Show configuration snippets (package.json, tailwind.config, etc.)
- Are CLI commands or shell scripts

**Rationale**: Only HTML can be rendered as live preview. Framework code provides copy-paste reference value without preview.

**Alternatives considered**:
1. Convert everything including framework code - Rejected: Cannot render React/Vue as live HTML
2. Remove framework examples entirely - Rejected: Users need framework-specific guidance
3. Add note explaining why no preview for framework code - Selected: Clear user expectation

---

## Research Item 4: ComponentShowcase Props Analysis

### Context
Understanding the available props for ComponentShowcase to ensure correct usage.

### ComponentShowcase Props
```typescript
interface Props {
  title: string;           // Required - example heading
  description?: string;    // Optional - subtitle text
  code: string;           // Required - HTML code to render/display
  showCode?: boolean;     // Default: true - show code tab
  defaultTab?: 'preview' | 'code';  // Default: 'preview'
}
```

### Decision
Standard usage pattern:
```mdx
<ComponentShowcase
  title="Example Title"
  code={`<div class="component-class">Content</div>`}
/>
```

For complex multi-line examples, use template literal with proper escaping.

**Rationale**: The component handles both preview rendering and code syntax highlighting automatically.

**Alternatives considered**: None - using existing component as designed.

---

## Research Item 5: Code Block Escaping Strategy

### Context
Some code examples contain backticks, quotes, or special characters that need escaping in MDX template literals.

### Decision
Use the following escaping rules:
1. Wrap code in template literals: `` code={`...`} ``
2. For code containing backticks: Use HTML entity `&#96;` or escape `\``
3. For code containing `${`: Escape as `\${`
4. Preserve newlines and indentation within template literals

### Example
```mdx
<ComponentShowcase
  title="Multi-line Example"
  code={`<div class="card">
  <div class="card-body">
    <p>Content with "quotes"</p>
  </div>
</div>`}
/>
```

**Rationale**: Template literals preserve formatting and are the standard pattern used in Button.mdx.

---

## Research Item 6: Testing Strategy

### Context
Need to verify all conversions work correctly.

### Decision
Testing approach:
1. **Build verification**: `bun run build:docs` must succeed
2. **Visual verification**: Check 5 representative components manually
3. **Existing e2e tests**: Run `bun run test` in packages/docs
4. **Accessibility**: Verify tab navigation works with keyboard

**Rationale**: The existing Playwright tests cover accessibility. Manual spot-checking ensures visual correctness.

**Alternatives considered**:
1. Visual regression tests for all 42 components - Rejected: High setup cost for documentation change
2. Snapshot tests for rendered HTML - Rejected: Fragile, breaks on any style change
3. Build + spot check - Selected: Practical balance of coverage and effort

---

## Summary

| Item | Decision | Impact |
|------|----------|--------|
| Centering Fix | Add proper container in index.astro | Low risk, targeted |
| Conversion Scope | HTML examples only, preserve framework code | Clear boundary |
| Component Pattern | Follow Button.mdx template literal format | Consistent |
| Escaping | Use MDX template literals with standard escaping | Maintainable |
| Testing | Build verification + spot check + existing e2e | Practical |

All NEEDS CLARIFICATION items resolved. Ready for Phase 1 design artifacts.
