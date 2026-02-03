/**
 * Ocean Theme (Dark)
 * A deep, calming dark theme inspired by ocean depths
 */

import type { ThemeColors } from '../types';

export const ocean: ThemeColors = {
  // Primary Colors - Deep Cyan
  primary: '195 70% 45%',
  'primary-focus': '195 70% 55%',
  'primary-content': '0 0% 100%',
  'primary-container': '195 70% 20%',
  'on-primary-container': '195 70% 90%',

  // Secondary Colors - Aquamarine
  secondary: '168 50% 50%',
  'secondary-focus': '168 50% 60%',
  'secondary-content': '0 0% 100%',
  'secondary-container': '168 50% 22%',
  'on-secondary-container': '168 50% 90%',

  // Tertiary Colors - Lavender
  tertiary: '268 45% 55%',
  'tertiary-focus': '268 45% 65%',
  'tertiary-content': '0 0% 100%',
  'tertiary-container': '268 45% 22%',
  'on-tertiary-container': '268 45% 90%',

  // Accent Colors - Teal
  accent: '185 60% 45%',
  'accent-focus': '185 60% 55%',
  'accent-content': '0 0% 100%',

  // Neutral Colors
  neutral: '210 15% 90%',
  'neutral-focus': '210 15% 85%',
  'neutral-content': '210 20% 12%',
  'neutral-variant': '210 12% 46%',

  // Surface Colors (Material Design 3 Dark)
  surface: '210 20% 12%',
  'surface-dim': '210 20% 6%',
  'surface-bright': '210 18% 20%',
  'surface-container-lowest': '210 20% 5%',
  'surface-container-low': '210 18% 8%',
  'surface-container': '210 18% 12%',
  'surface-container-high': '210 16% 16%',
  'surface-container-highest': '210 16% 20%',
  'surface-variant': '210 12% 18%',
  'on-surface': '195 10% 90%',
  'on-surface-variant': '195 10% 70%',

  // Base Colors (Legacy support)
  'base-100': '210 20% 12%',
  'base-200': '210 20% 10%',
  'base-300': '210 20% 6%',
  'base-content': '195 10% 90%',

  // Outline Colors
  outline: '210 12% 40%',
  'outline-variant': '210 12% 28%',

  // Inverse Colors
  'inverse-surface': '195 10% 90%',
  'inverse-on-surface': '210 20% 12%',
  'inverse-primary': '195 70% 35%',

  // Shadow & Scrim
  shadow: '0 0% 0%',
  scrim: '0 0% 0%',

  // Semantic Colors
  info: '220 60% 58%',
  'info-content': '0 0% 100%',
  success: '155 60% 55%',
  'success-content': '0 0% 100%',
  warning: '45 70% 55%',
  'warning-content': '0 0% 100%',
  error: '10 70% 60%',
  'error-content': '0 0% 100%',
  'error-container': '10 70% 22%',
  'on-error-container': '10 70% 90%',
};
