import type { ComponentTokenContract } from '../../../build/component-tokens/types';

/**
 * CdrCard Token Contract
 *
 * Declares the styling dependencies for the card component using the
 * confirmed Cedar semantic taxonomy (see docs/cedar-semantic-taxonomy.md).
 *
 * - interaction: OMITTED. Card surfaces are primitive canvas colors
 *   (`background-primary`, `text-primary`) with no interaction-family meaning
 *   — this is the omission-is-universal case, so generated names carry no
 *   family segment unless a slot explicitly escapes into one (see `link`).
 *   No recipe: card consumes the SCSS maps directly, following
 *   CdrBanner/CdrLink.
 * - variants: `default` (canvas surface + primary text) and `link` (the
 *   stretched link overlay; identity `trigger`). Card has no color variants
 *   and no interactive color states — hover/active change only elevation and
 *   lift; every state repeats rest except the link overlay hover.
 * - GAP (flagged for design, see docs/action-semantic-implementation.md):
 *   the deck defines no universal `surface-primary` / `text-primary` — only
 *   `surface/text.neutral` and family-specific tokens. Both are mapped here
 *   prospectively via fullPath so the pipeline knows they are missing.
 *   Mapping to `surface/text.neutral` instead was rejected: canvas-primary
 *   and neutral-tint are different meanings with different legacy values.
 * - border/icon slots are unconsumed (elevation comes from box-shadow, no
 *   fill is set) and carry bare universal values — inert, NOT a requirement.
 * - legacy: temporary bridge to current @rei/cdr-tokens Sass variable names.
 *
 * Migration Guide: See docs/button-semantic-migration-guide.md for the pattern.
 *
 * To regenerate the SCSS maps from this contract:
 *   pnpm build:maps
 */

const contract: ComponentTokenContract = {
  component: 'cdr-card',
  prefix: '--cdr-card',
  // No interaction: foundation-only canvas colors (see above).

  defaults: {},

  // ══════════════════════════════════════════════════════════════════════════
  // COLOR VARIANTS — role × state → semantic token suffix
  // ══════════════════════════════════════════════════════════════════════════

  variants: {
    default: {
      identity: 'neutral',
      rest: {
        surface: { fullPath: 'surface-primary' },
        text: { fullPath: 'text-primary' },
        border: 'neutral',
        icon: 'neutral',
      },
      hover: {
        surface: { fullPath: 'surface-primary' },
        text: { fullPath: 'text-primary' },
        border: 'neutral',
        icon: 'neutral',
      },
      'focus-visible': {
        surface: { fullPath: 'surface-primary' },
        text: { fullPath: 'text-primary' },
        border: 'neutral',
        icon: 'neutral',
      },
      active: {
        surface: { fullPath: 'surface-primary' },
        text: { fullPath: 'text-primary' },
        border: 'neutral',
        icon: 'neutral',
      },
      disabled: {
        surface: { fullPath: 'surface-primary' },
        text: { fullPath: 'text-primary' },
        border: 'neutral',
        icon: 'neutral',
      },
    },

    link: {
      identity: 'trigger',
      rest: {
        surface: { fullPath: 'surface-primary' },
        text: { fullPath: 'text-primary' },
        border: 'neutral',
        icon: 'neutral',
      },
      hover: {
        surface: { fullPath: 'surface-primary' },
        text: { fullPath: 'action-text-trigger' },
        border: 'neutral',
        icon: 'neutral',
      },
      'focus-visible': {
        surface: { fullPath: 'surface-primary' },
        text: { fullPath: 'action-text-trigger' },
        border: 'neutral',
        icon: 'neutral',
      },
      active: {
        surface: { fullPath: 'surface-primary' },
        text: { fullPath: 'action-text-trigger' },
        border: 'neutral',
        icon: 'neutral',
      },
      disabled: {
        surface: { fullPath: 'surface-primary' },
        text: { fullPath: 'text-primary' },
        border: 'neutral',
        icon: 'neutral',
      },
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // LEGACY FALLBACK MAP — TEMPORARY
  // Delete this entire section when semantic tokens ship in @rei/cdr-tokens.
  // ══════════════════════════════════════════════════════════════════════════

  legacy: {
    'default/background': 'cdr-color-background-primary',
    'default/text': 'cdr-color-text-primary',
    'link/text': 'cdr-color-text-primary',
    'link/text-hover': 'cdr-color-text-link-hover',
    'link/text-focus-visible': 'cdr-color-text-link-hover',
    'link/text-active': 'cdr-color-text-link-hover',
  },
};

export default contract;
