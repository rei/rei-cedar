import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { semantic, literal } from '../../../build/component-tokens/types';

/**
 * Arrow colors come from CdrButton. Only the additional focus ring is owned here.
 * Semantic paths are migration proposals; legacy fallbacks preserve current rendering.
 * See docs/component-semantic-rollout.md for the mapping and review policy.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-filmstrip',
  prefix: '--cdr-filmstrip',
  interaction: 'action',
  defaults: {
    'border-focus': semantic('action-border-neutral-bold', literal('#2e2e2b')),
  },
  variants: {},
};

export default contract;
