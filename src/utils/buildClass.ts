/**
 * Appends a BEM-style modifier to a base class name.
 *
 * @param base - The base class name (e.g., 'cdr-button')
 * @param modifier - The modifier to append (e.g., 'primary')
 * @returns The modified class name (e.g., 'cdr-button--primary')
 *
 * @example
 * modifyClassName('cdr-button', 'primary') // => 'cdr-button--primary'
 * modifyClassName('cdr-table', 'striped') // => 'cdr-table--striped'
 */
const modifyClassName = (base: string, modifier: string): string => `${base}--${modifier}`;

/**
 * Creates responsive BEM-style modifier classes from a prop value.
 * Supports boolean values or space-separated breakpoint strings.
 *
 * When passed a string with breakpoint tokens (e.g., "@sm @lg"), it generates
 * multiple class names, one for each breakpoint. When passed `true`, it generates
 * a single modifier class without a breakpoint.
 *
 * @param base - The base class name (e.g., 'cdr-table')
 * @param modifier - The modifier name (e.g., 'full-width')
 * @param prop - Either a boolean or a space-separated string of breakpoints
 * @returns Space-separated string of responsive modifier classes
 *
 * @example
 * responsiveModifyClass('cdr-table', 'full-width', '@sm @lg')
 * // => 'cdr-table--full-width@sm cdr-table--full-width@lg'
 *
 * @example
 * responsiveModifyClass('cdr-table', 'full-width', true)
 * // => 'cdr-table--full-width'
 */
const responsiveModifyClass = (base: string, modifier: string, prop: string | boolean): string => {
  if (typeof prop === 'string') {
    return prop
      .split(' ')
      .map((bp) => modifyClassName(base, `${modifier}${bp}`))
      .join(' ');
  }
  return modifyClassName(base, modifier);
};

/**
 * Builds a conditional BEM modifier class based on a boolean or responsive prop.
 *
 * If the prop is `true`, returns a single modifier class.
 * If the prop is `false`, returns an empty string.
 * If the prop is a string (breakpoint tokens), returns responsive modifier classes.
 *
 * @param baseClass - The base class name
 * @param prop - Boolean flag or space-separated breakpoint string
 * @param name - The modifier name
 * @returns Class string or empty string if the condition is false
 *
 * @example
 * buildBooleanClass('cdr-grid', true, 'gutter')
 * // => 'cdr-grid--gutter'
 *
 * @example
 * buildBooleanClass('cdr-grid', false, 'gutter')
 * // => ''
 *
 * @example
 * buildBooleanClass('cdr-grid', '@sm @md', 'gutter')
 * // => 'cdr-grid--gutter@sm cdr-grid--gutter@md'
 */
const buildBooleanClass = (baseClass: string, prop: string | boolean, name: string): string => {
  if (typeof prop === 'boolean') {
    return prop ? modifyClassName(baseClass, name) : '';
  }

  return responsiveModifyClass(baseClass, name, prop);
};

export { modifyClassName, responsiveModifyClass, buildBooleanClass };
