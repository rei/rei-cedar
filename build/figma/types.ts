import type {
  ColorRole,
  ComponentTokenContract,
  InteractionState,
} from '../component-tokens/types';

export interface FigmaColor {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export interface FigmaVariableAlias {
  type: 'VARIABLE_ALIAS';
  id: string;
}

export type FigmaValue = FigmaColor | FigmaVariableAlias | string | number | boolean;

export interface FigmaVariable {
  id: string;
  name: string;
  description?: string;
  variableCollectionId: string;
  resolvedType: string;
  valuesByMode: Record<string, FigmaValue>;
}

export interface FigmaCollectionMode {
  modeId: string;
  name: string;
}

export interface FigmaVariableCollection {
  id: string;
  name: string;
  modes: FigmaCollectionMode[];
  defaultModeId: string;
  variableIds?: string[];
}

export interface FigmaLocalVariablesResponse {
  status?: number;
  error?: boolean;
  meta: {
    variableCollections: Record<string, FigmaVariableCollection>;
    variables: Record<string, FigmaVariable>;
  };
}

export interface FigmaDataset {
  variables: Record<string, FigmaVariable>;
  collections: Record<string, FigmaVariableCollection>;
}

export type CompareMode = 'alias' | 'value';

export type ContractTarget =
  | {
      kind: 'slot';
      variant: string;
      state: InteractionState;
      role: ColorRole;
    }
  | {
      kind: 'extra';
      variant: string;
      extra: string;
    };

export interface BindingTarget {
  target: ContractTarget;
  /**
   * `alias` checks that the Figma variable points at the same semantic token as
   * the Cedar contract. `value` only checks the resolved color, for cases where
   * the Figma variable uses a different role token with the same value (for
   * example a text variable backing an icon slot).
   */
  compare?: CompareMode;
}

export interface FigmaBinding {
  /** Figma variable name, e.g. `button/primary/surface`. */
  figma: string;
  /** Cedar contract slots backed by this variable. */
  targets: BindingTarget[];
  note?: string;
}

export interface LegacyBinding {
  /** Figma variable kept for traceability but not represented in Cedar. */
  figma: string;
  reason: string;
}

export interface FigmaComponentAdapter {
  /** Stable adapter id used by the CLI, e.g. `button`. */
  id: string;
  /** Cedar component name, e.g. `cdr-button`. */
  component: string;
  source: {
    fileKey: string;
    collectionId: string;
    name: string;
    modeId?: string;
  };
  /** Files that publish variables referenced by the source file. */
  libraryFileKeys: string[];
  /** Only variables with this name prefix belong to the adapter. */
  variablePrefix: string;
  contract: ComponentTokenContract;
  bindings: FigmaBinding[];
  legacy: LegacyBinding[];
}
