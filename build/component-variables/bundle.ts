import { readFileSync } from 'node:fs';
import path from 'node:path';

/** Retain the distributable single-file API while flattening local Sass modules. */
export function buildScssBundle(directory: string, components: string[]): string {
  const seen = new Set<string>();
  const chunks: string[] = [];
  function visit(name: string) {
    if (seen.has(name)) return;
    seen.add(name);
    let content = readFileSync(path.join(directory, name), 'utf8');
    const namespaces: string[] = [];
    content = content.replace(
      /@(?:use|forward)\s+['"]\.\/([^'"]+)['"](?:\s+as\s+([\w-]+))?\s*;/g,
      (_, dependency: string, namespace: string | undefined) => {
        visit(dependency.endsWith('.scss') ? dependency : `${dependency}.scss`);
        if (namespace) namespaces.push(namespace);
        return '';
      },
    );
    // Only the common token and Sass map modules are external in these entrypoints.
    content = content.replace(
      /@use\s+['"](?:@rei\/cdr-tokens\/(?:scss|dist\/rei-dot-com\/scss\/cdr-tokens.scss)|sass:map)['"](?:\s+as\s+\w+)?\s*;/g,
      '',
    );
    for (const namespace of namespaces) content = content.replaceAll(`${namespace}.`, '');
    chunks.push(content.trim());
  }
  for (const component of components) visit(`${component}.vars.scss`);
  return (
    "// GENERATED FILE — pnpm build:variables:button\n@use 'sass:map';\n@use '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens.scss' as tokens;\n\n" +
    chunks.join('\n\n') +
    '\n'
  );
}
