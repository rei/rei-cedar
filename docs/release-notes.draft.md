# Release notes – v17.0.0

## Overview

Teams can now import individual Cedar components — @rei/cedar/CdrButton, @rei/cedar/CdrAccordion — without loading the full library barrel. A page that uses 2 components no longer pays the bundle cost of all 30. Every component also exports its own TypeScript props interface directly from the package root, replacing the previous barrel of shared type re-exports. The modal SSR hydration mismatch that caused Teleport race conditions on server-rendered pages is resolved. Upgrade together with @rei/cdr-tokens v14 — the 2 packages are a hard co-release.

<details>
<summary>## Migration guide</summary>

### Must update

Required breaking changes that must be addressed to continue using this version.

- [ ] Upgrade @rei/cdr-tokens to v14 — do this first or in the same PR. Cedar v17 will not build without it
- [ ] Update type imports (if importing from the old barrels)
- [ ] Update deep dist/ imports (if referencing dist paths directly)
- [ ] Remove SSR modal workarounds (if using CdrModal in SSR/Nuxt)

### Optional update

Recommended improvements to get the most out of this update.

- [ ] Adopt per-component imports for smaller bundles
- [ ] Remove TS 4 workarounds (if applicable)
- [ ] Review new features for opportunities to enhance your implementation
- [ ] Run your test suite to confirm compatibility

### To get the most out of this update

This release enables the following new capabilities:

- Import individual components for smaller bundles
- Per-component TypeScript props at the package root with clean imports
- Modal SSR hydration fix — no more workarounds needed for server-rendered pages
- TS 4 compatible declaration re-exports — no more skipLibCheck flags needed

</details>

<details>
<summary>## Breaking changes</summary>

Package.json exports map restricts deep imports — the ./dist/\* catch-all is replaced with explicit entry point patterns

- **Why:** the exports map is the mechanism behind modular component imports. It exposes each component as a named entry point, which requires replacing the permissive catch-all

- **Before:** import '@rei/cedar/dist/lib.mjs' (or any dist/ sub-path) resolved freely

- **After:** only documented entry points resolve. Per-component imports (@rei/cedar/CdrButton) and the barrel (@rei/cedar) work. Arbitrary dist/ paths require the ./dist/\*.css pattern

- **Migrate:** replace bare dist/ path imports with the documented entry points. If your bundler doesn't support exports conditions, use the ./dist/\*.css pattern for stylesheets

Type exports barrel replaced — types/interfaces and types/other re-exports are gone, replaced with per-component type exports from the package root

- **Why:** each component now owns its type definition. A single barrel of re-exports was a maintenance bottleneck and made tree-shaking types impossible

- **Before:** import type { CdrButtonProps } from '@rei/cedar/types/interfaces'

- **After:** import type { CdrButtonProps } from '@rei/cedar'

- **Migrate:** update type imports to use the package root. Search your codebase for @rei/cedar/types/interfaces and @rei/cedar/types/other and replace with @rei/cedar

Requires @rei/cdr-tokens v14 — Cedar now imports token values directly from the new modular token paths

- **Why:** Cedar's internal token adapter layer was rewritten to consume @rei/cdr-tokens v14's per-category export paths

- **Migrate:** upgrade @rei/cdr-tokens to v14 in the same PR. A consuming app that upgrades Cedar without upgrading tokens will get build errors at import resolution

</details>

<details>
<summary>## New features</summary>

Import individual components — a page that uses CdrButton and CdrAccordion can now import just those 2, without pulling in the full library. Before this release, the only option was the barrel import (import { CdrButton } from '@rei/cedar'), which loaded every component into the bundle regardless of usage. The existing barrel import continues to work — this is additive, not a replacement.
To get started: import CdrButton from '@rei/cedar/CdrButton'

Per-component TypeScript props at the package root — CdrButtonProps, CdrAccordionProps, and equivalents for every component are now importable directly from @rei/cedar. Before this release, consuming apps had to maintain local type re-exports, use InstanceType<typeof CdrButton> workarounds, or import from internal barrel paths that weren't part of the stable API. Now there's 1 clean import per component.
To get started: import type { CdrButtonProps } from '@rei/cedar'

Modal SSR hydration fix — the Teleport race condition that caused client/server markup divergence when a modal opened on a server-rendered page is resolved. Before this release, teams running Cedar in a Vue SSR or Nuxt context needed workarounds (delayed mount, ClientOnly wrappers) to prevent hydration mismatches. The modal now keeps its Teleport inline during SSR and moves content to document.body after mount, with a tick-cap guard to prevent indefinite waits. This is entirely net-new behavior — there was no workaround-free path before.
To get started: remove any SSR modal workarounds (ClientOnly, delayed opened binding, manual Teleport disabling). The component handles it internally

TS 4 compatible declaration re-exports — type imports that previously required TS 5 resolution behavior now work under TS 4. Before this release, consuming apps that hadn't migrated to TS 5 got compiler errors when importing Cedar types. Now the declaration files use re-export syntax that both TS 4 and TS 5 resolve correctly.
To get started: if you're on TS 4, remove any skipLibCheck flags or type shims you added to work around Cedar type errors

</details>

## Bug fixes

Fixed a Teleport race condition in CdrModal that caused SSR hydration mismatches — the modal content is now kept inline during server render and moved to document.body after client mount, with proper cleanup on unmount

<details>
<summary>## Be Aware Of</summary>

The exports map means bare sub-path imports like @rei/cedar/dist/lib.mjs no longer resolve by default. Use the documented entry points (@rei/cedar, @rei/cedar/CdrButton, or the ./dist/_.css pattern for stylesheets) instead
If your bundler doesn't support package.json exports conditions (older Webpack 4 configurations), you may need to reference dist/ files directly via the ./dist/_.css pattern
Co-release: install alongside @rei/cdr-tokens v14. Both packages must be upgraded together. Upgrading Cedar without tokens will cause build failures at import resolution, not silent runtime failures

</details>

<details>
<summary>## Component API changes</summary>

CdrModal
No props, slots, or events changed. Internal SSR hydration behavior improved: Teleport starts disabled during server render, enables after client mount, and uses a tick-capped guard when opening to ensure DOM readiness

</details>
