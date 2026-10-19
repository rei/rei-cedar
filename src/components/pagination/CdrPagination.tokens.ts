import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { literal, token } from '../../../build/component-tokens/types';

/**
 * CdrPagination Token Contract (Action, cutover)
 *
 * CdrPagination is wholly the 'action' interaction family: its links navigate
 * between pages. Two scopes:
 *   - default → the page links (prev/next included) render plain neutral
 *               action text; interaction states tint the surface
 *               (neutral-faint), disabled drops to neutral-subtle.
 *   - current → the current page's keyline; a trigger-colored indicator line
 *               drawn as the border role.
 *
 * The legacy component tokens (cdr-color-background-pagination-hover /
 * -keyline) were component-scoped aliases: hover is the same neutral-faint
 * action surface, the keyline is the same trigger color as the link family.
 *
 * The layout values previously hardcoded in the module are captured in
 * `defaults`; the module emits them as `--cdr-pagination-<key>` on the root
 * class.
 *
 * Cutover mode: no `legacy` section. `hooks: true` makes the generator wrap
 * every entry in its public override hook; the module iterates the generated
 * maps.
 *
 * To regenerate the SCSS maps from this contract:
 *   npx tsx build/generate-component-maps.ts
 */

const contract: ComponentTokenContract = {
  component: 'cdr-pagination',
  prefix: '--cdr-pagination',
  interaction: 'action',
  hooks: true,
  defaultVariant: 'default',

  // Base values captured from the existing stylesheet.
  defaults: {
    'link-padding': token('cdr-space-inset-three-quarter-x-squish'),
    'link-radius': token('cdr-radius-softer'),
    'link-gap': token('cdr-space-quarter-x'),
    'prev-margin-right': token('cdr-space-one-x'),
    'next-margin-left': token('cdr-space-one-x'),
    'caret-margin-right': token('cdr-space-eighth-x'),
    'caret-margin-left': token('cdr-space-eighth-x'),
    'keyline-height': literal('2px'),
    'keyline-width': literal('80%'),
  },

  variants: {
    default: {
      identity: 'neutral',
      rest: { text: 'neutral-bold', icon: 'neutral-bold' },
      hover: { surface: 'neutral-faint' },
      'focus-visible': { surface: 'neutral-faint' },
      active: { surface: 'neutral-faint' },
      disabled: { text: 'neutral-subtle', icon: 'neutral-subtle' },
    },

    // The current page's keyline: a trigger-colored indicator line.
    current: {
      identity: 'trigger',
      rest: { border: 'trigger' },
    },
  },
};

export default contract;
