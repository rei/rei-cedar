import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { semantic, token } from '../../../build/component-tokens/types';

/**
 * The track, handle, and state icons remain independently themeable. Checked uses a stronger neutral expression, not success feedback.
 * Semantic paths are migration proposals; legacy fallbacks preserve current rendering.
 * See docs/component-semantic-rollout.md for the mapping and review policy.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-switch',
  prefix: '--cdr-switch',
  interaction: 'control',
  defaults: {
    border: semantic('control-border-neutral', token('cdr-color-border-secondary')),
    surface: semantic(
      'control-surface-neutral-faint',
      token('cdr-color-background-switch-default-rest'),
    ),
    icon: semantic('control-icon-neutral', token('cdr-color-icon-default')),
    'surface-focus': semantic(
      'control-surface-neutral-subtle',
      token('cdr-color-background-switch-default-focus'),
    ),
    'handle-surface-focus': semantic(
      'control-surface-neutral-trace',
      token('cdr-color-background-switch-handle-default-focus'),
    ),
    'border-hover': semantic(
      'control-border-neutral-bold',
      token('cdr-color-border-switch-default-hover'),
    ),
    'surface-hover': semantic(
      'control-surface-neutral-subtle',
      token('cdr-color-background-switch-default-hover'),
    ),
    'icon-hover': semantic('control-icon-neutral-bold', token('cdr-color-icon-emphasis')),
    'surface-checked': semantic(
      'control-surface-neutral-bold',
      token('cdr-color-background-switch-selected-default-rest'),
    ),
    'icon-checked': semantic(
      'control-icon-neutral-intense',
      token('cdr-color-icon-switch-selected-default-rest'),
    ),
    'surface-checked-focus': semantic(
      'control-surface-neutral-bold',
      token('cdr-color-background-switch-selected-default-focus'),
    ),
    'handle-border-focus': semantic(
      'control-border-neutral-bold',
      token('cdr-color-border-switch-handle-default-focus'),
    ),
    'handle-surface-checked-focus': semantic(
      'control-surface-neutral-trace',
      token('cdr-color-background-switch-handle-selected-default-focus'),
    ),
    'icon-checked-focus': semantic(
      'control-icon-neutral-intense',
      token('cdr-color-icon-switch-selected-default-focus'),
    ),
    'handle-surface-checked': semantic(
      'control-surface-neutral-trace',
      token('cdr-color-background-switch-handle-selected-default-rest'),
    ),
    'surface-checked-hover': semantic(
      'control-surface-neutral-intense',
      token('cdr-color-background-switch-selected-default-hover'),
    ),
    'icon-checked-hover': semantic(
      'control-icon-neutral-intense',
      token('cdr-color-icon-switch-selected-default-hover'),
    ),
    'handle-border-hover': semantic(
      'control-border-neutral-bold',
      token('cdr-color-border-switch-handle-default-hover'),
    ),
    'handle-surface': semantic(
      'control-surface-neutral-trace',
      token('cdr-color-background-switch-handle-default-rest'),
    ),
  },
  variants: {},
};

export default contract;
