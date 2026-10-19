# Button Semantic Token Implementation

**Status:** Reference implementation for the semantic token contract pattern.

The button is the reference component for the contract pipeline described in
`docs/button-semantic-migration-guide.md` and
`.agents/skills/semantic-token-migration/references/contract-pattern.md`.

## Runtime imports

`@rei/cdr-tokens@15.0.0-alpha.2` keeps the semantic foundations out of its main
`css` barrel, so load them explicitly alongside the main entry:

```ts
import '@rei/cdr-tokens/css';
import '@rei/cdr-tokens/css/color-action';
import '@rei/cdr-tokens/css/color-control';
import '@rei/cdr-tokens/css/color-feedback';
import '@rei/cdr-tokens/css/color-graphik';
import '@rei/cdr-tokens/css/color-selection';
import '@rei/cdr-tokens/css/color-surface';
```

The Storybook preview (`.storybook/preview.ts`) and dev app (`src/dev/index.js`)
use these imports. Applications consuming the built Cedar package must load the
same files until the alpha barrel includes the foundations; otherwise the
semantic custom properties are undefined and components render unset colors.

## How the button gets its colors

The button contract (`src/components/button/CdrButton.tokens.ts`) declares the
variant × role × state matrix with `hooks: true`. The generator writes:

- `src/components/button/styles/vars/CdrButton.maps.scss` — the runtime maps
- `src/components/button/styles/vars/CdrButton.hooks.scss` — the
  documentation-only public hook surface
- `src/components/button/styles/CdrButton.tokens.css` — the flat token CSS
  consumed by the docs pipeline

Each generated map value has the public hook first and the package semantic
token second:

```scss
// CdrButton.maps.scss (excerpt)
primary: (
  // ITEM_DOC: Primary button's background color. Override with --cdr-color-button-surface.
  background: var(--cdr-color-button-surface, var(--cdr-action-surface-brand)),
  text: var(--cdr-color-button-text, var(--cdr-action-text-neutral-trace)),
  border: var(--cdr-color-button-border, var(--cdr-action-border-brand)),
  fill: var(--cdr-color-button-icon, var(--cdr-action-icon-neutral-trace)) // ...
);
```

`CdrButton.module.scss` iterates the map; the compiled declaration therefore
has exactly two `var()` levels — the consumer override and the semantic token:

```scss
background: var(--cdr-color-button-surface, map.get(maps.$button-colors, primary, background));
```

There are no legacy token fallbacks. The old component tokens are recorded in
`docs/component-colors-mapping.md` for traceability, not carried in the runtime
CSS.

## Local overrides

Only approved alpha.2 gaps and data fixes are defined in the module:

- `--cdr-border-neutral-trace: #ffffff` — approved name not shipped by
  alpha.2.
- `--cdr-action-surface-brand: #143528`, `--cdr-action-text-brand: #143528`,
  `--cdr-action-border-brand: #143528` — scoped override because alpha.2's
  light-mode brand resolves to `#800080`; the approved value is the spruce
  green until the package data is corrected.

Everything else comes from the package semantic foundations. Report new gaps
to the tokens repo instead of adding local definitions; the skill's gap policy
is in `.agents/skills/semantic-token-migration/SKILL.md`.

## Files

- `src/components/button/CdrButton.tokens.ts` — contract
- `src/components/button/styles/vars/CdrButton.maps.scss` — generated runtime
  maps
- `src/components/button/styles/vars/CdrButton.hooks.scss` — generated
  documentation hook surface
- `src/components/button/styles/CdrButton.tokens.css` — generated flat token
  CSS for docs
- `src/components/button/styles/CdrButton.module.scss` — module styles,
  approved local overrides, and map consumption

## Testing

1. Run `pnpm build:maps`; the generated files must be unchanged (the command
   formats its own output).
2. Run `pnpm lint` and `pnpm unit`.
3. Re-run the button visual baseline / custom diff and review the accepted
   recolors: brand, sale, and the neutral expressions changed by design.
4. Check the public hooks in `CdrButton.hooks.scss`; each one must wrap the
   package semantic token and keep the consumer override first.

## Next steps

- Run the same contract workflow for the remaining components with the
  migration skill.
- Replace the remaining membership-palette legacy variables in
  `src/styles/cdr-palette.scss` where semantic equivalents exist.
- Add a release note or codemod for the link public-hook rename before the
  next stable release.
