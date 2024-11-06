export type Tag = keyof HTMLElementTagNameMap;
export type SpaceFixed =
  | 'zero'
  | 'sixteenth-x'
  | 'eighth-x'
  | 'three-sixteenth-x'
  | 'quarter-x'
  | 'three-eighth-x'
  | 'half-x'
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
export type SpaceObject = { [key in Breakpoint]: Space };
export type SpaceOption = Space | SpaceObject;
export type Shadow = 'flat' | 'raised' | 'elevated' | 'floating' | 'lifted';
export type Background = 'primary' | 'secondary' | 'brand-spruce' | 'sale';
export type Radius = 'sharp' | 'soft' | 'softer' | 'softest' | 'round';
export type BorderColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export type BorderStyle = 'solid' | 'dotted' | 'dashed';
export type Modifier = 'default' | 'primary' | 'secondary';
export type Orientation = 'vertical' | 'horizontal';
export type Flow = 'row' | 'column';
export type Structure = 'rows' | 'columns';
export type StatusType = 'info' | 'warning' | 'success' | 'error' | 'default';
export type ScaleValue = '-2' | '-1' | '0' | '1';
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg';
export type StructureValue = number | string;
export type StructureArray = StructureValue[];
export type StructureObject = { [key in Breakpoint]: StructureValue | StructureArray };
export type StructureOption = StructureValue | StructureArray | StructureObject;
export type QueryType = 'container' | 'media';
