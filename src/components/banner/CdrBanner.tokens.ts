import type { ComponentTokenContract, ColorSlotMap } from '../../../build/component-tokens/types';
import { token } from '../../../build/component-tokens/types';

/**
 * CdrBanner Token Contract
 *
 * Declares the styling dependencies for the banner component using the
 * confirmed Cedar semantic taxonomy (see docs/cedar-semantic-taxonomy.md):
 *
 *   Foundation → Interaction Family → Role → Identity → Expression
 *   color        feedback             surface  warning    (base = omitted)
 *
 * - interaction: CdrBanner is wholly the 'feedback' interaction family.
 *   FEEDBACK intent: system communications that provide status information,
 *   validation results, or operational feedback.
 * - variants: banner `type` maps 1:1 to an identity —
 *   default → neutral, info → info, success → success,
 *   warning → warning, error → error.
 * - states: banner is static (no hover/active/disabled). Every state repeats
 *   the rest slots so the contract satisfies the role × state matrix without
 *   inventing states the component does not have.
 * - default variant: Figma's feedback mapping has no `feedback.surface.neutral`
 *   (feedback surfaces exist only for info/success/natural/warning/error), so
 *   `feedback.surface.neutral` (plus text/border) is mapped prospectively here
 *   and flagged for design to add to the deck — see
 *   docs/banner-semantic-implementation.md. Legacy fallbacks preserve rendering
 *   until the token exists.
 * - icon: specified independently per variant (fill), but the generator
 *   resolves the icon role against the text-role token namespace
 *   (`--cdr-color-feedback-text-{suffix}`), matching CdrButton. Figma confirms
 *   icon values differ from text values, so the generator should emit a true
 *   `--cdr-color-feedback-icon-*` namespace once icon-family tokens ship.
 * - message text: banner message inherits its color today (no legacy message
 *   text token), so the text slots carry no legacy fallback. While semantic
 *   tokens are unshipped the bare `var(--cdr-color-…)` is invalid at
 *   computed-value time and preserves `inherit`; once shipped it applies the
 *   identity text color.
 * - extras (legacy-only, no semantic home yet): `outline` (thin outline,
 *   needs a faint-step border token) and `icon-tile-background` (saturated
 *   icon tile, needs a second surface slot — the 4-role matrix holds only one
 *   surface per state). Both keep legacy values for visual parity.
 * - legacy: temporary bridge to current @rei/cdr-tokens Sass variable names.
 *
 * Migration Guide: See docs/button-semantic-migration-guide.md for the pattern.
 *
 * To regenerate the SCSS maps from this contract:
 *   pnpm build:maps
 */

type Slots = ColorSlotMap;

/** Banner is static — every interaction state repeats the rest slots. */
function staticStates(slots: Slots) {
  return {
    rest: slots,
    hover: slots,
    'focus-visible': slots,
    active: slots,
    disabled: slots,
  };
}

const extras = {
  outline: null,
  'icon-tile-background': null,
} as const;

const contract: ComponentTokenContract = {
  component: 'cdr-banner',
  prefix: '--cdr-banner',
  interaction: 'feedback',

  // No recipe: only the 'action' family has a CSS behavior template, so the
  // generator emits the SCSS maps only (no .tokens.css). CdrBanner.module.scss
  // consumes the maps directly, following CdrButton.module.scss.

  // ══════════════════════════════════════════════════════════════════════════
  // DEFAULTS — shared (non-variant) custom property values.
  // Use token('...') for token references and literal('...' | N) for raw values.
  // ══════════════════════════════════════════════════════════════════════════

  defaults: {
    // Message body panel (same for every variant)
    'message-body-background': token('cdr-color-background-primary'),
    // Right-slot icon (same for every variant)
    'icon-right-fill': token('cdr-color-text-emphasis'),
    // Info-action slot uses link coloring (future: identity `trigger`)
    'info-action-fill': token('cdr-color-text-link-rest'),
  },

  // ══════════════════════════════════════════════════════════════════════════
  // COLOR VARIANTS — role × state → semantic token suffix
  //
  // surface → main background
  // text    → message text color (inherit until semantics ship)
  // border  → wrapper left-border accent
  // icon    → left icon fill (independent value, text namespace — see above)
  //
  // The generator builds: --cdr-color-{interaction}-{role}-{suffix}
  // with a legacy fallback where one is provided.
  // ══════════════════════════════════════════════════════════════════════════

  variants: {
    // `default` is identity: neutral in the feedback family. Figma does not
    // (yet) define feedback.surface.neutral — mapped prospectively, flagged
    // for design (see docs/banner-semantic-implementation.md).
    default: {
      identity: 'neutral',
      ...staticStates({
        surface: 'neutral',
        text: 'neutral-bold',
        border: 'neutral',
        icon: 'neutral',
      }),
      extras: { ...extras },
    },

    info: {
      identity: 'info',
      ...staticStates({
        surface: 'info',
        text: 'info-bold',
        border: 'info',
        icon: 'info',
      }),
      extras: { ...extras },
    },

    success: {
      identity: 'success',
      ...staticStates({
        surface: 'success',
        text: 'success-bold',
        border: 'success',
        icon: 'success',
      }),
      extras: { ...extras },
    },

    warning: {
      identity: 'warning',
      ...staticStates({
        surface: 'warning',
        text: 'warning-bold',
        border: 'warning',
        icon: 'warning',
      }),
      extras: { ...extras },
    },

    error: {
      identity: 'error',
      ...staticStates({
        surface: 'error',
        text: 'error-bold',
        border: 'error',
        icon: 'error',
      }),
      extras: { ...extras },
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // LEGACY FALLBACK MAP — TEMPORARY
  // Delete this entire section when semantic tokens ship in @rei/cdr-tokens.
  //
  // Maps '{variant}/{componentProperty}' → legacy Sass variable name.
  // The generator produces: var(--cdr-color-..., #{tokens.$legacy})
  // ══════════════════════════════════════════════════════════════════════════

  legacy: {
    // ── Default ──
    'default/background': 'cdr-color-background-message-default-01',
    'default/border': 'cdr-color-border-message-default-01',
    'default/fill': 'cdr-color-icon-message-default',
    'default/outline': 'cdr-color-border-message-default-02',
    'default/icon-tile-background': 'cdr-color-background-message-default-02',

    // ── Info ──
    'info/background': 'cdr-color-background-message-info-01',
    'info/border': 'cdr-color-border-message-info-01',
    'info/fill': 'cdr-color-icon-message-info',
    'info/outline': 'cdr-color-border-message-info-02',
    'info/icon-tile-background': 'cdr-color-background-message-info-02',

    // ── Success ──
    'success/background': 'cdr-color-background-message-success-01',
    'success/border': 'cdr-color-border-message-success-01',
    'success/fill': 'cdr-color-icon-message-success',
    'success/outline': 'cdr-color-border-message-success-02',
    'success/icon-tile-background': 'cdr-color-background-message-success-02',

    // ── Warning ──
    'warning/background': 'cdr-color-background-message-warning-01',
    'warning/border': 'cdr-color-border-message-warning-01',
    'warning/fill': 'cdr-color-icon-message-warning',
    'warning/outline': 'cdr-color-border-message-warning-02',
    'warning/icon-tile-background': 'cdr-color-background-message-warning-02',

    // ── Error ──
    'error/background': 'cdr-color-background-message-error-01',
    'error/border': 'cdr-color-border-message-error-01',
    'error/fill': 'cdr-color-icon-message-error',
    'error/outline': 'cdr-color-border-message-error-02',
    'error/icon-tile-background': 'cdr-color-background-message-error-02',
  },
};

export default contract;
