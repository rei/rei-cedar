import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { literal, token } from '../../../build/component-tokens/types';

/**
 * CdrBanner Token Contract (Feedback, cutover)
 *
 * CdrBanner is wholly the 'feedback' interaction family: it communicates a
 * system status (default/info/success/warning/error). Each status owns the
 * tinted parts it renders:
 *   - surface         → main background (faint/trace expression)
 *   - border          → wrapper border-left (status color)
 *   - icon            → left icon fill  (fullPath: the palette has no
 *                       feedback-icon-natural/info/success/warning, so those
 *                       icons reuse the approved border values; error uses
 *                       the real feedback-icon-error token)
 *   - extras          → outline color, icon-left surface (base expression),
 *                       icon stroke
 *
 * Parts outside the status scopes use their own categories:
 *   - message-body    → Feedback neutral-trace surface (white panel)
 *   - icon-right      → Universal text-neutral-bold (fullPath)
 *   - info-action     → Action trigger (fullPath; the part is an action)
 *
 * Cutover mode: no `legacy` section. `hooks: true` makes the generator wrap
 * every entry in its public override hook and emit the docgen-only
 * `CdrBanner.hooks.scss` partial; the module iterates the generated maps.
 *
 * To regenerate the SCSS maps from this contract:
 *   npx tsx build/generate-component-maps.ts
 */

const contract: ComponentTokenContract = {
  component: 'cdr-banner',
  prefix: '--cdr-banner',
  interaction: 'feedback',
  hooks: true,
  defaultVariant: 'default',

  // Base values captured from the existing stylesheet. Colors are declared per
  // status scope by the color mixins, not captured here.
  defaults: {
    // Layout
    'left-border-width': literal('0.4rem'),
    'left-border-style': literal('solid'),
    'main-min-height': literal('3.2rem'),
    'message-padding': token('cdr-space-half-x'),
    'message-body-padding': token('cdr-space-half-x'),
    // Icon left
    'icon-left-size': literal('2.2rem'),
    'icon-left-margin': token('cdr-space-quarter-x'),
    'icon-left-stroke-width': literal('0.4rem'),
    'icon-left-paint-order': literal('stroke fill'),
    // Icon right
    'icon-right-size': literal('2rem'),
    // Info action
    'info-action-max-height': literal('3.2rem'),
    'info-action-width': literal('4rem'),
    'info-action-icon-size': literal('2.2rem'),
    // Elevation
    prominence: token('cdr-prominence-raised'),
  },

  variants: {
    default: {
      identity: 'natural',
      rest: {
        surface: 'natural-faint',
        border: 'natural',
        icon: { fullPath: 'feedback-border-natural' },
      },
      extras: {
        outline: literal('var(--cdr-color-feedback-border-natural-faint)'),
        'icon-left-surface': literal('var(--cdr-color-feedback-surface-natural)'),
        'icon-stroke': literal('var(--cdr-color-feedback-icon-neutral)'),
      },
    },

    info: {
      identity: 'info',
      rest: {
        surface: 'info-faint',
        border: 'info',
        icon: { fullPath: 'feedback-border-info' },
      },
      extras: {
        outline: literal('var(--cdr-color-feedback-border-info-faint)'),
        'icon-left-surface': literal('var(--cdr-color-feedback-surface-info)'),
        'icon-stroke': literal('var(--cdr-color-feedback-icon-neutral)'),
      },
    },

    success: {
      identity: 'success',
      rest: {
        surface: 'success-faint',
        border: 'success',
        icon: { fullPath: 'feedback-border-success' },
      },
      extras: {
        outline: literal('var(--cdr-color-feedback-border-success-faint)'),
        'icon-left-surface': literal('var(--cdr-color-feedback-surface-success)'),
        'icon-stroke': literal('var(--cdr-color-feedback-icon-neutral)'),
      },
    },

    warning: {
      identity: 'warning',
      rest: {
        surface: 'warning-faint',
        border: 'warning',
        icon: { fullPath: 'feedback-border-warning' },
      },
      extras: {
        outline: literal('var(--cdr-color-feedback-border-warning-faint)'),
        'icon-left-surface': literal('var(--cdr-color-feedback-surface-warning)'),
        'icon-stroke': literal('var(--cdr-color-feedback-icon-neutral)'),
      },
    },

    error: {
      identity: 'error',
      rest: {
        surface: 'error-trace',
        border: 'error',
        icon: 'error',
      },
      extras: {
        outline: literal('var(--cdr-color-feedback-border-error-faint)'),
        'icon-left-surface': literal('var(--cdr-color-feedback-surface-error)'),
        'icon-stroke': literal('var(--cdr-color-feedback-icon-neutral)'),
      },
    },

    // White message-body panel shown under the primary message.
    'message-body': {
      identity: 'natural',
      rest: { surface: 'neutral-trace' },
    },

    // Plain neutral icon in the right slot (Universal part).
    'icon-right': {
      identity: 'neutral',
      rest: { icon: { fullPath: 'text-neutral-bold' } },
    },

    // Action part: the info-action slot triggers a user action (Action family).
    'info-action': {
      identity: 'neutral',
      rest: { icon: { fullPath: 'action-text-trigger' } },
    },
  },
};

export default contract;
