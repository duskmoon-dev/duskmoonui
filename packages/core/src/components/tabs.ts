

/**
 * Tabs component styles
 * Material Design 3-inspired tabs navigation
 */
export const tabsStyles: Record<string, any> = {
  // Base tabs container
  '.tabs': {
    display: 'flex',
    alignItems: 'center',
    gap: '0',
    borderBottom: '1px solid var(--color-outline-variant)',
    overflow: 'auto',
    scrollbarWidth: 'thin',
  },

  // Hide scrollbar
  '.tabs::-webkit-scrollbar': {
    display: 'none',
  },

  // Vertical tabs
  '.tabs-vertical': {
    flexDirection: 'column',
    borderBottom: 'none',
    borderRight: '1px solid var(--color-outline-variant)',
  },

  // Scrollable tabs
  '.tabs-scrollable': {
    overflowX: 'auto',
    overflowY: 'hidden',
  },

  // Individual tab
  '.tab': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.25rem',
    color: 'var(--color-on-surface-variant)',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    whiteSpace: 'nowrap',
    position: 'relative',
    outline: 'none',

    '&:hover': {
      color: 'var(--color-on-surface)',
      backgroundColor: 'color-mix(in oklch, var(--color-on-surface) 8%, transparent)',
    },

    '&:focus-visible': {
      outline: '2px solid var(--color-primary)',
      outlineOffset: '-2px',
    },

    '&:disabled': {
      opacity: '0.38',
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },

  // Active tab - Primary
  '.tab-active, .tab-active-primary': {
    color: 'var(--color-primary)',
    borderBottomColor: 'var(--color-primary)',

    '&:hover': {
      color: 'var(--color-primary)',
      backgroundColor: 'color-mix(in oklch, var(--color-primary) 8%, transparent)',
    },
  },

  // Active tab - Secondary
  '.tab-active-secondary': {
    color: 'var(--color-secondary)',
    borderBottomColor: 'var(--color-secondary)',

    '&:hover': {
      color: 'var(--color-secondary)',
      backgroundColor: 'color-mix(in oklch, var(--color-secondary) 8%, transparent)',
    },
  },

  // Active tab - Tertiary
  '.tab-active-tertiary': {
    color: 'var(--color-tertiary)',
    borderBottomColor: 'var(--color-tertiary)',

    '&:hover': {
      color: 'var(--color-tertiary)',
      backgroundColor: 'color-mix(in oklch, var(--color-tertiary) 8%, transparent)',
    },
  },

  // Vertical tabs active state
  '.tabs-vertical .tab': {
    borderBottom: 'none',
    borderRight: '2px solid transparent',
    justifyContent: 'flex-start',
    width: '100%',
  },

  '.tabs-vertical .tab-active, .tabs-vertical .tab-active-primary': {
    borderRightColor: 'var(--color-primary)',
    borderBottomColor: 'transparent',
  },

  '.tabs-vertical .tab-active-secondary': {
    borderRightColor: 'var(--color-secondary)',
    borderBottomColor: 'transparent',
  },

  '.tabs-vertical .tab-active-tertiary': {
    borderRightColor: 'var(--color-tertiary)',
    borderBottomColor: 'transparent',
  },

  // Pill variant (filled active state)
  '.tabs-pill .tab': {
    borderRadius: '1.25rem',
    border: 'none',
    margin: '0.25rem',
  },

  '.tabs-pill .tab-active, .tabs-pill .tab-active-primary': {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-primary-content)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-primary), black 10%)',
      color: 'var(--color-primary-content)',
    },
  },

  '.tabs-pill .tab-active-secondary': {
    backgroundColor: 'var(--color-secondary)',
    color: 'var(--color-secondary-content)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-secondary), black 10%)',
      color: 'var(--color-secondary-content)',
    },
  },

  '.tabs-pill .tab-active-tertiary': {
    backgroundColor: 'var(--color-tertiary)',
    color: 'var(--color-tertiary-content)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-tertiary), black 10%)',
      color: 'var(--color-tertiary-content)',
    },
  },

  // Tonal variant (tonal active state)
  '.tabs-tonal .tab-active, .tabs-tonal .tab-active-primary': {
    backgroundColor: 'var(--color-primary-container)',
    color: 'var(--color-on-primary-container)',
    border: 'none',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-primary-container) 90%, transparent)',
      color: 'var(--color-on-primary-container)',
    },
  },

  '.tabs-tonal .tab-active-secondary': {
    backgroundColor: 'var(--color-secondary-container)',
    color: 'var(--color-on-secondary-container)',
    border: 'none',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-secondary-container) 90%, transparent)',
      color: 'var(--color-on-secondary-container)',
    },
  },

  '.tabs-tonal .tab-active-tertiary': {
    backgroundColor: 'var(--color-tertiary-container)',
    color: 'var(--color-on-tertiary-container)',
    border: 'none',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-tertiary-container) 90%, transparent)',
      color: 'var(--color-on-tertiary-container)',
    },
  },

  // Tab with icon
  '.tab-icon': {
    fontSize: '1.25rem',
  },

  // Icon-only tabs
  '.tab-icon-only': {
    padding: '0.75rem',
  },

  // Tabs with badges
  '.tab-badge': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '1.25rem',
    height: '1.25rem',
    padding: '0.125rem 0.375rem',
    fontSize: '0.688rem',
    fontWeight: '600',
    lineHeight: '1rem',
    borderRadius: '0.625rem',
    backgroundColor: 'var(--color-error)',
    color: 'var(--color-error-content)',
  },

  // Size variants
  '.tabs-sm .tab': {
    padding: '0.5rem 0.75rem',
    fontSize: '0.813rem',
  },

  '.tabs-md .tab': {
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
  },

  '.tabs-lg .tab': {
    padding: '1rem 1.5rem',
    fontSize: '1rem',
  },

  // Centered tabs
  '.tabs-center': {
    justifyContent: 'center',
  },

  // End-aligned tabs
  '.tabs-end': {
    justifyContent: 'flex-end',
  },

  // Boxed variant (with background)
  '.tabs-boxed': {
    backgroundColor: 'var(--color-surface-container)',
    borderRadius: '0.5rem',
    padding: '0.25rem',
    border: 'none',
  },

  '.tabs-boxed .tab': {
    borderRadius: '0.375rem',
    border: 'none',
  },

  // Full width tabs
  '.tabs-full .tab': {
    flex: '1 1 0%',
  },

  // Tabs content panel
  '.tab-panel': {
    padding: '1rem',
    display: 'none',

    '&[data-active="true"]': {
      display: 'block',
    },
  },

  '.tab-panel-show': {
    display: 'block',
  },

  // Animated indicator (optional, for JS-enhanced tabs)
  '.tabs-indicator': {
    position: 'absolute',
    bottom: '0',
    left: '0',
    height: '2px',
    backgroundColor: 'var(--color-primary)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  '.tabs-indicator-secondary': {
    backgroundColor: 'var(--color-secondary)',
  },

  '.tabs-indicator-tertiary': {
    backgroundColor: 'var(--color-tertiary)',
  },
};
