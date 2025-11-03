import type { CSSRuleObject } from 'tailwindcss/types/config';

/**
 * File Upload component styles
 * Material Design 3-inspired file upload with drag-and-drop
 */
export const fileUploadStyles: Record<string, CSSRuleObject> = {
  // Base file upload container
  '.file-upload': {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  // Drop zone
  '.file-upload-dropzone': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    minHeight: '12rem',
    border: '2px dashed hsl(var(--color-outline))',
    borderRadius: '0.75rem',
    backgroundColor: 'hsl(var(--color-surface-container))',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

    '&:hover': {
      borderColor: 'hsl(var(--color-primary))',
      backgroundColor: 'hsl(var(--color-primary-container) / 0.1)',
    },
  },

  // Drag over state
  '.file-upload-dropzone-dragover': {
    borderColor: 'hsl(var(--color-primary))',
    backgroundColor: 'hsl(var(--color-primary-container) / 0.2)',
    borderStyle: 'solid',
  },

  // Drop zone icon
  '.file-upload-icon': {
    fontSize: '3rem',
    width: '3rem',
    height: '3rem',
    color: 'hsl(var(--color-on-surface-variant))',
    marginBottom: '1rem',
  },

  '.file-upload-dropzone:hover .file-upload-icon, .file-upload-dropzone-dragover .file-upload-icon': {
    color: 'hsl(var(--color-primary))',
  },

  // Drop zone text
  '.file-upload-text': {
    fontSize: '1rem',
    fontWeight: '500',
    lineHeight: '1.5rem',
    color: 'hsl(var(--color-on-surface))',
    textAlign: 'center',
    marginBottom: '0.5rem',
  },

  '.file-upload-hint': {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    color: 'hsl(var(--color-on-surface-variant))',
    textAlign: 'center',
  },

  // Hidden file input
  '.file-upload-input': {
    position: 'absolute',
    width: '0.1px',
    height: '0.1px',
    opacity: '0',
    overflow: 'hidden',
    zIndex: '-1',
  },

  // Browse button
  '.file-upload-button': {
    marginTop: '1rem',
  },

  // File list
  '.file-upload-list': {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginTop: '1rem',
  },

  // File item
  '.file-upload-item': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    backgroundColor: 'hsl(var(--color-surface-container))',
    borderRadius: '0.5rem',
    border: '1px solid hsl(var(--color-outline-variant))',
  },

  // File icon
  '.file-upload-item-icon': {
    fontSize: '1.5rem',
    width: '1.5rem',
    height: '1.5rem',
    color: 'hsl(var(--color-on-surface-variant))',
    flexShrink: '0',
  },

  // File info
  '.file-upload-item-info': {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.125rem',
    flex: '1 1 auto',
    minWidth: '0',
  },

  '.file-upload-item-name': {
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.25rem',
    color: 'hsl(var(--color-on-surface))',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  '.file-upload-item-size': {
    fontSize: '0.75rem',
    lineHeight: '1rem',
    color: 'hsl(var(--color-on-surface-variant))',
  },

  // Progress bar
  '.file-upload-progress': {
    width: '100%',
    height: '0.25rem',
    backgroundColor: 'hsl(var(--color-primary-container))',
    borderRadius: '0.125rem',
    overflow: 'hidden',
    marginTop: '0.5rem',
  },

  '.file-upload-progress-bar': {
    height: '100%',
    backgroundColor: 'hsl(var(--color-primary))',
    borderRadius: '0.125rem',
    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Remove button
  '.file-upload-item-remove': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2rem',
    height: '2rem',
    padding: '0.375rem',
    fontSize: '1rem',
    color: 'hsl(var(--color-on-surface-variant))',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    flexShrink: '0',

    '&:hover': {
      backgroundColor: 'hsl(var(--color-error) / 0.1)',
      color: 'hsl(var(--color-error))',
    },
  },

  // Thumbnail preview
  '.file-upload-item-thumbnail': {
    width: '3rem',
    height: '3rem',
    borderRadius: '0.375rem',
    objectFit: 'cover',
    flexShrink: '0',
  },

  // Error state
  '.file-upload-item-error': {
    borderColor: 'hsl(var(--color-error))',
    backgroundColor: 'hsl(var(--color-error) / 0.05)',
  },

  '.file-upload-item-error .file-upload-item-icon': {
    color: 'hsl(var(--color-error))',
  },

  '.file-upload-item-error-message': {
    fontSize: '0.75rem',
    lineHeight: '1rem',
    color: 'hsl(var(--color-error))',
    marginTop: '0.25rem',
  },

  // Success state
  '.file-upload-item-success': {
    borderColor: 'hsl(var(--color-success))',
  },

  '.file-upload-item-success .file-upload-item-icon': {
    color: 'hsl(var(--color-success))',
  },

  // Compact variant
  '.file-upload-compact .file-upload-dropzone': {
    padding: '1.5rem',
    minHeight: '8rem',
  },

  '.file-upload-compact .file-upload-icon': {
    fontSize: '2rem',
    width: '2rem',
    height: '2rem',
  },

  // Outlined variant
  '.file-upload-outlined .file-upload-dropzone': {
    backgroundColor: 'transparent',
    borderStyle: 'solid',
  },

  // Disabled state
  '.file-upload-disabled .file-upload-dropzone': {
    opacity: '0.38',
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },

  // Max files reached
  '.file-upload-max-reached .file-upload-dropzone': {
    opacity: '0.5',
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
};
