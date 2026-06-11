# Release notes – v17.0.1

## Overview

This patch release simplifies Cedar's component prop API by removing verbose token prefixes from consumer-facing props. Scale props now use numeric values (e.g., `scale="3"` instead of `scale="scale-3"`), and space props use simplified format (e.g., `gap="4"` instead of `gap="scale-4"`). The Node engine requirement now supports Node 24 LTS by removing the upper version bound. SASS deprecation warnings from component variables are resolved by migrating to modern @use modules. **Requires @rei/cdr-tokens v14.0.1** for Webpack 4 compatibility.

## Migration guide

### Must update

- [ ] Upgrade @rei/cdr-tokens to v14.0.1 (required for Webpack 4 compatibility)
- [ ] Update scale prop values to numeric format (e.g., `scale="3"` instead of `scale="scale-3"`)
- [ ] Update space prop values to simplified format (e.g., `gap="4"` instead of `gap="scale-4"`)

### Optional update

- [ ] Review your build logs for any remaining SASS deprecation warnings
- [ ] If you were blocked by Node 23 requirement, you can now use Node 24 LTS

### To get the most out of this update

This release enables the following new capabilities:

- Cleaner, more intuitive component prop API with numeric values
- Support for Node 24 LTS (no upper version bound)
- Elimination of SASS deprecation warnings in component variables

## Breaking changes

Scale prop format changed from verbose token format to simplified numeric format

- **Why:** The prop name already indicates it's a scale value, so repeating "scale" in the prop value is redundant and verbose

- **Before:** `<CdrHeadingSerif scale="scale-3">` or `<CdrUtilitySans scale="scale-minus-1">`

- **After:** `<CdrHeadingSerif scale="3">` or `<CdrUtilitySans scale="-1">`

- **Migrate:** Search your codebase for `scale="scale-` and replace with `scale="` (remove the "scale-" prefix). Negative scales use the `-N` format

Space prop format changed from verbose token format to simplified format

- **Why:** Similar to scale props, the prop name indicates it's a space value, so repeating "scale" is redundant

- **Before:** `<CdrLayout gap="scale-4">` or `<CdrLayout gap="scale-3--5">`

- **After:** `<CdrLayout gap="4">` or `<CdrLayout gap="3--5">`

- **Migrate:** Search your codebase for gap/rowGap/columnGap props with `scale-` prefix and remove it. Fixed space values (zero, one-x, two-x) remain unchanged

## New features

Simplified scale prop API — text components now accept numeric scale values instead of verbose token format. The adapter layer handles conversion to CSS custom properties internally, so consumers get a cleaner API without losing functionality.

To get started: `<CdrHeadingSerif scale="3">` instead of `<CdrHeadingSerif scale="scale-3">`

Simplified space prop API — layout components now accept simplified space values. The adapter layer converts simplified format to token names internally.

To get started: `<CdrLayout gap="4">` instead of `<CdrLayout gap="scale-4">`

Node 24 LTS support — removed the upper bound on Node engine requirement, allowing teams to use the latest Node LTS version without being blocked by the package.json engines field.

To get started: No action needed if you're already on a supported Node version. If you were blocked from upgrading to Node 24, you can now do so.

SASS deprecation warnings resolved — @rei/cdr-component-variables migrated from legacy @import to modern @use modules, eliminating deprecation warnings in build logs.

To get started: No action needed — the package now uses modern SASS modules internally

## Bug fixes

Fixed SASS deprecation warnings in @rei/cdr-component-variables by migrating from @import to @use modules with global namespace (as \*)

Fixed Node engine version requirement blocking Node 24 LTS by removing upper bound (<23) from engines field

Fixed Webpack 4 compatibility issue with @rei/cdr-tokens v14.0.1 exports map wildcards by adding explicit exports for type paths

## Be Aware Of

The scale and space prop format changes are breaking for consumers using the verbose format. However, the adapter layer maintains backward compatibility with the old format during the transition period

If you have custom components that extend Cedar components and override scale/space props, ensure they use the new simplified format

## Component API changes

Text preset components (CdrHeadingSerif, CdrUtilitySans, CdrBody, CdrHeadingDisplay, CdrHeadingSans, CdrSubheadingSans, CdrUtilitySerif)

- scale prop now accepts numeric values: '1' | '2' | '3' | '4' | '5' (or '-2' | '-1' | '0' | '1' for components that support negative scales)
- Default values updated to use numeric format
- Adapter layer handles conversion to CSS custom properties

CdrFulfillmentTile

- scale prop in FulfillmentTileContent now accepts numeric values: '-2' | '-1' | '0' | '1'
- Component usage updated to use numeric format

Layout components (CdrLayout)

- gap, rowGap, columnGap props now accept simplified format: '4' instead of 'scale-4', '3--5' instead of 'scale-3--5'
- Fixed space values (zero, one-x, two-x) remain unchanged
- Adapter layer handles conversion to CSS custom properties

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
