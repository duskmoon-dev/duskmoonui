/**
 * Forest Theme (Light)
 * A natural, earthy light theme inspired by woodland environments
 */

import type { ThemeColors } from '../types';

export const forest: ThemeColors = {
  // Primary Colors - Forest Green
  primary: '145 60% 35%',
  'primary-focus': '145 60% 28%',
  'primary-content': '0 0% 100%',
  'primary-container': '145 40% 90%',
  'on-primary-container': '145 60% 15%',

  // Secondary Colors - Warm Brown
  secondary: '30 45% 40%',
  'secondary-focus': '30 45% 32%',
  'secondary-content': '0 0% 100%',
  'secondary-container': '30 35% 90%',
  'on-secondary-container': '30 45% 16%',

  // Tertiary Colors - Sage
  tertiary: '170 35% 42%',
  'tertiary-focus': '170 35% 34%',
  'tertiary-content': '0 0% 100%',
  'tertiary-container': '170 30% 92%',
  'on-tertiary-container': '170 35% 15%',

  // Accent Colors - Amber
  accent: '45 60% 45%',
  'accent-focus': '45 60% 35%',
  'accent-content': '0 0% 100%',

  // Neutral Colors
  neutral: '90 10% 15%',
  'neutral-focus': '90 10% 10%',
  'neutral-content': '0 0% 100%',
  'neutral-variant': '90 8% 46%',

  // Surface Colors (Material Design 3)
  surface: '60 10% 98%',
  'surface-dim': '80 8% 93%',
  'surface-bright': '0 0% 100%',
  'surface-container-lowest': '0 0% 100%',
  'surface-container-low': '70 8% 96%',
  'surface-container': '75 8% 95%',
  'surface-container-high': '80 8% 93%',
  'surface-container-highest': '80 8% 90%',
  'surface-variant': '80 10% 92%',
  'on-surface': '90 10% 15%',
  'on-surface-variant': '80 6% 35%',

  // Base Colors (Legacy support)
  'base-100': '60 10% 98%',
  'base-200': '75 8% 95%',
  'base-300': '80 8% 90%',
  'base-content': '90 10% 15%',

  // Outline Colors
  outline: '80 6% 52%',
  'outline-variant': '80 8% 75%',

  // Inverse Colors
  'inverse-surface': '90 10% 15%',
  'inverse-on-surface': '70 8% 94%',
  'inverse-primary': '145 50% 60%',

  // Shadow & Scrim
  shadow: '0 0% 0%',
  scrim: '0 0% 0%',

  // Semantic Colors
  info: '210 55% 48%',
  'info-content': '0 0% 100%',
  success: '140 65% 40%',
  'success-content': '0 0% 100%',
  warning: '38 80% 48%',
  'warning-content': '0 0% 100%',
  error: '5 65% 48%',
  'error-content': '0 0% 100%',
  'error-container': '5 100% 94%',
  'on-error-container': '5 65% 18%',
};
