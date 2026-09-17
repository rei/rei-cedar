import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { semantic, token } from '../../../build/component-tokens/types';

/**
 * Neutral input affordances; validation crosses into feedback. Checked and disabled treatments keep their current contrast and state precedence.
 * Semantic paths are migration proposals; legacy fallbacks preserve current rendering.
 * See docs/component-semantic-rollout.md for the mapping and review policy.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-label-wrapper',
  prefix: '--cdr-label-wrapper',
  interaction: 'control',
  defaults: {
    label: semantic('control-text-neutral', token('cdr-color-text-input-label')),
    surface: semantic('control-surface-neutral-trace', token('cdr-color-background-input-default')),
    'surface-default-hover': semantic(
      'control-surface-neutral-faint',
      token('cdr-color-background-label-default-hover'),
    ),
    'surface-default-focus': semantic(
      'control-surface-neutral-faint',
      token('cdr-color-background-label-default-focus'),
    ),
    'border-focus': semantic(
      'control-border-neutral-bold',
      token('cdr-color-border-label-default-focus'),
    ),
    'surface-default-active': semantic(
      'control-surface-neutral-subtle',
      token('cdr-color-background-label-default-active'),
    ),
    'surface-secondary-hover': semantic(
      'control-surface-neutral-faint',
      token('cdr-color-background-label-secondary-hover'),
    ),
    'surface-secondary-focus': semantic(
      'control-surface-neutral-faint',
      token('cdr-color-background-label-secondary-focus'),
    ),
    'surface-secondary-active': semantic(
      'control-surface-neutral-subtle',
      token('cdr-color-background-label-secondary-active'),
    ),
    'text-disabled': semantic('control-text-neutral-faint', token('cdr-color-text-input-disabled')),
    border: semantic('control-border-neutral', token('cdr-color-border-input-default')),
  },
  variants: {},
};

export default contract;
