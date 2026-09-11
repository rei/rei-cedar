import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { semantic, token } from '../../../build/component-tokens/types';

/**
 * Dialog canvas and translucent scrim are separate foundation treatments; the close action is owned by CdrButton.
 * Semantic paths are migration proposals; legacy fallbacks preserve current rendering.
 * See docs/component-semantic-rollout.md for the mapping and review policy.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-modal',
  prefix: '--cdr-modal',
  defaults: {
    scrim: token('cdr-color-background-modal-overlay'),
    surface: semantic('surface-neutral-trace', token('cdr-color-background-primary')),
  },
  variants: {},
};

export default contract;
