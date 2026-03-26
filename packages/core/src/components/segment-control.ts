

/**
 * Segment Control component styles
 * Material Design 3-inspired segmented button/toggle group
 */
export const segmentControlStyles: Record<string, any> = {
  '.segment-control': {
    display: 'inline-flex',
    alignItems: 'stretch',
    color: 'var(--color-on-surface)',
    backgroundColor: 'var(--color-surface-container)',
    border: '1px solid var(--color-outline)',
    borderRadius: '1.25rem',
    padding: '0.25rem',
    gap: '0.25rem',
  },

  '.segment-item': {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.25rem',
    color: 'var(--color-on-surface)',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '1rem',
    cursor: 'pointer',
    transition: 'background-color 150ms ease-in-out, color 150ms ease-in-out',
    userSelect: 'none',
    whiteSpace: 'nowrap',

    '&:disabled': {
      opacity: '0.38',
      cursor: 'not-allowed',
    },
  },

  '.segment-item-active': {
    backgroundColor: 'var(--color-primary-container)',
    color: 'var(--color-on-primary-container)',
  },

  '.segment-control-primary .segment-item-active': {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-primary-content)',
  },

  '.segment-control-full': {
    display: 'flex',
    width: '100%',
  },

  '.segment-control-full .segment-item': {
    flex: '1',
  },
};
