import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { semantic, token } from '../../../build/component-tokens/types';

/**
 * Neutral input affordances; validation crosses into feedback. Checked and disabled treatments keep their current contrast and state precedence.
 * Semantic paths are migration proposals; legacy fallbacks preserve current rendering.
 * See docs/component-semantic-rollout.md for the mapping and review policy.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-input',
  prefix: '--cdr-input',
  interaction: 'control',
  defaults: {
    border: semantic('control-border-neutral', token('cdr-color-border-input-default')),
    surface: semantic('control-surface-neutral-trace', token('cdr-color-background-input-default')),
    'surface-active': semantic(
      'control-surface-neutral-trace',
      token('cdr-color-background-input-default-active'),
    ),
    'border-focus': semantic(
      'control-border-neutral-bold',
      token('cdr-color-border-input-default-focus'),
    ),
    'prompt-icon': semantic('control-icon-neutral', token('cdr-color-text-primary')),
    icon: semantic('control-icon-neutral', token('cdr-color-icon-default')),
    text: semantic('control-text-neutral', token('cdr-color-text-input-default')),
    placeholder: semantic('control-text-neutral-subtle', token('cdr-color-text-input-placeholder')),
    'surface-disabled': semantic(
      'control-surface-neutral-faint',
      token('cdr-color-background-input-default-disabled'),
    ),
    'text-disabled': semantic('control-text-neutral-faint', token('cdr-color-text-input-disabled')),
    'border-disabled': semantic(
      'control-border-neutral-faint',
      token('cdr-color-border-input-default-disabled'),
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
    helper: semantic('control-text-neutral-subtle', token('cdr-color-text-input-help')),
  },
  variants: {},
};

export default contract;
