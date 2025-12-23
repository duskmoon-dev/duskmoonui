

/**
 * Divider component styles
 * Material Design 3-inspired dividers for content separation
 */
export const dividerStyles: Record<string, any> = {
  // Base divider (horizontal)
  '.divider': {
    height: '1px',
    width: '100%',
    backgroundColor: 'var(--color-outline-variant)',
    border: 'none',
    margin: '1rem 0',
  },

  // Vertical divider
  '.divider-vertical': {
    width: '1px',
    height: 'auto',
    minHeight: '1.5rem',
    backgroundColor: 'var(--color-outline-variant)',
    margin: '0 1rem',
    alignSelf: 'stretch',
  },

  // Style variants
  '.divider-solid': {
    backgroundImage: 'none',
  },

  '.divider-dashed': {
    height: '0',
    borderTop: '1px dashed var(--color-outline-variant)',
    backgroundColor: 'transparent',
  },

  '.divider-dotted': {
    height: '0',
    borderTop: '1px dotted var(--color-outline-variant)',
    backgroundColor: 'transparent',
  },

  '.divider-vertical.divider-dashed': {
    width: '0',
    height: 'auto',
    borderTop: 'none',
    borderLeft: '1px dashed var(--color-outline-variant)',
  },

  '.divider-vertical.divider-dotted': {
    width: '0',
    height: 'auto',
    borderTop: 'none',
    borderLeft: '1px dotted var(--color-outline-variant)',
  },

  // Thickness variants
  '.divider-thin': {
    height: '1px',
  },

  '.divider-medium': {
    height: '2px',
  },

  '.divider-thick': {
    height: '4px',
  },

  '.divider-vertical.divider-thin': {
    width: '1px',
    height: 'auto',
  },

  '.divider-vertical.divider-medium': {
    width: '2px',
    height: 'auto',
  },

  '.divider-vertical.divider-thick': {
    width: '4px',
    height: 'auto',
  },

  // Color variants
  '.divider-primary': {
    backgroundColor: 'var(--color-primary)',
  },

  '.divider-secondary': {
    backgroundColor: 'var(--color-secondary)',
  },

  '.divider-tertiary': {
    backgroundColor: 'var(--color-tertiary)',
  },

  '.divider-primary.divider-dashed, .divider-primary.divider-dotted': {
    backgroundColor: 'transparent',
    borderTopColor: 'var(--color-primary)',
  },

  '.divider-secondary.divider-dashed, .divider-secondary.divider-dotted': {
    backgroundColor: 'transparent',
    borderTopColor: 'var(--color-secondary)',
  },

  '.divider-tertiary.divider-dashed, .divider-tertiary.divider-dotted': {
    backgroundColor: 'transparent',
    borderTopColor: 'var(--color-tertiary)',
  },

  '.divider-vertical.divider-primary.divider-dashed, .divider-vertical.divider-primary.divider-dotted': {
    borderLeftColor: 'var(--color-primary)',
    borderTopColor: 'transparent',
  },

  '.divider-vertical.divider-secondary.divider-dashed, .divider-vertical.divider-secondary.divider-dotted': {
    borderLeftColor: 'var(--color-secondary)',
    borderTopColor: 'transparent',
  },

  '.divider-vertical.divider-tertiary.divider-dashed, .divider-vertical.divider-tertiary.divider-dotted': {
    borderLeftColor: 'var(--color-tertiary)',
    borderTopColor: 'transparent',
  },

  // Gradient dividers
  '.divider-gradient-primary': {
    background: 'linear-gradient(to right, transparent, var(--color-primary), transparent)',
  },

  '.divider-gradient-secondary': {
    background: 'linear-gradient(to right, transparent, var(--color-secondary), transparent)',
  },

  '.divider-gradient-tertiary': {
    background: 'linear-gradient(to right, transparent, var(--color-tertiary), transparent)',
  },

  '.divider-vertical.divider-gradient-primary': {
    background: 'linear-gradient(to bottom, transparent, var(--color-primary), transparent)',
  },

  '.divider-vertical.divider-gradient-secondary': {
    background: 'linear-gradient(to bottom, transparent, var(--color-secondary), transparent)',
  },

  '.divider-vertical.divider-gradient-tertiary': {
    background: 'linear-gradient(to bottom, transparent, var(--color-tertiary), transparent)',
  },

  // Spacing variants
  '.divider-compact': {
    margin: '0.5rem 0',
  },

  '.divider-comfortable': {
    margin: '1.5rem 0',
  },

  '.divider-spacious': {
    margin: '2rem 0',
  },

  '.divider-vertical.divider-compact': {
    margin: '0 0.5rem',
  },

  '.divider-vertical.divider-comfortable': {
    margin: '0 1.5rem',
  },

  '.divider-vertical.divider-spacious': {
    margin: '0 2rem',
  },

  // Divider with text/label
  '.divider-text': {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    color: 'var(--color-on-surface-variant)',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',

    '&::before, &::after': {
      content: '""',
      flex: '1 1 auto',
      height: '1px',
      backgroundColor: 'var(--color-outline-variant)',
    },
  },

  '.divider-text-left': {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    color: 'var(--color-on-surface-variant)',
    fontWeight: '500',

    '&::after': {
      content: '""',
      flex: '1 1 auto',
      height: '1px',
      backgroundColor: 'var(--color-outline-variant)',
    },
  },

  '.divider-text-right': {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    color: 'var(--color-on-surface-variant)',
    fontWeight: '500',

    '&::before': {
      content: '""',
      flex: '1 1 auto',
      height: '1px',
      backgroundColor: 'var(--color-outline-variant)',
    },
  },

  // Inset divider (for lists)
  '.divider-inset': {
    marginLeft: '1rem',
    width: 'calc(100% - 1rem)',
  },

  '.divider-inset-both': {
    marginLeft: '1rem',
    marginRight: '1rem',
    width: 'calc(100% - 2rem)',
  },
};
