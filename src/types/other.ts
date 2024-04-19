export type Space =
  | 'eighth-x'
  | 'quarter-x'
  | 'half-x'
  | 'three-quarter-x'
  | 'one-x'
  | 'one-and-a-half-x'
  | 'two-x'
  | 'three-x'
  | 'four-x';
export type Background = 'primary' | 'secondary' | 'brand-spruce';
export type Shadow = 'flat' | 'raised' | 'elevated' | 'floating' | 'lifted';
export type Radius = 'sharp' | 'soft' | 'softer' | 'round';
export type BorderColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error';
export type SpacingKey = 'm' | 'mx' | 'my' | 'p' | 'px' | 'py';
export type OtherKey = 'radius' | 'shadow' | 'background' | 'borderWidth' | 'borderColor';
export type DirectKey = 'display';

/**
 * Text component properties
 * @type space
 */
// export type Space = (typeof spacing)[number];

export interface SpacingProps {
  p?: Space;
  px?: Space;
  py?: Space;
  m?: Space;
  mx?: Space;
  my?: Space;
}

export interface DirectProps {
  display?: string;
}

export type StylingKey = SpacingKey | DirectKey | OtherKey;

export interface StylingProps extends SpacingProps, DirectProps {
  background?: Background;
  radius?: Radius;
  shadow?: Shadow;
  borderWidth?: Space;
  borderColor?: BorderColor;
}
