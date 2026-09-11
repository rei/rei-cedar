import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { token, literal, semantic } from '../../../build/component-tokens/types';

/** Static feedback: message, outline, accent, and icon tile have independent slots.
 * See docs/component-semantic-rollout.md for migration decisions and design gaps.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-banner',
  prefix: '--cdr-banner',
  interaction: 'feedback',
  defaults: {
    'message-body-background': semantic(
      'surface-neutral-trace',
      token('cdr-color-background-primary'),
    ),
    'icon-right-fill': semantic('action-icon-neutral-bold', token('cdr-color-text-emphasis')),
    'info-action-fill': semantic('action-icon-trigger', token('cdr-color-text-link-rest')),
    'icon-halo': literal('white'),
  },
  variants: {
    default: {
      identity: 'neutral',
      rest: {
        surface: 'neutral',
        border: 'neutral',
        icon: 'neutral',
      },
      extras: {
        text: semantic('feedback-text-neutral-bold', literal('inherit')),
        outline: semantic(
          'feedback-border-neutral-faint',
          token('cdr-color-border-message-default-02'),
        ),
        'icon-tile-background': semantic(
          'feedback-surface-neutral-bold',
          token('cdr-color-background-message-default-02'),
        ),
      },
    },
    info: {
      identity: 'info',
      rest: {
        surface: 'info',
        border: 'info',
        icon: 'info',
      },
      extras: {
        text: semantic('feedback-text-info-bold', literal('inherit')),
        outline: semantic('feedback-border-info-faint', token('cdr-color-border-message-info-02')),
        'icon-tile-background': semantic(
          'feedback-surface-info-bold',
          token('cdr-color-background-message-info-02'),
        ),
      },
    },
    success: {
      identity: 'success',
      rest: {
        surface: 'success',
        border: 'success',
        icon: 'success',
      },
      extras: {
        text: semantic('feedback-text-success-bold', literal('inherit')),
        outline: semantic(
          'feedback-border-success-faint',
          token('cdr-color-border-message-success-02'),
        ),
        'icon-tile-background': semantic(
          'feedback-surface-success-bold',
          token('cdr-color-background-message-success-02'),
        ),
      },
    },
    warning: {
      identity: 'warning',
      rest: {
        surface: 'warning',
        border: 'warning',
        icon: 'warning',
      },
      extras: {
        text: semantic('feedback-text-warning-bold', literal('inherit')),
        outline: semantic(
          'feedback-border-warning-faint',
          token('cdr-color-border-message-warning-02'),
        ),
        'icon-tile-background': semantic(
          'feedback-surface-warning-bold',
          token('cdr-color-background-message-warning-02'),
        ),
      },
    },
    error: {
      identity: 'error',
      rest: {
        surface: 'error',
        border: 'error',
        icon: 'error',
      },
      extras: {
        text: semantic('feedback-text-error-bold', literal('inherit')),
        outline: semantic(
          'feedback-border-error-faint',
          token('cdr-color-border-message-error-02'),
        ),
        'icon-tile-background': semantic(
          'feedback-surface-error-bold',
          token('cdr-color-background-message-error-02'),
        ),
      },
    },
  },
  legacy: {
    'default/background': 'cdr-color-background-message-default-01',
    'default/border': 'cdr-color-border-message-default-01',
    'default/fill': 'cdr-color-icon-message-default',
    'info/background': 'cdr-color-background-message-info-01',
    'info/border': 'cdr-color-border-message-info-01',
    'info/fill': 'cdr-color-icon-message-info',
    'success/background': 'cdr-color-background-message-success-01',
    'success/border': 'cdr-color-border-message-success-01',
    'success/fill': 'cdr-color-icon-message-success',
    'warning/background': 'cdr-color-background-message-warning-01',
    'warning/border': 'cdr-color-border-message-warning-01',
    'warning/fill': 'cdr-color-icon-message-warning',
    'error/background': 'cdr-color-background-message-error-01',
    'error/border': 'cdr-color-border-message-error-01',
    'error/fill': 'cdr-color-icon-message-error',
  },
};

export default contract;
