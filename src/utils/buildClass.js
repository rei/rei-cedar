// TODO: make arg order consistent

/**
 * Returns a modified base class
 */
const modifyClassName = (base, modifier) => `${base}--${modifier}`;

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

// TODO: I think I want to swap the order of modifer and prop args here, currently passing an empty string for modifier half the time.
const responsiveModifyClass = (base, modifier, prop) => {
  if (typeof prop === 'string') {
    return prop.split(' ')
      .map((bp) => modifyClassName(base, `${modifier}${bp}`))
      .join(' ');
  }
  return modifyClassName(base, modifier);
};
// TODO: combine these?
const buildBooleanClass = (baseClass, prop, name) => {
  if (typeof prop === 'boolean') {
    return prop && modifyClassName(baseClass, name);
  }

  return responsiveModifyClass(baseClass, name, prop);
};

export {
  modifyClassName,
  responsiveModifyClass,
  buildBooleanClass,
};

// TODO: REFACTOR this stuff to make more sense!!!!!
// buildclass name should reflect the prop type!!!!
