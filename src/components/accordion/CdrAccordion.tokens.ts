import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { literal, token } from '../../../build/component-tokens/types';

/**
 * CdrAccordion color scopes correspond to its frame, interactive header,
 * and text-bearing content panel.
 */
const contract: ComponentTokenContract = {
  component: 'cdr-accordion',
  prefix: '--cdr-accordion',
  interaction: 'control',

  defaults: {
    'container-position': literal('relative'),
    'container-list-style': literal('none'),
    'container-border-width': literal('1px'),
    'container-border-style': literal('solid'),
    'button-border': literal('none'),
    'button-cursor': literal('pointer'),
    'button-display': literal('flex'),
    'button-justify-content': literal('space-between'),
    'button-position': literal('relative'),
    'button-padding': token('cdr-space-inset-one-x'),
    'header-surface': literal('transparent'),
    'button-text-align': literal('left'),
    'button-width': literal('100%'),
    'label-margin-bottom': literal('0'),
    'header-margin': literal('0'),
    'header-padding': literal('0'),
    'header-font-weight': literal('unset'),
    'header-font-style': literal('unset'),
    'header-font-size': literal('unset'),
    'unwrapped-header-margin': token('cdr-space-one-x'),
    'icon-margin-left': token('cdr-space-one-x'),
    'icon-transition-duration': token('cdr-duration-3-x'),
    'icon-transition-timing': token('cdr-timing-function-ease-out'),
    'content-container-overflow': literal('hidden'),
    'content-container-transition-duration': token('cdr-duration-3-x'),
    'content-container-transition-property': literal('max-height'),
    'content-container-transition-timing': literal('cubic-bezier(0.15, 0, 0.15, 1)'),
    'content-padding-top': token('cdr-space-half-x'),
    'content-padding-inline': token('cdr-space-one-x'),
    'content-padding-bottom': token('cdr-space-one-x'),
    'content-fade-duration': token('cdr-duration-1-x'),
    'content-fade-timing': literal('linear'),
    'content-opacity': literal('0'),
    'content-surface': literal('transparent'),
    'compact-button-padding': token('cdr-space-inset-three-quarter-x'),
    'compact-content-padding-top': token('cdr-space-quarter-x'),
    'compact-content-padding-inline': token('cdr-space-three-quarter-x'),
    'compact-content-padding-bottom': token('cdr-space-three-quarter-x'),
    'border-aligned-margin-inline': token('cdr-space-inset-one-x'),
    'border-aligned-button-offset': token('cdr-space-one-x'),
    'compact-border-aligned-button-offset': token('cdr-space-three-quarter-x'),
  },

  variants: {
    frame: {
      identity: 'neutral',
      rest: { border: 'neutral-faint' },
    },
    header: {
      identity: 'neutral',
      rest: { text: 'neutral-prominent', icon: 'neutral-prominent' },
      hover: {
        surface: 'neutral-faint',
        text: 'neutral-prominent',
        icon: 'neutral-prominent',
      },
      'focus-visible': {
        surface: 'neutral-faint',
        text: 'neutral-prominent',
        icon: 'neutral-prominent',
      },
      active: {
        surface: 'neutral-faint',
        text: 'neutral-prominent',
        icon: 'neutral-prominent',
      },
    },
    content: {
      identity: 'neutral',
      // User-confirmed: the content text uses the Control palette too.
      rest: { text: 'neutral-prominent' },
    },
  },
};

export default contract;
