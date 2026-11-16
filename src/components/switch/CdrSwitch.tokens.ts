import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { token } from '../../../build/component-tokens/types';

/**
 * CdrSwitch Token Contract (Control, cutover)
 *
 * Toggles between two opposing states in place. The track and both x/check
 * icons resolve the `default` and `checked` scopes; the handle (the sliding
 * thumb) is its own pair of scopes because its border diverges from the
 * track in the checked states. Documented overrides keep their names
 * (`--cdr-switch-*`), so the generated map is a fallback lookup.
 *
 *   default         → track surface, border, focus ring and icons
 *   checked         → selected track surface, border, ring and icons
 *   handle          → handle surface and border
 *   handle-checked  → selected handle border overrides
 *
 * Palette notes: the near-white track (#fafbf9) flattens to the approved
 * opaque faint surface (#FCFCFB); the checked track (#2e2e2b) reads as
 * control surface neutral-intense (#312D27, dRGB 5); the handle (#d5cfc3)
 * reads as control surface natural-bold (#DDD4BC, dRGB 12), following the
 * CdrChip treatment of the same legacy value; the selected icons (#d5cfc3)
 * read as control icon neutral (#CECAC3, dRGB 9).
 *
 * Cutover mode: no `legacy` section; no hooks are generated (documented
 * overrides are preserved by the module).
 *
 * To regenerate the SCSS maps from this contract:
 *   npx tsx build/generate-component-maps.ts
 */
const contract: ComponentTokenContract = {
  component: 'cdr-switch',
  prefix: '--cdr-switch',
  interaction: 'control',

  defaults: {
    margin: token('cdr-space-quarter-x'),
    'transition-duration': token('cdr-duration-3-x'),
    'transition-timing': token('cdr-timing-function-ease-out'),
  },

  variants: {
    default: {
      identity: 'neutral',
      rest: { surface: 'neutral-faint', border: 'neutral', icon: 'neutral-prominent' },
      hover: { surface: 'neutral-faint', border: 'neutral-bold', icon: 'neutral-intense' },
      'focus-visible': {
        surface: 'neutral-faint',
        border: 'neutral',
        icon: 'neutral-prominent',
      },
    },
    checked: {
      identity: 'neutral',
      rest: { surface: 'neutral-bold', icon: 'neutral' },
      hover: { surface: 'neutral-intense', border: 'neutral', icon: 'neutral' },
      'focus-visible': { surface: 'neutral-intense', border: 'neutral', icon: 'neutral' },
    },
    handle: {
      identity: 'neutral',
      rest: { surface: 'natural-bold', border: 'neutral' },
      hover: { border: 'neutral-bold' },
    },
    'handle-checked': {
      identity: 'neutral',
      rest: { surface: 'natural-bold' },
      hover: { border: 'neutral-bold' },
      'focus-visible': { border: 'neutral-faint' },
    },
  },
};

export default contract;
