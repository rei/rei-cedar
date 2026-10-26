# Component variables

Keep `rei-cedar` and `rei-cedar-component-variables` as sibling checkouts. With
Node 22, run the following from Cedar:

```sh
pnpm install --frozen-lockfile
pnpm build:variables
pnpm test:variables
pnpm exec playwright test --config playwright.component-variables.config.ts
```

`build:variables` regenerates the maps from the TypeScript contracts, then
exports the supported components' Sass entrypoints and local dependencies to
the sibling package. Every component uses the same export path. Components
without contracts retain their source Sass recipes.

The transfer supplies fallbacks from each contract's defaults so the mixins
work without a Vue root class initializing custom properties. Shared recipes
initialize their own defaults. Temporary token fallbacks come from the
corresponding source module. The exported Sass uses
physical token paths so standard Dart Sass can resolve imports with
`node_modules` on its load path. `index.scss` forwards the individual modules;
`cedar-component-variables.scss` flattens them into a standalone bundle.

In the component-variables checkout, `pnpm build:all` performs that export and
rebuilds the documentation data. `pnpm test:all` runs checkout setup and Sass
integration checks. Edit contracts and recipes in Cedar, and examples in the
component-variables repository; regenerate `dist` instead of editing it.

The integration suite checks all 19 documented components, their legacy mixin
APIs, contract defaults, and equivalent CSS from the index, legacy import and
detached bundle. Browser checks exercise structural defaults, semantic
dependencies, inherited overrides and selected interaction states. These tests
run separately from the regular Cedar unit suite so it does not require the
sibling checkout.

Pressable contracts with a shared `*.recipe.scss` use the common mixin generator,
CSS compiler and offline demo renderer. Names, variants, sizes and hooks come
from the contract. `componentVariables.hooks` and `componentVariables.elevatedHooks`
provide compatibility names as data; shared build code does not name components.
The generated Sass maps retain the same values and hook precedence as before.

All 39 package files are checked against SHA-256 hashes captured before this
generalization. A separate fixture changes the component identity, adds a
variant and a size, and compiles the generated mixins to verify reuse.

Use `@rei/cdr-tokens@15.0.0-alpha.2` and load its root CSS plus `color-surface`,
`color-action`, `color-control` and `color-feedback`. The exported APIs and
semantic hooks follow the migrated Cedar recipes. Consumers of older component
variables may need to migrate old global token overrides accordingly. The export
produces Sass for all supported components and retains the existing CSS/demo
artifacts for shared pressable recipes. No Vue runtime is needed.
