

/**
 * Switch (Toggle) component styles
 * Material Design 3-inspired switch component
 */
export const switchStyles: Record<string, any> = {
  // Base switch container
  '.switch': {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
  },

  // Switch input (hidden)
  '.switch-input': {
    position: 'absolute',
    opacity: '0',
    width: '0',
    height: '0',
  },

  // Switch track
  '.switch-track': {
    position: 'relative',
    display: 'inline-block',
    width: '3.25rem',
    height: '2rem',
    backgroundColor: 'hsl(var(--color-surface-variant))',
    border: '2px solid hsl(var(--color-outline))',
    borderRadius: '1rem',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Switch thumb
  '.switch-thumb': {
    position: 'absolute',
    top: '0.25rem',
    left: '0.25rem',
    width: '1rem',
    height: '1rem',
    backgroundColor: 'hsl(var(--color-outline))',
    borderRadius: '50%',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  },

  // Checked state - Primary
  '.switch-input:checked + .switch-track, .switch-input:checked + .switch-primary': {
    backgroundColor: 'hsl(var(--color-primary))',
    borderColor: 'hsl(var(--color-primary))',
  },

  '.switch-input:checked + .switch-track .switch-thumb, .switch-input:checked + .switch-primary .switch-thumb': {
    left: 'calc(100% - 1.25rem)',
    backgroundColor: 'hsl(var(--color-on-primary))',
  },

  // Secondary variant
  '.switch-secondary': {
    backgroundColor: 'hsl(var(--color-surface-variant))',
    border: '2px solid hsl(var(--color-outline))',
  },

  '.switch-input:checked + .switch-secondary': {
    backgroundColor: 'hsl(var(--color-secondary))',
    borderColor: 'hsl(var(--color-secondary))',
  },

  '.switch-input:checked + .switch-secondary .switch-thumb': {
    backgroundColor: 'hsl(var(--color-on-secondary))',
  },

  // Tertiary variant
  '.switch-tertiary': {
    backgroundColor: 'hsl(var(--color-surface-variant))',
    border: '2px solid hsl(var(--color-outline))',
  },

  '.switch-input:checked + .switch-tertiary': {
    backgroundColor: 'hsl(var(--color-tertiary))',
    borderColor: 'hsl(var(--color-tertiary))',
  },

  '.switch-input:checked + .switch-tertiary .switch-thumb': {
    backgroundColor: 'hsl(var(--color-on-tertiary))',
  },

  // Hover state
  '.switch:hover .switch-track': {
    backgroundColor: 'rgba(var(--color-surface-variant-rgb), 0.9)',
  },

  '.switch:hover .switch-input:checked + .switch-track, .switch:hover .switch-input:checked + .switch-primary': {
    backgroundColor: 'hsl(var(--color-primary-focus))',
  },

  '.switch:hover .switch-input:checked + .switch-secondary': {
    backgroundColor: 'hsl(var(--color-secondary-focus))',
  },

  '.switch:hover .switch-input:checked + .switch-tertiary': {
    backgroundColor: 'hsl(var(--color-tertiary-focus))',
  },

  // Focus state
  '.switch-input:focus-visible + .switch-track': {
    outline: '2px solid hsl(var(--color-primary))',
    outlineOffset: '2px',
  },

  // Disabled state
  '.switch-input:disabled + .switch-track': {
    opacity: '0.38',
    cursor: 'not-allowed',
  },

  '.switch:has(.switch-input:disabled)': {
    cursor: 'not-allowed',
  },

  // Icon in thumb (optional)
  '.switch-thumb-icon': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '0.625rem',
    display: 'none',
  },

  '.switch-input:checked + .switch-track .switch-thumb-icon': {
    display: 'block',
  },

  // Size variants
  '.switch-sm .switch-track': {
    width: '2.5rem',
    height: '1.5rem',
  },

  '.switch-sm .switch-thumb': {
    width: '0.75rem',
    height: '0.75rem',
    top: '0.25rem',
    left: '0.25rem',
  },

  '.switch-sm .switch-input:checked + .switch-track .switch-thumb': {
    left: 'calc(100% - 1rem)',
  },

  '.switch-lg .switch-track': {
    width: '4rem',
    height: '2.5rem',
  },

  '.switch-lg .switch-thumb': {
    width: '1.5rem',
    height: '1.5rem',
    top: '0.25rem',
    left: '0.25rem',
  },

  '.switch-lg .switch-input:checked + .switch-track .switch-thumb': {
    left: 'calc(100% - 1.75rem)',
  },

  // With label
  '.switch-label': {
    marginLeft: '0.75rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.25rem',
    color: 'hsl(var(--color-on-surface))',
    userSelect: 'none',
  },

  '.switch-label-left': {
    order: '-1',
    marginLeft: '0',
    marginRight: '0.75rem',
  },

  // Loading state
  '.switch-loading .switch-thumb': {
    animation: 'switch-pulse 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite',
  },

  '@keyframes switch-pulse': {
    '0%, 100%': {
      opacity: '1',
    },
    '50%': {
      opacity: '0.5',
    },
  },
};
