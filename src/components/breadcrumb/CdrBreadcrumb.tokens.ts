import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { literal, token } from '../../../build/component-tokens/types';

/**
 * CdrBreadcrumb Token Contract (Action, cutover)
 *
 * Navigation trail: links move the user to parent pages, and the ellipsis
 * trigger reveals truncated levels in place. Two color scopes share the same
 * Action palette:
 *   default  — item/link text; the link and delimiter inherit the item color
 *   ellipsis — truncation trigger label
 *
 * Rest text was legacy `cdr-color-text-secondary` (#736e65) and the highlight
 * was legacy `cdr-color-text-link-hover` (#406eb5). The trigger identity
 * replaces the retired `link` identity.
 *
 * Cutover mode: no `legacy` section, so the maps emit the bare semantic var
 * and the module consumes it as the default under the component override hook.
 *
 * To regenerate the SCSS maps from this contract:
 *   npx tsx build/generate-component-maps.ts
 */

const contract: ComponentTokenContract = {
  component: 'cdr-breadcrumb',
  prefix: '--cdr-breadcrumb',
  interaction: 'action',

  // Base values grabbed from the existing stylesheet — every declaration in the
  // module consumes one of these properties instead of repeating the literal.
  defaults: {
    'line-height': literal('1'),
    'list-display': literal('inline-flex'),
    'list-flex-wrap': literal('wrap'),
    'list-padding': literal('0'),
    'list-margin': literal('0'),
    'item-display': literal('inline-flex'),
    'item-flex': literal('none'),
    'item-padding': literal('0'),
    'delimiter-color': literal('inherit'),
    'delimiter-padding': token('cdr-space-half-x'),
    'link-color': literal('inherit'),
    'link-text-decoration': literal('none'),
    'link-highlight-text-decoration': literal('underline'),
    'ellipses-font-family': literal('inherit'),
    'ellipses-font-size': literal('inherit'),
    'ellipses-line-height': literal('inherit'),
    'ellipses-border': literal('none'),
    'ellipses-background': literal('none'),
    'ellipses-background-color': literal('transparent'),
    'ellipses-cursor': literal('pointer'),
    'ellipses-display': literal('inline-block'),
    'ellipses-fill': literal('inherit'),
    'ellipses-padding': literal('0'),
    'ellipses-icon-border-bottom': literal('1px solid transparent'),
    'ellipses-icon-fill': literal('inherit'),
    'ellipses-icon-text-decoration': literal('underline'),
  },

  variants: {
    default: {
      identity: 'neutral',
      rest: { text: 'neutral-prominent' },
      hover: { text: 'trigger' },
      'focus-visible': { text: 'trigger' },
      active: { text: 'trigger' },
    },
    ellipsis: {
      identity: 'neutral',
      rest: { text: 'neutral-prominent' },
      hover: { text: 'trigger' },
      'focus-visible': { text: 'trigger' },
      active: { text: 'trigger' },
    },
  },
};

export default contract;
