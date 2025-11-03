import type { CSSRuleObject } from 'tailwindcss/types/config';

/**
 * Bottom Navigation component styles
 * Material Design 3-inspired bottom navigation bar
 */
export const bottomNavigationStyles: Record<string, CSSRuleObject> = {
  // Base bottom navigation
  '.bottom-nav': {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '0.5rem 0',
    backgroundColor: 'hsl(var(--color-surface-container))',
    borderTop: '1px solid hsl(var(--color-outline-variant))',
    zIndex: '40',
    minHeight: '4rem',
  },

  // Bottom nav item
  '.bottom-nav-item': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.25rem',
    padding: '0.5rem 0.75rem',
    minWidth: '4rem',
    maxWidth: '6rem',
    color: 'hsl(var(--color-on-surface-variant))',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    textDecoration: 'none',
    position: 'relative',

    '&:hover': {
      backgroundColor: 'hsl(var(--color-on-surface) / 0.08)',
    },

    '&:active': {
      backgroundColor: 'hsl(var(--color-on-surface) / 0.12)',
    },
  },

  // Active item - Primary
  '.bottom-nav-item-active, .bottom-nav-item-active-primary': {
    color: 'hsl(var(--color-on-secondary-container))',
    backgroundColor: 'hsl(var(--color-secondary-container))',

    '&:hover': {
      backgroundColor: 'hsl(var(--color-secondary-container) / 0.9)',
    },
  },

  // Active item - Secondary
  '.bottom-nav-item-active-secondary': {
    color: 'hsl(var(--color-on-secondary-container))',
    backgroundColor: 'hsl(var(--color-secondary-container))',

    '&:hover': {
      backgroundColor: 'hsl(var(--color-secondary-container) / 0.9)',
    },
  },

  // Active item - Tertiary
  '.bottom-nav-item-active-tertiary': {
    color: 'hsl(var(--color-on-tertiary-container))',
    backgroundColor: 'hsl(var(--color-tertiary-container))',

    '&:hover': {
      backgroundColor: 'hsl(var(--color-tertiary-container) / 0.9)',
    },
  },

  // Bottom nav icon
  '.bottom-nav-icon': {
    fontSize: '1.5rem',
    width: '1.5rem',
    height: '1.5rem',
    flexShrink: '0',
  },

  // Bottom nav label
  '.bottom-nav-label': {
    fontSize: '0.75rem',
    fontWeight: '500',
    lineHeight: '1rem',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
  },

  // Badge on nav item
  '.bottom-nav-badge': {
    position: 'absolute',
    top: '0.375rem',
    right: '0.75rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '1.125rem',
    height: '1.125rem',
    padding: '0.125rem 0.313rem',
    fontSize: '0.625rem',
    fontWeight: '600',
    lineHeight: '0.875rem',
    borderRadius: '0.563rem',
    backgroundColor: 'hsl(var(--color-error))',
    color: 'hsl(var(--color-error-content))',
  },

  '.bottom-nav-badge-dot': {
    width: '0.5rem',
    height: '0.5rem',
    minWidth: '0.5rem',
    padding: '0',
  },

  // Label-only mode (no icons)
  '.bottom-nav-labels-only .bottom-nav-item': {
    flexDirection: 'row',
    minWidth: 'auto',
  },

  '.bottom-nav-labels-only .bottom-nav-label': {
    fontSize: '0.875rem',
  },

  // Shift mode (label only shows on active)
  '.bottom-nav-shift .bottom-nav-item:not(.bottom-nav-item-active) .bottom-nav-label': {
    display: 'none',
  },

  '.bottom-nav-shift .bottom-nav-item-active': {
    minWidth: '6rem',
  },

  // Surface variants
  '.bottom-nav-surface': {
    backgroundColor: 'hsl(var(--color-surface))',
  },

  '.bottom-nav-surface-container-low': {
    backgroundColor: 'hsl(var(--color-surface-container-low))',
  },

  '.bottom-nav-surface-container-high': {
    backgroundColor: 'hsl(var(--color-surface-container-high))',
    boxShadow: '0 -1px 2px 0 rgba(0, 0, 0, 0.05)',
  },

  // Transparent variant
  '.bottom-nav-transparent': {
    backgroundColor: 'transparent',
    borderTop: 'none',
  },

  // Compact variant
  '.bottom-nav-compact': {
    minHeight: '3.5rem',
    padding: '0.25rem 0',
  },

  '.bottom-nav-compact .bottom-nav-item': {
    padding: '0.375rem 0.5rem',
    minWidth: '3rem',
  },

  '.bottom-nav-compact .bottom-nav-icon': {
    fontSize: '1.25rem',
    width: '1.25rem',
    height: '1.25rem',
  },

  '.bottom-nav-compact .bottom-nav-label': {
    fontSize: '0.688rem',
  },

  // No border variant
  '.bottom-nav-borderless': {
    borderTop: 'none',
  },

  // Disabled item
  '.bottom-nav-item-disabled': {
    opacity: '0.38',
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
};
