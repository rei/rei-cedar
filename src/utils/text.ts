/**
 * Capitalizes the first letter of a string.
 *
 * @param text - The string to capitalize
 * @returns The string with the first letter capitalized
 *
 * @example
 * capitalize('hello') // => 'Hello'
 * capitalize('world') // => 'World'
 */
export const capitalize = (text: string): string =>
  String(text[0]).toUpperCase() + String(text).slice(1);
