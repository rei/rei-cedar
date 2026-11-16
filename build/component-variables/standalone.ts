import type { ComponentTokenContract } from '../component-tokens/types';
import { mapSlug } from '../component-tokens/naming';

/** Supply contract defaults without the custom properties initialized by Vue's root class. */
export function standaloneScss(
  content: string,
  contract: ComponentTokenContract,
  module: string,
): string {
  const slug = mapSlug(contract.component);
  for (const key of Object.keys(contract.defaults ?? {})) {
    content = content.replaceAll(
      `var(${contract.prefix}-${key})`,
      `var(${contract.prefix}-${key}, map.get(maps.$${slug}-defaults, ${key}))`,
    );
  }

  // Reuse local token fallbacks declared in the source module, preserving
  // consumer overrides. Remove a fallback in the source module to remove it
  // here too.
  for (const match of module.matchAll(/^\s*(--cdr-[\w-]+):\s*([^;{}]+);\s*$/gm)) {
    const [, name, value] = match;
    if (!name.startsWith(`${contract.prefix}-`)) {
      content = content.replaceAll(`var(${name})`, `var(${name}, ${value.trim()})`);
    }
  }
  return content;
}
