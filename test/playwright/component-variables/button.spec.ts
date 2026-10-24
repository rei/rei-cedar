import { test, expect, type Locator, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import * as sass from 'sass';
import type { ButtonExample } from '../../../build/component-variables/button';

const packageRoot = path.resolve('../rei-cedar-component-variables');
const demo = readFileSync(path.join(packageRoot, 'dist/demo/CdrButton.html'), 'utf8');
const { examples }: { examples: ButtonExample[] } = JSON.parse(
  readFileSync(path.join(packageRoot, 'examples/cdr-button.json'), 'utf8'),
);
const properties = [
  'background-color',
  'color',
  'fill',
  'box-shadow',
  'outline',
  'outline-offset',
  'border-radius',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'font-family',
  'font-size',
  'font-weight',
  'line-height',
  'display',
  'width',
  'height',
  'justify-content',
  'cursor',
  'text-decoration-line',
];
const requirePackage = createRequire(path.resolve('package.json'));
const sassOptions = {
  quietDeps: true,
  loadPaths: [process.cwd()],
  importers: [
    {
      findFileUrl(url: string) {
        return url === '@rei/cdr-tokens/scss' ? pathToFileURL(requirePackage.resolve(url)) : null;
      },
    },
  ],
};
const sourceEntry = path.resolve('src/components/button/styles/vars/CdrButton.vars.scss');
const elevated = ['primary', 'secondary', 'dark', 'sale']
  .map(
    (variant) =>
      `.cdr-button--${variant}-elevated { @include button.cdr-button-${variant}-elevated-mixin; }`,
  )
  .join('\n');
const referenceCSS =
  sass.compile('src/components/button/styles/CdrButton.module.scss', sassOptions).css +
  sass.compileString(`@use '${sourceEntry}' as button; ${elevated}`, sassOptions).css;

async function fixture(page: Page) {
  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  await page.setContent(demo);
  await page.addStyleTag({ content: referenceCSS + '\n* { transition: none !important; }' });
  for (const example of examples) {
    const modifiers = example.scss.flatMap((include) => {
      const match = include.match(/@include cdr-button-(.+)-mixin(?:\((\w+)\))?;/);
      return match && match[1] !== 'base'
        ? [`cdr-button--${match[1]}${match[2] ? `@${match[2]}` : ''}`]
        : [];
    });
    const reference = example.html.replace(
      `cdr-button-${example.name}`,
      ['cdr-button', ...modifiers].join(' '),
    );
    await page.locator(`[data-example="${example.name}"]`).evaluate((article, html) => {
      const wrapper = document.createElement('div');
      wrapper.dataset.reference = 'true';
      wrapper.innerHTML = html;
      article.append(wrapper);
    }, reference);
  }
  expect(requests).toEqual([]);
  expect(await page.locator('script').count()).toBe(0);
}

async function styles(element: Locator) {
  return element.evaluate((node, names) => {
    const read = (target: Element) => {
      const style = getComputedStyle(target);
      return Object.fromEntries(names.map((name) => [name, style.getPropertyValue(name)]));
    };
    return { button: read(node), icons: [...node.querySelectorAll('svg')].map(read) };
  }, properties);
}

test('every example matches Vue styles at both sides of all breakpoints, without Vue', async ({
  page,
}) => {
  await fixture(page);
  for (const width of [767, 768, 991, 992, 1231, 1232]) {
    await page.setViewportSize({ width, height: 900 });
    for (const example of examples) {
      const article = page.locator(`[data-example="${example.name}"]`);
      await expect
        .soft(styles(article.locator(':scope > button')), `${example.name}, ${width}px`)
        .resolves.toEqual(await styles(article.locator('[data-reference] > button')));
    }
  }
});

test('all seven variants match hover, keyboard focus, active and disabled styles', async ({
  page,
  browserName,
}) => {
  await fixture(page);
  for (const variant of [
    'primary',
    'secondary',
    'dark',
    'sale',
    'link',
    'icon-only',
    'with-background',
    'primary-elevated',
    'secondary-elevated',
    'dark-elevated',
    'sale-elevated',
  ]) {
    const article = page.locator(`[data-example="${variant}"]`);
    const button = article.locator(':scope > button');
    const reference = article.locator('[data-reference] > button');
    for (const state of ['hover', 'focus-visible', 'active', 'disabled']) {
      const captured = [];
      for (const element of [button, reference]) {
        await page.mouse.move(0, 0);
        await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
        if (state === 'disabled')
          await element.evaluate((node) => ((node as HTMLButtonElement).disabled = true));
        if (state === 'hover' || state === 'active' || state === 'disabled') await element.hover();
        if (state === 'focus-visible') {
          await element.focus();
          if (browserName === 'webkit') {
            await page.keyboard.press('ArrowRight');
          } else {
            await page.keyboard.press('Tab');
            await page.keyboard.press('Shift+Tab');
          }
          await expect(element).toBeFocused();
          expect(await element.evaluate((node) => node.matches(':focus-visible'))).toBe(true);
        }
        if (state === 'active') await page.mouse.down();
        captured.push(await styles(element));
        if (state === 'active') await page.mouse.up();
        if (state === 'disabled')
          await element.evaluate((node) => ((node as HTMLButtonElement).disabled = false));
      }
      expect.soft(captured[0], `${variant}: ${state}`).toEqual(captured[1]);
    }
  }
});

test('legacy color overrides work and the new semantic hook takes precedence', async ({ page }) => {
  await page.setContent(demo);
  const button = page.locator('[data-example="primary"] > button');
  await expect(button).toHaveCSS('background-color', 'rgb(20, 53, 40)');
  await button.evaluate((node) =>
    (node as HTMLElement).style.setProperty(
      '--cdr-button-primary-background-color-rest',
      'rgb(202, 1, 99)',
    ),
  );
  await expect(button).toHaveCSS('background-color', 'rgb(202, 1, 99)');
  await button.evaluate((node) =>
    (node as HTMLElement).style.setProperty('--cdr-color-button-surface', 'rgb(1, 99, 202)'),
  );
  await expect(button).toHaveCSS('background-color', 'rgb(1, 99, 202)');
  const elevated = page.locator('[data-example="primary-elevated"] > button');
  await elevated.evaluate((node) =>
    (node as HTMLElement).style.setProperty('--cdr-button-primary-box-shadow', 'rgb(202, 1, 99)'),
  );
  await expect(elevated).toHaveCSS('box-shadow', /rgb\(202, 1, 99\)/);
});

test('legacy icon helpers work independently of the button size', async ({ page }) => {
  await page.setContent(demo);
  const entry = path.join(packageRoot, 'dist/scss/CdrButton.vars.scss');
  const css = sass.compileString(
    `@use '${entry}' as button;
    .helper-button { @include button.cdr-button-base-mixin; @include button.cdr-button-primary-mixin; @include button.cdr-button-has-icon-left-small-mixin; }
    .helper-icon { @include button.cdr-button-icon-small-mixin; }
  `,
    { quietDeps: true, loadPaths: [process.cwd(), path.join(packageRoot, 'node_modules')] },
  ).css;
  await page.addStyleTag({ content: css });
  await page.locator('main').evaluate((main) => {
    main.insertAdjacentHTML(
      'afterbegin',
      '<button class="helper-button cdr-button--has-icon-left"><svg class="helper-icon" aria-hidden="true" viewBox="0 0 24 24"></svg>Helper</button>',
    );
  });
  await expect(page.locator('.helper-icon')).toHaveCSS('width', '20px');
  await expect(page.locator('.helper-icon')).toHaveCSS('height', '20px');
  await expect(page.locator('.helper-button')).toHaveCSS('padding-left', '8px');
  await expect(page.locator('.helper-button')).toHaveCSS('font-size', '16px');
});
