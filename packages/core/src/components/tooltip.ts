/**
 * Tooltip component styles (legacy Tailwind plugin interface)
 * Authoritative styles live in tooltip.css — Popover API + CSS Anchor Positioning
 */
export const tooltipStyles: Record<string, any> = {
  '.tooltip[popover]': {
    '--tooltip-bg': 'var(--color-on-surface)',
    '--tooltip-fg': 'var(--color-surface)',
    position: 'absolute',
    inset: 'auto',
    zIndex: '1000',
    margin: '0.5rem',
    padding: '0.375rem 0.75rem',
    fontSize: '0.75rem',
    fontWeight: '500',
    lineHeight: '1rem',
    whiteSpace: 'nowrap',
    backgroundColor: 'var(--tooltip-bg)',
    color: 'var(--tooltip-fg)',
    border: 'none',
    borderRadius: 'var(--radius-xs)',
    boxShadow: 'var(--shadow-md)',
    pointerEvents: 'none',
    opacity: '0',
    transform: 'scale(0.95)',
    overflow: 'visible',
    positionArea: 'top',
    positionTryFallbacks: 'flip-block, flip-inline, flip-block flip-inline',
  },

  '.tooltip[popover]:popover-open': {
    opacity: '1',
    transform: 'scale(1)',
  },

  '.tooltip-top[popover]': { positionArea: 'top' },
  '.tooltip-bottom[popover]': { positionArea: 'bottom' },
  '.tooltip-left[popover]': { positionArea: 'left' },
  '.tooltip-right[popover]': { positionArea: 'right' },

  '.tooltip-primary[popover]': {
    '--tooltip-bg': 'var(--color-primary)',
    '--tooltip-fg': 'var(--color-primary-content)',
  },
  '.tooltip-secondary[popover]': {
    '--tooltip-bg': 'var(--color-secondary)',
    '--tooltip-fg': 'var(--color-secondary-content)',
  },
  '.tooltip-error[popover]': {
    '--tooltip-bg': 'var(--color-error)',
    '--tooltip-fg': 'var(--color-error-content)',
  },
  '.tooltip-light[popover]': {
    '--tooltip-bg': 'var(--color-surface)',
    '--tooltip-fg': 'var(--color-on-surface)',
    border: '1px solid var(--color-outline)',
  },

  '.tooltip-multiline[popover]': {
    whiteSpace: 'normal',
    maxWidth: '16rem',
    textAlign: 'center',
  },
  '.tooltip-rich[popover]': {
    padding: '0.75rem 1rem',
    maxWidth: '20rem',
    whiteSpace: 'normal',
    textAlign: 'left',
  },
  '.tooltip-rich-title': {
    fontSize: '0.8125rem',
    fontWeight: '600',
    marginBottom: '0.25rem',
  },
  '.tooltip-rich-description': {
    fontSize: '0.75rem',
    fontWeight: '400',
    opacity: '0.9',
  },

  '.tooltip-delay': { interestDelay: '300ms' },
  '.tooltip-delay-long': { interestDelay: '500ms' },
  '.tooltip-interactive[popover]': { pointerEvents: 'auto' },
};
