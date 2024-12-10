import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const testUrl = (palette) => {
  test(`${palette} palette: a11y tests`, async ({ page }) => {
    await page.goto(`http://localhost:3000/rei-cedar/#/kitchen-sink?palette=${palette}`);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag22a', 'wcag22aa', 'best-practice'])
      .withRules(['aria-allowed-attr', 'aria-valid-attr-value'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
};

test.describe('a11y', () => {
  testUrl('default');
  testUrl('sandstone');
});
