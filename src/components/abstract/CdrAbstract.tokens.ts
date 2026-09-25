import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { literal } from '../../../build/component-tokens/types';

/**
 * CdrAbstract Token Contract (Universal, cutover)
 *
 * Static text component: no interaction family, single default variant,
 * rest.text only. Replaces legacy `cdr-color-text-primary`.
 *
 * Cutover mode: no `legacy` section, so the map emits the bare semantic var
 * and the module consumes it as the default under the component override hook.
 *
 * To regenerate the SCSS maps from this contract:
 *   npx tsx build/generate-component-maps.ts
 */

const contract: ComponentTokenContract = {
  component: 'cdr-abstract',
  prefix: '--cdr-abstract',

  // Base values grabbed from the existing stylesheet — every base-rule
  // declaration below the loop consumes one of these, so nothing is hardcoded
  // in the module. `*-condensed` values apply inside the narrow container query.
  defaults: {
    margin: literal('0'),
    'max-width': literal('75ch'),
    'font-size': literal('var(--cdr-type-scale-1)'),
    'line-height': literal('var(--cdr-line-height-ratio-subheading-sans-1)'),
    'font-size-condensed': literal('var(--cdr-type-scale-0)'),
    'line-height-condensed': literal('var(--cdr-line-height-ratio-subheading-sans-0)'),
  },

  variants: {
    default: {
      identity: 'neutral',
      rest: { text: 'neutral' },
    },
  },
};

export default contract;
