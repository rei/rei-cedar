import path from 'node:path';
import type { ComponentTokenContract } from './types';

/** The contract owns the public scopes; the shared Sass recipe owns CSS behavior. */
export function generatePressableMixins(contract: ComponentTokenContract, source: string): string {
  const prefix = contract.component;
  const name = path.basename(source, '.tokens.ts');
  const lines = [
    '// GENERATED FILE — do not edit manually',
    `// Source: ${source}`,
    '// Regenerate: pnpm build:maps',
    `@use './${name}.recipe' as recipe;`,
    `@forward './${name}.recipe';`,
    '',
  ];

  for (const [variant, values] of Object.entries(contract.variants)) {
    lines.push(
      `@mixin ${prefix}-${variant}-mixin() {`,
      `  @include recipe.${prefix}-apply-variant(${variant});`,
      '}',
      '',
    );
    if (values.rest.surface && values.rest.text && values.rest.border) {
      lines.push(
        `@mixin ${prefix}-${variant}-elevated-mixin() {`,
        `  @include recipe.${prefix}-elevated-variant(${variant});`,
        '}',
        '',
      );
    }
  }

  for (const size of Object.keys(contract.sizes ?? {})) {
    lines.push(
      `@mixin ${prefix}-${size}-mixin($breakpoint: null) {`,
      `  @include recipe.${prefix}-at-breakpoint($breakpoint) {`,
      `    @include recipe.${prefix}-apply-size(${size});`,
      '  }',
      '}',
      '',
      `@mixin ${prefix}-base-text-mixin-${size}() {`,
      `  @include recipe.${prefix}-base-text(${size});`,
      '}',
      '',
      `@mixin ${prefix}-icon-${size}-mixin() {`,
      `  @include recipe.${prefix}-icon-size(${size});`,
      '}',
      '',
    );
    for (const side of ['left', 'right']) {
      lines.push(
        `@mixin ${prefix}-has-icon-${side}-${size}-mixin() {`,
        `  @include recipe.${prefix}-icon-padding(${size}, ${side});`,
        '}',
        '',
      );
    }
  }

  return lines.join('\n');
}
