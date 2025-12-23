

/**
 * Avatar component styles
 * Material Design 3-inspired avatars for user representation
 */
export const avatarStyles: Record<string, any> = {
  // Base avatar
  '.avatar': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2.5rem',
    height: '2.5rem',
    fontSize: '1rem',
    fontWeight: '500',
    color: 'var(--color-on-tertiary-container)',
    backgroundColor: 'var(--color-tertiary-container)',
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: '0',
    userSelect: 'none',
  },

  // Avatar image
  '.avatar-image': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  // Size variants
  '.avatar-xs': {
    width: '1.5rem',
    height: '1.5rem',
    fontSize: '0.625rem',
  },

  '.avatar-sm': {
    width: '2rem',
    height: '2rem',
    fontSize: '0.813rem',
  },

  '.avatar-md': {
    width: '2.5rem',
    height: '2.5rem',
    fontSize: '1rem',
  },

  '.avatar-lg': {
    width: '3rem',
    height: '3rem',
    fontSize: '1.25rem',
  },

  '.avatar-xl': {
    width: '4rem',
    height: '4rem',
    fontSize: '1.5rem',
  },

  '.avatar-2xl': {
    width: '6rem',
    height: '6rem',
    fontSize: '2rem',
  },

  // Shape variants
  '.avatar-circle': {
    borderRadius: '50%',
  },

  '.avatar-rounded': {
    borderRadius: '0.5rem',
  },

  '.avatar-square': {
    borderRadius: '0',
  },

  // Color variants
  '.avatar-primary': {
    backgroundColor: 'var(--color-primary-container)',
    color: 'var(--color-on-primary-container)',
  },

  '.avatar-secondary': {
    backgroundColor: 'var(--color-secondary-container)',
    color: 'var(--color-on-secondary-container)',
  },

  '.avatar-tertiary': {
    backgroundColor: 'var(--color-tertiary-container)',
    color: 'var(--color-on-tertiary-container)',
  },

  '.avatar-success': {
    backgroundColor: 'color-mix(in oklch, var(--color-success) 15%, transparent)',
    color: 'var(--color-success)',
  },

  '.avatar-error': {
    backgroundColor: 'color-mix(in oklch, var(--color-error) 15%, transparent)',
    color: 'var(--color-error)',
  },

  '.avatar-warning': {
    backgroundColor: 'color-mix(in oklch, var(--color-warning) 15%, transparent)',
    color: 'var(--color-warning)',
  },

  '.avatar-info': {
    backgroundColor: 'color-mix(in oklch, var(--color-info) 15%, transparent)',
    color: 'var(--color-info)',
  },

  // Status indicator
  '.avatar-status': {
    position: 'relative',
  },

  '.avatar-status::after': {
    content: '""',
    position: 'absolute',
    bottom: '0',
    right: '0',
    width: '0.75rem',
    height: '0.75rem',
    borderRadius: '50%',
    border: '2px solid var(--color-surface)',
  },

  '.avatar-status-online::after': {
    backgroundColor: 'var(--color-success)',
  },

  '.avatar-status-offline::after': {
    backgroundColor: 'var(--color-on-surface-variant)',
  },

  '.avatar-status-busy::after': {
    backgroundColor: 'var(--color-error)',
  },

  '.avatar-status-away::after': {
    backgroundColor: 'var(--color-warning)',
  },

  // Status size variants
  '.avatar-xs.avatar-status::after, .avatar-sm.avatar-status::after': {
    width: '0.5rem',
    height: '0.5rem',
    borderWidth: '1.5px',
  },

  '.avatar-lg.avatar-status::after, .avatar-xl.avatar-status::after': {
    width: '1rem',
    height: '1rem',
  },

  '.avatar-2xl.avatar-status::after': {
    width: '1.25rem',
    height: '1.25rem',
    borderWidth: '3px',
  },

  // Avatar with border
  '.avatar-bordered': {
    border: '2px solid var(--color-surface)',
    boxShadow: '0 0 0 2px var(--color-outline-variant)',
  },

  // Avatar group (stacked avatars)
  '.avatar-group': {
    display: 'inline-flex',
    alignItems: 'center',
  },

  '.avatar-group .avatar': {
    marginLeft: '-0.5rem',
    border: '2px solid var(--color-surface)',
  },

  '.avatar-group .avatar:first-child': {
    marginLeft: '0',
  },

  '.avatar-group .avatar:hover': {
    zIndex: '1',
    transform: 'scale(1.1)',
    transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Dense avatar group
  '.avatar-group-dense .avatar': {
    marginLeft: '-0.75rem',
  },

  // Avatar group size adjustments
  '.avatar-group-xs .avatar': {
    marginLeft: '-0.375rem',
  },

  '.avatar-group-sm .avatar': {
    marginLeft: '-0.5rem',
  },

  '.avatar-group-lg .avatar': {
    marginLeft: '-0.75rem',
  },

  '.avatar-group-xl .avatar': {
    marginLeft: '-1rem',
  },

  // Avatar overflow indicator (+N more)
  '.avatar-overflow': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.813rem',
    fontWeight: '600',
    backgroundColor: 'var(--color-surface-variant)',
    color: 'var(--color-on-surface-variant)',
  },

  // Clickable avatar
  '.avatar-clickable': {
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
    },

    '&:active': {
      transform: 'scale(0.98)',
    },
  },

  // Avatar with icon
  '.avatar-icon': {
    fontSize: '1.25rem',
  },

  '.avatar-xs .avatar-icon, .avatar-sm .avatar-icon': {
    fontSize: '1rem',
  },

  '.avatar-lg .avatar-icon': {
    fontSize: '1.5rem',
  },

  '.avatar-xl .avatar-icon': {
    fontSize: '2rem',
  },

  '.avatar-2xl .avatar-icon': {
    fontSize: '2.5rem',
  },
};
