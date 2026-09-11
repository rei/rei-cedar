import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { semantic, token } from '../../../build/component-tokens/types';

/**
 * A foundation canvas. Only status borders carry feedback intent; brand and sale remain identities.
 * Semantic paths are migration proposals; legacy fallbacks preserve current rendering.
 * See docs/component-semantic-rollout.md for the mapping and review policy.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-surface',
  prefix: '--cdr-surface',
  defaults: {
    surface: semantic('surface-neutral-trace', token('cdr-color-background-surface-primary')),
    'surface-secondary': semantic(
      'surface-neutral-faint',
      token('cdr-color-background-surface-secondary'),
    ),
    'surface-brand': semantic('surface-brand', token('cdr-color-background-surface-brand-spruce')),
    'surface-sale': semantic('surface-sale', token('cdr-color-background-surface-sale')),
    border: semantic('border-neutral-subtle', token('cdr-color-border-surface-primary')),
    'border-secondary': semantic('border-neutral', token('cdr-color-border-surface-secondary')),
    'border-success': semantic(
      'feedback-border-success',
      token('cdr-color-border-surface-success'),
    ),
    'border-warning': semantic(
      'feedback-border-warning',
      token('cdr-color-border-surface-warning'),
    ),
    'border-error': semantic('feedback-border-error', token('cdr-color-border-surface-error')),
    'border-info': semantic('feedback-border-info', token('cdr-color-border-surface-info')),
  },
  variants: {},
};

export default contract;
