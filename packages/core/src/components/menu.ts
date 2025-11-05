import type { CSSRuleObject } from 'tailwindcss/types/config';

/**
 * Menu (Dropdown Menu) component styles
 * Material Design 3-inspired menus
 */
export const menuStyles: Record<string, CSSRuleObject> = {
  // Base menu container
  '.menu': {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '10rem',
    maxWidth: '16rem',
    padding: '0.5rem',
    margin: '0',
    listStyle: 'none',
    backgroundColor: 'hsl(var(--color-surface-container-high))',
    color: 'hsl(var(--color-on-surface))',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    zIndex: '100',
    opacity: '0',
    visibility: 'hidden',
    transform: 'scale(0.95)',
    transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  '.menu-show': {
    opacity: '1',
    visibility: 'visible',
    transform: 'scale(1)',
  },

  // Menu item
  '.menu-item': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.625rem 0.75rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    color: 'hsl(var(--color-on-surface))',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    textAlign: 'left',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    width: '100%',

    '&:hover': {
      backgroundColor: 'color-mix(in srgb, hsl(var(--color-on-surface)) 08%, transparent)',
    },

    '&:active': {
      backgroundColor: 'color-mix(in srgb, hsl(var(--color-on-surface)) 12%, transparent)',
    },

    '&:focus-visible': {
      outline: '2px solid hsl(var(--color-primary))',
      outlineOffset: '-2px',
    },
  },

  // Active menu item
  '.menu-item-active, .menu-item-active-primary': {
    backgroundColor: 'hsl(var(--color-primary-container))',
    color: 'hsl(var(--color-on-primary-container))',

    '&:hover': {
      backgroundColor: 'color-mix(in srgb, hsl(var(--color-primary-container)) 9%, transparent)',
    },
  },

  '.menu-item-active-secondary': {
    backgroundColor: 'hsl(var(--color-secondary-container))',
    color: 'hsl(var(--color-on-secondary-container))',

    '&:hover': {
      backgroundColor: 'color-mix(in srgb, hsl(var(--color-secondary-container)) 9%, transparent)',
    },
  },

  '.menu-item-active-tertiary': {
    backgroundColor: 'hsl(var(--color-tertiary-container))',
    color: 'hsl(var(--color-on-tertiary-container))',

    '&:hover': {
      backgroundColor: 'color-mix(in srgb, hsl(var(--color-tertiary-container)) 9%, transparent)',
    },
  },

  // Disabled menu item
  '.menu-item-disabled': {
    opacity: '0.38',
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },

  // Menu item with icon
  '.menu-item-icon': {
    fontSize: '1.25rem',
    width: '1.25rem',
    height: '1.25rem',
    flexShrink: '0',
  },

  // Menu item with trailing element (shortcut, badge, etc.)
  '.menu-item-trailing': {
    marginLeft: 'auto',
    fontSize: '0.75rem',
    color: 'hsl(var(--color-on-surface-variant))',
    paddingLeft: '1rem',
  },

  // Menu divider
  '.menu-divider': {
    height: '1px',
    margin: '0.5rem 0',
    backgroundColor: 'hsl(var(--color-outline-variant))',
    border: 'none',
  },

  // Menu label/header
  '.menu-label': {
    padding: '0.5rem 0.75rem',
    fontSize: '0.75rem',
    fontWeight: '600',
    lineHeight: '1rem',
    color: 'hsl(var(--color-on-surface-variant))',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },

  // Submenu indicator
  '.menu-item-submenu': {
    position: 'relative',

    '&::after': {
      content: '"›"',
      marginLeft: 'auto',
      fontSize: '1.25rem',
      paddingLeft: '0.5rem',
    },
  },

  // Submenu
  '.menu-submenu': {
    position: 'absolute',
    left: '100%',
    top: '-0.5rem',
    marginLeft: '0.25rem',
  },

  // Menu positioning
  '.menu-top': {
    bottom: '100%',
    marginBottom: '0.5rem',
  },

  '.menu-bottom': {
    top: '100%',
    marginTop: '0.5rem',
  },

  '.menu-left': {
    right: '100%',
    marginRight: '0.5rem',
  },

  '.menu-right': {
    left: '100%',
    marginLeft: '0.5rem',
  },

  // Menu with checkboxes/radio
  '.menu-item-checkbox, .menu-item-radio': {
    paddingLeft: '2.5rem',
    position: 'relative',
  },

  '.menu-item-checkbox::before, .menu-item-radio::before': {
    content: '""',
    position: 'absolute',
    left: '0.75rem',
    width: '1rem',
    height: '1rem',
    border: '2px solid hsl(var(--color-on-surface-variant))',
    borderRadius: '0.125rem',
  },

  '.menu-item-radio::before': {
    borderRadius: '50%',
  },

  '.menu-item-checkbox.checked::after': {
    content: '"✓"',
    position: 'absolute',
    left: '0.875rem',
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'hsl(var(--color-primary))',
  },

  '.menu-item-radio.checked::after': {
    content: '""',
    position: 'absolute',
    left: '1rem',
    width: '0.5rem',
    height: '0.5rem',
    borderRadius: '50%',
    backgroundColor: 'hsl(var(--color-primary))',
  },

  // Compact menu
  '.menu-compact': {
    minWidth: '8rem',
  },

  '.menu-compact .menu-item': {
    padding: '0.5rem 0.625rem',
    fontSize: '0.813rem',
  },

  // Wide menu
  '.menu-wide': {
    minWidth: '14rem',
    maxWidth: '20rem',
  },

  // Context menu (right-click menu)
  '.menu-context': {
    position: 'fixed',
  },

  // Surface variant
  '.menu-surface-container-highest': {
    backgroundColor: 'hsl(var(--color-surface-container-highest))',
  },

  // Dense menu (no padding between items)
  '.menu-dense': {
    padding: '0',
  },

  '.menu-dense .menu-item': {
    borderRadius: '0',
  },

  '.menu-dense .menu-item:first-child': {
    borderTopLeftRadius: '0.5rem',
    borderTopRightRadius: '0.5rem',
  },

  '.menu-dense .menu-item:last-child': {
    borderBottomLeftRadius: '0.5rem',
    borderBottomRightRadius: '0.5rem',
  },
};
