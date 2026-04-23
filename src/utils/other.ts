import * as tokens from '@rei/cdr-tokens';
import { Breakpoint, Space, spaceFixedOptions } from '../types/other';
import { NameValuePair } from '../components/layout/types';

/**
 * Capitalizes the first letter of a string.
 *
 * @param text - The string to capitalize
 * @returns The string with the first letter capitalized
 *
 * @example
 * capitalize('hello') // => 'Hello'
 * capitalize('world') // => 'World'
 */
export const capitalize = (text: string): string =>
  String(text[0]).toUpperCase() + String(text).slice(1);

/**
 * Array of Cedar breakpoint names ordered from smallest to largest.
 * Used for responsive layout calculations and media queries.
 *
 * @constant
 * @type {Breakpoint[]}
 *
 * - **xs**: Extra small (mobile, < 768px)
 * - **sm**: Small (tablet, ≥ 768px)
 * - **md**: Medium (small desktop, ≥ 992px)
 * - **lg**: Large (large desktop, ≥ 1232px)
 */
export const breakpoints: Breakpoint[] = ['xs', 'sm', 'md', 'lg'];

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
  ...spaceFixedOptions.reduce((acc: NameValuePair, cur) => {
    const name = `CdrSpace${cur.split('-').map(capitalize).join('')}` as keyof typeof tokens;
    const token = `${tokens[name]}px`;
    acc[cur] = token;
    return acc;
  }, {}),
  'scale-0': 'var(--cdr-space-scale-0)',
  'scale-1': 'var(--cdr-space-scale-1)',
  'scale-2': 'var(--cdr-space-scale-2)',
  'scale-3': 'var(--cdr-space-scale-3)',
  'scale-4': 'var(--cdr-space-scale-4)',
  'scale-5': 'var(--cdr-space-scale-5)',
  'scale-6': 'var(--cdr-space-scale-6)',
  'scale-7': 'var(--cdr-space-scale-7)',
  'scale-8': 'var(--cdr-space-scale-8)',
  'scale-0--1': 'var(--cdr-space-scale-0--1)',
  'scale-3--4': 'var(--cdr-space-scale-3--4)',
  'scale-3--5': 'var(--cdr-space-scale-3--5)',
} as { [key in Space]: string };
