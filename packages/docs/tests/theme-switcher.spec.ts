/**
 * T065: Integration test for theme switcher functionality
 * Tests the theme-controller with three modes: auto, light (sunshine), dark (moonlight)
 */

import { test, expect } from '@playwright/test';

test.describe('Theme Switcher Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Clear stored mode before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('theme-mode'));
  });

  test.describe('Theme Controller Visibility', () => {
    test('theme controller is visible', async ({ page }) => {
      const controller = page.locator('[data-theme-toggle]');
      await expect(controller).toBeVisible();
    });

    test('theme controller has accessible radiogroup role', async ({ page }) => {
      const controller = page.locator('[data-theme-toggle]');
      await expect(controller).toHaveAttribute('role', 'radiogroup');
    });

    test('theme controller has accessible label', async ({ page }) => {
      const controller = page.locator('[data-theme-toggle]');
      const ariaLabel = await controller.getAttribute('aria-label');
      expect(ariaLabel?.toLowerCase()).toMatch(/theme/);
    });

    test('has exactly three mode options (auto, light, dark)', async ({ page }) => {
      const radios = page.locator('.theme-controller-item');
      await expect(radios).toHaveCount(3);
    });
  });

  test.describe('Theme Application', () => {
    test('defaults to auto mode', async ({ page }) => {
      await page.reload();
      await page.waitForTimeout(200);

      const autoRadio = page.locator('#theme-auto');
      await expect(autoRadio).toBeChecked();
    });

    test('clicking light selects sunshine theme', async ({ page }) => {
      const lightLabel = page.locator('label[for="theme-sunshine"]');
      await lightLabel.click();
      await page.waitForTimeout(100);

      const theme = await page.evaluate(
        () => document.documentElement.getAttribute('data-theme')
      );
      expect(theme).toBe('sunshine');
    });

    test('clicking dark selects moonlight theme', async ({ page }) => {
      const darkLabel = page.locator('label[for="theme-moonlight"]');
      await darkLabel.click();
      await page.waitForTimeout(100);

      const theme = await page.evaluate(
        () => document.documentElement.getAttribute('data-theme')
      );
      expect(theme).toBe('moonlight');
    });

    test('auto mode resolves to a valid theme', async ({ page }) => {
      const autoLabel = page.locator('label[for="theme-auto"]');
      await autoLabel.click();
      await page.waitForTimeout(100);

      const theme = await page.evaluate(
        () => document.documentElement.getAttribute('data-theme')
      );
      expect(['sunshine', 'moonlight']).toContain(theme);
    });

    test('theme colors differ between light and dark', async ({ page }) => {
      // Set light
      const lightLabel = page.locator('label[for="theme-sunshine"]');
      await lightLabel.click();
      await page.waitForTimeout(100);

      const lightBg = await page.evaluate(() =>
        window.getComputedStyle(document.body).backgroundColor
      );

      // Set dark
      const darkLabel = page.locator('label[for="theme-moonlight"]');
      await darkLabel.click();
      await page.waitForTimeout(100);

      const darkBg = await page.evaluate(() =>
        window.getComputedStyle(document.body).backgroundColor
      );

      expect(lightBg).not.toBe(darkBg);
    });
  });

  test.describe('Theme Persistence', () => {
    test('mode preference is saved to localStorage', async ({ page }) => {
      const darkLabel = page.locator('label[for="theme-moonlight"]');
      await darkLabel.click();
      await page.waitForTimeout(100);

      const savedMode = await page.evaluate(
        () => localStorage.getItem('theme-mode')
      );
      expect(savedMode).toBe('moonlight');
    });

    test('mode is restored from localStorage on page load', async ({ page }) => {
      await page.evaluate(() => {
        localStorage.setItem('theme-mode', 'moonlight');
      });

      await page.reload();
      await page.waitForTimeout(300);

      const theme = await page.evaluate(
        () => document.documentElement.getAttribute('data-theme')
      );
      expect(theme).toBe('moonlight');
    });

    test('auto mode is restored from localStorage on page load', async ({ page }) => {
      await page.evaluate(() => {
        localStorage.setItem('theme-mode', 'auto');
      });

      await page.reload();
      await page.waitForTimeout(300);

      const theme = await page.evaluate(
        () => document.documentElement.getAttribute('data-theme')
      );
      // Auto resolves based on system preference
      expect(['sunshine', 'moonlight']).toContain(theme);
    });
  });

  test.describe('Radio State', () => {
    test('radio state updates when mode changes', async ({ page }) => {
      const darkLabel = page.locator('label[for="theme-moonlight"]');
      await darkLabel.click();
      await page.waitForTimeout(100);

      await expect(page.locator('#theme-moonlight')).toBeChecked();
      await expect(page.locator('#theme-auto')).not.toBeChecked();
      await expect(page.locator('#theme-sunshine')).not.toBeChecked();
    });

    test('switching between all three modes works', async ({ page }) => {
      for (const mode of ['sunshine', 'moonlight', 'auto'] as const) {
        const label = page.locator(`label[for="theme-${mode}"]`);
        await label.click();
        await page.waitForTimeout(100);
        await expect(page.locator(`#theme-${mode}`)).toBeChecked();
      }
    });
  });
});
