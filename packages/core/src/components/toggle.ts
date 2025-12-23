

/**
 * Toggle button component styles
 * Material Design 3-inspired toggle button (different from switch)
 * Used for selecting between multiple options or toggling states
 */
export const toggleStyles: Record<string, any> = {
  // Base toggle button
  '.toggle-btn': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.625rem 1rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.25rem',
    color: 'var(--color-on-surface-variant)',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-outline)',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    userSelect: 'none',
  },

  // Hover state
  '.toggle-btn:hover': {
    backgroundColor: 'color-mix(in oklch, var(--color-surface-variant) 50%, transparent)',
    borderColor: 'var(--color-outline-variant)',
  },

  // Active/Selected state
  '.toggle-btn-active, .toggle-btn.active': {
    color: 'var(--color-on-primary-container)',
    backgroundColor: 'var(--color-primary-container)',
    borderColor: 'var(--color-primary)',
  },

  '.toggle-btn-active:hover': {
    backgroundColor: 'color-mix(in oklch, var(--color-primary-container) 90%, transparent)',
  },

  // Secondary variant
  '.toggle-btn-secondary.toggle-btn-active': {
    color: 'var(--color-on-secondary-container)',
    backgroundColor: 'var(--color-secondary-container)',
    borderColor: 'var(--color-secondary)',
  },

  // Tertiary variant
  '.toggle-btn-tertiary.toggle-btn-active': {
    color: 'var(--color-on-tertiary-container)',
    backgroundColor: 'var(--color-tertiary-container)',
    borderColor: 'var(--color-tertiary)',
  },

  // Focus state
  '.toggle-btn:focus-visible': {
    outline: '2px solid var(--color-primary)',
    outlineOffset: '2px',
  },

  // Disabled state
  '.toggle-btn:disabled, .toggle-btn-disabled': {
    opacity: '0.38',
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },

  // Size variants
  '.toggle-btn-sm': {
    padding: '0.375rem 0.75rem',
    fontSize: '0.8125rem',
    gap: '0.375rem',
  },

  '.toggle-btn-lg': {
    padding: '0.75rem 1.25rem',
    fontSize: '1rem',
    gap: '0.625rem',
  },

  // Toggle button group
  '.toggle-group': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0',
    border: '1px solid var(--color-outline)',
    borderRadius: '0.5rem',
    padding: '0.25rem',
    backgroundColor: 'color-mix(in oklch, var(--color-surface-variant) 30%, transparent)',
  },

  // Toggle buttons in group
  '.toggle-group .toggle-btn': {
    border: 'none',
    borderRadius: '0.375rem',
    margin: '0',
  },

  '.toggle-group .toggle-btn:not(:last-child)': {
    marginRight: '0.125rem',
  },

  // Vertical group
  '.toggle-group-vertical': {
    flexDirection: 'column',
  },

  '.toggle-group-vertical .toggle-btn:not(:last-child)': {
    marginRight: '0',
    marginBottom: '0.125rem',
  },

  // Exclusive selection (radio-like behavior)
  '.toggle-group-exclusive .toggle-btn': {
    flex: '1',
  },

  // Icon-only toggle
  '.toggle-btn-icon-only': {
    padding: '0.625rem',
    aspectRatio: '1',
  },

  '.toggle-btn-icon-only.toggle-btn-sm': {
    padding: '0.5rem',
  },

  '.toggle-btn-icon-only.toggle-btn-lg': {
    padding: '0.875rem',
  },

  // With icon
  '.toggle-icon': {
    fontSize: '1.125rem',
    lineHeight: '1',
  },

  // Segmented control style
  '.toggle-segmented': {
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-outline-variant)',
    borderRadius: '0.5rem',
    padding: '0.25rem',
  },

  '.toggle-segmented .toggle-btn': {
    border: 'none',
    backgroundColor: 'transparent',
    borderRadius: '0.375rem',
  },

  '.toggle-segmented .toggle-btn.toggle-btn-active': {
    backgroundColor: 'var(--color-surface-variant)',
    borderColor: 'transparent',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },

  // Chip-like toggle
  '.toggle-chip': {
    borderRadius: '1rem',
    padding: '0.5rem 1rem',
  },

  '.toggle-chip.toggle-btn-active': {
    backgroundColor: 'var(--color-primary-container)',
    borderColor: 'var(--color-primary-container)',
  },

  // Outlined variant
  '.toggle-outlined': {
    backgroundColor: 'transparent',
  },

  '.toggle-outlined.toggle-btn-active': {
    backgroundColor: 'color-mix(in oklch, var(--color-primary) 10%, transparent)',
  },

  // Filled variant
  '.toggle-filled': {
    backgroundColor: 'var(--color-surface-variant)',
    border: 'none',
  },

  '.toggle-filled.toggle-btn-active': {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-on-primary)',
  },

  // With badge/indicator
  '.toggle-badge': {
    position: 'relative',
  },

  '.toggle-badge::after': {
    content: '""',
    position: 'absolute',
    top: '0.25rem',
    right: '0.25rem',
    width: '0.5rem',
    height: '0.5rem',
    backgroundColor: 'var(--color-error)',
    borderRadius: '50%',
    border: '2px solid var(--color-surface)',
  },

  // Full width
  '.toggle-full': {
    width: '100%',
  },

  '.toggle-group-full': {
    width: '100%',
  },

  '.toggle-group-full .toggle-btn': {
    flex: '1',
  },

  // Loading state
  '.toggle-loading': {
    position: 'relative',
    pointerEvents: 'none',
  },

  '.toggle-loading::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '1rem',
    height: '1rem',
    marginTop: '-0.5rem',
    marginLeft: '-0.5rem',
    border: '2px solid currentColor',
    borderTopColor: 'transparent',
    borderRadius: '50%',
    animation: 'toggle-spin 0.6s linear infinite',
  },

  '@keyframes toggle-spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
};
