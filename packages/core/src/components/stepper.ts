import type { CSSRuleObject } from "tailwindcss/types/config";

/**
 * Stepper component styles
 * Material Design 3-inspired stepper for multi-step processes
 */
export const stepperStyles: Record<string, CSSRuleObject> = {
  // Base stepper (horizontal)
  ".stepper": {
    display: "flex",
    alignItems: "flex-start",
    width: "100%",
  },

  // Stepper step
  ".stepper-step": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: "1 1 0%",
    position: "relative",
  },

  // Step button/indicator
  ".stepper-step-button": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    zIndex: "1",
  },

  // Step icon/number circle
  ".stepper-step-icon": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2.5rem",
    height: "2.5rem",
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "hsl(var(--color-on-surface-variant))",
    backgroundColor: "hsl(var(--color-surface-variant))",
    border: "2px solid hsl(var(--color-outline))",
    borderRadius: "50%",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  },

  // Active step
  ".stepper-step-active .stepper-step-icon": {
    color: "hsl(var(--color-on-primary))",
    backgroundColor: "hsl(var(--color-primary))",
    borderColor: "hsl(var(--color-primary))",
  },

  // Completed step
  ".stepper-step-completed .stepper-step-icon": {
    color: "hsl(var(--color-on-primary))",
    backgroundColor: "hsl(var(--color-primary))",
    borderColor: "hsl(var(--color-primary))",
  },

  // Error step
  ".stepper-step-error .stepper-step-icon": {
    color: "hsl(var(--color-on-error))",
    backgroundColor: "hsl(var(--color-error))",
    borderColor: "hsl(var(--color-error))",
  },

  // Step label
  ".stepper-step-label": {
    fontSize: "0.875rem",
    fontWeight: "500",
    lineHeight: "1.25rem",
    color: "hsl(var(--color-on-surface-variant))",
    textAlign: "center",
    maxWidth: "8rem",
  },

  ".stepper-step-active .stepper-step-label": {
    color: "hsl(var(--color-on-surface))",
  },

  // Step description
  ".stepper-step-description": {
    fontSize: "0.75rem",
    lineHeight: "1rem",
    color: "hsl(var(--color-on-surface-variant))",
    textAlign: "center",
    maxWidth: "8rem",
    marginTop: "0.25rem",
  },

  // Step connector line
  ".stepper-step-connector": {
    position: "absolute",
    top: "1.25rem",
    left: "calc(50% + 1.25rem)",
    right: "calc(-50% + 1.25rem)",
    height: "2px",
    backgroundColor: "hsl(var(--color-outline-variant))",
    transition: "background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  },

  ".stepper-step:last-child .stepper-step-connector": {
    display: "none",
  },

  ".stepper-step-completed .stepper-step-connector": {
    backgroundColor: "hsl(var(--color-primary))",
  },

  // Vertical stepper
  ".stepper-vertical": {
    flexDirection: "column",
  },

  ".stepper-vertical .stepper-step": {
    flexDirection: "row",
    width: "100%",
  },

  ".stepper-vertical .stepper-step-button": {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: "1rem",
  },

  ".stepper-vertical .stepper-step-label": {
    textAlign: "left",
    maxWidth: "none",
  },

  ".stepper-vertical .stepper-step-description": {
    textAlign: "left",
    maxWidth: "none",
  },

  ".stepper-vertical .stepper-step-connector": {
    top: "calc(2.5rem + 0.5rem)",
    left: "1.25rem",
    bottom: "calc(-100% + 2.5rem)",
    right: "auto",
    width: "2px",
    height: "auto",
  },

  // Step content (for vertical stepper)
  ".stepper-step-content": {
    padding: "1rem 0 1.5rem 4.5rem",
    width: "100%",
  },

  // Alternative labels (below connector)
  ".stepper-alt-labels .stepper-step-connector": {
    top: "1.25rem",
  },

  // Color variants
  ".stepper-secondary .stepper-step-active .stepper-step-icon, .stepper-secondary .stepper-step-completed .stepper-step-icon":
    {
      backgroundColor: "hsl(var(--color-secondary))",
      borderColor: "hsl(var(--color-secondary))",
    },

  ".stepper-secondary .stepper-step-completed .stepper-step-connector": {
    backgroundColor: "hsl(var(--color-secondary))",
  },

  ".stepper-tertiary .stepper-step-active .stepper-step-icon, .stepper-tertiary .stepper-step-completed .stepper-step-icon":
    {
      backgroundColor: "hsl(var(--color-tertiary))",
      borderColor: "hsl(var(--color-tertiary))",
    },

  ".stepper-tertiary .stepper-step-completed .stepper-step-connector": {
    backgroundColor: "hsl(var(--color-tertiary))",
  },

  // Disabled step
  ".stepper-step-disabled": {
    opacity: "0.38",
    pointerEvents: "none",
  },

  // Optional step indicator
  ".stepper-step-optional::after": {
    content: '"(Optional)"',
    fontSize: "0.75rem",
    color: "hsl(var(--color-on-surface-variant))",
    marginTop: "0.125rem",
  },
};
