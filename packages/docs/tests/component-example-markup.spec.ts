import { expect, test } from '@playwright/test';

const componentPages = [
  'file-upload',
  'autocomplete',
  'cascader',
  'datepicker',
  'form',
  'form-group',
  'input',
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
});
