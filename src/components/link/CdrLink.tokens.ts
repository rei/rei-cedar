import type { ComponentTokenContract } from '../../../build/component-tokens/types';

/**
 * CdrLink Token Contract
 *
 * Declares the styling dependencies for the link component using the
 * confirmed Cedar semantic taxonomy (see docs/cedar-semantic-taxonomy.md):
 *
 *   Foundation → Interaction Family → Role → Identity → Expression
 *   color        action              text   trigger    (base = omitted)
 *
 * - interaction: CdrLink is wholly the 'action' interaction family
 *   (navigation / content manipulation). No recipe: only pressable-style
 *   components get generated CSS; link consumes the SCSS maps directly,
 *   following CdrBanner.
 * - variants: `standard` (identity `trigger` — the retired `link` identity
 *   lives on as `trigger`) and `neutral` (identity `neutral`, the surviving
 *   `.cdr-link--neutral` class). `standalone` is decoration-only and
 *   `inheritColor` is a behavior, so neither carries color tokens.
 * - states: rest/hover/active carry the legacy mappings; focus-visible repeats
 *   the rest slots but keeps the active legacy fallback (legacy colors focus
 *   like active); disabled repeats rest with no legacy fallback (links have no
 *   disabled styling — the bare var is unconsumed and inert).
 * - surface/border: links render no surface or border. Both slots repeat the
 *   text suffix with no legacy fallback so the role × state matrix stays
 *   uniform; they are unconsumed by the styles and therefore inert, NOT a
 *   token requirement. Wiring a real surface/border treatment later means
 *   consuming `--cdr-link-background(-state)` / `--cdr-link-border(-state)`.
 * - legacy: temporary bridge to current @rei/cdr-tokens Sass variable names.
 *
 * Migration Guide: See docs/button-semantic-migration-guide.md for the pattern.
 *
 * To regenerate the SCSS maps from this contract:
 *   pnpm build:maps
 */

const contract: ComponentTokenContract = {
  component: 'cdr-link',
  prefix: '--cdr-link',
  interaction: 'action',

  // No color defaults: link typography/layout stay as consumer-overridable
  // `var(--cdr-link-*, …)` fallbacks in the base mixin (see CdrLink.vars.scss).
  defaults: {},

  // ══════════════════════════════════════════════════════════════════════════
  // COLOR VARIANTS — role × state → semantic token suffix
  //
  // text → color, icon → fill (independent values, text namespace — same
  // generator behavior as CdrButton). surface/border repeat the text suffix,
  // unconsumed (see above).
  // ══════════════════════════════════════════════════════════════════════════

  variants: {
    standard: {
      identity: 'trigger',
      rest: { surface: 'trigger', text: 'trigger', border: 'trigger', icon: 'trigger' },
      hover: {
        surface: 'trigger-faint',
        text: 'trigger-faint',
        border: 'trigger-faint',
        icon: 'trigger-faint',
      },
      'focus-visible': {
        surface: 'trigger',
        text: 'trigger',
        border: 'trigger',
        icon: 'trigger',
      },
      active: { surface: 'trigger', text: 'trigger', border: 'trigger', icon: 'trigger' },
      disabled: { surface: 'trigger', text: 'trigger', border: 'trigger', icon: 'trigger' },
    },

    neutral: {
      identity: 'neutral',
      rest: { surface: 'neutral', text: 'neutral', border: 'neutral', icon: 'neutral' },
      hover: { surface: 'neutral', text: 'neutral', border: 'neutral', icon: 'neutral' },
      'focus-visible': {
        surface: 'neutral',
        text: 'neutral',
        border: 'neutral',
        icon: 'neutral',
      },
      active: { surface: 'neutral', text: 'neutral', border: 'neutral', icon: 'neutral' },
      disabled: { surface: 'neutral', text: 'neutral', border: 'neutral', icon: 'neutral' },
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // LEGACY FALLBACK MAP — TEMPORARY
  // Delete this entire section when semantic tokens ship in @rei/cdr-tokens.
  //
  // Only text/icon slots consumed by the styles carry fallbacks; surface,
  // border, and disabled slots are unconsumed (see above) and intentionally
  // bare.
  // ══════════════════════════════════════════════════════════════════════════

  legacy: {
    // ── Standard (trigger) ──
    'standard/text': 'cdr-color-text-link-rest',
    'standard/text-hover': 'cdr-color-text-link-hover',
    'standard/text-focus-visible': 'cdr-color-text-link-active',
    'standard/text-active': 'cdr-color-text-link-active',
    'standard/fill': 'cdr-color-text-link-rest',
    'standard/fill-hover': 'cdr-color-text-link-hover',
    'standard/fill-focus-visible': 'cdr-color-text-link-active',
    'standard/fill-active': 'cdr-color-text-link-active',

    // ── Neutral ──
    'neutral/text': 'cdr-color-text-primary',
    'neutral/text-hover': 'cdr-color-text-primary',
    'neutral/text-focus-visible': 'cdr-color-text-primary',
    'neutral/text-active': 'cdr-color-text-primary',
    'neutral/fill': 'cdr-color-text-primary',
    'neutral/fill-hover': 'cdr-color-text-primary',
    'neutral/fill-focus-visible': 'cdr-color-text-primary',
    'neutral/fill-active': 'cdr-color-text-primary',
  },
};

export default contract;
