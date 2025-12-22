/**
 * Integration tests for Card composition
 * Tests cards with nested components and complex layouts
 */

import { test, expect } from '@playwright/test';

test.describe('Card Composition', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/fixtures/test-fixture.html');
  });

  test.describe('Card with Button Actions', () => {
    test('buttons inside card are interactive', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <div class="card w-96">
            <div class="card-body">
              <h2 class="card-title">Card Title</h2>
              <p>Card content</p>
              <div class="card-actions justify-end">
                <button id="action-btn" class="btn btn-primary">Action</button>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      const button = page.locator('#action-btn');

      let clicked = false;
      await page.exposeFunction('onActionClick', () => {
        clicked = true;
      });

      await button.evaluate((el) => {
        el.addEventListener('click', () => (window as any).onActionClick());
      });

      await button.click();
      expect(clicked).toBe(true);
    });

    test('multiple buttons in card-actions have correct spacing', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <div class="card w-96">
            <div class="card-body">
              <h2 class="card-title">Card Title</h2>
              <div class="card-actions" id="actions">
                <button class="btn btn-ghost">Cancel</button>
                <button class="btn btn-primary">Submit</button>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      const actionsContainer = page.locator('#actions');

      const gap = await actionsContainer.evaluate((el) =>
        window.getComputedStyle(el).gap
      );

      // Should have gap between buttons
      expect(gap).not.toBe('normal');
      expect(gap).not.toBe('0px');
    });
  });

  test.describe('Card with Form Elements', () => {
    test('form elements inside card work correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <div class="card w-96">
            <div class="card-body">
              <h2 class="card-title">Login</h2>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Email</span>
                </label>
                <input id="email-input" type="email" class="input input-bordered" />
              </div>
              <div class="card-actions">
                <button id="submit-btn" class="btn btn-primary btn-block">Login</button>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      const input = page.locator('#email-input');
      await input.fill('test@example.com');

      const value = await input.inputValue();
      expect(value).toBe('test@example.com');
    });

    test('card with checkbox list', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <div class="card w-96">
            <div class="card-body">
              <h2 class="card-title">Options</h2>
              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">Option 1</span>
                  <input type="checkbox" class="checkbox" id="opt1" />
                </label>
                <label class="label cursor-pointer">
                  <span class="label-text">Option 2</span>
                  <input type="checkbox" class="checkbox" id="opt2" />
                </label>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      await page.locator('#opt1').check();
      await page.locator('#opt2').check();

      expect(await page.locator('#opt1').isChecked()).toBe(true);
      expect(await page.locator('#opt2').isChecked()).toBe(true);
    });
  });

  test.describe('Card with Image', () => {
    test('image in card figure is properly contained', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <div class="card w-96">
            <figure id="card-figure">
              <div id="placeholder-img" style="width: 100%; height: 200px; background: linear-gradient(135deg, purple, blue);"></div>
            </figure>
            <div class="card-body">
              <h2 class="card-title">Card with Image</h2>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      const figure = page.locator('#card-figure');

      const overflow = await figure.evaluate((el) =>
        window.getComputedStyle(el).overflow
      );

      expect(overflow).toBe('hidden');
    });
  });

  test.describe('Card Variants with Content', () => {
    test('bordered card maintains border with content', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <div class="card card-bordered w-96" id="bordered-card">
            <div class="card-body">
              <h2 class="card-title">Bordered Card</h2>
              <p>Content inside bordered card.</p>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      const card = page.locator('#bordered-card');

      const borderWidth = await card.evaluate((el) =>
        window.getComputedStyle(el).borderWidth
      );

      expect(borderWidth).not.toBe('0px');
    });

    test('compact card has reduced padding', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'p-8 bg-base-100 flex gap-4';
        container.innerHTML = `
          <div class="card w-64">
            <div class="card-body" id="normal-body">
              <h2 class="card-title">Normal</h2>
            </div>
          </div>
          <div class="card card-compact w-64">
            <div class="card-body" id="compact-body">
              <h2 class="card-title">Compact</h2>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      const normalPadding = await page.locator('#normal-body').evaluate((el) =>
        window.getComputedStyle(el).padding
      );

      const compactPadding = await page.locator('#compact-body').evaluate((el) =>
        window.getComputedStyle(el).padding
      );

      // Compact should have less padding
      const normalPaddingValue = parseInt(normalPadding);
      const compactPaddingValue = parseInt(compactPadding);

      expect(compactPaddingValue).toBeLessThan(normalPaddingValue);
    });
  });

  test.describe('Interactive Card', () => {
    test('hoverable card receives cursor pointer', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <div class="card card-interactive w-96" id="interactive-card">
            <div class="card-body">
              <h2 class="card-title">Clickable Card</h2>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      const card = page.locator('#interactive-card');

      const cursor = await card.evaluate((el) =>
        window.getComputedStyle(el).cursor
      );

      expect(cursor).toBe('pointer');
    });

    test('interactive card can be focused', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'test-container';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <div class="card card-interactive w-96" id="interactive-card" tabindex="0">
            <div class="card-body">
              <h2 class="card-title">Focusable Card</h2>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      const card = page.locator('#interactive-card');
      await card.focus();

      const hasFocus = await card.evaluate((el) =>
        document.activeElement === el
      );

      expect(hasFocus).toBe(true);
    });
  });
});
