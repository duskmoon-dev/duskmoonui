# Data Model: Form Documentation Page

**Feature**: 001-form-docs
**Date**: 2026-01-08

## Overview

This document defines the form structure and component mappings for the comprehensive form documentation page.

## Form Sections Entity Model

### Section 1: Personal Information

| Field | Component | Required | Accessibility |
|-------|-----------|----------|---------------|
| Full Name | Input (text) | Yes | label + aria-required |
| Country | Autocomplete | Yes | label + aria-required + combobox role |
| Date of Birth | Date Picker | No | label + date input accessible |

### Section 2: Contact Details

| Field | Component | Required | Accessibility |
|-------|-----------|----------|---------------|
| Email | Input (email) | Yes | label + aria-required + type=email |
| Phone | Input (tel) | No | label + type=tel |
| Bio | Textarea | No | label + aria-describedby for helper |

### Section 3: Preferences

| Field | Component | Required | Accessibility |
|-------|-----------|----------|---------------|
| Language | Select | Yes | label + aria-required |
| Interests | Multi-Select | No | label + aria-describedby |
| Department | Tree-Select | No | label + tree role |
| Theme | Segment Control | No | radiogroup role + aria-label |

### Section 4: Settings

| Field | Component | Required | Accessibility |
|-------|-----------|----------|---------------|
| Email Notifications | Checkbox (group) | No | fieldset + legend |
| Contact Preference | Radio (group) | Yes | fieldset + legend + aria-required |
| Dark Mode | Switch | No | checkbox role + label |
| Volume Level | Slider | No | slider role + aria-valuemin/max/now |

### Section 5: Feedback

| Field | Component | Required | Accessibility |
|-------|-----------|----------|---------------|
| Experience Rating | Rating | No | radiogroup role + aria-label |

### Section 6: Scheduling

| Field | Component | Required | Accessibility |
|-------|-----------|----------|---------------|
| Reminder Time | Time Input | No | label + time input |

### Section 7: Security

| Field | Component | Required | Accessibility |
|-------|-----------|----------|---------------|
| 2FA Code | OTP Input | No | label + aria-label per digit |
| Security PIN | PIN Input | No | label + password type + aria-label per digit |

### Section 8: Attachments

| Field | Component | Required | Accessibility |
|-------|-----------|----------|---------------|
| Profile Photo | File Upload | No | label + button role + aria-describedby |

## Component Coverage Matrix

| Component | Section | Field Name | Variants Shown |
|-----------|---------|------------|----------------|
| Input | 1, 2 | Name, Email, Phone | text, email, tel |
| Textarea | 2 | Bio | default |
| Select | 3 | Language | default |
| Multi-Select | 3 | Interests | default |
| Tree-Select | 3 | Department | default |
| Autocomplete | 1 | Country | default |
| Checkbox | 4 | Notifications | group |
| Radio | 4 | Contact Preference | group |
| Switch | 4 | Dark Mode | default |
| Slider | 4 | Volume | default |
| Rating | 5 | Experience | default |
| Date Picker | 1 | Date of Birth | default |
| Time Input | 6 | Reminder Time | default |
| OTP Input | 7 | 2FA Code | default |
| PIN Input | 7 | Security PIN | default |
| Segment Control | 3 | Theme | default |
| File Upload | 8 | Profile Photo | dropzone |

**Total**: 17 unique components covered across 8 sections

## Form Layout Structure

```
<form>
  <!-- Section 1: Personal Information -->
  <fieldset class="form-section">
    <legend>Personal Information</legend>
    <div class="form-row">
      <FormGroup: Full Name (Input) />
      <FormGroup: Country (Autocomplete) />
    </div>
    <FormGroup: Date of Birth (DatePicker) />
  </fieldset>

  <!-- Section 2: Contact Details -->
  <fieldset class="form-section">
    <legend>Contact Details</legend>
    <div class="form-row">
      <FormGroup: Email (Input) />
      <FormGroup: Phone (Input) />
    </div>
    <FormGroup: Bio (Textarea) />
  </fieldset>

  <!-- Section 3: Preferences -->
  <fieldset class="form-section">
    <legend>Preferences</legend>
    <FormGroup: Language (Select) />
    <FormGroup: Interests (MultiSelect) />
    <FormGroup: Department (TreeSelect) />
    <FormGroup: Theme (SegmentControl) />
  </fieldset>

  <!-- Section 4: Settings -->
  <fieldset class="form-section">
    <legend>Settings</legend>
    <FormGroup: Notifications (Checkbox group) />
    <FormGroup: Contact Preference (Radio group) />
    <div class="form-row">
      <FormGroup: Dark Mode (Switch) />
      <FormGroup: Volume (Slider) />
    </div>
  </fieldset>

  <!-- Section 5: Feedback -->
  <fieldset class="form-section">
    <legend>Feedback</legend>
    <FormGroup: Experience (Rating) />
  </fieldset>

  <!-- Section 6: Scheduling -->
  <fieldset class="form-section">
    <legend>Scheduling</legend>
    <FormGroup: Reminder Time (TimeInput) />
  </fieldset>

  <!-- Section 7: Security -->
  <fieldset class="form-section">
    <legend>Security</legend>
    <FormGroup: 2FA Code (OTPInput) />
    <FormGroup: Security PIN (PINInput) />
  </fieldset>

  <!-- Section 8: Attachments -->
  <fieldset class="form-section">
    <legend>Attachments</legend>
    <FormGroup: Profile Photo (FileUpload) />
  </fieldset>

  <!-- Submit -->
  <div class="form-actions">
    <button type="submit" class="btn btn-primary">Save Profile</button>
    <button type="reset" class="btn btn-outlined">Reset</button>
  </div>
</form>
```

## State Transitions

This is a documentation-only feature. No dynamic state management required.
Form components will display static examples showing:
- Default state
- Focus state (CSS :focus-visible)
- Error state (CSS class application)
- Disabled state (HTML disabled attribute)
