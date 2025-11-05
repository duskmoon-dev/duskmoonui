import type { CSSRuleObject } from 'tailwindcss/types/config';

/**
 * Bottom Sheet component styles
 * Material Design 3-inspired bottom sheet for mobile
 */
export const bottomSheetStyles: Record<string, CSSRuleObject> = {
  // Bottom sheet backdrop
  '.bottom-sheet-backdrop': {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: '998',
    opacity: '0',
    visibility: 'hidden',
    transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  '.bottom-sheet-backdrop-show': {
    opacity: '1',
    visibility: 'visible',
  },

  // Base bottom sheet
  '.bottom-sheet': {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '90vh',
    backgroundColor: 'hsl(var(--color-surface-container-low))',
    color: 'hsl(var(--color-on-surface))',
    borderRadius: '1.75rem 1.75rem 0 0',
    boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)',
    zIndex: '999',
    transform: 'translateY(100%)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  '.bottom-sheet-show': {
    transform: 'translateY(0)',
  },

  // Handle (drag indicator)
  '.bottom-sheet-handle': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.75rem',
    cursor: 'grab',
    flexShrink: '0',
  },

  '.bottom-sheet-handle::before': {
    content: '""',
    width: '2.5rem',
    height: '0.25rem',
    backgroundColor: 'hsl(var(--color-on-surface-variant))',
    borderRadius: '0.125rem',
    opacity: '0.4',
  },

  '.bottom-sheet-handle:active': {
    cursor: 'grabbing',
  },

  // Bottom sheet header
  '.bottom-sheet-header': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 1.5rem',
    borderBottom: '1px solid hsl(var(--color-outline-variant))',
    flexShrink: '0',
  },

  '.bottom-sheet-title': {
    fontSize: '1.25rem',
    fontWeight: '600',
    lineHeight: '1.75rem',
    margin: '0',
    flex: '1 1 auto',
  },

  // Bottom sheet body
  '.bottom-sheet-body': {
    flex: '1 1 auto',
    padding: '1.5rem',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
  },

  // Bottom sheet footer
  '.bottom-sheet-footer': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '0.5rem',
    padding: '1rem 1.5rem',
    borderTop: '1px solid hsl(var(--color-outline-variant))',
    flexShrink: '0',
  },

  // Close button
  '.bottom-sheet-close': {
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
      backgroundColor: 'rgba(var(--color-on-surface-rgb), 0.08)',
    },
  },

  // Height variants
  '.bottom-sheet-sm': {
    maxHeight: '40vh',
  },

  '.bottom-sheet-md': {
    maxHeight: '60vh',
  },

  '.bottom-sheet-lg': {
    maxHeight: '80vh',
  },

  '.bottom-sheet-full': {
    maxHeight: '100vh',
    borderRadius: '0',
  },

  // Snap points (partial open)
  '.bottom-sheet-partial': {
    transform: 'translateY(60%)',
  },

  '.bottom-sheet-partial.bottom-sheet-show': {
    transform: 'translateY(0)',
  },

  // Persistent bottom sheet (no backdrop)
  '.bottom-sheet-persistent': {
    boxShadow: '0 -2px 4px 0 rgba(0, 0, 0, 0.05)',
  },

  // Modal bottom sheet (with backdrop)
  '.bottom-sheet-modal': {
    zIndex: '999',
  },

  // Surface variants
  '.bottom-sheet-surface': {
    backgroundColor: 'hsl(var(--color-surface))',
  },

  '.bottom-sheet-surface-container': {
    backgroundColor: 'hsl(var(--color-surface-container))',
  },

  '.bottom-sheet-surface-container-high': {
    backgroundColor: 'hsl(var(--color-surface-container-high))',
  },

  // No handle variant
  '.bottom-sheet-no-handle .bottom-sheet-handle': {
    display: 'none',
  },

  // Scrollable body (with max-height)
  '.bottom-sheet-scrollable .bottom-sheet-body': {
    maxHeight: '50vh',
  },

  // No padding body
  '.bottom-sheet-no-padding .bottom-sheet-body': {
    padding: '0',
  },

  // Compact variant
  '.bottom-sheet-compact .bottom-sheet-header': {
    padding: '0.75rem 1rem',
  },

  '.bottom-sheet-compact .bottom-sheet-body': {
    padding: '1rem',
  },

  '.bottom-sheet-compact .bottom-sheet-footer': {
    padding: '0.75rem 1rem',
  },
};
