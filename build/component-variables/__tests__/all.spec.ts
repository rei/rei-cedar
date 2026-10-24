import { describe, expect, it } from 'vitest';
import { copyFileSync, mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as sass from 'sass';
import postcss from 'postcss';
import { globSync } from 'glob';
import { standaloneScss } from '../standalone';
import type { ComponentTokenContract } from '../../component-tokens/types';
import { literal } from '../../component-tokens/types';
import type { ButtonExample } from '../button';

interface ComponentExamples {
  name: string;
  examples: ButtonExample[];
}

const root = fileURLToPath(new URL('../../../', import.meta.url));
const packageRoot = path.resolve(root, '../rei-cedar-component-variables');
const require = createRequire(import.meta.url);
const examples: Record<string, ComponentExamples> = require(path.join(packageRoot, 'examples'));
// Public API captured from component-variables v11 before the semantic migration.
const legacy: Record<string, { mixins: string[]; hooks: string[] }> = JSON.parse(
  readFileSync(new URL('./fixtures/legacy-component-api.json', import.meta.url), 'utf8'),
);
const options = {
  loadPaths: [path.join(packageRoot, 'node_modules')],
  quietDeps: true,
  logger: sass.Logger.silent,
};
function compile(entry: string, legacy = false) {
  return sass.compileString(
    `${legacy ? '@import' : '@use'} '${entry}'${legacy ? '' : ' as *'};\n` +
      readFileSync(path.join(packageRoot, 'dist/docs/index.scss'), 'utf8'),
    { ...options, silenceDeprecations: ['import'] },
  ).css;
}
function rules(css: string) {
  const parsed = postcss.parse(css);
  parsed.walkComments((comment) => comment.remove());
  return parsed.toString().trim();
}

describe('all component variables', () => {
  it('retains every previous public mixin and component hook', () => {
    const scss = readdirSync(path.join(packageRoot, 'dist/scss'))
      .filter((name) => name.endsWith('.scss'))
      .map((name) => readFileSync(path.join(packageRoot, 'dist/scss', name), 'utf8'))
      .join('\n');
    for (const [component, api] of Object.entries(legacy)) {
      const entry = path.join(packageRoot, `dist/scss/${component}.vars.scss`);
      const checks = api.mixins
        .map(
          (name) => `@if not meta.mixin-exists('${name}', component) { @error '${name} missing'; }`,
        )
        .join('\n');
      expect(
        () =>
          sass.compileString(`@use 'sass:meta'; @use '${entry}' as component; ${checks}`, options),
        component,
      ).not.toThrow();
      for (const hook of api.hooks) {
        expect(scss, hook).toMatch(new RegExp(`var\\(\\s*${hook}\\s*[,)]`));
      }
    }
  });

  it('exports every documented component, including checkbox, radio, caption and quote', () => {
    expect(Object.keys(examples)).toHaveLength(19);
    expect(Object.keys(examples).sort()).toEqual(
      readdirSync(path.join(packageRoot, 'dist/scss'))
        .filter((name) => name.startsWith('Cdr') && name.endsWith('.vars.scss'))
        .map((name) => name.replace('.vars.scss', ''))
        .sort(),
    );
    for (const [name, component] of Object.entries(examples)) {
      const entry = path.join(packageRoot, `dist/scss/${name}.vars.scss`);
      expect(readFileSync(entry, 'utf8'), name).toMatch(/@mixin/);
      expect(component.examples.length, name).toBeGreaterThan(0);
    }
  });

  it('compiles all documented examples through index, legacy import and a detached bundle', () => {
    const directory = mkdtempSync(path.join(tmpdir(), 'cedar-all-'));
    try {
      const index = compile(path.join(packageRoot, 'dist/scss/index.scss'));
      const bundle = path.join(directory, 'bundle.scss');
      copyFileSync(path.join(packageRoot, 'dist/scss/cedar-component-variables.scss'), bundle);
      expect(rules(compile(bundle))).toBe(rules(index));
      expect(rules(compile(path.join(packageRoot, 'dist/scss/index.scss'), true))).toBe(
        rules(index),
      );
      expect(index).not.toMatch(/undefined|\[object Object\]|NaN/);
      for (const component of Object.values(examples)) {
        for (const example of component.examples) {
          expect(index).toContain(`.${component.name}-${example.name}`);
        }
      }
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  it('generates default fallbacks from contract keys and preserves existing overrides', () => {
    const contract: ComponentTokenContract = {
      component: 'cdr-example',
      prefix: '--cdr-example',
      defaults: { height: literal('8rem') },
      variants: {},
    };
    const result = standaloneScss(
      '.x { height: var(--cdr-example-height); color: var(--cdr-text-test); width: var(--cdr-example-width, 10px); }',
      contract,
      '.cdr-example { --cdr-text-test: #123456; --cdr-example-height: 8rem; }',
    );
    expect(result).toContain('var(--cdr-example-height, map.get(maps.$example-defaults, height))');
    expect(result).toContain('var(--cdr-example-width, 10px)');
    // Shims are extracted from standalone declaration lines, never selectors or other rules.
    expect(standaloneScss('var(--cdr-text-test)', contract, '  --cdr-text-test: #123456;\n')).toBe(
      'var(--cdr-text-test, #123456)',
    );
  });

  it('supplies every referenced migrated structural default without Vue initialization', async () => {
    for (const component of Object.keys(examples).filter((name) => name !== 'CdrButton')) {
      const [source] = globSync(`src/components/**/${component}.tokens.ts`, {
        cwd: root,
        absolute: true,
      });
      if (!source) continue;
      const { default: contract }: { default: ComponentTokenContract } = await import(source);
      const vars = readFileSync(path.join(packageRoot, `dist/scss/${component}.vars.scss`), 'utf8');
      for (const key of Object.keys(contract.defaults ?? {})) {
        expect(vars, `${component}: ${key}`).not.toContain(`var(${contract.prefix}-${key})`);
      }
    }
  });
});
