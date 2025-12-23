

/**
 * Slider component styles
 * Material Design 3-inspired slider for value selection
 */
export const sliderStyles: Record<string, any> = {
  // Base slider container
  '.slider': {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '2.5rem',
    cursor: 'pointer',
    userSelect: 'none',
  },

  // Slider track (background)
  '.slider-track': {
    position: 'relative',
    width: '100%',
    height: '0.25rem',
    backgroundColor: 'var(--color-primary-container)',
    borderRadius: '0.125rem',
  },

  // Slider filled track
  '.slider-track-filled': {
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    backgroundColor: 'var(--color-primary)',
    borderRadius: '0.125rem',
    transition: 'width 0.1s ease',
  },

  // Slider thumb
  '.slider-thumb': {
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '1.25rem',
    height: '1.25rem',
    backgroundColor: 'var(--color-primary)',
    border: '2px solid var(--color-surface)',
    borderRadius: '50%',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
    cursor: 'grab',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: '1',

    '&:hover': {
      transform: 'translate(-50%, -50%) scale(1.1)',
    },

    '&:active': {
      cursor: 'grabbing',
      transform: 'translate(-50%, -50%) scale(1.2)',
      boxShadow: '0 0 0 8px color-mix(in oklch, var(--color-primary) 12%, transparent)',
    },
  },

  // Slider thumb with value label
  '.slider-thumb-label': {
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    marginBottom: '0.5rem',
    padding: '0.25rem 0.5rem',
    fontSize: '0.75rem',
    fontWeight: '500',
    color: 'var(--color-inverse-on-surface)',
    backgroundColor: 'var(--color-inverse-surface)',
    borderRadius: '0.25rem',
    whiteSpace: 'nowrap',
    opacity: '0',
    visibility: 'hidden',
    transition: 'opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  '.slider-thumb:hover .slider-thumb-label, .slider-thumb:active .slider-thumb-label': {
    opacity: '1',
    visibility: 'visible',
  },

  // Always show label variant
  '.slider-labels-always .slider-thumb-label': {
    opacity: '1',
    visibility: 'visible',
  },

  // Discrete slider (with steps/marks)
  '.slider-marks': {
    position: 'absolute',
    top: '50%',
    left: '0',
    right: '0',
    transform: 'translateY(-50%)',
    display: 'flex',
    justifyContent: 'space-between',
  },

  '.slider-mark': {
    width: '0.375rem',
    height: '0.375rem',
    backgroundColor: 'var(--color-primary-container)',
    borderRadius: '50%',
    transition: 'background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  '.slider-mark-active': {
    backgroundColor: 'var(--color-primary)',
  },

  // Mark labels
  '.slider-mark-label': {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    marginTop: '0.5rem',
    fontSize: '0.75rem',
    color: 'var(--color-on-surface-variant)',
    whiteSpace: 'nowrap',
  },

  // Min/Max labels
  '.slider-labels': {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '0.5rem',
    fontSize: '0.75rem',
    color: 'var(--color-on-surface-variant)',
  },

  // Range slider (two thumbs)
  '.slider-range .slider-thumb:first-of-type': {
    zIndex: '2',
  },

  '.slider-range .slider-thumb:last-of-type': {
    zIndex: '2',
  },

  // Color variants
  '.slider-secondary .slider-track-filled, .slider-secondary .slider-thumb': {
    backgroundColor: 'var(--color-secondary)',
  },

  '.slider-secondary .slider-track': {
    backgroundColor: 'var(--color-secondary-container)',
  },

  '.slider-secondary .slider-thumb:active': {
    boxShadow: '0 0 0 8px color-mix(in oklch, var(--color-secondary) 12%, transparent)',
  },

  '.slider-tertiary .slider-track-filled, .slider-tertiary .slider-thumb': {
    backgroundColor: 'var(--color-tertiary)',
  },

  '.slider-tertiary .slider-track': {
    backgroundColor: 'var(--color-tertiary-container)',
  },

  '.slider-tertiary .slider-thumb:active': {
    boxShadow: '0 0 0 8px color-mix(in oklch, var(--color-tertiary) 12%, transparent)',
  },

  // Size variants
  '.slider-sm': {
    height: '2rem',
  },

  '.slider-sm .slider-track': {
    height: '0.188rem',
  },

  '.slider-sm .slider-thumb': {
    width: '1rem',
    height: '1rem',
  },

  '.slider-lg': {
    height: '3rem',
  },

  '.slider-lg .slider-track': {
    height: '0.375rem',
  },

  '.slider-lg .slider-thumb': {
    width: '1.5rem',
    height: '1.5rem',
  },

  // Vertical slider
  '.slider-vertical': {
    width: '2.5rem',
    height: '12rem',
    flexDirection: 'column',
  },

  '.slider-vertical .slider-track': {
    width: '0.25rem',
    height: '100%',
  },

  '.slider-vertical .slider-track-filled': {
    width: '100%',
    height: 'auto',
    bottom: '0',
    top: 'auto',
  },

  '.slider-vertical .slider-thumb': {
    left: '50%',
    top: 'auto',
    transform: 'translate(-50%, 50%)',

    '&:hover': {
      transform: 'translate(-50%, 50%) scale(1.1)',
    },

    '&:active': {
      transform: 'translate(-50%, 50%) scale(1.2)',
    },
  },

  // Disabled slider
  '.slider-disabled': {
    opacity: '0.38',
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },

  '.slider-disabled .slider-thumb': {
    cursor: 'not-allowed',
  },

  // Focus state
  '.slider:focus-visible .slider-thumb': {
    outline: '2px solid var(--color-primary)',
    outlineOffset: '2px',
  },
};
