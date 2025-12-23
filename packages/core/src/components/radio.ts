

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
    border: '2px solid var(--color-outline)',
    borderRadius: '50%',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Radio dot (inner)
  '.radio-dot': {
    width: '0.625rem',
    height: '0.625rem',
    backgroundColor: 'var(--color-primary)',
    borderRadius: '50%',
    opacity: '0',
    transform: 'scale(0)',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Checked state - Primary
  '.radio-input:checked + .radio-circle, .radio-input:checked + .radio-primary': {
    borderColor: 'var(--color-primary)',
  },

  '.radio-input:checked + .radio-circle .radio-dot, .radio-input:checked + .radio-primary .radio-dot': {
    opacity: '1',
    transform: 'scale(1)',
  },

  // Secondary variant
  '.radio-secondary': {
    backgroundColor: 'transparent',
    border: '2px solid var(--color-outline)',
  },

  '.radio-input:checked + .radio-secondary': {
    borderColor: 'var(--color-secondary)',
  },

  '.radio-input:checked + .radio-secondary .radio-dot': {
    backgroundColor: 'var(--color-secondary)',
  },

  // Tertiary variant
  '.radio-tertiary': {
    backgroundColor: 'transparent',
    border: '2px solid var(--color-outline)',
  },

  '.radio-input:checked + .radio-tertiary': {
    borderColor: 'var(--color-tertiary)',
  },

  '.radio-input:checked + .radio-tertiary .radio-dot': {
    backgroundColor: 'var(--color-tertiary)',
  },

  // Hover state
  '.radio:hover .radio-circle': {
    borderColor: 'var(--color-primary)',
    backgroundColor: 'color-mix(in oklch, var(--color-surface-variant) 50%, transparent)',
  },

  '.radio:hover .radio-input:checked + .radio-circle, .radio:hover .radio-input:checked + .radio-primary': {
    borderColor: 'color-mix(in oklch, var(--color-primary), black 10%)',
  },

  '.radio:hover .radio-input:checked + .radio-secondary': {
    borderColor: 'color-mix(in oklch, var(--color-secondary), black 10%)',
  },

  '.radio:hover .radio-input:checked + .radio-tertiary': {
    borderColor: 'color-mix(in oklch, var(--color-tertiary), black 10%)',
  },

  // Focus state
  '.radio-input:focus-visible + .radio-circle': {
    outline: '2px solid var(--color-primary)',
    outlineOffset: '2px',
  },

  // Disabled state
  '.radio-input:disabled + .radio-circle': {
    opacity: '0.38',
    cursor: 'not-allowed',
    borderColor: 'var(--color-outline)',
    backgroundColor: 'color-mix(in oklch, var(--color-surface-variant) 30%, transparent)',
  },

  '.radio:has(.radio-input:disabled)': {
    cursor: 'not-allowed',
  },

  // Error state
  '.radio-error .radio-circle': {
    borderColor: 'var(--color-error)',
  },

  '.radio-error .radio-input:checked + .radio-circle .radio-dot': {
    backgroundColor: 'var(--color-error)',
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
    color: 'var(--color-on-surface)',
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
    color: 'var(--color-on-surface-variant)',
  },

  '.radio-error .radio-helper': {
    color: 'var(--color-error)',
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
