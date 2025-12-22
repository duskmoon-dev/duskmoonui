/**
 * Visual regression tests for Navigation components
 * Tests navbar, menu, breadcrumbs, tabs, and dropdown
 */

import { test, expect } from '@playwright/test';

test.describe('Visual Regression - Navigation Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/fixtures/test-fixture.html');
  });

  test.describe('Navigation - Sunshine Theme', () => {
    test.beforeEach(async ({ page }) => {
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'sunshine');
      });
    });

    test('navbar renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'nav-test';
        container.className = 'bg-base-100';
        container.innerHTML = `
          <div class="navbar bg-surface">
            <div class="navbar-start">
              <a class="btn btn-ghost text-xl">DuskMoonUI</a>
            </div>
            <div class="navbar-center hidden lg:flex">
              <ul class="menu menu-horizontal">
                <li><a>Home</a></li>
                <li><a>Components</a></li>
                <li><a>Docs</a></li>
              </ul>
            </div>
            <div class="navbar-end">
              <a class="btn btn-primary">Get Started</a>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      });

      const nav = page.locator('#nav-test');
      await expect(nav).toHaveScreenshot('sunshine-navbar.png');
    });

    test('menu horizontal renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'nav-test';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <ul class="menu menu-horizontal bg-surface rounded-box">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
            <li><a class="active">Active</a></li>
            <li><a>Item 4</a></li>
          </ul>
        `;
        document.body.appendChild(container);
      });

      const nav = page.locator('#nav-test');
      await expect(nav).toHaveScreenshot('sunshine-menu-horizontal.png');
    });

    test('menu vertical renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'nav-test';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <ul class="menu menu-vertical bg-surface rounded-box w-56">
            <li class="menu-title">Category</li>
            <li><a>Item 1</a></li>
            <li><a class="active">Active Item</a></li>
            <li><a>Item 3</a></li>
            <li class="disabled"><a>Disabled</a></li>
          </ul>
        `;
        document.body.appendChild(container);
      });

      const nav = page.locator('#nav-test');
      await expect(nav).toHaveScreenshot('sunshine-menu-vertical.png');
    });

    test('breadcrumbs renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'nav-test';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <ul class="breadcrumbs">
            <li><a href="#">Home</a></li>
            <li><a href="#">Components</a></li>
            <li><a href="#">Navigation</a></li>
            <li>Breadcrumbs</li>
          </ul>
        `;
        document.body.appendChild(container);
      });

      const nav = page.locator('#nav-test');
      await expect(nav).toHaveScreenshot('sunshine-breadcrumbs.png');
    });

    test('tabs renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'nav-test';
        container.className = 'p-8 bg-base-100 flex flex-col gap-8';
        container.innerHTML = `
          <div class="tabs">
            <a class="tab">Tab 1</a>
            <a class="tab tab-active">Tab 2</a>
            <a class="tab">Tab 3</a>
          </div>
          <div class="tabs tabs-boxed">
            <a class="tab">Tab 1</a>
            <a class="tab tab-active">Tab 2</a>
            <a class="tab">Tab 3</a>
          </div>
        `;
        document.body.appendChild(container);
      });

      const nav = page.locator('#nav-test');
      await expect(nav).toHaveScreenshot('sunshine-tabs.png');
    });

    test('tab sizes render correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'nav-test';
        container.className = 'p-8 bg-base-100 flex flex-col gap-8';
        container.innerHTML = `
          <div class="tabs">
            <a class="tab tab-xs tab-active">Extra Small</a>
            <a class="tab tab-xs">Tab</a>
          </div>
          <div class="tabs">
            <a class="tab tab-sm tab-active">Small</a>
            <a class="tab tab-sm">Tab</a>
          </div>
          <div class="tabs">
            <a class="tab tab-active">Default</a>
            <a class="tab">Tab</a>
          </div>
          <div class="tabs">
            <a class="tab tab-lg tab-active">Large</a>
            <a class="tab tab-lg">Tab</a>
          </div>
        `;
        document.body.appendChild(container);
      });

      const nav = page.locator('#nav-test');
      await expect(nav).toHaveScreenshot('sunshine-tab-sizes.png');
    });

    test('dropdown renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'nav-test';
        container.className = 'p-8 bg-base-100 h-64';
        container.innerHTML = `
          <div class="dropdown dropdown-open">
            <div tabindex="0" role="button" class="btn">Dropdown</div>
            <ul tabindex="0" class="dropdown-content menu bg-surface rounded-box shadow-lg w-52">
              <li><a>Item 1</a></li>
              <li><a>Item 2</a></li>
              <li><a>Item 3</a></li>
            </ul>
          </div>
        `;
        document.body.appendChild(container);
      });

      const nav = page.locator('#nav-test');
      await expect(nav).toHaveScreenshot('sunshine-dropdown.png');
    });

    test('pagination renders correctly', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'nav-test';
        container.className = 'p-8 bg-base-100';
        container.innerHTML = `
          <ul class="pagination">
            <li><a>«</a></li>
            <li><a>1</a></li>
            <li><a class="active">2</a></li>
            <li><a>3</a></li>
            <li><a>4</a></li>
            <li><a>»</a></li>
          </ul>
        `;
        document.body.appendChild(container);
      });

      const nav = page.locator('#nav-test');
      await expect(nav).toHaveScreenshot('sunshine-pagination.png');
    });
  });

  test.describe('Navigation - Moonlight Theme', () => {
    test.beforeEach(async ({ page }) => {
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'moonlight');
      });
    });

    test('all navigation components in dark theme', async ({ page }) => {
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.id = 'nav-test';
        container.className = 'bg-base-100 flex flex-col gap-8';
        container.innerHTML = `
          <div class="navbar bg-surface">
            <div class="navbar-start">
              <a class="btn btn-ghost">Logo</a>
            </div>
            <div class="navbar-end">
              <ul class="menu menu-horizontal">
                <li><a class="active">Home</a></li>
                <li><a>About</a></li>
              </ul>
            </div>
          </div>
          <div class="p-8">
            <div class="tabs tabs-boxed mb-4">
              <a class="tab">Tab 1</a>
              <a class="tab tab-active">Tab 2</a>
            </div>
            <ul class="breadcrumbs">
              <li><a>Home</a></li>
              <li>Current</li>
            </ul>
          </div>
        `;
        document.body.appendChild(container);
      });

      const nav = page.locator('#nav-test');
      await expect(nav).toHaveScreenshot('moonlight-nav-all.png');
    });
  });
});
