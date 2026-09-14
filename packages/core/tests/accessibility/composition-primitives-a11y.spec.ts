import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const theme of ['sunshine', 'moonlight']) {
  test(`composition primitives preserve semantic accessible markup in ${theme}`, async ({ page }) => {
    await page.goto('/tests/fixtures/test-fixture.html');
    await page.evaluate((activeTheme) => {
      document.documentElement.setAttribute('data-theme', activeTheme);
      document.body.innerHTML = `
        <main>
          <section class="hero" aria-labelledby="composition-title"><div class="hero-overlay" aria-hidden="true"></div><div class="hero-content"><h1 id="composition-title">Workspace</h1></div></section>
          <div class="indicator"><span class="indicator-item badge" aria-hidden="true">3</span><button class="btn" aria-label="Inbox, 3 unread messages">Inbox</button></div>
          <form class="join" role="search"><label class="sr-only" for="composition-query">Search</label><input id="composition-query" class="join-item input"><button class="join-item btn" type="submit">Search</button></form>
          <div class="sidebar-layout sidebar-layout-hidden"><aside class="sidebar-layout-sidebar"><nav aria-label="Workspace"><a href="#overview">Overview</a></nav></aside><div class="sidebar-layout-content"><p>Content</p></div></div>
          <footer class="footer"><nav aria-label="Footer"><a href="#privacy">Privacy</a></nav></footer>
          <img class="mask mask-circle" alt="Blue color sample" width="48" height="48" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect width='48' height='48' fill='blue'/%3E%3C/svg%3E">
        </main>`;
    }, theme);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
