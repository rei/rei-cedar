import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { literal, token } from '../../../build/component-tokens/types';

/**
 * CdrSelect Token Contract (Control, cutover)
 *
 * Chooses one option in place. Documented overrides keep their names
 * (`--cdr-select-*`), so the generated map is a fallback lookup: every color
 * the module applies resolves through these scopes.
 *
 *   default   → field text, surface, border; focus and disabled states
 *   secondary → white translucent-on-card variant (`--cdr-select--secondary`)
 *   error     → Feedback intent error surface and border (`--cdr-select--error`)
 *   prompt    → the placeholder option text
 *   caret     → the dropdown caret icon, rest and disabled
 *
 * Palette gaps use the CdrCheckbox/CdrInput treatment of the same legacy
 * values: field text and focus border (#2e2e2b) render darker as control
 * neutral-bold (#171613) and neutral-intense (#171613) (dRGB 41); the prompt
 * text (#4b4a48) reads as control neutral-prominent (#4C473E) (dRGB 11); the
 * translucent surfaces flatten to the approved opaque faint (#FCFCFB) and
 * trace (#FFFFFF) surfaces.
 *
 * Cutover mode: no `legacy` section; no hooks are generated (documented
 * overrides are preserved by the module).
 *
 * To regenerate the SCSS maps from this contract:
 *   npx tsx build/generate-component-maps.ts
 */
const contract: ComponentTokenContract = {
  component: 'cdr-select',
  prefix: '--cdr-select',
  interaction: 'control',
  defaultVariant: 'default',

  defaults: {
    radius: token('cdr-radius-softer'),
    // cdr-form-input-height-default (component token, outside the foundation scan)
    height: literal('4rem'),
    'large-height': literal('4.8rem'),
    'padding-left': token('cdr-space-half-x'),
    'padding-right': token('cdr-space-two-x'),
    'icon-offset': token('cdr-space-half-x'),
    'multiple-padding': token('cdr-space-half-x'),
  },

  variants: {
    default: {
      identity: 'neutral',
      rest: { surface: 'neutral-faint', text: 'neutral-bold', border: 'neutral' },
      'focus-visible': { surface: 'neutral-faint', border: 'neutral-intense' },
      disabled: { surface: 'neutral-faint', text: 'neutral-faint', border: 'neutral-faint' },
    },
    secondary: {
      identity: 'neutral',
      rest: { surface: 'neutral-trace' },
      'focus-visible': { surface: 'neutral-trace' },
    },
    error: {
      identity: 'error',
      rest: {
        surface: { fullPath: 'feedback-surface-error-trace' },
        border: { fullPath: 'feedback-border-error' },
      },
    },
    prompt: {
      identity: 'neutral',
      rest: { text: 'neutral-prominent' },
      disabled: { text: 'neutral-faint' },
    },
    caret: {
      identity: 'neutral',
      rest: { icon: 'neutral-intense' },
      disabled: { icon: 'neutral' },
    },
  },
};

export default contract;
