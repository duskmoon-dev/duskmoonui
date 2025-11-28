# Research: Tabbed Code Block with Preview

**Feature**: 001-docs-code-preview-tabs
**Date**: 2025-11-26

## Research Task 1: Astro Client-Side Interactivity

### Question
How to implement tab switching in Astro without defaulting to React?

### Decision
Use Astro's native `<script>` tags with vanilla JavaScript for tab switching. No React required.

### Rationale
- Astro components support `<script>` tags that run on the client
- Scripts are automatically bundled and deduplicated by Astro
- No additional dependencies or hydration overhead
- Simpler than using React islands for such a simple interaction
- Better performance since no framework JS needs to be shipped

### Implementation Pattern
```astro
---
// ComponentShowcase.astro
const { code } = Astro.props;
---

<div class="showcase" data-showcase>
  <div class="tabs" role="tablist">
    <button role="tab" data-tab="preview" aria-selected="true">Preview</button>
    <button role="tab" data-tab="code" aria-selected="false">Code</button>
  </div>
  <div role="tabpanel" data-panel="preview">
    <Fragment set:html={code} />
  </div>
  <div role="tabpanel" data-panel="code" hidden>
    <CodeBlock code={code} />
  </div>
</div>

<script>
  // Astro will dedupe this script across all component instances
  document.querySelectorAll('[data-showcase]').forEach(showcase => {
    const tabs = showcase.querySelectorAll('[data-tab]');
    const panels = showcase.querySelectorAll('[data-panel]');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        // Update tab states
        tabs.forEach(t => t.setAttribute('aria-selected', t === tab ? 'true' : 'false'));
        // Update panel visibility
        panels.forEach(p => p.hidden = p.dataset.panel !== target);
      });
    });
  });
</script>
```

### Alternatives Considered
1. **React Island** - Rejected because it adds hydration overhead for simple click handlers
2. **Astro View Transitions** - Rejected because this is not page navigation
3. **CSS-only tabs with :target** - Rejected because it modifies URL hash and breaks back button

---

## Research Task 2: ARIA Tabs Pattern

### Question
What is the proper accessibility implementation for tabbed interfaces?

### Decision
Implement WAI-ARIA Tabs pattern with keyboard navigation support.

### Rationale
- Standard pattern that screen readers understand
- Provides consistent UX for assistive technology users
- Required by WCAG 2.1 AA compliance

### Implementation Requirements

1. **Tab List Container**: `role="tablist"`
2. **Individual Tabs**: `role="tab"` with:
   - `aria-selected="true|false"`
   - `aria-controls="panel-id"` pointing to panel
   - `tabindex="0"` for active, `tabindex="-1"` for inactive
3. **Tab Panels**: `role="tabpanel"` with:
   - `id` matching `aria-controls`
   - `aria-labelledby="tab-id"` pointing to controlling tab
   - `hidden` attribute for inactive panels

4. **Keyboard Support**:
   - `ArrowLeft`/`ArrowRight` to navigate between tabs
   - `Enter`/`Space` to activate tab (automatic for buttons)
   - `Home`/`End` to go to first/last tab

### Code Example
```html
<div role="tablist" aria-label="Component example">
  <button
    role="tab"
    id="preview-tab"
    aria-selected="true"
    aria-controls="preview-panel"
    tabindex="0">
    Preview
  </button>
  <button
    role="tab"
    id="code-tab"
    aria-selected="false"
    aria-controls="code-panel"
    tabindex="-1">
    Code
  </button>
</div>

<div
  role="tabpanel"
  id="preview-panel"
  aria-labelledby="preview-tab">
  <!-- Preview content -->
</div>

<div
  role="tabpanel"
  id="code-panel"
  aria-labelledby="code-tab"
  hidden>
  <!-- Code content -->
</div>
```

### References
- [WAI-ARIA Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
- [MDN: ARIA Tab Role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role)

---

## Research Task 3: CSS :has() Selector for Progressive Enhancement

### Question
Can CSS :has() be used for progressive enhancement when JavaScript is disabled?

### Decision
Use CSS :has() as a progressive enhancement layer, but not rely on it for core functionality.

### Rationale
- CSS :has() has 92%+ browser support as of 2024
- Can show both panels stacked when JS is disabled
- Clean enhancement that doesn't break functionality

### Implementation Pattern
```css
/* Default: show both panels stacked (no-JS fallback) */
[data-showcase] [data-panel] {
  display: block;
}

/* When JS adds data-enhanced, hide non-active panels */
[data-showcase][data-enhanced] [data-panel][hidden] {
  display: none;
}

/* Alternative: CSS-only tab state with :has() */
/* Note: This is progressive enhancement, not primary mechanism */
[data-showcase]:has([data-tab="code"][aria-selected="true"]) [data-panel="preview"] {
  display: none;
}
[data-showcase]:has([data-tab="preview"][aria-selected="true"]) [data-panel="code"] {
  display: none;
}
```

### Browser Support
- Chrome 105+ (Sep 2022)
- Firefox 121+ (Dec 2023)
- Safari 15.4+ (Mar 2022)
- Edge 105+ (Sep 2022)

For our target browsers, this is acceptable, but we use `hidden` attribute as primary mechanism for reliability.

---

## Research Task 4: Tab Preference Persistence

### Question
How to persist tab selection preference across multiple showcases on a page?

### Decision
Use a simple module-level variable in the script. No localStorage needed.

### Rationale
- User preference only needs to persist within page session
- Spec explicitly states "resets on page refresh"
- No need for localStorage complexity

### Implementation
```javascript
// Module-level preference (resets on page refresh)
let preferredTab = 'preview';

function initShowcase(showcase) {
  // Apply current preference
  const targetTab = showcase.querySelector(`[data-tab="${preferredTab}"]`);
  if (targetTab) activateTab(targetTab);

  // Update preference on click
  showcase.addEventListener('click', (e) => {
    const tab = e.target.closest('[data-tab]');
    if (tab) {
      preferredTab = tab.dataset.tab;
    }
  });
}
```

---

## Summary

All research tasks resolved. Key decisions:

1. **Interactivity**: Vanilla JavaScript in Astro `<script>` tags
2. **Accessibility**: Full WAI-ARIA tabs pattern with keyboard support
3. **Progressive Enhancement**: `hidden` attribute + CSS fallback
4. **Preference Persistence**: Module-level variable, page-session only

No "NEEDS CLARIFICATION" items remaining.
