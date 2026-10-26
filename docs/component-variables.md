# Component variables

Keep `rei-cedar` and `rei-cedar-component-variables` as sibling checkouts. Use
Node 22 and run from Cedar:

```sh
pnpm install --frozen-lockfile
pnpm build:variables
pnpm test:variables
pnpm exec playwright test --config playwright.component-variables.config.ts
```

The build regenerates Sass maps from the component TypeScript contracts, then
exports the supported `*.vars.scss` entrypoints and their local dependencies.
All 19 documented components use this path. Structural styles live in the
component's vars file and are shared with Vue. Contract values remain in the
generated maps.

The transfer adds contract defaults and source token fallbacks so styles work
without Vue initializing custom properties. Package imports use physical token
paths for standard Dart Sass. `index.scss` forwards the individual modules;
`cedar-component-variables.scss` is a standalone flattened bundle.

From the component-variables checkout, `pnpm build:all` runs this export and
rebuilds the documentation examples. `pnpm test:all` checks checkout setup and
all component exports. Edit contracts and styles in Cedar, and examples in the
companion repository; regenerate `dist` instead of editing it.

Checks cover every source entrypoint's public mixins, all 81 examples, contract
defaults and equivalent CSS from the index and detached bundle. Browser tests
exercise semantic hooks, structural defaults and inherited overrides. The Sass
integration checks run separately from the regular Cedar unit suite so that
suite does not require a sibling checkout.

Use `@rei/cdr-tokens@15.0.0-alpha.2` and load its root CSS plus `color-surface`,
`color-action`, `color-control` and `color-feedback`. Consume the semantic hooks
defined by the migrated contracts. Applications compile the Sass they need;
no Vue runtime is required.
