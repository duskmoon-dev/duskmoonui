import type { CSSRuleObject } from 'tailwindcss/types/config';

/**
 * Textarea component styles
 * Material Design 3-inspired textarea component
 */
export const textareaStyles: Record<string, CSSRuleObject> = {
  // Base textarea
  '.textarea': {
    width: '100%',
    minHeight: '6rem',
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    fontWeight: '400',
    lineHeight: '1.5',
    fontFamily: 'inherit',
    color: 'hsl(var(--color-on-surface))',
    backgroundColor: 'hsl(var(--color-surface))',
    border: '1px solid hsl(var(--color-outline))',
    borderRadius: '0.5rem',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    resize: 'vertical',
    outline: 'none',
  },

  // Placeholder
  '.textarea::placeholder': {
    color: 'color-mix(in srgb, hsl(var(--color-on-surface-variant)) 6%, transparent)',
  },

  // Hover state
  '.textarea:hover': {
    borderColor: 'hsl(var(--color-primary))',
    backgroundColor: 'color-mix(in srgb, hsl(var(--color-surface-variant)) 3%, transparent)',
  },

  // Focus state
  '.textarea:focus': {
    borderColor: 'hsl(var(--color-primary))',
    borderWidth: '2px',
    padding: 'calc(0.75rem - 1px) calc(1rem - 1px)',
    boxShadow: '0 0 0 3px color-mix(in srgb, hsl(var(--color-primary)) 1%, transparent)',
  },

  // Filled variant
  '.textarea-filled': {
    backgroundColor: 'hsl(var(--color-surface-variant))',
    border: 'none',
    borderBottom: '2px solid hsl(var(--color-outline))',
    borderRadius: '0.5rem 0.5rem 0 0',
    padding: '1.5rem 1rem 0.5rem',
  },

  '.textarea-filled:focus': {
    borderBottomColor: 'hsl(var(--color-primary))',
    borderBottomWidth: '2px',
    padding: '1.5rem 1rem 0.5rem',
    boxShadow: 'none',
  },

  // Outlined variant (default)
  '.textarea-outlined': {
    backgroundColor: 'transparent',
  },

  // Color variants
  '.textarea-primary:focus': {
    borderColor: 'hsl(var(--color-primary))',
    boxShadow: '0 0 0 3px color-mix(in srgb, hsl(var(--color-primary)) 1%, transparent)',
  },

  '.textarea-secondary:focus': {
    borderColor: 'hsl(var(--color-secondary))',
    boxShadow: '0 0 0 3px color-mix(in srgb, hsl(var(--color-secondary)) 1%, transparent)',
  },

  '.textarea-tertiary:focus': {
    borderColor: 'hsl(var(--color-tertiary))',
    boxShadow: '0 0 0 3px color-mix(in srgb, hsl(var(--color-tertiary)) 1%, transparent)',
  },

  // Size variants
  '.textarea-sm': {
    minHeight: '4rem',
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem',
  },

  '.textarea-sm:focus': {
    padding: 'calc(0.5rem - 1px) calc(0.75rem - 1px)',
  },

  '.textarea-lg': {
    minHeight: '8rem',
    padding: '1rem 1.25rem',
    fontSize: '1.125rem',
  },

  '.textarea-lg:focus': {
    padding: 'calc(1rem - 1px) calc(1.25rem - 1px)',
  },

  // Disabled state
  '.textarea:disabled': {
    opacity: '0.6',
    cursor: 'not-allowed',
    backgroundColor: 'color-mix(in srgb, hsl(var(--color-surface-variant)) 5%, transparent)',
    color: 'color-mix(in srgb, hsl(var(--color-on-surface)) 6%, transparent)',
  },

  // Readonly state
  '.textarea:read-only': {
    backgroundColor: 'color-mix(in srgb, hsl(var(--color-surface-variant)) 3%, transparent)',
    cursor: 'default',
  },

  // Error state
  '.textarea-error': {
    borderColor: 'hsl(var(--color-error))',
  },

  '.textarea-error:focus': {
    borderColor: 'hsl(var(--color-error))',
    boxShadow: '0 0 0 3px color-mix(in srgb, hsl(var(--color-error)) 1%, transparent)',
  },

  // Success state
  '.textarea-success': {
    borderColor: 'hsl(var(--color-success))',
  },

  '.textarea-success:focus': {
    borderColor: 'hsl(var(--color-success))',
    boxShadow: '0 0 0 3px color-mix(in srgb, hsl(var(--color-success)) 1%, transparent)',
  },

  // Resize variants
  '.textarea-resize-none': {
    resize: 'none',
  },

  '.textarea-resize-both': {
    resize: 'both',
  },

  '.textarea-resize-horizontal': {
    resize: 'horizontal',
  },

  '.textarea-resize-vertical': {
    resize: 'vertical',
  },

  // Container for label and helper text
  '.textarea-container': {
    position: 'relative',
    width: '100%',
  },

  // Label
  '.textarea-label': {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'hsl(var(--color-on-surface))',
  },

  // Floating label for filled variant
  '.textarea-label-floating': {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    fontSize: '1rem',
    color: 'hsl(var(--color-on-surface-variant))',
    pointerEvents: 'none',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    transformOrigin: 'left top',
    backgroundColor: 'hsl(var(--color-surface))',
    padding: '0 0.25rem',
  },

  '.textarea:focus ~ .textarea-label-floating, .textarea:not(:placeholder-shown) ~ .textarea-label-floating': {
    transform: 'translateY(-1.5rem) scale(0.75)',
    color: 'hsl(var(--color-primary))',
  },

  // Helper text
  '.textarea-helper': {
    display: 'block',
    marginTop: '0.25rem',
    fontSize: '0.75rem',
    color: 'hsl(var(--color-on-surface-variant))',
  },

  '.textarea-error ~ .textarea-helper, .textarea-container-error .textarea-helper': {
    color: 'hsl(var(--color-error))',
  },

  '.textarea-success ~ .textarea-helper, .textarea-container-success .textarea-helper': {
    color: 'hsl(var(--color-success))',
  },

  // Character counter
  '.textarea-counter': {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '0.25rem',
    fontSize: '0.75rem',
    color: 'hsl(var(--color-on-surface-variant))',
  },

  '.textarea-counter-exceeded': {
    color: 'hsl(var(--color-error))',
  },

  // Auto-resize
  '.textarea-auto-resize': {
    resize: 'none',
    overflow: 'hidden',
  },

  // Full width
  '.textarea-full': {
    width: '100%',
  },
};
