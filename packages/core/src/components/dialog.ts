

/**
 * Native HTML <dialog> component styles (legacy plugin interface)
 * Authoritative styles live in dialog.css
 */
export const dialogStyles: Record<string, any> = {
  // Only the native element owns visibility, modality, and focus.
  'dialog.dialog': {
    position: 'fixed',
    margin: 'auto',
    padding: '0',
    border: 'none',
    width: 'calc(100% - 2rem)',
    maxWidth: '28rem',
    maxHeight: 'calc(100dvh - 2rem)',
    boxSizing: 'border-box',
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-on-surface)',
    borderRadius: 'var(--radius-2xl)',
    boxShadow: 'var(--shadow-2xl)',
    overflow: 'hidden',
  },

  'dialog.dialog::backdrop': {
    backgroundColor: 'color-mix(in srgb, var(--color-scrim) 50%, transparent)',
  },

  '.dialog-box': {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'calc(100dvh - 2rem)',
    overflow: 'hidden',
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
  'dialog.dialog.dialog-sm': {
    maxWidth: '20rem',
  },

  'dialog.dialog.dialog-md': {
    maxWidth: '28rem',
  },

  'dialog.dialog.dialog-lg': {
    maxWidth: '36rem',
  },

  'dialog.dialog.dialog-xl': {
    maxWidth: '48rem',
  },

  'dialog.dialog.dialog-full': {
    maxWidth: 'calc(100vw - 2rem)',
    maxHeight: 'calc(100vh - 2rem)',
  },

  // Fullscreen dialog (mobile)
  'dialog.dialog.dialog-fullscreen': {
    maxWidth: '100vw',
    maxHeight: '100vh',
    width: '100vw',
    height: '100vh',
    borderRadius: '0',
  },

  // Centered variant
  'dialog.dialog.dialog-center': {
    textAlign: 'center',
  },

  '.dialog-center .dialog-actions': {
    justifyContent: 'center',
  },

  // Alert dialog (simple confirm/alert)
  'dialog.dialog.dialog-alert': {
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
