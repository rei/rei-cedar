import { CdrBreakpointOrder } from '@rei/cdr-tokens/types/breakpoint-order';
import { CdrSpace } from '@rei/cdr-tokens/types/space';
import {
  spaceFixedTokens,
  spaceFluidTokens,
  spaceScaleTokens,
  type Breakpoint,
  type Space,
  type SpaceFixed,
  type SpaceFluid,
  type SpaceScale,
} from '../types/componentOptions';

/**
 * Array of Cedar breakpoint names ordered from smallest to largest.
 * Used for responsive layout calculations and media queries.
 *
 * @constant
 * @type {Breakpoint[]}
 *
 * - **xs**: Extra small (mobile, < 768px)
 * - **sm**: Small (tablet, >= 768px)
 * - **md**: Medium (small desktop, >= 992px)
 * - **lg**: Large (large desktop, >= 1232px)
 */
export const breakpoints = [...CdrBreakpointOrder] as Breakpoint[];

function spaceScaleCssVar(tokenName: string): string {
  return `var(--cdr-space-scale-${tokenName.replace('CdrSpaceScale', '').split('').join('-')})`;
}

const fixedSpacing = Object.fromEntries(
  Object.entries(spaceFixedTokens).map(([key, tokenName]) => [
    key,
    `${CdrSpace[tokenName as keyof typeof CdrSpace]}px`,
  ]),
) as Record<SpaceFixed, string>;

const fluidSpacing = Object.fromEntries(
  Object.entries(spaceFluidTokens).map(([key, tokenName]) => [key, spaceScaleCssVar(tokenName)]),
) as Record<SpaceFluid, string>;

const scaleSpacing = Object.fromEntries(
  Object.entries(spaceScaleTokens).map(([key, tokenName]) => [key, spaceScaleCssVar(tokenName)]),
) as Record<SpaceScale, string>;

/**
 * Map of Cedar spacing token names to their CSS values.
 *
 * Provides consistent spacing values across components. Includes both
 * fixed spacing tokens (e.g., 'one-x', 'two-x') and fluid scale tokens
 * (e.g., 'scale-0', 'scale-1') that respond to viewport size.
 *
 * @constant
 * @type {Record<Space, string>}
 *
 * @example
 * spacing['one-x'] // => '16px'
 * spacing['half-x'] // => '8px'
 * spacing['scale-3'] // => 'var(--cdr-space-scale-3)'
 *
 * @example
 * // Using in a component
 * const gap = spacing[props.gap] || props.gap;
 * style.gap = gap;
 */
export const spacing = {
  ...fixedSpacing,
  ...fluidSpacing,
  ...scaleSpacing,
} as { [key in Space]: string };
