/**
 * Visual regression tests for Modal component
 * Tests modal, dialog, and drawer variants
 */

import { test, expect } from '@playwright/test';

test.describe('Visual Regression - Modal Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test-fixture.html');
  });

  test.describe('Modal - Sunshine Theme', () => {
    test.beforeEach(async ({ page }) => {
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'sunshine');
      });
    });

    test('basic modal renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'modal-test';
        container.className = 'relative h-96 bg-base-200';
        container.innerHTML = `
          <div class="modal modal-open">
            <div class="modal-backdrop"></div>
            <div class="modal-box">
              <h3 class="modal-title">Modal Title</h3>
              <div class="modal-body">
                <p>This is the modal content. It can contain any content you want.</p>
              </div>
              <div class="modal-action">
                <button class="btn btn-ghost">Cancel</button>
                <button class="btn btn-primary">Confirm</button>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      const modal = page.locator('#modal-test');
      await expect(modal).toHaveScreenshot('sunshine-modal-basic.png');
    });

    test('modal sizes render correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'modal-test';
        container.className = 'relative h-96 bg-base-200';
        container.innerHTML = `
          <div class="modal modal-sm modal-open">
            <div class="modal-backdrop"></div>
            <div class="modal-box">
              <h3 class="modal-title">Small Modal</h3>
              <div class="modal-body">
                <p>This is a small modal with limited width.</p>
              </div>
              <div class="modal-action">
                <button class="btn btn-primary btn-sm">OK</button>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      const modal = page.locator('#modal-test');
      await expect(modal).toHaveScreenshot('sunshine-modal-small.png');
    });

    test('modal with close button renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'modal-test';
        container.className = 'relative h-96 bg-base-200';
        container.innerHTML = `
          <div class="modal modal-open">
            <div class="modal-backdrop"></div>
            <div class="modal-box">
              <button class="modal-close">×</button>
              <h3 class="modal-title">Closable Modal</h3>
              <div class="modal-body">
                <p>Click the X button to close this modal.</p>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      const modal = page.locator('#modal-test');
      await expect(modal).toHaveScreenshot('sunshine-modal-closable.png');
    });

    test('alert dialog renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'modal-test';
        container.className = 'relative h-96 bg-base-200';
        container.innerHTML = `
          <div class="modal modal-open alert-dialog">
            <div class="modal-backdrop"></div>
            <div class="modal-box">
              <div class="modal-icon warning">⚠️</div>
              <h3 class="modal-title">Warning</h3>
              <div class="modal-body">
                <p>Are you sure you want to delete this item? This action cannot be undone.</p>
              </div>
              <div class="modal-action">
                <button class="btn btn-ghost">Cancel</button>
                <button class="btn btn-error">Delete</button>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      const modal = page.locator('#modal-test');
      await expect(modal).toHaveScreenshot('sunshine-alert-dialog.png');
    });

    test('modal positions render correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'modal-test';
        container.className = 'relative h-96 bg-base-200';
        container.innerHTML = `
          <div class="modal modal-open modal-top">
            <div class="modal-backdrop"></div>
            <div class="modal-box">
              <h3 class="modal-title">Top Positioned</h3>
              <div class="modal-body">
                <p>This modal appears at the top of the screen.</p>
              </div>
              <div class="modal-action">
                <button class="btn">Close</button>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      const modal = page.locator('#modal-test');
      await expect(modal).toHaveScreenshot('sunshine-modal-top.png');
    });

    test('large modal renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'modal-test';
        container.className = 'relative h-[600px] bg-base-200';
        container.innerHTML = `
          <div class="modal modal-lg modal-open">
            <div class="modal-backdrop"></div>
            <div class="modal-box">
              <h3 class="modal-title">Large Modal</h3>
              <div class="modal-body">
                <p>This is a large modal that can contain more content.</p>
                <p>It has a wider max-width than the default modal.</p>
                <br>
                <p>You can use large modals for:</p>
                <ul style="list-style: disc; padding-left: 1.5rem;">
                  <li>Complex forms</li>
                  <li>Data tables</li>
                  <li>Multi-step wizards</li>
                  <li>Rich media content</li>
                </ul>
              </div>
              <div class="modal-action">
                <button class="btn btn-ghost">Cancel</button>
                <button class="btn btn-primary">Save Changes</button>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      const modal = page.locator('#modal-test');
      await expect(modal).toHaveScreenshot('sunshine-modal-large.png');
    });
  });

  test.describe('Modal - Moonlight Theme', () => {
    test.beforeEach(async ({ page }) => {
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'moonlight');
      });
    });

    test('modal in dark theme renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'modal-test';
        container.className = 'relative h-96 bg-base-200';
        container.innerHTML = `
          <div class="modal modal-open">
            <div class="modal-backdrop"></div>
            <div class="modal-box">
              <h3 class="modal-title">Dark Theme Modal</h3>
              <div class="modal-body">
                <p>This modal is displayed in the moonlight (dark) theme.</p>
              </div>
              <div class="modal-action">
                <button class="btn btn-ghost">Cancel</button>
                <button class="btn btn-primary">Confirm</button>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      const modal = page.locator('#modal-test');
      await expect(modal).toHaveScreenshot('moonlight-modal.png');
    });

    test('alert dialogs in dark theme', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'modal-test';
        container.className = 'relative h-96 bg-base-200';
        container.innerHTML = `
          <div class="modal modal-open alert-dialog">
            <div class="modal-backdrop"></div>
            <div class="modal-box">
              <div class="modal-icon error">❌</div>
              <h3 class="modal-title">Error</h3>
              <div class="modal-body">
                <p>Something went wrong. Please try again.</p>
              </div>
              <div class="modal-action">
                <button class="btn btn-error">Try Again</button>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      const modal = page.locator('#modal-test');
      await expect(modal).toHaveScreenshot('moonlight-alert-error.png');
    });
  });
});
