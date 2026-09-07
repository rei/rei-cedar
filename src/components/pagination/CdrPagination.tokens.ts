import type { ComponentTokenContract } from '../../../build/component-tokens/types';

/**
 * CdrPagination Token Contract
 *
 * Declares the styling dependencies for the pagination component using the
 * confirmed Cedar semantic taxonomy (see docs/cedar-semantic-taxonomy.md):
 *
 *   Foundation → Interaction Family → Role → Identity → Expression
 *   color        action              surface  neutral    faint
 *
 * - interaction: CdrPagination is wholly the 'action' interaction family
 *   (navigation between pages). No recipe: pagination consumes the SCSS maps
 *   directly, following CdrBanner/CdrLink.
 * - variants: a single `default` — pagination has no color variants. Page
 *   links, prev/next carets, and the current-page keyline all share it.
 * - states: rest/hover/focus-visible/active carry the legacy mappings;
 *   disabled repeats rest slots with the disabled legacy text tokens. Rest
 *   and disabled surfaces are unconsumed (the link background is transparent
 *   outside hover/focus/active) and intentionally bare.
 * - roles: text → link text, icon → link fill (independent values, text
 *   namespace — same generator behavior as CdrButton), surface → hover wash,
 *   border → current-page keyline.
 * - legacy: temporary bridge to current @rei/cdr-tokens Sass variable names.
 *
 * Migration Guide: See docs/button-semantic-migration-guide.md for the pattern.
 *
 * To regenerate the SCSS maps from this contract:
 *   pnpm build:maps
 */

const contract: ComponentTokenContract = {
  component: 'cdr-pagination',
  prefix: '--cdr-pagination',
  interaction: 'action',

  defaults: {},

  // ══════════════════════════════════════════════════════════════════════════
  // COLOR VARIANTS — role × state → semantic token suffix
  // ══════════════════════════════════════════════════════════════════════════

  variants: {
    default: {
      identity: 'neutral',
      rest: {
        surface: 'neutral-faint',
        text: 'neutral',
        border: 'neutral',
        icon: 'neutral',
      },
      hover: {
        surface: 'neutral-faint',
        text: 'neutral',
        border: 'neutral',
        icon: 'neutral',
      },
      'focus-visible': {
        surface: 'neutral-faint',
        text: 'neutral',
        border: 'neutral',
        icon: 'neutral',
      },
      active: {
        surface: 'neutral-faint',
        text: 'neutral',
        border: 'neutral',
        icon: 'neutral',
      },
      disabled: {
        surface: 'neutral-faint',
        text: 'neutral',
        border: 'neutral',
        icon: 'neutral',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // LEGACY FALLBACK MAP — TEMPORARY
  // Delete this entire section when semantic tokens ship in @rei/cdr-tokens.
  //
  // Rest/disabled surfaces and the disabled border are unconsumed (transparent
  // backgrounds) and intentionally bare.
  // ══════════════════════════════════════════════════════════════════════════

  legacy: {
    'default/text': 'cdr-color-text-primary',
    'default/text-hover': 'cdr-color-text-primary',
    'default/text-focus-visible': 'cdr-color-text-primary',
    'default/text-active': 'cdr-color-text-primary',
    'default/text-disabled': 'cdr-color-text-disabled',
    'default/fill': 'cdr-color-text-primary',
    'default/fill-hover': 'cdr-color-text-primary',
    'default/fill-focus-visible': 'cdr-color-text-primary',
    'default/fill-active': 'cdr-color-text-primary',
    'default/fill-disabled': 'cdr-color-text-disabled',
    'default/background-hover': 'cdr-color-background-pagination-hover',
    'default/background-focus-visible': 'cdr-color-background-pagination-hover',
    'default/background-active': 'cdr-color-background-pagination-hover',
    'default/border': 'cdr-color-background-pagination-keyline',
    'default/border-hover': 'cdr-color-background-pagination-keyline',
    'default/border-focus-visible': 'cdr-color-background-pagination-keyline',
    'default/border-active': 'cdr-color-background-pagination-keyline',
  },
};

export default contract;
