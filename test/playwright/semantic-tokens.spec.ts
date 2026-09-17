import { test, expect } from '@playwright/test';
import { compileString, Logger } from 'sass';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(__dirname, '../..');
const resolvePackage = createRequire(path.join(root, 'package.json'));
const components = [
  'input',
  'formError',
  'radio',
  'button',
  'banner',
  'surface',
  'surfaceSelection',
  'rating',
];
const names = [
  'CdrInput',
  'CdrFormError',
  'CdrRadio',
  'CdrButton',
  'CdrBanner',
  'CdrSurface',
  'CdrSurfaceSelection',
  'CdrRating',
];
const css = compileString(
  components
    .map(
      (dir, i) =>
        `@use '${root}/src/components/${dir}/styles/${names[i]}.module' as component${i};`,
    )
    .join('\n'),
  {
    logger: Logger.silent,
    loadPaths: [root],
    importers: [
      {
        findFileUrl: (url) =>
          url === '@rei/cdr-tokens/scss'
            ? pathToFileURL(resolvePackage.resolve('@rei/cdr-tokens/scss'))
            : null,
      },
    ],
  },
).css;
const markup = `
  <main>
    <input aria-label="Name" class="cdr-input cdr-input--primary" value="Cedar">
    <input aria-label="Disabled name" class="cdr-input cdr-input--primary" disabled value="Cedar">
    <div class="cdr-form-error"><svg aria-label="Error icon"><path d="M0 0h10v10z"/></svg>Error</div>
    <label class="cdr-radio cdr-label-wrapper"><input type="radio" class="cdr-radio__input" disabled><span class="cdr-label-wrapper__figure"></span></label>
    <button class="cdr-button cdr-button--primary">Continue<svg aria-label="Action icon"><path d="M0 0h10v10z"/></svg></button>
    <div class="cdr-banner cdr-banner--info"><div class="cdr-banner__message">Information</div><div class="cdr-banner__icon-left"><svg aria-label="Status icon"><path d="M0 0h10v10z"/></svg></div></div>
    <button class="cdr-surface cdr-surface-selection" aria-checked="true">Selected option</button>
    <button class="cdr-surface cdr-surface-selection" aria-checked="true" data-background-checked="sale">Explicit selected surface</button>
    <button class="cdr-surface cdr-surface-selection" data-background="brand" data-background-hover="sale" data-background-active="secondary">Explicit interactive surface</button>
    <button class="cdr-surface cdr-surface-selection" aria-disabled="true" data-background-disabled="sale">Explicit disabled surface</button>
    <button class="cdr-surface cdr-surface-selection" aria-checked="true" aria-disabled="true" data-background-checked="brand" data-background-disabled="sale">Checked disabled surface</button>
    <svg class="cdr-rating__star--filled" aria-label="Rating star"><path d="M0 0h10v10z"/></svg>
  </main>`;

test.beforeEach(async ({ page }) => {
  await page.setContent(
    `<style>${css}\n* { transition: none !important; animation: none !important; }</style>${markup}`,
  );
});

test('legacy fallback works without a global token stylesheet and keyboard focus remains visible', async ({
  page,
}) => {
  const input = page.getByRole('textbox', { name: 'Name', exact: true });
  await expect(input).toHaveCSS('color', 'rgb(46, 46, 43)');
  await expect(input).toHaveCSS('background-color', 'rgba(247, 245, 243, 0.15)');
  await expect(page.getByRole('textbox', { name: 'Disabled name' })).toHaveCSS(
    'color',
    'rgb(213, 207, 195)',
  );
  await input.focus();
  await expect(input).toHaveCSS('box-shadow', /inset.*2px/);
  await expect(page.getByLabel('Rating star')).toHaveCSS('fill', 'rgb(255, 210, 128)');
});

test('semantic roles theme independently and component then legacy overrides remain usable', async ({
  page,
}) => {
  const theme = await page.addStyleTag({
    content: `main {
    --cdr-color-control-text-neutral: rgb(10, 20, 30);
    --cdr-color-control-surface-neutral-trace: rgb(230, 240, 250);
    --cdr-color-text-input-default: rgb(40, 50, 60);
    --cdr-color-feedback-text-error: rgb(100, 20, 30);
    --cdr-color-feedback-icon-error: rgb(40, 50, 160);
    --cdr-color-action-text-brand: rgb(255, 255, 255);
    --cdr-color-action-icon-brand: rgb(220, 230, 240);
    --cdr-color-feedback-text-info-bold: rgb(20, 50, 70);
    --cdr-color-feedback-icon-info: rgb(70, 40, 130);
    --cdr-color-icon-rating: rgb(200, 140, 10);
    --cdr-color-surface-brand: rgb(20, 50, 40);
  }`,
  });
  const input = page.getByRole('textbox', { name: 'Name', exact: true });
  await expect(input).toHaveCSS('color', 'rgb(10, 20, 30)');
  await expect(input).toHaveCSS('background-color', 'rgb(230, 240, 250)');
  await expect(page.locator('.cdr-form-error')).toHaveCSS('color', 'rgb(100, 20, 30)');
  await expect(page.getByLabel('Error icon')).toHaveCSS('fill', 'rgb(40, 50, 160)');
  await expect(page.getByLabel('Action icon')).toHaveCSS('fill', 'rgb(220, 230, 240)');
  await expect(page.locator('.cdr-banner__message')).toHaveCSS('color', 'rgb(20, 50, 70)');
  await expect(page.getByLabel('Status icon')).toHaveCSS('fill', 'rgb(70, 40, 130)');
  await expect(page.getByLabel('Rating star')).toHaveCSS('fill', 'rgb(200, 140, 10)');
  await input.evaluate((el) =>
    el.style.setProperty('--cdr-input-text-color-default', 'rgb(90, 80, 70)'),
  );
  await expect(input).toHaveCSS('color', 'rgb(90, 80, 70)');
  await input.evaluate((el) => el.style.removeProperty('--cdr-input-text-color-default'));
  await theme.evaluate((el) => el.remove());
  await page.addStyleTag({
    content: `main {
      --cdr-color-text-input-default: rgb(40, 50, 60);
      --cdr-color-background-button-primary-rest: rgb(19, 53, 44);
    }`,
  });
  await expect(input).toHaveCSS('color', 'rgb(40, 50, 60)');
  await expect(page.getByRole('button', { name: 'Continue' })).toHaveCSS(
    'background-color',
    'rgb(19, 53, 44)',
  );
});

test('selected surfaces respect explicit props and disabled radio dots remain visually unchecked', async ({
  page,
}) => {
  await page.addStyleTag({
    content: `main {
    --cdr-color-selection-surface-neutral-subtle: rgb(220, 230, 210);
    --cdr-color-surface-sale: rgb(140, 20, 40);
    --cdr-color-surface-brand: rgb(20, 50, 40);
    --cdr-color-control-surface-neutral-faint: rgb(245, 242, 235);
    --cdr-color-control-icon-neutral-faint: rgb(150, 140, 130);
  }`,
  });
  await expect(page.getByRole('button', { name: 'Selected option', exact: true })).toHaveCSS(
    'background-color',
    'rgb(220, 230, 210)',
  );
  await expect(page.getByRole('button', { name: 'Explicit selected surface' })).toHaveCSS(
    'background-color',
    'rgb(140, 20, 40)',
  );
  await expect(page.getByRole('button', { name: 'Explicit disabled surface' })).toHaveCSS(
    'background-color',
    'rgb(140, 20, 40)',
  );
  await expect(page.getByRole('button', { name: 'Checked disabled surface' })).toHaveCSS(
    'background-color',
    'rgb(20, 50, 40)',
  );
  const interactive = page.getByRole('button', { name: 'Explicit interactive surface' });
  await page.addStyleTag({
    content: `main {
    --cdr-color-surface-brand: rgb(20, 50, 40);
    --cdr-color-surface-neutral-faint: rgb(230, 225, 210);
  }`,
  });
  await expect(interactive).toHaveCSS('background-color', 'rgb(20, 50, 40)');
  await interactive.hover();
  await expect(interactive).toHaveCSS('background-color', 'rgb(140, 20, 40)');
  await page.mouse.move(0, 0);
  await interactive.focus();
  await expect(interactive).toHaveCSS('background-color', 'rgb(230, 225, 210)');
  const dot = await page.locator('.cdr-label-wrapper__figure').evaluate((el) => ({
    surface: getComputedStyle(el).backgroundColor,
    dot: getComputedStyle(el, '::after').backgroundColor,
  }));
  expect(dot.dot).toBe(dot.surface);
});

test('Vue examples wire semantic components and native state attributes', async ({ page }) => {
  await page.goto('./#/buttons');
  await expect(page.locator('button[class*="cdr-button_"]').first()).toBeVisible();

  await page.goto('./#/radios');
  await expect(page.locator('input[class*="cdr-radio__input_"][disabled]').first()).toBeDisabled();

  await page.goto('./#/surfaceSelection');
  await expect(
    page.locator('[class*="cdr-surface-selection_"][aria-disabled="true"]').first(),
  ).toHaveAttribute('aria-disabled', 'true');
});
