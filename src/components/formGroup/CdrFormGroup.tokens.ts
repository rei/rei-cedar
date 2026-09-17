import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { semantic, token } from '../../../build/component-tokens/types';

/**
 * Neutral input affordances; validation crosses into feedback. Checked and disabled treatments keep their current contrast and state precedence.
 * Semantic paths are migration proposals; legacy fallbacks preserve current rendering.
 * See docs/component-semantic-rollout.md for the mapping and review policy.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-form-group',
  prefix: '--cdr-form-group',
  interaction: 'control',
  defaults: {
    'text-disabled': semantic('control-text-neutral-faint', token('cdr-color-text-disabled')),
    'error-border': semantic('feedback-border-error', token('cdr-color-border-input-error')),
    'error-surface': semantic(
      'feedback-surface-error-faint',
      token('cdr-color-background-input-error'),
    ),
    optional: semantic('control-text-neutral-subtle', token('cdr-color-text-input-optional')),
  },
  variants: {},
};

export default contract;
