import { expect, test } from '@playwright/test';

type InstrumentedWindow = Window & { __resizeWarnings: string[] };

async function settlePaint(page: import('@playwright/test').Page): Promise<void> {
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
  );
}

test('filmstrip responds to width and content height without a ResizeObserver warning', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => {
    (window as InstrumentedWindow).__resizeWarnings = [];
    window.addEventListener('error', (event) => {
      if (event.message.includes('ResizeObserver loop')) {
        (window as InstrumentedWindow).__resizeWarnings.push(event.message);
      }
    });
  });
  await page.goto('http://localhost:3000/rei-cedar/test/fixtures/filmstrip-resize.html');

  const frame = page.locator('.product-frame').first();
  await expect(frame).toBeVisible();
  const initialWidth = await frame.evaluate((element) => element.getBoundingClientRect().width);
  const initialHeight = await frame.evaluate((element) => element.getBoundingClientRect().height);

  await page.setViewportSize({ width: 412, height: 844 });
  await expect
    .poll(() => frame.evaluate((element) => element.getBoundingClientRect().width))
    .toBeGreaterThan(initialWidth);
  await expect
    .poll(() => frame.evaluate((element) => element.getBoundingClientRect().height))
    .toBeGreaterThan(initialHeight);
  await settlePaint(page);
  expect(await page.evaluate(() => (window as InstrumentedWindow).__resizeWarnings)).toEqual([]);

  await frame.evaluate((element) => {
    (element as HTMLElement).style.paddingBottom = '80px';
  });
  await expect
    .poll(() => frame.evaluate((element) => element.getBoundingClientRect().height))
    .toBeGreaterThan(initialHeight + 40);
  await settlePaint(page);
  expect(await page.evaluate(() => (window as InstrumentedWindow).__resizeWarnings)).toEqual([]);

  const narrowWidth = await frame.evaluate((element) => element.getBoundingClientRect().width);
  await page.setViewportSize({ width: 768, height: 844 });
  await expect
    .poll(() => frame.evaluate((element) => element.getBoundingClientRect().width))
    .toBeGreaterThan(narrowWidth);
  await settlePaint(page);
  expect(await page.evaluate(() => (window as InstrumentedWindow).__resizeWarnings)).toEqual([]);
});
