import type { SpacingKey, DirectKey, StylingKey } from '../../types/other';

const spacing: Record<SpacingKey, string> = {
  m: 'margin',
  mx: 'marginInline',
  my: 'marginBlock',
  p: 'padding',
  px: 'paddingInline',
  py: 'paddingBlock',
};

interface StylesMapValue {
  property: string;
  converter?: Function;
}

const stylesMap: Partial<Record<StylingKey, StylesMapValue>> = {};

// Add spacing
(Object.keys(spacing) as Array<SpacingKey>).forEach((key) => {
  stylesMap[key] = {
    property: spacing[key],
    converter: (value: string) => `var(--cdr-space-${value})`,
  };
});

// Add any CSS properties that do not use different names than their prop name
(['display'] as Array<DirectKey>).forEach((key) => {
  stylesMap[key] = { property: key };
});

// Add radius
stylesMap.radius = {
  property: 'borderRadius',
  converter: (value: string) => `var(--cdr-radius-${value})`,
};

// Add background
stylesMap.background = {
  property: 'backgroundColor',
  converter: (value: string) => `var(--cdr-color-background-${value})`,
};

// Add shadow
stylesMap.shadow = {
  property: 'boxShadow',
  converter: (value: string) => `var(--cdr-prominence-${value})`,
};

export default stylesMap;
