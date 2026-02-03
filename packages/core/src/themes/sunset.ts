/**
 * Sunset Theme (Light)
 * A warm, vibrant theme inspired by golden hour and dusk skies
 */

import type { ThemeColors } from '../types';

export const sunset: ThemeColors = {
  // Primary Colors - Burnt Orange
  primary: '18 75% 48%',
  'primary-focus': '18 75% 38%',
  'primary-content': '0 0% 100%',
  'primary-container': '18 80% 92%',
  'on-primary-container': '18 75% 18%',

  // Secondary Colors - Rose
  secondary: '345 60% 52%',
  'secondary-focus': '345 60% 42%',
  'secondary-content': '0 0% 100%',
  'secondary-container': '345 60% 92%',
  'on-secondary-container': '345 60% 18%',

  // Tertiary Colors - Golden
  tertiary: '42 70% 50%',
  'tertiary-focus': '42 70% 40%',
  'tertiary-content': '0 0% 15%',
  'tertiary-container': '42 60% 92%',
  'on-tertiary-container': '42 70% 20%',

  // Accent Colors - Plum
  accent: '290 50% 50%',
  'accent-focus': '290 50% 40%',
  'accent-content': '0 0% 100%',

  // Neutral Colors
  neutral: '20 12% 15%',
  'neutral-focus': '20 12% 10%',
  'neutral-content': '0 0% 100%',
  'neutral-variant': '20 8% 46%',

  // Surface Colors (Material Design 3)
  surface: '30 15% 98%',
  'surface-dim': '25 12% 94%',
  'surface-bright': '0 0% 100%',
  'surface-container-lowest': '0 0% 100%',
  'surface-container-low': '28 12% 97%',
  'surface-container': '28 12% 95%',
  'surface-container-high': '28 12% 93%',
  'surface-container-highest': '28 12% 90%',
  'surface-variant': '25 12% 92%',
  'on-surface': '20 12% 15%',
  'on-surface-variant': '20 8% 35%',

  // Base Colors (Legacy support)
  'base-100': '30 15% 98%',
  'base-200': '28 12% 95%',
  'base-300': '28 12% 90%',
  'base-content': '20 12% 15%',

  // Outline Colors
  outline: '20 8% 52%',
  'outline-variant': '20 10% 78%',

  // Inverse Colors
  'inverse-surface': '20 12% 15%',
  'inverse-on-surface': '28 12% 94%',
  'inverse-primary': '18 70% 68%',

  // Shadow & Scrim
  shadow: '0 0% 0%',
  scrim: '0 0% 0%',

  // Semantic Colors
  info: '215 55% 48%',
  'info-content': '0 0% 100%',
  success: '150 60% 40%',
  'success-content': '0 0% 100%',
  warning: '38 85% 50%',
  'warning-content': '0 0% 100%',
  error: '0 70% 50%',
  'error-content': '0 0% 100%',
  'error-container': '0 100% 95%',
  'on-error-container': '0 70% 18%',
};
