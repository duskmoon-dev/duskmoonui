

/**
 * Radio Button component styles
 * Material Design 3-inspired radio button component
 */
export const radioStyles: Record<string, any> = {
  // Base radio container
  '.radio': {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
  },

  // Radio input (hidden)
  '.radio-input': {
    position: 'absolute',
    opacity: '0',
    width: '0',
    height: '0',
  },

  // Radio circle (outer)
  '.radio-circle': {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.25rem',
    height: '1.25rem',
    backgroundColor: 'transparent',
    border: '2px solid hsl(var(--color-outline))',
    borderRadius: '50%',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Radio dot (inner)
  '.radio-dot': {
    width: '0.625rem',
    height: '0.625rem',
    backgroundColor: 'hsl(var(--color-primary))',
    borderRadius: '50%',
    opacity: '0',
    transform: 'scale(0)',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Checked state - Primary
  '.radio-input:checked + .radio-circle, .radio-input:checked + .radio-primary': {
    borderColor: 'hsl(var(--color-primary))',
  },

  '.radio-input:checked + .radio-circle .radio-dot, .radio-input:checked + .radio-primary .radio-dot': {
    opacity: '1',
    transform: 'scale(1)',
  },

  // Secondary variant
  '.radio-secondary': {
    backgroundColor: 'transparent',
    border: '2px solid hsl(var(--color-outline))',
  },

  '.radio-input:checked + .radio-secondary': {
    borderColor: 'hsl(var(--color-secondary))',
  },

  '.radio-input:checked + .radio-secondary .radio-dot': {
    backgroundColor: 'hsl(var(--color-secondary))',
  },

  // Tertiary variant
  '.radio-tertiary': {
    backgroundColor: 'transparent',
    border: '2px solid hsl(var(--color-outline))',
  },

  '.radio-input:checked + .radio-tertiary': {
    borderColor: 'hsl(var(--color-tertiary))',
  },

  '.radio-input:checked + .radio-tertiary .radio-dot': {
    backgroundColor: 'hsl(var(--color-tertiary))',
  },

  // Hover state
  '.radio:hover .radio-circle': {
    borderColor: 'hsl(var(--color-primary))',
    backgroundColor: 'rgba(var(--color-surface-variant-rgb), 0.5)',
  },

  '.radio:hover .radio-input:checked + .radio-circle, .radio:hover .radio-input:checked + .radio-primary': {
    borderColor: 'hsl(var(--color-primary-focus))',
  },

  '.radio:hover .radio-input:checked + .radio-secondary': {
    borderColor: 'hsl(var(--color-secondary-focus))',
  },

  '.radio:hover .radio-input:checked + .radio-tertiary': {
    borderColor: 'hsl(var(--color-tertiary-focus))',
  },

  // Focus state
  '.radio-input:focus-visible + .radio-circle': {
    outline: '2px solid hsl(var(--color-primary))',
    outlineOffset: '2px',
  },

  // Disabled state
  '.radio-input:disabled + .radio-circle': {
    opacity: '0.38',
    cursor: 'not-allowed',
    borderColor: 'hsl(var(--color-outline))',
    backgroundColor: 'rgba(var(--color-surface-variant-rgb), 0.3)',
  },

  '.radio:has(.radio-input:disabled)': {
    cursor: 'not-allowed',
  },

  // Error state
  '.radio-error .radio-circle': {
    borderColor: 'hsl(var(--color-error))',
  },

  '.radio-error .radio-input:checked + .radio-circle .radio-dot': {
    backgroundColor: 'hsl(var(--color-error))',
  },

  // Size variants
  '.radio-sm .radio-circle': {
    width: '1rem',
    height: '1rem',
  },

  '.radio-sm .radio-dot': {
    width: '0.5rem',
    height: '0.5rem',
  },

  '.radio-lg .radio-circle': {
    width: '1.5rem',
    height: '1.5rem',
  },

  '.radio-lg .radio-dot': {
    width: '0.75rem',
    height: '0.75rem',
  },

  // With label
  '.radio-label': {
    marginLeft: '0.75rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.25rem',
    color: 'hsl(var(--color-on-surface))',
    userSelect: 'none',
  },

  '.radio-label-left': {
    order: '-1',
    marginLeft: '0',
    marginRight: '0.75rem',
  },

  // Radio group
  '.radio-group': {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },

  '.radio-group-horizontal': {
    flexDirection: 'row',
    gap: '1.5rem',
  },

  // Helper text
  '.radio-helper': {
    display: 'block',
    marginTop: '0.25rem',
    marginLeft: '2rem',
    fontSize: '0.75rem',
    color: 'hsl(var(--color-on-surface-variant))',
  },

  '.radio-error .radio-helper': {
    color: 'hsl(var(--color-error))',
  },

  // Loading state
  '.radio-loading .radio-circle': {
    animation: 'radio-pulse 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite',
  },

  '@keyframes radio-pulse': {
    '0%, 100%': {
      opacity: '1',
    },
    '50%': {
      opacity: '0.5',
    },
  },
};
