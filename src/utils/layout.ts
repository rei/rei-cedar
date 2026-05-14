import type { NameValuePair, Layout } from '../components/layout/types';
import { breakpoints } from './styleTokens';
import type { Breakpoint, Structure, StructureOption } from '../types/componentOptions';

/**
 * Converts various columns or rows values to a map of inline CSS variables for the Layout component.
 *
 * This function handles different structure option types:
 * - **String**: Direct CSS value (e.g., "100px", "1fr 2fr")
 * - **Number**: Generates equal-width fractional units (e.g., 2 => "1fr 1fr")
 * - **Array**: Mix of numbers and strings (e.g., [100px, 1] => "100px 1fr")
 * - **Object**: Responsive breakpoint configuration
 *
 * @param props - Layout configuration object
 * @param styles - Existing styles object to merge with (optional)
 * @param structure - The layout structure type ('columns' or 'rows')
 * @param breakpoint - Specific breakpoint to generate styles for (optional)
 * @returns Object containing CSS custom property names and their values
 *
 * @example
 * // String input
 * getStructureStyles({ props: { columns: '100px' }, structure: 'columns' })
 * // => { '--cdr-layout-columns': '100px' }
 *
 * @example
 * // Number input
 * getStructureStyles({ props: { columns: 3 }, structure: 'columns' })
 * // => { '--cdr-layout-columns': '1fr 1fr 1fr' }
 *
 * @example
 * // Array input
 * getStructureStyles({ props: { columns: ['200px', 1, 2] }, structure: 'columns' })
 * // => { '--cdr-layout-columns': '200px 1fr 2fr' }
 *
 * @example
 * // Responsive object input
 * getStructureStyles({
 *   props: { columns: { xs: 1, sm: 2, md: 3, lg: 4 } },
 *   structure: 'columns'
 * })
 * // => {
 * //   '--cdr-layout-columns-xs': '1fr',
 * //   '--cdr-layout-columns-sm': '1fr 1fr',
 * //   '--cdr-layout-columns-md': '1fr 1fr 1fr',
 * //   '--cdr-layout-columns-lg': '1fr 1fr 1fr 1fr'
 * // }
 */
export function getStructureStyles({
  props,
  styles: newStyles = {},
  structure,
  breakpoint,
}: {
  props: Layout;
  styles?: NameValuePair;
  structure: Structure;
  breakpoint?: Breakpoint;
}): NameValuePair {
  // This will be assigned a StructureOption.
  // If breakpoint is passed then get the deep value, otherwise use top-level value.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: Unreachable code error
  const option: StructureOption = breakpoint ? props[structure][breakpoint] : props[structure];

  if (!option) {
    return newStyles;
  }

  const styles = { ...newStyles };

  switch (true) {
    // Example: "100px"
    // Output:
    // --cdr-layout-columns: 100px;
    case typeof option === 'string': {
      const breakpointPart = breakpoint ? `-${breakpoint}` : '';
      styles[`--cdr-layout-${structure}${breakpointPart}`] = option;
      break;
    }
    // Example: 2
    // Output:
    // --cdr-layout-columns: 1fr 1fr;
    case typeof option === 'number': {
      const breakpointPart = breakpoint ? `-${breakpoint}` : '';
      styles[`--cdr-layout-${structure}${breakpointPart}`] = Array(option).fill('1fr').join(' ');
      break;
    }
    // Example: ['100px', 1] => '100px 1fr'
    // Output:
    // --cdr-layout-columns: 2fr 1fr;
    case Array.isArray(option): {
      const breakpointPart = breakpoint ? `-${breakpoint}` : '';
      styles[`--cdr-layout-${structure}${breakpointPart}`] = option
        .map((option: any) => {
          switch (typeof option) {
            case 'number':
              return `${option}fr`;
            case 'string':
              return option;
            default:
              return '';
          }
        })
        .join(' ');
      break;
    }
    // Example: {xs: 1, sm: ['100px', 1], md: ['200px', 1]}
    // Output:
    // --cdr-layout-columns-xs: 1fr;
    // --cdr-layout-columns-sm: 100px 1fr;
    // --cdr-layout-columns-md: 400px 1fr;
    // --cdr-layout-columns-lg: 800px 1fr;
    case typeof option === 'object': {
      // Set values for breakpoints
      breakpoints.forEach((bp) => {
        const additionalStyles = getStructureStyles({ props, styles, structure, breakpoint: bp });
        Object.assign(styles, additionalStyles);
      });
      break;
    }
  }

  return styles;
}
