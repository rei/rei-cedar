import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { semantic, token } from '../../../build/component-tokens/types';

/**
 * Reading surfaces use foundation colors. Header and striped rows establish hierarchy, not interaction intent.
 * Semantic paths are migration proposals; legacy fallbacks preserve current rendering.
 * See docs/component-semantic-rollout.md for the mapping and review policy.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-table',
  prefix: '--cdr-table',
  defaults: {
    text: semantic('text-neutral', token('cdr-color-text-primary')),
    'row-surface': semantic('surface-neutral-trace', token('cdr-color-background-table-row')),
    'header-surface': semantic(
      'surface-neutral-subtle',
      token('cdr-color-background-table-header'),
    ),
    'row-border': semantic('border-neutral-subtle', token('cdr-color-border-table-default')),
    'header-border': semantic('border-neutral', token('cdr-color-border-table-head')),
    'row-alternate-surface': semantic(
      'surface-neutral-faint',
      token('cdr-color-background-table-row-alt'),
    ),
  },
  variants: {},
};

export default contract;
