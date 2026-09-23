import { expect, test } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

type InstrumentedWindow = Window & { __resizeWarnings: string[] };

type WidthSamplingWindow = Window & { __frameWidths: number[] };

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

for (const width of [390, 768, 992, 1200]) {
  test(`default filmstrip renders its settled frame width on first paint at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.addInitScript(() => {
      const sampledWindow = window as WidthSamplingWindow;
      sampledWindow.__frameWidths = [];
      const sample = () => {
        const frame = document.querySelector('.product-frame');
        if (frame) {
          sampledWindow.__frameWidths.push(frame.getBoundingClientRect().width);
        }
        if (performance.now() < 1000) requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    });

    await page.goto('http://localhost:3000/rei-cedar/test/fixtures/filmstrip-first-paint.html');
    await expect(page.locator('.product-frame').first()).toBeVisible();
    await page.waitForTimeout(150);

    const widths = await page.evaluate(() => (window as WidthSamplingWindow).__frameWidths);
    expect(widths.length).toBeGreaterThan(1);
    expect(Math.abs(widths[0] - widths.at(-1)!)).toBeLessThan(1);
  });
}

test('default filmstrip follows its container width in a wide viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 844 });
  await page.addInitScript(() => {
    const sampledWindow = window as WidthSamplingWindow;
    sampledWindow.__frameWidths = [];
    const sample = () => {
      const frame = document.querySelector('.product-frame');
      if (frame) sampledWindow.__frameWidths.push(frame.getBoundingClientRect().width);
      if (performance.now() < 1000) requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  await page.route('**/filmstrip-first-paint.html', async (route) => {
    const response = await route.fetch();
    const body = (await response.text()).replace(
      '<div id="app"></div>',
      '<div id="app" style="width: 600px"></div>',
    );
    await route.fulfill({ response, body });
  });

  await page.goto('http://localhost:3000/rei-cedar/test/fixtures/filmstrip-first-paint.html');
  await expect(page.locator('.product-frame').first()).toBeVisible();
  await page.waitForTimeout(150);

  const widths = await page.evaluate(() => (window as WidthSamplingWindow).__frameWidths);
  expect(widths.length).toBeGreaterThan(1);
  expect(widths[0]).toBeCloseTo(600 / 2.25, 0);
  expect(Math.abs(widths[0] - widths.at(-1)!)).toBeLessThan(1);

  await page.locator('#app').evaluate((element) => {
    (element as HTMLElement).style.width = '1000px';
  });
  await expect
    .poll(() =>
      page
        .locator('.product-frame')
        .first()
        .evaluate((element) => element.getBoundingClientRect().width),
    )
    .toBeLessThan(210);
  const wideFrameWidth = await page
    .locator('.product-frame')
    .first()
    .evaluate((element) => element.getBoundingClientRect().width);
  expect(wideFrameWidth).toBeCloseTo(1000 / 5.25, 0);
});

test('default filmstrip keeps its frame width through SSR hydration', async ({ page }) => {
  const serverMarkup = execFileSync(
    process.execPath,
    [resolve('test/fixtures/render-filmstrip-first-paint.mjs')],
    { cwd: process.cwd(), encoding: 'utf8' },
  );

  const browserErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error' || message.text().includes('Hydration')) {
      browserErrors.push(message.text());
    }
  });
  page.on('pageerror', (error) => browserErrors.push(error.message));
  await page.addInitScript(() => {
    const sampledWindow = window as WidthSamplingWindow;
    sampledWindow.__frameWidths = [];
    const sample = () => {
      const frame = document.querySelector('.product-frame');
      if (frame) sampledWindow.__frameWidths.push(frame.getBoundingClientRect().width);
      if (performance.now() < 1000) requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  await page.route('**/filmstrip-first-paint.html', async (route) => {
    const response = await route.fetch();
    const body = (await response.text())
      .replace('<div id="app"></div>', `<div id="app">${serverMarkup}</div>`)
      .replace(
        '</head>',
        '<link rel="stylesheet" href="/rei-cedar/src/components/filmstrip/styles/CdrFilmstrip.module.scss?direct" /></head>',
      );
    await route.fulfill({ response, body });
  });

  for (const width of [390, 768, 1200]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('http://localhost:3000/rei-cedar/test/fixtures/filmstrip-first-paint.html');
    await expect(page.locator('.product-frame').first()).toBeVisible();
    await page.waitForTimeout(150);
    const widths = await page.evaluate(() => (window as WidthSamplingWindow).__frameWidths);
    expect(widths.length).toBeGreaterThan(1);
    expect(Math.abs(widths[0] - widths.at(-1)!)).toBeLessThan(1);
  }
  expect(browserErrors).toEqual([]);
});
