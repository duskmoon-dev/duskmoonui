import type { CSSRuleObject } from 'tailwindcss/types/config';

/**
 * Accordion component styles
 * Material Design 3-inspired expandable content panels
 */
export const accordionStyles: Record<string, CSSRuleObject> = {
  // Base accordion container
  '.accordion': {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  // Accordion item
  '.accordion-item': {
    borderBottom: '1px solid hsl(var(--color-outline-variant))',
  },

  '.accordion-item:last-child': {
    borderBottom: 'none',
  },

  // Accordion header/trigger
  '.accordion-header': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '1rem 1.25rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.25rem',
    color: 'hsl(var(--color-on-surface))',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    textAlign: 'left',

    '&:hover': {
      backgroundColor: 'rgba(var(--color-on-surface-rgb), 0.04)',
    },

    '&:active': {
      backgroundColor: 'rgba(var(--color-on-surface-rgb), 0.08)',
    },

    '&:focus-visible': {
      outline: '2px solid hsl(var(--color-primary))',
      outlineOffset: '-2px',
    },
  },

  // Accordion title
  '.accordion-title': {
    flex: '1 1 auto',
    margin: '0',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
  },

  // Accordion icon
  '.accordion-icon': {
    fontSize: '1.25rem',
    width: '1.25rem',
    height: '1.25rem',
    flexShrink: '0',
    marginLeft: '1rem',
    transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  '.accordion-item-open .accordion-icon': {
    transform: 'rotate(180deg)',
  },

  // Accordion content
  '.accordion-content': {
    maxHeight: '0',
    overflow: 'hidden',
    transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  '.accordion-item-open .accordion-content': {
    maxHeight: '100rem',
  },

  // Accordion body
  '.accordion-body': {
    padding: '0 1.25rem 1rem',
    fontSize: '0.875rem',
    lineHeight: '1.5rem',
    color: 'hsl(var(--color-on-surface-variant))',
  },

  // Filled variant
  '.accordion-filled .accordion-item': {
    backgroundColor: 'hsl(var(--color-surface-container))',
    borderBottom: 'none',
    marginBottom: '0.5rem',
    borderRadius: '0.5rem',
    overflow: 'hidden',
  },

  '.accordion-filled .accordion-item:last-child': {
    marginBottom: '0',
  },

  // Outlined variant
  '.accordion-outlined': {
    border: '1px solid hsl(var(--color-outline-variant))',
    borderRadius: '0.5rem',
  },

  '.accordion-outlined .accordion-item': {
    borderBottom: '1px solid hsl(var(--color-outline-variant))',
  },

  '.accordion-outlined .accordion-item:last-child': {
    borderBottom: 'none',
  },

  // Separated variant (cards)
  '.accordion-separated .accordion-item': {
    backgroundColor: 'hsl(var(--color-surface-container))',
    border: '1px solid hsl(var(--color-outline-variant))',
    borderRadius: '0.5rem',
    marginBottom: '0.5rem',
    overflow: 'hidden',
  },

  '.accordion-separated .accordion-item:last-child': {
    marginBottom: '0',
  },

  // Compact variant
  '.accordion-compact .accordion-header': {
    padding: '0.75rem 1rem',
  },

  '.accordion-compact .accordion-body': {
    padding: '0 1rem 0.75rem',
  },

  // Comfortable variant
  '.accordion-comfortable .accordion-header': {
    padding: '1.25rem 1.5rem',
  },

  '.accordion-comfortable .accordion-body': {
    padding: '0 1.5rem 1.25rem',
  },

  // Color variants for open state
  '.accordion-primary .accordion-item-open .accordion-header': {
    color: 'hsl(var(--color-primary))',
  },

  '.accordion-secondary .accordion-item-open .accordion-header': {
    color: 'hsl(var(--color-secondary))',
  },

  '.accordion-tertiary .accordion-item-open .accordion-header': {
    color: 'hsl(var(--color-tertiary))',
  },

  // With icon in header
  '.accordion-header-icon': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },

  '.accordion-header-icon-leading': {
    fontSize: '1.25rem',
    width: '1.25rem',
    height: '1.25rem',
    flexShrink: '0',
  },

  // Disabled accordion item
  '.accordion-item-disabled .accordion-header': {
    opacity: '0.38',
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },

  // No animation variant
  '.accordion-no-animation .accordion-content': {
    transition: 'none',
  },

  '.accordion-no-animation .accordion-icon': {
    transition: 'none',
  },
};
