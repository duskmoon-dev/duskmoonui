/**
 * Chat component styles
 * CSS-only primitives for conversational and LLM chat interfaces
 */
export const chatStyles: Record<string, any> = {
  '.chat-scroll': {
    '--chat-scroll-indicator-size': '0.875rem',
    '--chat-scroll-indicator-active-size': '1.125rem',
    '--chat-scroll-indicator-thickness': '0.1875rem',
    '--chat-scroll-indicator-gap': '0.3125rem',
    '--chat-scroll-indicator-hover-scale': '1.55',
    '--chat-scroll-indicator-neighbor-scale': '1.22',
    containerType: 'size',
    containerName: 'chat-scroll',
    display: 'grid',
    gridTemplateColumns: 'auto minmax(0, 1fr)',
    columnGap: '0.75rem',
    alignItems: 'start',
    minHeight: '0',
    overflowX: 'hidden',
    overflowY: 'auto',
    scrollBehavior: 'smooth',
    overscrollBehaviorY: 'contain',
    timelineScope: '--chat-1, --chat-2, --chat-3, --chat-4, --chat-5, --chat-6, --chat-7, --chat-8, --chat-9, --chat-10, --chat-11, --chat-12, --chat-13, --chat-14, --chat-15, --chat-16, --chat-17, --chat-18, --chat-19, --chat-20, --chat-21, --chat-22, --chat-23, --chat-24',
  },

  '.chat-scroll-track': {
    position: 'sticky',
    top: '0',
    zIndex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 'var(--chat-scroll-indicator-gap)',
    width: 'calc(var(--chat-scroll-indicator-active-size) * var(--chat-scroll-indicator-hover-scale))',
    height: '100cqh',
    margin: '0',
    padding: '0.75rem 0',
    overflow: 'visible',
    listStyle: 'none',
    pointerEvents: 'none',
  },

  '.chat-scroll-body': {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '0',
  },

  '.chat-scroll-indicator': {
    display: 'block',
    flexShrink: '0',
    width: 'var(--chat-scroll-indicator-size)',
    height: 'var(--chat-scroll-indicator-thickness)',
    border: '0',
    borderRadius: '999px',
    padding: '0',
    appearance: 'none',
    backgroundColor: 'color-mix(in oklch, var(--color-on-surface) 28%, transparent)',
    color: 'inherit',
    font: 'inherit',
    opacity: '0.45',
    pointerEvents: 'auto',
    textDecoration: 'none',
    cursor: 'pointer',
    transform: 'scaleX(1)',
    transformOrigin: 'center',
    transition: 'transform 140ms ease, opacity 140ms ease, background-color 140ms ease',
  },

  '.chat-scroll-indicator:hover, .chat-scroll-indicator:focus-visible': {
    transform: 'scaleX(var(--chat-scroll-indicator-hover-scale)) scaleY(1.35)',
    backgroundColor: 'var(--color-on-surface)',
    opacity: '1',
  },

  '.chat-scroll-indicator:hover + .chat-scroll-indicator, .chat-scroll-indicator:has(+ .chat-scroll-indicator:hover)': {
    transform: 'scaleX(var(--chat-scroll-indicator-neighbor-scale)) scaleY(1.15)',
    backgroundColor: 'color-mix(in oklch, var(--color-on-surface) 55%, transparent)',
    opacity: '0.75',
  },

  '.chat[data-chat-tl]': {
    scrollMarginBlockStart: '0.5rem',
  },

  '.chat-scroll-indicator:focus-visible': {
    outline: 'none',
    boxShadow: '0 0 0 3px color-mix(in oklch, var(--color-primary) 20%, transparent)',
  },

  '.chat[data-chat-tl="1"]': {
    viewTimelineName: '--chat-1',
    viewTimelineAxis: 'block',
  },
  '.chat[data-chat-tl="2"]': {
    viewTimelineName: '--chat-2',
    viewTimelineAxis: 'block',
  },
  '.chat[data-chat-tl="3"]': {
    viewTimelineName: '--chat-3',
    viewTimelineAxis: 'block',
  },
  '.chat[data-chat-tl="4"]': {
    viewTimelineName: '--chat-4',
    viewTimelineAxis: 'block',
  },
  '.chat[data-chat-tl="5"]': {
    viewTimelineName: '--chat-5',
    viewTimelineAxis: 'block',
  },
  '.chat[data-chat-tl="6"]': {
    viewTimelineName: '--chat-6',
    viewTimelineAxis: 'block',
  },
  '.chat[data-chat-tl="7"]': {
    viewTimelineName: '--chat-7',
    viewTimelineAxis: 'block',
  },
  '.chat[data-chat-tl="8"]': {
    viewTimelineName: '--chat-8',
    viewTimelineAxis: 'block',
  },
  '.chat[data-chat-tl="9"]': {
    viewTimelineName: '--chat-9',
    viewTimelineAxis: 'block',
  },
  '.chat[data-chat-tl="10"]': {
    viewTimelineName: '--chat-10',
    viewTimelineAxis: 'block',
  },
  '.chat[data-chat-tl="11"]': {
    viewTimelineName: '--chat-11',
    viewTimelineAxis: 'block',
  },
  '.chat[data-chat-tl="12"]': {
    viewTimelineName: '--chat-12',
    viewTimelineAxis: 'block',
  },
  '.chat[data-chat-tl="13"]': {
    viewTimelineName: '--chat-13',
    viewTimelineAxis: 'block',
  },
  '.chat[data-chat-tl="14"]': {
    viewTimelineName: '--chat-14',
    viewTimelineAxis: 'block',
  },
  '.chat[data-chat-tl="15"]': {
    viewTimelineName: '--chat-15',
    viewTimelineAxis: 'block',
  },
  '.chat[data-chat-tl="16"]': {
    viewTimelineName: '--chat-16',
    viewTimelineAxis: 'block',
  },
  '.chat[data-chat-tl="17"]': {
    viewTimelineName: '--chat-17',
    viewTimelineAxis: 'block',
  },
  '.chat[data-chat-tl="18"]': {
    viewTimelineName: '--chat-18',
    viewTimelineAxis: 'block',
  },
  '.chat[data-chat-tl="19"]': {
    viewTimelineName: '--chat-19',
    viewTimelineAxis: 'block',
  },
  '.chat[data-chat-tl="20"]': {
    viewTimelineName: '--chat-20',
    viewTimelineAxis: 'block',
  },
  '.chat[data-chat-tl="21"]': {
    viewTimelineName: '--chat-21',
    viewTimelineAxis: 'block',
  },
  '.chat[data-chat-tl="22"]': {
    viewTimelineName: '--chat-22',
    viewTimelineAxis: 'block',
  },
  '.chat[data-chat-tl="23"]': {
    viewTimelineName: '--chat-23',
    viewTimelineAxis: 'block',
  },
  '.chat[data-chat-tl="24"]': {
    viewTimelineName: '--chat-24',
    viewTimelineAxis: 'block',
  },

  '.chat-scroll-indicator[data-chat-tl="1"]': {
    animationTimeline: '--chat-1',
  },
  '.chat-scroll-indicator[data-chat-tl="2"]': {
    animationTimeline: '--chat-2',
  },
  '.chat-scroll-indicator[data-chat-tl="3"]': {
    animationTimeline: '--chat-3',
  },
  '.chat-scroll-indicator[data-chat-tl="4"]': {
    animationTimeline: '--chat-4',
  },
  '.chat-scroll-indicator[data-chat-tl="5"]': {
    animationTimeline: '--chat-5',
  },
  '.chat-scroll-indicator[data-chat-tl="6"]': {
    animationTimeline: '--chat-6',
  },
  '.chat-scroll-indicator[data-chat-tl="7"]': {
    animationTimeline: '--chat-7',
  },
  '.chat-scroll-indicator[data-chat-tl="8"]': {
    animationTimeline: '--chat-8',
  },
  '.chat-scroll-indicator[data-chat-tl="9"]': {
    animationTimeline: '--chat-9',
  },
  '.chat-scroll-indicator[data-chat-tl="10"]': {
    animationTimeline: '--chat-10',
  },
  '.chat-scroll-indicator[data-chat-tl="11"]': {
    animationTimeline: '--chat-11',
  },
  '.chat-scroll-indicator[data-chat-tl="12"]': {
    animationTimeline: '--chat-12',
  },
  '.chat-scroll-indicator[data-chat-tl="13"]': {
    animationTimeline: '--chat-13',
  },
  '.chat-scroll-indicator[data-chat-tl="14"]': {
    animationTimeline: '--chat-14',
  },
  '.chat-scroll-indicator[data-chat-tl="15"]': {
    animationTimeline: '--chat-15',
  },
  '.chat-scroll-indicator[data-chat-tl="16"]': {
    animationTimeline: '--chat-16',
  },
  '.chat-scroll-indicator[data-chat-tl="17"]': {
    animationTimeline: '--chat-17',
  },
  '.chat-scroll-indicator[data-chat-tl="18"]': {
    animationTimeline: '--chat-18',
  },
  '.chat-scroll-indicator[data-chat-tl="19"]': {
    animationTimeline: '--chat-19',
  },
  '.chat-scroll-indicator[data-chat-tl="20"]': {
    animationTimeline: '--chat-20',
  },
  '.chat-scroll-indicator[data-chat-tl="21"]': {
    animationTimeline: '--chat-21',
  },
  '.chat-scroll-indicator[data-chat-tl="22"]': {
    animationTimeline: '--chat-22',
  },
  '.chat-scroll-indicator[data-chat-tl="23"]': {
    animationTimeline: '--chat-23',
  },
  '.chat-scroll-indicator[data-chat-tl="24"]': {
    animationTimeline: '--chat-24',
  },

  '@keyframes chat-scroll-indicator-activate': {
    '0%, 100%': {
      width: 'var(--chat-scroll-indicator-size)',
      backgroundColor: 'color-mix(in oklch, var(--color-on-surface) 28%, transparent)',
      opacity: '0.45',
    },
    '35%, 65%': {
      width: 'var(--chat-scroll-indicator-active-size)',
      backgroundColor: 'var(--color-on-surface)',
      opacity: '1',
    },
  },

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
