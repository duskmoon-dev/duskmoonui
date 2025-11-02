import type { CSSRuleObject } from 'tailwindcss/types/config';

/**
 * Button component styles
 * Material Design 3-inspired button with multiple variants
 */
export const buttonStyles: Record<string, CSSRuleObject> = {
  // Base button styles
  '.btn': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.625rem 1.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.25rem',
    borderRadius: '1.25rem', // Material Design 3 uses pill-shaped buttons
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    userSelect: 'none',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    outline: 'none',

    '&:disabled': {
      opacity: '0.38',
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },

    '&:focus-visible': {
      outline: '2px solid hsl(var(--color-primary))',
      outlineOffset: '2px',
    },
  },

  // Filled variant (default)
  '.btn-filled, .btn-primary': {
    backgroundColor: 'hsl(var(--color-primary))',
    color: 'hsl(var(--color-primary-content))',

    '&:hover': {
      backgroundColor: 'hsl(var(--color-primary-focus))',
      boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.15)',
    },

    '&:active': {
      boxShadow: 'none',
    },
  },

  '.btn-secondary': {
    backgroundColor: 'hsl(var(--color-secondary))',
    color: 'hsl(var(--color-secondary-content))',

    '&:hover': {
      backgroundColor: 'hsl(var(--color-secondary-focus))',
      boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.15)',
    },

    '&:active': {
      boxShadow: 'none',
    },
  },

  '.btn-tertiary': {
    backgroundColor: 'hsl(var(--color-tertiary))',
    color: 'hsl(var(--color-tertiary-content))',

    '&:hover': {
      backgroundColor: 'hsl(var(--color-tertiary-focus))',
      boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.15)',
    },

    '&:active': {
      boxShadow: 'none',
    },
  },

  // Outlined variant
  '.btn-outlined': {
    backgroundColor: 'transparent',
    color: 'hsl(var(--color-primary))',
    border: '1px solid hsl(var(--color-outline))',

    '&:hover': {
      backgroundColor: 'hsl(var(--color-primary) / 0.08)',
      borderColor: 'hsl(var(--color-primary))',
    },

    '&:active': {
      backgroundColor: 'hsl(var(--color-primary) / 0.12)',
    },
  },

  '.btn-outlined-secondary': {
    backgroundColor: 'transparent',
    color: 'hsl(var(--color-secondary))',
    border: '1px solid hsl(var(--color-outline))',

    '&:hover': {
      backgroundColor: 'hsl(var(--color-secondary) / 0.08)',
      borderColor: 'hsl(var(--color-secondary))',
    },

    '&:active': {
      backgroundColor: 'hsl(var(--color-secondary) / 0.12)',
    },
  },

  '.btn-outlined-tertiary': {
    backgroundColor: 'transparent',
    color: 'hsl(var(--color-tertiary))',
    border: '1px solid hsl(var(--color-outline))',

    '&:hover': {
      backgroundColor: 'hsl(var(--color-tertiary) / 0.08)',
      borderColor: 'hsl(var(--color-tertiary))',
    },

    '&:active': {
      backgroundColor: 'hsl(var(--color-tertiary) / 0.12)',
    },
  },

  // Text variant
  '.btn-text': {
    backgroundColor: 'transparent',
    color: 'hsl(var(--color-primary))',
    padding: '0.625rem 0.75rem',

    '&:hover': {
      backgroundColor: 'hsl(var(--color-primary) / 0.08)',
    },

    '&:active': {
      backgroundColor: 'hsl(var(--color-primary) / 0.12)',
    },
  },

  '.btn-text-secondary': {
    backgroundColor: 'transparent',
    color: 'hsl(var(--color-secondary))',
    padding: '0.625rem 0.75rem',

    '&:hover': {
      backgroundColor: 'hsl(var(--color-secondary) / 0.08)',
    },

    '&:active': {
      backgroundColor: 'hsl(var(--color-secondary) / 0.12)',
    },
  },

  '.btn-text-tertiary': {
    backgroundColor: 'transparent',
    color: 'hsl(var(--color-tertiary))',
    padding: '0.625rem 0.75rem',

    '&:hover': {
      backgroundColor: 'hsl(var(--color-tertiary) / 0.08)',
    },

    '&:active': {
      backgroundColor: 'hsl(var(--color-tertiary) / 0.12)',
    },
  },

  // Tonal variant (filled with container color)
  '.btn-tonal': {
    backgroundColor: 'hsl(var(--color-primary-container))',
    color: 'hsl(var(--color-on-primary-container))',

    '&:hover': {
      boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.15)',
      backgroundColor: 'hsl(var(--color-primary-container) / 0.9)',
    },

    '&:active': {
      boxShadow: 'none',
    },
  },

  '.btn-tonal-secondary': {
    backgroundColor: 'hsl(var(--color-secondary-container))',
    color: 'hsl(var(--color-on-secondary-container))',

    '&:hover': {
      boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.15)',
      backgroundColor: 'hsl(var(--color-secondary-container) / 0.9)',
    },

    '&:active': {
      boxShadow: 'none',
    },
  },

  '.btn-tonal-tertiary': {
    backgroundColor: 'hsl(var(--color-tertiary-container))',
    color: 'hsl(var(--color-on-tertiary-container))',

    '&:hover': {
      boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.15)',
      backgroundColor: 'hsl(var(--color-tertiary-container) / 0.9)',
    },

    '&:active': {
      boxShadow: 'none',
    },
  },

  // Size variants
  '.btn-sm': {
    padding: '0.5rem 1rem',
    fontSize: '0.813rem',
    lineHeight: '1rem',
  },

  '.btn-md': {
    padding: '0.625rem 1.5rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },

  '.btn-lg': {
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },

  // Icon button
  '.btn-icon': {
    padding: '0.75rem',
    borderRadius: '50%',
    width: '2.5rem',
    height: '2.5rem',
  },

  '.btn-icon-sm': {
    padding: '0.5rem',
    width: '2rem',
    height: '2rem',
  },

  '.btn-icon-lg': {
    padding: '1rem',
    width: '3rem',
    height: '3rem',
  },

  // Semantic colors
  '.btn-success': {
    backgroundColor: 'hsl(var(--color-success))',
    color: 'hsl(var(--color-success-content))',

    '&:hover': {
      backgroundColor: 'hsl(var(--color-success) / 0.9)',
      boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.15)',
    },
  },

  '.btn-error': {
    backgroundColor: 'hsl(var(--color-error))',
    color: 'hsl(var(--color-error-content))',

    '&:hover': {
      backgroundColor: 'hsl(var(--color-error) / 0.9)',
      boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.15)',
    },
  },

  '.btn-warning': {
    backgroundColor: 'hsl(var(--color-warning))',
    color: 'hsl(var(--color-warning-content))',

    '&:hover': {
      backgroundColor: 'hsl(var(--color-warning) / 0.9)',
      boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.15)',
    },
  },

  '.btn-info': {
    backgroundColor: 'hsl(var(--color-info))',
    color: 'hsl(var(--color-info-content))',

    '&:hover': {
      backgroundColor: 'hsl(var(--color-info) / 0.9)',
      boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.15)',
    },
  },

  // Block button
  '.btn-block': {
    display: 'flex',
    width: '100%',
  },
};
