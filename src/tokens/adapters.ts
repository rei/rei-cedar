import type { CdrTypeKey } from '@rei/cdr-tokens/rei-dot-com/types/foundations/cdr-type.keys';

type TypeScaleFromToken<T extends string> = T extends `scale-minus${infer Value}`
  ? `scale-minus-${Value}`
  : T extends `scale${infer Value}`
    ? `scale-${Value}`
    : never;

export type CedarTypeScale = TypeScaleFromToken<CdrTypeKey>;

/**
 * Maps a Cedar text scale value to its CSS custom property name suffix.
 *
 * Cedar's public text scale API uses dashed values like `scale-minus-2`,
 * `scale-minus-1`, `scale-0`, and `scale-7`, while CSS custom properties use
 * suffixes like `minus-2`, `minus-1`, `0`, and `7`.
 */
export function typeScaleCssSuffix(key: CedarTypeScale): string {
  return key.replace('scale-minus-', 'minus-').replace('scale-', '');
}
