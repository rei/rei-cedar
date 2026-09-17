import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { semantic, token } from '../../../build/component-tokens/types';

/**
 * A choice in a group follows Chip: faint at rest, base on interaction, subtle when selected.
 * Semantic paths are migration proposals; legacy fallbacks preserve current rendering.
 * See docs/component-semantic-rollout.md for the mapping and review policy.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-toggle-button',
  prefix: '--cdr-toggle-button',
  interaction: 'selection',
  defaults: {
    text: semantic('selection-text-neutral', token('cdr-color-text-toggle-button-default-rest')),
    surface: semantic(
      'selection-surface-neutral-faint',
      token('cdr-color-background-toggle-button-default-rest'),
    ),
    'border-focus': semantic(
      'selection-border-neutral',
      token('cdr-color-border-toggle-button-default-focus'),
    ),
    'surface-focus': semantic(
      'selection-surface-neutral',
      token('cdr-color-background-toggle-button-default-focus'),
    ),
    icon: semantic('selection-icon-neutral', token('cdr-color-icon-default')),
    'surface-selected': semantic(
      'selection-surface-neutral-subtle',
      token('cdr-color-background-toggle-button-default-selected-rest'),
    ),
    'border-selected': semantic(
      'selection-border-neutral-subtle',
      token('cdr-color-border-toggle-button-default-selected-rest'),
    ),
    'icon-selected': semantic('selection-icon-neutral-bold', token('cdr-color-icon-emphasis')),
    'border-selected-focus': semantic(
      'selection-border-neutral-subtle',
      token('cdr-color-border-toggle-button-default-selected-focus'),
    ),
    'surface-selected-hover': semantic(
      'selection-surface-neutral-subtle',
      token('cdr-color-background-toggle-button-default-selected-hover'),
    ),
    'surface-hover': semantic(
      'selection-surface-neutral',
      token('cdr-color-background-toggle-button-default-hover'),
    ),
    'group-border': semantic('border-neutral-subtle', token('cdr-color-border-primary')),
    'group-surface': semantic(
      'surface-neutral-faint',
      token('cdr-color-background-toggle-group-default-rest'),
    ),
  },
  variants: {},
};

export default contract;
