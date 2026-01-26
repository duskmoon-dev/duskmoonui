import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { resolve } from "path";

import tailwindcss from "@tailwindcss/vite";

const isProduction = process.env.NODE_ENV === "production";
const coreSourceDir = resolve(import.meta.dirname, "../core/src");

export default defineConfig({
  site: "https://duskmoon-dev.github.io",
  base: "/duskmoonui",
  trailingSlash: "always",

  // Internationalization
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr", "es"],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  // Markdown configuration
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false, // Use CSS variables for theme switching
      wrap: true,
    },
  },

  // Integrations
  integrations: [
    react(),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en-US",
          fr: "fr-FR",
          es: "es-ES",
        },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: isProduction
        ? {}
        : {
            // In dev mode, use source files for hot reload
            "@duskmoon-dev/core": resolve(coreSourceDir, "index.css"),
          },
    },
    optimizeDeps: {
      // Exclude core package from pre-bundling to enable hot reload
      exclude: ["@duskmoon-dev/core"],
    },
    server: {
      fs: {
        // Allow serving files from core source directory and monorepo root
        allow: [coreSourceDir, ".", "../.."],
      },
      watch: {
        // Use polling for better cross-platform compatibility in monorepos
        usePolling: true,
        interval: 100,
      },
    },
    css: {
      // Enable CSS hot reload for imported stylesheets
      devSourcemap: true,
    },
  },
});