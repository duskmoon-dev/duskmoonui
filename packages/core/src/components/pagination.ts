

/**
 * Pagination component styles
 * Material Design 3-inspired pagination
 */
export const paginationStyles: Record<string, any> = {
  // Base pagination
  '.pagination': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.25rem',
    padding: '0.5rem',
  },

  // Pagination item (page button)
  '.pagination-item': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '2.5rem',
    height: '2.5rem',
    padding: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.25rem',
    color: 'var(--color-on-surface)',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    textDecoration: 'none',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-on-surface) 8%, transparent)',
    },

    '&:active': {
      backgroundColor: 'color-mix(in oklch, var(--color-on-surface) 12%, transparent)',
    },

    '&:focus-visible': {
      outline: '2px solid var(--color-primary)',
      outlineOffset: '2px',
    },
  },

  // Active page - Primary
  '.pagination-item-active, .pagination-item-active-primary': {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-primary-content)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-primary), black 10%)',
    },
  },

  // Active page - Secondary
  '.pagination-item-active-secondary': {
    backgroundColor: 'var(--color-secondary)',
    color: 'var(--color-secondary-content)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-secondary), black 10%)',
    },
  },

  // Active page - Tertiary
  '.pagination-item-active-tertiary': {
    backgroundColor: 'var(--color-tertiary)',
    color: 'var(--color-tertiary-content)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-tertiary), black 10%)',
    },
  },

  // Disabled page
  '.pagination-item-disabled': {
    opacity: '0.38',
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },

  // Previous/Next buttons
  '.pagination-prev, .pagination-next': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.375rem',
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'var(--color-on-surface)',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '1.25rem',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-on-surface) 8%, transparent)',
    },

    '&:disabled': {
      opacity: '0.38',
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },

  // Ellipsis
  '.pagination-ellipsis': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '2.5rem',
    height: '2.5rem',
    padding: '0.5rem',
    color: 'var(--color-on-surface-variant)',
    pointerEvents: 'none',

    '&::before': {
      content: '"..."',
    },
  },

  // Outlined variant
  '.pagination-outlined .pagination-item': {
    border: '1px solid var(--color-outline)',
    borderRadius: '0.375rem',

    '&:hover': {
      borderColor: 'var(--color-on-surface)',
      backgroundColor: 'color-mix(in oklch, var(--color-on-surface) 4%, transparent)',
    },
  },

  '.pagination-outlined .pagination-item-active, .pagination-outlined .pagination-item-active-primary': {
    borderColor: 'var(--color-primary)',
  },

  '.pagination-outlined .pagination-item-active-secondary': {
    borderColor: 'var(--color-secondary)',
  },

  '.pagination-outlined .pagination-item-active-tertiary': {
    borderColor: 'var(--color-tertiary)',
  },

  // Tonal variant
  '.pagination-tonal .pagination-item-active, .pagination-tonal .pagination-item-active-primary': {
    backgroundColor: 'var(--color-primary-container)',
    color: 'var(--color-on-primary-container)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-primary-container) 90%, transparent)',
    },
  },

  '.pagination-tonal .pagination-item-active-secondary': {
    backgroundColor: 'var(--color-secondary-container)',
    color: 'var(--color-on-secondary-container)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-secondary-container) 90%, transparent)',
    },
  },

  '.pagination-tonal .pagination-item-active-tertiary': {
    backgroundColor: 'var(--color-tertiary-container)',
    color: 'var(--color-on-tertiary-container)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-tertiary-container) 90%, transparent)',
    },
  },

  // Size variants
  '.pagination-sm .pagination-item': {
    minWidth: '2rem',
    height: '2rem',
    fontSize: '0.813rem',
  },

  '.pagination-lg .pagination-item': {
    minWidth: '3rem',
    height: '3rem',
    fontSize: '1rem',
  },

  // Compact (minimal spacing)
  '.pagination-compact': {
    gap: '0.125rem',
  },

  // Info display (showing X of Y)
  '.pagination-info': {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },

  '.pagination-info-text': {
    fontSize: '0.875rem',
    color: 'var(--color-on-surface-variant)',
    whiteSpace: 'nowrap',
  },

  // Page input jump
  '.pagination-input': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    margin: '0 0.5rem',
  },

  '.pagination-input input': {
    width: '3rem',
    padding: '0.375rem 0.5rem',
    fontSize: '0.875rem',
    textAlign: 'center',
    color: 'var(--color-on-surface)',
    backgroundColor: 'var(--color-surface-container-highest)',
    border: '1px solid var(--color-outline)',
    borderRadius: '0.25rem',
    outline: 'none',

    '&:focus': {
      borderColor: 'var(--color-primary)',
    },
  },

  // Responsive (stacked on mobile)
  '.pagination-responsive': {
    flexWrap: 'wrap',
  },
};
