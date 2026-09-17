import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { semantic, literal } from '../../../build/component-tokens/types';

/**
 * The scroll track recedes and the draggable thumb remains prominent. Elevation stays in the existing prominence layer.
 * Semantic paths are migration proposals; legacy fallbacks preserve current rendering.
 * See docs/component-semantic-rollout.md for the mapping and review policy.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-surface-scroll',
  prefix: '--cdr-surface-scroll',
  interaction: 'control',
  defaults: {
    track: semantic('control-surface-neutral-faint', literal('#e8e0ce')),
    thumb: semantic('control-surface-neutral-bold', literal('#454441')),
  },
  variants: {},
};

export default contract;
