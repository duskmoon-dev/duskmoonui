

/**
 * Button component styles
 * Material Design 3-inspired button with multiple variants
 */
export const buttonStyles: Record<string, any> = {
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
      outline: '2px solid var(--color-primary)',
      outlineOffset: '2px',
    },
  },

  // Filled variant (default)
  '.btn-filled, .btn-primary': {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-primary-content)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-primary), black 10%)',
      boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.15)',
    },

    '&:active': {
      boxShadow: 'none',
    },
  },

  '.btn-secondary': {
    backgroundColor: 'var(--color-secondary)',
    color: 'var(--color-secondary-content)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-secondary), black 10%)',
      boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.15)',
    },

    '&:active': {
      boxShadow: 'none',
    },
  },

  '.btn-tertiary': {
    backgroundColor: 'var(--color-tertiary)',
    color: 'var(--color-tertiary-content)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-tertiary), black 10%)',
      boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.15)',
    },

    '&:active': {
      boxShadow: 'none',
    },
  },

  // Outlined variant
  '.btn-outlined': {
    backgroundColor: 'transparent',
    color: 'var(--color-primary)',
    border: '1px solid var(--color-outline)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-primary) 8%, transparent)',
      borderColor: 'var(--color-primary)',
    },

    '&:active': {
      backgroundColor: 'color-mix(in oklch, var(--color-primary) 12%, transparent)',
    },
  },

  '.btn-outlined-secondary': {
    backgroundColor: 'transparent',
    color: 'var(--color-secondary)',
    border: '1px solid var(--color-outline)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-secondary) 8%, transparent)',
      borderColor: 'var(--color-secondary)',
    },

    '&:active': {
      backgroundColor: 'color-mix(in oklch, var(--color-secondary) 12%, transparent)',
    },
  },

  '.btn-outlined-tertiary': {
    backgroundColor: 'transparent',
    color: 'var(--color-tertiary)',
    border: '1px solid var(--color-outline)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-tertiary) 8%, transparent)',
      borderColor: 'var(--color-tertiary)',
    },

    '&:active': {
      backgroundColor: 'color-mix(in oklch, var(--color-tertiary) 12%, transparent)',
    },
  },

  // Text variant
  '.btn-text': {
    backgroundColor: 'transparent',
    color: 'var(--color-primary)',
    padding: '0.625rem 0.75rem',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-primary) 8%, transparent)',
    },

    '&:active': {
      backgroundColor: 'color-mix(in oklch, var(--color-primary) 12%, transparent)',
    },
  },

  '.btn-text-secondary': {
    backgroundColor: 'transparent',
    color: 'var(--color-secondary)',
    padding: '0.625rem 0.75rem',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-secondary) 8%, transparent)',
    },

    '&:active': {
      backgroundColor: 'color-mix(in oklch, var(--color-secondary) 12%, transparent)',
    },
  },

  '.btn-text-tertiary': {
    backgroundColor: 'transparent',
    color: 'var(--color-tertiary)',
    padding: '0.625rem 0.75rem',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-tertiary) 8%, transparent)',
    },

    '&:active': {
      backgroundColor: 'color-mix(in oklch, var(--color-tertiary) 12%, transparent)',
    },
  },

  // Tonal variant (filled with container color)
  '.btn-tonal': {
    backgroundColor: 'var(--color-primary-container)',
    color: 'var(--color-on-primary-container)',

    '&:hover': {
      boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.15)',
      backgroundColor: 'color-mix(in oklch, var(--color-primary-container), black 5%)',
    },

    '&:active': {
      boxShadow: 'none',
    },
  },

  '.btn-tonal-secondary': {
    backgroundColor: 'var(--color-secondary-container)',
    color: 'var(--color-on-secondary-container)',

    '&:hover': {
      boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.15)',
      backgroundColor: 'color-mix(in oklch, var(--color-secondary-container), black 5%)',
    },

    '&:active': {
      boxShadow: 'none',
    },
  },

  '.btn-tonal-tertiary': {
    backgroundColor: 'var(--color-tertiary-container)',
    color: 'var(--color-on-tertiary-container)',

    '&:hover': {
      boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.15)',
      backgroundColor: 'color-mix(in oklch, var(--color-tertiary-container), black 5%)',
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
    backgroundColor: 'var(--color-success)',
    color: 'var(--color-success-content)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-success), black 10%)',
      boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.15)',
    },
  },

  '.btn-error': {
    backgroundColor: 'var(--color-error)',
    color: 'var(--color-error-content)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-error), black 10%)',
      boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.15)',
    },
  },

  '.btn-warning': {
    backgroundColor: 'var(--color-warning)',
    color: 'var(--color-warning-content)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-warning), black 10%)',
      boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.15)',
    },
  },

  '.btn-info': {
    backgroundColor: 'var(--color-info)',
    color: 'var(--color-info-content)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-info), black 10%)',
      boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.15)',
    },
  },

  // Block button
  '.btn-block': {
    display: 'flex',
    width: '100%',
  },
};
