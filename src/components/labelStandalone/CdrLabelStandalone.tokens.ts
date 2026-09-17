import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { semantic, token } from '../../../build/component-tokens/types';

/**
 * Neutral input affordances; validation crosses into feedback. Checked and disabled treatments keep their current contrast and state precedence.
 * Semantic paths are migration proposals; legacy fallbacks preserve current rendering.
 * See docs/component-semantic-rollout.md for the mapping and review policy.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-label-standalone',
  prefix: '--cdr-label-standalone',
  interaction: 'control',
  defaults: {
    label: semantic('control-text-neutral', token('cdr-color-text-input-label')),
    'text-disabled': semantic('control-text-neutral-faint', token('cdr-color-text-input-disabled')),
    optional: semantic('control-text-neutral-subtle', token('cdr-color-text-input-optional')),
    helper: semantic('control-text-neutral-subtle', token('cdr-color-text-input-help')),
  },
  variants: {},
};

export default contract;
