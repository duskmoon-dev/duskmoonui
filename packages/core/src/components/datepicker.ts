

/**
 * Date Picker component styles
 * Material Design 3-inspired date picker
 */
export const datepickerStyles: Record<string, any> = {
  // Base datepicker container
  '.datepicker': {
    position: 'relative',
    display: 'inline-block',
    width: '100%',
  },

  // Datepicker input
  '.datepicker-input': {
    width: '100%',
    padding: '0.875rem 2.5rem 0.5rem 1rem',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    color: 'var(--color-on-surface)',
    backgroundColor: 'var(--color-surface-container-highest)',
    border: 'none',
    borderBottom: '1px solid var(--color-on-surface-variant)',
    borderRadius: '0.25rem 0.25rem 0 0',
    outline: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

    '&:focus': {
      backgroundColor: 'var(--color-surface-container-high)',
      borderBottomWidth: '2px',
      borderBottomColor: 'var(--color-primary)',
    },
  },

  // Calendar icon
  '.datepicker-icon': {
    position: 'absolute',
    right: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '1.25rem',
    color: 'var(--color-on-surface-variant)',
    pointerEvents: 'none',
  },

  // Datepicker dropdown
  '.datepicker-dropdown': {
    position: 'absolute',
    top: '100%',
    left: '0',
    marginTop: '0.5rem',
    padding: '1rem',
    backgroundColor: 'var(--color-surface-container-high)',
    borderRadius: '1rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    zIndex: '100',
    opacity: '0',
    visibility: 'hidden',
    transform: 'scale(0.95)',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  '.datepicker-dropdown-open': {
    opacity: '1',
    visibility: 'visible',
    transform: 'scale(1)',
  },

  // Calendar header
  '.datepicker-header': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },

  '.datepicker-title': {
    fontSize: '1rem',
    fontWeight: '600',
    color: 'var(--color-on-surface)',
    textAlign: 'center',
    flex: '1 1 auto',
  },

  '.datepicker-nav': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2rem',
    height: '2rem',
    fontSize: '1.25rem',
    color: 'var(--color-on-surface)',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-on-surface) 8%, transparent)',
    },
  },

  // Calendar grid
  '.datepicker-calendar': {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '0.25rem',
  },

  // Day names header
  '.datepicker-weekday': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'var(--color-on-surface-variant)',
    textTransform: 'uppercase',
  },

  // Day cell
  '.datepicker-day': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2.5rem',
    height: '2.5rem',
    fontSize: '0.875rem',
    color: 'var(--color-on-surface)',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-on-surface) 8%, transparent)',
    },
  },

  // Today
  '.datepicker-day-today': {
    border: '1px solid var(--color-primary)',
  },

  // Selected day
  '.datepicker-day-selected': {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-primary-content)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-primary), black 10%)',
    },
  },

  // Disabled day
  '.datepicker-day-disabled': {
    opacity: '0.38',
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },

  // Day from other month
  '.datepicker-day-other-month': {
    color: 'var(--color-on-surface-variant)',
    opacity: '0.5',
  },

  // Range selection
  '.datepicker-day-in-range': {
    backgroundColor: 'var(--color-primary-container)',
    borderRadius: '0',
  },

  '.datepicker-day-range-start': {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  },

  '.datepicker-day-range-end': {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  },

  // Month/Year picker
  '.datepicker-months, .datepicker-years': {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.5rem',
  },

  '.datepicker-month, .datepicker-year': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.75rem',
    fontSize: '0.875rem',
    color: 'var(--color-on-surface)',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-on-surface) 8%, transparent)',
    },
  },

  '.datepicker-month-selected, .datepicker-year-selected': {
    backgroundColor: 'var(--color-primary-container)',
    color: 'var(--color-on-primary-container)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-primary-container) 90%, transparent)',
    },
  },

  // Footer with actions
  '.datepicker-footer': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '0.5rem',
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid var(--color-outline-variant)',
  },

  // Inline variant (always visible)
  '.datepicker-inline': {
    position: 'static',
    opacity: '1',
    visibility: 'visible',
    transform: 'scale(1)',
  },

  // Color variants
  '.datepicker-secondary .datepicker-day-selected': {
    backgroundColor: 'var(--color-secondary)',
    color: 'var(--color-secondary-content)',
  },

  '.datepicker-tertiary .datepicker-day-selected': {
    backgroundColor: 'var(--color-tertiary)',
    color: 'var(--color-tertiary-content)',
  },
};
