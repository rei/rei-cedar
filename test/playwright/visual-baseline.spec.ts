import { test, expect } from '@playwright/test';

/**
 * Visual baseline template — Phase 1/5 of the semantic-token-migration skill.
 *
 * This is a reusable runner. Set VISUAL_COMPONENT, VISUAL_STORYBOOK_ID, and
 * VISUAL_STORIES for each migration; no component-specific spec/config copy is
 * needed. For interactions, set VISUAL_STATES, VISUAL_STATE_SELECTOR, and
 * optionally VISUAL_STATE_STORIES. The visual project's snapshotPathTemplate
 * routes by the screenshot's first path segment into
 * test/visual-baseline/<component>/.
 *
 * Each story is captured in isolation (Storybook iframe) at desktop + mobile.
 *
 * Capture (Phase 1 — writes baselines):
 *   npx playwright test test/playwright/visual-baseline.spec.ts --project=visual --update-snapshots
 * Compare (Phase 5 — diffs against baselines):
 *   npx playwright test test/playwright/visual-baseline.spec.ts --project=visual
 * After-images for the gallery (Phase 5 — writes test/visual-after/):
 *   CAPTURE_AFTER=1 npx playwright test test/playwright/visual-baseline.spec.ts --project=visual
 *
 * Requires Storybook on :6006 (`pnpm storybook`, started manually — the
 * Playwright webServer serves the Vite dev app on :3000, NOT Storybook).
 * Chromium only — baselines are single-browser to avoid cross-browser noise.
 */

const COMPONENT = process.env.VISUAL_COMPONENT ?? 'cdr-abstract';
const STORYBOOK_ID = process.env.VISUAL_STORYBOOK_ID ?? 'components-abstract';
const STORYBOOK_URL = (process.env.STORYBOOK_URL ?? 'http://localhost:6006').replace(/\/$/, '');

const stories = (
  process.env.VISUAL_STORIES ??
  'default,fluid-responsive,different-tags,in-article,multiple-abstracts'
)
  .split(',')
  .map((story) => story.trim())
  .filter(Boolean);
const states = (process.env.VISUAL_STATES ?? 'rest')
  .split(',')
  .map((state) => state.trim())
  .filter(Boolean);
const stateStories = new Set(
  (process.env.VISUAL_STATE_STORIES ?? '')
    .split(',')
    .map((story) => story.trim())
    .filter(Boolean),
);
const stateSelector = process.env.VISUAL_STATE_SELECTOR ?? '[aria-expanded]';

const viewports = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'mobile', width: 390, height: 844 },
];

test.describe(`${COMPONENT} visual baseline`, () => {
  for (const story of stories) {
    for (const vp of viewports) {
      for (const state of states) {
        if (state !== 'rest' && stateStories.size > 0 && !stateStories.has(story)) continue;

        test(`${story} @ ${state} @ ${vp.name}`, async ({ page }) => {
          await page.setViewportSize({ width: vp.width, height: vp.height });
          await page.goto(
            `${STORYBOOK_URL}/iframe.html?id=${STORYBOOK_ID}--${story}&viewMode=story`,
          );
          await page.waitForLoadState('networkidle');
          if (process.env.VISUAL_PREVIEW_CSS) {
            await page.addStyleTag({ path: process.env.VISUAL_PREVIEW_CSS });
          }

          let pointerIsDown = false;
          if (state !== 'rest') {
            const target = page.locator(stateSelector).first();
            await expect(target, `state target "${stateSelector}" in ${story}`).toBeVisible();
            if (state === 'hover') {
              await target.hover();
            } else if (state === 'focus-visible') {
              await page.keyboard.press('Tab');
              await target.focus();
              expect(await target.evaluate((el) => el.matches(':focus-visible'))).toBe(true);
            } else if (state === 'active') {
              await target.hover();
              await page.mouse.down();
              pointerIsDown = true;
            } else {
              throw new Error(`Unsupported visual state: ${state}`);
            }
          }

          const stateSuffix = state === 'rest' ? '' : `-${state}`;
          const screenshotName = `${story}${stateSuffix}-${vp.name}.png`;
          if (process.env.CAPTURE_AFTER) {
            await page.screenshot({
              path: `test/visual-after/${COMPONENT}/${screenshotName}`,
              fullPage: true,
            });
          } else {
            // Keep the approved five-percent Playwright threshold. Compare
            // baselines on the same browser/platform; `pnpm diff` exposes subtler
            // color changes with its separate RGB-distance threshold.
            await expect(page).toHaveScreenshot([COMPONENT, screenshotName], {
              fullPage: true,
              threshold: 0.05,
              maxDiffPixels: 0,
            });
          }
          if (pointerIsDown) await page.mouse.up();
        });
      }
    }
  }
});
