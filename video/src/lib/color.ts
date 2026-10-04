export type Rgb = {
  r: number;
  g: number;
  b: number;
};

export const hexToRgb = (hex: string): Rgb => {
  const normalized = hex.replace('#', '');
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => char + char)
          .join('')
      : normalized;
  const value = Number.parseInt(full, 16);
  return {
    r: (value >> 16) & 0xff,
    g: (value >> 8) & 0xff,
    b: value & 0xff,
  };
};

const linearChannel = (channel: number) => {
  const scaled = channel / 255;
  return scaled <= 0.03928 ? scaled / 12.92 : ((scaled + 0.055) / 1.055) ** 2.4;
};

export const relativeLuminance = (hex: string): number => {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * linearChannel(r) + 0.7152 * linearChannel(g) + 0.0722 * linearChannel(b);
};

/** Pick label ink that stays readable on top of a token swatch. */
export const textOn = (hex: string): string =>
  relativeLuminance(hex) > 0.35 ? 'rgba(46, 46, 43, 0.92)' : '#fafbf9';
