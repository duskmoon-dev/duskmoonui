/**
 * Circle Menu component styles
 * CSS-only radial navigation menu with hamburger/X toggle
 */
export const circleMenuStyles: Record<string, any> = {
  // Container
  '.circle-menu': {
    '--circle-menu-size': '3rem',
    '--circle-menu-item-size': '3rem',
    '--circle-menu-radius': '5.5rem',
    '--circle-menu-icon-size': '1.25rem',
    '--circle-menu-bar-width': '1.125rem',
    '--circle-menu-bar-height': '0.1875rem',
    '--circle-menu-bar-gap': '0.375rem',
    '--circle-menu-btn-bg': 'var(--color-primary-container)',
    '--circle-menu-bar-color': 'var(--color-on-primary-container)',
    '--circle-menu-item-bg': 'var(--color-primary-container)',
    '--circle-menu-item-color': 'var(--color-on-primary-container)',
    '--circle-menu-item-ring': 'color-mix(in oklch, var(--color-primary) 30%, transparent)',
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'var(--circle-menu-size)',
    height: 'var(--circle-menu-size)',
  },

  // Hidden checkbox toggler
  '.circle-menu-toggler': {
    position: 'absolute',
    inset: '0',
    margin: 'auto',
    width: 'var(--circle-menu-size)',
    height: 'var(--circle-menu-size)',
    zIndex: '10',
    opacity: '0',
    cursor: 'pointer',
  },

  // Circular toggle button
  '.circle-menu-label': {
    position: 'absolute',
    inset: '0',
    margin: 'auto',
    display: 'block',
    width: 'var(--circle-menu-size)',
    height: 'var(--circle-menu-size)',
    borderRadius: '50%',
    backgroundColor: 'var(--circle-menu-btn-bg)',
    zIndex: '1',
    pointerEvents: 'none',
    transition: 'background-color 0.3s ease',
  },

  // Menu list
  '.circle-menu-list': {
    position: 'absolute',
    inset: '0',
    margin: '0',
    padding: '0',
    listStyle: 'none',
    pointerEvents: 'none',
  },

  // Menu items (collapsed)
  '.circle-menu-item': {
    position: 'absolute',
    inset: '0',
    margin: 'auto',
    width: 'var(--circle-menu-item-size)',
    height: 'var(--circle-menu-item-size)',
    opacity: '0',
    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
  },

  // Item links/buttons
  '.circle-menu-item a, .circle-menu-item button': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    textDecoration: 'none',
    fontSize: 'var(--circle-menu-icon-size)',
    color: 'var(--circle-menu-item-color)',
    backgroundColor: 'var(--circle-menu-item-bg)',
    border: 'none',
    cursor: 'pointer',
    pointerEvents: 'none',
    transition: 'box-shadow 0.2s ease, background-color 0.2s ease',
  },

  // Size variants
  '.circle-menu-sm': {
    '--circle-menu-size': '2.5rem',
    '--circle-menu-item-size': '2.5rem',
    '--circle-menu-radius': '4.5rem',
    '--circle-menu-icon-size': '1rem',
    '--circle-menu-bar-width': '0.9375rem',
    '--circle-menu-bar-gap': '0.3125rem',
  },

  '.circle-menu-lg': {
    '--circle-menu-size': '3.5rem',
    '--circle-menu-item-size': '3.5rem',
    '--circle-menu-radius': '6.5rem',
    '--circle-menu-icon-size': '1.5rem',
    '--circle-menu-bar-width': '1.3125rem',
    '--circle-menu-bar-gap': '0.4375rem',
  },

  // Color variants
  '.circle-menu-primary': {
    '--circle-menu-btn-bg': 'var(--color-primary)',
    '--circle-menu-bar-color': 'var(--color-primary-content)',
    '--circle-menu-item-bg': 'var(--color-primary)',
    '--circle-menu-item-color': 'var(--color-primary-content)',
    '--circle-menu-item-ring': 'color-mix(in oklch, var(--color-primary) 40%, transparent)',
  },

  '.circle-menu-secondary': {
    '--circle-menu-btn-bg': 'var(--color-secondary)',
    '--circle-menu-bar-color': 'var(--color-secondary-content)',
    '--circle-menu-item-bg': 'var(--color-secondary)',
    '--circle-menu-item-color': 'var(--color-secondary-content)',
    '--circle-menu-item-ring': 'color-mix(in oklch, var(--color-secondary) 40%, transparent)',
  },

  '.circle-menu-tertiary': {
    '--circle-menu-btn-bg': 'var(--color-tertiary)',
    '--circle-menu-bar-color': 'var(--color-tertiary-content)',
    '--circle-menu-item-bg': 'var(--color-tertiary)',
    '--circle-menu-item-color': 'var(--color-tertiary-content)',
    '--circle-menu-item-ring': 'color-mix(in oklch, var(--color-tertiary) 40%, transparent)',
  },

  '.circle-menu-info': {
    '--circle-menu-btn-bg': 'var(--color-info)',
    '--circle-menu-bar-color': 'var(--color-info-content)',
    '--circle-menu-item-bg': 'var(--color-info)',
    '--circle-menu-item-color': 'var(--color-info-content)',
    '--circle-menu-item-ring': 'color-mix(in oklch, var(--color-info) 40%, transparent)',
  },

  '.circle-menu-success': {
    '--circle-menu-btn-bg': 'var(--color-success)',
    '--circle-menu-bar-color': 'var(--color-success-content)',
    '--circle-menu-item-bg': 'var(--color-success)',
    '--circle-menu-item-color': 'var(--color-success-content)',
    '--circle-menu-item-ring': 'color-mix(in oklch, var(--color-success) 40%, transparent)',
  },

  '.circle-menu-warning': {
    '--circle-menu-btn-bg': 'var(--color-warning)',
    '--circle-menu-bar-color': 'var(--color-warning-content)',
    '--circle-menu-item-bg': 'var(--color-warning)',
    '--circle-menu-item-color': 'var(--color-warning-content)',
    '--circle-menu-item-ring': 'color-mix(in oklch, var(--color-warning) 40%, transparent)',
  },

  '.circle-menu-error': {
    '--circle-menu-btn-bg': 'var(--color-error)',
    '--circle-menu-bar-color': 'var(--color-error-content)',
    '--circle-menu-item-bg': 'var(--color-error)',
    '--circle-menu-item-color': 'var(--color-error-content)',
    '--circle-menu-item-ring': 'color-mix(in oklch, var(--color-error) 40%, transparent)',
  },
};
