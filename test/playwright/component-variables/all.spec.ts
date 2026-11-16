import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import * as sass from 'sass';

function tokenCSS(file: string): string {
  return readFileSync(file, 'utf8').replace(/@import\s+"([^"]+)";/g, (_, dependency: string) =>
    tokenCSS(path.resolve(path.dirname(file), dependency)),
  );
}

const requirePackage = createRequire(path.resolve('package.json'));
const packageRoot = path.resolve('../rei-cedar-component-variables');
const examples: Record<string, { examples: { html: string }[] }> = requirePackage(
  path.join(packageRoot, 'examples'),
);
const tokens = tokenCSS(requirePackage.resolve('@rei/cdr-tokens/css'));
const css = sass.compileString(
  `@use '${packageRoot}/dist/scss/index.scss' as *;
  ${readFileSync(path.join(packageRoot, 'dist/docs/index.scss'), 'utf8')}
  .card { @include cdr-card-base-mixin; }
  .large-input { @include cdr-input-base-mixin; @include cdr-input-large-mixin; }
  .large-select { @include cdr-select-base-mixin; @include cdr-select-large-mixin; }
  .table { @include cdr-table-base-mixin; @include cdr-table-border-mixin; }
  html { font-size: 10px; } * { transition: none !important; }`,
  {
    loadPaths: [path.join(packageRoot, 'node_modules')],
    quietDeps: true,
    logger: sass.Logger.silent,
  },
).css;

test('all semantic dependencies and standalone defaults work without Vue', async ({ page }) => {
  await page.setContent(`<style>${tokens}\n${css}</style>
    <main id="fixture"><div class="card">Card</div>
    <div style="--cdr-card-border-radius: 19px"><div class="card" id="override">Override</div></div>
    <button class="cdr-chip-default">Chip</button>
    <input class="large-input"><select class="large-select"><option>Select</option></select>
    <table class="table"><tr><td>One</td></tr><tr><td>Two</td></tr></table>
    ${examples.CdrLink.examples.map((example: { html: string }) => example.html).join('\n')}
    <div class="cdr-radio-dynamic"><div class="cdr-radio-figure"></div></div>
    ${examples.CdrCaption.examples[0].html}
    ${examples.CdrQuote.examples[0].html}
    </main><div hidden>${Object.values(examples)
      .map((component) =>
        component.examples.map((example: { html: string }) => example.html).join(''),
      )
      .join('')}</div>`);
  const fixture = page.locator('#fixture');
  const semanticReferences = [
    ...new Set(
      [
        ...css.matchAll(/var\((--cdr-(?:action|control|feedback|surface|text|border)-[\w-]+)\)/g),
      ].map((match) => match[1]),
    ),
  ];
  const unresolved = await page.evaluate((names) => {
    const styles = [...document.querySelectorAll('*')].map((node) => getComputedStyle(node));
    return names.filter((name) => !styles.some((style) => style.getPropertyValue(name).trim()));
  }, semanticReferences);
  expect(unresolved).toEqual([]);
  await expect(fixture.locator('.card').first()).toHaveCSS('border-radius', '4px');
  await expect(fixture.locator('#override')).toHaveCSS('border-radius', '19px');
  await expect(fixture.locator('.cdr-chip-default')).toHaveCSS('font-size', '14px');
  await expect(fixture.locator('.large-input')).toHaveCSS('height', '48px');
  await expect(fixture.locator('.large-select')).toHaveCSS('height', '48px');
  await expect(fixture.locator('.table tr + tr td')).toHaveCSS('border-top-width', '1px');
  await expect(fixture.locator('.table tr + tr td')).toHaveCSS('border-top-style', 'solid');
  await expect(fixture.locator('.cdr-link-default')).toHaveCSS('display', 'inline-flex');
  await expect(fixture.locator('.cdr-link-default')).toHaveCSS('text-decoration-line', 'underline');
  await fixture.locator('.cdr-link-default').hover();
  await expect(fixture.locator('.cdr-link-default')).toHaveCSS('text-decoration-line', 'none');
  await expect(fixture.locator('.cdr-link-inherit-color')).toHaveCSS('color', 'rgb(102, 51, 153)');
  await fixture.locator('.cdr-link-inherit-color').hover();
  await expect(fixture.locator('.cdr-link-inherit-color')).toHaveCSS('color', 'rgb(102, 51, 153)');
  const neutralColor = await fixture
    .locator('.cdr-link-neutral')
    .evaluate((node) => getComputedStyle(node).color);
  await fixture.locator('.cdr-link-neutral').hover();
  await expect(fixture.locator('.cdr-link-neutral')).toHaveCSS('color', neutralColor);
  await fixture
    .locator('.cdr-link-default')
    .evaluate((node: HTMLElement) => node.style.setProperty('--cdr-link-text', 'blue'));
  await expect(fixture.locator('.cdr-link-default')).toHaveCSS('color', 'rgb(0, 0, 255)');
  await expect(fixture.locator('.cdr-caption-default')).toHaveCSS('max-width', '530px');
  await expect(fixture.locator('.cdr-caption-default p')).toHaveCSS('margin-top', '0px');
  await expect(fixture.locator('.cdr-caption-default cite')).toHaveCSS('margin-top', '8px');
  await expect(fixture.locator('.cdr-quote-default p')).toHaveCSS('margin-top', '0px');
  await expect(fixture.locator('.cdr-quote-default cite')).toHaveCSS('padding-top', '16px');
  await expect(fixture.locator('.cdr-radio-figure')).toHaveCSS('border-radius', '100%');
});
