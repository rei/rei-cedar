# Generic Component Token Contract

The contract is the component's styling inventory: base values, supported
variants/states, color roles, and optional sizes. The generated SCSS maps are
the bridge from that inventory to the component stylesheet.

## Shape

```ts
import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { literal, token } from '../../../build/component-tokens/types';

const contract: ComponentTokenContract = {
  component: 'cdr-<name>',
  prefix: '--cdr-<name>',
  // interaction: 'action' | 'feedback' | 'selection' | 'control'
  // Omit interaction for Universal and Graphics categories.
  // recipe is optional; only set it when a supported CSS behavior template exists.

  // Copy each value from the current stylesheet. This is not an empty placeholder.
  defaults: {
    margin: literal('0'),
    'font-family': token('cdr-font-family-sans'),
    'font-size': literal('var(--cdr-type-scale-1)'),
    'line-height': literal('var(--cdr-line-height-ratio-subheading-sans-1)'),
  },

  variants: {
    // Scope keys can represent component variants or distinct styled parts.
    default: {
      identity: 'neutral',
      // Declare only roles and states this component actually styles.
      rest: { text: 'neutral' },
      // Add hover/focus-visible/active/disabled only when implemented.
    },
  },

  // Include only if the component has size variants.
  sizes: {
    small: { 'font-size': literal('1.4rem') },
    large: { 'font-size': literal('1.8rem') },
  },
};

export default contract;
```

`defaults` is required and must contain the base values copied from existing
source. Use `token('cdr-…')` for a Cedar Sass token and `literal(...)` for a raw
value or a `var(--...)` value already used by the stylesheet.

## Color roles and states

| Contract role | CSS purpose | Typical component property |
| ------------- | ----------- | -------------------------- |
| `surface`     | Background  | `background`               |
| `text`        | Text color  | `text`                     |
| `border`      | Border      | `border`                   |
| `icon`        | Icon color  | `fill`                     |

The role × state matrix is deliberately partial. `rest` is required; omit a
role if it is not used and omit a state if the component does not implement it.
The generator emits only entries explicitly written in the contract; it does
not fill in default hover/focus/active/disabled values. A scope key can
represent a component variant or a distinct color-bearing part (for example
`header`, `content`, or `frame`) when those need separate palette/role/state
mappings.

When an implemented state uses the same color as `rest`, write that mapping
explicitly in the state. This keeps the contract and Gate 0 table honest about
what the component actually renders.

## Naming

Runtime semantic color names use:

```text
--cdr-color-[<interaction>-]<role>-<identity>[-<expression>]
```

Examples:

```text
--cdr-color-text-neutral
--cdr-color-action-surface-brand
--cdr-color-feedback-text-warning-bold
--cdr-color-selection-icon-neutral-subtle
```

The Figma export currently omits the `color-` segment from its WEB names. The
checked-in `semantic-colors.json` and lookup table normalize those names to the
planned `--cdr-color-*` runtime form. `base` and absent interaction are
omitted; do not write `-base`, `-universal`, `-graphics`, or `-inverse`.
`icon` is its own role and must not be substituted with the text role.

`fullPath` is the exact segment after `--cdr-color-` and is used when the token
name cannot be built from the interaction/role/suffix grammar. Graphics use
the separate `graphic` namespace, so `{ fullPath: 'graphic-surface-brand' }`
produces `--cdr-color-graphic-surface-brand`. A Universal text suffix can be
written directly as `rest: { text: 'neutral' }` → `--cdr-color-text-neutral`.

## Generated maps and stylesheet consumption

Run:

```bash
pnpm build:maps
```

The generator writes `src/components/<folder>/styles/vars/Cdr<Name>.maps.scss`
with maps named after the component slug:

- `$<slug>-defaults` — every base property captured from existing source
- `$<slug>-colors` — only declared variant × role × state entries
- `$<slug>-sizes` — only when sizes were declared

The CSS behavior-template generator currently supports action recipes only;
omit `recipe` for components that do not use one of those templates.

The component stylesheet consumes the defaults map in one loop, so the
component-scoped custom properties have one source of truth:

```scss
@each $key, $value in maps.$<slug>-defaults {
  --cdr-<name>-#{$key}: #{$value};
}

margin: var(--cdr-<name>-margin);
font-size: var(--cdr-<name>-font-size);
```

Color declarations read the generated color map as their fallback. That keeps
the consumer override first and the semantic token second—exactly two
`var()` levels after Sass compilation:

```scss
// Default variant, rest text
color: var(--cdr-color-<name>-text, map.get(maps.$<slug>-colors, default, text));

// Named variant and hover state
color: var(
  --cdr-color-<name>-<variant>-text-hover,
  map.get(maps.$<slug>-colors, <variant>, text-hover)
);
```

The first custom property is a public, component-scoped override hook; do not
define it inside the component. The map value is the semantic token fallback.
For a single/default variant, omit the variant name. At `rest`, omit the state
suffix; otherwise append `-hover`, `-focus-visible`, `-active`, or `-disabled`.

New migrations omit `legacy` fallbacks because they would create an extra
`var()` level below the public override. Keep the old token and hex in the
state-complete migration table instead. The contract type retains `legacy` for
existing compatibility contracts. `conditions` is reserved and currently not
generated; do not use it.

Generated artifacts should be committed with their source contract, but current
CI does not verify regeneration. Review the maps diff and ensure rerunning
`pnpm build:maps` produces no additional changes.
