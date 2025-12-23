

/**
 * Alert component styles
 * Material Design 3-inspired alert messages
 */
export const alertStyles: Record<string, any> = {
  // Base alert styles
  '.alert': {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    padding: '1rem',
    borderRadius: '0.5rem',
    border: '1px solid transparent',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Alert content
  '.alert-content': {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },

  '.alert-title': {
    fontSize: '0.875rem',
    fontWeight: '600',
    lineHeight: '1.25rem',
    margin: '0',
  },

  '.alert-description': {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    opacity: '0.9',
    margin: '0',
  },

  // Alert icon
  '.alert-icon': {
    flexShrink: '0',
    width: '1.25rem',
    height: '1.25rem',
    marginTop: '0.063rem',
  },

  // Alert actions
  '.alert-actions': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '0.5rem',
  },

  // Close button
  '.alert-close': {
    flexShrink: '0',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.5rem',
    height: '1.5rem',
    padding: '0',
    marginLeft: 'auto',
    fontSize: '1rem',
    fontWeight: '700',
    lineHeight: '1',
    color: 'inherit',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    opacity: '0.5',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

    '&:hover': {
      opacity: '1',
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },

    '&:focus': {
      opacity: '1',
      outline: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
  },

  // Filled variant
  '.alert-filled': {
    border: 'none',
  },

  '.alert-filled.alert-info': {
    backgroundColor: 'var(--color-info)',
    color: 'var(--color-info-content)',
  },

  '.alert-filled.alert-success': {
    backgroundColor: 'var(--color-success)',
    color: 'var(--color-success-content)',
  },

  '.alert-filled.alert-warning': {
    backgroundColor: 'var(--color-warning)',
    color: 'var(--color-warning-content)',
  },

  '.alert-filled.alert-error': {
    backgroundColor: 'var(--color-error)',
    color: 'var(--color-error-content)',
  },

  // Tonal variant (softer, uses container colors)
  '.alert-tonal, .alert-info': {
    backgroundColor: 'color-mix(in oklch, var(--color-info) 10%, transparent)',
    color: 'var(--color-on-surface)',
    borderColor: 'color-mix(in oklch, var(--color-info) 20%, transparent)',
  },

  '.alert-success': {
    backgroundColor: 'color-mix(in oklch, var(--color-success) 10%, transparent)',
    color: 'var(--color-on-surface)',
    borderColor: 'color-mix(in oklch, var(--color-success) 20%, transparent)',
  },

  '.alert-warning': {
    backgroundColor: 'color-mix(in oklch, var(--color-warning) 10%, transparent)',
    color: 'var(--color-on-surface)',
    borderColor: 'color-mix(in oklch, var(--color-warning) 20%, transparent)',
  },

  '.alert-error': {
    backgroundColor: 'color-mix(in oklch, var(--color-error) 10%, transparent)',
    color: 'var(--color-on-surface)',
    borderColor: 'color-mix(in oklch, var(--color-error) 20%, transparent)',
  },

  // Outlined variant
  '.alert-outlined': {
    backgroundColor: 'transparent',
  },

  '.alert-outlined.alert-info': {
    borderColor: 'var(--color-info)',
    color: 'var(--color-on-surface)',
  },

  '.alert-outlined.alert-success': {
    borderColor: 'var(--color-success)',
    color: 'var(--color-on-surface)',
  },

  '.alert-outlined.alert-warning': {
    borderColor: 'var(--color-warning)',
    color: 'var(--color-on-surface)',
  },

  '.alert-outlined.alert-error': {
    borderColor: 'var(--color-error)',
    color: 'var(--color-on-surface)',
  },

  // Standard variant (surface with colored border)
  '.alert-standard': {
    backgroundColor: 'var(--color-surface-container)',
    color: 'var(--color-on-surface)',
  },

  '.alert-standard.alert-info': {
    borderLeftWidth: '4px',
    borderLeftColor: 'var(--color-info)',
  },

  '.alert-standard.alert-success': {
    borderLeftWidth: '4px',
    borderLeftColor: 'var(--color-success)',
  },

  '.alert-standard.alert-warning': {
    borderLeftWidth: '4px',
    borderLeftColor: 'var(--color-warning)',
  },

  '.alert-standard.alert-error': {
    borderLeftWidth: '4px',
    borderLeftColor: 'var(--color-error)',
  },

  // Size variants
  '.alert-compact': {
    padding: '0.75rem',
  },

  '.alert-compact .alert-icon': {
    width: '1rem',
    height: '1rem',
  },

  '.alert-compact .alert-title': {
    fontSize: '0.813rem',
  },

  '.alert-compact .alert-description': {
    fontSize: '0.813rem',
  },

  '.alert-comfortable': {
    padding: '1.25rem',
  },

  '.alert-comfortable .alert-icon': {
    width: '1.5rem',
    height: '1.5rem',
  },

  // Icon colors for tonal/outlined/standard variants
  '.alert-tonal .alert-icon, .alert-outlined .alert-icon, .alert-standard .alert-icon': {
    color: 'inherit',
  },

  '.alert-tonal.alert-info .alert-icon, .alert-outlined.alert-info .alert-icon, .alert-standard.alert-info .alert-icon': {
    color: 'var(--color-info)',
  },

  '.alert-tonal.alert-success .alert-icon, .alert-outlined.alert-success .alert-icon, .alert-standard.alert-success .alert-icon': {
    color: 'var(--color-success)',
  },

  '.alert-tonal.alert-warning .alert-icon, .alert-outlined.alert-warning .alert-icon, .alert-standard.alert-warning .alert-icon': {
    color: 'var(--color-warning)',
  },

  '.alert-tonal.alert-error .alert-icon, .alert-outlined.alert-error .alert-icon, .alert-standard.alert-error .alert-icon': {
    color: 'var(--color-error)',
  },

  // Title colors for tonal/outlined/standard variants
  '.alert-tonal .alert-title, .alert-outlined .alert-title, .alert-standard .alert-title': {
    color: 'var(--color-on-surface)',
  },

  '.alert-tonal.alert-info .alert-title, .alert-outlined.alert-info .alert-title, .alert-standard.alert-info .alert-title': {
    color: 'var(--color-info)',
  },

  '.alert-tonal.alert-success .alert-title, .alert-outlined.alert-success .alert-title, .alert-standard.alert-success .alert-title': {
    color: 'var(--color-success)',
  },

  '.alert-tonal.alert-warning .alert-title, .alert-outlined.alert-warning .alert-title, .alert-standard.alert-warning .alert-title': {
    color: 'var(--color-warning)',
  },

  '.alert-tonal.alert-error .alert-title, .alert-outlined.alert-error .alert-title, .alert-standard.alert-error .alert-title': {
    color: 'var(--color-error)',
  },
};
