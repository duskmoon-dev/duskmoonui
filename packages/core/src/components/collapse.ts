

/**
 * Collapse component styles
 * Material Design 3-inspired collapse/expandable component
 */
export const collapseStyles: Record<string, any> = {
  // Base collapse container
  '.collapse': {
    overflow: 'hidden',
    transition: 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Collapsed state
  '.collapse-closed': {
    height: '0',
    opacity: '0',
  },

  // Expanded state
  '.collapse-open': {
    height: 'auto',
    opacity: '1',
  },

  // Collapse trigger/header
  '.collapse-trigger': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '1rem',
    fontSize: '1rem',
    fontWeight: '500',
    color: 'hsl(var(--color-on-surface))',
    backgroundColor: 'hsl(var(--color-surface))',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    textAlign: 'left',
  },

  // Trigger hover
  '.collapse-trigger:hover': {
    backgroundColor: 'hsl(var(--color-surface-variant))',
  },

  // Trigger icon
  '.collapse-icon': {
    fontSize: '1.25rem',
    color: 'hsl(var(--color-on-surface-variant))',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Icon rotation when open
  '.collapse-open .collapse-icon': {
    transform: 'rotate(180deg)',
  },

  // Collapse content
  '.collapse-content': {
    padding: '1rem',
    color: 'hsl(var(--color-on-surface))',
    backgroundColor: 'hsl(var(--color-surface))',
  },

  // Bordered variant
  '.collapse-bordered': {
    border: '1px solid hsl(var(--color-outline-variant))',
    borderRadius: '0.5rem',
  },

  '.collapse-bordered .collapse-trigger': {
    borderBottom: '1px solid hsl(var(--color-outline-variant))',
    borderRadius: '0.5rem 0.5rem 0 0',
  },

  '.collapse-bordered.collapse-closed .collapse-trigger': {
    borderBottom: 'none',
    borderRadius: '0.5rem',
  },

  // Card variant (with shadow)
  '.collapse-card': {
    backgroundColor: 'hsl(var(--color-surface))',
    border: '1px solid hsl(var(--color-outline-variant))',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  },

  // Accordion style (multiple collapses)
  '.collapse-group': {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },

  // Accordion item
  '.collapse-group .collapse': {
    border: '1px solid hsl(var(--color-outline-variant))',
    borderRadius: '0.5rem',
  },

  // Primary variant
  '.collapse-primary .collapse-trigger': {
    backgroundColor: 'hsl(var(--color-primary-container))',
    color: 'hsl(var(--color-on-primary-container))',
  },

  '.collapse-primary .collapse-trigger:hover': {
    backgroundColor: 'rgba(var(--color-primary-container-rgb), 0.8)',
  },

  // Secondary variant
  '.collapse-secondary .collapse-trigger': {
    backgroundColor: 'hsl(var(--color-secondary-container))',
    color: 'hsl(var(--color-on-secondary-container))',
  },

  '.collapse-secondary .collapse-trigger:hover': {
    backgroundColor: 'rgba(var(--color-secondary-container-rgb), 0.8)',
  },

  // Tertiary variant
  '.collapse-tertiary .collapse-trigger': {
    backgroundColor: 'hsl(var(--color-tertiary-container))',
    color: 'hsl(var(--color-on-tertiary-container))',
  },

  '.collapse-tertiary .collapse-trigger:hover': {
    backgroundColor: 'rgba(var(--color-tertiary-container-rgb), 0.8)',
  },

  // Size variants
  '.collapse-sm .collapse-trigger': {
    padding: '0.75rem',
    fontSize: '0.875rem',
  },

  '.collapse-sm .collapse-content': {
    padding: '0.75rem',
  },

  '.collapse-lg .collapse-trigger': {
    padding: '1.25rem',
    fontSize: '1.125rem',
  },

  '.collapse-lg .collapse-content': {
    padding: '1.25rem',
  },

  // Disabled state
  '.collapse-disabled .collapse-trigger': {
    opacity: '0.5',
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },

  // Focus state
  '.collapse-trigger:focus-visible': {
    outline: '2px solid hsl(var(--color-primary))',
    outlineOffset: '2px',
  },

  // Ghost variant (minimal styling)
  '.collapse-ghost .collapse-trigger': {
    backgroundColor: 'transparent',
    padding: '0.5rem 0',
    borderRadius: '0',
  },

  '.collapse-ghost .collapse-content': {
    padding: '0.5rem 0',
    backgroundColor: 'transparent',
  },

  // Animation variants
  '.collapse-fade': {
    transition: 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  '.collapse-slide': {
    transition: 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  '.collapse-slide.collapse-closed': {
    transform: 'translateY(-10px)',
  },

  // With divider
  '.collapse-divider .collapse-trigger': {
    borderBottom: '1px solid hsl(var(--color-outline-variant))',
  },

  '.collapse-divider.collapse-closed .collapse-trigger': {
    borderBottom: 'none',
  },

  // Nested collapse support
  '.collapse .collapse': {
    marginTop: '0.5rem',
  },

  '.collapse .collapse .collapse-trigger': {
    paddingLeft: '2rem',
    fontSize: '0.9375rem',
  },

  // Loading state
  '.collapse-loading .collapse-trigger::after': {
    content: '""',
    width: '1rem',
    height: '1rem',
    border: '2px solid hsl(var(--color-primary))',
    borderTopColor: 'transparent',
    borderRadius: '50%',
    animation: 'collapse-spin 0.6s linear infinite',
    marginLeft: '0.5rem',
  },

  '@keyframes collapse-spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
};
