

/**
 * Theme Controller component styles
 * Material Design 3-inspired theme switching controls
 */
export const themeControllerStyles: Record<string, any> = {
  '.theme-controller': {
    display: 'inline-flex',
    alignItems: 'stretch',
    backgroundColor: 'var(--color-surface-container)',
    border: '1px solid var(--color-outline-variant)',
    borderRadius: 'var(--radius-box, 1.5rem)',
    padding: '0.25rem',
    gap: '0.125rem',
  },

  '.theme-controller-item': {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: '0',
  },

  '.theme-controller-label': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.25rem',
    color: 'var(--color-on-surface-variant)',
    backgroundColor: 'transparent',
    borderRadius: 'calc(var(--radius-box, 1.5rem) - 0.25rem)',
    cursor: 'pointer',
    transition: 'background-color 150ms ease-in-out, color 150ms ease-in-out, box-shadow 150ms ease-in-out',
    userSelect: 'none',
    whiteSpace: 'nowrap',

    '&:hover': {
      backgroundColor: 'var(--color-surface-container-high)',
    },
  },

  '.theme-controller-item:checked + .theme-controller-label': {
    backgroundColor: 'var(--color-primary-container)',
    color: 'var(--color-on-primary-container)',
    boxShadow: 'var(--shadow-xs)',
  },

  '.theme-controller-dropdown': {
    position: 'relative',
    display: 'inline-block',
  },

  '.theme-controller-trigger': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.25rem',
    color: 'var(--color-on-surface)',
    backgroundColor: 'var(--color-surface-container)',
    border: '1px solid var(--color-outline-variant)',
    borderRadius: 'var(--radius-field, 0.5rem)',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background-color 150ms ease-in-out',
    listStyle: 'none',

    '&:hover': {
      backgroundColor: 'var(--color-surface-container-high)',
    },
  },

  '.theme-controller-menu': {
    position: 'absolute',
    top: 'calc(100% + 0.25rem)',
    left: '0',
    zIndex: '50',
    minWidth: '100%',
    backgroundColor: 'var(--color-surface-container)',
    border: '1px solid var(--color-outline-variant)',
    borderRadius: 'var(--radius-field, 0.5rem)',
    padding: '0.25rem',
    boxShadow: 'var(--shadow-md)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.125rem',
  },
};
