# Quality Checklist: Tabbed Code Block with Preview

**Feature Branch**: `001-docs-code-preview-tabs`
**Generated**: 2025-11-26

## Pre-Implementation Checklist

- [ ] Spec reviewed and approved
- [ ] Implementation plan created (`/speckit.plan`)
- [ ] Tasks generated (`/speckit.tasks`)

## Implementation Checklist

### Core Functionality

- [ ] ComponentShowcase component updated with tabbed interface
- [ ] "Preview" tab displays rendered HTML content
- [ ] "Code" tab displays syntax-highlighted code
- [ ] Tab switching works without page reload
- [ ] Default tab is "Preview" on page load
- [ ] Copy button copies code to clipboard
- [ ] "Copied!" feedback appears after successful copy

### Accessibility (WCAG 2.1 AA)

- [ ] Tabs are keyboard navigable (Tab, Arrow keys)
- [ ] Tab activation works with Enter/Space keys
- [ ] ARIA attributes present (`role="tablist"`, `role="tab"`, `role="tabpanel"`)
- [ ] `aria-selected` indicates active tab
- [ ] `aria-controls` links tabs to panels
- [ ] Color contrast meets 4.5:1 ratio minimum
- [ ] Focus indicators visible on tabs

### Responsive Design

- [ ] Tabs visible on mobile (< 640px)
- [ ] Tabs tappable with adequate touch targets (44x44px minimum)
- [ ] Code scrolls horizontally on narrow screens
- [ ] Layout doesn't break at common breakpoints

### Browser Compatibility

- [ ] Works in Chrome (latest)
- [ ] Works in Firefox (latest)
- [ ] Works in Safari (latest)
- [ ] Works in Edge (latest)
- [ ] Clipboard API fallback for older browsers

### Performance

- [ ] Tab switching < 100ms perceived latency
- [ ] No increase in LCP > 200ms
- [ ] Bundle size increase minimal (< 2KB gzipped)
- [ ] No layout shift during tab changes

### Code Quality

- [ ] No TypeScript errors
- [ ] Code follows existing project conventions
- [ ] No unused imports or variables
- [ ] Component properly typed (Props interface)

### Backward Compatibility

- [ ] Existing MDX files work without changes
- [ ] ComponentShowcase API unchanged
- [ ] No breaking changes to existing functionality

## Testing Checklist

### Unit Tests

- [ ] Tab state management works correctly
- [ ] Copy functionality copies correct content
- [ ] Default state is "Preview" tab active

### Integration Tests

- [ ] Component renders in Astro pages
- [ ] Multiple instances work independently
- [ ] Tab preference persistence works (if implemented)

### Visual Tests

- [ ] Active tab styling matches design
- [ ] Inactive tab styling matches design
- [ ] Preview area displays components correctly
- [ ] Code area displays with proper formatting
- [ ] Responsive layouts look correct

### Accessibility Tests

- [ ] Passes axe-core audit (no critical issues)
- [ ] Screen reader announces tab changes
- [ ] Keyboard navigation works end-to-end

## Documentation Checklist

- [ ] All 50+ component doc pages render correctly
- [ ] Button page (reference) displays tabs properly
- [ ] Card page displays tabs properly
- [ ] Input page displays tabs properly
- [ ] Other component pages spot-checked

## Final Verification

- [ ] Build succeeds (`bun run build`)
- [ ] All tests pass
- [ ] No console errors in browser
- [ ] Manual QA completed on key pages
- [ ] PR created with passing CI
