import type { CSSRuleObject } from 'tailwindcss/types/config';

/**
 * Drawer component styles
 * Material Design 3-inspired navigation drawer
 */
export const drawerStyles: Record<string, CSSRuleObject> = {
  // Base drawer styles
  '.drawer': {
    position: 'fixed',
    top: '0',
    bottom: '0',
    width: '16rem',
    backgroundColor: 'hsl(var(--color-surface-container-low))',
    color: 'hsl(var(--color-on-surface))',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: '40',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },

  // Left drawer (default)
  '.drawer-left': {
    left: '0',
    transform: 'translateX(-100%)',
  },

  '.drawer-left.drawer-open': {
    transform: 'translateX(0)',
  },

  // Right drawer
  '.drawer-right': {
    right: '0',
    transform: 'translateX(100%)',
  },

  '.drawer-right.drawer-open': {
    transform: 'translateX(0)',
  },

  // Drawer open state
  '.drawer-open': {
    transform: 'translateX(0)',
  },

  // Surface variants
  '.drawer-surface': {
    backgroundColor: 'hsl(var(--color-surface))',
  },

  '.drawer-surface-container': {
    backgroundColor: 'hsl(var(--color-surface-container))',
  },

  '.drawer-surface-container-low': {
    backgroundColor: 'hsl(var(--color-surface-container-low))',
  },

  '.drawer-surface-container-high': {
    backgroundColor: 'hsl(var(--color-surface-container-high))',
  },

  // Drawer header
  '.drawer-header': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    borderBottom: '1px solid hsl(var(--color-outline-variant))',
  },

  '.drawer-title': {
    fontSize: '1.25rem',
    fontWeight: '600',
    lineHeight: '1.75rem',
    margin: '0',
  },

  // Drawer body
  '.drawer-body': {
    flex: '1 1 auto',
    padding: '0.5rem',
    overflowY: 'auto',
  },

  // Drawer footer
  '.drawer-footer': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem',
    borderTop: '1px solid hsl(var(--color-outline-variant))',
  },

  // Drawer navigation items
  '.drawer-item': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.25rem',
    color: 'hsl(var(--color-on-surface))',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '1.75rem',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    textDecoration: 'none',
    width: '100%',
    margin: '0.125rem 0',

    '&:hover': {
      backgroundColor: 'color-mix(in srgb, hsl(var(--color-on-surface)) 08%, transparent)',
    },

    '&:active': {
      backgroundColor: 'color-mix(in srgb, hsl(var(--color-on-surface)) 12%, transparent)',
    },

    '&:focus-visible': {
      outline: '2px solid hsl(var(--color-primary))',
      outlineOffset: '2px',
    },
  },

  // Active drawer item - Primary
  '.drawer-item-active, .drawer-item-active-primary': {
    backgroundColor: 'hsl(var(--color-primary-container))',
    color: 'hsl(var(--color-on-primary-container))',

    '&:hover': {
      backgroundColor: 'color-mix(in srgb, hsl(var(--color-primary-container)) 9%, transparent)',
    },
  },

  // Active drawer item - Secondary
  '.drawer-item-active-secondary': {
    backgroundColor: 'hsl(var(--color-secondary-container))',
    color: 'hsl(var(--color-on-secondary-container))',

    '&:hover': {
      backgroundColor: 'color-mix(in srgb, hsl(var(--color-secondary-container)) 9%, transparent)',
    },
  },

  // Active drawer item - Tertiary
  '.drawer-item-active-tertiary': {
    backgroundColor: 'hsl(var(--color-tertiary-container))',
    color: 'hsl(var(--color-on-tertiary-container))',

    '&:hover': {
      backgroundColor: 'color-mix(in srgb, hsl(var(--color-tertiary-container)) 9%, transparent)',
    },
  },

  // Drawer item icon
  '.drawer-item-icon': {
    fontSize: '1.25rem',
    width: '1.5rem',
    height: '1.5rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: '0',
  },

  // Drawer item badge
  '.drawer-item-badge': {
    marginLeft: 'auto',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '1.25rem',
    height: '1.25rem',
    padding: '0.125rem 0.375rem',
    fontSize: '0.688rem',
    fontWeight: '600',
    borderRadius: '0.625rem',
    backgroundColor: 'hsl(var(--color-error))',
    color: 'hsl(var(--color-error-content))',
  },

  // Drawer divider
  '.drawer-divider': {
    height: '1px',
    margin: '0.5rem 0',
    backgroundColor: 'hsl(var(--color-outline-variant))',
  },

  // Drawer section label
  '.drawer-label': {
    padding: '0.75rem 1rem 0.5rem',
    fontSize: '0.75rem',
    fontWeight: '600',
    lineHeight: '1rem',
    color: 'hsl(var(--color-on-surface-variant))',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },

  // Size variants
  '.drawer-sm': {
    width: '12rem',
  },

  '.drawer-md': {
    width: '16rem',
  },

  '.drawer-lg': {
    width: '20rem',
  },

  '.drawer-xl': {
    width: '24rem',
  },

  // Rail variant (collapsed, icon-only)
  '.drawer-rail': {
    width: '5rem',
  },

  '.drawer-rail .drawer-item': {
    flexDirection: 'column',
    padding: '0.75rem 0.5rem',
    gap: '0.25rem',
    textAlign: 'center',
  },

  '.drawer-rail .drawer-item-icon': {
    fontSize: '1.5rem',
    width: '2rem',
    height: '2rem',
  },

  '.drawer-rail .drawer-label': {
    display: 'none',
  },

  '.drawer-rail .drawer-item-badge': {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    marginLeft: '0',
  },

  // Permanent variant (always visible)
  '.drawer-permanent': {
    position: 'static',
    transform: 'none',
    boxShadow: 'none',
    borderRight: '1px solid hsl(var(--color-outline-variant))',
  },

  '.drawer-permanent.drawer-right': {
    borderRight: 'none',
    borderLeft: '1px solid hsl(var(--color-outline-variant))',
  },

  // Modal variant with backdrop
  '.drawer-backdrop': {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: '39',
    opacity: '0',
    visibility: 'hidden',
    transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  '.drawer-backdrop.drawer-backdrop-show': {
    opacity: '1',
    visibility: 'visible',
  },

  // Close button
  '.drawer-close': {
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
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

    '&:hover': {
      backgroundColor: 'color-mix(in srgb, hsl(var(--color-on-surface)) 08%, transparent)',
    },

    '&:active': {
      backgroundColor: 'color-mix(in srgb, hsl(var(--color-on-surface)) 12%, transparent)',
    },
  },

  // Nested drawer items (sub-menu)
  '.drawer-item-nested': {
    paddingLeft: '2.5rem',
  },

  '.drawer-item-nested-2': {
    paddingLeft: '3.5rem',
  },
};
