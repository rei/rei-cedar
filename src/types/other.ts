import type { CdrBreakpointKey } from '@rei/cdr-tokens/rei-dot-com/types/foundations/cdr-breakpoint.keys';
import type { CdrColorBackgroundTokens } from '@rei/cdr-tokens/rei-dot-com/types/foundations/cdr-color-background';
import type { CdrColorBackgroundKey } from '@rei/cdr-tokens/rei-dot-com/types/foundations/cdr-color-background.keys';
import type { CdrColorBorderTokens } from '@rei/cdr-tokens/rei-dot-com/types/foundations/cdr-color-border';
import type { CdrColorBorderKey } from '@rei/cdr-tokens/rei-dot-com/types/foundations/cdr-color-border.keys';
import type { CdrProminenceTokens } from '@rei/cdr-tokens/rei-dot-com/types/foundations/cdr-prominence';
import type { CdrProminenceKey } from '@rei/cdr-tokens/rei-dot-com/types/foundations/cdr-prominence.keys';
import type { CdrRadiusTokens } from '@rei/cdr-tokens/rei-dot-com/types/foundations/cdr-radius';
import type { CdrRadiusKey } from '@rei/cdr-tokens/rei-dot-com/types/foundations/cdr-radius.keys';
import type { CdrSpaceTokens } from '@rei/cdr-tokens/rei-dot-com/types/foundations/cdr-space';
import type { CdrSpaceKey } from '@rei/cdr-tokens/rei-dot-com/types/foundations/cdr-space.keys';
import type { CdrSpaceScaleTokens } from '@rei/cdr-tokens/rei-dot-com/types/foundations/cdr-space-scale';
import type { CdrSpaceScaleKey } from '@rei/cdr-tokens/rei-dot-com/types/foundations/cdr-space-scale.keys';
import type { CedarTypeScale } from '../tokens/adapters';

// Types whose values originate from @rei/cdr-tokens key types.
export type Breakpoint = CdrBreakpointKey;
export type SpaceFixed = CdrSpaceKey;
type SpaceScaleRangeKey = Extract<CdrSpaceScaleKey, '01' | '34' | '35'>;
type SpaceScaleSingleKey = Exclude<CdrSpaceScaleKey, SpaceScaleRangeKey>;
type CedarSpaceScaleRangeMap = {
  '01': 'scale-0--1';
  '34': 'scale-3--4';
  '35': 'scale-3--5';
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

// Maps Cedar semantic names to canonical token names.
export const surfaceBackgroundTokens = {
  primary: 'CdrColorBackgroundPrimary',
  secondary: 'CdrColorBackgroundSecondary',
  'brand-spruce': 'CdrColorBackgroundBrandSpruce',
  sale: 'CdrColorBackgroundSale',
  error: 'CdrColorBackgroundError',
  info: 'CdrColorBackgroundInfo',
  success: 'CdrColorBackgroundSuccess',
  transparent: 'CdrColorBackgroundTransparent',
  warning: 'CdrColorBackgroundWarning',
} as const satisfies Record<CdrColorBackgroundKey, keyof CdrColorBackgroundTokens>;

export const surfaceBorderColorTokens = {
  primary: 'CdrColorBorderPrimary',
  secondary: 'CdrColorBorderSecondary',
  success: 'CdrColorBorderSuccess',
  warning: 'CdrColorBorderWarning',
  error: 'CdrColorBorderError',
  info: 'CdrColorBorderInfo',
  transparent: 'CdrColorBorderTransparent',
} as const satisfies Record<CdrColorBorderKey, keyof CdrColorBorderTokens>;

export const surfaceRadiusTokens = {
  sharp: 'CdrRadiusSharp',
  soft: 'CdrRadiusSoft',
  softer: 'CdrRadiusSofter',
  softest: 'CdrRadiusSoftest',
  round: 'CdrRadiusRound',
} as const satisfies Record<CdrRadiusKey, keyof CdrRadiusTokens>;

export const surfaceShadowTokens = {
  flat: 'CdrProminenceFlat',
  raised: 'CdrProminenceRaised',
  elevated: 'CdrProminenceElevated',
  floating: 'CdrProminenceFloating',
  lifted: 'CdrProminenceLifted',
} as const satisfies Record<CdrProminenceBaseKey, keyof CdrProminenceTokens>;

export const spaceFixedTokens = {
  zero: 'CdrSpaceZero',
  'sixteenth-x': 'CdrSpaceSixteenthX',
  'eighth-x': 'CdrSpaceEighthX',
  'three-sixteenth-x': 'CdrSpaceThreeSixteenthX',
  'quarter-x': 'CdrSpaceQuarterX',
  'three-eighth-x': 'CdrSpaceThreeEighthX',
  'half-x': 'CdrSpaceHalfX',
  'three-quarter-x': 'CdrSpaceThreeQuarterX',
  'one-x': 'CdrSpaceOneX',
  'one-and-a-half-x': 'CdrSpaceOneAndAHalfX',
  'two-x': 'CdrSpaceTwoX',
  'three-x': 'CdrSpaceThreeX',
  'four-x': 'CdrSpaceFourX',
} as const satisfies Record<CdrSpaceKey, keyof CdrSpaceTokens>;

export const spaceFluidTokens = {
  'scale-0': 'CdrSpaceScale0',
  'scale-1': 'CdrSpaceScale1',
  'scale-2': 'CdrSpaceScale2',
  'scale-3': 'CdrSpaceScale3',
  'scale-4': 'CdrSpaceScale4',
  'scale-5': 'CdrSpaceScale5',
  'scale-6': 'CdrSpaceScale6',
  'scale-7': 'CdrSpaceScale7',
  'scale-8': 'CdrSpaceScale8',
} as const satisfies Record<SpaceFluid, keyof CdrSpaceScaleTokens>;

export const spaceScaleTokens = {
  'scale-0--1': 'CdrSpaceScale01',
  'scale-3--4': 'CdrSpaceScale34',
  'scale-3--5': 'CdrSpaceScale35',
} as const satisfies Record<SpaceScale, keyof CdrSpaceScaleTokens>;

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
