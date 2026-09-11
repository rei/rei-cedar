import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { semantic, token, literal } from '../../../build/component-tokens/types';

/**
 * The tile delegates selection to CdrSurfaceSelection; its status icon alone communicates feedback.
 * Semantic paths are migration proposals; legacy fallbacks preserve current rendering.
 * See docs/component-semantic-rollout.md for the mapping and review policy.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-fulfillment-tile',
  prefix: '--cdr-fulfillment-tile',
  interaction: 'feedback',
  defaults: {
    'icon-surface': semantic('surface-neutral-trace', token('cdr-color-background-primary')),
    'icon-halo': literal('white'),
    icon: semantic('feedback-icon-neutral', token('cdr-color-icon-message-default')),
    'icon-info': semantic('feedback-icon-info', token('cdr-color-icon-message-info')),
    'icon-warning': semantic('feedback-icon-warning', token('cdr-color-icon-message-warning')),
    'icon-success': semantic('feedback-icon-success', token('cdr-color-icon-message-success')),
    'icon-error': semantic('feedback-icon-error', token('cdr-color-icon-message-error')),
  },
  variants: {},
};

export default contract;
