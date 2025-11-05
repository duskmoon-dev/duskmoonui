

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
    color: 'hsl(var(--color-on-surface))',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    textDecoration: 'none',

    '&:hover': {
      backgroundColor: 'rgba(var(--color-on-surface-rgb), 0.08)',
    },

    '&:active': {
      backgroundColor: 'rgba(var(--color-on-surface-rgb), 0.12)',
    },

    '&:focus-visible': {
      outline: '2px solid hsl(var(--color-primary))',
      outlineOffset: '2px',
    },
  },

  // Active page - Primary
  '.pagination-item-active, .pagination-item-active-primary': {
    backgroundColor: 'hsl(var(--color-primary))',
    color: 'hsl(var(--color-primary-content))',

    '&:hover': {
      backgroundColor: 'hsl(var(--color-primary-focus))',
    },
  },

  // Active page - Secondary
  '.pagination-item-active-secondary': {
    backgroundColor: 'hsl(var(--color-secondary))',
    color: 'hsl(var(--color-secondary-content))',

    '&:hover': {
      backgroundColor: 'hsl(var(--color-secondary-focus))',
    },
  },

  // Active page - Tertiary
  '.pagination-item-active-tertiary': {
    backgroundColor: 'hsl(var(--color-tertiary))',
    color: 'hsl(var(--color-tertiary-content))',

    '&:hover': {
      backgroundColor: 'hsl(var(--color-tertiary-focus))',
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
    color: 'hsl(var(--color-on-surface))',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '1.25rem',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

    '&:hover': {
      backgroundColor: 'rgba(var(--color-on-surface-rgb), 0.08)',
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
    color: 'hsl(var(--color-on-surface-variant))',
    pointerEvents: 'none',

    '&::before': {
      content: '"..."',
    },
  },

  // Outlined variant
  '.pagination-outlined .pagination-item': {
    border: '1px solid hsl(var(--color-outline))',
    borderRadius: '0.375rem',

    '&:hover': {
      borderColor: 'hsl(var(--color-on-surface))',
      backgroundColor: 'rgba(var(--color-on-surface-rgb), 0.04)',
    },
  },

  '.pagination-outlined .pagination-item-active, .pagination-outlined .pagination-item-active-primary': {
    borderColor: 'hsl(var(--color-primary))',
  },

  '.pagination-outlined .pagination-item-active-secondary': {
    borderColor: 'hsl(var(--color-secondary))',
  },

  '.pagination-outlined .pagination-item-active-tertiary': {
    borderColor: 'hsl(var(--color-tertiary))',
  },

  // Tonal variant
  '.pagination-tonal .pagination-item-active, .pagination-tonal .pagination-item-active-primary': {
    backgroundColor: 'hsl(var(--color-primary-container))',
    color: 'hsl(var(--color-on-primary-container))',

    '&:hover': {
      backgroundColor: 'rgba(var(--color-primary-container-rgb), 0.9)',
    },
  },

  '.pagination-tonal .pagination-item-active-secondary': {
    backgroundColor: 'hsl(var(--color-secondary-container))',
    color: 'hsl(var(--color-on-secondary-container))',

    '&:hover': {
      backgroundColor: 'rgba(var(--color-secondary-container-rgb), 0.9)',
    },
  },

  '.pagination-tonal .pagination-item-active-tertiary': {
    backgroundColor: 'hsl(var(--color-tertiary-container))',
    color: 'hsl(var(--color-on-tertiary-container))',

    '&:hover': {
      backgroundColor: 'rgba(var(--color-tertiary-container-rgb), 0.9)',
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
    color: 'hsl(var(--color-on-surface-variant))',
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
    color: 'hsl(var(--color-on-surface))',
    backgroundColor: 'hsl(var(--color-surface-container-highest))',
    border: '1px solid hsl(var(--color-outline))',
    borderRadius: '0.25rem',
    outline: 'none',

    '&:focus': {
      borderColor: 'hsl(var(--color-primary))',
    },
  },

  // Responsive (stacked on mobile)
  '.pagination-responsive': {
    flexWrap: 'wrap',
  },
};
