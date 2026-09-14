import { expect, test } from '@playwright/test';

test.describe('Visual Regression - Composition Primitives', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/fixtures/test-fixture.html');
  });

  const cases = [
    {
      name: 'indicator',
      theme: 'sunshine',
      dir: 'rtl',
      markup: `<div style="display:flex;align-items:center;gap:3rem;padding:2rem"><div class="indicator"><span class="indicator-item indicator-top indicator-start badge badge-error">8</span><div class="avatar avatar-lg"><span class="avatar-placeholder">DM</span></div></div><div class="indicator"><span class="indicator-item indicator-bottom indicator-end badge badge-success">Ready</span><button class="btn btn-primary">Deploy</button></div><div class="indicator"><span class="indicator-item indicator-middle indicator-center badge badge-secondary">Center</span><div class="card card-bordered" style="width:8rem;height:5rem"></div></div></div>`,
    },
    {
      name: 'join',
      theme: 'moonlight',
      dir: 'ltr',
      markup: `<div class="p-8"><form class="join"><label class="sr-only" for="visual-query">Query</label><input id="visual-query" class="join-item input" value="Moon"><label class="sr-only" for="visual-scope">Scope</label><select id="visual-scope" class="join-item select"><option>All files</option></select><button class="join-item btn btn-primary">Search</button></form><div class="join join-vertical mt-6"><button class="join-item btn">First</button><button class="join-item btn" disabled>Disabled</button><button class="join-item btn">Third</button></div></div>`,
    },
    {
      name: 'stack',
      theme: 'sunshine',
      dir: 'ltr',
      markup: `<div style="padding:2.5rem"><div class="stack stack-end"><article class="card card-bordered" style="width:18rem"><div class="card-body"><h2 class="card-title">Review ready</h2><p>Three checks passed.</p></div></article><div class="card" style="width:18rem;background:var(--color-secondary-container)" aria-hidden="true"></div><div class="card" style="width:18rem;background:var(--color-tertiary-container)" aria-hidden="true"></div></div></div>`,
    },
    {
      name: 'hero',
      theme: 'moonlight',
      dir: 'ltr',
      markup: `<div style="padding:1.5rem"><section class="hero hero-start" style="min-height:18rem;overflow:hidden;border-radius:1.5rem;background:var(--color-surface-container-high)"><div class="hero-overlay" style="background:linear-gradient(135deg,var(--color-primary-container),var(--color-tertiary-container))" aria-hidden="true"></div><div class="hero-content" style="padding:2.5rem"><div><p style="color:var(--color-primary)">Night shift</p><h2 style="font-size:2.25rem;font-weight:700">Quietly ship great work.</h2><button class="btn btn-primary" style="margin-top:1.25rem">Open workspace</button></div></div></section></div>`,
    },
    {
      name: 'footer',
      theme: 'sunshine',
      dir: 'ltr',
      markup: `<div class="p-6"><footer class="footer rounded-3xl"><nav><h2 class="footer-title">Product</h2><a href="#">Overview</a><a href="#">Updates</a></nav><nav><h2 class="footer-title">Company</h2><a href="#">About</a><a href="#">Careers</a></nav><nav><h2 class="footer-title">Legal</h2><a href="#">Privacy</a><a href="#">Terms</a></nav></footer></div>`,
    },
    {
      name: 'sidebar-layout',
      theme: 'moonlight',
      dir: 'rtl',
      markup: `<div style="width:60rem;padding:1.5rem"><div class="sidebar-layout sidebar-layout-end" style="min-height:18rem;overflow:hidden;border-radius:1.5rem"><aside class="sidebar-layout-sidebar"><nav style="padding:.75rem"><a class="drawer-item drawer-item-active" href="#">Overview</a><a class="drawer-item" href="#">Projects</a></nav></aside><main class="sidebar-layout-content" style="padding:1.5rem"><h2 style="font-size:1.5rem;font-weight:700">Workspace</h2><div class="card" style="margin-top:1rem"><div class="card-body">RTL end sidebar</div></div></main></div></div>`,
    },
    {
      name: 'mask',
      theme: 'sunshine',
      dir: 'ltr',
      markup: `<div style="display:flex;flex-wrap:wrap;gap:1.25rem;padding:2rem"><div class="mask mask-circle" style="width:6rem;height:6rem;background:var(--color-primary-container)"></div><div class="mask mask-squircle" style="width:6rem;height:6rem;background:var(--color-secondary-container)"></div><div class="mask mask-square" style="width:6rem;height:6rem;background:var(--color-tertiary-container)"></div><div class="mask mask-diamond" style="width:6rem;height:6rem;background:var(--color-info-container)"></div><div class="mask mask-hexagon" style="width:6rem;height:6rem;background:var(--color-success-container)"></div><div class="mask mask-triangle" style="width:6rem;height:6rem;background:var(--color-warning-container)"></div></div>`,
    },
  ] as const;

  for (const visualCase of cases) {
    test(`${visualCase.name} renders in ${visualCase.theme}${visualCase.dir === 'rtl' ? ' RTL' : ''}`, async ({ page }) => {
      await page.evaluate(({ theme, dir, markup }) => {
        document.documentElement.setAttribute('data-theme', theme);
        const container = document.createElement('div');
        container.id = 'composition-visual';
        container.dir = dir;
        container.innerHTML = markup;
        document.body.appendChild(container);
      }, visualCase);
      await expect(page.locator('#composition-visual')).toHaveScreenshot(`${visualCase.name}-${visualCase.theme}${visualCase.dir === 'rtl' ? '-rtl' : ''}.png`);
    });
  }
});
