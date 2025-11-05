import duskmoonuiPlugin from "@duskmoon-dev/core";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  corePlugins: {
    // Disable features that generate CSS with / syntax
    textOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    placeholderOpacity: false,
    ringOpacity: false,
  },
  plugins: [
    duskmoonuiPlugin({
      themes: ["sunshine", "moonlight"],
      darkTheme: "moonlight",
    }),
  ],
};
