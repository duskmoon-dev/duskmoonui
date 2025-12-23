

/**
 * App Bar component styles
 * Material Design 3-inspired top and bottom app bars
 */
export const appBarStyles: Record<string, any> = {
  // Base app bar (top)
  '.appbar': {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem 1.5rem',
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-on-surface)',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: '30',
  },

  // Top app bar (default)
  '.appbar-top': {
    position: 'relative',
  },

  // Bottom app bar
  '.appbar-bottom': {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    boxShadow: '0 -1px 2px 0 rgba(0, 0, 0, 0.05)',
  },

  // Position variants for top bar
  '.appbar-fixed': {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
  },

  '.appbar-sticky': {
    position: 'sticky',
    top: '0',
  },

  '.appbar-static': {
    position: 'static',
  },

  // Surface variants
  '.appbar-surface': {
    backgroundColor: 'var(--color-surface)',
  },

  '.appbar-surface-container': {
    backgroundColor: 'var(--color-surface-container)',
  },

  '.appbar-surface-container-low': {
    backgroundColor: 'var(--color-surface-container-low)',
  },

  '.appbar-surface-container-high': {
    backgroundColor: 'var(--color-surface-container-high)',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.08)',
  },

  '.appbar-surface-container-highest': {
    backgroundColor: 'var(--color-surface-container-highest)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },

  // Color variants
  '.appbar-primary': {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-primary-content)',
  },

  '.appbar-secondary': {
    backgroundColor: 'var(--color-secondary)',
    color: 'var(--color-secondary-content)',
  },

  '.appbar-tertiary': {
    backgroundColor: 'var(--color-tertiary)',
    color: 'var(--color-tertiary-content)',
  },

  // Transparent variant
  '.appbar-transparent': {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },

  // Blur effect
  '.appbar-blur': {
    backdropFilter: 'blur(8px)',
    backgroundColor: 'color-mix(in oklch, var(--color-surface) 80%, transparent)',
  },

  // App bar sections
  '.appbar-leading': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    flex: '0 1 auto',
  },

  '.appbar-title': {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.125rem',
    flex: '1 1 auto',
    minWidth: '0',
  },

  '.appbar-trailing': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flex: '0 1 auto',
    marginLeft: 'auto',
  },

  // App bar heading
  '.appbar-heading': {
    fontSize: '1.25rem',
    fontWeight: '600',
    lineHeight: '1.75rem',
    margin: '0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  // App bar subtitle
  '.appbar-subtitle': {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    color: 'var(--color-on-surface-variant)',
    margin: '0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  '.appbar-primary .appbar-subtitle, .appbar-secondary .appbar-subtitle, .appbar-tertiary .appbar-subtitle': {
    color: 'inherit',
    opacity: '0.8',
  },

  // App bar action button
  '.appbar-action': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2.5rem',
    height: '2.5rem',
    padding: '0.5rem',
    fontSize: '1.25rem',
    color: 'inherit',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

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

    '&:disabled': {
      opacity: '0.38',
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },

  '.appbar-primary .appbar-action:hover, .appbar-secondary .appbar-action:hover, .appbar-tertiary .appbar-action:hover': {
    backgroundColor: 'color-mix(in oklch, white 10%, transparent)',
  },

  '.appbar-primary .appbar-action:active, .appbar-secondary .appbar-action:active, .appbar-tertiary .appbar-action:active': {
    backgroundColor: 'color-mix(in oklch, white 15%, transparent)',
  },

  // Back button
  '.appbar-back': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2.5rem',
    height: '2.5rem',
    padding: '0.5rem',
    fontSize: '1.25rem',
    color: 'inherit',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-on-surface) 8%, transparent)',
    },

    '&:active': {
      backgroundColor: 'color-mix(in oklch, var(--color-on-surface) 12%, transparent)',
    },
  },

  // Size variants
  '.appbar-compact': {
    padding: '0.75rem 1rem',
  },

  '.appbar-compact .appbar-heading': {
    fontSize: '1.125rem',
  },

  '.appbar-compact .appbar-action': {
    width: '2rem',
    height: '2rem',
    fontSize: '1rem',
  },

  '.appbar-comfortable': {
    padding: '1.25rem 2rem',
  },

  '.appbar-comfortable .appbar-heading': {
    fontSize: '1.5rem',
  },

  '.appbar-comfortable .appbar-action': {
    width: '3rem',
    height: '3rem',
    fontSize: '1.5rem',
  },

  // No shadow variant
  '.appbar-flat': {
    boxShadow: 'none',
  },

  // With border variant
  '.appbar-bordered': {
    boxShadow: 'none',
    borderBottom: '1px solid var(--color-outline-variant)',
  },

  '.appbar-bottom.appbar-bordered': {
    borderBottom: 'none',
    borderTop: '1px solid var(--color-outline-variant)',
  },

  // Prominent/large top app bar
  '.appbar-prominent': {
    minHeight: '8rem',
    alignItems: 'flex-start',
    paddingTop: '1.5rem',
    paddingBottom: '1.5rem',
  },

  '.appbar-prominent .appbar-title': {
    alignSelf: 'flex-end',
  },

  '.appbar-prominent .appbar-heading': {
    fontSize: '2rem',
    lineHeight: '2.5rem',
  },

  // Center-aligned variant
  '.appbar-center .appbar-title': {
    textAlign: 'center',
  },

  // Search integration
  '.appbar-search': {
    display: 'flex',
    alignItems: 'center',
    flex: '1 1 auto',
    maxWidth: '32rem',
    padding: '0.5rem 1rem',
    backgroundColor: 'var(--color-surface-container-highest)',
    borderRadius: '1.75rem',
    border: 'none',
    outline: 'none',
    fontSize: '0.875rem',
    color: 'var(--color-on-surface)',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

    '&:focus': {
      backgroundColor: 'var(--color-surface-container-high)',
      boxShadow: '0 0 0 2px var(--color-primary)',
    },

    '&::placeholder': {
      color: 'var(--color-on-surface-variant)',
    },
  },
};
