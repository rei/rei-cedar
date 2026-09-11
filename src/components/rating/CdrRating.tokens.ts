import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { semantic, token, literal } from '../../../build/component-tokens/types';

/**
 * Rating is an identity, not an interaction family. Star fill and contour are independent from review navigation.
 * Semantic paths are migration proposals; legacy fallbacks preserve current rendering.
 * See docs/component-semantic-rollout.md for the mapping and review policy.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-rating',
  prefix: '--cdr-rating',
  defaults: {
    text: semantic('text-neutral', token('cdr-color-text-rating-default')),
    'text-hover': semantic('action-text-trigger-faint', token('cdr-color-text-rating-hover')),
    separator: semantic('border-neutral-subtle', token('cdr-color-text-rating-separator')),
    'star-empty': semantic('icon-neutral-trace', literal('#f9f8f6')),
    'star-null-outline': semantic('icon-neutral-subtle', literal('#928b80')),
    'star-fill': semantic('icon-rating', literal('#ffd280')),
    'star-stroke': semantic('border-rating', literal('#bd7b2d')),
  },
  variants: {},
};

export default contract;
