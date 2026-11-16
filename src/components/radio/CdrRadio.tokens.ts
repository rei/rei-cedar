import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { literal, token } from '../../../build/component-tokens/types';

/**
 * CdrRadio Token Contract (Control, cutover)
 *
 * Chooses a single option from a set. Unchecked rest is rendered by
 * CdrLabelWrapper's figure base (unmigrated); `default.rest` documents that
 * effective inherited appearance so the contract shape stays honest. The
 * inner circle (the selection dot) is the radio's icon role and always
 * resolves the `checked` scope, mirroring CdrCheckbox. The shared hover,
 * focus, active and disabled rules resolve the `default` scope; the checked
 * scopes declare only the slots their own rules override.
 *
 * Cutover mode: no `legacy` section; no hooks are generated (documented
 * overrides are preserved by the module).
 *
 * Palette gaps, using the CdrCheckbox treatment of the same legacy values:
 * the hover outline (#2e2e2b) maps to control border neutral-intense
 * (#171613), which renders visibly darker (dRGB 41); near-white surfaces
 * (#fafbf9) flatten to the approved opaque faint surface (#FCFCFB).
 * The checked-active dot (#4b4a48) maps to control icon neutral-intense
 * (#4C473E, dRGB 11). CdrCheckbox renders the same visual through its
 * `neutral-bold` slot with a shim override, so radio names the value by its
 * approved token instead.
 *
 * To regenerate the SCSS maps from this contract:
 *   npx tsx build/generate-component-maps.ts
 */
const contract: ComponentTokenContract = {
  component: 'cdr-radio',
  prefix: '--cdr-radio',
  interaction: 'control',

  defaults: {
    'figure-radius': literal('100%'),
    // cdr-form-figure-size-medium / 4
    'inner-circle-size': literal('0.4rem'),
    'inner-circle-radius': token('cdr-radius-round'),
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
      hover: { surface: 'neutral-prominent', border: 'neutral-bold' },
      'focus-visible': { surface: 'neutral-prominent' },
      active: { icon: 'neutral-intense' },
      disabled: { icon: 'neutral-faint' },
    },
  },
};

export default contract;
