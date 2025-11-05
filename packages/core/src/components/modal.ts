

/**
 * Modal component styles
 * Material Design 3-inspired modal dialog component
 */
export const modalStyles: Record<string, any> = {
  // Base modal overlay/backdrop
  '.modal-backdrop': {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '1000',
    opacity: '0',
    visibility: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Open state
  '.modal-backdrop.modal-open': {
    opacity: '1',
    visibility: 'visible',
  },

  // Modal container
  '.modal': {
    position: 'relative',
    backgroundColor: 'hsl(var(--color-surface))',
    borderRadius: '1rem',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
    maxWidth: '90vw',
    maxHeight: '90vh',
    width: '32rem',
    display: 'flex',
    flexDirection: 'column',
    transform: 'scale(0.9)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Modal open animation
  '.modal-backdrop.modal-open .modal': {
    transform: 'scale(1)',
  },

  // Modal header
  '.modal-header': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.5rem',
    borderBottom: '1px solid hsl(var(--color-outline-variant))',
  },

  // Modal title
  '.modal-title': {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: 'hsl(var(--color-on-surface))',
    lineHeight: '1.5',
  },

  // Modal close button
  '.modal-close': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2rem',
    height: '2rem',
    padding: '0',
    fontSize: '1.5rem',
    color: 'hsl(var(--color-on-surface-variant))',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  '.modal-close:hover': {
    backgroundColor: 'hsl(var(--color-surface-variant))',
    color: 'hsl(var(--color-on-surface))',
  },

  // Modal body
  '.modal-body': {
    padding: '1.5rem',
    overflowY: 'auto',
    flex: '1',
    color: 'hsl(var(--color-on-surface))',
  },

  // Modal footer
  '.modal-footer': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '0.75rem',
    padding: '1.5rem',
    borderTop: '1px solid hsl(var(--color-outline-variant))',
  },

  // Size variants
  '.modal-sm': {
    width: '20rem',
  },

  '.modal-md': {
    width: '32rem',
  },

  '.modal-lg': {
    width: '48rem',
  },

  '.modal-xl': {
    width: '64rem',
  },

  '.modal-full': {
    width: '95vw',
    height: '95vh',
    maxWidth: '95vw',
    maxHeight: '95vh',
  },

  // Position variants
  '.modal-backdrop-center': {
    alignItems: 'center',
    justifyContent: 'center',
  },

  '.modal-backdrop-top': {
    alignItems: 'flex-start',
    paddingTop: '2rem',
  },

  '.modal-backdrop-bottom': {
    alignItems: 'flex-end',
    paddingBottom: '2rem',
  },

  // Animation variants
  '.modal-slide-up': {
    transform: 'translateY(100px) scale(0.9)',
  },

  '.modal-backdrop.modal-open .modal-slide-up': {
    transform: 'translateY(0) scale(1)',
  },

  '.modal-slide-down': {
    transform: 'translateY(-100px) scale(0.9)',
  },

  '.modal-backdrop.modal-open .modal-slide-down': {
    transform: 'translateY(0) scale(1)',
  },

  '.modal-zoom': {
    transform: 'scale(0.7)',
  },

  '.modal-backdrop.modal-open .modal-zoom': {
    transform: 'scale(1)',
  },

  // Backdrop variants
  '.modal-backdrop-light': {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },

  '.modal-backdrop-blur': {
    backdropFilter: 'blur(8px)',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },

  // No backdrop
  '.modal-no-backdrop': {
    backgroundColor: 'transparent',
  },

  // Scrollable body
  '.modal-scrollable .modal-body': {
    maxHeight: '60vh',
    overflowY: 'auto',
  },

  // No padding variants
  '.modal-no-padding .modal-body': {
    padding: '0',
  },

  '.modal-no-padding .modal-header': {
    padding: '1.5rem 1.5rem 1rem',
    borderBottom: 'none',
  },

  '.modal-no-padding .modal-footer': {
    padding: '1rem 1.5rem 1.5rem',
    borderTop: 'none',
  },

  // Centered content
  '.modal-centered .modal-body': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  // Mobile responsive
  '@media (max-width: 640px)': {
    '.modal': {
      width: '95vw',
      maxWidth: '95vw',
    },

    '.modal-lg, .modal-xl': {
      width: '95vw',
    },

    '.modal-header, .modal-body, .modal-footer': {
      padding: '1rem',
    },
  },

  // Prevent body scroll when modal is open
  'body.modal-open': {
    overflow: 'hidden',
  },

  // Focus trap (for accessibility)
  '.modal:focus': {
    outline: 'none',
  },
};
