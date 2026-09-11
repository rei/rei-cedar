import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { semantic, token } from '../../../build/component-tokens/types';

/**
 * Navigation links use trigger on interaction; the trail and separators stay quiet.
 * Semantic paths are migration proposals; legacy fallbacks preserve current rendering.
 * See docs/component-semantic-rollout.md for the mapping and review policy.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-breadcrumb',
  prefix: '--cdr-breadcrumb',
  interaction: 'action',
  defaults: {
    'text-icon': semantic('action-icon-neutral-subtle', token('cdr-color-text-secondary')),
    'text-interaction-icon': semantic(
      'action-icon-trigger-faint',
      token('cdr-color-text-link-hover'),
    ),
    text: semantic('action-text-neutral-subtle', token('cdr-color-text-secondary')),
    'text-interaction': semantic('action-text-trigger-faint', token('cdr-color-text-link-hover')),
  },
  variants: {},
};

export default contract;
