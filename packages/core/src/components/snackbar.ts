import type { CSSRuleObject } from 'tailwindcss/types/config';

/**
 * Snackbar (Toast) component styles
 * Material Design 3-inspired snackbars for brief messages
 */
export const snackbarStyles: Record<string, CSSRuleObject> = {
  // Base snackbar
  '.snackbar': {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    minWidth: '18rem',
    maxWidth: '36rem',
    padding: '0.875rem 1rem',
    backgroundColor: 'hsl(var(--color-inverse-surface))',
    color: 'hsl(var(--color-inverse-on-surface))',
    borderRadius: '0.25rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.15)',
    zIndex: '9999',
    opacity: '0',
    visibility: 'hidden',
    transform: 'translateY(1rem)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  '.snackbar-show': {
    opacity: '1',
    visibility: 'visible',
    transform: 'translateY(0)',
  },

  // Bottom positioning (default)
  '.snackbar-bottom': {
    bottom: '1.5rem',
    left: '50%',
    transform: 'translateX(-50%) translateY(1rem)',
  },

  '.snackbar-bottom.snackbar-show': {
    transform: 'translateX(-50%) translateY(0)',
  },

  // Bottom left
  '.snackbar-bottom-left': {
    bottom: '1.5rem',
    left: '1.5rem',
    transform: 'translateY(1rem)',
  },

  '.snackbar-bottom-left.snackbar-show': {
    transform: 'translateY(0)',
  },

  // Bottom right
  '.snackbar-bottom-right': {
    bottom: '1.5rem',
    right: '1.5rem',
    transform: 'translateY(1rem)',
  },

  '.snackbar-bottom-right.snackbar-show': {
    transform: 'translateY(0)',
  },

  // Top positioning
  '.snackbar-top': {
    top: '1.5rem',
    left: '50%',
    transform: 'translateX(-50%) translateY(-1rem)',
  },

  '.snackbar-top.snackbar-show': {
    transform: 'translateX(-50%) translateY(0)',
  },

  // Top left
  '.snackbar-top-left': {
    top: '1.5rem',
    left: '1.5rem',
    transform: 'translateY(-1rem)',
  },

  '.snackbar-top-left.snackbar-show': {
    transform: 'translateY(0)',
  },

  // Top right
  '.snackbar-top-right': {
    top: '1.5rem',
    right: '1.5rem',
    transform: 'translateY(-1rem)',
  },

  '.snackbar-top-right.snackbar-show': {
    transform: 'translateY(0)',
  },

  // Snackbar message
  '.snackbar-message': {
    flex: '1 1 auto',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },

  // Snackbar action button
  '.snackbar-action': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.375rem 0.75rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    lineHeight: '1.25rem',
    color: 'hsl(var(--color-inverse-primary))',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    whiteSpace: 'nowrap',

    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },

    '&:active': {
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
    },
  },

  // Close button
  '.snackbar-close': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2rem',
    height: '2rem',
    padding: '0.375rem',
    fontSize: '1rem',
    color: 'inherit',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },

    '&:active': {
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
    },
  },

  // Semantic color variants
  '.snackbar-success': {
    backgroundColor: 'hsl(var(--color-success))',
    color: 'hsl(var(--color-success-content))',
  },

  '.snackbar-error': {
    backgroundColor: 'hsl(var(--color-error))',
    color: 'hsl(var(--color-error-content))',
  },

  '.snackbar-warning': {
    backgroundColor: 'hsl(var(--color-warning))',
    color: 'hsl(var(--color-warning-content))',
  },

  '.snackbar-info': {
    backgroundColor: 'hsl(var(--color-info))',
    color: 'hsl(var(--color-info-content))',
  },

  // Primary/Secondary/Tertiary variants
  '.snackbar-primary': {
    backgroundColor: 'hsl(var(--color-primary))',
    color: 'hsl(var(--color-primary-content))',
  },

  '.snackbar-secondary': {
    backgroundColor: 'hsl(var(--color-secondary))',
    color: 'hsl(var(--color-secondary-content))',
  },

  '.snackbar-tertiary': {
    backgroundColor: 'hsl(var(--color-tertiary))',
    color: 'hsl(var(--color-tertiary-content))',
  },

  // Icon
  '.snackbar-icon': {
    flexShrink: '0',
    fontSize: '1.25rem',
    width: '1.25rem',
    height: '1.25rem',
  },

  // Multiline variant
  '.snackbar-multiline': {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '1rem',
  },

  '.snackbar-multiline .snackbar-action': {
    alignSelf: 'flex-end',
    marginTop: '0.5rem',
  },
};
