import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { literal, token } from '../../../build/component-tokens/types';

/**
 * CdrChip Token Contract (Control, with Universal static parts)
 *
 * Chips manipulate the interface in place (toggles flip, filters narrow a
 * list), so the component is Control. The static white surface and the
 * resting/disabled outlines are plain neutral content and keep their exact
 * Universal namespace via fullPath; the selected-hover outline has no Control
 * equivalent and keeps its Action namespace via fullPath. Documented overrides
 * keep their names (no hooks are generated).
 *
 * Cutover mode: no `legacy` section.
 *
 * Note: chip groups that express a choice among alternatives read as Selection
 * (the same split the taxonomy tracks for ToggleButton/ToggleGroup). If
 * CdrChipGroup ever gets its own contract it can carry Selection while the
 * chip button stays Control. The Selection palette cannot render this
 * component today: it has no dark neutral outline (nearest is dRGB 106 away).
 *
 * To regenerate the SCSS maps from this contract:
 *   npx tsx build/generate-component-maps.ts
 */
const contract: ComponentTokenContract = {
  component: 'cdr-chip',
  prefix: '--cdr-chip',
  interaction: 'control',

  defaults: {
    'font-family': token('cdr-font-family-sans'),
    'font-size': literal('14px'),
    'font-weight': literal('400'),
    'letter-spacing': literal('-0.08px'),
    'line-height': literal('15px'),
    'border-radius': literal('30px'),
  },

  variants: {
    default: {
      identity: 'neutral',
      rest: {
        surface: { fullPath: 'surface-neutral-trace' },
        text: 'neutral-prominent',
        icon: 'neutral-intense',
        border: { fullPath: 'border-neutral-prominent' },
      },
      hover: { surface: 'neutral-subtle', border: 'neutral' },
      'focus-visible': { surface: { fullPath: 'surface-neutral-trace' }, border: 'neutral-bold' },
      active: { surface: 'neutral', border: 'neutral-bold' },
      disabled: {
        surface: { fullPath: 'surface-neutral-trace' },
        border: { fullPath: 'border-neutral' },
        text: 'neutral-faint',
      },
    },
    selected: {
      identity: 'neutral',
      rest: { surface: 'natural-bold', border: 'neutral-bold' },
      hover: { surface: 'neutral', border: { fullPath: 'action-border-neutral-prominent' } },
      'focus-visible': { surface: 'natural-bold', border: 'neutral-bold' },
      active: { surface: 'neutral', border: 'neutral-bold' },
    },
  },
};

export default contract;
