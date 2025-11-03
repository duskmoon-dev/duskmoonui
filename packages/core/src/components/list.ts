import type { CSSRuleObject } from 'tailwindcss/types/config';

/**
 * List component styles
 * Material Design 3-inspired lists
 */
export const listStyles: Record<string, CSSRuleObject> = {
  // Base list
  '.list': {
    display: 'flex',
    flexDirection: 'column',
    padding: '0.5rem 0',
    margin: '0',
    listStyle: 'none',
    backgroundColor: 'hsl(var(--color-surface))',
  },

  // List item
  '.list-item': {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.75rem 1rem',
    minHeight: '3rem',
    color: 'hsl(var(--color-on-surface))',
    transition: 'background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Interactive list item
  '.list-item-interactive': {
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: 'hsl(var(--color-on-surface) / 0.08)',
    },

    '&:active': {
      backgroundColor: 'hsl(var(--color-on-surface) / 0.12)',
    },
  },

  // Active/selected state
  '.list-item-active, .list-item-active-primary': {
    backgroundColor: 'hsl(var(--color-primary-container))',
    color: 'hsl(var(--color-on-primary-container))',

    '&:hover': {
      backgroundColor: 'hsl(var(--color-primary-container) / 0.9)',
    },
  },

  '.list-item-active-secondary': {
    backgroundColor: 'hsl(var(--color-secondary-container))',
    color: 'hsl(var(--color-on-secondary-container))',

    '&:hover': {
      backgroundColor: 'hsl(var(--color-secondary-container) / 0.9)',
    },
  },

  '.list-item-active-tertiary': {
    backgroundColor: 'hsl(var(--color-tertiary-container))',
    color: 'hsl(var(--color-on-tertiary-container))',

    '&:hover': {
      backgroundColor: 'hsl(var(--color-tertiary-container) / 0.9)',
    },
  },

  // List item content
  '.list-item-content': {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.125rem',
    flex: '1 1 auto',
    minWidth: '0',
  },

  // List item text
  '.list-item-text': {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    fontWeight: '500',
    color: 'inherit',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  // List item secondary text
  '.list-item-secondary': {
    fontSize: '0.813rem',
    lineHeight: '1.125rem',
    color: 'hsl(var(--color-on-surface-variant))',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  '.list-item-active .list-item-secondary, .list-item-active-primary .list-item-secondary': {
    color: 'hsl(var(--color-on-primary-container))',
    opacity: '0.8',
  },

  '.list-item-active-secondary .list-item-secondary': {
    color: 'hsl(var(--color-on-secondary-container))',
    opacity: '0.8',
  },

  '.list-item-active-tertiary .list-item-secondary': {
    color: 'hsl(var(--color-on-tertiary-container))',
    opacity: '0.8',
  },

  // Leading element (icon, avatar, etc.)
  '.list-item-leading': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: '0',
    width: '2.5rem',
    height: '2.5rem',
    fontSize: '1.5rem',
  },

  // Trailing element (icon, button, etc.)
  '.list-item-trailing': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: '0',
    marginLeft: 'auto',
  },

  // Two-line list item
  '.list-item-two-line': {
    minHeight: '4rem',
    padding: '0.5rem 1rem',
  },

  // Three-line list item
  '.list-item-three-line': {
    minHeight: '5.5rem',
    padding: '0.75rem 1rem',
    alignItems: 'flex-start',
  },

  '.list-item-three-line .list-item-secondary': {
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },

  // List divider
  '.list-divider': {
    height: '1px',
    margin: '0',
    backgroundColor: 'hsl(var(--color-outline-variant))',
    border: 'none',
  },

  // Inset divider
  '.list-divider-inset': {
    marginLeft: '4.5rem',
  },

  // List subheader
  '.list-subheader': {
    padding: '0.75rem 1rem 0.5rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    lineHeight: '1.25rem',
    color: 'hsl(var(--color-on-surface-variant))',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },

  // Compact list
  '.list-compact .list-item': {
    padding: '0.5rem 0.75rem',
    minHeight: '2.5rem',
  },

  '.list-compact .list-item-leading': {
    width: '2rem',
    height: '2rem',
    fontSize: '1.25rem',
  },

  // Comfortable list
  '.list-comfortable .list-item': {
    padding: '1rem 1.5rem',
    minHeight: '4rem',
  },

  '.list-comfortable .list-item-leading': {
    width: '3rem',
    height: '3rem',
    fontSize: '1.75rem',
  },

  // Surface variants
  '.list-surface-container': {
    backgroundColor: 'hsl(var(--color-surface-container))',
  },

  '.list-surface-container-low': {
    backgroundColor: 'hsl(var(--color-surface-container-low))',
  },

  '.list-surface-container-high': {
    backgroundColor: 'hsl(var(--color-surface-container-high))',
  },

  // Bordered list
  '.list-bordered': {
    border: '1px solid hsl(var(--color-outline-variant))',
    borderRadius: '0.5rem',
  },

  // Nested list
  '.list-nested': {
    paddingLeft: '2rem',
  },

  // Disabled list item
  '.list-item-disabled': {
    opacity: '0.38',
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
};
