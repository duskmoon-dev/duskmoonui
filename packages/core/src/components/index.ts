/**
 * DuskMoonUI Component Library
 * Material Design 3-inspired components for Tailwind CSS
 */

export { buttonStyles } from './button';
export { cardStyles } from './card';
export { inputStyles } from './input';
export { badgeStyles } from './badge';
export { alertStyles } from './alert';

import type { CSSRuleObject } from 'tailwindcss/types/config';
import { buttonStyles } from './button';
import { cardStyles } from './card';
import { inputStyles } from './input';
import { badgeStyles } from './badge';
import { alertStyles } from './alert';

/**
 * Get all component styles combined
 */
export function getAllComponentStyles(): Record<string, CSSRuleObject> {
  return {
    ...buttonStyles,
    ...cardStyles,
    ...inputStyles,
    ...badgeStyles,
    ...alertStyles,
  };
}

/**
 * Get specific component styles by name
 */
export function getComponentStyles(components: string[] | 'all'): Record<string, CSSRuleObject> {
  if (components === 'all') {
    return getAllComponentStyles();
  }

  const componentMap: Record<string, Record<string, CSSRuleObject>> = {
    button: buttonStyles,
    card: cardStyles,
    input: inputStyles,
    badge: badgeStyles,
    alert: alertStyles,
  };

  const styles: Record<string, CSSRuleObject> = {};

  for (const component of components) {
    const componentStyles = componentMap[component.toLowerCase()];
    if (componentStyles) {
      Object.assign(styles, componentStyles);
    }
  }

  return styles;
}

export const componentsList = ['button', 'card', 'input', 'badge', 'alert'] as const;
export type ComponentName = (typeof componentsList)[number];
