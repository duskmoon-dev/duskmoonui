

/**
 * Breadcrumbs component styles
 * Material Design 3-inspired breadcrumb navigation
 */
export const breadcrumbsStyles: Record<string, any> = {
  // Base breadcrumbs
  '.breadcrumbs': {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '0.5rem',
    padding: '0.5rem 0',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },

  // Breadcrumb item
  '.breadcrumb-item': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'hsl(var(--color-on-surface-variant))',
    textDecoration: 'none',
    transition: 'color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

    '&:hover': {
      color: 'hsl(var(--color-on-surface))',
    },
  },

  // Active/current breadcrumb
  '.breadcrumb-item-active': {
    color: 'hsl(var(--color-on-surface))',
    fontWeight: '500',
    pointerEvents: 'none',
  },

  // Link breadcrumb
  '.breadcrumb-link': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.375rem',
    color: 'hsl(var(--color-on-surface-variant))',
    textDecoration: 'none',
    transition: 'color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',

    '&:hover': {
      color: 'hsl(var(--color-primary))',
      textDecoration: 'underline',
    },
  },

  // Separator
  '.breadcrumb-separator': {
    display: 'inline-flex',
    alignItems: 'center',
    color: 'hsl(var(--color-on-surface-variant))',
    fontSize: '0.875rem',
    userSelect: 'none',
  },

  // Separator variants
  '.breadcrumbs-slash .breadcrumb-separator::before': {
    content: '"/"',
  },

  '.breadcrumbs-chevron .breadcrumb-separator::before': {
    content: '"›"',
    fontSize: '1.125rem',
  },

  '.breadcrumbs-dot .breadcrumb-separator::before': {
    content: '"•"',
  },

  '.breadcrumbs-arrow .breadcrumb-separator::before': {
    content: '"→"',
  },

  // Icon in breadcrumb
  '.breadcrumb-icon': {
    fontSize: '1rem',
    width: '1rem',
    height: '1rem',
  },

  // Collapsed breadcrumbs (with ellipsis)
  '.breadcrumb-ellipsis': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.25rem 0.5rem',
    color: 'hsl(var(--color-on-surface-variant))',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

    '&:hover': {
      backgroundColor: 'rgba(var(--color-on-surface-rgb), 0.08)',
    },

    '&::before': {
      content: '"..."',
    },
  },

  // Color variants
  '.breadcrumbs-primary .breadcrumb-link:hover, .breadcrumbs-primary .breadcrumb-item-active': {
    color: 'hsl(var(--color-primary))',
  },

  '.breadcrumbs-secondary .breadcrumb-link:hover, .breadcrumbs-secondary .breadcrumb-item-active': {
    color: 'hsl(var(--color-secondary))',
  },

  '.breadcrumbs-tertiary .breadcrumb-link:hover, .breadcrumbs-tertiary .breadcrumb-item-active': {
    color: 'hsl(var(--color-tertiary))',
  },

  // Size variants
  '.breadcrumbs-sm': {
    fontSize: '0.813rem',
  },

  '.breadcrumbs-sm .breadcrumb-icon': {
    fontSize: '0.875rem',
    width: '0.875rem',
    height: '0.875rem',
  },

  '.breadcrumbs-lg': {
    fontSize: '1rem',
  },

  '.breadcrumbs-lg .breadcrumb-icon': {
    fontSize: '1.25rem',
    width: '1.25rem',
    height: '1.25rem',
  },

  // With background
  '.breadcrumbs-contained': {
    padding: '0.75rem 1rem',
    backgroundColor: 'hsl(var(--color-surface-container))',
    borderRadius: '0.5rem',
  },

  // No wrap variant
  '.breadcrumbs-nowrap': {
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },

  // Disabled breadcrumb item
  '.breadcrumb-item-disabled': {
    opacity: '0.38',
    pointerEvents: 'none',
    cursor: 'not-allowed',
  },
};
