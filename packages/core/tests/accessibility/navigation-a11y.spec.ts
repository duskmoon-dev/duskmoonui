import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

for (const theme of ['sunshine', 'moonlight']) {
  test(`navigation primitives expose accessible semantics in ${theme}`, async ({ page }) => {
    await page.setContent(`<!doctype html><html lang="en"><head>
      <title>Navigation accessibility fixture</title>
      <link rel="stylesheet" href="/dist/index.css"></head><body>
      <main data-theme="${theme}" style="padding:2rem;background:var(--color-surface);color:var(--color-on-surface)">
        <a class="link" href="#destination">Destination</a>
        <section aria-labelledby="tabs-heading">
          <h1 id="tabs-heading">Account</h1>
          <div class="tabs" role="tablist" aria-label="Account sections">
            <button class="tab" role="tab" id="profile-tab" aria-controls="profile-panel" aria-selected="true">Profile</button>
            <button class="tab" role="tab" id="security-tab" aria-controls="security-panel" aria-selected="false" tabindex="-1">Security</button>
          </div>
          <section class="tab-panel tab-panel-show" role="tabpanel" id="profile-panel" aria-labelledby="profile-tab">Profile content</section>
          <section class="tab-panel" role="tabpanel" id="security-panel" aria-labelledby="security-tab" hidden>Security content</section>
        </section>
        <nav class="megamenu" aria-label="Product navigation" style="--megamenu-anchor:--a11y-mega">
          <button class="megamenu-trigger" id="mega-trigger" popovertarget="mega-panel">Products</button>
          <div class="megamenu-panel" id="mega-panel" popover="auto" aria-labelledby="mega-heading" style="--megamenu-anchor:--a11y-mega">
            <h2 class="megamenu-heading" id="mega-heading">Products</h2>
            <ul class="menu menu-vertical"><li><a class="link" href="#components">Components</a></li></ul>
          </div>
        </nav>
      </main></body></html>`);
    await page.locator('#mega-trigger').click();
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}
