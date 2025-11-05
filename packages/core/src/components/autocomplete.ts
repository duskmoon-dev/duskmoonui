import type { CSSRuleObject } from 'tailwindcss/types/config';

/**
 * Autocomplete component styles
 * Material Design 3-inspired autocomplete/combobox
 */
export const autocompleteStyles: Record<string, CSSRuleObject> = {
  // Base autocomplete container
  '.autocomplete': {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  // Autocomplete input wrapper
  '.autocomplete-input-wrapper': {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },

  // Autocomplete input (extends input styles)
  '.autocomplete-input': {
    width: '100%',
    padding: '0.875rem 2.5rem 0.5rem 1rem',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    color: 'hsl(var(--color-on-surface))',
    backgroundColor: 'hsl(var(--color-surface-container-highest))',
    border: 'none',
    borderBottom: '1px solid hsl(var(--color-on-surface-variant))',
    borderRadius: '0.25rem 0.25rem 0 0',
    outline: 'none',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

    '&::placeholder': {
      color: 'color-mix(in srgb, hsl(var(--color-on-surface-variant)) 6%, transparent)',
    },

    '&:focus': {
      backgroundColor: 'hsl(var(--color-surface-container-high))',
      borderBottomWidth: '2px',
      borderBottomColor: 'hsl(var(--color-primary))',
      paddingBottom: 'calc(0.5rem - 1px)',
    },
  },

  // Dropdown toggle icon
  '.autocomplete-toggle': {
    position: 'absolute',
    right: '0.5rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.5rem',
    height: '1.5rem',
    fontSize: '1.25rem',
    color: 'hsl(var(--color-on-surface-variant))',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

    '&:hover': {
      backgroundColor: 'color-mix(in srgb, hsl(var(--color-on-surface)) 08%, transparent)',
    },
  },

  // Autocomplete dropdown
  '.autocomplete-dropdown': {
    position: 'absolute',
    top: '100%',
    left: '0',
    right: '0',
    marginTop: '0.25rem',
    maxHeight: '16rem',
    backgroundColor: 'hsl(var(--color-surface-container-high))',
    borderRadius: '0.25rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    overflowY: 'auto',
    zIndex: '50',
    opacity: '0',
    visibility: 'hidden',
    transform: 'translateY(-0.5rem)',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  '.autocomplete-dropdown-open': {
    opacity: '1',
    visibility: 'visible',
    transform: 'translateY(0)',
  },

  // Dropdown options list
  '.autocomplete-options': {
    padding: '0.5rem',
    margin: '0',
    listStyle: 'none',
  },

  // Dropdown option
  '.autocomplete-option': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.625rem 0.75rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    color: 'hsl(var(--color-on-surface))',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    textAlign: 'left',
    width: '100%',

    '&:hover': {
      backgroundColor: 'color-mix(in srgb, hsl(var(--color-on-surface)) 08%, transparent)',
    },
  },

  '.autocomplete-option-selected': {
    backgroundColor: 'hsl(var(--color-primary-container))',
    color: 'hsl(var(--color-on-primary-container))',

    '&:hover': {
      backgroundColor: 'color-mix(in srgb, hsl(var(--color-primary-container)) 9%, transparent)',
    },
  },

  '.autocomplete-option-focused': {
    backgroundColor: 'color-mix(in srgb, hsl(var(--color-on-surface)) 08%, transparent)',
  },

  // Option with icon
  '.autocomplete-option-icon': {
    fontSize: '1.25rem',
    width: '1.25rem',
    height: '1.25rem',
    flexShrink: '0',
  },

  // Loading state
  '.autocomplete-loading': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    color: 'hsl(var(--color-on-surface-variant))',
    fontSize: '0.875rem',
  },

  // No options message
  '.autocomplete-no-options': {
    padding: '1rem 0.75rem',
    fontSize: '0.875rem',
    color: 'hsl(var(--color-on-surface-variant))',
    textAlign: 'center',
  },

  // Group label
  '.autocomplete-group-label': {
    padding: '0.5rem 0.75rem 0.25rem',
    fontSize: '0.75rem',
    fontWeight: '600',
    lineHeight: '1rem',
    color: 'hsl(var(--color-on-surface-variant))',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },

  // Multi-select chips
  '.autocomplete-chips': {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.375rem',
    padding: '0.5rem 0.75rem',
  },

  '.autocomplete-chip': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.375rem',
    padding: '0.25rem 0.5rem',
    fontSize: '0.813rem',
    fontWeight: '500',
    backgroundColor: 'hsl(var(--color-primary-container))',
    color: 'hsl(var(--color-on-primary-container))',
    borderRadius: '0.375rem',
  },

  '.autocomplete-chip-remove': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1rem',
    height: '1rem',
    padding: '0',
    fontSize: '0.875rem',
    color: 'inherit',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
  },

  // Outlined variant
  '.autocomplete-outlined .autocomplete-input': {
    backgroundColor: 'transparent',
    border: '1px solid hsl(var(--color-outline))',
    borderRadius: '0.25rem',
    padding: '0.75rem 2.5rem 0.75rem 1rem',

    '&:focus': {
      backgroundColor: 'transparent',
      borderWidth: '2px',
      borderColor: 'hsl(var(--color-primary))',
      padding: 'calc(0.75rem - 1px) calc(2.5rem - 1px) calc(0.75rem - 1px) calc(1rem - 1px)',
    },
  },

  // Disabled state
  '.autocomplete-disabled .autocomplete-input': {
    opacity: '0.38',
    cursor: 'not-allowed',
    backgroundColor: 'hsl(var(--color-surface-variant))',
  },

  '.autocomplete-disabled .autocomplete-toggle': {
    opacity: '0.38',
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
};
