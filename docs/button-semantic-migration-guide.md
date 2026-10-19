# Button Semantic Token Migration Guide

**Purpose:** Quick reference for the pattern used by the button migration. The
canonical, gated workflow — including Gate 0 mapping approval, the isolated
preview, and the manual comparison — lives in
`.agents/skills/semantic-token-migration/SKILL.md`.

## Runtime source

`@rei/cdr-tokens@15.0.0-alpha.2` is the runtime source of truth for semantic
color values. The main `css` entry does not yet import the semantic
foundations, so load them explicitly:

```ts
import '@rei/cdr-tokens/css';
import '@rei/cdr-tokens/css/color-action';
import '@rei/cdr-tokens/css/color-control';
import '@rei/cdr-tokens/css/color-feedback';
import '@rei/cdr-tokens/css/color-graphik';
import '@rei/cdr-tokens/css/color-selection';
import '@rei/cdr-tokens/css/color-surface';
```

Applications consuming the built Cedar package must load the same files until
the alpha barrel includes the foundations. Do not copy package values into
component styles; use the semantic name.

## The pattern

1. Classify the component's interaction family (ACTION, CONTROL, SELECTION, or
   FEEDBACK).
2. Add a contract at `src/components/<folder>/Cdr<Name>.tokens.ts`.
3. Declare each color with its semantic token. Set `hooks: true` and
   `defaultVariant` when the component stylesheet iterates the generated map.
4. Run `pnpm build:maps`. The generator writes `*.maps.scss` and, for
   `hooks: true`, a documentation-only `*.hooks.scss`.
5. Consume the generated map in the module. The public hook wraps the semantic
   token, so the compiled declaration has exactly two `var()` levels:

```scss
// module source
background: var(--cdr-color-button-surface, map.get(maps.$button-colors, primary, background));
```

```scss
// generated map value
background: var(--cdr-color-button-surface, var(--cdr-action-surface-brand));
```

The first custom property is the consumer override hook. Do not define it
inside the component, and do not add legacy fallbacks: the removed component
token belongs in the migration table, not in the compiled CSS.

6. Verify the change:
   - `pnpm build:maps` is idempotent and leaves the generated files clean.
   - `pnpm lint` and `pnpm unit` are green.
   - Review the component in Storybook and confirm the accepted recolors.

## Component hook surface

- `hooks: true` generates `--cdr-color-<component>[-<scope>]-<role>[-<state>]`.
- `defaultVariant` omits the scope segment for the default variant.
- `extras` get their own scope hook and keep the declared token or literal as
  the fallback.
- A component with a historical namespace sets `hookPrefix`; link uses
  `--cdr-link`.

## Missing package names

The alpha package is missing a small set of approved names. Do not substitute a
different token or a literal silently. Report the gap and only add a temporary
local shim with explicit approval. The button migration currently carries one
gap shim (`--cdr-border-neutral-trace`) plus three scoped brand overrides for
the alpha light-mode `#800080` data bug; see
`src/components/button/styles/CdrButton.module.scss`.

## Resources

- `.agents/skills/semantic-token-migration/SKILL.md` — canonical workflow
- `.agents/skills/semantic-token-migration/references/contract-pattern.md` —
  contract shape, hook surface, and generated-map consumption
- `docs/component-colors-mapping.md` — legacy → semantic mapping table
- `src/components/button/` — reference contract, maps, hooks, and module
- `docs/button-semantic-implementation.md` — button-specific implementation
  notes
