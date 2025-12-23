

/**
 * Chip component styles
 * Material Design 3-inspired chips for tags, filters, and selections
 */
export const chipStyles: Record<string, any> = {
  // Base chip
  '.chip': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.375rem 0.75rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.25rem',
    color: 'var(--color-on-surface)',
    backgroundColor: 'var(--color-surface-variant)',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'default',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    whiteSpace: 'nowrap',
  },

  // Outlined variant
  '.chip-outlined': {
    backgroundColor: 'transparent',
    border: '1px solid var(--color-outline)',
  },

  // Clickable chip (assist/suggestion chips)
  '.chip-clickable': {
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-on-surface) 8%, transparent)',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    },

    '&:active': {
      boxShadow: 'none',
    },
  },

  '.chip-outlined.chip-clickable:hover': {
    backgroundColor: 'color-mix(in oklch, var(--color-on-surface) 4%, transparent)',
  },

  // Selectable/Filter chips
  '.chip-selectable': {
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-on-surface) 8%, transparent)',
    },
  },

  // Selected state - Primary
  '.chip-selected, .chip-selected-primary': {
    backgroundColor: 'var(--color-secondary-container)',
    color: 'var(--color-on-secondary-container)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-secondary-container) 90%, transparent)',
    },
  },

  // Selected state - Secondary
  '.chip-selected-secondary': {
    backgroundColor: 'var(--color-secondary-container)',
    color: 'var(--color-on-secondary-container)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-secondary-container) 90%, transparent)',
    },
  },

  // Selected state - Tertiary
  '.chip-selected-tertiary': {
    backgroundColor: 'var(--color-tertiary-container)',
    color: 'var(--color-on-tertiary-container)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-tertiary-container) 90%, transparent)',
    },
  },

  // Color variants for filled chips
  '.chip-primary': {
    backgroundColor: 'var(--color-primary-container)',
    color: 'var(--color-on-primary-container)',
  },

  '.chip-secondary': {
    backgroundColor: 'var(--color-secondary-container)',
    color: 'var(--color-on-secondary-container)',
  },

  '.chip-tertiary': {
    backgroundColor: 'var(--color-tertiary-container)',
    color: 'var(--color-on-tertiary-container)',
  },

  '.chip-success': {
    backgroundColor: 'color-mix(in oklch, var(--color-success) 15%, transparent)',
    color: 'var(--color-success)',
  },

  '.chip-error': {
    backgroundColor: 'color-mix(in oklch, var(--color-error) 15%, transparent)',
    color: 'var(--color-error)',
  },

  '.chip-warning': {
    backgroundColor: 'color-mix(in oklch, var(--color-warning) 15%, transparent)',
    color: 'var(--color-warning)',
  },

  '.chip-info': {
    backgroundColor: 'color-mix(in oklch, var(--color-info) 15%, transparent)',
    color: 'var(--color-info)',
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
