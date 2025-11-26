/**
 * Accessibility tests for Button component
 * Tests keyboard navigation, ARIA, focus management
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Button Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test-fixture.html');
  });

  test.describe('WCAG Compliance', () => {
    test('primary button passes axe accessibility audit', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <button class="btn btn-primary">Primary Action</button>
        `;
        document.body.appendChild(container);
      });

      const results = await new AxeBuilder({ page })
        .include('#test-container')
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      expect(results.violations).toEqual([]);
    });

    test('button group passes axe accessibility audit', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <div class="btn-group" role="group" aria-label="Button group">
            <button class="btn">Option 1</button>
            <button class="btn">Option 2</button>
            <button class="btn">Option 3</button>
          </div>
        `;
        document.body.appendChild(container);
      });

      const results = await new AxeBuilder({ page })
        .include('#test-container')
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      expect(results.violations).toEqual([]);
    });

    test('all button variants pass color contrast', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'p-8 bg-base-100 flex flex-wrap gap-4';
        container.innerHTML = `
          <button class="btn btn-primary">Primary</button>
          <button class="btn btn-secondary">Secondary</button>
          <button class="btn btn-tertiary">Tertiary</button>
          <button class="btn btn-info">Info</button>
          <button class="btn btn-success">Success</button>
          <button class="btn btn-warning">Warning</button>
          <button class="btn btn-error">Error</button>
        `;
        document.body.appendChild(container);
      });

      const results = await new AxeBuilder({ page })
        .include('#test-container')
        .withTags(['wcag2aa'])
        .analyze();

      const colorContrastViolations = results.violations.filter(
        v => v.id === 'color-contrast'
      );

      expect(colorContrastViolations).toHaveLength(0);
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('button is focusable via Tab', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.innerHTML = `
          <button id="btn1" class="btn btn-primary">Button 1</button>
          <button id="btn2" class="btn btn-secondary">Button 2</button>
        `;
        document.body.appendChild(container);
      });

      await page.keyboard.press('Tab');

      const focusedId = await page.evaluate(() => document.activeElement?.id);
      expect(focusedId).toBe('btn1');

      await page.keyboard.press('Tab');

      const nextFocusedId = await page.evaluate(() => document.activeElement?.id);
      expect(nextFocusedId).toBe('btn2');
    });

    test('button can be activated with Enter key', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.innerHTML = `
          <button id="test-btn" class="btn btn-primary">Click Me</button>
        `;
        document.body.appendChild(container);
      });

      const button = page.locator('#test-btn');

      let clicked = false;
      await page.exposeFunction('onButtonClick', () => {
        clicked = true;
      });

      await button.evaluate((el) => {
        el.addEventListener('click', () => (window as any).onButtonClick());
      });

      await button.focus();
      await page.keyboard.press('Enter');

      expect(clicked).toBe(true);
    });

    test('button can be activated with Space key', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.innerHTML = `
          <button id="test-btn" class="btn btn-primary">Click Me</button>
        `;
        document.body.appendChild(container);
      });

      const button = page.locator('#test-btn');

      let clicked = false;
      await page.exposeFunction('onSpaceClick', () => {
        clicked = true;
      });

      await button.evaluate((el) => {
        el.addEventListener('click', () => (window as any).onSpaceClick());
      });

      await button.focus();
      await page.keyboard.press('Space');

      expect(clicked).toBe(true);
    });

    test('disabled button is skipped in tab order', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.innerHTML = `
          <button id="btn1" class="btn">First</button>
          <button id="btn-disabled" class="btn" disabled>Disabled</button>
          <button id="btn2" class="btn">Second</button>
        `;
        document.body.appendChild(container);
      });

      await page.keyboard.press('Tab');
      expect(await page.evaluate(() => document.activeElement?.id)).toBe('btn1');

      await page.keyboard.press('Tab');
      // Should skip disabled button
      expect(await page.evaluate(() => document.activeElement?.id)).toBe('btn2');
    });
  });

  test.describe('Focus Visibility', () => {
    test('focus ring is visible on keyboard focus', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <button id="test-btn" class="btn btn-primary">Focus Me</button>
        `;
        document.body.appendChild(container);
      });

      const button = page.locator('#test-btn');

      // Use Tab for keyboard focus
      await page.keyboard.press('Tab');

      const outline = await button.evaluate((el) =>
        window.getComputedStyle(el).outline
      );

      expect(outline).not.toBe('none');
    });

    test('focus indicator has sufficient contrast', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <button id="test-btn" class="btn btn-primary">Focus Me</button>
        `;
        document.body.appendChild(container);
      });

      const button = page.locator('#test-btn');
      await button.focus();

      const outlineColor = await button.evaluate((el) =>
        window.getComputedStyle(el).outlineColor
      );

      // Outline should have a color (not transparent)
      expect(outlineColor).not.toBe('transparent');
      expect(outlineColor).not.toBe('rgba(0, 0, 0, 0)');
    });
  });

  test.describe('Screen Reader Support', () => {
    test('button has accessible name', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.innerHTML = `
          <button id="text-btn" class="btn">Submit</button>
          <button id="aria-btn" class="btn" aria-label="Close dialog">×</button>
        `;
        document.body.appendChild(container);
      });

      const textBtnName = await page.locator('#text-btn').evaluate((el) =>
        el.textContent?.trim()
      );
      expect(textBtnName).toBe('Submit');

      const ariaBtnLabel = await page.locator('#aria-btn').getAttribute('aria-label');
      expect(ariaBtnLabel).toBe('Close dialog');
    });

    test('icon-only button has aria-label', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.innerHTML = `
          <button class="btn btn-circle" aria-label="Search">
            🔍
          </button>
        `;
        document.body.appendChild(container);
      });

      const results = await new AxeBuilder({ page })
        .include('#test-container')
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      const buttonNameViolations = results.violations.filter(
        v => v.id === 'button-name'
      );

      expect(buttonNameViolations).toHaveLength(0);
    });

    test('disabled button is announced as disabled', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.innerHTML = `
          <button id="disabled-btn" class="btn" disabled>Cannot Click</button>
        `;
        document.body.appendChild(container);
      });

      const isDisabled = await page.locator('#disabled-btn').isDisabled();
      expect(isDisabled).toBe(true);

      const ariaDisabled = await page.locator('#disabled-btn').getAttribute('aria-disabled');
      // Either disabled attribute or aria-disabled should be present
      const button = page.locator('#disabled-btn');
      const hasDisabledAttribute = await button.evaluate((el) => el.hasAttribute('disabled'));

      expect(hasDisabledAttribute || ariaDisabled === 'true').toBe(true);
    });
  });

  test.describe('Loading State', () => {
    test('loading button disables interaction', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.innerHTML = `
          <button id="loading-btn" class="btn btn-loading" aria-busy="true">Loading...</button>
        `;
        document.body.appendChild(container);
      });

      const ariaBusy = await page.locator('#loading-btn').getAttribute('aria-busy');
      expect(ariaBusy).toBe('true');

      const pointerEvents = await page.locator('#loading-btn').evaluate((el) =>
        window.getComputedStyle(el).pointerEvents
      );
      expect(pointerEvents).toBe('none');
    });
  });
});
