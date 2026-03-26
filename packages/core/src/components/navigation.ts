

/**
 * Navigation component styles (composite)
 * Material Design 3-inspired navigation system
 * Note: This is a composite module — individual components
 * (navbar, menu, breadcrumbs, tabs, pagination) also have their own files.
 */
export const navigationStyles: Record<string, any> = {
  // Dropdown
  '.dropdown': {
    position: 'relative',
    display: 'inline-block',
  },

  '.dropdown-content': {
    position: 'absolute',
    zIndex: '50',
    minWidth: '12rem',
    padding: '0.5rem',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-outline)',
    borderRadius: '0.5rem',
    boxShadow: 'var(--shadow-lg)',
    opacity: '0',
    visibility: 'hidden',
    transform: 'translateY(-0.5rem)',
    transition: 'all 150ms ease-in-out',
  },

  '.dropdown-end .dropdown-content': {
    right: '0',
  },

  '.dropdown-top .dropdown-content': {
    bottom: '100%',
    top: 'auto',
    marginBottom: '0.25rem',
  },
};
