import type { ComponentTokenContract } from '../../../build/component-tokens/types';

/**
 * CdrChip Token Contract
 *
 * Declares the styling dependencies for the chip component using the
 * confirmed Cedar semantic taxonomy (see docs/cedar-semantic-taxonomy.md):
 *
 *   Foundation → Interaction Family → Role → Identity → Expression
 *   color        selection            surface  neutral    faint
 *
 * - interaction: CdrChip is wholly the 'selection' interaction family.
 *   SELECTION intent: interactive choice selection that doesn't itself submit
 *   data (chips are chosen in conjunction with an action elsewhere). No
 *   recipe: chip consumes the SCSS maps directly, following CdrBanner/CdrLink.
 * - variants: `default` and `selected`, both identity `neutral`. The selected
 *   (aria-pressed / aria-checked) treatment reassigns the same custom
 *   properties, so every state rule automatically follows. The generator has
 *   no `conditions` support, hence a full second variant instead.
 * - expressions use only steps Figma's selection mapping confirms
 *   (trace/faint/base/subtle): rest faint, hover/focus base (focus is further
 *   distinguished by elevation, as in legacy), active/selected subtle,
 *   disabled trace. Selected has no darker step available — a pressed-depth
 *   treatment would need a bold/intense selection surface (flagged for design).
 * - selected+disabled repeats the selected rest slots with the selected rest
 *   legacy fallbacks (no selected-disabled legacy tokens exist; legacy CSS
 *   order lets pressed win over disabled, preserved here).
 * - text/icon stay `neutral` throughout (legacy never recolors chip text);
 *   icon resolves against the text namespace — same generator behavior as
 *   CdrButton.
 * - legacy: temporary bridge to current @rei/cdr-tokens Sass variable names.
 *
 * Migration Guide: See docs/button-semantic-migration-guide.md for the pattern.
 *
 * To regenerate the SCSS maps from this contract:
 *   pnpm build:maps
 */

const contract: ComponentTokenContract = {
  component: 'cdr-chip',
  prefix: '--cdr-chip',
  interaction: 'selection',

  defaults: {},

  // ══════════════════════════════════════════════════════════════════════════
  // COLOR VARIANTS — role × state → semantic token suffix
  //
  // surface → background, text → color, border → inset box-shadow ring,
  // icon → fill (independent values, text namespace).
  // ══════════════════════════════════════════════════════════════════════════

  variants: {
    default: {
      identity: 'neutral',
      rest: { surface: 'neutral-faint', text: 'neutral', border: 'neutral-faint', icon: 'neutral' },
      hover: { surface: 'neutral', text: 'neutral', border: 'neutral', icon: 'neutral' },
      'focus-visible': {
        surface: 'neutral',
        text: 'neutral',
        border: 'neutral',
        icon: 'neutral',
      },
      active: {
        surface: 'neutral-subtle',
        text: 'neutral',
        border: 'neutral-subtle',
        icon: 'neutral',
      },
      disabled: {
        surface: 'neutral-trace',
        text: 'neutral',
        border: 'neutral-faint',
        icon: 'neutral',
      },
    },

    selected: {
      identity: 'neutral',
      rest: {
        surface: 'neutral-subtle',
        text: 'neutral',
        border: 'neutral-subtle',
        icon: 'neutral',
      },
      hover: {
        surface: 'neutral-subtle',
        text: 'neutral',
        border: 'neutral-subtle',
        icon: 'neutral',
      },
      'focus-visible': {
        surface: 'neutral-subtle',
        text: 'neutral',
        border: 'neutral-subtle',
        icon: 'neutral',
      },
      active: {
        surface: 'neutral-subtle',
        text: 'neutral',
        border: 'neutral-subtle',
        icon: 'neutral',
      },
      disabled: {
        surface: 'neutral-subtle',
        text: 'neutral',
        border: 'neutral-subtle',
        icon: 'neutral',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // LEGACY FALLBACK MAP — TEMPORARY
  // Delete this entire section when semantic tokens ship in @rei/cdr-tokens.
  // ══════════════════════════════════════════════════════════════════════════

  legacy: {
    // ── Default ──
    'default/background': 'cdr-color-background-chip-default-rest',
    'default/background-hover': 'cdr-color-background-chip-default-hover',
    'default/background-focus-visible': 'cdr-color-background-chip-default-focus',
    'default/background-active': 'cdr-color-background-chip-default-active',
    'default/background-disabled': 'cdr-color-background-chip-default-disabled',
    'default/text': 'cdr-color-text-chip-default',
    'default/text-hover': 'cdr-color-text-chip-default',
    'default/text-focus-visible': 'cdr-color-text-chip-default',
    'default/text-active': 'cdr-color-text-chip-default',
    'default/text-disabled': 'cdr-color-text-chip-disabled',
    'default/border': 'cdr-color-border-chip-default-rest',
    'default/border-hover': 'cdr-color-border-chip-default-hover',
    'default/border-focus-visible': 'cdr-color-border-chip-default-focus',
    'default/border-active': 'cdr-color-border-chip-default-active',
    'default/border-disabled': 'cdr-color-border-chip-default-disabled',
    'default/fill': 'cdr-color-text-chip-default',
    'default/fill-hover': 'cdr-color-text-chip-default',
    'default/fill-focus-visible': 'cdr-color-text-chip-default',
    'default/fill-active': 'cdr-color-text-chip-default',
    'default/fill-disabled': 'cdr-color-text-chip-disabled',

    // ── Selected (pressed wins over disabled, matching legacy CSS order) ──
    'selected/background': 'cdr-color-background-chip-default-selected',
    'selected/background-hover': 'cdr-color-background-chip-default-selected-hover',
    'selected/background-focus-visible': 'cdr-color-background-chip-default-selected-focus',
    'selected/background-active': 'cdr-color-background-chip-default-selected-active',
    'selected/background-disabled': 'cdr-color-background-chip-default-selected',
    'selected/text': 'cdr-color-text-chip-default',
    'selected/text-hover': 'cdr-color-text-chip-default',
    'selected/text-focus-visible': 'cdr-color-text-chip-default',
    'selected/text-active': 'cdr-color-text-chip-default',
    'selected/text-disabled': 'cdr-color-text-chip-default',
    'selected/border': 'cdr-color-border-chip-default-selected-rest',
    'selected/border-hover': 'cdr-color-border-chip-default-selected-hover',
    'selected/border-focus-visible': 'cdr-color-border-chip-default-selected-focus',
    'selected/border-active': 'cdr-color-border-chip-default-selected-focus',
    'selected/border-disabled': 'cdr-color-border-chip-default-selected-rest',
    'selected/fill': 'cdr-color-text-chip-default',
    'selected/fill-hover': 'cdr-color-text-chip-default',
    'selected/fill-focus-visible': 'cdr-color-text-chip-default',
    'selected/fill-active': 'cdr-color-text-chip-default',
    'selected/fill-disabled': 'cdr-color-text-chip-default',
  },
};

export default contract;
