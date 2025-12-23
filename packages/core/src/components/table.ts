

/**
 * Table component styles
 * Material Design 3-inspired data tables
 */
export const tableStyles: Record<string, any> = {
  // Base table
  '.table': {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    color: 'var(--color-on-surface)',
  },

  // Table header
  '.table thead': {
    backgroundColor: 'var(--color-surface-container)',
  },

  '.table th': {
    padding: '0.75rem 1rem',
    fontWeight: '600',
    textAlign: 'left',
    color: 'var(--color-on-surface)',
    borderBottom: '1px solid var(--color-outline-variant)',
  },

  // Table body
  '.table tbody tr': {
    borderBottom: '1px solid var(--color-outline-variant)',
    transition: 'background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  '.table td': {
    padding: '0.75rem 1rem',
  },

  // Hoverable rows
  '.table-hover tbody tr:hover': {
    backgroundColor: 'color-mix(in oklch, var(--color-on-surface) 4%, transparent)',
  },

  // Striped rows
  '.table-striped tbody tr:nth-child(even)': {
    backgroundColor: 'var(--color-surface-container)',
  },

  '.table-striped.table-hover tbody tr:nth-child(even):hover': {
    backgroundColor: 'color-mix(in oklch, var(--color-on-surface) 8%, transparent)',
  },

  // Bordered variant
  '.table-bordered': {
    border: '1px solid var(--color-outline-variant)',
  },

  '.table-bordered th, .table-bordered td': {
    border: '1px solid var(--color-outline-variant)',
  },

  // Borderless variant
  '.table-borderless tbody tr': {
    borderBottom: 'none',
  },

  '.table-borderless th': {
    borderBottom: 'none',
  },

  // Compact variant
  '.table-compact th, .table-compact td': {
    padding: '0.5rem 0.75rem',
  },

  // Comfortable variant
  '.table-comfortable th, .table-comfortable td': {
    padding: '1rem 1.5rem',
  },

  // Sticky header
  '.table-sticky thead': {
    position: 'sticky',
    top: '0',
    zIndex: '10',
    backgroundColor: 'var(--color-surface-container)',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  },

  // Sortable column
  '.table-sort': {
    cursor: 'pointer',
    userSelect: 'none',
    position: 'relative',
    paddingRight: '1.5rem',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-on-surface) 4%, transparent)',
    },
  },

  '.table-sort-icon': {
    position: 'absolute',
    right: '0.5rem',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '0.875rem',
    opacity: '0.5',
  },

  '.table-sort-asc .table-sort-icon, .table-sort-desc .table-sort-icon': {
    opacity: '1',
  },

  // Selectable rows
  '.table-selectable tbody tr': {
    cursor: 'pointer',
  },

  '.table-selectable tbody tr:hover': {
    backgroundColor: 'color-mix(in oklch, var(--color-on-surface) 8%, transparent)',
  },

  '.table-selectable tbody tr.selected': {
    backgroundColor: 'var(--color-primary-container)',
  },

  // Checkbox column
  '.table-checkbox': {
    width: '3rem',
    textAlign: 'center',
  },

  // Actions column
  '.table-actions': {
    width: 'auto',
    textAlign: 'right',
  },

  // Numeric columns
  '.table-numeric': {
    textAlign: 'right',
    fontVariantNumeric: 'tabular-nums',
  },

  // Center aligned
  '.table-center': {
    textAlign: 'center',
  },

  // Surface variant
  '.table-surface': {
    backgroundColor: 'var(--color-surface)',
  },

  // Caption
  '.table-caption': {
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    color: 'var(--color-on-surface-variant)',
    textAlign: 'left',
    captionSide: 'top',
  },

  // Responsive wrapper
  '.table-responsive': {
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
  },

  // Footer
  '.table tfoot': {
    backgroundColor: 'var(--color-surface-container)',
    fontWeight: '600',
  },

  '.table tfoot td': {
    borderTop: '2px solid var(--color-outline-variant)',
  },
};
