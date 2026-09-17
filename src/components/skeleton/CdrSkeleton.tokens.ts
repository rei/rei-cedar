import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { semantic, literal } from '../../../build/component-tokens/types';

/**
 * Loading feedback uses a quiet neutral surface and lighter shimmer; motion stays opt-in through reduced-motion CSS.
 * Semantic paths are migration proposals; legacy fallbacks preserve current rendering.
 * See docs/component-semantic-rollout.md for the mapping and review policy.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-skeleton',
  prefix: '--cdr-skeleton',
  interaction: 'feedback',
  defaults: {
    surface: semantic('feedback-surface-neutral-faint', literal('#edeae3')),
    'shimmer-base': semantic('feedback-surface-neutral-faint', literal('rgb(237, 234, 227, 1)')),
    'shimmer-highlight': semantic(
      'feedback-surface-neutral-trace',
      literal('rgb(249, 248, 240, 1)'),
    ),
  },
  variants: {},
};

export default contract;
