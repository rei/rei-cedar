import raw from './token-model.json';

export type SemanticRef = {
  name: string;
  path: string;
  group: string;
  hex: string;
};

export type PaletteStep = {
  step: string;
  order: number;
  hex: string;
  oklch: string;
  hue: number | null;
  semantic: SemanticRef[];
};

export type Palette = {
  name: string;
  steps: PaletteStep[];
  matchedCount: number;
};

export type ExampleCallout = {
  name: string;
  path: string;
  group: string;
  hex: string;
  palette: string;
  step: string;
  tokenCount: number;
};

export type StructureToken = {
  name: string;
  path: string;
  group: string;
  hex: string;
  palette: string | null;
  step: string | null;
};

export type StructureCategory = {
  id: string;
  label: string;
  interaction: string | null;
  namespaces: string[];
  description: string;
  count: number;
  roles: { role: string; count: number }[];
  swatches: string[];
  tokens: StructureToken[];
};

export type TokenModel = {
  legacyColors: Record<string, string>;
  source: {
    webTokens: string;
    semanticColors: string;
    generatedAt: string;
  };
  meta: {
    paletteCount: number;
    matchedPaletteCount: number;
    stepCount: number;
    matchedStepCount: number;
    semanticTokenCount: number;
    matchedSemanticTokenCount: number;
    unmatchedHexes: string[];
  };
  examples: ExampleCallout[];
  structure: StructureCategory[];
  palettes: Palette[];
};

export const model = raw as unknown as TokenModel;
export const { palettes, examples, meta, structure } = model;

export const keptPalettes = palettes.filter((palette) => palette.matchedCount > 0);
