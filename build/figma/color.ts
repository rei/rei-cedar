import type { FigmaColor } from './types';

const HEX = /^#([0-9a-f]{3,8})$/i;
const RGB =
  /^rgba?\(\s*([0-9.]+)\s*[, ]\s*([0-9.]+)\s*[, ]\s*([0-9.]+)(?:\s*[,/]\s*([0-9.]+))?\s*\)$/i;

function channel(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function byte(value: number): string {
  return channel(value).toString(16).padStart(2, '0');
}

/** Convert a Figma RGBA object to a normalized CSS hex color. */
export function figmaColorToHex(color: FigmaColor): string {
  const alpha = color.a ?? 1;
  const base = `#${byte(color.r * 255)}${byte(color.g * 255)}${byte(color.b * 255)}`;
  return alpha >= 1 ? base : `${base}${byte(alpha * 255)}`;
}

/**
 * Normalize hex/rgb(a) CSS colors for comparison. Returns null for values we do
 * not parse (for example oklch), so callers can report an explicit finding.
 */
export function normalizeCssColor(value: string): string | null {
  const input = value.trim();
  const hexMatch = HEX.exec(input);
  if (hexMatch) {
    let hex = hexMatch[1].toLowerCase();
    if (hex.length === 3 || hex.length === 4) {
      hex = hex
        .split('')
        .map((part) => `${part}${part}`)
        .join('');
    }
    if (hex.length === 6) return `#${hex}`;
    if (hex.length === 8) return `#${hex}`;
    return null;
  }

  const rgbMatch = RGB.exec(input);
  if (!rgbMatch) return null;

  const [, r, g, b, a] = rgbMatch;
  const alpha = a === undefined ? 1 : Number(a);
  const base = `#${byte(Number(r))}${byte(Number(g))}${byte(Number(b))}`;
  return alpha >= 1 ? base : `${base}${byte(alpha * 255)}`;
}

export function colorsEqual(a: string | null, b: string | null): boolean {
  if (!a || !b) return false;
  return a.toLowerCase() === b.toLowerCase();
}
