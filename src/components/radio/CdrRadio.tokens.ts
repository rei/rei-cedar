import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { semantic, token } from '../../../build/component-tokens/types';

/**
 * Neutral input affordances; validation crosses into feedback. Checked and disabled treatments keep their current contrast and state precedence.
 * Semantic paths are migration proposals; legacy fallbacks preserve current rendering.
 * See docs/component-semantic-rollout.md for the mapping and review policy.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-radio',
  prefix: '--cdr-radio',
  interaction: 'control',
  defaults: {
    'border-checked': semantic(
      'control-border-neutral-bold',
      token('cdr-color-border-input-default-selected'),
    ),
    'surface-checked': semantic(
      'control-surface-neutral-bold',
      token('cdr-color-background-input-default-selected'),
    ),
    'icon-checked-dot': semantic(
      'control-icon-neutral-intense',
      token('cdr-color-icon-checkbox-default-selected'),
    ),
    'border-hover': semantic(
      'control-border-neutral-bold',
      token('cdr-color-border-input-default-hover'),
    ),
    'surface-hover': semantic(
      'control-surface-neutral-faint',
      token('cdr-color-background-input-default-hover'),
    ),
    'border-checked-hover': semantic(
      'control-border-neutral-intense',
      token('cdr-color-border-input-default-selected-hover'),
    ),
    'surface-checked-hover': semantic(
      'control-surface-neutral-intense',
      token('cdr-color-background-input-default-selected-hover'),
    ),
    'border-disabled': semantic(
      'control-border-neutral-faint',
      token('cdr-color-border-input-default-disabled'),
    ),
    'surface-disabled': semantic(
      'control-surface-neutral-faint',
      token('cdr-color-background-input-default-disabled'),
    ),
    'surface-disabled-dot': semantic(
      'control-surface-neutral-faint',
      token('cdr-color-background-input-default-disabled'),
    ),
    'border-active': semantic(
      'control-border-neutral-bold',
      token('cdr-color-border-input-default-active'),
    ),
    'surface-focus': semantic(
      'control-surface-neutral-trace',
      token('cdr-color-background-input-default-focus'),
    ),
    'surface-checked-focus': semantic(
      'control-surface-neutral-bold',
      token('cdr-color-background-input-default-selected-focus'),
    ),
    'surface-active': semantic(
      'control-surface-neutral-trace',
      token('cdr-color-background-input-default-active'),
    ),
    'icon-active-dot': semantic(
      'control-icon-neutral-bold',
      token('cdr-color-icon-checkbox-default-selected-active'),
    ),
  },
  variants: {},
};

export default contract;
