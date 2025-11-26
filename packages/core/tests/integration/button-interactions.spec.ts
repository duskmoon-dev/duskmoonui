/**
 * Integration tests for Button interactions
 * Tests hover, focus, active, and disabled states
 */

import { test, expect } from '@playwright/test';

test.describe('Button Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test-fixture.html');
    await page.evaluate(() => {
      const container = document.createElement('div');
      container.id = 'test-container';
      container.className = 'p-8 bg-base-100';
      container.innerHTML = `
        <button id="primary-btn" class="btn btn-primary">Primary</button>
        <button id="secondary-btn" class="btn btn-secondary">Secondary</button>
        <button id="outline-btn" class="btn btn-outline btn-primary">Outline</button>
        <button id="ghost-btn" class="btn btn-ghost">Ghost</button>
        <button id="disabled-btn" class="btn btn-primary" disabled>Disabled</button>
      `;
      document.body.appendChild(container);
    });
  });

  test.describe('Hover State', () => {
    test('primary button changes appearance on hover', async ({ page }) => {
      const button = page.locator('#primary-btn');

      const initialBg = await button.evaluate((el) =>
        window.getComputedStyle(el).backgroundColor
      );

      await button.hover();

      const hoverBg = await button.evaluate((el) =>
        window.getComputedStyle(el).backgroundColor
      );

      // Background should change on hover (focus variant)
      expect(hoverBg).not.toBe(initialBg);
    });

    test('outline button fills on hover', async ({ page }) => {
      const button = page.locator('#outline-btn');

      const initialBg = await button.evaluate((el) =>
        window.getComputedStyle(el).backgroundColor
      );

      await button.hover();

      const hoverBg = await button.evaluate((el) =>
        window.getComputedStyle(el).backgroundColor
      );

      // Outline button should fill with color on hover
      expect(hoverBg).not.toBe(initialBg);
    });

    test('ghost button shows background on hover', async ({ page }) => {
      const button = page.locator('#ghost-btn');

      await button.hover();

      const hoverBg = await button.evaluate((el) =>
        window.getComputedStyle(el).backgroundColor
      );

      // Ghost button should show some background on hover
      expect(hoverBg).not.toBe('rgba(0, 0, 0, 0)');
    });
  });

  test.describe('Focus State', () => {
    test('button shows focus ring on keyboard focus', async ({ page }) => {
      const button = page.locator('#primary-btn');

      // Use Tab to focus for keyboard navigation
      await page.keyboard.press('Tab');

      const outline = await button.evaluate((el) =>
        window.getComputedStyle(el).outline
      );

      // Should have visible outline
      expect(outline).not.toBe('none');
    });

    test('focus ring is visible', async ({ page }) => {
      const button = page.locator('#primary-btn');
      await button.focus();

      const outlineWidth = await button.evaluate((el) =>
        window.getComputedStyle(el).outlineWidth
      );

      // Should have outline width
      expect(outlineWidth).not.toBe('0px');
    });

    test('focus state is distinguishable from default', async ({ page }) => {
      const button = page.locator('#secondary-btn');

      const defaultStyles = await button.evaluate((el) => ({
        outline: window.getComputedStyle(el).outline,
        boxShadow: window.getComputedStyle(el).boxShadow,
      }));

      await button.focus();

      const focusStyles = await button.evaluate((el) => ({
        outline: window.getComputedStyle(el).outline,
        boxShadow: window.getComputedStyle(el).boxShadow,
      }));

      // At least one style should change
      const hasVisualChange =
        defaultStyles.outline !== focusStyles.outline ||
        defaultStyles.boxShadow !== focusStyles.boxShadow;

      expect(hasVisualChange).toBe(true);
    });
  });

  test.describe('Active State', () => {
    test('button shows active state on click', async ({ page }) => {
      const button = page.locator('#primary-btn');

      // Use mouse down to capture active state
      await button.evaluate((el) => {
        el.addEventListener('mousedown', () => {
          (el as HTMLElement).dataset.wasActive = 'true';
        });
      });

      await button.click();

      const wasActive = await button.evaluate((el) =>
        (el as HTMLElement).dataset.wasActive
      );

      expect(wasActive).toBe('true');
    });

    test('button can receive click events', async ({ page }) => {
      const button = page.locator('#primary-btn');

      let clicked = false;
      await page.exposeFunction('onButtonClick', () => {
        clicked = true;
      });

      await button.evaluate((el) => {
        el.addEventListener('click', () => (window as any).onButtonClick());
      });

      await button.click();

      expect(clicked).toBe(true);
    });
  });

  test.describe('Disabled State', () => {
    test('disabled button has reduced opacity', async ({ page }) => {
      const button = page.locator('#disabled-btn');

      const opacity = await button.evaluate((el) =>
        window.getComputedStyle(el).opacity
      );

      expect(parseFloat(opacity)).toBeLessThan(1);
    });

    test('disabled button has not-allowed cursor', async ({ page }) => {
      const button = page.locator('#disabled-btn');

      const cursor = await button.evaluate((el) =>
        window.getComputedStyle(el).cursor
      );

      expect(cursor).toBe('not-allowed');
    });

    test('disabled button cannot be clicked', async ({ page }) => {
      const button = page.locator('#disabled-btn');

      let clicked = false;
      await page.exposeFunction('onDisabledClick', () => {
        clicked = true;
      });

      await button.evaluate((el) => {
        el.addEventListener('click', () => (window as any).onDisabledClick());
      });

      await button.click({ force: true }); // Force click on disabled button

      expect(clicked).toBe(false);
    });

    test('disabled button cannot receive focus via tab', async ({ page }) => {
      // Focus an enabled button first
      await page.locator('#primary-btn').focus();

      // Tab through
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      // Check if disabled button is focused
      const activeId = await page.evaluate(() => document.activeElement?.id);

      expect(activeId).not.toBe('disabled-btn');
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('buttons are focusable via Tab', async ({ page }) => {
      await page.keyboard.press('Tab');

      const activeElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(activeElement).toBe('BUTTON');
    });

    test('buttons can be activated with Enter', async ({ page }) => {
      const button = page.locator('#primary-btn');

      let activated = false;
      await page.exposeFunction('onActivate', () => {
        activated = true;
      });

      await button.evaluate((el) => {
        el.addEventListener('click', () => (window as any).onActivate());
      });

      await button.focus();
      await page.keyboard.press('Enter');

      expect(activated).toBe(true);
    });

    test('buttons can be activated with Space', async ({ page }) => {
      const button = page.locator('#primary-btn');

      let activated = false;
      await page.exposeFunction('onActivateSpace', () => {
        activated = true;
      });

      await button.evaluate((el) => {
        el.addEventListener('click', () => (window as any).onActivateSpace());
      });

      await button.focus();
      await page.keyboard.press('Space');

      expect(activated).toBe(true);
    });
  });
});
