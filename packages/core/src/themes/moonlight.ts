/**
 * Moonlight Theme (Dark)
 * A serene, elegant dark theme with cool tones and soft accents
 */

import type { ThemeColors } from '../types';

export const moonlight: ThemeColors = {
  // Primary Colors - Soft Blue
  primary: '217 91% 60%',          // #3b82f6 (Blue 500)
  'primary-focus': '217 91% 70%',
  'primary-content': '0 0% 100%',
  'primary-container': '217 91% 20%',
  'on-primary-container': '217 91% 90%',

  // Secondary Colors - Purple
  secondary: '262 83% 70%',        // #a78bfa (Violet 400)
  'secondary-focus': '262 83% 80%',
  'secondary-content': '0 0% 100%',
  'secondary-container': '262 83% 25%',
  'on-secondary-container': '262 83% 90%',

  // Tertiary Colors - Teal (NEW!)
  tertiary: '173 80% 50%',         // #14b8a6 (Teal 500)
  'tertiary-focus': '173 80% 60%',
  'tertiary-content': '0 0% 100%',
  'tertiary-container': '173 80% 20%',
  'on-tertiary-container': '173 80% 90%',

  // Accent Colors - Cyan
  accent: '189 94% 43%',           // #06b6d4 (Cyan 500)
  'accent-focus': '189 94% 53%',
  'accent-content': '0 0% 100%',

  // Neutral Colors
  neutral: '220 13% 91%',          // #e5e7eb (Gray 200)
  'neutral-focus': '220 13% 85%',
  'neutral-content': '220 9% 15%',
  'neutral-variant': '220 9% 46%',

  // Surface Colors (Material Design 3 Dark)
  surface: '220 13% 11%',          // #1c1e22
  'surface-dim': '220 13% 7%',
  'surface-bright': '220 13% 20%',
  'surface-container-lowest': '220 13% 7%',
  'surface-container-low': '220 13% 9%',
  'surface-container': '220 13% 11%',
  'surface-container-high': '220 13% 14%',
  'surface-container-highest': '220 13% 17%',
  'surface-variant': '220 9% 20%',
  'on-surface': '220 13% 91%',
  'on-surface-variant': '220 9% 70%',

  // Base Colors (Legacy support)
  'base-100': '220 13% 11%',       // Dark background
  'base-200': '220 13% 9%',        // Darker
  'base-300': '220 13% 7%',        // Darkest
  'base-content': '220 13% 91%',   // Light text

  // Outline Colors
  outline: '220 9% 46%',
  'outline-variant': '220 9% 30%',

  // Inverse Colors
  'inverse-surface': '220 13% 91%',
  'inverse-on-surface': '220 13% 11%',
  'inverse-primary': '217 91% 40%',

  // Shadow & Scrim
  shadow: '0 0% 0%',
  scrim: '0 0% 0%',

  // Semantic Colors
  info: '199 89% 60%',             // Light Blue
  'info-content': '0 0% 100%',
  success: '142 76% 60%',          // Light Green
  'success-content': '0 0% 100%',
  warning: '38 92% 60%',           // Light Orange
  'warning-content': '0 0% 100%',
  error: '0 84% 70%',              // Light Red
  'error-content': '0 0% 100%',
  'error-container': '0 84% 25%',
  'on-error-container': '0 84% 90%',
};
