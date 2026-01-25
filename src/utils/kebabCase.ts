/**
 * Converts a string to kebab-case format.
 *
 * Transforms camelCase, PascalCase, snake_case, and space-separated strings
 * into lowercase hyphen-separated format.
 *
 * @param str - The string to convert
 * @returns The kebab-cased string
 *
 * @example
 * kebabCase('backgroundColor') // => 'background-color'
 * kebabCase('PascalCase') // => 'pascal-case'
 * kebabCase('snake_case_string') // => 'snake-case-string'
 * kebabCase('Space Separated Text') // => 'space-separated-text'
 * kebabCase('already-kebab') // => 'already-kebab'
 */
export default function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}
