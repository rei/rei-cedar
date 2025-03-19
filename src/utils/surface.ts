import type { surface, Layout } from '../types/interfaces';

function camelToSnakeCase(str: string) {
  return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

export function getSurfaceProps(props: surface) {
  const attrs: Record<string, any> = { 'data-palette': props.palette || undefined };

  const states = [
    'rest',
    'hover',
    'active',
    'checked',
    'loading',
    'disabled',
    'visited'
  ];
  const properties = [
    'background',
    'borderColor',
    'borderStyle',
    'borderWidth',
    'borderRadius',
    'boxShadow'
  ];

  properties.forEach((prop) => {
    const propName = camelToSnakeCase(prop);
    const propValue = props[prop as keyof surface];
  
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

export const getDefaultLayout = (defaults = {}) => {
  const options: Layout = {
    flow: 'column',
    gap: 'three-eighth-x',
    ...defaults,
  };

  return options;
};
