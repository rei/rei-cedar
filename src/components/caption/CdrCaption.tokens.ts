import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { literal, token } from '../../../build/component-tokens/types';

/**
 * CdrCaption Token Contract (Universal, cutover)
 *
 * Static text component: no interaction family and no interaction states. Its
 * two color-bearing parts are separate scopes:
 *   summary (default scope) → --cdr-color-caption-text
 *   cite                    → --cdr-color-caption-cite-text
 *
 * These hooks replace the retired --cdr-caption-summary-color and
 * --cdr-caption-cite-color overrides. Regenerate with:
 *   npx tsx build/generate-component-maps.ts
 */

const contract: ComponentTokenContract = {
  component: 'cdr-caption',
  prefix: '--cdr-caption',
  hooks: true,
  defaultVariant: 'summary',

  defaults: {
    'max-width': literal('530px'),
    'line-height': literal('1'),
    'padding-block': token('cdr-space-half-x'),
    'padding-inline': literal('0'),

    'summary-font-family': token('cdr-font-family-sans'),
    'summary-font-size': literal('1.4rem'),
    'summary-font-weight': literal('400'),
    'summary-letter-spacing': literal('0.08px'),
    'summary-line-height': literal('2.2rem'),
    'summary-margin': literal('0'),
    'summary-cite-margin-top': token('cdr-space-half-x'),

    'cite-font-family': token('cdr-font-family-sans'),
    'cite-font-size': literal('1.2rem'),
    'cite-font-weight': literal('400'),
    'cite-letter-spacing': literal('0.16px'),
    'cite-line-height': literal('1.8rem'),
    'cite-font-style': literal('normal'),
  },

  variants: {
    summary: {
      identity: 'neutral',
      rest: { text: 'neutral-prominent' },
    },
    cite: {
      identity: 'neutral',
      rest: { text: 'neutral' },
    },
  },
};

export default contract;
