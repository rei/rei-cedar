/**
 * Maps an array of class names to scoped class names from a given
 * styles object. Flattens and splits only string values, maps to
 * scoped class names, removes undefined or falsy values, and joins
 * to a single string.
 *
 * @example
 * mapClasses(styles, 'cdr-button', 'cdr-button--primary') => 'cdr-button cdr-button--primary'
 * @example
 * mapClasses(styles, ['cdr-button', 'cdr-button--primary']) => 'cdr-button cdr-button--primary'
 * @example
 * mapClasses(styles, 'cdr-button', false, 'cdr-button--primary', null, undefined) => 'cdr-button cdr-button--primary'
 * @example
 * mapClasses(styles, 'cdr-button cdr-button--primary') => 'cdr-button cdr-button--primary'
 *
 * @param {Record<string, string>} style - An object of scoped class names.
 * @param {...(string | boolean | null | undefined)[]} classes - An array of class names to map.
 * @returns {string} A string of scoped class names.
 */
export default function mapClasses(
  style: Record<string, string>,
  ...classes: (string | boolean | null | undefined)[]
): string {
  return classes
    .flatMap((el) => (typeof el === 'string' ? el.split(' ') : [])) // Flatten and split only string values
    .map((className) => style[className]) // Map to scoped class names
    .filter(Boolean) // Remove undefined or falsy values
    .join(' '); // Join to a single string
}
