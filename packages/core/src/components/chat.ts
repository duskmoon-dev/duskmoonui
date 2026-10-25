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
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: '0',
    width: '100%',
    height: 'calc(var(--chat-scroll-indicator-thickness) + var(--chat-scroll-indicator-gap))',
    border: '0',
    padding: '0',
    margin: '0',
    boxSizing: 'border-box',
    appearance: 'none',
    backgroundColor: 'transparent',
    color: 'inherit',
    font: 'inherit',
    pointerEvents: 'auto',
    textDecoration: 'none',
    cursor: 'pointer',
  },

  '.chat-scroll-indicator::before': {
    content: '""',
    width: 'var(--chat-scroll-indicator-size)',
    height: 'var(--chat-scroll-indicator-thickness)',
    borderRadius: '999px',
    backgroundColor: 'color-mix(in oklch, var(--color-on-surface) 28%, transparent)',
    opacity: '0.45',
    pointerEvents: 'none',
    transform: 'scaleX(1)',
    transformOrigin: 'center',
    transition: 'transform 140ms ease, opacity 140ms ease, background-color 140ms ease',
  },

  '.chat-scroll-indicator:hover::before, .chat-scroll-indicator:focus-visible::before': {
    animation: 'none',
    transform: 'scaleX(var(--chat-scroll-indicator-hover-scale)) scaleY(1.35)',
    backgroundColor: 'var(--color-on-surface)',
    opacity: '1',
  },

  '.chat-scroll-indicator:hover + .chat-scroll-indicator::before, .chat-scroll-indicator:has(+ .chat-scroll-indicator:hover)::before': {
    animation: 'none',
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

  '@supports (animation-timeline: --chat-1)': {
    '.chat-scroll-indicator::before': {
      animationName: 'chat-scroll-indicator-activate',
      animationDuration: '1ms',
      animationTimingFunction: 'linear',
      animationFillMode: 'both',
      animationRange: 'entry 0% exit 100%',
    },
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

  '.chat-scroll-indicator[data-chat-tl="1"]::before': {
    animationTimeline: '--chat-1',
  },
  '.chat-scroll-indicator[data-chat-tl="2"]::before': {
    animationTimeline: '--chat-2',
  },
  '.chat-scroll-indicator[data-chat-tl="3"]::before': {
    animationTimeline: '--chat-3',
  },
  '.chat-scroll-indicator[data-chat-tl="4"]::before': {
    animationTimeline: '--chat-4',
  },
  '.chat-scroll-indicator[data-chat-tl="5"]::before': {
    animationTimeline: '--chat-5',
  },
  '.chat-scroll-indicator[data-chat-tl="6"]::before': {
    animationTimeline: '--chat-6',
  },
  '.chat-scroll-indicator[data-chat-tl="7"]::before': {
    animationTimeline: '--chat-7',
  },
  '.chat-scroll-indicator[data-chat-tl="8"]::before': {
    animationTimeline: '--chat-8',
  },
  '.chat-scroll-indicator[data-chat-tl="9"]::before': {
    animationTimeline: '--chat-9',
  },
  '.chat-scroll-indicator[data-chat-tl="10"]::before': {
    animationTimeline: '--chat-10',
  },
  '.chat-scroll-indicator[data-chat-tl="11"]::before': {
    animationTimeline: '--chat-11',
  },
  '.chat-scroll-indicator[data-chat-tl="12"]::before': {
    animationTimeline: '--chat-12',
  },
  '.chat-scroll-indicator[data-chat-tl="13"]::before': {
    animationTimeline: '--chat-13',
  },
  '.chat-scroll-indicator[data-chat-tl="14"]::before': {
    animationTimeline: '--chat-14',
  },
  '.chat-scroll-indicator[data-chat-tl="15"]::before': {
    animationTimeline: '--chat-15',
  },
  '.chat-scroll-indicator[data-chat-tl="16"]::before': {
    animationTimeline: '--chat-16',
  },
  '.chat-scroll-indicator[data-chat-tl="17"]::before': {
    animationTimeline: '--chat-17',
  },
  '.chat-scroll-indicator[data-chat-tl="18"]::before': {
    animationTimeline: '--chat-18',
  },
  '.chat-scroll-indicator[data-chat-tl="19"]::before': {
    animationTimeline: '--chat-19',
  },
  '.chat-scroll-indicator[data-chat-tl="20"]::before': {
    animationTimeline: '--chat-20',
  },
  '.chat-scroll-indicator[data-chat-tl="21"]::before': {
    animationTimeline: '--chat-21',
  },
  '.chat-scroll-indicator[data-chat-tl="22"]::before': {
    animationTimeline: '--chat-22',
  },
  '.chat-scroll-indicator[data-chat-tl="23"]::before': {
    animationTimeline: '--chat-23',
  },
  '.chat-scroll-indicator[data-chat-tl="24"]::before': {
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

  '.chat-agent': {
    alignItems: 'start',
    rowGap: '0.5rem',
    padding: '0.75rem 0',
    minInlineSize: '0',
    color: 'var(--color-on-surface)',
  },

  '.chat-agent:not(:has(> .chat-avatar))': {
    gridTemplateColumns: 'minmax(0, 1fr)',
  },

  '.chat-agent:not(:has(> .chat-avatar)) > *': {
    gridColumn: '1',
  },

  '.chat-agent .chat-avatar': {
    gridRow: '1',
  },

  '.chat-content': {
    width: '100%',
    minInlineSize: '0',
    boxSizing: 'border-box',
    color: 'var(--color-on-surface)',
    fontSize: '0.9375rem',
    lineHeight: '1.6',
    overflowWrap: 'anywhere',
  },

  '.chat-content pre': {
    maxInlineSize: '100%',
    minInlineSize: '0',
    overflow: 'auto',
    whiteSpace: 'pre',
  },

  '.chat-content a': {
    overflowWrap: 'anywhere',
    textDecoration: 'underline',
  },

  '.chat-work': {
    width: '100%',
    minInlineSize: '0',
    border: '0',
    padding: '0',
    background: 'transparent',
  },

  '.chat-work-summary': {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0',
    borderBlockEnd: '1px solid var(--color-outline-variant)',
    color: 'var(--color-on-surface-variant)',
    fontSize: '0.8125rem',
    lineHeight: '1.5',
    overflowWrap: 'anywhere',
    listStyle: 'none',
    cursor: 'pointer',
  },

  '.chat-work-summary::-webkit-details-marker': {
    display: 'none',
  },

  '.chat-work-summary::after': {
    content: '"›"',
    flexShrink: '0',
  },

  '.chat-work[open] > .chat-work-summary::after': {
    transform: 'rotate(90deg)',
  },

  '.chat-work-summary:focus-visible': {
    outline: 'none',
    boxShadow: '0 0 0 3px color-mix(in oklch, currentColor 20%, transparent)',
  },

  '.chat-work-body': {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '0.75rem 0',
  },

  '.chat-agent .chat-reasoning, .chat-agent .chat-tool': {
    width: '100%',
    maxWidth: 'none',
    boxSizing: 'border-box',
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

  '.chat-status': {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '0.25rem 0.75rem',
    color: 'var(--color-on-surface-variant)',
    fontSize: '0.75rem',
    lineHeight: '1rem',
    fontVariantNumeric: 'tabular-nums',
  },

  '.chat-status-item': {
    display: 'inline-flex',
    alignItems: 'baseline',
    gap: '0.25rem',
  },

  '.chat-status-value': {
    color: 'var(--color-on-surface)',
    fontWeight: '500',
  },

  '.chat-actions': {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '0.25rem',
  },

  '.chat-actions-hover': {
    opacity: '0',
    pointerEvents: 'none',
    transition: 'opacity 140ms ease',
  },

  '.chat:hover .chat-actions-hover, .chat:focus-within .chat-actions-hover': {
    opacity: '1',
    pointerEvents: 'auto',
  },

  '@media (hover: none)': {
    '.chat-actions-hover': {
      opacity: '1',
      pointerEvents: 'auto',
    },
  },

  // Waiting messages; the application owns dispatch, steer, and removal.
  '.chat-input-area': {
    display: 'flex',
    flexDirection: 'column',
    minInlineSize: '0',
    boxSizing: 'border-box',
    color: 'var(--color-on-surface)',
  },

  '.chat-input-area > .chat-queue': {
    marginInline: '0.75rem',
    marginBlockEnd: '-0.5rem',
    padding: '0.125rem 0.5rem 0.625rem',
    borderBlockEnd: '0',
    borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
  },

  '.chat-input-area > .chat-queue .chat-queue-header:not(.sr-only)': {
    padding: '0.125rem 0 0.5rem',
  },

  '.chat-input-area > .chat-queue .chat-queue-list': {
    padding: '0',
  },

  '.chat-queue': {
    minInlineSize: '0',
    maxInlineSize: '100%',
    boxSizing: 'border-box',
    border: '1px solid var(--color-outline-variant)',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-surface-container-low)',
    color: 'var(--color-on-surface)',
    fontSize: '0.875rem',
    lineHeight: '1.45',
  },

  '.chat-queue-header:not(.sr-only)': {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.5rem',
    padding: '0.625rem 0.875rem',
  },

  '.chat-queue-title': {
    margin: '0',
    fontSize: 'inherit',
    fontWeight: '600',
    overflowWrap: 'anywhere',
  },

  '.chat-queue-list': {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    maxBlockSize: '16rem',
    overflowY: 'auto',
    overscrollBehavior: 'contain',
    margin: '0',
    padding: '0 0.875rem 0.875rem',
    boxSizing: 'border-box',
    listStyle: 'none',
  },

  '.chat-queue-item': {
    display: 'flex',
    flexShrink: '0',
    flexWrap: 'nowrap',
    alignItems: 'center',
    gap: '0.375rem',
    minInlineSize: '0',
    maxInlineSize: '100%',
    boxSizing: 'border-box',
    padding: '0.375rem 0.5rem',
    border: '0',
    backgroundColor: 'transparent',
  },

  '.chat-queue-icon': {
    flexShrink: '0',
    inlineSize: '1rem',
    blockSize: '1rem',
    color: 'var(--color-on-surface-variant)',
  },

  '.chat-queue-item-active .chat-queue-icon': {
    color: 'var(--color-on-surface)',
  },

  '.chat-queue-attachment': {
    flexShrink: '0',
    inlineSize: '2rem',
    blockSize: '2rem',
    objectFit: 'cover',
    borderRadius: 'var(--radius-xs)',
  },

  '.chat-queue-number': {
    flexShrink: '0',
    color: 'var(--color-on-surface-variant)',
    fontVariantNumeric: 'tabular-nums',
  },

  '.chat-queue-count': {
    whiteSpace: 'nowrap',
  },

  '.chat-queue-content': {
    flex: '1 1 8rem',
    minInlineSize: '0',
    margin: '0',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  '.chat-queue-actions': {
    flexWrap: 'nowrap',
    flexShrink: '0',
    marginInlineStart: 'auto',
  },

  '.chat-queue-steer, .chat-queue-remove': {
    flexShrink: '0',
  },

  '.chat-queue[hidden], .chat-queue-item[hidden]': {
    display: 'none',
  },

  '.chat-composer': {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    minInlineSize: '0',
    boxSizing: 'border-box',
    margin: '0',
    padding: '1rem',
    border: '1px solid currentColor',
    borderRadius: 'var(--radius-xl)',
    backgroundColor: 'var(--color-surface-container-high)',
    color: 'var(--color-on-surface)',
  },

  '.chat-composer:focus-within': {
    boxShadow: '0 0 0 3px color-mix(in oklch, currentColor 20%, transparent)',
  },

  '.chat-composer-input': {
    display: 'block',
    width: '100%',
    minInlineSize: '0',
    minBlockSize: '3rem',
    boxSizing: 'border-box',
    margin: '0',
    padding: '0',
    border: '0',
    outline: 'none',
    backgroundColor: 'transparent',
    color: 'var(--color-on-surface)',
    font: 'inherit',
    fontSize: '0.9375rem',
    lineHeight: '1.5',
    resize: 'vertical',
  },

  '.chat-composer-input::placeholder': {
    color: 'var(--color-on-surface-variant)',
    opacity: '1',
  },

  '.chat-composer-actions': {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '0.5rem',
  },

  '.chat-composer-hint': {
    fontFamily: 'inherit',
    fontSize: '0.75rem',
    fontWeight: '400',
    opacity: '1',
  },

  '.chat-composer-primary': { color: 'var(--color-on-primary-container)' },
  '.chat-composer-secondary': { color: 'var(--color-on-secondary-container)' },
  '.chat-composer-tertiary': { color: 'var(--color-on-tertiary-container)' },
  '.chat-composer-info': { color: 'var(--color-on-info-container)' },
  '.chat-composer-success': { color: 'var(--color-on-success-container)' },
  '.chat-composer-warning': { color: 'var(--color-on-warning-container)' },
  '.chat-composer-error': { color: 'var(--color-on-error-container)' },
  '.chat-composer-ghost': { borderColor: 'transparent' },

  '.chat-bubble': {
    '--chat-bubble-bg': 'var(--color-surface-container-highest)',
    '--chat-bubble-fg': 'var(--color-on-surface)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '0.5rem',
    maxWidth: 'min(80ch, 100%)',
    minInlineSize: '0',
    boxSizing: 'border-box',
    padding: '0.625rem 0.875rem',
    borderRadius: '1rem',
    backgroundColor: 'var(--chat-bubble-bg)',
    color: 'var(--chat-bubble-fg)',
    fontSize: '0.875rem',
    lineHeight: '1.45',
    overflowWrap: 'anywhere',
    wordBreak: 'break-word',
  },

  '.chat-bubble-content': {
    minWidth: '0',
  },

  '.chat-bubble-collapsible > .chat-bubble-content': {
    maxBlockSize: '6lh',
    overflow: 'hidden',
    whiteSpace: 'pre-wrap',
  },

  '.chat-bubble-collapsible:has(> .chat-bubble-toggle[aria-expanded="true"]) > .chat-bubble-content': {
    maxBlockSize: 'none',
    overflow: 'visible',
  },

  '.chat-bubble-toggle': {
    alignSelf: 'flex-end',
    color: 'inherit',
  },

  '.chat-bubble-toggle[hidden]': {
    display: 'none',
  },

  '.chat-bubble pre': {
    maxInlineSize: '100%',
    minInlineSize: '0',
    overflow: 'auto',
    whiteSpace: 'pre',
  },

  '.chat-bubble a': {
    overflowWrap: 'anywhere',
    textDecoration: 'underline',
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

  '.chat-bubble > .chat-reasoning, .chat-bubble > .chat-tool, .chat-reasoning .chat-tool, .chat-reasoning-body > .chat-tool': {
    width: '100%',
    maxWidth: 'none',
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

  '.chat-reasoning-body': {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '0 0.75rem 0.75rem',
    color: 'var(--color-on-surface-variant)',
  },

  '.chat-reasoning-body > :not(.chat-tool)': {
    fontStyle: 'italic',
  },

  '.chat-reasoning > div:not(.chat-tool):not(.chat-reasoning-body)': {
    padding: '0 0.75rem 0.75rem',
    color: 'var(--color-on-surface-variant)',
    fontStyle: 'italic',
  },

  '.chat-reasoning > .chat-tool': {
    margin: '0 0.75rem 0.75rem',
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

  '.chat-streaming::after, .chat-bubble-streaming::after, .chat-bubble-content.chat-bubble-streaming::after': {
    content: '""',
    position: 'static',
    inset: 'auto',
    display: 'inline-block',
    width: '1px',
    height: '1em',
    marginLeft: '0.25rem',
    backgroundColor: 'currentColor',
    clipPath: 'none',
    transform: 'none',
    verticalAlign: '-0.125em',
    animation: 'chat-stream-caret 1s step-end infinite',
  },

  '.chat-bubble.chat-bubble-streaming:not(:has(.chat-reasoning, .chat-tool, .chat-bubble-content))': {
    display: 'block',
  },

  '.chat-bubble.chat-bubble-streaming:has(.chat-reasoning, .chat-tool, .chat-bubble-content)::after': {
    content: 'none',
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

  '@media (prefers-reduced-motion: reduce)': {
    '.chat-scroll': {
      scrollBehavior: 'auto',
    },
    '.chat-scroll-indicator::before': {
      animation: 'none',
      transition: 'none',
    },
    '.chat-actions-hover': {
      transition: 'none',
    },
    '.chat-typing::before, .chat-typing::after, .chat-typing span, .chat-streaming::after, .chat-bubble-streaming::after, .chat-bubble-content.chat-bubble-streaming::after, .chat-tool-running .chat-tool-header::before': {
      animation: 'none',
    },
    '.chat-streaming::after, .chat-bubble-streaming::after, .chat-bubble-content.chat-bubble-streaming::after': {
      opacity: '1',
    },
  },
};
