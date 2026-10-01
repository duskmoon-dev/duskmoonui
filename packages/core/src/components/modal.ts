/**
 * Native HTML dialog modal styles for the Tailwind plugin.
 * The browser owns open state, focus containment, and Escape dismissal.
 */
export const modalStyles: Record<string, any> = {
  'dialog.modal': {
    'position': 'fixed',
    'inset': '0',
    'margin': 'auto',
    'padding': '0',
    'border': 'none',
    'width': 'calc(100% - 2rem)',
    'maxWidth': '32rem',
    'maxHeight': 'calc(100dvh - 2rem)',
    'boxSizing': 'border-box',
    'backgroundColor': 'transparent',
    'color': 'var(--color-on-surface)',
    'borderRadius': 'var(--radius-lg)',
    'overflow': 'visible',
    'opacity': '0',
    'transition': 'opacity 200ms ease-out, display 200ms allow-discrete, overlay 200ms allow-discrete'
  },
  'dialog.modal[open]': {
    'opacity': '1'
  },
  'dialog.modal:not([open])': {
    'display': 'none'
  },
  '.modal-box': {
    'position': 'relative',
    'width': '100%',
    'boxSizing': 'border-box',
    'maxHeight': 'calc(100dvh - 2rem)',
    'padding': '1.5rem',
    'backgroundColor': 'var(--color-surface)',
    'color': 'var(--color-on-surface)',
    'borderRadius': 'var(--radius-lg)',
    'boxShadow': 'var(--shadow-2xl)',
    'overflowY': 'auto',
    'transform': 'scale(0.95)',
    'transition': 'transform 200ms ease-out'
  },
  'dialog.modal[open] .modal-box': {
    'transform': 'scale(1)'
  },
  'dialog.modal::backdrop': {
    'backgroundColor': 'color-mix(in srgb, var(--color-scrim) 50%, transparent)',
    'opacity': '0',
    'transition': 'opacity 200ms ease-out, display 200ms allow-discrete, overlay 200ms allow-discrete'
  },
  'dialog.modal[open]::backdrop': {
    'opacity': '1'
  },
  '.modal-action,\n  .modal-footer': {
    'display': 'flex',
    'flexWrap': 'wrap',
    'justifyContent': 'flex-end',
    'gap': '0.5rem',
    'marginTop': '1.5rem',
    'paddingTop': '1rem'
  },
  'dialog.modal.modal-sm': {
    'maxWidth': '20rem'
  },
  'dialog.modal.modal-md': {
    'maxWidth': '32rem'
  },
  'dialog.modal.modal-lg': {
    'maxWidth': '48rem'
  },
  'dialog.modal.modal-xl': {
    'maxWidth': '64rem'
  },
  'dialog.modal.modal-full': {
    'maxWidth': 'calc(100vw - 2rem)',
    'maxHeight': 'calc(100dvh - 2rem)',
    'width': 'calc(100% - 2rem)',
    'height': 'calc(100dvh - 2rem)'
  },
  'dialog.modal.modal-full .modal-box': {
    'height': '100%'
  },
  'dialog.modal.modal-top': {
    'marginTop': '2rem',
    'marginBottom': 'auto'
  },
  'dialog.modal.modal-bottom': {
    'marginTop': 'auto',
    'marginBottom': '2rem'
  },
  'dialog.modal.modal-middle': {
    'margin': 'auto'
  },
  '.modal-slide-up .modal-box': {
    'transform': 'translateY(6rem) scale(0.95)'
  },
  '.modal-slide-down .modal-box': {
    'transform': 'translateY(-6rem) scale(0.95)'
  },
  '.modal-zoom .modal-box': {
    'transform': 'scale(0.75)'
  },
  'dialog.modal:is(.modal-slide-up, .modal-slide-down, .modal-zoom)[open] .modal-box': {
    'transform': 'translateY(0) scale(1)'
  },
  'dialog.modal.modal-backdrop-light::backdrop': {
    'backgroundColor': 'color-mix(in srgb, white 80%, transparent)'
  },
  'dialog.modal.modal-backdrop-blur::backdrop': {
    'backgroundColor': 'color-mix(in srgb, var(--color-scrim) 30%, transparent)',
    'backdropFilter': 'blur(8px)'
  },
  'dialog.modal.modal-no-backdrop::backdrop': {
    'backgroundColor': 'transparent'
  },
  '.modal-close': {
    'position': 'absolute',
    'top': '0.75rem',
    'right': '0.75rem',
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'width': '2rem',
    'height': '2rem',
    'fontSize': '1.25rem',
    'color': 'var(--color-on-surface-variant)',
    'backgroundColor': 'transparent',
    'border': 'none',
    'borderRadius': 'var(--radius-full)',
    'cursor': 'pointer',
    'transition': 'background-color 150ms ease-in-out, color 150ms ease-in-out'
  },
  '.modal-close:hover': {
    'backgroundColor': 'var(--color-surface-container)',
    'color': 'var(--color-on-surface)'
  },
  '.modal-close:focus-visible': {
    'outline': 'none',
    'boxShadow': '0 0 0 3px color-mix(in oklch, currentColor 20%, transparent)'
  },
  '.modal-header': {
    'marginBottom': '1rem',
    'paddingRight': '2rem'
  },
  '.modal-title': {
    'fontSize': '1.25rem',
    'fontWeight': '600',
    'color': 'var(--color-on-surface)',
    'margin': '0'
  },
  '.modal-body': {
    'color': 'var(--color-on-surface-variant)',
    'lineHeight': '1.5'
  },
  '.modal-scrollable .modal-body': {
    'maxHeight': '60vh',
    'overflowY': 'auto'
  },
  '.modal-no-padding .modal-body': {
    'padding': '0'
  },
  '.modal-centered .modal-body': {
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'textAlign': 'center'
  },
  '@media (max-width: 640px)': {
    'dialog.modal.modal-responsive': {
      'width': '100%',
      'maxWidth': '100%',
      'maxHeight': '90dvh',
      'margin': 'auto 0 0',
      'borderRadius': 'var(--radius-lg) var(--radius-lg) 0 0'
    },
    '.modal-responsive .modal-box': {
      'maxHeight': '90dvh',
      'borderRadius': 'var(--radius-lg) var(--radius-lg) 0 0'
    }
  },
  'dialog.modal.drawer-modal': {
    'width': 'min(20rem, 100%)',
    'maxWidth': '20rem',
    'maxHeight': '100dvh',
    'height': '100dvh',
    'margin': '0 0 0 auto',
    'borderRadius': '0'
  },
  '.drawer-modal .modal-box': {
    'maxHeight': '100dvh',
    'height': '100%',
    'borderRadius': '0',
    'transform': 'translateX(100%)'
  },
  'dialog.modal.drawer-modal[open] .modal-box': {
    'transform': 'translateX(0)'
  },
  'dialog.modal.drawer-modal-left': {
    'margin': '0 auto 0 0'
  },
  '.drawer-modal-left .modal-box': {
    'transform': 'translateX(-100%)'
  },
  'dialog.modal.drawer-modal-left[open] .modal-box': {
    'transform': 'translateX(0)'
  },
  '.alert-dialog': {
    'textAlign': 'center'
  },
  'dialog.modal.alert-dialog': {
    'maxWidth': '24rem'
  },
  '.alert-dialog .modal-icon': {
    'width': '4rem',
    'height': '4rem',
    'margin': '0 auto 1rem',
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'borderRadius': 'var(--radius-full)',
    'fontSize': '2rem'
  },
  '.alert-dialog .modal-icon.info': {
    'backgroundColor': 'var(--color-info-container)',
    'color': 'var(--color-on-info-container)'
  },
  '.alert-dialog .modal-icon.success': {
    'backgroundColor': 'var(--color-success-container)',
    'color': 'var(--color-on-success-container)'
  },
  '.alert-dialog .modal-icon.warning': {
    'backgroundColor': 'var(--color-warning-container)',
    'color': 'var(--color-on-warning-container)'
  },
  '.alert-dialog .modal-icon.error': {
    'backgroundColor': 'var(--color-error-container)',
    'color': 'var(--color-on-error-container)'
  },
  '.alert-dialog .modal-action': {
    'justifyContent': 'center'
  },
  '@starting-style': {
    'dialog.modal[open],\n    dialog.modal[open]::backdrop': {
      'opacity': '0'
    },
    'dialog.modal[open] .modal-box': {
      'transform': 'scale(0.95)'
    },
    'dialog.modal.modal-slide-up[open] .modal-box': {
      'transform': 'translateY(6rem) scale(0.95)'
    },
    'dialog.modal.modal-slide-down[open] .modal-box': {
      'transform': 'translateY(-6rem) scale(0.95)'
    },
    'dialog.modal.modal-zoom[open] .modal-box': {
      'transform': 'scale(0.75)'
    },
    'dialog.modal.drawer-modal[open] .modal-box': {
      'transform': 'translateX(100%)'
    },
    'dialog.modal.drawer-modal-left[open] .modal-box': {
      'transform': 'translateX(-100%)'
    }
  },
  '@media (prefers-reduced-motion: reduce)': {
    'dialog.modal,\n    dialog.modal::backdrop,\n    .modal-box': {
      'transition': 'none'
    }
  }
};
