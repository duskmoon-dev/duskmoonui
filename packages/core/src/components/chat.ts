/**
 * Chat component styles
 * CSS-only primitives for conversational and LLM chat interfaces
 */
export const chatStyles: Record<string, any> = {
  '.chat': {
    display: 'grid',
    gridTemplateColumns: 'auto minmax(0, 1fr)',
    columnGap: '0.75rem',
    alignItems: 'end',
    padding: '0.25rem 0',
  },

  '.chat-start': {
    gridTemplateColumns: 'auto minmax(0, 1fr)',
  },

  '.chat-end': {
    gridTemplateColumns: 'minmax(0, 1fr) auto',
  },

  '.chat-avatar': {
    gridRow: '1 / span 999',
    gridColumn: '1',
    alignSelf: 'start',
    justifySelf: 'start',
  },

  '.chat-end .chat-avatar': {
    gridColumn: '2',
    justifySelf: 'end',
  },

  '.chat > :not(.chat-avatar)': {
    gridColumn: '2',
    justifySelf: 'start',
    maxWidth: '100%',
    marginBottom: '0.25rem',
  },

  '.chat-end > :not(.chat-avatar)': {
    gridColumn: '1',
    justifySelf: 'end',
  },

  '.chat-header, .chat-footer': {
    color: 'var(--color-on-surface-variant)',
    fontSize: '0.75rem',
    lineHeight: '1rem',
  },

  '.chat-header': {
    marginBottom: '0.125rem',
  },

  '.chat-footer': {
    marginTop: '0.125rem',
    marginBottom: '0',
  },

  '.chat-bubble': {
    '--chat-bubble-bg': 'var(--color-surface-container-highest)',
    '--chat-bubble-fg': 'var(--color-on-surface)',
    position: 'relative',
    maxWidth: 'min(80ch, 100%)',
    padding: '0.625rem 0.875rem',
    borderRadius: '1rem',
    backgroundColor: 'var(--chat-bubble-bg)',
    color: 'var(--chat-bubble-fg)',
    boxShadow: 'inset 0 0 0 1px var(--color-outline-variant)',
    fontSize: '0.875rem',
    lineHeight: '1.45',
    overflowWrap: 'anywhere',
    wordBreak: 'break-word',
  },

  '.chat-start .chat-bubble::before, .chat-end .chat-bubble::before, .chat-start .chat-bubble::after, .chat-end .chat-bubble::after': {
    content: '""',
    position: 'absolute',
    top: '0',
    clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
  },

  '.chat-start .chat-bubble::before': {
    left: '-0.625rem',
    width: '1rem',
    height: '1rem',
    backgroundColor: 'var(--color-outline-variant)',
  },

  '.chat-start .chat-bubble::after': {
    left: '-0.5rem',
    width: 'calc(1rem - 2px)',
    height: 'calc(1rem - 2px)',
    top: '1px',
    backgroundColor: 'var(--chat-bubble-bg)',
  },

  '.chat-start .chat-bubble': {
    borderTopLeftRadius: '0',
  },

  '.chat-end .chat-bubble::before': {
    right: '-0.625rem',
    width: '1rem',
    height: '1rem',
    backgroundColor: 'var(--color-outline-variant)',
    transform: 'scaleX(-1)',
  },

  '.chat-end .chat-bubble::after': {
    right: '-0.5rem',
    width: 'calc(1rem - 2px)',
    height: 'calc(1rem - 2px)',
    top: '1px',
    backgroundColor: 'var(--chat-bubble-bg)',
    transform: 'scaleX(-1)',
  },

  '.chat-end .chat-bubble': {
    borderTopRightRadius: '0',
  },

  '.chat-bubble-primary': {
    '--chat-bubble-bg': 'var(--color-primary-container)',
    '--chat-bubble-fg': 'var(--color-on-primary-container)',
  },

  '.chat-bubble-secondary': {
    '--chat-bubble-bg': 'var(--color-secondary-container)',
    '--chat-bubble-fg': 'var(--color-on-secondary-container)',
  },

  '.chat-bubble-tertiary': {
    '--chat-bubble-bg': 'var(--color-tertiary-container)',
    '--chat-bubble-fg': 'var(--color-on-tertiary-container)',
  },

  '.chat-bubble-info': {
    '--chat-bubble-bg': 'var(--color-info-container)',
    '--chat-bubble-fg': 'var(--color-on-info-container)',
  },

  '.chat-bubble-success': {
    '--chat-bubble-bg': 'var(--color-success-container)',
    '--chat-bubble-fg': 'var(--color-on-success-container)',
  },

  '.chat-bubble-warning': {
    '--chat-bubble-bg': 'var(--color-warning-container)',
    '--chat-bubble-fg': 'var(--color-on-warning-container)',
  },

  '.chat-bubble-error': {
    '--chat-bubble-bg': 'var(--color-error-container)',
    '--chat-bubble-fg': 'var(--color-on-error-container)',
  },

  '.chat-bubble-filled.chat-bubble-primary': {
    '--chat-bubble-bg': 'var(--color-primary)',
    '--chat-bubble-fg': 'var(--color-primary-content)',
  },

  '.chat-bubble-filled.chat-bubble-secondary': {
    '--chat-bubble-bg': 'var(--color-secondary)',
    '--chat-bubble-fg': 'var(--color-secondary-content)',
  },

  '.chat-bubble-filled.chat-bubble-tertiary': {
    '--chat-bubble-bg': 'var(--color-tertiary)',
    '--chat-bubble-fg': 'var(--color-tertiary-content)',
  },

  '.chat-bubble-filled.chat-bubble-info': {
    '--chat-bubble-bg': 'var(--color-info)',
    '--chat-bubble-fg': 'var(--color-info-content)',
  },

  '.chat-bubble-filled.chat-bubble-success': {
    '--chat-bubble-bg': 'var(--color-success)',
    '--chat-bubble-fg': 'var(--color-success-content)',
  },

  '.chat-bubble-filled.chat-bubble-warning': {
    '--chat-bubble-bg': 'var(--color-warning)',
    '--chat-bubble-fg': 'var(--color-warning-content)',
  },

  '.chat-bubble-filled.chat-bubble-error': {
    '--chat-bubble-bg': 'var(--color-error)',
    '--chat-bubble-fg': 'var(--color-error-content)',
  },

  '.chat-bubble-xs': {
    padding: '0.375rem 0.625rem',
    fontSize: '0.75rem',
  },

  '.chat-bubble-sm': {
    padding: '0.5rem 0.75rem',
    fontSize: '0.8125rem',
  },

  '.chat-bubble-md': {
    padding: '0.625rem 0.875rem',
    fontSize: '0.875rem',
  },

  '.chat-bubble-lg': {
    padding: '0.875rem 1.125rem',
    fontSize: '1rem',
  },

  '.chat-reasoning, .chat-tool': {
    width: 'min(80ch, 100%)',
    border: '1px solid var(--color-outline)',
    borderRadius: 'var(--radius-sm)',
    backgroundColor: 'var(--color-surface-container-low)',
    color: 'var(--color-on-surface)',
    fontSize: '0.8125rem',
    lineHeight: '1.45',
    overflow: 'hidden',
  },

  '.chat-reasoning > summary, .chat-tool > summary': {
    cursor: 'pointer',
    listStylePosition: 'inside',
  },

  '.chat-reasoning > summary': {
    padding: '0.5rem 0.75rem',
    color: 'var(--color-on-surface-variant)',
    fontWeight: '500',
  },

  '.chat-reasoning > :not(summary)': {
    padding: '0 0.75rem 0.75rem',
    color: 'var(--color-on-surface-variant)',
    fontStyle: 'italic',
  },

  '.chat-tool-header': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0.75rem',
    color: 'var(--color-on-surface)',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
    fontSize: '0.75rem',
    fontWeight: '600',
  },

  '.chat-tool-status': {
    display: 'inline-flex',
    alignItems: 'center',
    minHeight: '1.25rem',
    padding: '0.125rem 0.5rem',
    borderRadius: '999px',
    marginLeft: 'auto',
    fontFamily: 'inherit',
    fontSize: '0.6875rem',
    fontWeight: '600',
    lineHeight: '1',
  },

  '.chat-tool-call, .chat-tool-result': {
    padding: '0.75rem',
    borderTop: '1px solid var(--color-outline)',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
    fontSize: '0.75rem',
    overflowX: 'auto',
  },

  '.chat-tool-result': {
    backgroundColor: 'color-mix(in oklch, var(--color-surface-container) 65%, transparent)',
  },

  '.chat-tool-pending .chat-tool-status': {
    border: '1px solid var(--color-outline)',
    color: 'var(--color-on-surface-variant)',
  },

  '.chat-tool-running .chat-tool-status': {
    backgroundColor: 'var(--color-info-container)',
    color: 'var(--color-on-info-container)',
  },

  '.chat-tool-running .chat-tool-header::before': {
    content: '""',
    width: '0.875rem',
    height: '0.875rem',
    border: '2px solid currentColor',
    borderTopColor: 'transparent',
    borderRadius: '999px',
    animation: 'chat-tool-spin 800ms linear infinite',
  },

  '.chat-tool-success .chat-tool-status': {
    backgroundColor: 'var(--color-success-container)',
    color: 'var(--color-on-success-container)',
  },

  '.chat-tool-error .chat-tool-status': {
    backgroundColor: 'var(--color-error-container)',
    color: 'var(--color-on-error-container)',
  },

  '.chat-typing': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    minWidth: '2.25rem',
  },

  '.chat-typing::before, .chat-typing::after, .chat-typing span': {
    content: '""',
    width: '0.375rem',
    height: '0.375rem',
    borderRadius: '999px',
    backgroundColor: 'currentColor',
    opacity: '0.55',
    animation: 'chat-typing-dot 1.4s ease-in-out infinite',
  },

  '.chat-typing span': {
    animationDelay: '150ms',
  },

  '.chat-typing::after': {
    animationDelay: '300ms',
  },

  '.chat-bubble-streaming::after': {
    content: '""',
    display: 'inline-block',
    width: '1px',
    height: '1em',
    marginLeft: '0.25rem',
    backgroundColor: 'currentColor',
    verticalAlign: '-0.125em',
    animation: 'chat-stream-caret 1s step-end infinite',
  },

  '.chat-reasoning > summary:focus-visible, .chat-tool > summary:focus-visible': {
    outline: 'none',
    boxShadow: '0 0 0 3px color-mix(in oklch, currentColor 20%, transparent)',
  },

  '@keyframes chat-typing-dot': {
    '0%, 80%, 100%': {
      opacity: '0.45',
      transform: 'translateY(0)',
    },
    '40%': {
      opacity: '1',
      transform: 'translateY(-0.1875rem)',
    },
  },

  '@keyframes chat-stream-caret': {
    '0%, 49%': {
      opacity: '1',
    },
    '50%, 100%': {
      opacity: '0',
    },
  },

  '@keyframes chat-tool-spin': {
    to: {
      transform: 'rotate(360deg)',
    },
  },
};
