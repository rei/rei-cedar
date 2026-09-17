import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { semantic, literal, token } from '../../../build/component-tokens/types';

/**
 * Status identity is expressed independently by the message surface, accent border, icon tile, and icon.
 * Semantic paths are migration proposals; legacy fallbacks preserve current rendering.
 * See docs/component-semantic-rollout.md for the mapping and review policy.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-toast',
  prefix: '--cdr-toast',
  interaction: 'feedback',
  defaults: {
    'icon-halo': literal('white'),
    'close-icon': semantic('action-icon-neutral-bold', token('cdr-color-text-emphasis')),
    'default-icon-tile': semantic(
      'feedback-surface-neutral-bold',
      token('cdr-color-background-message-default-02'),
    ),
    'default-icon': semantic('feedback-icon-neutral', token('cdr-color-icon-message-default')),
    'default-border': semantic(
      'feedback-border-neutral',
      token('cdr-color-border-message-default-01'),
    ),
    'info-icon-tile': semantic(
      'feedback-surface-info-bold',
      token('cdr-color-background-message-info-02'),
    ),
    'info-icon': semantic('feedback-icon-info', token('cdr-color-icon-message-info')),
    'info-border': semantic('feedback-border-info', token('cdr-color-border-message-info-01')),
    'warning-icon-tile': semantic(
      'feedback-surface-warning-bold',
      token('cdr-color-background-message-warning-02'),
    ),
    'warning-icon': semantic('feedback-icon-warning', token('cdr-color-icon-message-warning')),
    'warning-border': semantic(
      'feedback-border-warning',
      token('cdr-color-border-message-warning-01'),
    ),
    'success-icon-tile': semantic(
      'feedback-surface-success-bold',
      token('cdr-color-background-message-success-02'),
    ),
    'success-icon': semantic('feedback-icon-success', token('cdr-color-icon-message-success')),
    'success-border': semantic(
      'feedback-border-success',
      token('cdr-color-border-message-success-01'),
    ),
    'error-icon-tile': semantic(
      'feedback-surface-error-bold',
      token('cdr-color-background-message-error-02'),
    ),
    'error-icon': semantic('feedback-icon-error', token('cdr-color-icon-message-error')),
    'error-border': semantic('feedback-border-error', token('cdr-color-border-message-error-01')),
    'default-surface': semantic(
      'feedback-surface-neutral',
      token('cdr-color-background-message-default-01'),
    ),
    'default-outline': semantic(
      'feedback-border-neutral-faint',
      token('cdr-color-border-message-default-02'),
    ),
    'info-surface': semantic(
      'feedback-surface-info',
      token('cdr-color-background-message-info-01'),
    ),
    'info-outline': semantic(
      'feedback-border-info-faint',
      token('cdr-color-border-message-info-02'),
    ),
    'success-surface': semantic(
      'feedback-surface-success',
      token('cdr-color-background-message-success-01'),
    ),
    'success-outline': semantic(
      'feedback-border-success-faint',
      token('cdr-color-border-message-success-02'),
    ),
    'warning-surface': semantic(
      'feedback-surface-warning',
      token('cdr-color-background-message-warning-01'),
    ),
    'warning-outline': semantic(
      'feedback-border-warning-faint',
      token('cdr-color-border-message-warning-02'),
    ),
    'error-surface': semantic(
      'feedback-surface-error',
      token('cdr-color-background-message-error-01'),
    ),
    'error-outline': semantic(
      'feedback-border-error-faint',
      token('cdr-color-border-message-error-02'),
    ),
  },
  variants: {},
};

export default contract;
