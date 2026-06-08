import { CdrColorBackground } from '@rei/cdr-tokens/types/color-background';
import { CdrColorBorder } from '@rei/cdr-tokens/types/color-border';
import { CdrProminence } from '@rei/cdr-tokens/types/prominence';
import { CdrRadius } from '@rei/cdr-tokens/types/radius';
import { CdrSpace } from '@rei/cdr-tokens/types/space';
import { CdrSpaceScale } from '@rei/cdr-tokens/types/space-scale';
import type { CdrBreakpointKey } from '@rei/cdr-tokens/types/breakpoint.keys';
import type { CdrColorBackgroundKey } from '@rei/cdr-tokens/types/color-background.keys';
import type { CdrColorBorderKey } from '@rei/cdr-tokens/types/color-border.keys';
import type { CdrProminenceKey } from '@rei/cdr-tokens/types/prominence.keys';
import type { CdrRadiusKey } from '@rei/cdr-tokens/types/radius.keys';
import type { CdrSpaceKey } from '@rei/cdr-tokens/types/space.keys';
import type { CdrSpaceScaleKey } from '@rei/cdr-tokens/types/space-scale.keys';
import type { CedarTypeScale } from '../tokens/adapters';

// Types whose values originate from @rei/cdr-tokens key types.
export type Breakpoint = CdrBreakpointKey;
export type SpaceFixed = CdrSpaceKey;
type SpaceScaleRangeKey = Extract<CdrSpaceScaleKey, 'range0-to1' | 'range3-to4' | 'range3-to5'>;
type SpaceScaleSingleKey = Exclude<CdrSpaceScaleKey, SpaceScaleRangeKey>;
type CedarSpaceScaleRangeMap = {
  'range0-to1': 'scale-0--1';
  'range3-to4': 'scale-3--4';
  'range3-to5': 'scale-3--5';
};
export type SpaceFluid = `scale-${SpaceScaleSingleKey}`;
export type SpaceScale = CedarSpaceScaleRangeMap[SpaceScaleRangeKey];
export type Space = SpaceFixed | SpaceFluid | SpaceScale;
export type TypeScale = CedarTypeScale;
export type Background = CdrColorBackgroundKey;
export type BorderColor = CdrColorBorderKey;
export type Radius = CdrRadiusKey;
export type CdrProminenceBaseKey = Extract<
  CdrProminenceKey,
  'flat' | 'raised' | 'elevated' | 'floating' | 'lifted'
>;
export type Shadow = CdrProminenceBaseKey;

type TokenNameMap<T extends string> = Record<T, string>;

function pascalToKebab(value: string): string {
  return value
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Za-z])([0-9])/g, '$1-$2')
    .toLowerCase();
}

function mapTokenNames<T extends string>(
  tokens: object,
  prefix: string,
  toKey: (suffix: string) => T,
  filter: (key: T) => boolean = () => true,
): TokenNameMap<T> {
  return Object.keys(tokens).reduce((acc, tokenName) => {
    const key = toKey(tokenName.replace(prefix, ''));

    if (filter(key)) {
      acc[key] = tokenName;
    }

    return acc;
  }, {} as TokenNameMap<T>);
}

function spaceScaleKey(suffix: string): SpaceFluid | SpaceScale {
  if (suffix === 'Range0To1') return 'scale-0--1' as SpaceScale;
  if (suffix === 'Range3To4') return 'scale-3--4' as SpaceScale;
  if (suffix === 'Range3To5') return 'scale-3--5' as SpaceScale;
  return `scale-${suffix}` as SpaceFluid;
}

export const surfaceBackgroundTokens = mapTokenNames<CdrColorBackgroundKey>(
  CdrColorBackground,
  'CdrColorBackground',
  (suffix) => pascalToKebab(suffix) as CdrColorBackgroundKey,
);

export const surfaceBorderColorTokens = mapTokenNames<CdrColorBorderKey>(
  CdrColorBorder,
  'CdrColorBorder',
  (suffix) => pascalToKebab(suffix) as CdrColorBorderKey,
);

export const surfaceRadiusTokens = mapTokenNames<CdrRadiusKey>(
  CdrRadius,
  'CdrRadius',
  (suffix) => pascalToKebab(suffix) as CdrRadiusKey,
);

export const surfaceShadowTokens = mapTokenNames<CdrProminenceBaseKey>(
  CdrProminence,
  'CdrProminence',
  (suffix) => pascalToKebab(suffix) as CdrProminenceBaseKey,
  (key) => !key.includes('-'),
);

export const spaceFixedTokens = mapTokenNames<CdrSpaceKey>(
  CdrSpace,
  'CdrSpace',
  (suffix) => pascalToKebab(suffix) as CdrSpaceKey,
);

const allSpaceScaleTokens = mapTokenNames<SpaceFluid | SpaceScale>(
  CdrSpaceScale,
  'CdrSpaceScale',
  spaceScaleKey,
);

export const spaceFluidTokens = Object.fromEntries(
  Object.entries(allSpaceScaleTokens).filter(([key]) => !key.includes('--')),
) as TokenNameMap<SpaceFluid>;

export const spaceScaleTokens = Object.fromEntries(
  Object.entries(allSpaceScaleTokens).filter(([key]) => key.includes('--')),
) as TokenNameMap<SpaceScale>;

export const surfaceBackgroundOptions = Object.keys(surfaceBackgroundTokens) as Background[];
export const surfaceBorderColorOptions = Object.keys(surfaceBorderColorTokens) as BorderColor[];
export const surfaceRadiusOptions = Object.keys(surfaceRadiusTokens) as Radius[];
export const surfaceShadowOptions = Object.keys(surfaceShadowTokens) as Shadow[];
export const spaceFixedOptions = Object.keys(spaceFixedTokens) as SpaceFixed[];
export const spaceFluidOptions = Object.keys(spaceFluidTokens) as SpaceFluid[];
export const spaceScaleOptions = Object.keys(spaceScaleTokens) as SpaceScale[];
export const spaceOptions = [
  ...spaceFixedOptions,
  ...spaceFluidOptions,
  ...spaceScaleOptions,
] as const satisfies readonly string[];

// Cedar-specific semantic values that do not exist in cdr-tokens.
export type Tag = keyof HTMLElementTagNameMap;
export const surfacePaletteOptions = [
  'default',
  'sandstone',
  'membership-subtle',
  'membership-vibrant',
] as const;
export const primarySecondaryOptions = ['primary', 'secondary'] as const;
export const checkboxModifierOptions = ['', 'hide-figure'] as const;
export const errorStateOptions = [false, true, 'error message'] as const;
export const headingLevelOptions = [1, 2, 3, 4, 5, 6] as const;
export const imageFitOptions = ['contain', 'cover', 'fill', 'none', 'scale-down'] as const;
export const imageLoadingOptions = ['lazy', 'eager'] as const;
export const imageRadiusOptions = ['soft', 'softer', 'round'] as const;
export const inputTypeOptions = [
  'text',
  'email',
  'number',
  'password',
  'search',
  'url',
  'tel',
  'date',
  'datetime-local',
] as const;
export const largeSizeOptions = [undefined, 'large'] as const;
export const borderStyleOptions = ['solid', 'dotted', 'dashed'] as const;
export const flowOptions = ['row', 'column'] as const;
export const queryTypeOptions = ['container', 'media'] as const;
export const positionValueOptions = ['top', 'right', 'bottom', 'left'] as const;
export const responsiveBooleanOptions = [false, true, '@sm @lg'] as const;
export const alignmentValueOptions = ['start', 'center', 'end'] as const;
export const layoutGapDemoOptions = [
  'zero',
  'one-x',
  'two-x',
  'scale-4',
  'scale-3--5',
] as const satisfies readonly Space[];
export const mediaObjectContentPaddingDemoOptions = [
  'zero',
  'one-x',
  'two-x',
] as const satisfies readonly Space[];
export const statusTypeOptions = ['default', 'info', 'warning', 'success', 'error'] as const;
export const buttonTagOptions = ['button', 'a'] as const;
export const buttonTypeOptions = ['button', 'submit', 'reset'] as const;
export const buttonModifierOptions = ['primary', 'secondary', 'sale', 'dark', 'link'] as const;
export const containerModifierOptions = ['static', 'fluid'] as const;
export const linkTagOptions = ['a', 'button'] as const;
export const linkModifierOptions = ['', 'standalone'] as const;
export const listTagOptions = ['ul', 'ol'] as const;
export const modalRoleOptions = ['dialog', 'alertdialog'] as const;
export const switchSizeOptions = ['medium', 'large'] as const;

/** @semantic Cedar palette names for surface theming */
export type SurfacePalette = (typeof surfacePaletteOptions)[number];
export type CheckboxModifier = (typeof checkboxModifierOptions)[number];
export type HeadingLevel = (typeof headingLevelOptions)[number];
export type ImageFit = (typeof imageFitOptions)[number];
export type ImageLoading = (typeof imageLoadingOptions)[number];
export type ImageRadius = (typeof imageRadiusOptions)[number];
export type InputType = (typeof inputTypeOptions)[number];
export type PrimarySecondary = (typeof primarySecondaryOptions)[number];
export type BorderStyle = (typeof borderStyleOptions)[number];
export type ButtonTag = (typeof buttonTagOptions)[number];
export type ButtonType = (typeof buttonTypeOptions)[number];
export type ButtonModifier = (typeof buttonModifierOptions)[number];
export type ContainerModifier = (typeof containerModifierOptions)[number];
export type LinkTag = (typeof linkTagOptions)[number];
export type LinkModifier = (typeof linkModifierOptions)[number];
export type ListTag = (typeof listTagOptions)[number];
export type ModalRole = (typeof modalRoleOptions)[number];
export type Modifier = 'default' | 'primary' | 'secondary';
export type Flow = (typeof flowOptions)[number];
export type Structure = 'rows' | 'columns';
export type StatusType = (typeof statusTypeOptions)[number];
export type SwitchSize = (typeof switchSizeOptions)[number];

// Types derived from combinations of token and semantic types.
export type StructureValue = number | string;
export type StructureArray = StructureValue[];
export type StructureObject = { [key in Breakpoint]: StructureValue | StructureArray };
export type StructureOption = StructureValue | StructureArray | StructureObject;

export type SpaceTuple =
  | [SpaceFixed]
  | [SpaceFixed, SpaceFixed]
  | [SpaceFixed, SpaceFixed, SpaceFixed]
  | [SpaceFixed, SpaceFixed, SpaceFixed, SpaceFixed];
export type Spacing = SpaceFixed | SpaceTuple;
export type SpaceObject = { [key in Breakpoint]: Space };
export type SpaceOption = Space | SpaceObject;
export type ResponsiveSpace = { [key in Breakpoint]?: Spacing };

export type QueryType = (typeof queryTypeOptions)[number];
export type PositionValue = (typeof positionValueOptions)[number];
export type PositionObject = { [key in Breakpoint]: PositionValue };
export type Position = PositionValue | PositionObject;
export type AlignmentValue = (typeof alignmentValueOptions)[number];
export type AlignmentObject = { [key in Breakpoint]: AlignmentValue };
export type Alignment = AlignmentValue | AlignmentObject;
export type MediaMeasurementObject = { [key in Breakpoint]: string };
export type MediaMeasurement = string | MediaMeasurementObject;
