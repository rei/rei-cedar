import type { CdrTypeKey } from '@rei/cdr-tokens/types/type.keys';

type TypeScaleFromToken<T extends string> = T extends `scale-minus${infer Value}`
  ? `scale-minus-${Value}`
  : T extends `scale${infer Value}`
    ? `scale-${Value}`
    : never;

export type CedarTypeScale = TypeScaleFromToken<CdrTypeKey>;

/**
 * Maps a Cedar text scale value to its CSS custom property name suffix.
 *
 * Accepts both the verbose format (`scale-minus-2`, `scale-3`) and
 * the simplified numeric format (`-2`, `3`) for consumer convenience.
 * CSS custom properties use suffixes like `minus-2`, `minus-1`, `0`, and `7`.
 */
export function typeScaleCssSuffix(key: CedarTypeScale | string | number): string {
  const value = String(key);
  // Handle numeric format (e.g., '3', '-2')
  if (/^-?\d+$/.test(value)) {
    return value.startsWith('-') ? `minus-${value.slice(1)}` : value;
  }
  // Handle verbose format (e.g., 'scale-3', 'scale-minus-2')
  return value.replace('scale-minus-', 'minus-').replace('scale-', '');
}

/**
 * Maps a Cedar space value to its CSS custom property name.
 *
 * Accepts both the verbose format (`scale-4`, `scale-3--5`) and
 * the simplified format (`4`, `3--5`) for consumer convenience.
 * Fixed space values (e.g., 'zero', 'one-x') are passed through unchanged.
 */
export function spaceCssVar(key: string | number): string {
  const value = String(key);
  // Handle fixed space values (pass through)
  if (/^(zero|one-x|two-x|half-x|quarter-x|three-x|four-x|five-x|six-x)$/.test(value)) {
    return value;
  }
  // Handle simplified format (e.g., '4', '3--5')
  if (/^\d+(--\d+)?$/.test(value)) {
    return `scale-${value}`;
  }
  // Handle verbose format (pass through for backward compatibility)
  return value;
}
