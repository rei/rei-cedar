import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { semantic, token } from '../../../build/component-tokens/types';

/**
 * Foundation colors preserve content hierarchy without inventing an interaction family.
 * Semantic paths are migration proposals; legacy fallbacks preserve current rendering.
 * See docs/component-semantic-rollout.md for the mapping and review policy.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-kicker',
  prefix: '--cdr-kicker',
  defaults: {
    text: semantic('text-neutral', token('cdr-color-text-primary')),
  },
  variants: {},
};

export default contract;
