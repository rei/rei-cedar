import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { literal, token } from '../../../build/component-tokens/types';

/**
 * CdrToast Token Contract (Feedback, cutover)
 *
 * CdrToast is wholly the 'feedback' interaction family: it communicates a
 * system status (default/info/success/warning/error). Each status owns the
 * tinted parts it renders:
 *   - surface         → main background (faint/trace expression)
 *   - border          → toast border-left (status color)
 *   - icon            → left icon fill  (fullPath: the palette has no
 *                       feedback-icon-natural/info/success/warning, so those
 *                       icons reuse the approved border values; error uses
 *                       the real feedback-icon-error token)
 *   - extras          → outline color, icon-left surface (base expression),
 *                       icon stroke
 *
 * Parts outside the status scopes use their own categories:
 *   - close-button    → Universal text-neutral-bold (fullPath; plain neutral
 *                       dismiss icon with no status meaning)
 *
 * Cutover mode: no `legacy` section. `hooks: true` makes the generator wrap
 * every entry in its public override hook and emit the docgen-only
 * `CdrToast.hooks.scss` partial; the module iterates the generated maps.
 *
 * To regenerate the SCSS maps from this contract:
 *   npx tsx build/generate-component-maps.ts
 */

const contract: ComponentTokenContract = {
  component: 'cdr-toast',
  prefix: '--cdr-toast',
  interaction: 'feedback',
  hooks: true,
  defaultVariant: 'default',

  // Base values captured from the existing stylesheet. Colors are declared per
  // status scope by the color mixins, not captured here.
  defaults: {
    // Layout
    'left-border-width': literal('0.4rem'),
    'left-border-style': literal('solid'),
    'margin-bottom': token('cdr-space-one-x'),
    'main-min-height': literal('3.2rem'),
    'message-padding': literal('0.7rem'),
    // Icon left
    'icon-left-width': literal('3.2rem'),
    'icon-left-size': literal('2.2rem'),
    'icon-left-margin': token('cdr-space-quarter-x'),
    'icon-left-stroke-width': literal('0.4rem'),
    'icon-left-paint-order': literal('stroke fill'),
    // Close button
    'close-button-max-height': literal('3.2rem'),
    'close-button-icon-size': literal('2.2rem'),
    // Elevation
    prominence: token('cdr-prominence-floating'),
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
        outline: literal('var(--cdr-feedback-border-natural-faint)'),
        'icon-left-surface': literal('var(--cdr-feedback-surface-natural)'),
        'icon-stroke': literal('var(--cdr-feedback-icon-neutral)'),
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
        outline: literal('var(--cdr-feedback-border-info-faint)'),
        'icon-left-surface': literal('var(--cdr-feedback-surface-info)'),
        'icon-stroke': literal('var(--cdr-feedback-icon-neutral)'),
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
        outline: literal('var(--cdr-feedback-border-success-faint)'),
        'icon-left-surface': literal('var(--cdr-feedback-surface-success)'),
        'icon-stroke': literal('var(--cdr-feedback-icon-neutral)'),
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
        outline: literal('var(--cdr-feedback-border-warning-faint)'),
        'icon-left-surface': literal('var(--cdr-feedback-surface-warning)'),
        'icon-stroke': literal('var(--cdr-feedback-icon-neutral)'),
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
        outline: literal('var(--cdr-feedback-border-error-faint)'),
        'icon-left-surface': literal('var(--cdr-feedback-surface-error)'),
        'icon-stroke': literal('var(--cdr-feedback-icon-neutral)'),
      },
    },

    // Plain neutral dismiss icon (Universal part).
    'close-button': {
      identity: 'neutral',
      rest: { icon: { fullPath: 'text-neutral-bold' } },
    },
  },
};

export default contract;
