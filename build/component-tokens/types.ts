/**
 * Component Token Contract — Type Definitions
 *
 * Vocabulary derived from the confirmed Cedar semantic taxonomy:
 *   Foundation → Interaction Family → Role → Identity → Expression
 * See docs/cedar-semantic-taxonomy.md for the full discovery/alignment record.
 *
 * The taxonomy was refined in Sept 2026 to clarify intent distinctions:
 * - ACTION: triggers user actions, navigation, content manipulation, or final submission
 * - CONTROL: manipulating or configuring the interface (errors use FEEDBACK intent)
 * - SELECTION: interactive choice selection that doesn't itself submit data
 * - FEEDBACK: system communications including inline validation on form controls
 *
 * These types constrain what components can ask for. The pipeline validates that the
 * requested tokens exist and generates SCSS maps + CSS from the contract.
 */

// ============================================================================
// VALUE TYPES — explicit token references vs. literal CSS values
// ============================================================================

export interface TokenReference {
  kind: 'token';
  name: string;
}

export interface LiteralValue {
  kind: 'literal';
  value: string | number;
}

/** A semantic color and its current, publishable fallback. */
export interface SemanticReference {
  kind: 'semantic';
  name: SemanticColorPath;
  fallback: TokenReference | LiteralValue;
}

export type ContractValue = TokenReference | LiteralValue | SemanticReference;

export function token(name: string): TokenReference {
  return { kind: 'token', name };
}

export function literal(value: string | number): LiteralValue {
  return { kind: 'literal', value };
}

export function semantic(
  name: SemanticColorPath,
  fallback: TokenReference | LiteralValue,
): SemanticReference {
  return { kind: 'semantic', name, fallback };
}

// ============================================================================
// VOCABULARY — confirmed against Semantics/Primitives - Color.pdf and the
// Cedar Evolution strategic deck. See docs/cedar-semantic-taxonomy.md.
// ============================================================================

/**
 * Interaction Family — "why does the thing exist". Component-level, not
 * per-variant: a component like CdrButton is wholly `action`.
 *
 * Refined Sept 2026:
 * - ACTION: triggers user actions, navigation, content manipulation, or final submission
 * - CONTROL: user is manipulating or configuring the interface itself (error states use FEEDBACK intent)
 * - SELECTION: interactive choice selection that doesn't itself submit data
 * - FEEDBACK: system communications including inline validation on form controls
 *
 * OMITTABLE: a component/token with no interaction context (a foundation-only
 * token, e.g. `color.surface.neutral`) simply has no interaction segment in
 * its name. There is no "universal" value — omission IS the universal case.
 */
export const INTERACTION_FAMILIES = ['action', 'feedback', 'selection', 'control'] as const;
export type Interaction = (typeof INTERACTION_FAMILIES)[number];

/** Role — "what job does it perform". */
export const COLOR_ROLES = ['surface', 'text', 'border', 'icon'] as const;
export type ColorRole = (typeof COLOR_ROLES)[number];

/**
 * Identity — "what does it mean". Confirmed list from token decks (broader
 * than the strategic deck's abbreviated summary slide, which omits natural/
 * info/membership/rating for space but they appear throughout the token
 * examples).
 *
 * NOTE: `inverse` and `link` are NOT identities. A "dark"/"inverse" variant is
 * `identity: neutral` at a bold/intense expression. Link/trigger-style text
 * is `identity: trigger`.
 *
 * NOTE: The current taxonomy intentionally models all semantic identities through
 * a single Identity axis. This has proven sufficient for the initial semantic
 * color foundations and component-contract prototype.
 *
 * Future taxonomy work may further refine the Identity axis if additional
 * foundations, palettes, or interaction families demonstrate that certain
 * identities represent fundamentally different concepts.
 *
 * For example, some identities (warning, success, error, info) primarily exist
 * within the feedback interaction family, while others (brand, sale, membership,
 * natural) appear more broadly across interaction families. Such a distinction
 * remains exploratory and should not be introduced until a clear semantic or
 * implementation benefit has been demonstrated.
 */
export const COLOR_IDENTITIES = [
  'brand',
  'accent',
  'warning',
  'success',
  'sale',
  'trigger',
  'neutral',
  'natural',
  'info',
  'membership',
  'rating',
  'error',
] as const;
export type ColorIdentity = (typeof COLOR_IDENTITIES)[number];

/**
 * Expression — "how strongly it expresses itself". This is a hierarchy
 * primitive, not a color-specific concept: the same 7-step scale is reused
 * across every role and identity, and is expected to eventually apply to
 * other foundations (space, shape, motion).
 *
 * OMITTABLE: `base` is never written as a literal token suffix. It is the
 * state of not appending an expression segment at all.
 * `color.surface.brand` IS `color.surface.brand.base`.
 */
export const EXPRESSIONS = [
  'trace',
  'faint',
  'subtle',
  'base',
  'prominent',
  'bold',
  'intense',
] as const;
export type Expression = (typeof EXPRESSIONS)[number];

export type SemanticColorPath =
  `${'' | `${Interaction}-`}${ColorRole}-${ColorIdentity}${'' | `-${Exclude<Expression, 'base'>}`}`;

/** Interaction states a component can expose (component-behavior concept, not a taxonomy tier) */
export type InteractionState = 'rest' | 'hover' | 'focus-visible' | 'active' | 'disabled';

/**
 * Visual recipe — how a component expresses its interaction family in CSS.
 * One interaction family can have multiple recipes (e.g. action → pressable,
 * text-action, elevated, icon-only).
 */
export type VisualRecipe =
  | 'pressable' // filled/outlined button-like
  | 'text-action' // link-like
  | 'elevated' // pressable with elevation
  | 'icon-only' // icon button
  | 'outlined'; // ghost/outline

// ============================================================================
// CONTRACT SHAPE
// ============================================================================

/**
 * A color-slot value is either a semantic token suffix (identity + optional
 * expression, e.g. 'brand', 'brand-faint') or an escape hatch to a fully
 * qualified path outside the component's interaction/identity context
 * (e.g. the foundation-only `icon-neutral` token).
 */
export type ColorSlotValue = string | { fullPath: string };

/**
 * Maps only the roles consumed by this component in this interaction state.
 *
 * The suffix is the part after `--cdr-color-{interaction}-{role}-`. It
 * includes the identity and, if not base, the expression:
 *   'brand'          → --cdr-color-action-surface-brand            (implicit .base)
 *   'brand-faint'    → --cdr-color-action-surface-brand-faint
 *   'neutral-trace'  → --cdr-color-action-surface-neutral-trace    (cross-identity)
 */
export type ColorSlotMap = Partial<Record<ColorRole, ColorSlotValue>>;

export interface VariantContract {
  /** Which identity this variant uses */
  identity: ColorIdentity;

  /** State → role mappings */
  rest: ColorSlotMap;
  hover?: ColorSlotMap;
  'focus-visible'?: ColorSlotMap;
  active?: ColorSlotMap;
  disabled?: ColorSlotMap;

  /**
   * Extra component properties beyond the standard role × state matrix.
   * Key = component property name. Values may reference semantics directly;
   * null uses the matching legacy entry during migration.
   */
  extras?: Record<string, ContractValue | null>;
}

export interface ComponentTokenContract {
  /** Component name, e.g. 'cdr-button' */
  component: string;

  /** CSS custom property prefix, e.g. '--cdr-button' */
  prefix: string;

  /**
   * Which interaction family this component belongs to. Omit for
   * foundation-only components with no interaction context.
   */
  interaction?: Interaction;

  /** Optional CSS assignment recipe. Omit to generate only SCSS maps. */
  recipe?: VisualRecipe;

  /**
   * Foundation assignments (future architecture).
   * Organizes token references by foundation domain (color, radius, typography, prominence, space).
   * This aligns with Cedar's move toward Design Foundations → Component Contracts → Platform Output.
   *
   * AUTHORITY: foundationAssignments is the target architecture. defaults is the transitional
   * representation used during migration from legacy component tokens. Once migration is complete,
   * defaults should become an implementation detail generated from foundationAssignments.
   *
   * IMPLEMENTATION TIMING: This should remain as "Future Architecture" until space, typography,
   * and prominence foundations are actually semanticized. Right now it is a useful destination,
   * not a current implementation requirement.
   *
   * TEMPORARY: Not yet implemented; using defaults flat structure for now.
   */
  foundationAssignments?: {
    color?: Record<string, ContractValue>;
    radius?: Record<string, ContractValue>;
    typography?: Record<string, ContractValue>;
    prominence?: Record<string, ContractValue>;
    space?: Record<string, ContractValue>;
  };

  /**
   * Default custom property values.
   * Use semantic(path, fallback) for colors, token('cdr-...') for existing
   * foundations, and literal(...) for intentional CSS values.
   *
   * AUTHORITY: This is the transitional representation during migration from legacy component tokens.
   * Once foundationAssignments is implemented, defaults should become an implementation detail
   * generated from foundationAssignments rather than a separate source of truth.
   *
   * TEMPORARY: Will migrate to foundationAssignments structure.
   */
  defaults: Record<string, ContractValue>;

  /** Color variant definitions */
  variants: Record<string, VariantContract>;

  /** Optional compositional conditions (e.g. selected, checked) applied over the variant.
   * TEMPORARY: not generated — the validator rejects non-empty conditions.
   * Model conditional treatments as variants until generation is implemented. */
  conditions?: Record<string, ColorSlotMap>;

  /** Size definitions (not all components have sizes) */
  sizes?: Record<string, Record<string, ContractValue>>;

  /**
   * TEMPORARY: Legacy token fallback map.
   * Delete when semantic tokens ship in @rei/cdr-tokens.
   *
   * Keyed by `{variantName}/{componentProperty}` → legacy Sass variable name.
   * e.g. `'primary/background' → 'cdr-color-background-button-primary-rest'`
   */
  legacy?: Record<string, string>;
}
