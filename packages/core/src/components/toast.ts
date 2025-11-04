import type { CSSRuleObject } from 'tailwindcss/types/config';

/**
 * Toast notification component styles
 * Material Design 3-inspired toast/notification component
 */
export const toastStyles: Record<string, CSSRuleObject> = {
  // Toast container (holds multiple toasts)
  '.toast-container': {
    position: 'fixed',
    zIndex: '9999',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    padding: '1rem',
    pointerEvents: 'none',
  },

  // Container positions
  '.toast-container-top-right': {
    top: '0',
    right: '0',
  },

  '.toast-container-top-left': {
    top: '0',
    left: '0',
  },

  '.toast-container-top-center': {
    top: '0',
    left: '50%',
    transform: 'translateX(-50%)',
  },

  '.toast-container-bottom-right': {
    bottom: '0',
    right: '0',
  },

  '.toast-container-bottom-left': {
    bottom: '0',
    left: '0',
  },

  '.toast-container-bottom-center': {
    bottom: '0',
    left: '50%',
    transform: 'translateX(-50%)',
  },

  // Base toast
  '.toast': {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    minWidth: '20rem',
    maxWidth: '28rem',
    padding: '1rem 1.25rem',
    backgroundColor: 'hsl(var(--color-surface))',
    color: 'hsl(var(--color-on-surface))',
    border: '1px solid hsl(var(--color-outline-variant))',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    pointerEvents: 'auto',
    opacity: '0',
    transform: 'translateX(100%)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Show animation
  '.toast-show': {
    opacity: '1',
    transform: 'translateX(0)',
  },

  // Toast variants by type
  '.toast-info': {
    backgroundColor: 'hsl(var(--color-primary-container))',
    color: 'hsl(var(--color-on-primary-container))',
    borderColor: 'hsl(var(--color-primary))',
  },

  '.toast-success': {
    backgroundColor: 'hsl(var(--color-success-container))',
    color: 'hsl(var(--color-on-success-container))',
    borderColor: 'hsl(var(--color-success))',
  },

  '.toast-warning': {
    backgroundColor: 'hsl(var(--color-warning-container))',
    color: 'hsl(var(--color-on-warning-container))',
    borderColor: 'hsl(var(--color-warning))',
  },

  '.toast-error': {
    backgroundColor: 'hsl(var(--color-error-container))',
    color: 'hsl(var(--color-on-error-container))',
    borderColor: 'hsl(var(--color-error))',
  },

  // Toast icon
  '.toast-icon': {
    flexShrink: '0',
    fontSize: '1.25rem',
    lineHeight: '1.5',
  },

  // Toast content
  '.toast-content': {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },

  // Toast title
  '.toast-title': {
    fontSize: '0.9375rem',
    fontWeight: '600',
    lineHeight: '1.5',
  },

  // Toast message
  '.toast-message': {
    fontSize: '0.875rem',
    lineHeight: '1.5',
    opacity: '0.9',
  },

  // Toast close button
  '.toast-close': {
    flexShrink: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.5rem',
    height: '1.5rem',
    padding: '0',
    fontSize: '1.25rem',
    color: 'inherit',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: '0.7',
  },

  '.toast-close:hover': {
    opacity: '1',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },

  // Toast action button
  '.toast-action': {
    marginTop: '0.5rem',
    padding: '0.375rem 0.75rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'hsl(var(--color-primary))',
    backgroundColor: 'transparent',
    border: '1px solid hsl(var(--color-primary))',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  '.toast-action:hover': {
    backgroundColor: 'hsl(var(--color-primary) / 0.1)',
  },

  // Progress bar
  '.toast-progress': {
    position: 'absolute',
    bottom: '0',
    left: '0',
    height: '3px',
    backgroundColor: 'currentColor',
    borderRadius: '0 0 0 0.5rem',
    transition: 'width linear',
    opacity: '0.5',
  },

  // Size variants
  '.toast-sm': {
    minWidth: '16rem',
    maxWidth: '20rem',
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
  },

  '.toast-lg': {
    minWidth: '24rem',
    maxWidth: '32rem',
    padding: '1.25rem 1.5rem',
  },

  // Animation variants (for left-aligned toasts)
  '.toast-container-top-left .toast, .toast-container-bottom-left .toast': {
    transform: 'translateX(-100%)',
  },

  '.toast-container-top-left .toast-show, .toast-container-bottom-left .toast-show': {
    transform: 'translateX(0)',
  },

  // Animation variants (for center-aligned toasts)
  '.toast-container-top-center .toast, .toast-container-bottom-center .toast': {
    transform: 'translateY(-100%)',
  },

  '.toast-container-top-center .toast-show, .toast-container-bottom-center .toast-show': {
    transform: 'translateY(0)',
  },

  // Stacked appearance
  '.toast-container-stacked .toast:not(:first-child)': {
    marginTop: '-0.5rem',
    opacity: '0.8',
    transform: 'scale(0.95)',
  },

  // With border accent
  '.toast-accent::before': {
    content: '""',
    position: 'absolute',
    left: '0',
    top: '0',
    bottom: '0',
    width: '4px',
    backgroundColor: 'currentColor',
    borderRadius: '0.5rem 0 0 0.5rem',
  },

  // Compact variant
  '.toast-compact': {
    padding: '0.75rem 1rem',
    gap: '0.5rem',
  },

  '.toast-compact .toast-icon': {
    fontSize: '1rem',
  },

  '.toast-compact .toast-title': {
    fontSize: '0.875rem',
  },

  '.toast-compact .toast-message': {
    fontSize: '0.8125rem',
  },

  // Mobile responsive
  '@media (max-width: 640px)': {
    '.toast': {
      minWidth: 'calc(100vw - 2rem)',
      maxWidth: 'calc(100vw - 2rem)',
    },

    '.toast-container': {
      left: '0',
      right: '0',
      transform: 'none',
    },
  },
};
