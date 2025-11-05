import type { CSSRuleObject } from 'tailwindcss/types/config';

/**
 * Checkbox component styles
 * Material Design 3-inspired checkbox component
 */
export const checkboxStyles: Record<string, CSSRuleObject> = {
  // Base checkbox container
  '.checkbox': {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
  },

  // Checkbox input (hidden)
  '.checkbox-input': {
    position: 'absolute',
    opacity: '0',
    width: '0',
    height: '0',
  },

  // Checkbox box
  '.checkbox-box': {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.25rem',
    height: '1.25rem',
    backgroundColor: 'transparent',
    border: '2px solid hsl(var(--color-outline))',
    borderRadius: '0.25rem',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Checkbox checkmark (SVG or icon)
  '.checkbox-checkmark': {
    opacity: '0',
    transform: 'scale(0)',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    color: 'hsl(var(--color-on-primary))',
    fontSize: '1rem',
    lineHeight: '1',
  },

  // Checked state - Primary
  '.checkbox-input:checked + .checkbox-box, .checkbox-input:checked + .checkbox-primary': {
    backgroundColor: 'hsl(var(--color-primary))',
    borderColor: 'hsl(var(--color-primary))',
  },

  '.checkbox-input:checked + .checkbox-box .checkbox-checkmark, .checkbox-input:checked + .checkbox-primary .checkbox-checkmark': {
    opacity: '1',
    transform: 'scale(1)',
  },

  // Secondary variant
  '.checkbox-secondary': {
    backgroundColor: 'transparent',
    border: '2px solid hsl(var(--color-outline))',
  },

  '.checkbox-input:checked + .checkbox-secondary': {
    backgroundColor: 'hsl(var(--color-secondary))',
    borderColor: 'hsl(var(--color-secondary))',
  },

  '.checkbox-input:checked + .checkbox-secondary .checkbox-checkmark': {
    color: 'hsl(var(--color-on-secondary))',
  },

  // Tertiary variant
  '.checkbox-tertiary': {
    backgroundColor: 'transparent',
    border: '2px solid hsl(var(--color-outline))',
  },

  '.checkbox-input:checked + .checkbox-tertiary': {
    backgroundColor: 'hsl(var(--color-tertiary))',
    borderColor: 'hsl(var(--color-tertiary))',
  },

  '.checkbox-input:checked + .checkbox-tertiary .checkbox-checkmark': {
    color: 'hsl(var(--color-on-tertiary))',
  },

  // Indeterminate state
  '.checkbox-input:indeterminate + .checkbox-box, .checkbox-input:indeterminate + .checkbox-primary': {
    backgroundColor: 'hsl(var(--color-primary))',
    borderColor: 'hsl(var(--color-primary))',
  },

  '.checkbox-input:indeterminate + .checkbox-box .checkbox-checkmark': {
    opacity: '1',
    transform: 'scale(1)',
  },

  // Hover state
  '.checkbox:hover .checkbox-box': {
    borderColor: 'hsl(var(--color-primary))',
    backgroundColor: 'rgba(var(--color-surface-variant-rgb), 0.5)',
  },

  '.checkbox:hover .checkbox-input:checked + .checkbox-box, .checkbox:hover .checkbox-input:checked + .checkbox-primary': {
    backgroundColor: 'hsl(var(--color-primary-focus))',
    borderColor: 'hsl(var(--color-primary-focus))',
  },

  '.checkbox:hover .checkbox-input:checked + .checkbox-secondary': {
    backgroundColor: 'hsl(var(--color-secondary-focus))',
    borderColor: 'hsl(var(--color-secondary-focus))',
  },

  '.checkbox:hover .checkbox-input:checked + .checkbox-tertiary': {
    backgroundColor: 'hsl(var(--color-tertiary-focus))',
    borderColor: 'hsl(var(--color-tertiary-focus))',
  },

  // Focus state
  '.checkbox-input:focus-visible + .checkbox-box': {
    outline: '2px solid hsl(var(--color-primary))',
    outlineOffset: '2px',
  },

  // Disabled state
  '.checkbox-input:disabled + .checkbox-box': {
    opacity: '0.38',
    cursor: 'not-allowed',
    borderColor: 'hsl(var(--color-outline))',
    backgroundColor: 'rgba(var(--color-surface-variant-rgb), 0.3)',
  },

  '.checkbox:has(.checkbox-input:disabled)': {
    cursor: 'not-allowed',
  },

  // Error state
  '.checkbox-error .checkbox-box': {
    borderColor: 'hsl(var(--color-error))',
  },

  '.checkbox-error .checkbox-input:checked + .checkbox-box': {
    backgroundColor: 'hsl(var(--color-error))',
    borderColor: 'hsl(var(--color-error))',
  },

  // Size variants
  '.checkbox-sm .checkbox-box': {
    width: '1rem',
    height: '1rem',
  },

  '.checkbox-sm .checkbox-checkmark': {
    fontSize: '0.75rem',
  },

  '.checkbox-lg .checkbox-box': {
    width: '1.5rem',
    height: '1.5rem',
  },

  '.checkbox-lg .checkbox-checkmark': {
    fontSize: '1.25rem',
  },

  // With label
  '.checkbox-label': {
    marginLeft: '0.75rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.25rem',
    color: 'hsl(var(--color-on-surface))',
    userSelect: 'none',
  },

  '.checkbox-label-left': {
    order: '-1',
    marginLeft: '0',
    marginRight: '0.75rem',
  },

  // Helper text
  '.checkbox-helper': {
    display: 'block',
    marginTop: '0.25rem',
    marginLeft: '2rem',
    fontSize: '0.75rem',
    color: 'hsl(var(--color-on-surface-variant))',
  },

  '.checkbox-error .checkbox-helper': {
    color: 'hsl(var(--color-error))',
  },

  // Loading state
  '.checkbox-loading .checkbox-box': {
    animation: 'checkbox-pulse 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite',
  },

  '@keyframes checkbox-pulse': {
    '0%, 100%': {
      opacity: '1',
    },
    '50%': {
      opacity: '0.5',
    },
  },
};
