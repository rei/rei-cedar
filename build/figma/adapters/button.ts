import contract from '../../../src/components/button/CdrButton.tokens';
import type { ColorRole, InteractionState } from '../../component-tokens/types';
import type { BindingTarget, CompareMode, FigmaComponentAdapter } from '../types';

function slot(
  variant: string,
  state: InteractionState,
  role: ColorRole,
  compare: CompareMode = 'alias',
): BindingTarget {
  return { target: { kind: 'slot', variant, state, role }, compare };
}

function extra(variant: string, name: string): BindingTarget {
  return { target: { kind: 'extra', variant, extra: name }, compare: 'alias' };
}

/**
 * Figma ↔ CdrButton adapter for the `color` variable collection in CDR
 * Components (`dGjTo4tpmVlSZQPWPnCLy0`).
 *
 * Each binding maps one Figma component variable to one or more Cedar contract
 * slots. `compare: 'value'` is used where Figma deliberately references a
 * different element role that resolves to the same color (for example a text
 * variable backing an icon slot).
 *
 * Variables in `legacy` are intentionally not represented in CdrButton. They
 * are checked for stale entries but do not fail the sync.
 */
const buttonAdapter: FigmaComponentAdapter = {
  id: 'button',
  component: 'cdr-button',
  source: {
    fileKey: 'dGjTo4tpmVlSZQPWPnCLy0',
    collectionId: 'VariableCollectionId:6508:5655',
    name: 'CDR Components color / web-light',
  },
  libraryFileKeys: ['7Cuo6NPfzPwNfGoht4WkFp'],
  variablePrefix: 'button/',
  contract,

  bindings: [
    // Primary — approved 2026-10-02.
    {
      figma: 'button/primary/surface',
      targets: [slot('primary', 'rest', 'surface'), slot('primary', 'active', 'surface')],
    },
    {
      figma: 'button/primary/text',
      targets: [
        slot('primary', 'rest', 'text'),
        slot('primary', 'rest', 'icon', 'value'),
        slot('primary', 'active', 'text'),
        slot('primary', 'active', 'icon', 'value'),
      ],
    },
    {
      figma: 'button/primary/border',
      targets: [
        slot('primary', 'rest', 'border'),
        slot('primary', 'hover', 'border'),
        slot('primary', 'focus-visible', 'border'),
        slot('primary', 'active', 'border'),
      ],
    },
    {
      figma: 'button/primary/surface-hover',
      targets: [slot('primary', 'hover', 'surface'), slot('primary', 'focus-visible', 'surface')],
    },
    {
      figma: 'button/primary/text-hover',
      targets: [
        slot('primary', 'hover', 'text'),
        slot('primary', 'hover', 'icon'),
        slot('primary', 'focus-visible', 'text'),
        slot('primary', 'focus-visible', 'icon'),
      ],
    },
    {
      figma: 'button/primary/surface-disabled',
      targets: [slot('primary', 'disabled', 'surface')],
    },
    {
      figma: 'button/primary/text-disabled',
      targets: [slot('primary', 'disabled', 'text'), slot('primary', 'disabled', 'icon', 'value')],
    },
    {
      figma: 'button/primary/border-disabled',
      targets: [slot('primary', 'disabled', 'border')],
    },
    {
      figma: 'button/primary/surround-surface-active',
      targets: [extra('primary', 'active-inset')],
    },

    // Secondary — reviewed 2026-10-06.
    {
      figma: 'button/secondary/surface',
      targets: [slot('secondary', 'rest', 'surface')],
    },
    {
      figma: 'button/secondary/text',
      targets: [slot('secondary', 'rest', 'text')],
    },
    {
      figma: 'button/secondary/border',
      targets: [slot('secondary', 'rest', 'border'), slot('secondary', 'active', 'border')],
    },
    {
      figma: 'button/secondary/surface-active',
      targets: [slot('secondary', 'active', 'surface')],
    },
    {
      figma: 'button/secondary/surface-disabled',
      targets: [slot('secondary', 'disabled', 'surface')],
    },
    {
      figma: 'button/secondary/surround-surface-active',
      targets: [extra('secondary', 'active-inset')],
    },
    {
      figma: 'button/secondary/text-active',
      targets: [slot('secondary', 'active', 'text'), slot('secondary', 'active', 'icon', 'value')],
    },
    {
      figma: 'button/secondary/text-disabled',
      // No Figma icon variable exists for this state. Cedar uses the approved
      // action/icon/neutral-subtle role, whose value intentionally differs from
      // the disabled text role, so only the text slot is compared here.
      targets: [slot('secondary', 'disabled', 'text')],
    },
    {
      figma: 'button/secondary/border-disabled',
      targets: [slot('secondary', 'disabled', 'border')],
    },

    // Dark — DRAFT in Figma, mapped from the reference specs.
    {
      figma: 'button/dark/surface',
      targets: [slot('dark', 'rest', 'surface'), slot('dark', 'active', 'surface')],
    },
    {
      figma: 'button/dark/surface-hover',
      targets: [slot('dark', 'hover', 'surface'), slot('dark', 'focus-visible', 'surface')],
    },
    {
      figma: 'button/dark/surface-disabled',
      targets: [slot('dark', 'disabled', 'surface')],
    },
    {
      figma: 'button/dark/text',
      targets: [
        slot('dark', 'rest', 'text'),
        slot('dark', 'rest', 'icon', 'value'),
        slot('dark', 'active', 'text'),
        slot('dark', 'active', 'icon', 'value'),
      ],
    },
    {
      figma: 'button/dark/text-hover',
      targets: [
        slot('dark', 'hover', 'text'),
        slot('dark', 'hover', 'icon', 'value'),
        slot('dark', 'focus-visible', 'text'),
        slot('dark', 'focus-visible', 'icon', 'value'),
      ],
    },
    {
      figma: 'button/dark/text-disabled',
      targets: [slot('dark', 'disabled', 'text'), slot('dark', 'disabled', 'icon', 'value')],
    },
    {
      figma: 'button/dark/border',
      targets: [
        slot('dark', 'rest', 'border'),
        slot('dark', 'hover', 'border'),
        slot('dark', 'focus-visible', 'border'),
        slot('dark', 'active', 'border'),
      ],
    },
    {
      figma: 'button/dark/border-disabled',
      targets: [slot('dark', 'disabled', 'border')],
    },
    {
      figma: 'button/dark/border-active-inset',
      targets: [extra('dark', 'active-inset')],
    },

    // Sale — mapped from the reference specs.
    {
      figma: 'button/sale/surface',
      targets: [slot('sale', 'rest', 'surface'), slot('sale', 'active', 'surface')],
    },
    {
      figma: 'button/sale/surface-hover',
      targets: [slot('sale', 'hover', 'surface'), slot('sale', 'focus-visible', 'surface')],
    },
    {
      figma: 'button/sale/surface-disabled',
      targets: [slot('sale', 'disabled', 'surface')],
    },
    {
      figma: 'button/sale/text',
      targets: [
        slot('sale', 'rest', 'text'),
        slot('sale', 'rest', 'icon', 'value'),
        slot('sale', 'active', 'text'),
        slot('sale', 'active', 'icon', 'value'),
        slot('sale', 'disabled', 'text'),
        slot('sale', 'disabled', 'icon', 'value'),
      ],
    },
    {
      figma: 'button/sale/text-hover',
      targets: [
        slot('sale', 'hover', 'text'),
        slot('sale', 'hover', 'icon', 'value'),
        slot('sale', 'focus-visible', 'text'),
        slot('sale', 'focus-visible', 'icon', 'value'),
      ],
    },
    {
      figma: 'button/sale/border',
      targets: [
        slot('sale', 'rest', 'border'),
        slot('sale', 'hover', 'border'),
        slot('sale', 'focus-visible', 'border'),
        slot('sale', 'active', 'border'),
      ],
    },
    {
      figma: 'button/sale/border-disabled',
      targets: [slot('sale', 'disabled', 'border')],
    },
    {
      figma: 'button/sale/border-active-inset',
      targets: [extra('sale', 'active-inset')],
    },
  ],

  legacy: [
    {
      figma: 'button/default/border-disabled',
      reason: 'legacy default scope is not rendered by CdrButton',
    },
    {
      figma: 'button/default/surface-disabled',
      reason: 'legacy default scope is not rendered by CdrButton',
    },
    {
      figma: 'button/icon-only/border-active',
      reason:
        'primitive warm-grey/600 alias; CdrButton icon-only active uses action/border/neutral and has no approved semantic equivalent for this value',
    },
    {
      figma: 'button/icon-only/surface-active',
      reason: 'CdrButton icon-only has no active surface; pending design decision',
    },
    {
      figma: 'button/primary/surface-icon-alt-hover',
      reason:
        'legacy alternate icon background; current primary hover icon uses action/text/brand via fullPath',
    },
    {
      figma: 'button/sale/surround-surface-active',
      reason:
        'DRAFT duplicate of sale border-active-inset; active-inset continues to use action/surface/neutral-trace pending design confirmation',
    },
  ],
};

export default buttonAdapter;
