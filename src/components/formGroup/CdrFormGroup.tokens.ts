import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { token } from '../../../build/component-tokens/types';

/**
 * CdrFormGroup Token Contract (Control, with Feedback error and Universal parts)
 *
 * The group itself configures form input in place, so the component is Control.
 * Its error state uses the Feedback intent (per the taxonomy, control error
 * states use FEEDBACK), and the optional label is static content (Universal),
 * so those parts use fullPath to keep their own namespaces. Documented
 * overrides keep their names (no hooks are generated).
 */
const contract: ComponentTokenContract = {
  component: 'cdr-form-group',
  prefix: '--cdr-form-group',
  interaction: 'control',

  defaults: {
    'content-border-radius': token('cdr-radius-softer'),
  },

  variants: {
    error: {
      identity: 'error',
      rest: {
        surface: { fullPath: 'feedback-surface-error-trace' },
        border: { fullPath: 'feedback-border-error' },
      },
    },
    optional: {
      identity: 'neutral',
      rest: { text: { fullPath: 'text-neutral' } },
    },
    disabled: {
      identity: 'neutral',
      rest: { text: 'neutral-faint' },
    },
  },
};

export default contract;
