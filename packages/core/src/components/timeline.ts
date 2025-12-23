

/**
 * Timeline component styles
 * Material Design 3-inspired timeline component
 */
export const timelineStyles: Record<string, any> = {
  // Base timeline container
  '.timeline': {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },

  // Timeline item
  '.timeline-item': {
    position: 'relative',
    display: 'flex',
    gap: '1rem',
    paddingLeft: '2rem',
  },

  // Timeline connector (vertical line)
  '.timeline-item::before': {
    content: '""',
    position: 'absolute',
    left: '0.625rem',
    top: '2rem',
    bottom: '-1.5rem',
    width: '2px',
    backgroundColor: 'var(--color-outline-variant)',
  },

  // Last item - no connector
  '.timeline-item:last-child::before': {
    display: 'none',
  },

  // Timeline marker (dot)
  '.timeline-marker': {
    position: 'absolute',
    left: '0',
    top: '0.25rem',
    width: '1.5rem',
    height: '1.5rem',
    backgroundColor: 'var(--color-primary)',
    border: '3px solid var(--color-surface)',
    borderRadius: '50%',
    zIndex: '1',
    boxShadow: '0 0 0 2px var(--color-primary)',
  },

  // Timeline marker variants
  '.timeline-marker-secondary': {
    backgroundColor: 'var(--color-secondary)',
    boxShadow: '0 0 0 2px var(--color-secondary)',
  },

  '.timeline-marker-tertiary': {
    backgroundColor: 'var(--color-tertiary)',
    boxShadow: '0 0 0 2px var(--color-tertiary)',
  },

  '.timeline-marker-success': {
    backgroundColor: 'var(--color-success)',
    boxShadow: '0 0 0 2px var(--color-success)',
  },

  '.timeline-marker-error': {
    backgroundColor: 'var(--color-error)',
    boxShadow: '0 0 0 2px var(--color-error)',
  },

  // Timeline marker with icon
  '.timeline-marker-icon': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-on-primary)',
    fontSize: '0.875rem',
  },

  // Timeline content
  '.timeline-content': {
    flex: '1',
    paddingBottom: '1rem',
  },

  // Timeline time/date
  '.timeline-time': {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: '500',
    color: 'var(--color-on-surface-variant)',
    marginBottom: '0.25rem',
  },

  // Timeline title
  '.timeline-title': {
    fontSize: '1rem',
    fontWeight: '600',
    color: 'var(--color-on-surface)',
    marginBottom: '0.25rem',
  },

  // Timeline description
  '.timeline-description': {
    fontSize: '0.875rem',
    color: 'var(--color-on-surface-variant)',
    lineHeight: '1.5',
  },

  // Horizontal timeline
  '.timeline-horizontal': {
    flexDirection: 'row',
    overflowX: 'auto',
    gap: '2rem',
    paddingTop: '2rem',
  },

  '.timeline-horizontal .timeline-item': {
    flexDirection: 'column',
    paddingLeft: '0',
    paddingTop: '2rem',
    minWidth: '200px',
  },

  '.timeline-horizontal .timeline-item::before': {
    left: '2rem',
    right: '-2rem',
    top: '0.625rem',
    bottom: 'auto',
    width: 'auto',
    height: '2px',
  },

  '.timeline-horizontal .timeline-marker': {
    left: '50%',
    top: '0',
    transform: 'translateX(-50%)',
  },

  // Alternate layout (zigzag)
  '.timeline-alternate': {
    paddingLeft: '0',
  },

  '.timeline-alternate .timeline-item': {
    paddingLeft: '0',
  },

  '.timeline-alternate .timeline-item::before': {
    left: '50%',
    marginLeft: '-1px',
  },

  '.timeline-alternate .timeline-marker': {
    left: '50%',
    marginLeft: '-0.75rem',
  },

  '.timeline-alternate .timeline-item:nth-child(odd) .timeline-content': {
    paddingRight: 'calc(50% + 2rem)',
    textAlign: 'right',
  },

  '.timeline-alternate .timeline-item:nth-child(even) .timeline-content': {
    paddingLeft: 'calc(50% + 2rem)',
    textAlign: 'left',
  },

  // Compact variant
  '.timeline-compact': {
    gap: '1rem',
  },

  '.timeline-compact .timeline-item': {
    gap: '0.75rem',
  },

  '.timeline-compact .timeline-marker': {
    width: '1rem',
    height: '1rem',
    left: '0.25rem',
  },

  '.timeline-compact .timeline-item::before': {
    left: '0.5rem',
  },

  // Size variants
  '.timeline-sm .timeline-marker': {
    width: '1rem',
    height: '1rem',
  },

  '.timeline-sm .timeline-title': {
    fontSize: '0.875rem',
  },

  '.timeline-sm .timeline-description': {
    fontSize: '0.8125rem',
  },

  '.timeline-lg .timeline-marker': {
    width: '2rem',
    height: '2rem',
  },

  '.timeline-lg .timeline-title': {
    fontSize: '1.125rem',
  },

  '.timeline-lg .timeline-description': {
    fontSize: '1rem',
  },

  // With card content
  '.timeline-content-card': {
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-outline-variant)',
    borderRadius: '0.5rem',
    padding: '1rem',
    boxShadow: '0 1px 2px 0 color-mix(in oklch, black 5%, transparent)',
  },

  // Pending state (future items)
  '.timeline-item-pending .timeline-marker': {
    backgroundColor: 'var(--color-surface-variant)',
    boxShadow: '0 0 0 2px var(--color-outline)',
  },

  '.timeline-item-pending .timeline-content': {
    opacity: '0.6',
  },

  // Active/current state
  '.timeline-item-active .timeline-marker': {
    animation: 'timeline-pulse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
  },

  '@keyframes timeline-pulse': {
    '0%, 100%': {
      boxShadow: '0 0 0 2px var(--color-primary), 0 0 0 6px color-mix(in oklch, var(--color-primary) 20%, transparent)',
    },
    '50%': {
      boxShadow: '0 0 0 2px var(--color-primary), 0 0 0 10px transparent',
    },
  },
};
