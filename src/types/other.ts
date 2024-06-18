import type * as CSS from 'csstype';

export type Tag = keyof HTMLElementTagNameMap;
export type Space =
  | 'zero'
  | 'sixteenth-x'
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
export type Background = 'transparent' | 'primary' | 'secondary' | 'brand-spruce';
export type Radius = 'sharp' | 'soft' | 'softer' | 'round';
export type BorderColor =
  | 'transparent'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'message-default-01';
export type Position = CSS.Properties['position'];
export type Variant = 'primary' | 'secondary';
export type Display = CSS.Properties['display'];