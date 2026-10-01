/** Native dialog accessibility and keyboard behavior for Modal. */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function createModal(page: import('@playwright/test').Page) {
  await page.evaluate(() => {
    const container = document.createElement('div');
    container.id = 'test-container';
    container.innerHTML = `
      <button id="trigger-btn" commandfor="test-modal" command="show-modal">Open modal</button>
      <button id="background-btn">Background action</button>
      <dialog id="test-modal" class="modal" aria-labelledby="modal-title" aria-describedby="modal-desc">
        <div class="modal-box">
          <h2 id="modal-title" class="modal-title">Review changes</h2>
          <p id="modal-desc" class="modal-body">Your changes are ready to save.</p>
          <form method="dialog">
            <label for="modal-input">Name</label>
            <input id="modal-input" class="input" autofocus />
            <div class="modal-action">
              <button class="btn" value="cancel">Cancel</button>
              <button class="btn btn-primary" value="save">Save</button>
            </div>
          </form>
          <button class="modal-close" commandfor="test-modal" command="close" aria-label="Close modal">×</button>
        </div>
      </dialog>`;
    document.body.appendChild(container);
  });
}

test.describe('Modal Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/fixtures/test-fixture.html');
    await createModal(page);
  });

  test('closed modal is hidden and absent from the accessibility tree', async ({ page }) => {
    await expect(page.locator('#test-modal')).toBeHidden();
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });

  test('native commands open a named modal and move focus inside', async ({ page }) => {
    await page.locator('#trigger-btn').click();
    await expect(page.getByRole('dialog', { name: 'Review changes' })).toBeVisible();
    await expect(page.locator('#modal-input')).toBeFocused();
    expect(await page.locator('#test-modal').evaluate(el => el.matches(':modal'))).toBe(true);
  });

  test('open modal passes axe audit including color contrast', async ({ page }) => {
    await page.locator('#trigger-btn').click();
    const results = await new AxeBuilder({ page })
      .include('#test-modal')
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('native modal prevents background focus and contains keyboard navigation', async ({ page }) => {
    await page.locator('#trigger-btn').click();
    await page.locator('#background-btn').evaluate(el => (el as HTMLElement).focus());
    await expect(page.locator('#modal-input')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Cancel', exact: true })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Save', exact: true })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Close modal', exact: true })).toBeFocused();
    for (let index = 0; index < 6; index++) {
      await page.keyboard.press('Tab');
      await expect(page.locator('#background-btn')).not.toBeFocused();
      await expect(page.locator('#trigger-btn')).not.toBeFocused();
    }
  });

  test('Escape dismisses and restores trigger focus without a custom handler', async ({ page }) => {
    await page.locator('#trigger-btn').click();
    await page.keyboard.press('Escape');
    await expect(page.locator('#test-modal')).toBeHidden();
    await expect(page.locator('#trigger-btn')).toBeFocused();
  });

  test('dialog form closes with a native return value and restores focus', async ({ page }) => {
    await page.locator('#trigger-btn').click();
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await expect(page.locator('#test-modal')).toBeHidden();
    expect(await page.locator('#test-modal').evaluate(el => (el as HTMLDialogElement).returnValue)).toBe('save');
    await expect(page.locator('#trigger-btn')).toBeFocused();
  });

  test('accessible close command closes without application focus management', async ({ page }) => {
    await page.locator('#trigger-btn').click();
    await page.getByRole('button', { name: 'Close modal', exact: true }).click();
    await expect(page.locator('#test-modal')).toBeHidden();
    await expect(page.locator('#trigger-btn')).toBeFocused();
  });

  test('alert confirmation retains native dialog semantics', async ({ page }) => {
    await page.locator('#test-modal').evaluate(el => {
      el.classList.add('alert-dialog');
      el.setAttribute('role', 'alertdialog');
    });
    await page.locator('#trigger-btn').click();
    await expect(page.getByRole('alertdialog', { name: 'Review changes' })).toBeVisible();
    expect(await page.locator('#test-modal').evaluate(el => el.matches(':modal'))).toBe(true);
  });

  test('modal respects reduced motion for panel and native backdrop', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.locator('#trigger-btn').click();
    const durations = await page.locator('#test-modal').evaluate(el => [
      getComputedStyle(el).transitionDuration,
      getComputedStyle(el, '::backdrop').transitionDuration,
      getComputedStyle(el.querySelector('.modal-box')!).transitionDuration,
    ]);
    // Core's global reduced-motion rule uses 0.01ms to preserve transition events.
    for (const duration of durations) {
      expect(parseFloat(duration)).toBeLessThanOrEqual(0.00001);
    }
  });
});
