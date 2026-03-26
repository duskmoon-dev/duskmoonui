

/**
 * Tree Select component styles
 * Material Design 3-inspired hierarchical dropdown selection
 */
export const treeSelectStyles: Record<string, any> = {
  '.tree-select': {
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'column',
    width: '100%',
  },

  '.tree-select-trigger': {
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

    '&:focus': {
      outline: 'none',
      boxShadow: '0 0 0 3px color-mix(in oklch, currentColor 20%, transparent)',
    },

    '&:disabled': {
      cursor: 'not-allowed',
      opacity: '0.5',
      backgroundColor: 'var(--color-surface-container)',
    },
  },

  '.tree-select-dropdown': {
    position: 'absolute',
    top: '100%',
    left: '0',
    right: '0',
    zIndex: '50',
    display: 'none',
    maxHeight: '20rem',
    marginTop: '0.25rem',
    padding: '0.5rem',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-outline-variant)',
    borderRadius: '0.5rem',
    boxShadow: 'var(--shadow-md)',
    overflowY: 'auto',
  },

  '.tree-select-node': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem',
    color: 'var(--color-on-surface)',
    backgroundColor: 'transparent',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    transition: 'background-color 150ms ease-in-out',

    '&:hover': {
      backgroundColor: 'var(--color-surface-container)',
    },
  },

  '.tree-select-node-selected': {
    backgroundColor: 'var(--color-primary-container)',
    color: 'var(--color-on-primary-container)',
  },

  '.tree-select-children': {
    display: 'none',
    paddingLeft: '1.5rem',
  },

  '.tree-select-primary .tree-select-trigger': {
    color: 'var(--color-primary)',
  },

  '.tree-select-error .tree-select-trigger': {
    color: 'var(--color-error)',
  },
};
