import { expect, test, type Locator, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';

const componentCss = readFileSync(new URL('../../src/components/pagination.css', import.meta.url), 'utf8');
const themeCss = ['sunshine', 'moonlight'].map(theme =>
  readFileSync(new URL(`../../src/themes/generated/${theme}.css`, import.meta.url), 'utf8'),
).join('\n');

async function expectColors(item: Locator, reference: Locator) {
  const colors = (locator: Locator) => locator.evaluate(element => {
    const style = getComputedStyle(element);
    return [style.backgroundColor, style.color, style.borderTopColor];
  });
  await expect.poll(() => colors(item)).toEqual(await colors(reference));
}

async function render(page: Page, content: string, theme: string, color: string) {
  await page.setContent(`<style>${themeCss}\n${componentCss}</style>
    <main data-theme="${theme}">${content}
      <span id="reference" style="background-color: var(--color-${color}); color: var(--color-${color}-content); border: 1px solid var(--color-${color})">Reference</span>
      <span id="hover-reference" style="background-color: color-mix(in oklch, var(--color-${color}), black 10%); color: var(--color-${color}-content); border: 1px solid var(--color-${color})">Hover reference</span>
    </main>`);
}

for (const theme of ['sunshine', 'moonlight']) {
  for (const variant of ['default', 'primary', 'secondary', 'tertiary']) {
    test(`${theme} ${variant} current-page colors survive semantics and hover`, async ({ page }) => {
      const color = variant === 'default' ? 'primary' : variant;
      const active = variant === 'default' ? 'pagination-item-active' : `pagination-item-active-${variant}`;
      await render(page, `
        <nav class="pagination" aria-label="Direct pages">
          <button id="direct-button" class="pagination-item ${active}" aria-current="page">1</button>
          <a id="direct-link" class="pagination-item ${active}" aria-current="page" href="#page">2</a>
          <button id="class-only" class="pagination-item ${active}">3</button>
          ${variant === 'default' ? '<button id="semantic-only" class="pagination-item" aria-current="page">4</button>' : ''}
        </nav>
        <ul class="pagination" aria-label="List pages">
          <li><button id="list-button" class="${active}" aria-current="page">1</button></li>
          <li><a id="list-link" class="${active}" aria-current="page" href="#page">2</a></li>
          <li><button id="list-item" class="pagination-item ${active}" aria-current="page">3</button></li>
          <li><a id="list-active" class="active ${active}" href="#page">4</a></li>
        </ul>`, theme, color);

      const items = page.locator('.pagination button, .pagination a');
      for (const item of await items.all()) {
        await page.mouse.move(0, 0);
        await expectColors(item, page.locator('#reference'));
        await item.hover();
        await expectColors(item, page.locator('#hover-reference'));
      }
      await expect(page.locator('[aria-current="page"]')).toHaveCount(variant === 'default' ? 6 : 5);
    });
  }
}

test('tonal and outlined pagination retain their color roles', async ({ page }) => {
  await render(page, `
    <nav class="pagination pagination-tonal">
      <button id="tonal" class="pagination-item pagination-item-active" aria-current="page">1</button>
    </nav>
    <nav class="pagination pagination-outlined">
      <button id="outlined" class="pagination-item pagination-item-active-secondary" aria-current="page">2</button>
    </nav>
    <span id="tonal-reference" style="background-color: var(--color-primary-container); color: var(--color-on-primary-container); border: 1px solid var(--color-primary-container)">Tonal reference</span>
    <span id="outlined-reference" style="background-color: var(--color-secondary); color: var(--color-secondary-content); border: 1px solid var(--color-outline)">Outlined reference</span>`, 'sunshine', 'secondary');
  await expectColors(page.locator('#tonal'), page.locator('#tonal-reference'));
  await expectColors(page.locator('#outlined'), page.locator('#outlined-reference'));
});
