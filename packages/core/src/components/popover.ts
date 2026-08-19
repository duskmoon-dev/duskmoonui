/**
 * Popover component styles (legacy Tailwind plugin interface)
 * Authoritative styles live in popover.css — Popover API + CSS Anchor Positioning
 */
export const popoverStyles: Record<string, any> = {
  '.popover': {
    '--popover-color-intensity': '30%',
  },

  '.popover[popover]': {
    position: 'absolute',
    inset: 'auto',
    zIndex: '1050',
    minWidth: '12rem',
    maxWidth: '20rem',
    padding: '1rem',
    margin: '0.5rem',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-outline-variant)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-lg)',
    opacity: '0',
    transform: 'scale(0.95)',
    positionArea: 'bottom',
    positionTryFallbacks: 'flip-block, flip-inline, flip-block flip-inline',
  },

  '.popover[popover]:popover-open': {
    opacity: '1',
    visibility: 'visible',
    transform: 'scale(1)',
  },

  '.popover-top[popover]': { positionArea: 'top' },
  '.popover-bottom[popover]': { positionArea: 'bottom' },
  '.popover-left[popover]': { positionArea: 'left' },
  '.popover-right[popover]': { positionArea: 'right' },

  '.popover-arrow': {
    position: 'absolute',
    width: '0.75rem',
    height: '0.75rem',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-outline-variant)',
    transform: 'rotate(45deg)',
  },

  '.popover-no-arrow > .popover-arrow': {
    display: 'none',
  },

  '.popover-header': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    paddingBottom: '0.75rem',
    marginBottom: '0.75rem',
    borderBottom: '1px solid var(--color-outline-variant)',
  },

  '.popover-title': {
    flex: '1',
    minWidth: '0',
    margin: '0',
    fontSize: '0.875rem',
    fontWeight: '600',
    lineHeight: '1.5rem',
    color: 'var(--color-on-surface)',
  },

  '.popover-body': {
    fontSize: '0.875rem',
    color: 'var(--color-on-surface-variant)',
    lineHeight: '1.5',
  },

  '.popover-footer': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '0.5rem',
    paddingTop: '0.75rem',
    marginTop: '0.75rem',
    borderTop: '1px solid var(--color-outline-variant)',
  },

  '.popover-close': {
    display: 'inline-flex',
    flexShrink: '0',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.5rem',
    height: '1.5rem',
    marginInlineStart: 'auto',
    padding: '0',
    color: 'var(--color-on-surface-variant)',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: 'var(--radius-xs)',
    cursor: 'pointer',
  },

  '.popover[popover] > .popover-close': {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    marginInlineStart: '0',
  },

  '.popover[popover]:has(> .popover-close) > .popover-header': {
    paddingRight: '1.75rem',
  },

  '.popover-sm[popover]': {
    minWidth: '8rem',
    maxWidth: '14rem',
    padding: '0.75rem',
  },

  '.popover-lg[popover]': {
    minWidth: '16rem',
    maxWidth: '28rem',
    padding: '1.25rem',
  },

  '.popover-primary[popover]': {
    backgroundColor:
      'color-mix(in oklch, var(--color-primary) var(--popover-color-intensity), var(--color-surface))',
    borderColor: 'var(--color-primary)',
  },

  '.popover-secondary[popover]': {
    backgroundColor:
      'color-mix(in oklch, var(--color-secondary) var(--popover-color-intensity), var(--color-surface))',
    borderColor: 'var(--color-secondary)',
  },

  '.popover-tertiary[popover]': {
    backgroundColor:
      'color-mix(in oklch, var(--color-tertiary) var(--popover-color-intensity), var(--color-surface))',
    borderColor: 'var(--color-tertiary)',
  },

  '.popover-surface-highest[popover]': {
    backgroundColor: 'var(--color-surface-container-highest)',
  },

  '.popover-modal[popover]::backdrop': {
    backgroundColor: 'color-mix(in srgb, var(--color-scrim) 30%, transparent)',
  },
};
