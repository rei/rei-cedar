import type { ComponentTokenContract } from '../../../build/component-tokens/types';

/** Navigation uses trigger; neutral links retain their quiet identity. Surface and disabled slots are intentionally absent.
 * See docs/component-semantic-rollout.md for migration decisions and design gaps.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-link',
  prefix: '--cdr-link',
  interaction: 'action',
  defaults: {},
  variants: {
    standard: {
      identity: 'trigger',
      rest: {
        text: 'trigger',
        icon: 'trigger',
      },
      hover: {
        text: 'trigger-faint',
        icon: 'trigger-faint',
      },
      'focus-visible': {
        text: 'trigger-bold',
        icon: 'trigger-bold',
      },
      active: {
        text: 'trigger-bold',
        icon: 'trigger-bold',
      },
    },
    neutral: {
      identity: 'neutral',
      rest: {
        text: 'neutral',
        icon: 'neutral',
      },
      hover: {
        text: 'neutral',
        icon: 'neutral',
      },
      'focus-visible': {
        text: 'neutral',
        icon: 'neutral',
      },
      active: {
        text: 'neutral',
        icon: 'neutral',
      },
    },
  },
  legacy: {
    'standard/text': 'cdr-color-text-link-rest',
    'standard/text-hover': 'cdr-color-text-link-hover',
    'standard/text-focus-visible': 'cdr-color-text-link-active',
    'standard/text-active': 'cdr-color-text-link-active',
    'standard/fill': 'cdr-color-text-link-rest',
    'standard/fill-hover': 'cdr-color-text-link-hover',
    'standard/fill-focus-visible': 'cdr-color-text-link-active',
    'standard/fill-active': 'cdr-color-text-link-active',
    'neutral/text': 'cdr-color-text-primary',
    'neutral/text-hover': 'cdr-color-text-primary',
    'neutral/text-focus-visible': 'cdr-color-text-primary',
    'neutral/text-active': 'cdr-color-text-primary',
    'neutral/fill': 'cdr-color-text-primary',
    'neutral/fill-hover': 'cdr-color-text-primary',
    'neutral/fill-focus-visible': 'cdr-color-text-primary',
    'neutral/fill-active': 'cdr-color-text-primary',
  },
};

export default contract;
