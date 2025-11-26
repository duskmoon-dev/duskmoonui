

/**
 * Badge component styles
 * Material Design 3-inspired badges for status indicators
 */
export const badgeStyles: Record<string, any> = {
  // Base badge styles
  '.badge': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.125rem 0.625rem',
    fontSize: '0.75rem',
    fontWeight: '500',
    lineHeight: '1rem',
    borderRadius: '0.75rem', // Pill shape
    whiteSpace: 'nowrap',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Filled variant (default)
  '.badge-filled, .badge-primary': {
    backgroundColor: 'hsl(var(--color-primary))',
    color: 'hsl(var(--color-primary-content))',
  },

  '.badge-secondary': {
    backgroundColor: 'hsl(var(--color-secondary))',
    color: 'hsl(var(--color-secondary-content))',
  },

  '.badge-tertiary': {
    backgroundColor: 'hsl(var(--color-tertiary))',
    color: 'hsl(var(--color-tertiary-content))',
  },

  // Tonal variant (lighter, uses container colors)
  '.badge-tonal': {
    backgroundColor: 'hsl(var(--color-primary-container))',
    color: 'hsl(var(--color-on-primary-container))',
  },

  '.badge-tonal-secondary': {
    backgroundColor: 'hsl(var(--color-secondary-container))',
    color: 'hsl(var(--color-on-secondary-container))',
  },

  '.badge-tonal-tertiary': {
    backgroundColor: 'hsl(var(--color-tertiary-container))',
    color: 'hsl(var(--color-on-tertiary-container))',
  },

  // Outlined variant
  '.badge-outlined': {
    backgroundColor: 'transparent',
    color: 'hsl(var(--color-primary))',
    border: '1px solid hsl(var(--color-primary))',
  },

  '.badge-outlined-secondary': {
    backgroundColor: 'transparent',
    color: 'hsl(var(--color-secondary))',
    border: '1px solid hsl(var(--color-secondary))',
  },

  '.badge-outlined-tertiary': {
    backgroundColor: 'transparent',
    color: 'hsl(var(--color-tertiary))',
    border: '1px solid hsl(var(--color-tertiary))',
  },

  // Semantic colors
  '.badge-success': {
    backgroundColor: 'hsl(var(--color-success))',
    color: 'hsl(var(--color-success-content))',
  },

  '.badge-error': {
    backgroundColor: 'hsl(var(--color-error))',
    color: 'hsl(var(--color-error-content))',
  },

  '.badge-warning': {
    backgroundColor: 'hsl(var(--color-warning))',
    color: 'hsl(var(--color-warning-content))',
  },

  '.badge-info': {
    backgroundColor: 'hsl(var(--color-info))',
    color: 'hsl(var(--color-info-content))',
  },

  // Neutral variant
  '.badge-neutral': {
    backgroundColor: 'hsl(var(--color-surface-variant))',
    color: 'hsl(var(--color-on-surface-variant))',
  },

  // Size variants
  '.badge-sm': {
    padding: '0.063rem 0.5rem',
    fontSize: '0.688rem',
    lineHeight: '0.875rem',
  },

  '.badge-md': {
    padding: '0.125rem 0.625rem',
    fontSize: '0.75rem',
    lineHeight: '1rem',
  },

  '.badge-lg': {
    padding: '0.25rem 0.75rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },

  // Dot badge (for indicators)
  '.badge-dot': {
    padding: '0',
    width: '0.5rem',
    height: '0.5rem',
    borderRadius: '50%',
    minWidth: '0.5rem',
  },

  '.badge-dot-md': {
    width: '0.625rem',
    height: '0.625rem',
    minWidth: '0.625rem',
  },

  '.badge-dot-lg': {
    width: '0.75rem',
    height: '0.75rem',
    minWidth: '0.75rem',
  },

  // Badge with icon
  '.badge-with-icon': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
  },

  // Removable badge (with close button)
  '.badge-removable': {
    paddingRight: '0.25rem',
  },

  '.badge-close': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1rem',
    height: '1rem',
    marginLeft: '0.25rem',
    padding: '0',
    fontSize: '0.75rem',
    fontWeight: '700',
    lineHeight: '1',
    color: 'inherit',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    opacity: '0.7',
    transition: 'opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

    '&:hover': {
      opacity: '1',
    },

    '&:focus': {
      opacity: '1',
      outline: 'none',
    },
  },

  // Notification badge (positioned on corner)
  '.badge-notification': {
    position: 'absolute',
    top: '-0.25rem',
    right: '-0.25rem',
    minWidth: '1.25rem',
    height: '1.25rem',
    padding: '0.125rem 0.375rem',
    fontSize: '0.688rem',
    fontWeight: '600',
    lineHeight: '1rem',
    borderRadius: '0.625rem',
  },

  '.badge-notification-dot': {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '0.5rem',
    height: '0.5rem',
    padding: '0',
    borderRadius: '50%',
    border: '2px solid hsl(var(--color-surface))',
  },

  // Positioned badges
  '.badge-top-left': {
    top: '-0.25rem',
    right: 'auto',
    left: '-0.25rem',
  },

  '.badge-bottom-right': {
    top: 'auto',
    bottom: '-0.25rem',
    right: '-0.25rem',
  },

  '.badge-bottom-left': {
    top: 'auto',
    bottom: '-0.25rem',
    right: 'auto',
    left: '-0.25rem',
  },
};
