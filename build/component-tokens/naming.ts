/**
 * Shared naming + resolution for component token contracts.
 *
 * Single source of truth for how a contract's role × state matrix becomes
 * CSS custom property names. Previously duplicated (with drift) across
 * generate-component-maps.ts and families/action.ts.
 *
 * Real token grammar (see .agents/skills/semantic-token-migration/
 * references/semantic-colors.json):
 *   --cdr-color-[<interaction>-]<role>-<identity>[-<expression>]
 * The `color-` segment is part of the public CSS custom-property name. `icon`
 * is its own role family (e.g. --cdr-color-action-icon-neutral, not text).
 */

import type { ColorRole, ColorSlotValue, InteractionState, VariantContract } from './types';

/** Component property name for each role (surface→background, icon→fill, …). */
export const PROP_NAME: Record<ColorRole, string> = {
  surface: 'background',
  text: 'text',
  border: 'border',
  icon: 'fill',
};

/** Component property name for a given role + state (rest = bare name). */
export function propKey(role: ColorRole, state: InteractionState): string {
  const name = PROP_NAME[role];
  return state === 'rest' ? name : `${name}-${state}`;
}

/**
 * Build a semantic custom property name, honoring the omittable interaction
 * segment (absent interaction = Universal, e.g. --cdr-color-text-neutral).
 */
export function semanticVar(
  interaction: string | undefined,
  role: ColorRole,
  suffix: string,
): string {
  return interaction
    ? `--cdr-color-${interaction}-${role}-${suffix}`
    : `--cdr-color-${role}-${suffix}`;
}

/** Resolve a fullPath suffix after the color foundation segment. */
export function fullPathVar(fullPath: string): string {
  return `--cdr-color-${fullPath}`;
}

/** Resolve any slot value (plain suffix or fullPath) to its var name. */
export function slotVar(
  interaction: string | undefined,
  role: ColorRole,
  value: ColorSlotValue,
): string {
  return typeof value === 'object' && 'fullPath' in value
    ? fullPathVar(value.fullPath)
    : semanticVar(interaction, role, value);
}

const STATES: InteractionState[] = ['rest', 'hover', 'focus-visible', 'active', 'disabled'];

const ROLES: ColorRole[] = ['surface', 'text', 'border', 'icon'];

/**
 * Every role × state pair the variant explicitly defines, in canonical order.
 * Only explicit entries are emitted — a stateless component (rest only)
 * produces rest entries alone, never phantom hover/focus/active/disabled.
 */
export function* explicitSlots(
  variant: VariantContract,
): Generator<{ state: InteractionState; role: ColorRole; value: ColorSlotValue }> {
  for (const state of STATES) {
    const slotMap = variant[state];
    if (!slotMap) continue;
    for (const role of ROLES) {
      const value = slotMap[role];
      if (value !== undefined) yield { state, role, value };
    }
  }
}

/** Slug for generated SCSS map names: 'cdr-button' → 'button'. */
export function mapSlug(component: string): string {
  return component.replace(/^cdr-/, '');
}
