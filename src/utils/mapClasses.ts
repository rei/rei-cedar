/**
 * Maps a list of class names to their corresponding styles.
 *
 * This function takes a style object and a list of class names, then maps each class name
 * to its corresponding style value from the style object. It filters out any undefined or
 * falsy values and joins the resulting styles into a single string.
 *
 * @param {object} style - An object where keys are class names and values are style definitions.
 * @param {...string} classes - A list of class names to be mapped to styles.
 * @returns {string} A string of styles corresponding to the provided class names.
 */
export default function mapClasses(style: object, ...classes: string[]) {
  return classes
    .reduce((acc: string[], el: string) => acc.concat((el || '').split(' ')), [])
    .map((className: string) => style[className as keyof object])
    .filter((x) => x)
    .join(' ');
}
