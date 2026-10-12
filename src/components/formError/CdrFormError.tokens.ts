import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { token } from '../../../build/component-tokens/types';

/**
 * CdrFormError Token Contract (Feedback icon)
 *
 * The error icon (fill) uses the Feedback icon error token. The message text is
 * not migrated: no approved text token matches the legacy input error red within
 * the parity tolerance, so its declaration keeps the original legacy value.
 * The documented fill hook keeps its name (no hooks are generated).
 */
const contract: ComponentTokenContract = {
  component: 'cdr-form-error',
  prefix: '--cdr-form-error',
  interaction: 'feedback',

  defaults: {
    'margin-top': token('cdr-space-quarter-x'),
  },

  variants: {
    default: {
      identity: 'error',
      rest: { icon: 'error' },
    },
  },
};

export default contract;
