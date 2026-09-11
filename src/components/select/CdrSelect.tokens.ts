import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { semantic, token } from '../../../build/component-tokens/types';

/**
 * Neutral input affordances; validation crosses into feedback. Checked and disabled treatments keep their current contrast and state precedence.
 * Semantic paths are migration proposals; legacy fallbacks preserve current rendering.
 * See docs/component-semantic-rollout.md for the mapping and review policy.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-select',
  prefix: '--cdr-select',
  interaction: 'control',
  defaults: {
    'prompt-icon': semantic('control-icon-neutral', token('cdr-color-text-primary')),
    'icon-disabled': semantic('control-icon-neutral-faint', token('cdr-color-icon-disabled')),
    surface: semantic('control-surface-neutral-trace', token('cdr-color-background-input-default')),
    text: semantic('control-text-neutral', token('cdr-color-text-input-default')),
    border: semantic('control-border-neutral', token('cdr-color-border-input-default')),
    'surface-disabled': semantic(
      'control-surface-neutral-faint',
      token('cdr-color-background-input-default-disabled'),
    ),
    'text-disabled': semantic('control-text-neutral-faint', token('cdr-color-text-input-disabled')),
    'border-disabled': semantic(
      'control-border-neutral-faint',
      token('cdr-color-border-input-default-disabled'),
    ),
    'border-focus': semantic(
      'control-border-neutral-bold',
      token('cdr-color-border-input-default-focus'),
    ),
    prompt: semantic('control-text-neutral', token('cdr-color-text-primary')),
    'surface-active': semantic(
      'control-surface-neutral-trace',
      token('cdr-color-background-input-default-active'),
    ),
    'surface-secondary': semantic(
      'control-surface-neutral-faint',
      token('cdr-color-background-input-secondary'),
    ),
    'surface-secondary-active': semantic(
      'control-surface-neutral-trace',
      token('cdr-color-background-input-secondary-active'),
    ),
    'error-surface': semantic(
      'feedback-surface-error-faint',
      token('cdr-color-background-input-error'),
    ),
    'error-border': semantic('feedback-border-error', token('cdr-color-border-input-error')),
  },
  variants: {},
};

export default contract;
