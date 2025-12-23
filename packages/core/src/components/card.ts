

/**
 * Card component styles
 * Material Design 3-inspired card with surface elevation
 */
export const cardStyles: Record<string, any> = {
  // Base card styles
  '.card': {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'var(--color-surface-container)',
    color: 'var(--color-on-surface)',
    borderRadius: '0.75rem', // 12px - Material Design 3 medium corner
    overflow: 'hidden',
    transition: 'box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Elevation variants using Material Design 3 surface containers
  '.card-lowest': {
    backgroundColor: 'var(--color-surface-container-lowest)',
  },

  '.card-low': {
    backgroundColor: 'var(--color-surface-container-low)',
  },

  '.card-default': {
    backgroundColor: 'var(--color-surface-container)',
  },

  '.card-high': {
    backgroundColor: 'var(--color-surface-container-high)',
    boxShadow: '0 1px 2px 0 color-mix(in oklch, black 5%, transparent)',
  },

  '.card-highest': {
    backgroundColor: 'var(--color-surface-container-highest)',
    boxShadow: '0 4px 6px -1px color-mix(in oklch, black 10%, transparent), 0 2px 4px -1px color-mix(in oklch, black 6%, transparent)',
  },

  // Filled variant (tonal surface)
  '.card-filled': {
    backgroundColor: 'var(--color-surface-variant)',
    color: 'var(--color-on-surface-variant)',
  },

  // Outlined variant
  '.card-outlined': {
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-outline-variant)',
  },

  // Card body
  '.card-body': {
    padding: '1rem',
    flex: '1 1 auto',
  },

  // Card header
  '.card-header': {
    padding: '1rem',
    paddingBottom: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },

  // Card title
  '.card-title': {
    fontSize: '1.25rem',
    fontWeight: '500',
    lineHeight: '1.75rem',
    color: 'var(--color-on-surface)',
    margin: '0',
  },

  // Card subtitle
  '.card-subtitle': {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    color: 'var(--color-on-surface-variant)',
    marginTop: '0.25rem',
  },

  // Card footer/actions
  '.card-actions': {
    padding: '0.5rem 1rem 1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    justifyContent: 'flex-end',
  },

  '.card-actions-start': {
    justifyContent: 'flex-start',
  },

  '.card-actions-center': {
    justifyContent: 'center',
  },

  '.card-actions-between': {
    justifyContent: 'space-between',
  },

  // Card image
  '.card-image': {
    width: '100%',
    height: 'auto',
    display: 'block',
  },

  '.card-image-top': {
    borderRadius: '0.75rem 0.75rem 0 0',
  },

  '.card-image-bottom': {
    borderRadius: '0 0 0.75rem 0.75rem',
  },

  // Interactive card (clickable)
  '.card-interactive': {
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

    '&:hover': {
      boxShadow: '0 4px 6px -1px color-mix(in oklch, black 10%, transparent), 0 2px 4px -1px color-mix(in oklch, black 6%, transparent)',
      transform: 'translateY(-2px)',
    },

    '&:active': {
      transform: 'translateY(0)',
      boxShadow: '0 1px 2px 0 color-mix(in oklch, black 5%, transparent)',
    },
  },

  // Compact variant
  '.card-compact .card-body': {
    padding: '0.75rem',
  },

  '.card-compact .card-header': {
    padding: '0.75rem',
    paddingBottom: '0.5rem',
  },

  '.card-compact .card-actions': {
    padding: '0.5rem 0.75rem 0.75rem',
  },

  // Normal (default) already defined
  '.card-normal .card-body': {
    padding: '1rem',
  },

  // Comfortable variant
  '.card-comfortable .card-body': {
    padding: '1.5rem',
  },

  '.card-comfortable .card-header': {
    padding: '1.5rem',
    paddingBottom: '1rem',
  },

  '.card-comfortable .card-actions': {
    padding: '1rem 1.5rem 1.5rem',
  },
};
