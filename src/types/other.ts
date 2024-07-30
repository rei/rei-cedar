export type Tag = keyof HTMLElementTagNameMap;
export type SpaceFixed =
  | 'zero'
  | 'sixteenth-x'
  | 'eighth-x'
  | 'quarter-x'
  | 'third-x'
  | 'half-x'
  | 'two-third-x'
  | 'three-quarter-x'
  | 'one-x'
  | 'one-and-a-half-x'
  | 'two-x'
  | 'three-x'
  | 'four-x';
export type SpaceFluid =
  | 'scale-0'
  | 'scale-1'
  | 'scale-2'
  | 'scale-3'
  | 'scale-4'
  | 'scale-5'
  | 'scale-6'
  | 'scale-7'
  | 'scale-8';
export type SpaceScale = 'scale-0--1' | 'scale-3--4' | 'scale-3--5';
export type Space = SpaceFixed | SpaceFluid | SpaceScale;
export type Shadow = 'flat' | 'raised' | 'elevated' | 'floating' | 'lifted';
export type Background = 'transparent' | 'primary' | 'secondary' | 'brand-spruce';
export type Radius = 'sharp' | 'soft' | 'softer' | 'softest' | 'round';
export type BorderColor =
  | 'transparent'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'message-default-01';
export type BorderStyle = 'solid' | 'dotted' | 'dashed';
export type Modifier = 'primary' | 'secondary';
export type Orientation = 'vertical' | 'horizontal';
