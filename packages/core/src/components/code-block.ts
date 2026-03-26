

/**
 * Code Block component styles
 * Styled container for displaying code with optional header
 */
export const codeBlockStyles: Record<string, any> = {
  '.code-block': {
    border: '1px solid var(--color-outline)',
    borderRadius: '0.5rem',
    overflow: 'hidden',
  },

  '.code-header': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: 'var(--color-surface-container-highest)',
    borderBottom: '1px solid var(--color-outline)',
    fontSize: '0.75rem',
  },

  '.code-title': {
    color: 'var(--color-on-surface)',
    fontWeight: '600',
    marginRight: 'auto',
  },

  '.code-language': {
    color: 'var(--color-on-surface-variant)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontWeight: '500',
  },

  '.code-content': {
    backgroundColor: 'var(--color-surface-container)',
    overflowX: 'auto',
  },

  '.code-content pre': {
    margin: '0',
    padding: '1rem',
    background: 'transparent',
    borderRadius: '0',
    overflowX: 'auto',
  },

  '.code-content code': {
    background: 'transparent',
    padding: '0',
    fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace',
    fontSize: '0.875rem',
    lineHeight: '1.6',
  },
};
