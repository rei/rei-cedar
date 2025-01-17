import type { surface, surfaceSelection, HtmlAttributes, Layout } from '../types/interfaces';

// Manages the props passed along to all surfaces
export const getSurfaceProps = (props: surface, baseClass: string) => {
  const classes = [baseClass];

  // Add modifier, which applies a background and border color,
  // but does not apply a border
  if (props.modifier) {
    classes.push(`${baseClass}--modifier-${props.modifier}`);
  }

  // Add background
  if (props.background) {
    const backgroundClass = `${baseClass}--background-${props.background}`;
    classes.push(backgroundClass);
  }

  // Add border
  if (props.withBorder) {
    const borderColorClass = `${baseClass}--border-color-${props.borderColor || 'primary'}`;
    classes.push(borderColorClass);

    const borderWidthClass = `${baseClass}--border-width-${props.borderWidth || 'sixteenth-x'}`;
    classes.push(borderWidthClass);

    const borderStyleClass = `${baseClass}--border-style-${props.borderStyle || 'solid'}`;
    classes.push(borderStyleClass);

    classes.push(`${baseClass}--border`);
  }

  // Add radius
  if (props.radius) {
    const radiusClass = `${baseClass}--radius-${props.radius}`;
    classes.push(radiusClass);
  }

  // Add shadow
  if (props.shadow) {
    const shadowClass = `${baseClass}--shadow-${props.shadow}`;
    classes.push(shadowClass);
  }

  return { classes };
};

export const getSurfaceSelectionProps = (props: surfaceSelection, baseClass: string) => {
  const { classes } = getSurfaceProps(props, baseClass);
  const { checked, loading, disabled, ...otherProps } = props;
  const additionalProps: HtmlAttributes = { ...otherProps };

  // Add button type
  additionalProps.type = 'button';

  // Add checked
  additionalProps['aria-checked'] = Boolean(checked);

  // Add disabled
  if (disabled) {
    additionalProps['disabled'] = disabled;
  }

  // Add loading
  if (loading) {
    additionalProps['data-loading'] = loading;
  }

  // Remove unwanted props that would be passed to element
  delete additionalProps.layout;
  delete additionalProps.modifier;
  delete additionalProps.tag;

  return { classes, ...additionalProps };
};

export const getDefaultLayout = (defaults = {}) => {
  const options: Layout = {
    flow: 'column',
    gap: 'three-eighth-x',
    ...defaults,
  };
  return options;
};
