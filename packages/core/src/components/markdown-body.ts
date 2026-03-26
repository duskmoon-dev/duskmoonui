

/**
 * Markdown Body component styles
 * GitHub-style typography for rendered markdown content
 */
export const markdownBodyStyles: Record<string, any> = {
  '.markdown-body': {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif',
    fontSize: '16px',
    lineHeight: '1.5',
    wordWrap: 'break-word',
    color: 'var(--color-on-surface)',
  },

  '.markdown-body h1': {
    fontSize: '2em',
    paddingBottom: '0.3em',
    borderBottom: '1px solid var(--color-outline-variant)',
    marginTop: '1.5rem',
    marginBottom: '1rem',
    fontWeight: '600',
    lineHeight: '1.25',
  },

  '.markdown-body h2': {
    fontSize: '1.5em',
    paddingBottom: '0.3em',
    borderBottom: '1px solid var(--color-outline-variant)',
    marginTop: '1.5rem',
    marginBottom: '1rem',
    fontWeight: '600',
    lineHeight: '1.25',
  },

  '.markdown-body a': {
    color: 'var(--color-primary)',
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'underline',
    },
  },

  '.markdown-body code': {
    fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace',
    fontSize: '0.85em',
    padding: '0.2em 0.4em',
    backgroundColor: 'var(--color-surface-container-high)',
    borderRadius: '6px',
  },

  '.markdown-body pre': {
    fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace',
    fontSize: '0.85em',
    lineHeight: '1.45',
    padding: '1rem',
    marginBottom: '1rem',
    overflowX: 'auto',
    backgroundColor: 'var(--color-surface-container)',
    borderRadius: '6px',
  },

  '.markdown-body blockquote': {
    marginBottom: '1rem',
    paddingLeft: '1em',
    borderLeft: '0.25em solid var(--color-outline-variant)',
    color: 'var(--color-on-surface-variant)',
  },

  '.markdown-body table': {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '1rem',
  },

  '.markdown-body th, .markdown-body td': {
    padding: '0.5rem 0.75rem',
    border: '1px solid var(--color-outline-variant)',
  },

  '.markdown-body th': {
    fontWeight: '600',
    backgroundColor: 'var(--color-surface-container)',
  },
};
