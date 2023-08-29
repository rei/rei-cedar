/**
 * Converts a string to kebab case.
 * @param string str
 */
export default function kebabCase(str: string) {
  return str
    .replace(/([a-z]) ([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}