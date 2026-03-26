

/**
 * Multi Select component styles
 * Material Design 3-inspired multiple selection dropdown
 */
export const multiSelectStyles: Record<string, any> = {
  '.multi-select': {
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'column',
    width: '100%',
  },

  '.multi-select-trigger': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    minHeight: '2.75rem',
    width: '100%',
    padding: '0.5rem 0.75rem',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    color: 'var(--color-on-surface)',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid currentColor',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'border-color 150ms ease-in-out, box-shadow 150ms ease-in-out',
  },

  '.multi-select-tag': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    maxWidth: '100%',
    padding: '0.125rem 0.375rem 0.125rem 0.5rem',
    fontSize: '0.75rem',
    lineHeight: '1.25rem',
    backgroundColor: 'var(--color-surface-container-high)',
    color: 'var(--color-on-surface)',
    borderRadius: '1rem',
  },

  '.multi-select-dropdown': {
    position: 'absolute',
    top: '100%',
    left: '0',
    right: '0',
    zIndex: '50',
    display: 'none',
    maxHeight: '16rem',
    marginTop: '0.25rem',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-outline-variant)',
    borderRadius: '0.5rem',
    boxShadow: 'var(--shadow-md)',
    overflow: 'hidden',
  },

  '.multi-select-option': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    width: '100%',
    padding: '0.625rem 0.75rem',
    fontSize: '0.875rem',
    color: 'var(--color-on-surface)',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'background-color 150ms ease-in-out',

    '&:hover': {
      backgroundColor: 'var(--color-surface-container)',
    },
  },

  '.multi-select-option-selected': {
    backgroundColor: 'var(--color-primary-container)',
    color: 'var(--color-on-primary-container)',
  },
};
