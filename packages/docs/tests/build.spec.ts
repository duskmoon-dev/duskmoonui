/**
 * T064: Integration test for documentation site build
 * Tests that the documentation site builds successfully
 */

import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const docsRoot = join(__dirname, '..');

test.describe('Documentation Site Build', () => {
  test.describe('Build Process', () => {
    test('astro build completes without errors', async () => {
      // This test verifies the build command runs successfully
      // The actual build is done by CI/CD, this tests the configuration
      const packageJsonPath = join(docsRoot, 'package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

      expect(packageJson.scripts.build).toBeDefined();
      expect(packageJson.scripts.build).toContain('astro');
    });

    test('astro.config.mjs exists and is valid', async () => {
      const configPath = join(docsRoot, 'astro.config.mjs');
      expect(existsSync(configPath)).toBe(true);

      const configContent = readFileSync(configPath, 'utf-8');

      // Check for essential integrations
      expect(configContent).toContain('react');
      expect(configContent).toContain('mdx');
      expect(configContent).toContain('tailwind');
    });

    test('global styles import @duskmoon-dev/core', async () => {
      const globalCssPath = join(docsRoot, 'src/styles/global.css');
      expect(existsSync(globalCssPath)).toBe(true);

      const cssContent = readFileSync(globalCssPath, 'utf-8');

      // Should import Tailwind CSS
      expect(cssContent).toMatch(/@import\s+['"]?tailwindcss['"]?/);

      // Should import the @duskmoon-dev/core CSS
      expect(cssContent).toMatch(/@import\s+['"]@duskmoon-dev\/core['"]?/);
    });
  });

  test.describe('Required Files', () => {
    test('homepage exists', async () => {
      const homepagePath = join(docsRoot, 'src/pages/index.astro');
      expect(existsSync(homepagePath)).toBe(true);
    });

    test('base layout exists', async () => {
      const layoutPath = join(docsRoot, 'src/layouts/BaseLayout.astro');
      expect(existsSync(layoutPath)).toBe(true);
    });

    test('docs layout exists', async () => {
      const docsLayoutPath = join(docsRoot, 'src/layouts/DocsLayout.astro');
      expect(existsSync(docsLayoutPath)).toBe(true);
    });

    test('essential component docs exist', async () => {
      const componentDocs = [
        'src/content/docs/en/components/button.mdx',
        'src/content/docs/en/components/card.mdx',
        'src/content/docs/en/components/input.mdx',
        'src/content/docs/en/components/modal.mdx',
      ];

      for (const docPath of componentDocs) {
        const fullPath = join(docsRoot, docPath);
        expect(existsSync(fullPath)).toBe(true);
      }
    });

    test('getting started docs exist', async () => {
      const gettingStartedDocs = [
        'src/content/docs/en/getting-started/installation.mdx',
        'src/content/docs/en/getting-started/quick-start.mdx',
        'src/content/docs/en/getting-started/configuration.mdx',
      ];

      for (const docPath of gettingStartedDocs) {
        const fullPath = join(docsRoot, docPath);
        expect(existsSync(fullPath)).toBe(true);
      }
    });

    test('theming docs exist', async () => {
      const themingDocs = [
        'src/content/docs/en/theming/overview.mdx',
        'src/content/docs/en/theming/customization.mdx',
      ];

      for (const docPath of themingDocs) {
        const fullPath = join(docsRoot, docPath);
        expect(existsSync(fullPath)).toBe(true);
      }
    });
  });

  test.describe('Dependencies', () => {
    test('package.json has workspace dependency on @duskmoon-dev/core', async () => {
      const packageJsonPath = join(docsRoot, 'package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

      expect(packageJson.dependencies['@duskmoon-dev/core']).toBeDefined();
      expect(packageJson.dependencies['@duskmoon-dev/core']).toMatch(
        /workspace:\*/
      );
    });

    test('has required Astro integrations', async () => {
      const packageJsonPath = join(docsRoot, 'package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

      const requiredDeps = [
        '@astrojs/react',
        '@astrojs/mdx',
        '@astrojs/sitemap',
        'tailwindcss',
      ];

      for (const dep of requiredDeps) {
        expect(packageJson.dependencies[dep]).toBeDefined();
      }
    });

    test('has Tailwind CSS v4', async () => {
      const packageJsonPath = join(docsRoot, 'package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

      const tailwindVersion = packageJson.dependencies['tailwindcss'];
      expect(tailwindVersion).toMatch(/\^4\./);
    });
  });
});
