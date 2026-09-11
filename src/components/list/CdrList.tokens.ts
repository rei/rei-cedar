import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { semantic, token } from '../../../build/component-tokens/types';

/**
 * Foundation colors preserve content hierarchy without inventing an interaction family.
 * Semantic paths are migration proposals; legacy fallbacks preserve current rendering.
 * See docs/component-semantic-rollout.md for the mapping and review policy.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-list',
  prefix: '--cdr-list',
  defaults: {
    'text-secondary': semantic('text-neutral-subtle', token('cdr-color-text-secondary')),
  },
  variants: {},
};

export default contract;
