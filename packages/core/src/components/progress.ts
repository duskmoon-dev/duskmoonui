import type { CSSRuleObject } from 'tailwindcss/types/config';

/**
 * Progress component styles
 * Material Design 3-inspired progress indicators (linear and circular)
 */
export const progressStyles: Record<string, CSSRuleObject> = {
  // Linear progress base
  '.progress': {
    position: 'relative',
    width: '100%',
    height: '0.25rem',
    backgroundColor: 'hsl(var(--color-primary-container))',
    borderRadius: '0.125rem',
    overflow: 'hidden',
  },

  // Progress bar (determinate)
  '.progress-bar': {
    height: '100%',
    backgroundColor: 'hsl(var(--color-primary))',
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
    backgroundColor: 'hsl(var(--color-secondary))',
  },

  '.progress-secondary': {
    backgroundColor: 'hsl(var(--color-secondary-container))',
  },

  '.progress-tertiary .progress-bar': {
    backgroundColor: 'hsl(var(--color-tertiary))',
  },

  '.progress-tertiary': {
    backgroundColor: 'hsl(var(--color-tertiary-container))',
  },

  '.progress-success .progress-bar': {
    backgroundColor: 'hsl(var(--color-success))',
  },

  '.progress-success': {
    backgroundColor: 'rgba(var(--color-success-rgb), 0.2)',
  },

  '.progress-error .progress-bar': {
    backgroundColor: 'hsl(var(--color-error))',
  },

  '.progress-error': {
    backgroundColor: 'rgba(var(--color-error-rgb), 0.2)',
  },

  '.progress-warning .progress-bar': {
    backgroundColor: 'hsl(var(--color-warning))',
  },

  '.progress-warning': {
    backgroundColor: 'rgba(var(--color-warning-rgb), 0.2)',
  },

  '.progress-info .progress-bar': {
    backgroundColor: 'hsl(var(--color-info))',
  },

  '.progress-info': {
    backgroundColor: 'rgba(var(--color-info-rgb), 0.2)',
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
    color: 'hsl(var(--color-on-surface))',
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
    stroke: 'hsl(var(--color-primary-container))',
    strokeWidth: '4',
  },

  '.progress-circular-bar': {
    fill: 'none',
    stroke: 'hsl(var(--color-primary))',
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
    color: 'hsl(var(--color-on-surface))',
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
    backgroundColor: 'rgba(var(--color-primary-rgb), 0.3)',
    borderRadius: '0.125rem',
    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};
