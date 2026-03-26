

/**
 * Cascader component styles
 * Material Design 3-inspired multi-level dropdown selection
 */
export const cascaderStyles: Record<string, any> = {
  '.cascader': {
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'column',
    width: '100%',
  },

  '.cascader-trigger': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    color: 'var(--color-on-surface)',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid currentColor',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'border-color 150ms ease-in-out, box-shadow 150ms ease-in-out',
  },

  '.cascader-dropdown': {
    position: 'absolute',
    top: '100%',
    left: '0',
    zIndex: '50',
    display: 'none',
    marginTop: '0.25rem',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-outline-variant)',
    borderRadius: '0.5rem',
    boxShadow: 'var(--shadow-md)',
    overflow: 'hidden',
  },

  '.cascader-panels': {
    display: 'flex',
    maxHeight: '16rem',
  },

  '.cascader-panel': {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '10rem',
    maxWidth: '14rem',
    overflowY: 'auto',
    borderRight: '1px solid var(--color-outline-variant)',
  },

  '.cascader-option': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.5rem',
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem',
    color: 'var(--color-on-surface)',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
    transition: 'background-color 150ms ease-in-out',

    '&:hover': {
      backgroundColor: 'var(--color-surface-container)',
    },
  },

  '.cascader-option-selected': {
    backgroundColor: 'var(--color-primary-container)',
    color: 'var(--color-on-primary-container)',
  },
};
