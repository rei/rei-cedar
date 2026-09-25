import { test, expect } from '@playwright/test';

const COMPONENT = 'cdr-accordion';
const STORYBOOK_ID = 'components-accordion';
const STORYBOOK_PORT = process.env.STORYBOOK_PORT ?? '6006';

const stories = [
  'default',
  'compact',
  'border-aligned',
  'accordion-group',
  'opened',
  'no-content-spacing',
  'border-aligned-group',
  'compact-group',
  'unwrapped-group',
];

const viewports = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'mobile', width: 390, height: 844 },
];

test.describe(`${COMPONENT} visual baseline`, () => {
  for (const story of stories) {
    for (const vp of viewports) {
      test(`${story} @ ${vp.name}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(
          `http://localhost:${STORYBOOK_PORT}/iframe.html?id=${STORYBOOK_ID}--${story}&viewMode=story`,
        );
        await page.waitForLoadState('networkidle');
        if (process.env.CAPTURE_AFTER) {
          await page.screenshot({
            path: `test/visual-after/${COMPONENT}/${story}-${vp.name}.png`,
            fullPage: true,
          });
        } else {
          await expect(page).toHaveScreenshot([COMPONENT, `${story}-${vp.name}.png`], {
            fullPage: true,
            threshold: 0.05,
            maxDiffPixels: 0,
          });
        }
      });
    }
  }
});
