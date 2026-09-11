import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { semantic, literal, token } from '../../../build/component-tokens/types';

/**
 * Tabs configure the visible content. Persistent selection is distinct from a momentary press.
 * Semantic paths are migration proposals; legacy fallbacks preserve current rendering.
 * See docs/component-semantic-rollout.md for the mapping and review policy.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-tabs',
  prefix: '--cdr-tabs',
  interaction: 'control',
  defaults: {
    'gradient-surface': semantic('surface-neutral-trace', token('cdr-color-background-primary')),
    'scrollbar-thumb': semantic('control-surface-neutral-bold', literal('rgb(0, 0, 0, 0.5)')),
    'scrollbar-edge': literal('rgb(255, 255, 255, 0.5)'),
    keyline: semantic('border-neutral-subtle', token('cdr-color-border-tab-keyline-rest')),
    text: semantic('control-text-neutral-subtle', token('cdr-color-text-tab-rest')),
    'text-selected': semantic('control-text-neutral-bold', token('cdr-color-text-tab-active')),
    'text-interaction': semantic('control-text-neutral', token('cdr-color-text-tab-hover')),
    'text-disabled': semantic('control-text-neutral-faint', token('cdr-color-text-tab-disabled')),
    'keyline-selected': semantic(
      'control-border-neutral-bold',
      token('cdr-color-border-tab-keyline-active'),
    ),
  },
  variants: {},
};

export default contract;
