import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { semantic, token } from '../../../build/component-tokens/types';

/**
 * Validation is feedback even when rendered beside a control.
 * Semantic paths are migration proposals; legacy fallbacks preserve current rendering.
 * See docs/component-semantic-rollout.md for the mapping and review policy.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-form-error',
  prefix: '--cdr-form-error',
  interaction: 'feedback',
  defaults: {
    'error-text': semantic('feedback-text-error-bold', token('cdr-color-text-input-error')),
    'error-text-icon': semantic('feedback-icon-error', token('cdr-color-text-input-error')),
  },
  variants: {},
};

export default contract;
