import type { ComponentTokenContract } from './types';
import { hookScope, hookVar, slotVar } from './naming';

// Compatibility names only. Semantic values continue to come from the contract.
export function buttonLegacyHooks(contract: ComponentTokenContract): Record<string, string> {
  const hooks: Record<string, string> = {};
  const add = (variant: string, role: string, state: string, legacy: string) => {
    hooks[`${variant}/${role}${state === 'rest' ? '' : `-${state}`}`] = `--cdr-button-${legacy}`;
  };
  for (const variant of ['primary', 'secondary', 'dark', 'sale']) {
    for (const state of ['rest', 'hover', 'focus-visible', 'active', 'disabled']) {
      const suffix = state === 'hover' || state === 'focus-visible' ? 'interaction' : state;
      for (const [role, legacy] of Object.entries({
        background: `background-color-${suffix}`,
        text: state === 'rest' ? 'text-color' : `text-color-${suffix}`,
        fill: state === 'rest' ? 'fill-color' : `fill-color-${suffix}`,
        border: `box-shadow-color-${suffix}`,
      }))
        add(variant, role, state, `${variant}-${legacy}`);
    }
    add(
      variant,
      'active-inset',
      'rest',
      `${variant}-${variant === 'secondary' ? 'border' : 'box-shadow'}-color-active-inset`,
    );
  }
  const specials: Record<string, Record<string, string>> = {
    link: {
      text: 'text-color',
      fill: 'fill-color',
      'text-hover': 'text-color-hover',
      'text-focus-visible': 'text-color-active',
      'text-active': 'text-color-active',
    },
    'icon-only': {
      fill: 'icon-fill',
      'fill-hover': 'icon-fill-hover',
      'fill-focus-visible': 'icon-fill-active',
      'fill-active': 'icon-fill-active',
      'border-focus-visible': 'icon-svg-box-shadow',
      'border-active': 'icon-svg-box-shadow',
      'fill-disabled': 'disabled-icon-fill',
    },
    'with-background': {
      fill: 'icon-fill',
      background: 'background-color',
      border: 'box-shadow',
      'fill-hover': 'icon-fill-interaction',
      'fill-focus-visible': 'icon-fill-interaction',
      'background-hover': 'background-color-interaction',
      'background-focus-visible': 'background-color-interaction',
      'border-hover': 'box-shadow-interaction',
      'border-focus-visible': 'box-shadow-interaction',
      'text-active': 'color-active',
      'fill-active': 'fill-active',
      'background-active': 'background-color-active',
      'border-active': 'box-shadow-active',
      'active-inset': 'box-shadow-inset-active',
      'fill-disabled': 'fill-disabled',
      'background-disabled': 'background-color-disabled',
      'border-disabled': 'box-shadow-disabled',
    },
  };
  for (const [variant, entries] of Object.entries(specials)) {
    for (const [key, legacy] of Object.entries(entries)) {
      hooks[`${variant}/${key}`] = `--cdr-button-${variant}-${legacy}`;
    }
  }
  // Only retain scopes still declared by the contract.
  return Object.fromEntries(
    Object.entries(hooks).filter(([key]) => contract.variants[key.split('/')[0]]),
  );
}

export function elevatedLegacyColors(contract: ComponentTokenContract): string {
  const blocks: string[] = [];
  for (const [variant, value] of Object.entries(contract.variants)) {
    if (!value.rest.surface || !value.rest.text || !value.rest.border) continue;
    const scope = hookScope(variant, contract.defaultVariant);
    const suffixes =
      variant === 'primary'
        ? ['box-shadow', 'hover-focus-box-shadow', 'active-box-shadow', 'active-inset-box-shadow']
        : variant === 'secondary'
          ? ['box-shadow', 'interaction-box-shadow', 'active-box-shadow', 'active-inset-box-shadow']
          : [
              'box-shadow-rest',
              'box-shadow-interaction',
              'box-shadow-active',
              'active-inset-box-shadow',
            ];
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
      const legacy = `--cdr-button-${variant}-${suffixes[[0, 1, 1, 2, 3][index]]}`;
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
      return semantic ? [`    ${key}: var(${hook}, var(${legacy}, ${semantic})),`] : [];
    });
    blocks.push(`  ${variant}: (\n${entries.join('\n')}\n  ),`);
  }
  return `\n// Elevated border hooks share the same semantic contract.\n$button-elevated-colors: (\n${blocks.join('\n')}\n);\n`;
}
