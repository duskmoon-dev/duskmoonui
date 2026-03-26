

/**
 * OTP Input component styles
 * Material Design 3-inspired one-time password input
 */
export const otpInputStyles: Record<string, any> = {
  '.otp-input': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
  },

  '.otp-input-field': {
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

  '.otp-separator': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1rem',
    height: '0.25rem',
    backgroundColor: 'var(--color-outline)',
    borderRadius: '0.125rem',
  },

  '.otp-input-primary .otp-input-field': {
    color: 'var(--color-primary)',
  },

  '.otp-input-error .otp-input-field': {
    color: 'var(--color-error)',
  },
};
