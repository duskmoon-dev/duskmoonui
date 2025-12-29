import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { resolve } from "path";

import tailwindcss from "@tailwindcss/vite";

const isProduction = process.env.NODE_ENV === "production";

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
            "@duskmoon-dev/core": resolve(
              import.meta.dirname,
              "../core/src/index.css"
            ),
          },
    },
    server: {
      watch: {
        // Watch core source files for changes
        ignored: ["!**/packages/core/src/**"],
      },
    },
  },
});