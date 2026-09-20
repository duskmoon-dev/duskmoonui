import { expect, test } from '@playwright/test';

const componentPages = [
  'actions',
  'dropdown',
  'fab',
  'swap',
  'theme-controller',
  'file-upload',
  'autocomplete',
  'cascader',
  'datepicker',
  'form',
  'form-group',
  'input',
  'join',
  'multi-select',
  'otp-input',
  'pin-input',
  'select',
  'slider',
  'textarea',
  'time-input',
  'tree-select',
  'tooltip',
  'appbar',
  'pagination',
  'stepper',
  'bottom-sheet',
  'popover',
];

test.describe('Component example markup', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'Chrome Issues use the CDP Audits domain');

  for (const component of componentPages) {
    test(`${component} has no native form markup issues`, async ({ page, context }) => {
      const session = await context.newCDPSession(page);
      const issues: string[] = [];

      session.on('Audits.issueAdded', ({ issue }) => {
        if (issue.code !== 'GenericIssue') return;

        const errorType = issue.details.genericIssueDetails?.errorType;
        if (errorType) issues.push(errorType);
      });

      await session.send('Audits.enable');
      await page.goto(`/duskmoonui/docs/en/components/${component}/`);
      await page.waitForLoadState('networkidle');

      expect(issues).toEqual([]);
    });
  }

  test('bottom sheet example images load successfully', async ({ page }) => {
    const failedImages: string[] = [];

    page.on('response', (response) => {
      if (response.request().resourceType() === 'image' && response.status() >= 400) {
        failedImages.push(`${response.status()} ${response.url()}`);
      }
    });

    await page.goto('/duskmoonui/docs/en/components/bottom-sheet/');
    await page.waitForLoadState('networkidle');

    expect(failedImages).toEqual([]);
  });

  test('tree select basic demo selects an option', async ({ page }) => {
    await page.goto('/duskmoonui/docs/en/components/tree-select/');

    const showcase = page.locator('[data-showcase]').filter({
      has: page.getByRole('heading', { name: 'Basic Tree Select', exact: true }),
    });
    const trigger = showcase.locator('.tree-select-trigger');

    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();
    const triggerBox = await trigger.boundingBox();
    const popoverBox = await showcase.locator('[popover]').boundingBox();

    expect(triggerBox).not.toBeNull();
    expect(popoverBox).not.toBeNull();
    expect(Math.abs((popoverBox?.x ?? 0) - (triggerBox?.x ?? 0))).toBeLessThanOrEqual(1);
    expect(Math.abs((popoverBox?.width ?? 0) - (triggerBox?.width ?? 0))).toBeLessThanOrEqual(1);
    expect(Math.abs((popoverBox?.y ?? 0) - ((triggerBox?.y ?? 0) + (triggerBox?.height ?? 0) + 4))).toBeLessThanOrEqual(1);

    await showcase.getByRole('treeitem', { name: 'Category 2' }).click();

    await expect(trigger).toContainText('Category 2');
    await expect(showcase.locator('[popover]')).not.toBeVisible();
  });

  test('cascader basic demo opens next to its trigger', async ({ page }) => {
    await page.goto('/duskmoonui/docs/en/components/cascader/');

    const showcase = page.locator('[data-showcase]').filter({
      has: page.getByRole('heading', { name: 'Basic Cascader', exact: true }),
    });
    const trigger = showcase.locator('.cascader-trigger');

    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();
    const triggerBox = await trigger.boundingBox();
    const popoverBox = await showcase.locator('[popover]').boundingBox();

    expect(triggerBox).not.toBeNull();
    expect(popoverBox).not.toBeNull();
    expect(Math.abs((popoverBox?.x ?? 0) - (triggerBox?.x ?? 0))).toBeLessThanOrEqual(1);
    expect(Math.abs((popoverBox?.y ?? 0) - ((triggerBox?.y ?? 0) + (triggerBox?.height ?? 0) + 4))).toBeLessThanOrEqual(1);
  });

  test('cascader selected demo keeps its controls inside the field', async ({ page }) => {
    await page.goto('/duskmoonui/docs/en/components/cascader/');

    const showcase = page.locator('[data-showcase]').filter({
      has: page.getByRole('heading', { name: 'Cascader with Selection', exact: true }),
    });
    const root = showcase.locator('.cascader');
    const trigger = root.locator('.cascader-trigger');
    const clear = root.locator(':scope > .cascader-clear');

    await trigger.scrollIntoViewIfNeeded();
    const triggerBox = await trigger.boundingBox();
    const clearBox = await clear.boundingBox();

    await expect(trigger.locator('.cascader-arrow')).toHaveCount(1);
    await expect(trigger.locator('.cascader-clear')).toHaveCount(0);
    expect(triggerBox).not.toBeNull();
    expect(clearBox).not.toBeNull();
    expect((clearBox?.x ?? 0) + (clearBox?.width ?? 0)).toBeLessThan(
      (triggerBox?.x ?? 0) + (triggerBox?.width ?? 0),
    );
    expect(Math.abs(
      (clearBox?.y ?? 0) + (clearBox?.height ?? 0) / 2
        - ((triggerBox?.y ?? 0) + (triggerBox?.height ?? 0) / 2),
    )).toBeLessThanOrEqual(1);
  });
});
