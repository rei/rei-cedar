import type { ComponentTokenContract } from './types';

/** The contract owns the public scopes; the shared Sass recipe owns CSS behavior. */
export function generateButtonMixins(contract: ComponentTokenContract, source: string): string {
  const lines = [
    '// GENERATED FILE — do not edit manually',
    `// Source: ${source}`,
    '// Regenerate: pnpm build:maps',
    "@use './CdrButton.recipe' as recipe;",
    "@forward './CdrButton.recipe';",
    '',
  ];

  for (const [variant, values] of Object.entries(contract.variants)) {
    lines.push(
      `@mixin cdr-button-${variant}-mixin() {`,
      `  @include recipe.cdr-button-apply-variant(${variant});`,
      '}',
      '',
    );
    if (values.rest.surface && values.rest.text && values.rest.border) {
      lines.push(
        `@mixin cdr-button-${variant}-elevated-mixin() {`,
        `  @include recipe.cdr-button-elevated-variant(${variant});`,
        '}',
        '',
      );
    }
  }

  for (const size of Object.keys(contract.sizes ?? {})) {
    lines.push(
      `@mixin cdr-button-${size}-mixin($breakpoint: null) {`,
      '  @include recipe.cdr-button-at-breakpoint($breakpoint) {',
      `    @include recipe.cdr-button-apply-size(${size});`,
      '  }',
      '}',
      '',
      `@mixin cdr-button-base-text-mixin-${size}() {`,
      `  @include recipe.cdr-button-base-text(${size});`,
      '}',
      '',
      `@mixin cdr-button-icon-${size}-mixin() {`,
      `  @include recipe.cdr-button-icon-size(${size});`,
      '}',
      '',
    );
    for (const side of ['left', 'right']) {
      lines.push(
        `@mixin cdr-button-has-icon-${side}-${size}-mixin() {`,
        `  @include recipe.cdr-button-icon-padding(${size}, ${side});`,
        '}',
        '',
      );
    }
  }

  return lines.join('\n');
}
