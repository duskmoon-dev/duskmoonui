

/**
 * Skeleton Loader component styles
 * Material Design 3-inspired loading placeholders
 */
export const skeletonStyles: Record<string, any> = {
  // Base skeleton
  '.skeleton': {
    display: 'block',
    backgroundColor: 'hsl(var(--color-surface-variant))',
    borderRadius: '0.25rem',
    animation: 'skeleton-pulse 1.5s ease-in-out infinite',
  },

  '@keyframes skeleton-pulse': {
    '0%, 100%': {
      opacity: '1',
    },
    '50%': {
      opacity: '0.5',
    },
  },

  // Wave animation variant
  '.skeleton-wave': {
    position: 'relative',
    overflow: 'hidden',
    animation: 'none',

    '&::after': {
      content: '""',
      position: 'absolute',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
      background: 'linear-gradient(90deg, transparent, hsla(var(--color-surface-bright), 0.5), transparent)',
      animation: 'skeleton-wave 1.5s ease-in-out infinite',
      transform: 'translateX(-100%)',
    },
  },

  '@keyframes skeleton-wave': {
    '0%': {
      transform: 'translateX(-100%)',
    },
    '100%': {
      transform: 'translateX(100%)',
    },
  },

  // Text skeleton
  '.skeleton-text': {
    height: '1rem',
    width: '100%',
    borderRadius: '0.25rem',
    marginBottom: '0.5rem',
  },

  '.skeleton-text-sm': {
    height: '0.875rem',
  },

  '.skeleton-text-lg': {
    height: '1.25rem',
  },

  // Width variants for text
  '.skeleton-w-full': {
    width: '100%',
  },

  '.skeleton-w-3/4': {
    width: '75%',
  },

  '.skeleton-w-1/2': {
    width: '50%',
  },

  '.skeleton-w-1/4': {
    width: '25%',
  },

  // Circle skeleton (for avatars)
  '.skeleton-circle': {
    borderRadius: '50%',
    width: '3rem',
    height: '3rem',
  },

  '.skeleton-circle-sm': {
    width: '2rem',
    height: '2rem',
  },

  '.skeleton-circle-lg': {
    width: '4rem',
    height: '4rem',
  },

  '.skeleton-circle-xl': {
    width: '6rem',
    height: '6rem',
  },

  // Rectangle skeleton
  '.skeleton-rect': {
    width: '100%',
    height: '12rem',
    borderRadius: '0.5rem',
  },

  '.skeleton-rect-sm': {
    height: '8rem',
  },

  '.skeleton-rect-lg': {
    height: '16rem',
  },

  // Rounded skeleton
  '.skeleton-rounded': {
    borderRadius: '0.75rem',
  },

  '.skeleton-rounded-full': {
    borderRadius: '9999px',
  },

  // Avatar with text combination
  '.skeleton-avatar-text': {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },

  // Card skeleton
  '.skeleton-card': {
    padding: '1rem',
    backgroundColor: 'hsl(var(--color-surface-container))',
    borderRadius: '0.75rem',
  },

  // List item skeleton
  '.skeleton-list-item': {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.75rem 1rem',
  },

  // Button skeleton
  '.skeleton-button': {
    height: '2.5rem',
    width: '6rem',
    borderRadius: '1.25rem',
  },

  '.skeleton-button-sm': {
    height: '2rem',
    width: '5rem',
  },

  '.skeleton-button-lg': {
    height: '3rem',
    width: '8rem',
  },

  // Input skeleton
  '.skeleton-input': {
    height: '2.75rem',
    width: '100%',
    borderRadius: '0.25rem',
  },

  // No animation variant
  '.skeleton-static': {
    animation: 'none',

    '&::after': {
      display: 'none',
    },
  },

  // Container for multiple skeletons
  '.skeleton-group': {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
};
