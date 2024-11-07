
/**
 * Returns a modified base class
 */
const modifyClassName = (base: string, modifier: string) => `${base}--${modifier}`;

/**
 *
 * @param {String} prop -- the prop to build classes from
 */

/**
 * supports pattern to have props that are boolean or breakpoint strings
 *
 * @param {String} base
 * @param {String} modifier
 * @param {String|Boolean} propVal
 *
 * given these conditions:
 * base is 'cdr-table'
 * modifier is 'full-width'
 * prop would be full-width="@sm @lg"
 *
 * This takes that and returns classes of "cdr-table--full-width@sm cdr-table--full-width@lg"
 */


const responsiveModifyClass = (base: string, modifier: string, prop: string|boolean) => {
  if (typeof prop === 'string') {
    return prop.split(' ')
      .map((bp) => modifyClassName(base, `${modifier}${bp}`))
      .join(' ');
  }
  return modifyClassName(base, modifier);
};

const buildBooleanClass = (baseClass: string, prop: string|boolean, name: string) => {
  if (typeof prop === 'boolean') {
    return prop
      ? modifyClassName(baseClass, name)
      : '';
  }

  return responsiveModifyClass(baseClass, name, prop);
};

export {
  modifyClassName,
  responsiveModifyClass,
  buildBooleanClass,
};
