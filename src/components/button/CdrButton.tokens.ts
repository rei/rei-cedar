import type { ComponentTokenContract } from '../../build/component-tokens/types';

/**
 * CdrButton Token Contract
 *
 * Declares what this component needs from the token system:
 * - defaults: base custom property values
 * - variants: how color depths map to semantic tokens across interaction states
 * - sizes: dimension values per size
 * - legacy: temporary bridge to current @rei/cdr-tokens Sass variable names
 *
 * To regenerate the SCSS maps file from this contract:
 *   npx tsx build/generate-component-maps.ts
 */

const contract: ComponentTokenContract = {
  component: 'cdr-button',
  prefix: '--cdr-button',
  family: 'action',

  // ══════════════════════════════════════════════════════════════════════════
  // DEFAULTS — base custom property values applied by the base mixin.
  // Strings starting with 'cdr-' are token references; others are literals.
  // ══════════════════════════════════════════════════════════════════════════

  defaults: {
    // Layout
    radius: 'cdr-radius-softer',
    padding: 'cdr-space-inset-one-x-squish',
    // Typography
    'font-family': 'cdr-font-family-sans',
    'font-weight': 500,
    'letter-spacing': '-0.008rem',
    'font-size': '1.6rem',
    'line-height': '2.2rem',
    // Icons
    'icon-size': 'cdr-icon-size',
    'icon-padding': 'cdr-space-one-x',
    'icon-gap': 'cdr-space-quarter-x',
    // Transitions
    'transition-duration': 'cdr-duration-2-x',
    'transition-timing': 'cdr-timing-function-ease',
    // Color (base state — overridden by variant mixins)
    background: 'transparent',
    text: 'inherit',
    fill: 'inherit',
    border: 'transparent',
    // Elevation
    elevation: '0 0 0 0 transparent',
    'elevation-hover': 'cdr-prominence-raised',
    'elevation-active': '0 0 0 0 transparent',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // COLOR VARIANTS — depth × state → semantic token suffix
  //
  // Each state maps three depths (bg, fg, edge) to semantic token suffixes.
  // The generator builds: --cdr-color-{intent}-{cssDepth}-{suffix}
  //   bg   → surface     (CSS: background-color)
  //   fg   → text        (CSS: color, and fill unless overridden)
  //   edge → border      (CSS: box-shadow border)
  // ══════════════════════════════════════════════════════════════════════════

  variants: {
    primary: {
      intent: 'action',
      identity: 'brand',
      //             bg                     fg                  edge
      rest: { bg: 'brand', fg: 'brand', edge: 'brand' },
      hover: { bg: 'brand-faint', fg: 'brand-faint', edge: 'brand-faint' },
      active: { bg: 'brand', fg: 'brand', edge: 'brand' },
      disabled: { bg: 'neutral-trace', fg: 'disabled', edge: 'neutral-trace' },
      extras: { 'active-inset': null },
    },

    secondary: {
      intent: 'action',
      identity: 'neutral',
      rest: { bg: 'neutral-faint', fg: 'neutral', edge: 'neutral-faint' },
      hover: { bg: 'neutral', fg: 'neutral-subtle', edge: 'neutral' },
      active: { bg: 'neutral-subtle', fg: 'neutral-bold', edge: 'neutral-subtle' },
      disabled: { bg: 'neutral-faint', fg: 'disabled-secondary', edge: 'neutral-trace' },
      fillOverrides: {
        rest: { fullPath: 'icon-default' }, // --cdr-color-icon-default (outside action intent)
      },
      extras: { 'active-inset': null },
    },

    dark: {
      intent: 'action',
      identity: 'neutral',
      rest: { bg: 'neutral-intense', fg: 'neutral-intense', edge: 'neutral-intense' },
      hover: { bg: 'neutral-bold', fg: 'neutral', edge: 'neutral-intense' },
      active: { bg: 'neutral-intense', fg: 'neutral-intense', edge: 'neutral-intense' },
      disabled: { bg: 'neutral-trace', fg: 'disabled', edge: 'neutral-trace' },
      extras: { 'active-inset': null },
    },

    sale: {
      intent: 'action',
      identity: 'sale',
      rest: { bg: 'sale', fg: 'sale', edge: 'sale' },
      hover: { bg: 'sale-faint', fg: 'sale-faint', edge: 'sale-faint' },
      active: { bg: 'sale', fg: 'sale', edge: 'sale' },
      disabled: { bg: 'neutral-trace', fg: 'disabled', edge: 'neutral-trace' },
      extras: { 'active-inset': null },
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SIZES — dimension values per size.
  // Strings starting with 'cdr-' are token references; others are literals.
  // ══════════════════════════════════════════════════════════════════════════

  sizes: {
    small: {
      'font-size': '1.4rem',
      'line-height': '1.8rem',
      padding: 'cdr-space-inset-three-quarter-x-squish',
      'icon-padding': 'cdr-space-three-quarter-x',
      'icon-size': '2rem',
    },
    medium: {
      'font-size': '1.6rem',
      'line-height': '2.2rem',
      padding: 'cdr-space-inset-one-x-squish',
      'icon-padding': 'cdr-space-one-x',
      'icon-size': 'cdr-icon-size',
    },
    large: {
      'font-size': '1.6rem',
      'line-height': '2.2rem',
      padding: 'cdr-space-inset-one-and-a-half-x-squish',
      'icon-padding': 'cdr-space-one-and-a-half-x',
      'icon-size': 'cdr-icon-size',
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
    'primary/background-active': 'cdr-color-background-button-primary-rest',
    'primary/background-disabled': 'cdr-color-background-button-default-disabled',
    'primary/text': 'cdr-color-text-button-primary',
    'primary/text-hover': 'cdr-color-text-button-primary-hover',
    'primary/text-active': 'cdr-color-text-button-primary',
    'primary/text-disabled': 'cdr-color-text-button-primary-disabled',
    'primary/border': 'cdr-color-border-button-primary-rest',
    'primary/border-hover': 'cdr-color-border-button-primary-hover',
    'primary/border-active': 'cdr-color-border-button-primary-rest',
    'primary/border-disabled': 'cdr-color-border-button-default-disabled',
    'primary/active-inset': 'cdr-color-border-button-primary-active-inset',

    // ── Secondary ──
    'secondary/background': 'cdr-color-background-button-secondary-rest',
    'secondary/background-hover': 'cdr-color-background-button-secondary-hover',
    'secondary/background-active': 'cdr-color-background-button-secondary-active',
    'secondary/background-disabled': 'cdr-color-background-button-secondary-disabled',
    'secondary/text': 'cdr-color-text-button-secondary',
    'secondary/text-hover': 'cdr-color-text-button-secondary-hover',
    'secondary/text-active': 'cdr-color-text-button-secondary-active',
    'secondary/text-disabled': 'cdr-color-text-button-secondary-disabled',
    'secondary/border': 'cdr-color-border-button-secondary-rest',
    'secondary/border-hover': 'cdr-color-border-button-secondary-hover',
    'secondary/border-active': 'cdr-color-border-button-secondary-active',
    'secondary/border-disabled': 'cdr-color-border-button-default-disabled',
    'secondary/fill': 'cdr-color-icon-default',
    'secondary/active-inset': 'cdr-color-border-button-secondary-active-inset',

    // ── Dark ──
    'dark/background': 'cdr-color-background-button-dark-rest',
    'dark/background-hover': 'cdr-color-background-button-dark-hover',
    'dark/background-active': 'cdr-color-background-button-dark-rest',
    'dark/background-disabled': 'cdr-color-background-button-default-disabled',
    'dark/text': 'cdr-color-text-button-dark',
    'dark/text-hover': 'cdr-color-text-button-dark-hover',
    'dark/text-active': 'cdr-color-text-button-dark-active',
    'dark/text-disabled': 'cdr-color-text-button-dark-disabled',
    'dark/border': 'cdr-color-border-button-dark-rest',
    'dark/border-hover': 'cdr-color-border-button-dark-hover',
    'dark/border-active': 'cdr-color-border-button-dark-active',
    'dark/border-disabled': 'cdr-color-border-button-default-disabled',
    'dark/active-inset': 'cdr-color-border-button-dark-active-inset',

    // ── Sale ──
    'sale/background': 'cdr-color-background-button-sale-rest',
    'sale/background-hover': 'cdr-color-background-button-sale-hover',
    'sale/background-active': 'cdr-color-background-button-sale-active',
    'sale/background-disabled': 'cdr-color-background-button-default-disabled',
    'sale/text': 'cdr-color-text-button-sale',
    'sale/text-hover': 'cdr-color-text-button-sale-hover',
    'sale/text-active': 'cdr-color-text-button-sale-active',
    'sale/text-disabled': 'cdr-color-text-button-sale-disabled',
    'sale/border': 'cdr-color-border-button-sale-rest',
    'sale/border-hover': 'cdr-color-border-button-sale-hover',
    'sale/border-active': 'cdr-color-border-button-sale-active',
    'sale/border-disabled': 'cdr-color-border-button-default-disabled',
    'sale/active-inset': 'cdr-color-border-button-sale-active-inset',
  },
};

export default contract;
