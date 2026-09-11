import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { semantic, token } from '../../../build/component-tokens/types';

/**
 * Explanatory content on a strong neutral surface. The arrow shares the panel surface and border.
 * Semantic paths are migration proposals; legacy fallbacks preserve current rendering.
 * See docs/component-semantic-rollout.md for the mapping and review policy.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-tooltip',
  prefix: '--cdr-tooltip',
  defaults: {
    surface: semantic('surface-neutral-bold', token('cdr-color-background-tooltip-default')),
    text: semantic('text-neutral-intense', token('cdr-color-text-tooltip-default')),
    border: semantic('border-neutral-trace', token('cdr-color-border-tooltip-default')),
  },
  variants: {},
};

export default contract;
