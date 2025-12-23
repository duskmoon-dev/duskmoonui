

/**
 * Dialog (Modal) component styles
 * Material Design 3-inspired dialogs
 */
export const dialogStyles: Record<string, any> = {
  // Dialog overlay/backdrop
  '.dialog-backdrop': {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: '999',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    opacity: '0',
    visibility: 'hidden',
    transition: 'opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  '.dialog-backdrop-show': {
    opacity: '1',
    visibility: 'visible',
  },

  // Base dialog
  '.dialog': {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '28rem',
    maxHeight: 'calc(100vh - 2rem)',
    backgroundColor: 'var(--color-surface-container-high)',
    color: 'var(--color-on-surface)',
    borderRadius: '1.75rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transform: 'scale(0.9)',
    opacity: '0',
    transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  '.dialog-backdrop-show .dialog': {
    transform: 'scale(1)',
    opacity: '1',
  },

  // Dialog header
  '.dialog-header': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.5rem 1.5rem 1rem',
    flexShrink: '0',
  },

  '.dialog-title': {
    fontSize: '1.5rem',
    fontWeight: '500',
    lineHeight: '2rem',
    margin: '0',
    flex: '1 1 auto',
  },

  // Dialog body
  '.dialog-body': {
    flex: '1 1 auto',
    padding: '0 1.5rem 1rem',
    overflowY: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.5rem',
    color: 'var(--color-on-surface-variant)',
  },

  // Dialog footer/actions
  '.dialog-actions': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '0.5rem',
    padding: '1rem 1.5rem 1.5rem',
    flexShrink: '0',
  },

  '.dialog-actions-start': {
    justifyContent: 'flex-start',
  },

  '.dialog-actions-center': {
    justifyContent: 'center',
  },

  '.dialog-actions-between': {
    justifyContent: 'space-between',
  },

  // Close button
  '.dialog-close': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2.5rem',
    height: '2.5rem',
    padding: '0.5rem',
    fontSize: '1.25rem',
    color: 'inherit',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-on-surface) 8%, transparent)',
    },

    '&:active': {
      backgroundColor: 'color-mix(in oklch, var(--color-on-surface) 12%, transparent)',
    },
  },

  // Size variants
  '.dialog-sm': {
    maxWidth: '20rem',
  },

  '.dialog-md': {
    maxWidth: '28rem',
  },

  '.dialog-lg': {
    maxWidth: '36rem',
  },

  '.dialog-xl': {
    maxWidth: '48rem',
  },

  '.dialog-full': {
    maxWidth: 'calc(100vw - 2rem)',
    maxHeight: 'calc(100vh - 2rem)',
  },

  // Fullscreen dialog (mobile)
  '.dialog-fullscreen': {
    maxWidth: '100vw',
    maxHeight: '100vh',
    width: '100vw',
    height: '100vh',
    borderRadius: '0',
  },

  // Centered variant
  '.dialog-center': {
    textAlign: 'center',
  },

  '.dialog-center .dialog-actions': {
    justifyContent: 'center',
  },

  // Alert dialog (simple confirm/alert)
  '.dialog-alert': {
    maxWidth: '20rem',
  },

  '.dialog-alert .dialog-body': {
    padding: '1rem 1.5rem',
  },

  // Icon in dialog
  '.dialog-icon': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '3rem',
    height: '3rem',
    margin: '0 auto 1rem',
    fontSize: '2rem',
    borderRadius: '50%',
  },

  '.dialog-icon-primary': {
    backgroundColor: 'var(--color-primary-container)',
    color: 'var(--color-on-primary-container)',
  },

  '.dialog-icon-secondary': {
    backgroundColor: 'var(--color-secondary-container)',
    color: 'var(--color-on-secondary-container)',
  },

  '.dialog-icon-tertiary': {
    backgroundColor: 'var(--color-tertiary-container)',
    color: 'var(--color-on-tertiary-container)',
  },

  '.dialog-icon-success': {
    backgroundColor: 'color-mix(in oklch, var(--color-success) 15%, transparent)',
    color: 'var(--color-success)',
  },

  '.dialog-icon-error': {
    backgroundColor: 'color-mix(in oklch, var(--color-error) 15%, transparent)',
    color: 'var(--color-error)',
  },

  '.dialog-icon-warning': {
    backgroundColor: 'color-mix(in oklch, var(--color-warning) 15%, transparent)',
    color: 'var(--color-warning)',
  },

  '.dialog-icon-info': {
    backgroundColor: 'color-mix(in oklch, var(--color-info) 15%, transparent)',
    color: 'var(--color-info)',
  },

  // Scrollable body
  '.dialog-scrollable .dialog-body': {
    maxHeight: '20rem',
  },

  // No padding variant
  '.dialog-no-padding .dialog-body': {
    padding: '0',
  },
};
