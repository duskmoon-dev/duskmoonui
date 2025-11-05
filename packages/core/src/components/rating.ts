import type { CSSRuleObject } from 'tailwindcss/types/config';

/**
 * Rating component styles
 * Material Design 3-inspired rating component
 */
export const ratingStyles: Record<string, CSSRuleObject> = {
  // Base rating container
  '.rating': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
  },

  // Rating item (star/icon)
  '.rating-item': {
    cursor: 'pointer',
    fontSize: '1.5rem',
    color: 'hsl(var(--color-outline))',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    userSelect: 'none',
  },

  // Filled state - Primary
  '.rating-item-filled, .rating-item-primary-filled': {
    color: 'hsl(var(--color-primary))',
  },

  // Half filled
  '.rating-item-half': {
    position: 'relative',
    overflow: 'hidden',
  },

  '.rating-item-half::before': {
    content: '★',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '50%',
    overflow: 'hidden',
    color: 'hsl(var(--color-primary))',
  },

  // Hover state
  '.rating-item:hover': {
    transform: 'scale(1.1)',
    color: 'hsl(var(--color-primary-focus))',
  },

  '.rating-item-filled:hover': {
    color: 'hsl(var(--color-primary-focus))',
  },

  // Secondary variant
  '.rating-secondary .rating-item-filled': {
    color: 'hsl(var(--color-secondary))',
  },

  '.rating-secondary .rating-item:hover': {
    color: 'hsl(var(--color-secondary-focus))',
  },

  // Tertiary variant
  '.rating-tertiary .rating-item-filled': {
    color: 'hsl(var(--color-tertiary))',
  },

  '.rating-tertiary .rating-item:hover': {
    color: 'hsl(var(--color-tertiary-focus))',
  },

  // Warning/amber variant (typical for ratings)
  '.rating-warning .rating-item-filled': {
    color: 'hsl(45 100% 50%)',
  },

  '.rating-warning .rating-item:hover': {
    color: 'hsl(45 100% 45%)',
  },

  // Size variants
  '.rating-sm .rating-item': {
    fontSize: '1rem',
    gap: '0.125rem',
  },

  '.rating-lg .rating-item': {
    fontSize: '2rem',
    gap: '0.375rem',
  },

  '.rating-xl .rating-item': {
    fontSize: '2.5rem',
    gap: '0.5rem',
  },

  // Readonly state
  '.rating-readonly': {
    pointerEvents: 'none',
  },

  '.rating-readonly .rating-item': {
    cursor: 'default',
  },

  // Disabled state
  '.rating-disabled': {
    opacity: '0.5',
    pointerEvents: 'none',
    cursor: 'not-allowed',
  },

  // Focus state (for keyboard navigation)
  '.rating-item:focus-visible': {
    outline: '2px solid hsl(var(--color-primary))',
    outlineOffset: '2px',
    borderRadius: '0.25rem',
  },

  // Label
  '.rating-label': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'hsl(var(--color-on-surface))',
  },

  // Value display
  '.rating-value': {
    marginLeft: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'hsl(var(--color-on-surface-variant))',
  },

  // Count display (e.g., "(123 reviews)")
  '.rating-count': {
    marginLeft: '0.25rem',
    fontSize: '0.75rem',
    color: 'hsl(var(--color-on-surface-variant))',
  },

  // Precision variants
  '.rating-precision-full': {
    // Full star precision (default)
  },

  '.rating-precision-half': {
    // Half star precision
  },

  '.rating-precision-decimal': {
    // Decimal precision
  },

  // Icon variants
  '.rating-heart .rating-item': {
    content: '♡',
  },

  '.rating-heart .rating-item-filled': {
    content: '♥',
  },

  // Interactive highlight
  '.rating-interactive .rating-item': {
    transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  '.rating-interactive .rating-item:hover,\n  .rating-interactive .rating-item-hover': {
    color: 'hsl(var(--color-primary))',
    transform: 'scale(1.15)',
  },

  // With description
  '.rating-with-description': {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },

  '.rating-description': {
    fontSize: '0.875rem',
    color: 'hsl(var(--color-on-surface-variant))',
    marginTop: '0.25rem',
  },

  // Vertical layout
  '.rating-vertical': {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.5rem',
  },

  // Clearable (with clear button)
  '.rating-clearable': {
    position: 'relative',
  },

  '.rating-clear-btn': {
    marginLeft: '0.5rem',
    padding: '0.25rem',
    fontSize: '1rem',
    color: 'hsl(var(--color-on-surface-variant))',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '0.25rem',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  '.rating-clear-btn:hover': {
    color: 'hsl(var(--color-error))',
    backgroundColor: 'color-mix(in srgb, hsl(var(--color-error)) 1%, transparent)',
  },
};
