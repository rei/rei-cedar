import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { literal, token } from '../../../build/component-tokens/types';

/**
 * CdrFulfillmentTileIcon Token Contract (Feedback, cutover)
 *
 * Status icons for fulfillment options. Following the CdrBanner precedent, the
 * fills reuse approved Feedback border values via fullPath: the palette has no
 * matching icon tokens for these hues (only feedback-icon-error exists).
 * Documented overrides keep their names (no hooks are generated).
 *
 * Cutover mode: no `legacy` section.
 *
 * Palette gaps: info (dRGB 32), warning (dRGB 78) and error (dRGB 39) shift
 * visibly; default (dRGB 9) and success (dRGB 6) are close. The tile surface
 * itself renders through CdrSurfaceSelection (unmigrated) and is not mapped.
 *
 * To regenerate the SCSS maps from this contract:
 *   npx tsx build/generate-component-maps.ts
 */
const contract: ComponentTokenContract = {
  component: 'cdr-fulfillment-tile-icon',
  prefix: '--cdr-fulfillment-tile-icon',
  interaction: 'feedback',

  defaults: {
    size: literal('2.2rem'),
    'icon-max-size': literal('2rem'),
    'icon-margin': token('cdr-space-quarter-x'),
    radius: literal('var(--cdr-radius-round)'),
  },

  variants: {
    default: {
      identity: 'neutral',
      rest: {
        surface: { fullPath: 'surface-natural' },
        icon: { fullPath: 'feedback-border-natural' },
      },
    },
    info: {
      identity: 'info',
      rest: { icon: { fullPath: 'feedback-border-info' } },
    },
    warning: {
      identity: 'warning',
      rest: { icon: { fullPath: 'feedback-border-warning' } },
    },
    success: {
      identity: 'success',
      rest: { icon: { fullPath: 'feedback-border-success' } },
    },
    error: {
      identity: 'error',
      rest: { icon: { fullPath: 'feedback-icon-error' } },
    },
  },
};

export default contract;
