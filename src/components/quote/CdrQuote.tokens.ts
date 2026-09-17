import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { semantic, token } from '../../../build/component-tokens/types';

/**
 * Foundation colors preserve content hierarchy without inventing an interaction family.
 * Semantic paths are migration proposals; legacy fallbacks preserve current rendering.
 * See docs/component-semantic-rollout.md for the mapping and review policy.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-quote',
  prefix: '--cdr-quote',
  defaults: {
    'text-secondary': semantic('text-neutral-subtle', token('cdr-color-text-secondary')),
    text: semantic('text-neutral', token('cdr-color-text-primary')),
    border: semantic('border-neutral-subtle', token('cdr-color-border-primary')),
  },
  variants: {},
};

export default contract;
