import type {
  CdrSurfaceProps,
  CdrSurfaceNavigationProps,
  CdrSurfaceSelectionProps,
  Layout,
} from '../types/interfaces';

/**
 * Converts camelCase property names to kebab-case (snake-case with hyphens).
 *
 * @param str - The camelCase string to convert
 * @returns The kebab-cased string
 *
 * @example
 * camelToSnakeCase('backgroundColor') // => 'background-color'
 * camelToSnakeCase('borderRadius') // => 'border-radius'
 */
function camelToSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

/**
 * Generates data attributes for surface component styling.
 *
 * Converts surface prop values into data attributes that are consumed by
 * the surface CSS module. Handles both simple string values and complex
 * state-based objects (hover, active, checked, etc.).
 *
 * @param props - Surface component props containing style configuration
 * @returns Object containing data-* attributes for the surface element
 *
 * @example
 * // Simple string values
 * getSurfaceProps({ background: 'primary', borderColor: 'secondary' })
 * // => {
 * //   'data-palette': undefined,
 * //   'data-background': 'primary',
 * //   'data-border-color': 'secondary'
 * // }
 *
 * @example
 * // State-based values
 * getSurfaceProps({
 *   background: { rest: 'primary', hover: 'secondary' },
 *   palette: 'sandstone'
 * })
 * // => {
 * //   'data-palette': 'sandstone',
 * //   'data-background': 'primary',
 * //   'data-background-hover': 'secondary'
 * // }
 */
export function getSurfaceProps(
  props: CdrSurfaceProps | CdrSurfaceNavigationProps | CdrSurfaceSelectionProps,
): Record<string, any> {
  const attrs: Record<string, any> = { 'data-palette': props.palette || undefined };

  const states = ['rest', 'hover', 'active', 'checked', 'loading', 'disabled', 'visited'];
  const properties = [
    'background',
    'borderColor',
    'borderStyle',
    'borderWidth',
    'borderRadius',
    'boxShadow',
  ];

  properties.forEach((prop) => {
    const propName = camelToSnakeCase(prop);
    const propValue = props[prop as keyof CdrSurfaceProps];

    if (typeof propValue === 'string') {
      // Handle single string value (default state)
      attrs[`data-${propName}`] = propValue;
    } else if (typeof propValue === 'object') {
      // Handle state object
      Object.entries(propValue).forEach(([state, value]) => {
        if (value && states.includes(state)) {
          if (state === 'rest') {
            // Rest state becomes the default attribute
            attrs[`data-${propName}`] = value;
          } else {
            // Other states get their own state-specific attributes
            attrs[`data-${propName}-${state}`] = value;
          }
        }
      });
    }
  });

  return attrs;
}

/**
 * Creates a default layout configuration with sensible defaults.
 *
 * Provides a base layout configuration that can be overridden with custom values.
 * Used by layout-based components to ensure consistent default behavior.
 *
 * @param defaults - Optional custom default values to merge
 * @returns Layout configuration object
 *
 * @example
 * getDefaultLayout()
 * // => { flow: 'column', gap: 'three-eighth-x' }
 *
 * @example
 * getDefaultLayout({ gap: 'one-x', align: 'center' })
 * // => { flow: 'column', gap: 'one-x', align: 'center' }
 */
export const getDefaultLayout = (defaults: Partial<Layout> = {}): Layout => {
  const options: Layout = {
    flow: 'column',
    gap: 'three-eighth-x',
    ...defaults,
  };

  return options;
};
