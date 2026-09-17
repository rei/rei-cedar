import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { semantic, token } from '../../../build/component-tokens/types';

/**
 * The disclosure is a control; the separator and revealed content are foundation colors.
 * Semantic paths are migration proposals; legacy fallbacks preserve current rendering.
 * See docs/component-semantic-rollout.md for the mapping and review policy.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-accordion',
  prefix: '--cdr-accordion',
  interaction: 'control',
  defaults: {
    border: semantic('border-neutral-subtle', token('cdr-color-border-primary')),
    text: semantic('control-text-neutral', token('cdr-color-text-primary')),
    'surface-hover': semantic(
      'control-surface-neutral-faint',
      token('cdr-color-background-accordion-hover'),
    ),
    icon: semantic('control-icon-neutral', token('cdr-color-icon-default')),
    'content-text': semantic('text-neutral', token('cdr-color-text-primary')),
  },
  variants: {},
};

export default contract;
