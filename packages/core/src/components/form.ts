

/**
 * Form component styles
 * Material Design 3-inspired form system
 */
export const formStyles: Record<string, any> = {
  '.form-control': {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    width: '100%',
    marginBottom: '1rem',
    color: 'var(--color-on-surface)',
  },

  '.label': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.25rem 0',
  },

  '.label-text': {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'var(--color-on-surface)',
    paddingBottom: '0.25rem',
  },

  '.label-text-alt': {
    fontSize: '0.75rem',
    color: 'var(--color-on-surface-variant)',
  },

  '.helper-text': {
    fontSize: '0.75rem',
    color: 'var(--color-on-surface-variant)',
    marginTop: '0.25rem',
  },

  '.helper-text.error': {
    color: 'var(--color-on-error-container)',
  },

  '.helper-text.success': {
    color: 'var(--color-on-success-container)',
  },

  '.label-text.required::after': {
    content: "' *'",
    color: 'var(--color-on-error-container)',
  },
};
