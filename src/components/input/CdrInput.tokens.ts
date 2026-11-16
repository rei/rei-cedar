import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { literal, token } from '../../../build/component-tokens/types';

/**
 * CdrInput Token Contract (Control, cutover)
 *
 * Text entry that configures form input in place. Documented overrides keep
 * their names (`--cdr-input-*`), so the generated map is a fallback lookup:
 * every color the module applies resolves through these scopes.
 *
 *   default     → field text, surface, border, icon; focus and disabled states
 *   secondary   → white translucent-on-card variant (`--cdr-input--secondary`)
 *   error       → Feedback intent error surface and border (`--cdr-input--error`)
 *   placeholder → placeholder text, rest and disabled
 *   helper      → helper text under the field
 *   label       → adjacent label buttons (`:global(.cdr-input__button)`)
 *
 * Palette gaps, using the CdrCheckbox treatment of the same legacy values:
 * field text and focus border (#2e2e2b) render darker as control neutral-bold
 * (#171613) and neutral-intense (#171613) (dRGB 41); the label/focused icon
 * fill (#4b4a48) reads as control icon neutral-intense (#4C473E) (dRGB 11);
 * the translucent primary and secondary surfaces flatten to the approved
 * opaque faint (#FCFCFB) and trace (#FFFFFF) surfaces.
 *
 * Cutover mode: no `legacy` section; no hooks are generated (documented
 * overrides are preserved by the module).
 *
 * To regenerate the SCSS maps from this contract:
 *   npx tsx build/generate-component-maps.ts
 */
const contract: ComponentTokenContract = {
  component: 'cdr-input',
  prefix: '--cdr-input',
  interaction: 'control',
  defaultVariant: 'default',

  defaults: {
    radius: token('cdr-radius-softer'),
    padding: token('cdr-space-inset-half-x'),
    // cdr-form-input-height-default (component token, outside the foundation scan)
    height: literal('4rem'),
    'large-height': literal('4.8rem'),
    'icon-offset': token('cdr-space-half-x'),
    'helper-margin-top': token('cdr-space-quarter-x'),
  },

  variants: {
    default: {
      identity: 'neutral',
      rest: {
        surface: 'neutral-faint',
        text: 'neutral-bold',
        border: 'neutral',
        icon: 'neutral-prominent',
      },
      'focus-visible': {
        surface: 'neutral-faint',
        border: 'neutral-intense',
        icon: 'neutral-intense',
      },
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
    placeholder: {
      identity: 'neutral',
      rest: { text: 'neutral' },
      disabled: { text: 'neutral-faint' },
    },
    helper: {
      identity: 'neutral',
      rest: { text: 'neutral' },
    },
    label: {
      identity: 'neutral',
      rest: { border: 'neutral' },
    },
  },
};

export default contract;
