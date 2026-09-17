import type { ComponentTokenContract } from '../../../build/component-tokens/types';

/** Page navigation: transient hover wash, persistent current-page keyline, and subdued disabled content.
 * The keyline resolves to action-border-trigger: the legacy keyline hex is link
 * blue (#406eb5), and an action.border.trigger row sits in the deck's Pagination
 * band. See docs/component-semantic-rollout.md for migration decisions and gaps.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-pagination',
  prefix: '--cdr-pagination',
  interaction: 'action',
  defaults: {},
  variants: {
    default: {
      identity: 'neutral',
      rest: {
        text: 'neutral',
        icon: 'neutral',
        border: { fullPath: 'action-border-trigger' },
      },
      hover: {
        surface: 'neutral-faint',
      },
      'focus-visible': {
        surface: 'neutral-faint',
      },
      active: {
        surface: 'neutral-faint',
      },
      disabled: {
        text: 'neutral-faint',
        icon: 'neutral-faint',
      },
    },
  },
  legacy: {
    'default/text': 'cdr-color-text-primary',
    'default/text-disabled': 'cdr-color-text-disabled',
    'default/fill': 'cdr-color-text-primary',
    'default/fill-disabled': 'cdr-color-text-disabled',
    'default/background-hover': 'cdr-color-background-pagination-hover',
    'default/background-focus-visible': 'cdr-color-background-pagination-hover',
    'default/background-active': 'cdr-color-background-pagination-hover',
    'default/border': 'cdr-color-background-pagination-keyline',
  },
};

export default contract;
