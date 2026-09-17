import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { semantic, token, literal } from '../../../build/component-tokens/types';

/**
 * Choice-tile surfaces use selection semantics while layout and state handling remain in CdrSurface.
 * Semantic paths are migration proposals; legacy fallbacks preserve current rendering.
 * See docs/component-semantic-rollout.md for the mapping and review policy.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-surface-selection',
  prefix: '--cdr-surface-selection',
  interaction: 'selection',
  defaults: {
    'surface-hover': semantic(
      'selection-surface-neutral',
      literal('var(--cdr-surface-background)'),
    ),
    'surface-active': semantic(
      'selection-surface-neutral-subtle',
      literal('var(--cdr-surface-background)'),
    ),
    'surface-checked': semantic(
      'selection-surface-neutral-subtle',
      literal('var(--cdr-surface-background)'),
    ),
    'border-checked': semantic(
      'selection-border-neutral-subtle',
      literal('var(--cdr-surface-border-color)'),
    ),
    surface: semantic('selection-surface-neutral-faint', token('cdr-color-background-primary')),
    'surface-disabled': semantic(
      'selection-surface-neutral-trace',
      token('cdr-color-background-secondary'),
    ),
    border: semantic('selection-border-neutral', token('cdr-color-border-secondary')),
  },
  variants: {},
};

export default contract;
