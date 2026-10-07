import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { literal, token } from '../../../build/component-tokens/types';

/**
 * CdrButton Token Contract (Action, cutover)
 *
 * CdrButton is wholly the 'action' interaction family. Each variant is a color
 * scope with a role × state matrix (surface/text/border/icon). The `link`,
 * `icon-only`, and `with-background` scopes cover the structural modifiers the
 * module renders as special cases.
 *
 * Cutover mode: no `legacy` section. The generator wraps every color entry in
 * its public override hook plus the semantic token
 * (`var(--cdr-color-button-<scope>-<role>[-<state>], var(--cdr-color-action-<role>-<identity>))`)
 * and the styles iterate the generated maps, so hooks stay overridable.
 *
 * `defaultVariant: 'primary'` omits the scope segment from the primary hooks.
 * `extras` carry values outside the role × state matrix (the active inset
 * ring) under a scope hook as well.
 *
 * Palette gaps: no approved action-icon token exists for the brand and trigger
 * identities, so those icon slots reuse the approved text token via fullPath
 * (declared explicitly, not mirrored).
 *
 * To regenerate the SCSS maps from this contract:
 *   npx tsx build/generate-component-maps.ts
 */

const contract: ComponentTokenContract = {
  component: 'cdr-button',
  prefix: '--cdr-button',
  interaction: 'action',
  recipe: 'pressable',
  hooks: true,
  defaultVariant: 'primary',

  // Future architecture for organizing token references by foundation domain.
  // Remains empty until space/typography/prominence foundations are semanticized.
  foundationAssignments: {},

  // Base values captured from the existing stylesheet. Colors are declared per
  // variant by the color mixins, not captured here.
  defaults: {
    // Layout
    radius: token('cdr-radius-softer'),
    padding: token('cdr-space-inset-one-x-squish'),
    // Typography
    'font-family': token('cdr-font-family-sans'),
    'font-style': literal('normal'),
    'font-weight': literal(500),
    'letter-spacing': literal('-0.008rem'),
    'font-size': literal('1.6rem'),
    'line-height': literal('2.2rem'),
    // Icons
    'icon-size': token('cdr-icon-size'),
    'icon-padding': token('cdr-space-one-x'),
    'icon-gap': token('cdr-space-quarter-x'),
    // Icon-only layout
    'icon-only-radius': token('cdr-radius-soft'),
    'icon-only-padding': token('cdr-space-inset-half-x'),
    'icon-only-large-padding': token('cdr-space-three-quarter-x'),
    // Transitions
    'transition-duration': token('cdr-duration-2-x'),
    'transition-timing': token('cdr-timing-function-ease'),
    // Elevation
    elevation: literal('0 0 0 0 transparent'),
    'elevation-hover': token('cdr-prominence-raised'),
    'elevation-focus-visible': token('cdr-prominence-raised'),
    'elevation-active': literal('0 0 0 0 transparent'),
  },

  variants: {
    primary: {
      identity: 'brand',
      rest: { surface: 'brand', text: 'neutral-trace', border: 'brand', icon: 'neutral-trace' },
      hover: {
        surface: 'brand-faint',
        text: 'brand',
        border: 'brand',
        // Palette gap: no action-icon-brand; reuse the approved brand text token.
        icon: { fullPath: 'action-text-brand' },
      },
      'focus-visible': {
        surface: 'brand-faint',
        text: 'brand',
        border: 'brand',
        icon: { fullPath: 'action-text-brand' },
      },
      active: { surface: 'brand', text: 'neutral-trace', border: 'brand', icon: 'neutral-trace' },
      disabled: {
        surface: 'neutral-prominent',
        text: 'neutral-trace',
        border: 'neutral-faint',
        icon: 'neutral-trace',
      },
      extras: { 'active-inset': literal('var(--cdr-color-border-neutral-trace)') },
    },

    secondary: {
      identity: 'neutral',
      rest: { surface: 'neutral-faint', text: 'neutral-bold', border: 'neutral', icon: 'neutral' },
      hover: {
        surface: 'neutral-subtle',
        text: 'neutral-bold',
        border: 'neutral-bold',
        icon: 'neutral-bold',
      },
      'focus-visible': {
        surface: 'neutral-subtle',
        text: 'neutral-bold',
        border: 'neutral-bold',
        icon: 'neutral-bold',
      },
      active: {
        surface: 'neutral-bold',
        text: 'neutral-trace',
        border: 'neutral',
        icon: 'neutral-trace',
      },
      disabled: {
        surface: 'neutral-faint',
        text: 'neutral-subtle',
        border: 'neutral-faint',
        icon: 'neutral-subtle',
      },
      extras: { 'active-inset': literal('var(--cdr-color-border-neutral-trace)') },
    },

    // "dark" is identity: neutral at an intense expression — not a separate inverse identity.
    dark: {
      identity: 'neutral',
      rest: {
        surface: 'neutral-intense',
        text: 'neutral-trace',
        border: 'neutral-bold',
        icon: 'neutral-trace',
      },
      hover: {
        surface: 'neutral',
        text: 'neutral-bold',
        border: 'neutral-bold',
        icon: 'neutral-bold',
      },
      'focus-visible': {
        surface: 'neutral',
        text: 'neutral-bold',
        border: 'neutral-bold',
        icon: 'neutral-bold',
      },
      active: {
        surface: 'neutral-intense',
        text: 'neutral-trace',
        border: 'neutral-bold',
        icon: 'neutral-trace',
      },
      disabled: {
        surface: 'neutral-prominent',
        text: 'neutral-trace',
        border: 'neutral-faint',
        icon: 'neutral-trace',
      },
      extras: { 'active-inset': literal('var(--cdr-color-action-border-neutral-faint)') },
    },

    sale: {
      identity: 'sale',
      rest: { surface: 'sale', text: 'neutral-trace', border: 'sale', icon: 'neutral-trace' },
      hover: { surface: 'sale-faint', text: 'sale', border: 'sale', icon: 'sale' },
      'focus-visible': { surface: 'sale-faint', text: 'sale', border: 'sale', icon: 'sale' },
      active: { surface: 'sale', text: 'neutral-trace', border: 'sale', icon: 'neutral-trace' },
      disabled: {
        surface: 'neutral-prominent',
        text: 'neutral-trace',
        border: 'neutral-faint',
        icon: 'neutral-trace',
      },
      extras: { 'active-inset': literal('var(--cdr-color-border-neutral-trace)') },
    },

    // Link-style text. The retired `link` identity is `trigger`; there is no
    // action-icon-trigger, so the icon reuses the approved trigger text token.
    link: {
      identity: 'trigger',
      rest: { text: 'trigger', icon: { fullPath: 'action-text-trigger' } },
      hover: { text: 'trigger' },
      'focus-visible': { text: 'trigger-bold' },
      active: { text: 'trigger-bold' },
      disabled: { text: 'neutral-subtle', icon: 'neutral-subtle' },
      extras: { surface: literal('transparent') },
    },

    // Icon-only buttons render the icon in the plain neutral action palette.
    'icon-only': {
      identity: 'neutral',
      rest: { icon: 'neutral' },
      hover: { icon: 'neutral' },
      'focus-visible': { icon: 'neutral', border: 'neutral' },
      active: { icon: 'neutral', border: 'neutral' },
      disabled: { icon: 'neutral-subtle' },
    },

    // Icon-only with a circular background; same neutral palette as secondary.
    'with-background': {
      identity: 'neutral',
      rest: { surface: 'neutral-faint', border: 'neutral', icon: 'neutral' },
      hover: { surface: 'neutral-subtle', border: 'neutral-bold', icon: 'neutral' },
      'focus-visible': { surface: 'neutral-subtle', border: 'neutral-bold', icon: 'neutral' },
      active: {
        surface: 'neutral-bold',
        text: 'neutral-trace',
        border: 'neutral',
        icon: 'neutral-trace',
      },
      disabled: { surface: 'neutral-faint', border: 'neutral-faint', icon: 'neutral-subtle' },
      extras: { 'active-inset': literal('var(--cdr-color-border-neutral-trace)') },
    },
  },

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
};

export default contract;
