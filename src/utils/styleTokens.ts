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
import { spaceCssVar } from '../tokens/adapters';

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
  const suffix = tokenName.replace('CdrSpaceScale', '');
  if (suffix === 'Range0To1') return 'var(--cdr-space-scale-0-1)';
  if (suffix === 'Range3To4') return 'var(--cdr-space-scale-3-4)';
  if (suffix === 'Range3To5') return 'var(--cdr-space-scale-3-5)';
  return `var(--cdr-space-scale-${suffix})`;
}

const fixedSpacing = Object.fromEntries(
  Object.entries(spaceFixedTokens).map(([key, tokenName]) => [
    key,
    `${CdrSpace[tokenName as keyof typeof CdrSpace]}px`,
  ]),
) as Record<SpaceFixed, string>;

const fluidSpacing = Object.fromEntries(
  Object.entries(spaceFluidTokens).map(([key, tokenName]) => [
    key,
    spaceScaleCssVar(tokenName as string),
  ]),
) as Record<SpaceFluid, string>;

const scaleSpacing = Object.fromEntries(
  Object.entries(spaceScaleTokens).map(([key, tokenName]) => [
    key,
    spaceScaleCssVar(tokenName as string),
  ]),
) as Record<SpaceScale, string>;

/**
 * Map of Cedar spacing token names to their CSS values.
 *
 * Provides consistent spacing values across components. Includes both
 * fixed spacing tokens (e.g., 'one-x', 'two-x') and fluid scale tokens
 * (e.g., '4', '3--5') that respond to viewport size.
 *
 * @constant
 * @type {Record<Space, string>}
 *
 * @example
 * spacing['one-x'] // => '16px'
 * spacing['half-x'] // => '8px'
 * spacing['4'] // => 'var(--cdr-space-scale-4)'
 *
 * @example
 * // Using in a component
 * const gap = spacing[spaceCssVar(props.gap)] || props.gap;
 * style.gap = gap;
 */
export const spacing = {
  ...fixedSpacing,
  ...fluidSpacing,
  ...scaleSpacing,
} as { [key in Space]: string };

/**
 * Gets the CSS value for a space prop, handling both simplified and verbose formats.
 *
 * @param key - The space value (e.g., '4', '3--5', 'one-x', or 'scale-4')
 * @returns The CSS value for the space
 */
export function getSpaceValue(key: string | number): string {
  const normalizedKey = spaceCssVar(key);
  return spacing[normalizedKey as Space] || String(key);
}
