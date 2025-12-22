/**
 * Integration tests for theme switching in browser
 * Tests data-theme attribute and prefers-color-scheme
 */

import { test, expect } from '@playwright/test';

test.describe('Theme Switching - Browser Integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/fixtures/test-fixture.html');
  });

  test('sunshine theme applies via data-theme attribute', async ({ page }) => {
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'sunshine');
    });

    const colorScheme = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).colorScheme;
    });

    expect(colorScheme).toContain('light');
  });

  test('moonlight theme applies via data-theme attribute', async ({ page }) => {
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'moonlight');
    });

    const colorScheme = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).colorScheme;
    });

    expect(colorScheme).toContain('dark');
  });

  test('theme switching updates color values', async ({ page }) => {
    // Get colors in sunshine theme
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'sunshine');
    });

    const sunshineBase100 = await page.evaluate(() => {
      return getComputedStyle(document.documentElement)
        .getPropertyValue('--color-base-100')
        .trim();
    });

    // Switch to moonlight
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'moonlight');
    });

    const moonlightBase100 = await page.evaluate(() => {
      return getComputedStyle(document.documentElement)
        .getPropertyValue('--color-base-100')
        .trim();
    });

    // Colors should be different between themes
    expect(sunshineBase100).not.toBe(moonlightBase100);
  });

  test('prefers-color-scheme dark triggers moonlight theme', async ({ page }) => {
    // Emulate dark color scheme preference
    await page.emulateMedia({ colorScheme: 'dark' });

    // Remove any explicit data-theme
    await page.evaluate(() => {
      document.documentElement.removeAttribute('data-theme');
    });

    // Wait for media query to apply
    await page.waitForTimeout(100);

    const colorScheme = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).colorScheme;
    });

    expect(colorScheme).toContain('dark');
  });

  test('prefers-color-scheme light triggers sunshine theme', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });

    await page.evaluate(() => {
      document.documentElement.removeAttribute('data-theme');
    });

    await page.waitForTimeout(100);

    const colorScheme = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).colorScheme;
    });

    expect(colorScheme).toContain('light');
  });

  test('explicit data-theme overrides prefers-color-scheme', async ({ page }) => {
    // Set system to dark mode
    await page.emulateMedia({ colorScheme: 'dark' });

    // But explicitly set light theme
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'sunshine');
    });

    const colorScheme = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).colorScheme;
    });

    expect(colorScheme).toContain('light');
  });

  test('theme switching is instant (no flash)', async ({ page }) => {
    const startTime = Date.now();

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'moonlight');
    });

    const endTime = Date.now();
    const switchTime = endTime - startTime;

    // Theme switch should be under 50ms
    expect(switchTime).toBeLessThan(50);
  });

  test('removing data-theme falls back to system preference', async ({ page }) => {
    // Set explicit theme
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'moonlight');
    });

    // Set system to light
    await page.emulateMedia({ colorScheme: 'light' });

    // Remove explicit theme
    await page.evaluate(() => {
      document.documentElement.removeAttribute('data-theme');
    });

    await page.waitForTimeout(100);

    const colorScheme = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).colorScheme;
    });

    expect(colorScheme).toContain('light');
  });
});
