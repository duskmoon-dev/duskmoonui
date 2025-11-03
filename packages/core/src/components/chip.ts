import type { CSSRuleObject } from 'tailwindcss/types/config';

/**
 * Chip component styles
 * Material Design 3-inspired chips for tags, filters, and selections
 */
export const chipStyles: Record<string, CSSRuleObject> = {
  // Base chip
  '.chip': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.375rem 0.75rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.25rem',
    color: 'hsl(var(--color-on-surface))',
    backgroundColor: 'hsl(var(--color-surface-variant))',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'default',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    whiteSpace: 'nowrap',
  },

  // Outlined variant
  '.chip-outlined': {
    backgroundColor: 'transparent',
    border: '1px solid hsl(var(--color-outline))',
  },

  // Clickable chip (assist/suggestion chips)
  '.chip-clickable': {
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: 'hsl(var(--color-on-surface) / 0.08)',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    },

    '&:active': {
      boxShadow: 'none',
    },
  },

  '.chip-outlined.chip-clickable:hover': {
    backgroundColor: 'hsl(var(--color-on-surface) / 0.04)',
  },

  // Selectable/Filter chips
  '.chip-selectable': {
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: 'hsl(var(--color-on-surface) / 0.08)',
    },
  },

  // Selected state - Primary
  '.chip-selected, .chip-selected-primary': {
    backgroundColor: 'hsl(var(--color-secondary-container))',
    color: 'hsl(var(--color-on-secondary-container))',

    '&:hover': {
      backgroundColor: 'hsl(var(--color-secondary-container) / 0.9)',
    },
  },

  // Selected state - Secondary
  '.chip-selected-secondary': {
    backgroundColor: 'hsl(var(--color-secondary-container))',
    color: 'hsl(var(--color-on-secondary-container))',

    '&:hover': {
      backgroundColor: 'hsl(var(--color-secondary-container) / 0.9)',
    },
  },

  // Selected state - Tertiary
  '.chip-selected-tertiary': {
    backgroundColor: 'hsl(var(--color-tertiary-container))',
    color: 'hsl(var(--color-on-tertiary-container))',

    '&:hover': {
      backgroundColor: 'hsl(var(--color-tertiary-container) / 0.9)',
    },
  },

  // Color variants for filled chips
  '.chip-primary': {
    backgroundColor: 'hsl(var(--color-primary-container))',
    color: 'hsl(var(--color-on-primary-container))',
  },

  '.chip-secondary': {
    backgroundColor: 'hsl(var(--color-secondary-container))',
    color: 'hsl(var(--color-on-secondary-container))',
  },

  '.chip-tertiary': {
    backgroundColor: 'hsl(var(--color-tertiary-container))',
    color: 'hsl(var(--color-on-tertiary-container))',
  },

  '.chip-success': {
    backgroundColor: 'hsl(var(--color-success) / 0.15)',
    color: 'hsl(var(--color-success))',
  },

  '.chip-error': {
    backgroundColor: 'hsl(var(--color-error) / 0.15)',
    color: 'hsl(var(--color-error))',
  },

  '.chip-warning': {
    backgroundColor: 'hsl(var(--color-warning) / 0.15)',
    color: 'hsl(var(--color-warning))',
  },

  '.chip-info': {
    backgroundColor: 'hsl(var(--color-info) / 0.15)',
    color: 'hsl(var(--color-info))',
  },

  // Leading icon
  '.chip-icon': {
    fontSize: '1.125rem',
    width: '1.125rem',
    height: '1.125rem',
    flexShrink: '0',
  },

  // Leading avatar
  '.chip-avatar': {
    width: '1.5rem',
    height: '1.5rem',
    borderRadius: '50%',
    marginLeft: '-0.25rem',
    flexShrink: '0',
  },

  // Remove/delete button
  '.chip-remove': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.125rem',
    height: '1.125rem',
    marginRight: '-0.25rem',
    padding: '0',
    fontSize: '1rem',
    color: 'inherit',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: '0.7',

    '&:hover': {
      opacity: '1',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },

    '&:focus': {
      opacity: '1',
      outline: 'none',
    },
  },

  // Size variants
  '.chip-sm': {
    padding: '0.25rem 0.5rem',
    fontSize: '0.75rem',
    borderRadius: '0.375rem',
  },

  '.chip-sm .chip-icon': {
    fontSize: '0.875rem',
    width: '0.875rem',
    height: '0.875rem',
  },

  '.chip-sm .chip-avatar': {
    width: '1.25rem',
    height: '1.25rem',
  },

  '.chip-lg': {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    borderRadius: '0.625rem',
  },

  '.chip-lg .chip-icon': {
    fontSize: '1.25rem',
    width: '1.25rem',
    height: '1.25rem',
  },

  '.chip-lg .chip-avatar': {
    width: '2rem',
    height: '2rem',
  },

  // Disabled chip
  '.chip-disabled': {
    opacity: '0.38',
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },

  // Chip group
  '.chip-group': {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },

  // Dense chip group
  '.chip-group-dense': {
    gap: '0.25rem',
  },
};
