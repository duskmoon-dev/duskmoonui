import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';

const core = readFileSync(new URL('../../dist/index.css', import.meta.url), 'utf8');
const labels = ['active', 'In progress', '已激活'];

for (const component of ['badge', 'chip', 'autocomplete-tag', 'autocomplete-chip']) {
  test(`${component} keeps labels intact in narrow table cells and wrapping groups`, async ({ page }) => {
    const group = component.startsWith('autocomplete-')
      ? `${component}s`
      : 'chip-group';
    await page.setContent(`<html lang="en" data-theme="sunshine"><head><style>${core}</style></head><body>
      <table class="table" style="width: 4rem; table-layout: fixed">
        <thead><tr><th>State</th></tr></thead>
        <tbody>${labels.map(label => `<tr><td><span class="${component}">${label}</span></td></tr>`).join('')}</tbody>
      </table>
      <div id="group" class="${group}" style="width: 8rem">
        ${labels.map(label => `<span class="${component}">${label}</span>`).join('')}
      </div>
    </body></html>`);

    const measurements = await page.locator(`.${component}`).evaluateAll(elements => elements.map(element => {
      const range = document.createRange();
      range.selectNodeContents(element);
      const text = range.getBoundingClientRect();
      const badge = element.getBoundingClientRect();
      return {
        label: element.textContent,
        lines: range.getClientRects().length,
        contained: text.left >= badge.left - 1 && text.right <= badge.right + 1,
      };
    }));
    for (const measurement of measurements) {
      expect(measurement.lines, `${component}: ${measurement.label}`).toBe(1);
      expect(measurement.contained, `${component}: ${measurement.label} stays inside its background`).toBe(true);
    }

    const rows = await page.locator(`#group > .${component}`).evaluateAll(elements =>
      elements.map(element => element.getBoundingClientRect().top));
    expect(rows[rows.length - 1]).toBeGreaterThan(rows[0]);
  });
}
