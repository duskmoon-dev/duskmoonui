

/**
 * Input component styles
 * Material Design 3-inspired form inputs
 */
export const inputStyles: Record<string, any> = {
  // Base input styles (filled variant - Material Design 3 default)
  '.input': {
    display: 'block',
    width: '100%',
    padding: '0.875rem 1rem 0.5rem',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    color: 'var(--color-on-surface)',
    backgroundColor: 'var(--color-surface-container-highest)',
    border: 'none',
    borderBottom: '1px solid var(--color-on-surface-variant)',
    borderRadius: '0.25rem 0.25rem 0 0',
    outline: 'none',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

    '&::placeholder': {
      color: 'color-mix(in oklch, var(--color-on-surface-variant) 60%, transparent)',
    },

    '&:hover': {
      backgroundColor: 'var(--color-surface-container-high)',
      borderBottomColor: 'var(--color-on-surface)',
    },

    '&:focus': {
      backgroundColor: 'var(--color-surface-container-high)',
      borderBottomWidth: '2px',
      borderBottomColor: 'var(--color-primary)',
      paddingBottom: 'calc(0.5rem - 1px)', // Compensate for thicker border
    },

    '&:disabled': {
      opacity: '0.38',
      cursor: 'not-allowed',
      backgroundColor: 'var(--color-surface-variant)',
    },

    '&[readonly]': {
      backgroundColor: 'var(--color-surface-variant)',
      cursor: 'default',
    },
  },

  // Outlined variant
  '.input-outlined': {
    padding: '0.75rem 1rem',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-outline)',
    borderRadius: '0.25rem',

    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: 'var(--color-on-surface)',
    },

    '&:focus': {
      backgroundColor: 'transparent',
      borderWidth: '2px',
      borderColor: 'var(--color-primary)',
      padding: 'calc(0.75rem - 1px) calc(1rem - 1px)',
    },

    '&:disabled': {
      backgroundColor: 'transparent',
      borderColor: 'var(--color-outline-variant)',
    },
  },

  // Filled variant (explicit)
  '.input-filled': {
    padding: '0.875rem 1rem 0.5rem',
    backgroundColor: 'var(--color-surface-container-highest)',
    border: 'none',
    borderBottom: '1px solid var(--color-on-surface-variant)',
    borderRadius: '0.25rem 0.25rem 0 0',
  },

  // Size variants
  '.input-sm': {
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },

  '.input-md': {
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },

  '.input-lg': {
    padding: '1rem 1.25rem',
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
  },

  // State variants
  '.input-error': {
    borderBottomColor: 'var(--color-error)',

    '&:focus': {
      borderBottomColor: 'var(--color-error)',
    },
  },

  '.input-error.input-outlined': {
    borderColor: 'var(--color-error)',

    '&:focus': {
      borderColor: 'var(--color-error)',
    },
  },

  '.input-success': {
    borderBottomColor: 'var(--color-success)',

    '&:focus': {
      borderBottomColor: 'var(--color-success)',
    },
  },

  '.input-success.input-outlined': {
    borderColor: 'var(--color-success)',

    '&:focus': {
      borderColor: 'var(--color-success)',
    },
  },

  // Input group (for labels and helper text)
  '.input-group': {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },

  '.input-label': {
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.25rem',
    color: 'var(--color-on-surface)',
    marginBottom: '0.25rem',
  },

  '.input-helper': {
    fontSize: '0.75rem',
    lineHeight: '1rem',
    color: 'var(--color-on-surface-variant)',
    marginTop: '0.25rem',
  },

  '.input-error-message': {
    fontSize: '0.75rem',
    lineHeight: '1rem',
    color: 'var(--color-error)',
    marginTop: '0.25rem',
  },

  // Textarea
  '.textarea': {
    display: 'block',
    width: '100%',
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    color: 'var(--color-on-surface)',
    backgroundColor: 'var(--color-surface-container-highest)',
    border: 'none',
    borderBottom: '1px solid var(--color-on-surface-variant)',
    borderRadius: '0.25rem 0.25rem 0 0',
    outline: 'none',
    resize: 'vertical',
    minHeight: '6rem',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

    '&::placeholder': {
      color: 'color-mix(in oklch, var(--color-on-surface-variant) 60%, transparent)',
    },

    '&:hover': {
      backgroundColor: 'var(--color-surface-container-high)',
      borderBottomColor: 'var(--color-on-surface)',
    },

    '&:focus': {
      backgroundColor: 'var(--color-surface-container-high)',
      borderBottomWidth: '2px',
      borderBottomColor: 'var(--color-primary)',
      paddingBottom: 'calc(0.75rem - 1px)',
    },

    '&:disabled': {
      opacity: '0.38',
      cursor: 'not-allowed',
      backgroundColor: 'var(--color-surface-variant)',
    },
  },

  '.textarea-outlined': {
    backgroundColor: 'transparent',
    border: '1px solid var(--color-outline)',
    borderRadius: '0.25rem',

    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: 'var(--color-on-surface)',
    },

    '&:focus': {
      backgroundColor: 'transparent',
      borderWidth: '2px',
      borderColor: 'var(--color-primary)',
      padding: 'calc(0.75rem - 1px) calc(1rem - 1px)',
    },
  },

  // Select
  '.select': {
    display: 'block',
    width: '100%',
    padding: '0.875rem 2.5rem 0.5rem 1rem',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    color: 'var(--color-on-surface)',
    backgroundColor: 'var(--color-surface-container-highest)',
    border: 'none',
    borderBottom: '1px solid var(--color-on-surface-variant)',
    borderRadius: '0.25rem 0.25rem 0 0',
    outline: 'none',
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
    backgroundPosition: 'right 0.5rem center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '1.5rem 1.5rem',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

    '&:hover': {
      backgroundColor: 'var(--color-surface-container-high)',
      borderBottomColor: 'var(--color-on-surface)',
    },

    '&:focus': {
      backgroundColor: 'var(--color-surface-container-high)',
      borderBottomWidth: '2px',
      borderBottomColor: 'var(--color-primary)',
      paddingBottom: 'calc(0.5rem - 1px)',
    },

    '&:disabled': {
      opacity: '0.38',
      cursor: 'not-allowed',
      backgroundColor: 'var(--color-surface-variant)',
    },
  },

  '.select-outlined': {
    padding: '0.75rem 2.5rem 0.75rem 1rem',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-outline)',
    borderRadius: '0.25rem',

    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: 'var(--color-on-surface)',
    },

    '&:focus': {
      backgroundColor: 'transparent',
      borderWidth: '2px',
      borderColor: 'var(--color-primary)',
      padding: 'calc(0.75rem - 1px) calc(2.5rem - 1px) calc(0.75rem - 1px) calc(1rem - 1px)',
    },
  },

  // Checkbox and Radio
  '.checkbox, .radio': {
    width: '1.25rem',
    height: '1.25rem',
    color: 'var(--color-primary)',
    backgroundColor: 'transparent',
    border: '2px solid var(--color-on-surface-variant)',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

    '&:hover': {
      borderColor: 'var(--color-on-surface)',
    },

    '&:checked': {
      backgroundColor: 'var(--color-primary)',
      borderColor: 'var(--color-primary)',
    },

    '&:focus': {
      outline: '2px solid color-mix(in oklch, var(--color-primary) 20%, transparent)',
      outlineOffset: '2px',
    },

    '&:disabled': {
      opacity: '0.38',
      cursor: 'not-allowed',
    },
  },

  '.radio': {
    borderRadius: '50%',
  },
};
