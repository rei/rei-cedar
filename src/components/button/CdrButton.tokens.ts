import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { token, literal } from '../../../build/component-tokens/types';

/**
 * CdrButton Token Contract
 *
 * Declares the styling dependencies for the button component using the
 * confirmed Cedar semantic taxonomy (see docs/cedar-semantic-taxonomy.md):
 *
 *   Foundation → Interaction Family → Role → Identity → Expression
 *   color        action              surface  brand      faint
 *
 * - interaction: CdrButton is wholly the 'action' interaction family.
 *   ACTION intent: Interactive elements that trigger user actions, navigation,
 *   content manipulation, or final submission.
 * - variants: each variant has an identity (brand/neutral/sale) and a
 *   role × state matrix (surface/text/border/icon). Suffixes are identity +
 *   optional expression, e.g. 'brand-faint'. A bare identity name with no
 *   expression suffix (e.g. 'brand') means base expression — base is never
 *   written literally as a token suffix.
 * - "dark" is `identity: neutral` at an intense expression, not a separate
 *   inverse identity. There is no `link` identity here yet (link/trigger
 *   text lives in the CdrButton.vars.scss special-case mixin, identity: trigger).
 * - legacy: temporary bridge to current @rei/cdr-tokens Sass variable names.
 *
 * Migration Guide: See docs/button-semantic-migration-guide.md for the pattern
 * to apply to other components.
 *
 * Future Architecture: See docs/future-architecture/ADR-component-token-contracts.md
 * for the comprehensive contract architecture (future reference).
 *
 * To regenerate the SCSS maps and CSS from this contract:
 *   npx tsx build/generate-component-maps.ts
 */

const contract: ComponentTokenContract = {
  component: 'cdr-button',
  prefix: '--cdr-button',
  interaction: 'action',
  recipe: 'pressable',

  // ══════════════════════════════════════════════════════════════════════════
  // FOUNDATION ASSIGNMENTS — future architecture for organizing token references
  // by foundation domain (color, radius, typography, prominence, space).
  // This aligns with Cedar's move toward Design Foundations → Component Contracts → Platform Output.
  //
  // IMPLEMENTATION TIMING: This should remain as "Future Architecture" until space, typography,
  // and prominence foundations are actually semanticized. Right now it is a useful destination,
  // not a current implementation requirement.
  //
  // TEMPORARY: Not yet implemented; using defaults flat structure for now.
  // ══════════════════════════════════════════════════════════════════════════

  foundationAssignments: {
    // Future: color: { ... }, radius: { ... }, typography: { ... }, prominence: { ... }, space: { ... }
  },

  // ══════════════════════════════════════════════════════════════════════════
  // DEFAULTS — base custom property values applied by the base mixin.
  // Use token('...') for token references and literal('...' | N) for raw values.
  // TEMPORARY: Will migrate to foundationAssignments structure (color, radius, typography, prominence, space)
  // ══════════════════════════════════════════════════════════════════════════

  defaults: {
    // Layout
    radius: token('cdr-radius-softer'),
    padding: token('cdr-space-inset-one-x-squish'),
    // Typography
    'font-family': token('cdr-font-family-sans'),
    'font-weight': literal(500),
    'letter-spacing': literal('-0.008rem'),
    'font-size': literal('1.6rem'),
    'line-height': literal('2.2rem'),
    // Icons
    'icon-size': token('cdr-icon-size'),
    'icon-padding': token('cdr-space-one-x'),
    'icon-gap': token('cdr-space-quarter-x'),
    // Transitions
    'transition-duration': token('cdr-duration-2-x'),
    'transition-timing': token('cdr-timing-function-ease'),
    // Color (base state — overridden by variant mixins)
    background: literal('transparent'),
    text: literal('inherit'),
    fill: literal('inherit'),
    border: literal('transparent'),
    // Elevation
    elevation: literal('0 0 0 0 transparent'),
    'elevation-hover': token('cdr-prominence-raised'),
    'elevation-focus-visible': token('cdr-prominence-raised'),
    'elevation-active': literal('0 0 0 0 transparent'),
  },

  // ══════════════════════════════════════════════════════════════════════════
  // COLOR VARIANTS — role × state → semantic token suffix
  //
  // surface → background-color
  // text    → color
  // border  → border / box-shadow inset
  // icon    → fill (independent role, not mirrored from text)
  //
  // The generator builds: --cdr-color-{interaction}-{role}-{suffix}
  // with a legacy fallback where one is provided.
  // ══════════════════════════════════════════════════════════════════════════

  variants: {
    primary: {
      identity: 'brand',
      rest: { surface: 'brand', text: 'brand', border: 'brand', icon: 'brand' },
      hover: {
        surface: 'brand-faint',
        text: 'brand-faint',
        border: 'brand-faint',
        icon: 'brand-faint',
      },
      'focus-visible': {
        surface: 'brand-faint',
        text: 'brand-faint',
        border: 'brand-faint',
        icon: 'brand-faint',
      },
      active: { surface: 'brand', text: 'brand', border: 'brand', icon: 'brand' },
      disabled: {
        surface: 'neutral-trace',
        text: 'disabled',
        border: 'neutral-trace',
        icon: 'disabled',
      },
      extras: { 'active-inset': null },
    },

    secondary: {
      identity: 'neutral',
      rest: {
        surface: 'neutral-faint',
        text: 'neutral',
        border: 'neutral-faint',
        icon: { fullPath: 'icon-default' },
      },
      hover: {
        surface: 'neutral',
        text: 'neutral-subtle',
        border: 'neutral',
        icon: 'neutral-subtle',
      },
      'focus-visible': {
        surface: 'neutral',
        text: 'neutral-subtle',
        border: 'neutral',
        icon: 'neutral-subtle',
      },
      active: {
        surface: 'neutral-subtle',
        text: 'neutral-bold',
        border: 'neutral-subtle',
        icon: 'neutral-bold',
      },
      disabled: {
        surface: 'neutral-faint',
        text: 'disabled-secondary',
        border: 'neutral-trace',
        icon: 'disabled-secondary',
      },
      extras: { 'active-inset': null },
    },

    // "dark" is identity: neutral at an intense expression — not a separate inverse identity.
    dark: {
      identity: 'neutral',
      rest: {
        surface: 'neutral-intense',
        text: 'neutral-intense',
        border: 'neutral-intense',
        icon: 'neutral-intense',
      },
      hover: {
        surface: 'neutral-bold',
        text: 'neutral',
        border: 'neutral-intense',
        icon: 'neutral',
      },
      'focus-visible': {
        surface: 'neutral-bold',
        text: 'neutral',
        border: 'neutral-intense',
        icon: 'neutral',
      },
      active: {
        surface: 'neutral-intense',
        text: 'neutral-intense',
        border: 'neutral-intense',
        icon: 'neutral-intense',
      },
      disabled: {
        surface: 'neutral-trace',
        text: 'disabled',
        border: 'neutral-trace',
        icon: 'disabled',
      },
      extras: { 'active-inset': null },
    },

    sale: {
      identity: 'sale',
      rest: { surface: 'sale', text: 'sale', border: 'sale', icon: 'sale' },
      hover: {
        surface: 'sale-faint',
        text: 'sale-faint',
        border: 'sale-faint',
        icon: 'sale-faint',
      },
      'focus-visible': {
        surface: 'sale-faint',
        text: 'sale-faint',
        border: 'sale-faint',
        icon: 'sale-faint',
      },
      active: { surface: 'sale', text: 'sale', border: 'sale', icon: 'sale' },
      disabled: {
        surface: 'neutral-trace',
        text: 'disabled',
        border: 'neutral-trace',
        icon: 'disabled',
      },
      extras: { 'active-inset': null },
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SIZES — dimension values per size.
  // ══════════════════════════════════════════════════════════════════════════

  sizes: {
    small: {
      'font-size': literal('1.4rem'),
      'line-height': literal('1.8rem'),
      padding: token('cdr-space-inset-three-quarter-x-squish'),
      'icon-padding': token('cdr-space-three-quarter-x'),
      'icon-size': literal('2rem'),
    },
    medium: {
      'font-size': literal('1.6rem'),
      'line-height': literal('2.2rem'),
      padding: token('cdr-space-inset-one-x-squish'),
      'icon-padding': token('cdr-space-one-x'),
      'icon-size': token('cdr-icon-size'),
    },
    large: {
      'font-size': literal('1.6rem'),
      'line-height': literal('2.2rem'),
      padding: token('cdr-space-inset-one-and-a-half-x-squish'),
      'icon-padding': token('cdr-space-one-and-a-half-x'),
      'icon-size': token('cdr-icon-size'),
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
    // ── Primary ──
    'primary/background': 'cdr-color-background-button-primary-rest',
    'primary/background-hover': 'cdr-color-background-button-primary-hover',
    'primary/background-focus-visible': 'cdr-color-background-button-primary-hover',
    'primary/background-active': 'cdr-color-background-button-primary-rest',
    'primary/background-disabled': 'cdr-color-background-button-default-disabled',
    'primary/text': 'cdr-color-text-button-primary',
    'primary/text-hover': 'cdr-color-text-button-primary-hover',
    'primary/text-focus-visible': 'cdr-color-text-button-primary-hover',
    'primary/text-active': 'cdr-color-text-button-primary',
    'primary/text-disabled': 'cdr-color-text-button-primary-disabled',
    'primary/border': 'cdr-color-border-button-primary-rest',
    'primary/border-hover': 'cdr-color-border-button-primary-hover',
    'primary/border-focus-visible': 'cdr-color-border-button-primary-hover',
    'primary/border-active': 'cdr-color-border-button-primary-rest',
    'primary/border-disabled': 'cdr-color-border-button-default-disabled',
    'primary/active-inset': 'cdr-color-border-button-primary-active-inset',
    'primary/fill': 'cdr-color-text-button-primary',
    'primary/fill-hover': 'cdr-color-text-button-primary-hover',
    'primary/fill-focus-visible': 'cdr-color-text-button-primary-hover',
    'primary/fill-active': 'cdr-color-text-button-primary',
    'primary/fill-disabled': 'cdr-color-text-button-primary-disabled',

    // ── Secondary ──
    'secondary/background': 'cdr-color-background-button-secondary-rest',
    'secondary/background-hover': 'cdr-color-background-button-secondary-hover',
    'secondary/background-focus-visible': 'cdr-color-background-button-secondary-hover',
    'secondary/background-active': 'cdr-color-background-button-secondary-active',
    'secondary/background-disabled': 'cdr-color-background-button-secondary-disabled',
    'secondary/text': 'cdr-color-text-button-secondary',
    'secondary/text-hover': 'cdr-color-text-button-secondary-hover',
    'secondary/text-focus-visible': 'cdr-color-text-button-secondary-hover',
    'secondary/text-active': 'cdr-color-text-button-secondary-active',
    'secondary/text-disabled': 'cdr-color-text-button-secondary-disabled',
    'secondary/border': 'cdr-color-border-button-secondary-rest',
    'secondary/border-hover': 'cdr-color-border-button-secondary-hover',
    'secondary/border-focus-visible': 'cdr-color-border-button-secondary-hover',
    'secondary/border-active': 'cdr-color-border-button-secondary-active',
    'secondary/border-disabled': 'cdr-color-border-button-default-disabled',
    'secondary/fill': 'cdr-color-icon-default',
    'secondary/fill-hover': 'cdr-color-text-button-secondary-hover',
    'secondary/fill-focus-visible': 'cdr-color-text-button-secondary-hover',
    'secondary/fill-active': 'cdr-color-text-button-secondary-active',
    'secondary/fill-disabled': 'cdr-color-text-button-secondary-disabled',
    'secondary/active-inset': 'cdr-color-border-button-secondary-active-inset',

    // ── Dark ──
    'dark/background': 'cdr-color-background-button-dark-rest',
    'dark/background-hover': 'cdr-color-background-button-dark-hover',
    'dark/background-focus-visible': 'cdr-color-background-button-dark-hover',
    'dark/background-active': 'cdr-color-background-button-dark-rest',
    'dark/background-disabled': 'cdr-color-background-button-default-disabled',
    'dark/text': 'cdr-color-text-button-dark',
    'dark/text-hover': 'cdr-color-text-button-dark-hover',
    'dark/text-focus-visible': 'cdr-color-text-button-dark-hover',
    'dark/text-active': 'cdr-color-text-button-dark-active',
    'dark/text-disabled': 'cdr-color-text-button-dark-disabled',
    'dark/border': 'cdr-color-border-button-dark-rest',
    'dark/border-hover': 'cdr-color-border-button-dark-hover',
    'dark/border-focus-visible': 'cdr-color-border-button-dark-hover',
    'dark/border-active': 'cdr-color-border-button-dark-active',
    'dark/border-disabled': 'cdr-color-border-button-default-disabled',
    'dark/fill': 'cdr-color-text-button-dark',
    'dark/fill-hover': 'cdr-color-text-button-dark-hover',
    'dark/fill-focus-visible': 'cdr-color-text-button-dark-hover',
    'dark/fill-active': 'cdr-color-text-button-dark-active',
    'dark/fill-disabled': 'cdr-color-text-button-dark-disabled',
    'dark/active-inset': 'cdr-color-border-button-dark-active-inset',

    // ── Sale ──
    'sale/background': 'cdr-color-background-button-sale-rest',
    'sale/background-hover': 'cdr-color-background-button-sale-hover',
    'sale/background-focus-visible': 'cdr-color-background-button-sale-hover',
    'sale/background-active': 'cdr-color-background-button-sale-active',
    'sale/background-disabled': 'cdr-color-background-button-default-disabled',
    'sale/text': 'cdr-color-text-button-sale',
    'sale/text-hover': 'cdr-color-text-button-sale-hover',
    'sale/text-focus-visible': 'cdr-color-text-button-sale-hover',
    'sale/text-active': 'cdr-color-text-button-sale-active',
    'sale/text-disabled': 'cdr-color-text-button-sale-disabled',
    'sale/border': 'cdr-color-border-button-sale-rest',
    'sale/border-hover': 'cdr-color-border-button-sale-hover',
    'sale/border-focus-visible': 'cdr-color-border-button-sale-hover',
    'sale/border-active': 'cdr-color-border-button-sale-active',
    'sale/border-disabled': 'cdr-color-border-button-default-disabled',
    'sale/fill': 'cdr-color-text-button-sale',
    'sale/fill-hover': 'cdr-color-text-button-sale-hover',
    'sale/fill-focus-visible': 'cdr-color-text-button-sale-hover',
    'sale/fill-active': 'cdr-color-text-button-sale-active',
    'sale/fill-disabled': 'cdr-color-text-button-sale-disabled',
    'sale/active-inset': 'cdr-color-border-button-sale-active-inset',
  },
};

export default contract;
