# CdrButton contracts → component variables

The local implementation extends PR #249 at `079647d939ea290b4719781fa8ea7eecbfe57ded`.
Keep `rei-cedar` and `rei-cedar-component-variables` as sibling checkouts.

```sh
pnpm install --frozen-lockfile
pnpm build:variables:button
# Or export every supported component:
pnpm build:variables
pnpm test:variables
pnpm exec playwright test --config playwright.component-variables.config.ts
```

`CdrButton.tokens.ts` declares variants, explicit states/roles, sizes and defaults.
`build:maps` now generates both the Sass maps and named public mixins. A new
variant or size added to that contract gets a wrapper without editing a list of
mixins. `CdrButton.recipe.scss` owns the structural CSS and interaction behavior;
both Vue's module and the generated mixins call it. Contracts alone cannot
describe icon positioning, underline behavior or focus-ring selectors.

The transfer regenerates the package's maps from the same contract with the
legacy component hook aliases. Its fallback order is new public hook → legacy
component hook → semantic token. Elevated border aliases have their own map so
they cannot affect flat buttons. Old global design-token hooks are intentionally
excluded: alpha.2 still defines those defaults and inserting them as fallbacks
would cancel the semantic migration.

The package receives generated vars/maps, the shared recipe, complete CSS,
documentation examples and an offline HTML demo. The CSS compiles the shared
module without Vue or CSS-module name mangling; elevated classes supplement the
four colored variants. The SCSS bundle flattens local dependencies and deduplicates
the common token/map imports. Exported token paths work with standard Dart Sass.

The old 28 mixin names and 108 component hooks are retained. There are still
intentional migration requirements: tokens must be 15.0.0-alpha.2, applications
must load `@rei/cdr-tokens/css` and `@rei/cdr-tokens/css/color-action`, old global
color overrides need to move to component hooks, and colors/focus follow PR #249.
The scoped alpha.2 brand and missing-white fixes live in the shared recipe.

The offline demo contains no JavaScript or network imports. Browser tests compare
all examples with unscoped Vue-module reference styles around every breakpoint,
then exercise hover, keyboard focus, active, disabled and hook precedence. The
unit checks cover all old mixins/hooks, package entrypoints, a standalone bundle,
unknown modifiers and a contract extended with a new variant/size.

The integration checks run separately from `pnpm unit`, so regular Cedar CI does
not require a sibling checkout.

## Full package build

In the component-variables checkout, `pnpm build:all` runs Cedar's
`build:variables` and then rebuilds the documentation data. It exports all 19
documented components, including Caption/Quote and the Checkbox/Radio examples.
Migrated components receive their generated contract maps and existing structural
mixins; components without contracts retain their Sass recipes. The transfer
adds fallbacks from contract defaults so the mixins do not depend on the Vue
root class initializing custom properties. Temporary alpha-token fallbacks come
from the corresponding source module. CdrLink and CdrCaption share their recipes
with Vue so their palette/state behavior is included in the exports.

For all components, load the token CSS root and `color-surface`, `color-action`,
`color-control`, and `color-feedback`. The full build generates individual Sass
entrypoints, their dependencies, index and standalone bundle, plus Button's
complete CSS/demo. It does not generate a class-based CSS file for every other
component. `pnpm test:variables` compiles every documentation example and checks
index, legacy import and a detached bundle. Browser checks exercise structural
defaults, inherited overrides and semantic token dependencies without Vue.
