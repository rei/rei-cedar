import type { ComponentTokenContract } from './types';
import { hookScope, hookVar, slotVar, mapSlug } from './naming';

export function generateElevatedColors(contract: ComponentTokenContract): string {
  const blocks: string[] = [];
  for (const [variant, value] of Object.entries(contract.variants)) {
    if (!value.rest.surface || !value.rest.text || !value.rest.border) continue;
    const scope = hookScope(variant, contract.defaultVariant);
    const entries = [
      'border',
      'border-hover',
      'border-focus-visible',
      'border-active',
      'active-inset',
    ].flatMap((key, index) => {
      const state = ['rest', 'hover', 'focus-visible', 'active', 'rest'][index] as
        | 'rest'
        | 'hover'
        | 'focus-visible'
        | 'active';
      const role = key === 'active-inset' ? key : 'border';
      const hook = hookVar(contract.component, scope, role, state, contract.hookPrefix);
      const legacy = contract.componentVariables?.elevatedHooks?.[variant]?.[key];
      const border = value[state]?.border;
      const extra = value.extras?.['active-inset'];
      const semantic =
        key === 'active-inset'
          ? extra?.kind === 'token'
            ? `tokens.$${extra.name}`
            : extra?.kind === 'literal'
              ? String(extra.value)
              : undefined
          : border
            ? `var(${slotVar(contract.interaction, 'border', border)})`
            : undefined;
      const fallback = legacy ? `var(${legacy}, ${semantic})` : semantic;
      return semantic ? [`    ${key}: var(${hook}, ${fallback}),`] : [];
    });
    blocks.push(`  ${variant}: (\n${entries.join('\n')}\n  ),`);
  }
  return `\n// Elevated border hooks share the same semantic contract.\n$${mapSlug(contract.component)}-elevated-colors: (\n${blocks.join('\n')}\n);\n`;
}
