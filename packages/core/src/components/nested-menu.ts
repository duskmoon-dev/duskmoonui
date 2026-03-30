

/**
 * Nested Menu component styles
 * Material Design 3-inspired sidebar navigation with collapsible levels
 */
export const nestedMenuStyles: Record<string, any> = {
  '.nested-menu': {
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    margin: '0',
    padding: '0.5rem',
    gap: '0.125rem',
    fontSize: '0.875rem',
    color: 'var(--color-on-surface)',
  },

  '.nested-menu-title': {
    padding: '0.75rem 0.75rem 0.25rem',
    fontSize: '0.6875rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--color-on-surface-variant)',
    userSelect: 'none',
  },

  '.nested-menu li > a, .nested-menu li > button': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    width: '100%',
    padding: '0.5rem 0.75rem',
    fontSize: 'inherit',
    color: 'var(--color-on-surface)',
    textDecoration: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: 'var(--radius-field, 0.375rem)',
    cursor: 'pointer',
    transition: 'background-color 150ms ease-in-out, color 150ms ease-in-out',

    '&:hover': {
      backgroundColor: 'var(--color-surface-container)',
    },
  },

  '.nested-menu-bordered': {
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-outline-variant)',
    borderRadius: 'var(--radius-card, 0.75rem)',
    boxShadow: 'var(--shadow-sm)',
  },
};
