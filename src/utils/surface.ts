import type { CdrSurfaceProps, InlineCss } from '../types/interfaces';

// Map of margins and padding
const marginsAndPaddingMap: Record<string, string> = {
  m: 'margin',
  mx: 'marginInline',
  my: 'marginBlock',
  ml: 'marginInlineStart',
  mr: 'marginInlineEnd',
  mt: 'marginTop',
  mb: 'marginBottom',
  p: 'padding',
  px: 'paddingInline',
  py: 'paddingBlock',
  pl: 'paddingInlineStart',
  pr: 'paddingInlineEnd',
  pt: 'paddingTop',
  pb: 'paddingBottom',
};
const marginAndPaddingKeys = Object.keys(marginsAndPaddingMap);

// Manages the props passed along to all surfaces
export const getSurfaceProps = (props: CdrSurfaceProps, baseClass: string) => {
  const classes = [baseClass];
  const inlineStyles: InlineCss = {};

  // Add modifier, which applies a background and border color,
  // but does not apply a border width
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
    if (props.borderWidth) {
      const borderWidthClass = `${baseClass}--border-width-${props.borderWidth}`;
      classes.push(borderWidthClass);
    }

    if (props.borderColor) {
      const borderColorClass = `${baseClass}--border-color-${props.borderColor}`;
      classes.push(borderColorClass);
    }

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

  // Add margin and padding
  if (marginAndPaddingKeys.find((key) => props[key])) {
    marginAndPaddingKeys.forEach((key) => {
      if (props[key]) {
        const cssProperty = marginsAndPaddingMap[key];
        inlineStyles[cssProperty] = `var(--cdr-space-${props.fixed ? '' : 'scale-'}${props[key]})`;
      }
    });
  }

  return { classes, inlineStyles };
};
