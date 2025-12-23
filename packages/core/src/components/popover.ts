

/**
 * Popover component styles
 * Material Design 3-inspired popover for contextual content
 */
export const popoverStyles: Record<string, any> = {
  // Base popover
  '.popover': {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '10rem',
    maxWidth: '20rem',
    padding: '1rem',
    backgroundColor: 'var(--color-surface-container-high)',
    color: 'var(--color-on-surface)',
    borderRadius: '0.75rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    zIndex: '100',
    opacity: '0',
    visibility: 'hidden',
    transform: 'scale(0.95)',
    transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  '.popover-show': {
    opacity: '1',
    visibility: 'visible',
    transform: 'scale(1)',
  },

  // Popover arrow
  '.popover-arrow': {
    position: 'absolute',
    width: '0.75rem',
    height: '0.75rem',
    backgroundColor: 'var(--color-surface-container-high)',
    transform: 'rotate(45deg)',
  },

  // Top positioning
  '.popover-top': {
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-0.5rem) scale(0.95)',
    marginBottom: '0.5rem',
  },

  '.popover-top.popover-show': {
    transform: 'translateX(-50%) translateY(0) scale(1)',
  },

  '.popover-top .popover-arrow': {
    top: '100%',
    left: '50%',
    marginLeft: '-0.375rem',
    marginTop: '-0.375rem',
  },

  // Bottom positioning
  '.popover-bottom': {
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%) translateY(0.5rem) scale(0.95)',
    marginTop: '0.5rem',
  },

  '.popover-bottom.popover-show': {
    transform: 'translateX(-50%) translateY(0) scale(1)',
  },

  '.popover-bottom .popover-arrow': {
    bottom: '100%',
    left: '50%',
    marginLeft: '-0.375rem',
    marginBottom: '-0.375rem',
  },

  // Left positioning
  '.popover-left': {
    right: '100%',
    top: '50%',
    transform: 'translateY(-50%) translateX(-0.5rem) scale(0.95)',
    marginRight: '0.5rem',
  },

  '.popover-left.popover-show': {
    transform: 'translateY(-50%) translateX(0) scale(1)',
  },

  '.popover-left .popover-arrow': {
    left: '100%',
    top: '50%',
    marginTop: '-0.375rem',
    marginLeft: '-0.375rem',
  },

  // Right positioning
  '.popover-right': {
    left: '100%',
    top: '50%',
    transform: 'translateY(-50%) translateX(0.5rem) scale(0.95)',
    marginLeft: '0.5rem',
  },

  '.popover-right.popover-show': {
    transform: 'translateY(-50%) translateX(0) scale(1)',
  },

  '.popover-right .popover-arrow': {
    right: '100%',
    top: '50%',
    marginTop: '-0.375rem',
    marginRight: '-0.375rem',
  },

  // No arrow variant
  '.popover-no-arrow .popover-arrow': {
    display: 'none',
  },

  // Popover header
  '.popover-header': {
    marginBottom: '0.75rem',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid var(--color-outline-variant)',
  },

  '.popover-title': {
    fontSize: '1rem',
    fontWeight: '600',
    lineHeight: '1.5rem',
    margin: '0',
    color: 'var(--color-on-surface)',
  },

  // Popover body
  '.popover-body': {
    fontSize: '0.875rem',
    lineHeight: '1.5rem',
    color: 'var(--color-on-surface-variant)',
  },

  // Popover footer
  '.popover-footer': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '0.5rem',
    marginTop: '0.75rem',
    paddingTop: '0.75rem',
    borderTop: '1px solid var(--color-outline-variant)',
  },

  // Close button
  '.popover-close': {
    position: 'absolute',
    top: '0.75rem',
    right: '0.75rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.5rem',
    height: '1.5rem',
    padding: '0.25rem',
    fontSize: '1rem',
    color: 'var(--color-on-surface-variant)',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

    '&:hover': {
      backgroundColor: 'color-mix(in oklch, var(--color-on-surface) 8%, transparent)',
    },
  },

  // Size variants
  '.popover-sm': {
    minWidth: '8rem',
    maxWidth: '16rem',
    padding: '0.75rem',
  },

  '.popover-lg': {
    minWidth: '16rem',
    maxWidth: '28rem',
    padding: '1.25rem',
  },

  // Color variants
  '.popover-primary': {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-primary-content)',
  },

  '.popover-primary .popover-arrow': {
    backgroundColor: 'var(--color-primary)',
  },

  '.popover-secondary': {
    backgroundColor: 'var(--color-secondary)',
    color: 'var(--color-secondary-content)',
  },

  '.popover-secondary .popover-arrow': {
    backgroundColor: 'var(--color-secondary)',
  },

  '.popover-tertiary': {
    backgroundColor: 'var(--color-tertiary)',
    color: 'var(--color-tertiary-content)',
  },

  '.popover-tertiary .popover-arrow': {
    backgroundColor: 'var(--color-tertiary)',
  },

  // Surface variant
  '.popover-surface-highest': {
    backgroundColor: 'var(--color-surface-container-highest)',
  },

  '.popover-surface-highest .popover-arrow': {
    backgroundColor: 'var(--color-surface-container-highest)',
  },

  // Interactive popover (clickable content)
  '.popover-interactive': {
    cursor: 'auto',
  },
};
