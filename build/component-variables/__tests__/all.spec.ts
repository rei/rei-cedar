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

interface ComponentExamples {
  name: string;
  examples: { name: string; html: string; scss: string[] }[];
}

const root = fileURLToPath(new URL('../../../', import.meta.url));
const packageRoot = path.resolve(root, '../rei-cedar-component-variables');
const requirePackage = createRequire(import.meta.url);
const examples: Record<string, ComponentExamples> = requirePackage(
  path.join(packageRoot, 'examples'),
);
const options = {
  loadPaths: [path.join(packageRoot, 'node_modules')],
  quietDeps: true,
  logger: sass.Logger.silent,
};
function compile(entry: string) {
  return sass.compileString(
    `@use '${entry}' as *;\n${readFileSync(path.join(packageRoot, 'dist/docs/index.scss'), 'utf8')}`,
    options,
  ).css;
}
function rules(css: string) {
  const parsed = postcss.parse(css);
  parsed.walkComments((comment) => comment.remove());
  return parsed.toString().trim();
}

describe('component variable export', () => {
  it('exports all documented components without separate recipe files', () => {
    expect(Object.keys(examples)).toHaveLength(19);
    const files = readdirSync(path.join(packageRoot, 'dist/scss'));
    expect(Object.keys(examples).sort()).toEqual(
      files
        .filter((name) => name.startsWith('Cdr') && name.endsWith('.vars.scss'))
        .map((name) => name.replace('.vars.scss', ''))
        .sort(),
    );
    expect(files.filter((name) => name.endsWith('.recipe.scss'))).toEqual([]);
    expect(globSync('src/components/**/*.recipe.scss', { cwd: root })).toEqual([]);
  });

  it('preserves the public mixins of each source entrypoint', () => {
    for (const component of Object.keys(examples)) {
      const [source] = globSync(`src/components/**/styles/vars/${component}.vars.scss`, {
        cwd: root,
        absolute: true,
      });
      const names = [...readFileSync(source, 'utf8').matchAll(/^@mixin\s+([\w-]+)/gm)]
        .map((match) => match[1])
        .filter((name) => !/^[_-]/.test(name));
      expect(names.length, component).toBeGreaterThan(0);
      const entry = path.join(packageRoot, `dist/scss/${component}.vars.scss`);
      const checks = names
        .map(
          (name) => `@if not meta.mixin-exists('${name}', component) { @error '${name} missing'; }`,
        )
        .join('\n');
      expect(
        () =>
          sass.compileString(`@use 'sass:meta'; @use '${entry}' as component; ${checks}`, options),
        component,
      ).not.toThrow();
    }
  });

  it('compiles every documented example identically through the index and detached bundle', () => {
    const directory = mkdtempSync(path.join(tmpdir(), 'cedar-variables-'));
    try {
      const index = compile(path.join(packageRoot, 'dist/scss/index.scss'));
      const bundle = path.join(directory, 'bundle.scss');
      copyFileSync(path.join(packageRoot, 'dist/scss/cedar-component-variables.scss'), bundle);
      expect(rules(compile(bundle))).toBe(rules(index));
      expect(index).not.toMatch(/undefined|\[object Object\]|NaN/);
      for (const component of Object.values(examples)) {
        for (const example of component.examples)
          expect(index).toContain(`.${component.name}-${example.name}`);
      }
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  it('supplies contract defaults and token fallbacks while preserving overrides', () => {
    const contract: ComponentTokenContract = {
      component: 'cdr-example',
      prefix: '--cdr-example',
      defaults: { height: literal('8rem') },
      variants: {},
    };
    const result = standaloneScss(
      '.x { height: var(--cdr-example-height); color: var(--cdr-text-test); width: var(--cdr-example-width, 10px); }',
      contract,
      '  --cdr-text-test: #123456;\n',
    );
    expect(result).toContain('var(--cdr-example-height, map.get(maps.$example-defaults, height))');
    expect(result).toContain('var(--cdr-example-width, 10px)');
    expect(result).toContain('var(--cdr-text-test, #123456)');
  });

  it('supplies every referenced contract default without Vue initialization', async () => {
    for (const component of Object.keys(examples)) {
      const [source] = globSync(`src/components/**/${component}.tokens.ts`, {
        cwd: root,
        absolute: true,
      });
      if (!source) continue;
      const { default: contract }: { default: ComponentTokenContract } = await import(source);
      const vars = readFileSync(path.join(packageRoot, `dist/scss/${component}.vars.scss`), 'utf8');
      for (const key of Object.keys(contract.defaults))
        expect(vars, `${component}: ${key}`).not.toContain(`var(${contract.prefix}-${key})`);
    }
  });
});
