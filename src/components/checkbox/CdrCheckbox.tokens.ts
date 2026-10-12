import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { literal, token } from '../../../build/component-tokens/types';

/**
 * CdrCheckbox Token Contract (Control, cutover)
 *
 * Checkboxes configure form input in place. Unchecked rest is rendered by
 * CdrLabelWrapper's figure base (unmigrated); `default.rest` documents that
 * effective inherited appearance so the contract shape stays honest. The
 * indeterminate figure reuses the checked-scope values. Documented overrides
 * keep their names (no hooks are generated).
 *
 * Cutover mode: no `legacy` section.
 *
 * Palette gap: no approved Control border matches the hover outline
 * (#2e2e2b); it maps to control-border-neutral-intense (#171613), which
 * renders visibly darker (dRGB 41). All other slots are within dRGB 11.
 *
 * To regenerate the SCSS maps from this contract:
 *   npx tsx build/generate-component-maps.ts
 */
const contract: ComponentTokenContract = {
  component: 'cdr-checkbox',
  prefix: '--cdr-checkbox',
  interaction: 'control',

  defaults: {
    'figure-radius': token('cdr-radius-soft'),
    'svg-box-right': literal('2.8rem'),
    'svg-box-top': literal('2rem'),
    'svg-top': literal('-1.7rem'),
    'svg-left': literal('0.35rem'),
    'svg-width': literal('1.6rem'),
    'svg-height': literal('1.6rem'),
    'indeterminate-width': literal('8px'),
    'indeterminate-height': literal('2px'),
  },

  variants: {
    default: {
      identity: 'neutral',
      rest: { surface: 'neutral-faint', border: 'neutral' },
      hover: { surface: 'neutral-faint', border: 'neutral-intense' },
      'focus-visible': { surface: 'neutral-faint', border: 'neutral-bold' },
      active: { surface: 'neutral-faint', border: 'neutral-bold' },
      disabled: { surface: 'neutral-faint', border: 'neutral-faint' },
    },
    checked: {
      identity: 'neutral',
      rest: { surface: 'neutral-bold', border: 'neutral-bold', icon: 'neutral-trace' },
      hover: { surface: 'neutral-prominent', border: 'neutral-bold', icon: 'neutral-trace' },
      'focus-visible': {
        surface: 'neutral-prominent',
        border: 'neutral-bold',
        icon: 'neutral-trace',
      },
      active: { surface: 'neutral-faint', border: 'neutral-bold', icon: 'neutral-bold' },
      disabled: { surface: 'neutral-faint', border: 'neutral-faint' },
    },
  },
};

export default contract;
