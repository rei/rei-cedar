import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { preprocessCSS, resolveConfig } from 'vite';

/**
 * Output-parity tests: every Cedar-owned mixin (src/mixins/*.scss) must compile
 * to the same CSS as the deprecated @rei/cdr-tokens utility mixins it replaces,
 * so consumers can migrate by changing only their @use path.
 */

// vitest runs with cwd = repo root.
const root = process.cwd();
const require = createRequire(path.join(root, 'package.json'));
// Resolved through the package exports map; the deprecated utility mixins
// live in the `utilities/` sibling of the barrel it points at.
const utilDir = path.join(path.dirname(require.resolve('@rei/cdr-tokens/scss')), 'utilities');
const newDir = path.join(root, 'src/mixins');

// Virtual anchor file (never written): entries are compiled as strings with
// relative @use paths resolved against this location inside the repo.
const anchor = path.join(newDir, '__tests__/.parity-anchor.scss');

type Mixin = { name: string; content: boolean };

function parse(file: string): { mixins: Mixin[]; placeholders: string[] } {
  const src = fs.readFileSync(file, 'utf8');
  const mixins: Mixin[] = [];
  // Handles `@mixin name {`, `@mixin name() {`, and `@mixin name($p: v) {`.
  // Inner braces are always indented, so the first column-0 `}` ends the mixin.
  for (const m of src.matchAll(/@mixin ([\w-]+)\s*(?:\([^)]*\))?\s*\{([\s\S]*?)\n\}/g)) {
    mixins.push({ name: m[1], content: m[2].includes('@content') });
  }
  const placeholders = [...src.matchAll(/^%([\w-]+) \{/gm)].map((x) => x[1]);
  return { mixins, placeholders };
}

type Group = { alias: string; spec: string; files: string[] };

type EntryOptions = {
  /** Restrict compiled mixins to names matching (e.g. /-mq-/ on the combined deprecated file). */
  only?: RegExp;
  /** Extra include appended after the generated ones (e.g. a named container). */
  namedInclude?: string;
};

function entry(groups: Group[], opts: EntryOptions = {}): string {
  let code = '';
  const includes: string[] = [];
  const extensions: string[] = [];
  for (const g of groups) {
    code += `@use '${g.spec}' as ${g.alias};\n`;
    for (const file of g.files) {
      const { mixins, placeholders } = parse(file);
      for (const mx of mixins) {
        if (opts.only && !opts.only.test(mx.name)) continue;
        includes.push(
          mx.content
            ? `  @include ${g.alias}.${mx.name} { .probe { color: red; } }`
            : `  @include ${g.alias}.${mx.name};`,
        );
      }
      for (const p of placeholders) extensions.push(`.e-${p} { @extend %${p}; }`);
    }
  }
  if (opts.namedInclude) includes.push(`  ${opts.namedInclude}`);
  return `${code}\n.t {\n${includes.join('\n')}\n}\n${extensions.join('\n')}\n`;
}

let cachedConfig: Awaited<ReturnType<typeof resolveConfig>> | undefined;
async function compile(code: string): Promise<string> {
  cachedConfig ??= await resolveConfig({ root, configFile: false, logLevel: 'error' }, 'serve');
  const config = { ...cachedConfig };
  config.css = {
    ...config.css,
    preprocessorOptions: {
      ...config.css?.preprocessorOptions,
      scss: { charset: false, quietDeps: true, api: 'modern' },
    },
  };
  const out = await preprocessCSS(code, anchor, config);
  // Drop CSS comment lines (deprecation headers exist only on the old side)
  // and normalize blank lines, then compare byte-for-byte.
  return out.code
    .split('\n')
    .filter((line) => !/^\s*\/\*/.test(line))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function names(file: string): string[] {
  return parse(file)
    .mixins.map((m) => m.name)
    .sort();
}

function placeholders(file: string): string[] {
  return parse(file).placeholders.sort();
}

const oldFiles = {
  breakpoint: path.join(utilDir, 'cdr-breakpoint-mixins.scss'),
  display: path.join(utilDir, 'cdr-display-mixins.scss'),
  type: path.join(utilDir, 'cdr-type-mixins.scss'),
};
const newFiles = {
  breakpoints: path.join(newDir, 'breakpoints.scss'),
  containerQueries: path.join(newDir, 'container-queries.scss'),
  display: path.join(newDir, 'display.scss'),
  type: path.join(newDir, 'type.scss'),
};

describe('mixin output parity with deprecated @rei/cdr-tokens mixins', () => {
  // Guard against a vacuous pass: if parsing ever broke, both sides would
  // render empty CSS and compare equal. These files are deprecated and frozen.
  it('parses the expected mixin inventory from both sides', () => {
    expect(names(oldFiles.breakpoint)).toHaveLength(22); // 11 media queries + 11 container queries
    expect(names(newFiles.breakpoints)).toHaveLength(11);
    expect(names(newFiles.containerQueries)).toHaveLength(11);
    expect(names(oldFiles.display)).toHaveLength(6);
    expect(placeholders(oldFiles.display)).toHaveLength(2);
    expect(names(oldFiles.type)).toHaveLength(77);
    expect(placeholders(oldFiles.type)).toHaveLength(77);
  });

  it('covers every deprecated breakpoint + container-query mixin', () => {
    const oldNames = names(oldFiles.breakpoint);
    const newNames = [...names(newFiles.breakpoints), ...names(newFiles.containerQueries)].sort();
    expect(newNames).toEqual(oldNames);
    expect(names(newFiles.breakpoints).every((n) => n.includes('-mq-'))).toBe(true);
    expect(names(newFiles.containerQueries).every((n) => n.includes('-cq-'))).toBe(true);
  });

  it('covers every deprecated display mixin and placeholder', () => {
    expect(names(newFiles.display)).toEqual(names(oldFiles.display));
    expect(placeholders(newFiles.display)).toEqual(placeholders(oldFiles.display));
  });

  it('covers every deprecated typography mixin and placeholder', () => {
    expect(names(newFiles.type)).toEqual(names(oldFiles.type));
    expect(placeholders(newFiles.type)).toEqual(placeholders(oldFiles.type));
  });

  it('breakpoint media queries compile identically', async () => {
    const oldCss = await compile(
      entry(
        [
          {
            alias: 'm',
            spec: '@rei/cdr-tokens/scss/breakpoint-mixins',
            files: [oldFiles.breakpoint],
          },
        ],
        { only: /-mq-/ },
      ),
    );
    const newCss = await compile(
      entry([{ alias: 'bp', spec: '../breakpoints', files: [newFiles.breakpoints] }]),
    );
    expect(newCss).toBe(oldCss);
  }, 60000);

  it('container queries compile identically (default and named container)', async () => {
    const named = (ns: string) =>
      `@include ${ns}.cdr-sm-cq-up('sidebar') { .probe { color: blue; } }`;
    const oldCss = await compile(
      entry(
        [
          {
            alias: 'm',
            spec: '@rei/cdr-tokens/scss/breakpoint-mixins',
            files: [oldFiles.breakpoint],
          },
        ],
        { only: /-cq-/, namedInclude: named('m') },
      ),
    );
    const newCss = await compile(
      entry([{ alias: 'cq', spec: '../container-queries', files: [newFiles.containerQueries] }], {
        namedInclude: named('cq'),
      }),
    );
    expect(newCss).toBe(oldCss);
  }, 60000);

  it('display/utility helpers compile identically (mixins and @extend placeholders)', async () => {
    const oldCss = await compile(
      entry([
        { alias: 'm', spec: '@rei/cdr-tokens/scss/display-mixins', files: [oldFiles.display] },
      ]),
    );
    const newCss = await compile(
      entry([{ alias: 'm', spec: '../display', files: [newFiles.display] }]),
    );
    expect(newCss).toBe(oldCss);
  }, 60000);

  it('typography mixins compile identically (mixins and @extend placeholders)', async () => {
    const oldCss = await compile(
      entry([{ alias: 'm', spec: '@rei/cdr-tokens/scss/type-mixins', files: [oldFiles.type] }]),
    );
    const newCss = await compile(entry([{ alias: 'm', spec: '../type', files: [newFiles.type] }]));
    expect(newCss).toBe(oldCss);
  }, 60000);

  it('barrel migration compiles identically (@use tokens barrel → @use @rei/cedar/mixins)', async () => {
    const allNew = [
      newFiles.breakpoints,
      newFiles.containerQueries,
      newFiles.display,
      newFiles.type,
    ];
    const allOld = [oldFiles.breakpoint, oldFiles.display, oldFiles.type];
    const oldCss = await compile(
      entry([{ alias: 'm', spec: '@rei/cdr-tokens/scss', files: allOld }]),
    );
    const newCss = await compile(entry([{ alias: 'm', spec: '../index', files: allNew }]));
    expect(newCss).toBe(oldCss);
  }, 60000);
});
