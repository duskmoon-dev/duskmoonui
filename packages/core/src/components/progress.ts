

/**
 * Progress component styles
 * Material Design 3-inspired progress indicators (linear and circular)
 */
export const progressStyles: Record<string, any> = {
  // Linear progress base
  '.progress': {
    position: 'relative',
    width: '100%',
    height: '0.25rem',
    backgroundColor: 'var(--color-primary-container)',
    borderRadius: '0.125rem',
    overflow: 'hidden',
  },

  // Progress bar (determinate)
  '.progress-bar': {
    height: '100%',
    backgroundColor: 'var(--color-primary)',
    borderRadius: '0.125rem',
    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Indeterminate animation
  '.progress-indeterminate .progress-bar': {
    width: '100%',
    transformOrigin: '0% 50%',
    animation: 'progress-indeterminate 2s infinite cubic-bezier(0.4, 0, 0.2, 1)',
  },

  '@keyframes progress-indeterminate': {
    '0%': {
      transform: 'translateX(-100%) scaleX(0.3)',
    },
    '40%': {
      transform: 'translateX(0%) scaleX(0.4)',
    },
    '100%': {
      transform: 'translateX(100%) scaleX(0.5)',
    },
  },

  // Color variants
  '.progress-secondary .progress-bar': {
    backgroundColor: 'var(--color-secondary)',
  },

  '.progress-secondary': {
    backgroundColor: 'var(--color-secondary-container)',
  },

  '.progress-tertiary .progress-bar': {
    backgroundColor: 'var(--color-tertiary)',
  },

  '.progress-tertiary': {
    backgroundColor: 'var(--color-tertiary-container)',
  },

  '.progress-success .progress-bar': {
    backgroundColor: 'var(--color-success)',
  },

  '.progress-success': {
    backgroundColor: 'color-mix(in oklch, var(--color-success) 20%, transparent)',
  },

  '.progress-error .progress-bar': {
    backgroundColor: 'var(--color-error)',
  },

  '.progress-error': {
    backgroundColor: 'color-mix(in oklch, var(--color-error) 20%, transparent)',
  },

  '.progress-warning .progress-bar': {
    backgroundColor: 'var(--color-warning)',
  },

  '.progress-warning': {
    backgroundColor: 'color-mix(in oklch, var(--color-warning) 20%, transparent)',
  },

  '.progress-info .progress-bar': {
    backgroundColor: 'var(--color-info)',
  },

  '.progress-info': {
    backgroundColor: 'color-mix(in oklch, var(--color-info) 20%, transparent)',
  },

  // Size variants
  '.progress-sm': {
    height: '0.125rem',
  },

  '.progress-md': {
    height: '0.25rem',
  },

  '.progress-lg': {
    height: '0.5rem',
  },

  '.progress-xl': {
    height: '0.75rem',
  },

  // With label
  '.progress-labeled': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },

  '.progress-label': {
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.25rem',
    color: 'var(--color-on-surface)',
    minWidth: '3rem',
    textAlign: 'right',
  },

  // Circular progress
  '.progress-circular': {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '3rem',
    height: '3rem',
  },

  '.progress-circular-svg': {
    transform: 'rotate(-90deg)',
  },

  '.progress-circular-track': {
    fill: 'none',
    stroke: 'var(--color-primary-container)',
    strokeWidth: '4',
  },

  '.progress-circular-bar': {
    fill: 'none',
    stroke: 'var(--color-primary)',
    strokeWidth: '4',
    strokeLinecap: 'round',
    transition: 'stroke-dashoffset 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Circular indeterminate
  '.progress-circular-indeterminate .progress-circular-bar': {
    animation: 'progress-circular-rotate 2s linear infinite',
  },

  '@keyframes progress-circular-rotate': {
    '0%': {
      strokeDasharray: '1, 200',
      strokeDashoffset: '0',
    },
    '50%': {
      strokeDasharray: '100, 200',
      strokeDashoffset: '-15',
    },
    '100%': {
      strokeDasharray: '100, 200',
      strokeDashoffset: '-125',
    },
  },

  // Circular size variants
  '.progress-circular-sm': {
    width: '2rem',
    height: '2rem',
  },

  '.progress-circular-md': {
    width: '3rem',
    height: '3rem',
  },

  '.progress-circular-lg': {
    width: '4rem',
    height: '4rem',
  },

  '.progress-circular-xl': {
    width: '6rem',
    height: '6rem',
  },

  // Circular with percentage
  '.progress-circular-label': {
    position: 'absolute',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'var(--color-on-surface)',
  },

  '.progress-circular-lg .progress-circular-label': {
    fontSize: '0.875rem',
  },

  '.progress-circular-xl .progress-circular-label': {
    fontSize: '1rem',
  },

  // Buffer progress (for video/audio)
  '.progress-buffer': {
    position: 'relative',
  },

  '.progress-buffer-bar': {
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    backgroundColor: 'color-mix(in oklch, var(--color-primary) 30%, transparent)',
    borderRadius: '0.125rem',
    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};
