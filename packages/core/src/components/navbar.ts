

/**
 * Navbar component styles
 * Material Design 3-inspired navigation bar
 */
export const navbarStyles: Record<string, any> = {
  // Base navbar styles
  '.navbar': {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.75rem 1rem',
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-on-surface)',
    borderBottom: '1px solid var(--color-outline-variant)',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Surface variants
  '.navbar-surface': {
    backgroundColor: 'var(--color-surface)',
  },

  '.navbar-surface-container': {
    backgroundColor: 'var(--color-surface-container)',
  },

  '.navbar-surface-container-high': {
    backgroundColor: 'var(--color-surface-container-high)',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  },

  '.navbar-surface-container-highest': {
    backgroundColor: 'var(--color-surface-container-highest)',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.08)',
  },

  // Primary variant
  '.navbar-primary': {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-primary-content)',
    borderBottomColor: 'color-mix(in oklch, var(--color-primary), black 10%)',
  },

  // Secondary variant
  '.navbar-secondary': {
    backgroundColor: 'var(--color-secondary)',
    color: 'var(--color-secondary-content)',
    borderBottomColor: 'color-mix(in oklch, var(--color-secondary), black 10%)',
  },

  // Tertiary variant
  '.navbar-tertiary': {
    backgroundColor: 'var(--color-tertiary)',
    color: 'var(--color-tertiary-content)',
    borderBottomColor: 'color-mix(in oklch, var(--color-tertiary), black 10%)',
  },

  // Transparent variant
  '.navbar-transparent': {
    backgroundColor: 'transparent',
    borderBottom: 'none',
  },

  // Position variants
  '.navbar-fixed': {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    zIndex: '50',
  },

  '.navbar-sticky': {
    position: 'sticky',
    top: '0',
    zIndex: '50',
  },

  '.navbar-static': {
    position: 'static',
  },

  // Navbar sections
  '.navbar-start': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    flex: '0 1 auto',
  },

  '.navbar-center': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    flex: '1 1 auto',
  },

  '.navbar-end': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '0.75rem',
    flex: '0 1 auto',
    marginLeft: 'auto',
  },

  // Navbar brand/logo
  '.navbar-brand': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.25rem',
    fontWeight: '600',
    lineHeight: '1.75rem',
    textDecoration: 'none',
    color: 'inherit',
    whiteSpace: 'nowrap',
  },

  // Navbar items
  '.navbar-item': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.25rem',
    color: 'inherit',
    textDecoration: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    whiteSpace: 'nowrap',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-on-surface) 8%, transparent)',
    },

    '&:active': {
      backgroundColor: 'color-mix(in oklch, var(--color-on-surface) 12%, transparent)',
    },
  },

  '.navbar-item-active': {
    backgroundColor: 'color-mix(in oklch, var(--color-primary) 12%, transparent)',
    color: 'var(--color-primary)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-primary) 16%, transparent)',
    },
  },

  // For primary/secondary/tertiary navbar variants
  '.navbar-primary .navbar-item:hover, .navbar-secondary .navbar-item:hover, .navbar-tertiary .navbar-item:hover': {
    backgroundColor: 'color-mix(in oklch, white 10%, transparent)',
  },

  '.navbar-primary .navbar-item:active, .navbar-secondary .navbar-item:active, .navbar-tertiary .navbar-item:active': {
    backgroundColor: 'color-mix(in oklch, white 15%, transparent)',
  },

  '.navbar-primary .navbar-item-active': {
    backgroundColor: 'color-mix(in oklch, white 20%, transparent)',
    color: 'inherit',
  },

  '.navbar-secondary .navbar-item-active': {
    backgroundColor: 'color-mix(in oklch, white 20%, transparent)',
    color: 'inherit',
  },

  '.navbar-tertiary .navbar-item-active': {
    backgroundColor: 'color-mix(in oklch, white 20%, transparent)',
    color: 'inherit',
  },

  // Navbar menu (for mobile)
  '.navbar-menu': {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    padding: '0.5rem',
    backgroundColor: 'var(--color-surface-container)',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },

  // Hamburger menu button
  '.navbar-hamburger': {
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
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-on-surface) 8%, transparent)',
    },

    '&:active': {
      backgroundColor: 'color-mix(in oklch, var(--color-on-surface) 12%, transparent)',
    },
  },

  // Divider in navbar
  '.navbar-divider': {
    width: '1px',
    height: '1.5rem',
    backgroundColor: 'var(--color-outline-variant)',
    margin: '0 0.25rem',
  },

  // Size variants
  '.navbar-compact': {
    padding: '0.5rem 1rem',
  },

  '.navbar-compact .navbar-brand': {
    fontSize: '1.125rem',
  },

  '.navbar-compact .navbar-item': {
    padding: '0.375rem 0.625rem',
    fontSize: '0.813rem',
  },

  '.navbar-comfortable': {
    padding: '1rem 1.5rem',
  },

  '.navbar-comfortable .navbar-brand': {
    fontSize: '1.5rem',
  },

  '.navbar-comfortable .navbar-item': {
    padding: '0.625rem 1rem',
    fontSize: '1rem',
  },

  // No border variant
  '.navbar-borderless': {
    borderBottom: 'none',
  },

  // Blur effect (for transparent navbar)
  '.navbar-blur': {
    backdropFilter: 'blur(8px)',
    backgroundColor: 'color-mix(in oklch, var(--color-surface) 80%, transparent)',
  },
};
