/**
 * Visual regression tests for Card component
 * Tests all card variants across themes
 */

import { test, expect } from '@playwright/test';

test.describe('Visual Regression - Card Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test-fixture.html');
  });

  test.describe('Card Variants - Sunshine Theme', () => {
    test.beforeEach(async ({ page }) => {
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'sunshine');
      });
    });

    test('basic card renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'card-test';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <div class="card w-96">
            <div class="card-body">
              <h2 class="card-title">Card Title</h2>
              <p>This is some card content that demonstrates the basic card layout.</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Action</button>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      const card = page.locator('#card-test');
      await expect(card).toHaveScreenshot('sunshine-card-basic.png');
    });

    test('bordered card renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'card-test';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <div class="card card-bordered w-96">
            <div class="card-body">
              <h2 class="card-title">Bordered Card</h2>
              <p>This card has a border instead of shadow.</p>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      const card = page.locator('#card-test');
      await expect(card).toHaveScreenshot('sunshine-card-bordered.png');
    });

    test('compact card renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'card-test';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <div class="card card-compact w-96">
            <div class="card-body">
              <h2 class="card-title">Compact Card</h2>
              <p>This card has reduced padding.</p>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      const card = page.locator('#card-test');
      await expect(card).toHaveScreenshot('sunshine-card-compact.png');
    });

    test('color variant cards render correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'card-test';
        container.className = 'p-8 bg-base-100 flex gap-4';
        container.innerHTML = `
          <div class="card card-primary w-64">
            <div class="card-body">
              <h2 class="card-title">Primary Card</h2>
              <p>Primary container colors.</p>
            </div>
          </div>
          <div class="card card-secondary w-64">
            <div class="card-body">
              <h2 class="card-title">Secondary Card</h2>
              <p>Secondary container colors.</p>
            </div>
          </div>
          <div class="card card-tertiary w-64">
            <div class="card-body">
              <h2 class="card-title">Tertiary Card</h2>
              <p>Tertiary container colors.</p>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      const card = page.locator('#card-test');
      await expect(card).toHaveScreenshot('sunshine-card-colors.png');
    });

    test('card with image renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'card-test';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <div class="card w-96">
            <figure>
              <div style="width: 100%; height: 200px; background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));"></div>
            </figure>
            <div class="card-body">
              <h2 class="card-title">Card with Image</h2>
              <p>A card featuring an image at the top.</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">View</button>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      const card = page.locator('#card-test');
      await expect(card).toHaveScreenshot('sunshine-card-image.png');
    });

    test('elevated card renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'card-test';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <div class="card card-elevated w-96">
            <div class="card-body">
              <h2 class="card-title">Elevated Card</h2>
              <p>This card has higher elevation shadow.</p>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      const card = page.locator('#card-test');
      await expect(card).toHaveScreenshot('sunshine-card-elevated.png');
    });
  });

  test.describe('Card Variants - Moonlight Theme', () => {
    test.beforeEach(async ({ page }) => {
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'moonlight');
      });
    });

    test('all card variants in dark theme', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'card-test';
        container.className = 'p-8 bg-base-100 flex flex-wrap gap-4';
        container.innerHTML = `
          <div class="card w-64">
            <div class="card-body">
              <h2 class="card-title">Default Card</h2>
              <p>Basic card in dark theme.</p>
            </div>
          </div>
          <div class="card card-bordered w-64">
            <div class="card-body">
              <h2 class="card-title">Bordered</h2>
              <p>With border.</p>
            </div>
          </div>
          <div class="card card-primary w-64">
            <div class="card-body">
              <h2 class="card-title">Primary</h2>
              <p>Primary colors.</p>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      const card = page.locator('#card-test');
      await expect(card).toHaveScreenshot('moonlight-card-all.png');
    });
  });

  test.describe('Card Interactions', () => {
    test('hoverable card shows elevation change', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'card-test';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <div class="card card-elevated card-interactive w-96" id="hover-card">
            <div class="card-body">
              <h2 class="card-title">Hover Card</h2>
              <p>Hover to see elevation change.</p>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      const card = page.locator('#hover-card');
      await card.hover();
      await expect(page.locator('#card-test')).toHaveScreenshot('card-hover-state.png');
    });
  });
});
