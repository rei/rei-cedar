/**
 * Component Token Contract — Type Definitions
 *
 * Vocabulary derived from canonical token structure (color.{intent}.{identity}.{prominence}).
 * These types constrain what components can ask for. The pipeline validates that the
 * requested tokens exist and generates SCSS maps from the contract.
 */

// ============================================================================
// VOCABULARY — derived from canonical token metadata
// ============================================================================

/** Semantic color intents from canonical/tokens.json */
export type ColorIntent = 'action' | 'selection' | 'navigation' | 'feedback' | 'surface';

/** Color identity — the visual material */
export type ColorIdentity = 'brand' | 'neutral' | 'sale' | 'inverse' | 'link';

/** Component interaction states */
export type InteractionState = 'rest' | 'hover' | 'active' | 'disabled';

// ============================================================================
// CONTRACT SHAPE
// ============================================================================

/**
 * Maps each depth to a semantic token suffix.
 *
 * The suffix is the part after `--cdr-color-{intent}-{cssDepth}-`.
 * It includes the identity and optional prominence:
 *   'brand'          → --cdr-color-action-surface-brand
 *   'brand-faint'    → --cdr-color-action-surface-brand-faint
 *   'neutral-trace'  → --cdr-color-action-surface-neutral-trace (cross-identity)
 */
export interface DepthMap {
  /** Suffix for --cdr-color-{intent}-surface-{bg} */
  bg: string;
  /** Suffix for --cdr-color-{intent}-text-{fg} (also used for fill unless overridden) */
  fg: string;
  /** Suffix for --cdr-color-{intent}-border-{edge} */
  edge: string;
}

export interface VariantContract {
  /** Which semantic intent this variant belongs to */
  intent: ColorIntent;
  /** Which color identity this variant uses (informational — for validation/docs) */
  identity: ColorIdentity;

  /** State → depth prominence mappings */
  rest: DepthMap;
  hover: DepthMap;
  active: DepthMap;
  disabled: DepthMap;

  /**
   * Override fill to differ from foreground at specific states.
   * Omit a state to mirror the foreground value.
   *
   * Values are either:
   *   - A suffix string (resolved as `--cdr-color-{intent}-text-{suffix}`)
   *   - An object `{ fullPath: string }` for paths outside the intent
   *     (resolved as `--cdr-color-{fullPath}`)
   */
  fillOverrides?: Partial<Record<InteractionState, string | { fullPath: string }>>;

  /**
   * Extra component properties beyond the standard depth × state matrix.
   * Key = component property name, value = null (legacy-only, no semantic custom property yet).
   */
  extras?: Record<string, null>;
}

/** Interaction behavior families — determines CSS structure template */
export type InteractionFamily = 'action' | 'selection' | 'control';

export interface ComponentTokenContract {
  /** Component name, e.g. 'cdr-button' */
  component: string;

  /** CSS custom property prefix, e.g. '--cdr-button' */
  prefix: string;

  /** Which behavior family template to use for CSS generation */
  family?: InteractionFamily;

  /**
   * Default custom property values.
   * Strings starting with 'cdr-' are token references → `tokens.$cdr-...`
   * Other strings and numbers are literal values.
   */
  defaults: Record<string, string | number>;

  /** Color variant definitions */
  variants: Record<string, VariantContract>;

  /** Size definitions (not all components have sizes) */
  sizes?: Record<string, Record<string, string | number>>;

  /**
   * TEMPORARY: Legacy token fallback map.
   * Delete when semantic tokens ship in @rei/cdr-tokens.
   *
   * Keyed by `{variantName}/{componentProperty}` → legacy Sass variable name.
   * e.g. `'primary/background' → 'cdr-color-background-button-primary-rest'`
   */
  legacy?: Record<string, string>;
}
