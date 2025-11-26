/**
 * T065: Integration test for theme switcher functionality
 * Tests that the theme switcher toggles between sunshine and moonlight themes
 */

import { test, expect } from '@playwright/test';

test.describe('Theme Switcher Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Theme Toggle Button', () => {
    test('theme toggle button is visible', async ({ page }) => {
      const themeToggle = page.locator('.theme-toggle, [data-theme-toggle]');
      await expect(themeToggle).toBeVisible();
    });

    test('theme toggle has accessible label', async ({ page }) => {
      const themeToggle = page.locator('.theme-toggle, [data-theme-toggle]');
      const ariaLabel = await themeToggle.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel?.toLowerCase()).toMatch(/theme|mode|switch/);
    });

    test('theme toggle can be activated with keyboard', async ({ page }) => {
      const themeToggle = page.locator('.theme-toggle, [data-theme-toggle]');

      await themeToggle.focus();
      const initialTheme = await page.evaluate(
        () => document.documentElement.getAttribute('data-theme')
      );

      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);

      const newTheme = await page.evaluate(
        () => document.documentElement.getAttribute('data-theme')
      );

      // Theme should have changed
      expect(newTheme).not.toBe(initialTheme);
    });
  });

  test.describe('Theme Application', () => {
    test('default theme is sunshine (light)', async ({ page }) => {
      // Wait for hydration
      await page.waitForTimeout(100);

      const theme = await page.evaluate(
        () => document.documentElement.getAttribute('data-theme')
      );

      // Could be null initially or sunshine
      expect(theme === null || theme === 'sunshine').toBe(true);
    });

    test('clicking toggle switches to moonlight theme', async ({ page }) => {
      const themeToggle = page.locator('.theme-toggle, [data-theme-toggle]');

      // Set initial theme to sunshine
      await page.evaluate(
        () => document.documentElement.setAttribute('data-theme', 'sunshine')
      );

      await themeToggle.click();
      await page.waitForTimeout(100);

      const theme = await page.evaluate(
        () => document.documentElement.getAttribute('data-theme')
      );

      expect(theme).toBe('moonlight');
    });

    test('clicking toggle again switches back to sunshine', async ({ page }) => {
      const themeToggle = page.locator('.theme-toggle, [data-theme-toggle]');

      // Set to moonlight first
      await page.evaluate(
        () => document.documentElement.setAttribute('data-theme', 'moonlight')
      );

      await themeToggle.click();
      await page.waitForTimeout(100);

      const theme = await page.evaluate(
        () => document.documentElement.getAttribute('data-theme')
      );

      expect(theme).toBe('sunshine');
    });

    test('theme colors update when switched', async ({ page }) => {
      // Get initial background color
      await page.evaluate(
        () => document.documentElement.setAttribute('data-theme', 'sunshine')
      );
      await page.waitForTimeout(100);

      const lightBg = await page.evaluate(() => {
        const styles = window.getComputedStyle(document.body);
        return styles.backgroundColor;
      });

      // Switch to dark theme
      await page.evaluate(
        () => document.documentElement.setAttribute('data-theme', 'moonlight')
      );
      await page.waitForTimeout(100);

      const darkBg = await page.evaluate(() => {
        const styles = window.getComputedStyle(document.body);
        return styles.backgroundColor;
      });

      // Colors should be different
      expect(lightBg).not.toBe(darkBg);
    });
  });

  test.describe('Theme Persistence', () => {
    test('theme preference is saved to localStorage', async ({ page }) => {
      const themeToggle = page.locator('.theme-toggle, [data-theme-toggle]');

      // Ensure we start with sunshine
      await page.evaluate(() => {
        localStorage.removeItem('theme');
        document.documentElement.setAttribute('data-theme', 'sunshine');
      });

      await themeToggle.click();
      await page.waitForTimeout(100);

      const savedTheme = await page.evaluate(
        () => localStorage.getItem('theme')
      );

      expect(savedTheme).toBe('moonlight');
    });

    test('theme is restored from localStorage on page load', async ({ page }) => {
      // Set theme preference in localStorage before navigation
      await page.evaluate(() => {
        localStorage.setItem('theme', 'moonlight');
      });

      await page.reload();
      await page.waitForTimeout(300);

      const theme = await page.evaluate(
        () => document.documentElement.getAttribute('data-theme')
      );

      expect(theme).toBe('moonlight');
    });
  });

  test.describe('Visual Feedback', () => {
    test('toggle icon changes based on theme', async ({ page }) => {
      const themeToggle = page.locator('.theme-toggle, [data-theme-toggle]');

      // Set to light theme
      await page.evaluate(
        () => document.documentElement.setAttribute('data-theme', 'sunshine')
      );
      await page.waitForTimeout(100);

      const lightIcon = await themeToggle.textContent();

      // Switch to dark theme
      await page.evaluate(
        () => document.documentElement.setAttribute('data-theme', 'moonlight')
      );
      await page.waitForTimeout(100);

      const darkIcon = await themeToggle.textContent();

      // Icons should be different
      expect(lightIcon).not.toBe(darkIcon);
    });
  });
});
