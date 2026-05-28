# Release intent — v17.0.0

## What this release is about

This release modernizes Cedar's build and import architecture. Components now support modular imports via the package.json `exports` map, and all type exports are sourced directly from each component rather than a shared barrel. The token consumption layer aligns with `@rei/cdr-tokens` v14's direct export model. The modal component resolves an SSR hydration mismatch that affected server-rendered pages.

## What consumers will care about most

- Modular component imports: teams can now import `@rei/cedar/CdrButton` directly
  instead of loading the full Cedar barrel. A page that uses 2 components no longer
  pays the bundle cost of all 30. The existing barrel import continues to work — this
  is additive, not a replacement.

- Per-component TypeScript types at the package root: `CdrButtonProps`,
  `CdrAccordionProps`, and equivalents for every component are now importable
  directly from `@rei/cedar`. Teams that previously maintained local type re-exports
  or used `InstanceType<typeof CdrButton>` workarounds can replace those with a
  single clean import.

- Modal SSR fix: the Teleport race condition that caused hydration mismatches on
  server-rendered pages is resolved. Teams running Cedar in a Vue SSR or Nuxt context
  no longer need workarounds to prevent client/server markup divergence on modal open.

- TS 4 compatible declaration re-exports: type imports that previously required TS 5
  resolution behavior now work under TS 4. Teams that have not yet migrated to TS 5
  can consume Cedar types without compiler errors.

- Requires `@rei/cdr-tokens` v14 — Cedar now imports token values directly from the
  new modular token paths. Both packages must be upgraded together. A consuming app
  that upgrades Cedar without upgrading tokens will get build errors at import
  resolution, not silent runtime failures.

## What changed internally that should NOT appear in release notes

- Entire codebase reformatted with oxfmt (replacing Prettier)
- ESLint replaced with Oxlint
- Build scripts migrated from .mjs/.js to .ts (tsx runner)
- Build scripts reorganized into `build/` directory
- Vite 8 and Storybook 10 migration
- npm scripts converted to pnpm
- `.gitignore` and agent/skill config changes

## Known breaking changes

- Package.json `exports` map restricts deep imports — `./dist/*` catch-all
  replaced with explicit patterns. Consumers importing via `@rei/cedar/dist/...`
  paths will need to update. Note: this is the mechanism behind modular imports
  but is itself a breaking change, not a feature — do not frame it positively in
  new features or improvements.
- Type exports barrel changed — `types/interfaces` and `types/other` re-exports replaced with per-component type exports from the package root
- Requires `@rei/cdr-tokens` >=14.0.0 for direct token consumption

## Cross-repo notes

Cedar v17 depends on the direct token export paths introduced in `@rei/cdr-tokens` v14. These two versions must ship together. Consumers must upgrade both packages at the same time.

## BOLO — things consumers should watch for

- The new `exports` map means bare sub-path imports like `@rei/cedar/dist/lib.mjs` no longer resolve by default. Use the documented entry points instead.
- If your bundler doesn't support package.json `exports` conditions, you may need to reference `dist/` files directly via the `./dist/*.css` pattern.

## Alpha history

<!-- What was communicated in alpha notes that stable notes should NOT re-explain.
     What changed between alpha and stable that consumers who read alpha notes need to know.
     Features added in alpha then reverted before stable — list them here so the agent
     can decide whether a BOLO entry is warranted. -->

## Success criteria

- No consumer build failures related to import resolution within 1 week
- No SSR hydration mismatch reports from modal consumers
- Successful `@rei/cdr-tokens` v14 co-upgrade across consuming apps

## Sections to include

- [x] Breaking changes
- [x] New features
- [x] Improvements
- [x] Bug fixes
- [x] BOLO
- [ ] Token changes
- [x] Component API changes
- [x] Migration guide
- [ ] Design changes
