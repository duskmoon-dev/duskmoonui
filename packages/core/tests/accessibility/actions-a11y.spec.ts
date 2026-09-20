import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Actions accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/fixtures/test-fixture.html');
  });

  test('FAB, Swap, Dropdown, and Theme Controller expose stable names', async ({ page }) => {
    await page.evaluate(() => {
      document.body.innerHTML = `
        <main id="actions-test">
          <div class="fab fab-contained fab-speed-dial fab-controlled">
            <button class="btn fab-trigger" aria-expanded="false" aria-controls="accessible-actions" aria-label="Create item">+</button>
            <div class="fab-actions" id="accessible-actions">
              <button class="btn fab-action" aria-label="Create photo"><span aria-hidden="true">P</span></button>
            </div>
          </div>
          <label class="swap">
            <input class="swap-input" type="checkbox" aria-label="Mute notifications">
            <span class="swap-off" aria-hidden="true">Sound on</span><span class="swap-on" aria-hidden="true">Muted</span>
          </label>
          <button class="swap" aria-pressed="false" aria-label="Toggle navigation">
            <span class="swap-off" aria-hidden="true">Menu</span><span class="swap-on" aria-hidden="true">Close</span>
          </button>
          <div class="dropdown dropdown-block-end">
            <button type="button" popovertarget="accessible-dropdown">Filter results</button>
            <div class="dropdown-content" id="accessible-dropdown" popover="auto"><label>Query <input type="search"></label></div>
          </div>
          <fieldset class="theme-controller"><legend>Theme preference</legend>
            <input class="theme-controller-item" id="a11y-system" type="radio" name="a11y-theme" checked>
            <label class="theme-controller-label" for="a11y-system">System</label>
            <input class="theme-controller-item" id="a11y-light" type="radio" name="a11y-theme">
            <label class="theme-controller-label" for="a11y-light">Light</label>
          </fieldset>
        </main>`;
    });

    await expect(page.getByRole('button', { name: 'Create item' })).toHaveAttribute('aria-expanded', 'false');
    await expect(page.getByRole('checkbox', { name: 'Mute notifications' })).toHaveAccessibleName('Mute notifications');
    await expect(page.getByRole('button', { name: 'Toggle navigation' })).toHaveAccessibleName('Toggle navigation');
    await expect(page.getByRole('group', { name: 'Theme preference' })).toBeVisible();

    const results = await new AxeBuilder({ page })
      .include('#actions-test')
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });

});
