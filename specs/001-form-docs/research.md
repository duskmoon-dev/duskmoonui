# Research: Form Documentation Page

**Feature**: 001-form-docs
**Date**: 2026-01-08

## Research Questions

### 1. Documentation Page Structure Pattern

**Question**: What is the standard MDX page structure for component documentation?

**Decision**: Follow existing component documentation pattern with frontmatter, ComponentShowcase imports, and hierarchical sections.

**Rationale**: Consistency with existing 50+ component documentation pages ensures familiar navigation and reduces cognitive load for developers.

**Evidence**: Reviewed `input.mdx`, `form-group.mdx`, and other component docs. Standard pattern:
```mdx
---
title: ComponentName
description: Brief description
category: components
order: N
published: true
tags: ['tag1', 'tag2']
---
import ComponentShowcase from '...';

# ComponentName

Intro paragraph.

## Section 1
<ComponentShowcase title="..." code={`...`} />
```

### 2. Form Section Organization

**Question**: How should the 17 components be organized into logical form sections?

**Decision**: Use "User Profile / Account Settings" theme with 8 sections:
1. Personal Information - Input (name), Autocomplete (country), Date Picker (birthday)
2. Contact Details - Input (email, phone), Textarea (bio)
3. Preferences - Select (language), Multi-Select (interests), Tree-Select (department), Segment Control (theme)
4. Settings - Checkbox (notifications), Radio (contact preference), Switch (features), Slider (volume)
5. Feedback - Rating (experience)
6. Scheduling - Time Input (reminder time)
7. Security - OTP Input (2FA code), PIN Input (security PIN)
8. Attachments - File Upload (profile photo)

**Rationale**: This theme naturally accommodates all component types while feeling realistic and familiar to developers.

**Alternatives Considered**:
- Job Application Form: Good coverage but OTP/PIN feel forced
- E-commerce Checkout: Missing rating, tree-select naturally
- Survey Form: Missing date picker, time input context

### 3. ComponentShowcase Usage

**Question**: Should the full form be one giant showcase or broken into sections?

**Decision**: Present both:
1. Individual section showcases (for learning each grouping)
2. Full form showcase at the end (for copy-paste convenience)

**Rationale**: Matches documentation pattern of other complex components (e.g., stepper, table). Individual sections help learning; full form helps adoption.

### 4. Existing Component CSS Classes

**Question**: What CSS classes are available for each Data Entry component?

**Research Findings**:

| Component | Primary Classes |
|-----------|----------------|
| Input | `.input`, `.input-outlined`, `.input-sm/md/lg`, `.input-error/success` |
| Textarea | `.textarea`, `.textarea-outlined`, `.textarea-sm/md/lg` |
| Select | `.select`, `.select-outlined`, `.select-sm/md/lg` |
| Multi-Select | `.multi-select`, `.multi-select-dropdown`, `.multi-select-tag` |
| Tree-Select | `.tree-select`, `.tree-select-dropdown`, `.tree-select-node` |
| Autocomplete | `.autocomplete`, `.autocomplete-dropdown`, `.autocomplete-item` |
| Checkbox | `.checkbox`, `.checkbox-primary/secondary/tertiary`, `.checkbox-sm/md/lg` |
| Radio | `.radio`, `.radio-primary/secondary/tertiary`, `.radio-sm/md/lg` |
| Switch | `.switch`, `.switch-primary/secondary/tertiary`, `.switch-sm/md/lg` |
| Slider | `.slider`, `.slider-primary/secondary/tertiary` |
| Rating | `.rating`, `.rating-sm/md/lg`, `.rating-half` |
| Date Picker | `.datepicker`, `.datepicker-input`, `.datepicker-calendar` |
| Time Input | `.time-input`, `.time-input-outlined` |
| OTP Input | `.otp-input`, `.otp-input-box` |
| PIN Input | `.pin-input`, `.pin-input-box`, `.pin-input-mask` |
| Segment Control | `.segment`, `.segment-item`, `.segment-outlined` |
| File Upload | `.file-upload`, `.file-upload-dropzone`, `.file-upload-preview` |
| Form Group | `.form-group`, `.form-label`, `.helper-text`, `.form-label-required` |

**Decision**: Use these exact classes in the documentation examples for accuracy.

### 5. Accessibility Patterns

**Question**: What accessibility attributes should be included in the form demo?

**Decision**: Include in all examples:
- `<label>` elements with `for` attribute linked to input `id`
- `aria-describedby` linking inputs to helper text
- `aria-required="true"` for required fields
- `aria-invalid="true"` for error state examples
- Proper `fieldset` and `legend` for grouped controls (checkbox groups, radio groups)

**Rationale**: Form accessibility is critical for WCAG compliance. Demo serves as accessible pattern reference.

## Unknowns Resolved

All technical unknowns resolved. No NEEDS CLARIFICATION items remain.

## Dependencies

- Existing ComponentShowcase Astro component (already available)
- All 17 Data Entry component CSS classes (already in @duskmoon-dev/core)
- Form Group layout utilities (already available)
