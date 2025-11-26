

/**
 * Tooltip component styles
 * Material Design 3-inspired tooltips
 */
export const tooltipStyles: Record<string, any> = {
  // Base tooltip
  '.tooltip': {
    position: 'absolute',
    padding: '0.375rem 0.75rem',
    fontSize: '0.75rem',
    lineHeight: '1rem',
    fontWeight: '500',
    color: 'hsl(var(--color-inverse-on-surface))',
    backgroundColor: 'hsl(var(--color-inverse-surface))',
    borderRadius: '0.25rem',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
    zIndex: '100',
    maxWidth: '12rem',
    wordWrap: 'break-word',
    whiteSpace: 'normal',
    pointerEvents: 'none',
    opacity: '0',
    visibility: 'hidden',
    transition: 'opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  '.tooltip-show': {
    opacity: '1',
    visibility: 'visible',
  },

  // Arrow
  '.tooltip-arrow': {
    position: 'absolute',
    width: '0',
    height: '0',
    borderStyle: 'solid',
  },

  // Top positioning
  '.tooltip-top': {
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-0.375rem)',
    marginBottom: '0.375rem',
  },

  '.tooltip-top .tooltip-arrow': {
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    borderWidth: '0.375rem 0.375rem 0 0.375rem',
    borderColor: 'hsl(var(--color-inverse-surface)) transparent transparent transparent',
  },

  // Bottom positioning
  '.tooltip-bottom': {
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%) translateY(0.375rem)',
    marginTop: '0.375rem',
  },

  '.tooltip-bottom .tooltip-arrow': {
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    borderWidth: '0 0.375rem 0.375rem 0.375rem',
    borderColor: 'transparent transparent hsl(var(--color-inverse-surface)) transparent',
  },

  // Left positioning
  '.tooltip-left': {
    right: '100%',
    top: '50%',
    transform: 'translateY(-50%) translateX(-0.375rem)',
    marginRight: '0.375rem',
  },

  '.tooltip-left .tooltip-arrow': {
    left: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    borderWidth: '0.375rem 0 0.375rem 0.375rem',
    borderColor: 'transparent transparent transparent hsl(var(--color-inverse-surface))',
  },

  // Right positioning
  '.tooltip-right': {
    left: '100%',
    top: '50%',
    transform: 'translateY(-50%) translateX(0.375rem)',
    marginLeft: '0.375rem',
  },

  '.tooltip-right .tooltip-arrow': {
    right: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    borderWidth: '0.375rem 0.375rem 0.375rem 0',
    borderColor: 'transparent hsl(var(--color-inverse-surface)) transparent transparent',
  },

  // No arrow variant
  '.tooltip-no-arrow .tooltip-arrow': {
    display: 'none',
  },

  // Size variants
  '.tooltip-sm': {
    padding: '0.25rem 0.5rem',
    fontSize: '0.688rem',
    maxWidth: '8rem',
  },

  '.tooltip-lg': {
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    maxWidth: '16rem',
  },

  // Rich content tooltip
  '.tooltip-rich': {
    maxWidth: '20rem',
    padding: '0.75rem 1rem',
  },
};
