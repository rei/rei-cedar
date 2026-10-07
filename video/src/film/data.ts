import button from '../../../src/components/button/CdrButton.tokens';
import accordion from '../../../src/components/accordion/CdrAccordion.tokens';
import type {
  ColorRole,
  ComponentTokenContract,
  InteractionState,
} from '../../../build/component-tokens/types';
import { structure } from '../data/model';

export { button, accordion };
export const semanticTokens = structure.flatMap((group) => group.tokens);
export const states: InteractionState[] = ['rest', 'hover', 'focus-visible', 'active', 'disabled'];

export const semantic = (name: string) => {
  const found = semanticTokens.find((entry) => entry.name === name);
  if (!found) throw new Error(`Video references an unapproved semantic token: ${name}`);
  return found;
};

export const slot = (
  contract: ComponentTokenContract,
  scope: string,
  state: InteractionState,
  role: ColorRole,
) => {
  const value = contract.variants[scope]?.[state]?.[role];
  if (!value) return null;
  const path =
    typeof value === 'string'
      ? [contract.interaction, role, value].filter(Boolean).join('-')
      : value.fullPath;
  return semantic(`--cdr-color-${path}`);
};

export const color = (name: string) => semantic(`--cdr-color-${name}`).hex;
export const buttonColors = (state: InteractionState) => ({
  surface: slot(button, 'primary', state, 'surface')!.hex,
  text: slot(button, 'primary', state, 'text')!.hex,
  border: slot(button, 'primary', state, 'border')!.hex,
  icon: slot(button, 'primary', state, 'icon')!.hex,
});
