import duskmoonui from '@duskmoon-dev/core';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./**/*.html'],
  plugins: [
    duskmoonui({
      themes: ['sunshine', 'moonlight'],
      darkTheme: 'moonlight',
      base: true,
      styled: true,
      utilities: true,
    }),
  ],
};
