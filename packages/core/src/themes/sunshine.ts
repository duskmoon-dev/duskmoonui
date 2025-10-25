/**
 * Sunshine Theme (Light)
 * A warm, energetic light theme with golden and vibrant accents
 */

import type { ThemeColors } from '../types';

export const sunshine: ThemeColors = {
  // Primary Colors - Warm Orange
  primary: '38 92% 50%',           // #f59e0b (Amber 500)
  'primary-focus': '38 92% 40%',
  'primary-content': '0 0% 100%',
  'primary-container': '38 100% 90%',
  'on-primary-container': '38 92% 15%',

  // Secondary Colors - Pink
  secondary: '330 81% 60%',        // #ec4899 (Pink 500)
  'secondary-focus': '330 81% 50%',
  'secondary-content': '0 0% 100%',
  'secondary-container': '330 100% 92%',
  'on-secondary-container': '330 81% 18%',

  // Tertiary Colors - Purple (NEW!)
  tertiary: '258 90% 66%',         // #8b5cf6 (Violet 500)
  'tertiary-focus': '258 90% 56%',
  'tertiary-content': '0 0% 100%',
  'tertiary-container': '258 100% 92%',
  'on-tertiary-container': '258 90% 20%',

  // Accent Colors - Emerald
  accent: '160 84% 39%',           // #10b981 (Emerald 500)
  'accent-focus': '160 84% 29%',
  'accent-content': '0 0% 100%',

  // Neutral Colors
  neutral: '217 33% 17%',          // #1f2937 (Gray 800)
  'neutral-focus': '217 33% 12%',
  'neutral-content': '0 0% 100%',
  'neutral-variant': '220 14% 60%',

  // Surface Colors (Material Design 3)
  surface: '0 0% 99%',
  'surface-dim': '220 13% 94%',
  'surface-bright': '0 0% 100%',
  'surface-container-lowest': '0 0% 100%',
  'surface-container-low': '220 13% 97%',
  'surface-container': '220 13% 96%',
  'surface-container-high': '220 13% 94%',
  'surface-container-highest': '220 13% 91%',
  'surface-variant': '220 14% 90%',
  'on-surface': '217 33% 17%',
  'on-surface-variant': '220 9% 30%',

  // Base Colors (Legacy support)
  'base-100': '0 0% 100%',         // White
  'base-200': '220 13% 96%',       // Light gray
  'base-300': '220 13% 91%',       // Medium gray
  'base-content': '217 33% 17%',   // Dark text

  // Outline Colors
  outline: '220 9% 55%',
  'outline-variant': '220 14% 80%',

  // Inverse Colors
  'inverse-surface': '217 33% 17%',
  'inverse-on-surface': '220 13% 94%',
  'inverse-primary': '38 100% 75%',

  // Shadow & Scrim
  shadow: '0 0% 0%',
  scrim: '0 0% 0%',

  // Semantic Colors
  info: '199 89% 48%',             // Blue
  'info-content': '0 0% 100%',
  success: '142 71% 45%',          // Green
  'success-content': '0 0% 100%',
  warning: '38 92% 50%',           // Orange
  'warning-content': '0 0% 100%',
  error: '0 72% 51%',              // Red
  'error-content': '0 0% 100%',
  'error-container': '0 100% 95%',
  'on-error-container': '0 72% 20%',
};
