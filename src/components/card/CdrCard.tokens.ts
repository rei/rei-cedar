import type { ComponentTokenContract } from '../../../build/component-tokens/types';

/** Foundation canvas plus an action-text link overlay. Only consumed roles and states are declared.
 * Canvas uses the action-family trace surface and bold neutral text per the team's
 * Figma answers (an action.surface.neutral.trace row sits in the Card band; the
 * container rule in docs/component-semantic-rollout.md records this exception).
 * See docs/component-semantic-rollout.md for migration decisions and design gaps.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-card',
  prefix: '--cdr-card',
  defaults: {},
  variants: {
    default: {
      identity: 'neutral',
      rest: {
        surface: { fullPath: 'action-surface-neutral-trace' },
        text: { fullPath: 'action-text-neutral-bold' },
      },
    },
    link: {
      // Rest text matches the canvas; only the hover state becomes a trigger action.
      identity: 'neutral',
      rest: {
        text: { fullPath: 'action-text-neutral-bold' },
      },
      hover: {
        text: {
          fullPath: 'action-text-trigger',
        },
      },
    },
  },
  legacy: {
    'default/background': 'cdr-color-background-primary',
    'default/text': 'cdr-color-text-primary',
    'link/text': 'cdr-color-text-primary',
    'link/text-hover': 'cdr-color-text-link-hover',
  },
};

export default contract;
