import type * as CSS from 'csstype';

export type Tag = keyof HTMLElementTagNameMap;
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
export type Shadow = 'flat' | 'raised' | 'elevated' | 'floating' | 'lifted';
export type Surface = 'transparent' | 'primary' | 'secondary' | 'brand-spruce';
export type Radius = 'sharp' | 'soft' | 'softer' | 'round';
export type BorderColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error';
export type Elevation =
  | 'ground'
  | 'dropdown'
  | 'popover'
  | 'navigation'
  | 'sticky'
  | 'notification'
  | 'modal';
export type Position = CSS.Properties['position'];
export type Palette = 'primary' | 'sale';
