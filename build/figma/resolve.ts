import { figmaColorToHex } from './color';
import type {
  FigmaColor,
  FigmaDataset,
  FigmaLocalVariablesResponse,
  FigmaValue,
  FigmaVariable,
  FigmaVariableAlias,
  FigmaVariableCollection,
} from './types';

export class FigmaResolveError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FigmaResolveError';
  }
}

export function mergeFigmaDatasets(...datasets: FigmaDataset[]): FigmaDataset {
  const merged: FigmaDataset = { variables: {}, collections: {} };
  for (const dataset of datasets) {
    for (const [id, collection] of Object.entries(dataset.collections)) {
      if (merged.collections[id] && merged.collections[id] !== collection) {
        throw new FigmaResolveError(`Conflicting Figma collection definition for ${id}`);
      }
      merged.collections[id] = collection;
    }
    for (const [id, variable] of Object.entries(dataset.variables)) {
      if (merged.variables[id] && merged.variables[id] !== variable) {
        throw new FigmaResolveError(`Conflicting Figma variable definition for ${id}`);
      }
      merged.variables[id] = variable;
    }
  }
  return merged;
}

export function datasetFromResponse(response: FigmaLocalVariablesResponse): FigmaDataset {
  return {
    variables: response.meta.variables,
    collections: response.meta.variableCollections,
  };
}

export function getCollection(
  dataset: FigmaDataset,
  collectionId: string,
): FigmaVariableCollection {
  const collection = dataset.collections[collectionId];
  if (!collection) {
    throw new FigmaResolveError(`Figma collection ${collectionId} was not returned by the API`);
  }
  return collection;
}

export function indexCollectionVariables(
  dataset: FigmaDataset,
  collectionId: string,
): Map<string, FigmaVariable> {
  const byName = new Map<string, FigmaVariable>();
  for (const variable of Object.values(dataset.variables)) {
    if (variable.variableCollectionId !== collectionId) continue;
    if (byName.has(variable.name)) {
      throw new FigmaResolveError(
        `Figma collection ${collectionId} contains duplicate variable name "${variable.name}"`,
      );
    }
    byName.set(variable.name, variable);
  }
  return byName;
}

export function isVariableAlias(value: FigmaValue): value is FigmaVariableAlias {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    value.type === 'VARIABLE_ALIAS'
  );
}

export function isFigmaColor(value: FigmaValue): value is FigmaColor {
  return (
    typeof value === 'object' &&
    value !== null &&
    'r' in value &&
    'g' in value &&
    'b' in value &&
    typeof value.r === 'number' &&
    typeof value.g === 'number' &&
    typeof value.b === 'number'
  );
}

function pickModeValue(
  variable: FigmaVariable,
  preferredModeId?: string,
): { modeId: string; value: FigmaValue } {
  const entries = Object.entries(variable.valuesByMode);
  if (entries.length === 0) {
    throw new FigmaResolveError(`Figma variable "${variable.name}" has no mode values`);
  }

  const preferred = preferredModeId
    ? entries.find(([modeId]) => modeId === preferredModeId)
    : undefined;
  const [modeId, value] = preferred ?? entries[0];
  return { modeId, value };
}

export interface ResolvedFigmaVariable {
  variable: FigmaVariable;
  modeId: string;
  value: FigmaValue;
  /** Name of the direct alias target, when the variable is an alias. */
  aliasName?: string;
  /** Resolved color as a normalized hex value, when the chain ends in a color. */
  color: string | null;
  /** Variable names visited while resolving, starting with the requested variable. */
  chain: string[];
}

export function resolveVariable(
  dataset: FigmaDataset,
  variableId: string,
  preferredModeId?: string,
): ResolvedFigmaVariable {
  const seen = new Set<string>();

  function walk(id: string, chain: string[], modeId?: string): ResolvedFigmaVariable {
    if (seen.has(id)) {
      throw new FigmaResolveError(`Circular Figma variable alias: ${[...chain, id].join(' -> ')}`);
    }
    seen.add(id);

    const variable = dataset.variables[id];
    if (!variable) {
      throw new FigmaResolveError(
        `Figma variable ${id} is not available. Check the adapter's libraryFileKeys.`,
      );
    }

    const picked = pickModeValue(variable, modeId);
    const nextChain = [...chain, variable.name];

    if (isVariableAlias(picked.value)) {
      const target = dataset.variables[picked.value.id];
      if (!target) {
        throw new FigmaResolveError(
          `Figma variable "${variable.name}" aliases ${picked.value.id}, which is not available`,
        );
      }
      const resolved = walk(picked.value.id, nextChain);
      return {
        ...resolved,
        variable,
        modeId: picked.modeId,
        value: picked.value,
        aliasName: target.name,
        chain: nextChain,
      };
    }

    return {
      variable,
      modeId: picked.modeId,
      value: picked.value,
      color: isFigmaColor(picked.value) ? figmaColorToHex(picked.value) : null,
      chain: nextChain,
    };
  }

  return walk(variableId, [], preferredModeId);
}

/** Convert a Figma color-variable name to its Cedar custom-property name. */
export function figmaNameToCssVar(name: string): string | null {
  if (name.startsWith('--cdr-')) return name;
  if (!name.startsWith('color/')) return null;
  return `--cdr-${name.slice('color/'.length).replaceAll('/', '-')}`;
}
