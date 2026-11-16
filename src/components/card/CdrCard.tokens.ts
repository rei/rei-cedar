import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { token } from '../../../build/component-tokens/types';

/**
 * CdrCard Token Contract (Action link, Universal surface and text)
 *
 * The card link is the primary interactive part, so it uses Action tokens. The
 * surface and base text are static content, so they use Universal tokens via
 * fullPath. Documented overrides keep their names (no hooks are generated).
 */
const contract: ComponentTokenContract = {
  component: 'cdr-card',
  prefix: '--cdr-card',
  interaction: 'action',

  defaults: {
    'border-radius': token('cdr-radius-softer'),
    'box-shadow': token('cdr-prominence-raised'),
    'box-shadow-hover': token('cdr-prominence-floating'),
  },

  variants: {
    base: {
      identity: 'neutral',
      rest: {
        surface: { fullPath: 'surface-natural' },
        text: { fullPath: 'text-neutral-prominent' },
      },
    },
    link: {
      identity: 'neutral',
      rest: { text: 'neutral-bold' },
      hover: { text: 'trigger' },
    },
  },
};

export default contract;
