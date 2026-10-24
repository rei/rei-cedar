// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { mkdtempSync, readFileSync, rmSync, writeFileSync, copyFileSync } from 'node:fs';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import * as sass from 'sass';
import postcss from 'postcss';
import contract from '../../../src/components/button/CdrButton.tokens';
import { generateButtonMixins } from '../../component-tokens/button-mixins';
import { generateScss } from '../../generate-component-maps';
import { buildButtonCSS, compileButtonExamples, sassOptions } from '../button';

const root = fileURLToPath(new URL('../../../', import.meta.url));
const packageRoot = path.resolve(root, '../rei-cedar-component-variables');
const entry = path.join(packageRoot, 'dist/scss/CdrButton.vars.scss');
const source = path.join(root, 'src/components/button/CdrButton.tokens.ts');
const { examples } = JSON.parse(
  readFileSync(path.join(packageRoot, 'examples/cdr-button.json'), 'utf8'),
);
const compile = (body: string, file = entry) =>
  sass.compileString(`@use '${file}' as button; ${body}`, sassOptions).css;

const legacyHooks: string[] = JSON.parse(
  readFileSync(new URL('./fixtures/legacy-button-hooks.json', import.meta.url), 'utf8'),
);

function withoutLegacyHooks(value: string): string {
  for (const hook of legacyHooks) {
    const needle = `var(${hook}, `;
    let start: number;
    while ((start = value.indexOf(needle)) !== -1) {
      let depth = 1;
      let end = start + 4;
      for (; depth > 0; end++) {
        if (value[end] === '(') depth++;
        if (value[end] === ')') depth--;
      }
      value =
        value.slice(0, start) + value.slice(start + needle.length, end - 1) + value.slice(end);
    }
  }
  return value;
}

describe('generated CdrButton component variables', () => {
  it('preserves every public mixin from component-variables v11', () => {
    const legacy = [
      'base',
      'base-icon',
      'primary',
      'secondary',
      'dark',
      'sale',
      'link',
      'primary-elevated',
      'secondary-elevated',
      'dark-elevated',
      'sale-elevated',
      'full-width',
      'icon-only',
      'with-background',
      'small',
      'medium',
      'large',
      ...['small', 'medium', 'large'].flatMap((size) => [
        `has-icon-left-${size}`,
        `has-icon-right-${size}`,
        `icon-${size}`,
      ]),
    ].map((name) => `cdr-button-${name}-mixin`);
    legacy.push('cdr-button-base-text-mixin-small', 'cdr-button-base-text-mixin-medium');
    const checks = legacy
      .map((name) => `@if not meta.mixin-exists('${name}', button) { @error '${name} missing'; }`)
      .join('\n');
    expect(() =>
      sass.compileString(`@use 'sass:meta'; @use '${entry}' as button; ${checks}`, sassOptions),
    ).not.toThrow();
    for (const name of legacy) {
      expect(
        compile(`.consumer { @include button.cdr-button-base-mixin; @include button.${name}; }`),
      ).toContain('.consumer');
    }
  });

  it('compiles direct, index, bundle and legacy @import entrypoints', () => {
    const body =
      '.consumer { @include button.cdr-button-base-mixin; @include button.cdr-button-primary-mixin; }';
    for (const name of ['CdrButton.vars.scss', 'index.scss', 'cedar-component-variables.scss']) {
      const file = path.join(packageRoot, 'dist/scss', name);
      expect(compile(body, file)).toContain('--cdr-action-surface-brand: #143528');
      const css = sass.compileString(
        `@import '${file}'; .consumer { @include cdr-button-base-mixin; @include cdr-button-primary-mixin; }`,
        { ...sassOptions, silenceDeprecations: ['import'] },
      ).css;
      expect(withoutLegacyHooks(css)).toContain(
        'var(--cdr-color-button-surface, var(--cdr-action-surface-brand))',
      );
    }
  });

  it('retains all 108 legacy component hooks without restoring deprecated token defaults', () => {
    const css = compileButtonExamples(examples, entry);
    expect(legacyHooks).toHaveLength(108);
    for (const hook of legacyHooks) expect(css, hook).toContain(`var(${hook},`);
    expect(css).not.toContain('var(--cdr-color-background-button-');
  });

  it('works with unconfigured Dart Sass and keeps the bundle self-contained', () => {
    const options = { loadPaths: [path.join(packageRoot, 'node_modules')], quietDeps: true };
    for (const file of [entry, path.join(packageRoot, 'dist/scss/index.scss')]) {
      expect(() =>
        sass.compileString(
          `@use '${file}' as button; .consumer { @include button.cdr-button-base-mixin; @include button.cdr-button-primary-mixin; }`,
          { ...options, loadPaths: [root, ...options.loadPaths] },
        ),
      ).not.toThrow();
    }
    const directory = mkdtempSync(path.join(tmpdir(), 'cedar-bundle-'));
    try {
      const bundle = path.join(directory, 'button.scss');
      copyFileSync(path.join(packageRoot, 'dist/scss/cedar-component-variables.scss'), bundle);
      expect(() =>
        sass.compileString(
          `@use '${bundle}' as button; .consumer { @include button.cdr-button-base-mixin; @include button.cdr-button-primary-mixin; }`,
          { ...options, loadPaths: [root, ...options.loadPaths] },
        ),
      ).not.toThrow();
      const clean = (css: string) => {
        const root = postcss.parse(css);
        root.walkComments((comment) => comment.remove());
        return root.toString().trim();
      };
      expect(clean(compileButtonExamples(examples, bundle))).toBe(
        clean(compileButtonExamples(examples, entry)),
      );
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  it('compiles all documented combinations without a Vue component', () => {
    const css = compileButtonExamples(examples, entry);
    expect(css).toContain('.cdr-button-with-background:focus-visible');
    expect(css).toContain('.cdr-button-sale-elevated[disabled]');
    expect(css).not.toMatch(/undefined|\[object Object\]|NaN/);
  });

  it('rejects misspelled variants, sizes and breakpoints', () => {
    for (const operation of [
      'apply-variant(missing)',
      'apply-size(missing)',
      'small-mixin(missing)',
    ]) {
      expect(() => compile(`.consumer { @include button.cdr-button-${operation}; }`)).toThrow(
        /Unknown CdrButton/,
      );
    }
  });

  it('preserves the unmigrated Card fallback when tokens are upgraded', () => {
    for (const file of ['index.scss', 'cedar-component-variables.scss']) {
      const css = compile(
        '.card { @include button.cdr-card-base-mixin; }',
        path.join(packageRoot, 'dist/scss', file),
      );
      expect(css).toContain('var(--cdr-color-background-primary, #ffffff)');
    }
  });

  it('generates working wrappers when the contract gains a variant and a size', () => {
    const updated = structuredClone(contract);
    updated.variants.test = updated.variants.sale;
    updated.sizes!.compact = updated.sizes!.small;
    const directory = mkdtempSync(path.join(tmpdir(), 'cedar-button-'));
    try {
      writeFileSync(
        path.join(directory, 'CdrButton.vars.scss'),
        generateButtonMixins(updated, source),
      );
      writeFileSync(path.join(directory, 'CdrButton.maps.scss'), generateScss(updated, source));
      copyFileSync(
        path.join(root, 'src/components/button/styles/vars/CdrButton.recipe.scss'),
        path.join(directory, 'CdrButton.recipe.scss'),
      );
      const css = compile(
        '.consumer { @include button.cdr-button-base-mixin; @include button.cdr-button-test-mixin; @include button.cdr-button-compact-mixin; }',
        path.join(directory, 'CdrButton.vars.scss'),
      );
      expect(css).toContain('--cdr-color-button-test-surface');
      expect(css).toContain('--cdr-button-font-size: 1.4rem');
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  it('matches every Vue variant declaration and state, including icon structure', () => {
    const vueRules = new Map<string, string[]>();
    postcss.parse(buildButtonCSS()).walkRules((rule) => {
      vueRules.set(
        rule.selector,
        rule.nodes.filter((node) => node.type === 'decl').map((node) => node.toString()),
      );
    });
    for (const variant of Object.keys(contract.variants)) {
      const css = compile(
        `.cdr-button { @include button.cdr-button-base-mixin; } .cdr-button--${variant} { @include button.cdr-button-${variant}-mixin; }`,
      );
      postcss.parse(css).walkRules((rule) => {
        const declarations = rule.nodes
          .filter((node) => node.type === 'decl')
          .map((node) => node.toString());
        expect(declarations.map(withoutLegacyHooks), rule.selector).toEqual(
          vueRules.get(rule.selector)?.map(withoutLegacyHooks),
        );
      });
    }
  });
});
