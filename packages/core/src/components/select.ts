

/**
 * Select (Dropdown) component styles
 * Material Design 3-inspired select component
 */
export const selectStyles: Record<string, any> = {
  // Base select container
  '.select-container': {
    position: 'relative',
    display: 'inline-block',
    width: '100%',
  },

  // Select element
  '.select': {
    appearance: 'none',
    width: '100%',
    padding: '0.75rem 2.5rem 0.75rem 1rem',
    fontSize: '1rem',
    fontWeight: '400',
    lineHeight: '1.5',
    color: 'hsl(var(--color-on-surface))',
    backgroundColor: 'hsl(var(--color-surface))',
    border: '1px solid hsl(var(--color-outline))',
    borderRadius: '0.5rem',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    outline: 'none',
  },

  // Select icon (dropdown arrow)
  '.select-icon': {
    position: 'absolute',
    top: '50%',
    right: '1rem',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    fontSize: '1.25rem',
    color: 'hsl(var(--color-on-surface-variant))',
    transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Open state
  '.select-container.select-open .select-icon': {
    transform: 'translateY(-50%) rotate(180deg)',
  },

  // Hover state
  '.select:hover': {
    borderColor: 'hsl(var(--color-primary))',
    backgroundColor: 'rgba(var(--color-surface-variant-rgb), 0.5)',
  },

  // Focus state
  '.select:focus': {
    borderColor: 'hsl(var(--color-primary))',
    borderWidth: '2px',
    padding: 'calc(0.75rem - 1px) calc(2.5rem - 1px) calc(0.75rem - 1px) calc(1rem - 1px)',
    boxShadow: '0 0 0 3px rgba(var(--color-primary-rgb), 0.1)',
  },

  // Filled variant
  '.select-filled': {
    backgroundColor: 'hsl(var(--color-surface-variant))',
    border: 'none',
    borderBottom: '2px solid hsl(var(--color-outline))',
    borderRadius: '0.5rem 0.5rem 0 0',
    padding: '1.5rem 2.5rem 0.5rem 1rem',
  },

  '.select-filled:focus': {
    borderBottomColor: 'hsl(var(--color-primary))',
    borderBottomWidth: '2px',
    padding: '1.5rem 2.5rem 0.5rem 1rem',
    boxShadow: 'none',
  },

  // Outlined variant (default)
  '.select-outlined': {
    backgroundColor: 'transparent',
  },

  // Color variants
  '.select-primary:focus': {
    borderColor: 'hsl(var(--color-primary))',
    boxShadow: '0 0 0 3px rgba(var(--color-primary-rgb), 0.1)',
  },

  '.select-secondary:focus': {
    borderColor: 'hsl(var(--color-secondary))',
    boxShadow: '0 0 0 3px rgba(var(--color-secondary-rgb), 0.1)',
  },

  '.select-tertiary:focus': {
    borderColor: 'hsl(var(--color-tertiary))',
    boxShadow: '0 0 0 3px rgba(var(--color-tertiary-rgb), 0.1)',
  },

  // Size variants
  '.select-sm': {
    padding: '0.5rem 2rem 0.5rem 0.75rem',
    fontSize: '0.875rem',
  },

  '.select-sm:focus': {
    padding: 'calc(0.5rem - 1px) calc(2rem - 1px) calc(0.5rem - 1px) calc(0.75rem - 1px)',
  },

  '.select-lg': {
    padding: '1rem 3rem 1rem 1.25rem',
    fontSize: '1.125rem',
  },

  '.select-lg:focus': {
    padding: 'calc(1rem - 1px) calc(3rem - 1px) calc(1rem - 1px) calc(1.25rem - 1px)',
  },

  // Disabled state
  '.select:disabled': {
    opacity: '0.6',
    cursor: 'not-allowed',
    backgroundColor: 'rgba(var(--color-surface-variant-rgb), 0.5)',
  },

  // Error state
  '.select-error': {
    borderColor: 'hsl(var(--color-error))',
  },

  '.select-error:focus': {
    borderColor: 'hsl(var(--color-error))',
    boxShadow: '0 0 0 3px rgba(var(--color-error-rgb), 0.1)',
  },

  // Label
  '.select-label': {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'hsl(var(--color-on-surface))',
  },

  // Floating label for filled variant
  '.select-container-filled': {
    position: 'relative',
  },

  '.select-label-floating': {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    fontSize: '1rem',
    color: 'hsl(var(--color-on-surface-variant))',
    pointerEvents: 'none',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    transformOrigin: 'left top',
  },

  '.select:focus ~ .select-label-floating, .select:not(:placeholder-shown) ~ .select-label-floating': {
    transform: 'translateY(-0.5rem) scale(0.75)',
    color: 'hsl(var(--color-primary))',
  },

  // Helper text
  '.select-helper': {
    display: 'block',
    marginTop: '0.25rem',
    fontSize: '0.75rem',
    color: 'hsl(var(--color-on-surface-variant))',
  },

  '.select-error ~ .select-helper, .select-container-error .select-helper': {
    color: 'hsl(var(--color-error))',
  },

  // Option styles
  '.select option': {
    padding: '0.5rem',
    backgroundColor: 'hsl(var(--color-surface))',
    color: 'hsl(var(--color-on-surface))',
  },

  '.select option:checked': {
    backgroundColor: 'hsl(var(--color-primary-container))',
    color: 'hsl(var(--color-on-primary-container))',
  },

  // Multiple select
  '.select[multiple]': {
    padding: '0.5rem',
  },

  '.select[multiple] option': {
    padding: '0.5rem',
    marginBottom: '0.25rem',
    borderRadius: '0.25rem',
  },

  // Loading state
  '.select-loading': {
    position: 'relative',
  },

  '.select-loading::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    right: '2.5rem',
    width: '1rem',
    height: '1rem',
    marginTop: '-0.5rem',
    border: '2px solid hsl(var(--color-primary))',
    borderTopColor: 'transparent',
    borderRadius: '50%',
    animation: 'select-spin 0.6s linear infinite',
  },

  '@keyframes select-spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },

  // Full width
  '.select-full': {
    width: '100%',
  },
};
