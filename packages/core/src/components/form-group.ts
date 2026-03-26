

/**
 * Form Group component styles
 * Material Design 3-inspired form layout utilities
 */
export const formGroupStyles: Record<string, any> = {
  '.form-group': {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    width: '100%',
  },

  '.form-group-horizontal': {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '1rem',
  },

  '.form-label': {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.25rem',
    color: 'var(--color-on-surface)',
    marginBottom: '0.25rem',
  },

  '.form-label-required::after': {
    content: "' *'",
    color: 'var(--color-error)',
  },

  '.fieldset': {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '1rem',
    margin: '0',
    border: '1px solid var(--color-outline-variant)',
    borderRadius: '0.5rem',
    backgroundColor: 'transparent',
  },

  '.fieldset-legend': {
    padding: '0 0.5rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    lineHeight: '1.25rem',
    color: 'var(--color-on-surface)',
  },

  '.form-row': {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
  },

  '.form-actions': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginTop: '1rem',
  },
};
