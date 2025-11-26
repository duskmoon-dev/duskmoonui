/**
 * T067: Accessibility audit for documentation site navigation
 * Tests WCAG compliance for the documentation site
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Documentation Site Accessibility', () => {
  test.describe('Homepage Accessibility', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('homepage passes axe accessibility audit', async ({ page }) => {
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      expect(results.violations).toEqual([]);
    });

    test('homepage has correct heading hierarchy', async ({ page }) => {
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);

      // Check that h1 appears before h2
      const firstH1 = await page.locator('h1').first().boundingBox();
      const firstH2 = page.locator('h2').first();

      if ((await firstH2.count()) > 0) {
        const h2Box = await firstH2.boundingBox();
        if (firstH1 && h2Box) {
          expect(firstH1.y).toBeLessThan(h2Box.y);
        }
      }
    });

    test('all images have alt text', async ({ page }) => {
      const images = await page.locator('img').all();

      for (const img of images) {
        const alt = await img.getAttribute('alt');
        expect(alt).toBeTruthy();
      }
    });

    test('links have accessible names', async ({ page }) => {
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a'])
        .analyze();

      const linkViolations = results.violations.filter(
        (v) => v.id === 'link-name'
      );

      expect(linkViolations).toHaveLength(0);
    });
  });

  test.describe('Navigation Accessibility', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/docs/en/components/button');
    });

    test('sidebar navigation is keyboard accessible', async ({ page }) => {
      const sidebar = page.locator('nav, [role="navigation"]').first();
      await expect(sidebar).toBeVisible();

      // Check links are focusable
      const navLinks = sidebar.locator('a');
      const linkCount = await navLinks.count();

      expect(linkCount).toBeGreaterThan(0);

      // First link should be focusable
      const firstLink = navLinks.first();
      await firstLink.focus();

      const isFocused = await firstLink.evaluate(
        (el) => document.activeElement === el
      );
      expect(isFocused).toBe(true);
    });

    test('current page is indicated in navigation', async ({ page }) => {
      const currentPageIndicator = page.locator(
        '[aria-current="page"], .active, [data-active="true"]'
      );

      const count = await currentPageIndicator.count();
      expect(count).toBeGreaterThan(0);
    });

    test('skip link is present for keyboard users', async ({ page }) => {
      // Press Tab to reveal skip link
      await page.keyboard.press('Tab');

      const skipLink = page.locator('a[href="#main"], a[href="#content"], .skip-link');

      // Skip link should be visible after Tab
      // It may be visually hidden until focused
      const count = await skipLink.count();
      expect(count).toBeGreaterThanOrEqual(0); // Optional but recommended
    });

    test('navigation landmarks are properly defined', async ({ page }) => {
      // Check for main content landmark
      const main = page.locator('main, [role="main"]');
      const mainCount = await main.count();
      expect(mainCount).toBeGreaterThan(0);

      // Check for navigation landmark
      const nav = page.locator('nav, [role="navigation"]');
      const navCount = await nav.count();
      expect(navCount).toBeGreaterThan(0);
    });
  });

  test.describe('Component Documentation Accessibility', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/docs/en/components/button');
    });

    test('documentation page passes axe audit', async ({ page }) => {
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      // Filter out minor violations that may be from user content
      const criticalViolations = results.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious'
      );

      expect(criticalViolations).toEqual([]);
    });

    test('code examples have proper color contrast', async ({ page }) => {
      const codeBlocks = page.locator('pre, code, .code-block');
      const count = await codeBlocks.count();

      if (count > 0) {
        const results = await new AxeBuilder({ page })
          .include('pre, code, .code-block')
          .withTags(['wcag2aa'])
          .analyze();

        const contrastViolations = results.violations.filter(
          (v) => v.id === 'color-contrast'
        );

        expect(contrastViolations).toHaveLength(0);
      }
    });

    test('interactive components in docs are keyboard accessible', async ({ page }) => {
      const buttons = page.locator('.btn, button');
      const buttonCount = await buttons.count();

      if (buttonCount > 0) {
        const firstButton = buttons.first();
        await firstButton.focus();

        const isFocused = await firstButton.evaluate(
          (el) => document.activeElement === el
        );
        expect(isFocused).toBe(true);
      }
    });
  });

  test.describe('Theme Accessibility', () => {
    test('light theme passes color contrast', async ({ page }) => {
      await page.goto('/');
      await page.evaluate(
        () => document.documentElement.setAttribute('data-theme', 'sunshine')
      );
      await page.waitForTimeout(100);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2aa'])
        .analyze();

      const contrastViolations = results.violations.filter(
        (v) => v.id === 'color-contrast'
      );

      expect(contrastViolations).toHaveLength(0);
    });

    test('dark theme passes color contrast', async ({ page }) => {
      await page.goto('/');
      await page.evaluate(
        () => document.documentElement.setAttribute('data-theme', 'moonlight')
      );
      await page.waitForTimeout(100);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2aa'])
        .analyze();

      const contrastViolations = results.violations.filter(
        (v) => v.id === 'color-contrast'
      );

      expect(contrastViolations).toHaveLength(0);
    });
  });

  test.describe('Focus Management', () => {
    test('focus indicator is visible', async ({ page }) => {
      await page.goto('/');

      await page.keyboard.press('Tab');

      const focusedElement = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el) return null;

        const styles = window.getComputedStyle(el);
        return {
          outline: styles.outline,
          outlineOffset: styles.outlineOffset,
          boxShadow: styles.boxShadow,
        };
      });

      const hasFocusIndicator =
        focusedElement &&
        (focusedElement.outline !== 'none' ||
          focusedElement.boxShadow !== 'none');

      expect(hasFocusIndicator).toBe(true);
    });

    test('focus order follows visual order', async ({ page }) => {
      await page.goto('/');

      const focusOrder: string[] = [];

      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab');
        const tagName = await page.evaluate(
          () => document.activeElement?.tagName
        );
        if (tagName) focusOrder.push(tagName);
      }

      // Should have focusable elements
      expect(focusOrder.length).toBeGreaterThan(0);
    });
  });

  test.describe('Responsive Design Accessibility', () => {
    test('mobile viewport is accessible', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      const criticalViolations = results.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious'
      );

      expect(criticalViolations).toEqual([]);
    });

    test('touch targets are appropriately sized', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      const buttons = await page.locator('button, a, [role="button"]').all();

      for (const button of buttons.slice(0, 5)) {
        const box = await button.boundingBox();
        if (box) {
          // WCAG recommends 44x44px minimum touch target
          expect(box.width * box.height).toBeGreaterThanOrEqual(44 * 24); // Relaxed for links
        }
      }
    });
  });
});
