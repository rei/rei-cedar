import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { literal } from '../../../build/component-tokens/types';

/**
 * CdrLink Token Contract (Action, cutover)
 *
 * CdrLink is wholly the 'action' interaction family: a text trigger that
 * navigates or activates. The retired `link` identity is `trigger`, so the
 * default scope carries the trigger text across its states:
 *   - rest          → trigger
 *   - hover         → trigger (hover is decoration-only in the module)
 *   - focus-visible → trigger-bold
 *   - active        → trigger-bold
 *
 * There is no approved action-icon-trigger token, so the icon (the element's
 * `fill`, painting icons inside the link) reuses the approved trigger text
 * token via fullPath — declared explicitly, not mirrored.
 *
 * The `neutral` scope is the plain neutral link: every state stays on
 * neutral-bold, matching the retired `cdr-color-text-primary` behavior.
 * The `standalone` and `inherit-color` modifiers stay structural (decoration
 * and inherited paint); they carry no palette entries.
 *
 * The layout values previously hardcoded in the vars mixin are captured in
 * `defaults`; the module emits them as `--cdr-link-<key>` on the root class.
 *
 * Cutover mode: no `legacy` section. `hooks: true` makes the generator wrap
 * every entry in its public `--cdr-link-*` override hook; the module iterates
 * the generated maps.
 *
 * To regenerate the SCSS maps from this contract:
 *   npx tsx build/generate-component-maps.ts
 */

const contract: ComponentTokenContract = {
  component: 'cdr-link',
  prefix: '--cdr-link',
  // Keep the link's historical custom hook namespace.
  hookPrefix: '--cdr-link',
  interaction: 'action',
  hooks: true,
  defaultVariant: 'default',

  // Base values captured from the existing stylesheet.
  defaults: {
    'font-family': literal('inherit'),
    'font-size': literal('inherit'),
    'line-height': literal('inherit'),
    'align-items': literal('center'),
    'background-color': literal('transparent'),
    border: literal('0'),
    cursor: literal('pointer'),
    display: literal('inline-flex'),
    margin: literal('0'),
    outline: literal('none'),
    padding: literal('0'),
    'vertical-align': literal('top'),
    'text-decoration': literal('underline'),
    'text-decoration-hover': literal('none'),
  },

  variants: {
    default: {
      identity: 'trigger',
      rest: { text: 'trigger', icon: { fullPath: 'action-text-trigger' } },
      hover: { text: 'trigger' },
      'focus-visible': { text: 'trigger-bold' },
      active: { text: 'trigger-bold' },
    },

    // Plain neutral link text; every state keeps the same neutral expression.
    neutral: {
      identity: 'neutral',
      rest: { text: 'neutral-bold' },
      hover: { text: 'neutral-bold' },
      'focus-visible': { text: 'neutral-bold' },
      active: { text: 'neutral-bold' },
    },
  },
};

export default contract;
