

/**
 * Time Input component styles
 * Material Design 3-inspired time selection input
 */
export const timeInputStyles: Record<string, any> = {
  '.time-input': {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    width: '100%',
  },

  '.time-input-field': {
    display: 'flex',
    width: '100%',
    padding: '0.75rem 2.5rem 0.75rem 1rem',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    color: 'var(--color-on-surface)',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid currentColor',
    borderRadius: '0.5rem',
    outline: 'none',
    transition: 'border-color 150ms ease-in-out, box-shadow 150ms ease-in-out',

    '&:focus': {
      boxShadow: '0 0 0 3px color-mix(in oklch, currentColor 20%, transparent)',
    },

    '&:disabled': {
      cursor: 'not-allowed',
      opacity: '0.5',
      backgroundColor: 'var(--color-surface-container)',
    },
  },

  '.time-input-segments': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.125rem',
    padding: '0.75rem 1rem',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid currentColor',
    borderRadius: '0.5rem',
  },

  '.time-input-segment': {
    width: '2rem',
    padding: '0.25rem',
    fontSize: '1rem',
    fontWeight: '500',
    textAlign: 'center',
    color: 'var(--color-on-surface)',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '0.25rem',
    outline: 'none',

    '&:focus': {
      backgroundColor: 'var(--color-primary-container)',
      color: 'var(--color-on-primary-container)',
    },
  },

  '.time-input-primary .time-input-field, .time-input-primary .time-input-segments': {
    color: 'var(--color-primary)',
  },

  '.time-input-error .time-input-field, .time-input-error .time-input-segments': {
    color: 'var(--color-error)',
  },
};
