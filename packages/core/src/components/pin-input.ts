

/**
 * PIN Input component styles
 * Material Design 3-inspired secure PIN/password entry
 */
export const pinInputStyles: Record<string, any> = {
  '.pin-input': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
  },

  '.pin-input-field': {
    width: '3rem',
    height: '3.5rem',
    padding: '0',
    fontSize: '1.5rem',
    fontWeight: '600',
    textAlign: 'center',
    color: 'var(--color-on-surface)',
    backgroundColor: 'var(--color-surface)',
    border: '2px solid currentColor',
    borderRadius: '0.5rem',
    outline: 'none',
    transition: 'border-color 150ms ease-in-out, box-shadow 150ms ease-in-out',
    caretColor: 'var(--color-primary)',

    '&:focus': {
      boxShadow: '0 0 0 3px color-mix(in oklch, currentColor 20%, transparent)',
    },

    '&:disabled': {
      opacity: '0.38',
      cursor: 'not-allowed',
      backgroundColor: 'var(--color-surface-container)',
    },
  },

  '.pin-input-primary .pin-input-field': {
    color: 'var(--color-primary)',
  },

  '.pin-input-error .pin-input-field': {
    color: 'var(--color-error)',
  },
};
