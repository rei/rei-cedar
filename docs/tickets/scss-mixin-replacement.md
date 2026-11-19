---
status: closed
priority: high
---

# Ticket: Build Cedar-Owned Replacements for the Deprecated Token-Package Sass Mixins

## Status: closed - decision reversed

## Decision

This ticket is closed because the deprecation was reversed. SCSS utility mixins remain in `@rei/cdr-tokens` and are not deprecated. See rei-cedar-tokens commit a467b320 and @rei/cdr-tokens 15.0.0-alpha.6.

## Why this matters

The original goal was for Cedar to take ownership of mixins from the token package. After architectural review, the decision was reversed to keep mixins in @rei/cdr-tokens since:
- The deprecation was still in alpha (not released)
- Consumer disruption outweighed architectural purity benefits
- The monorepo migration is a better time to reconsider package boundaries

## Mixins In Scope

Full inventory of the deprecated token-package mixins that need a Cedar-owned replacement (source: `rei-cedar-tokens/style-dictionary/legacy/assets/utilities/cdr-{breakpoint,display,type}-mixins.scss`):

### Breakpoint media queries (`cdr-breakpoint-mixins.scss`)

- **Status:** ✅ **COMPLETED** — Cedar breakpoint mixins are now available in `src/styles/breakpoint-mixins.scss`
- `cdr-xs-mq-up`, `cdr-xs-mq-only`
- `cdr-sm-mq-down`, `cdr-sm-mq-up`, `cdr-sm-mq-only`
- `cdr-md-mq-down`, `cdr-md-mq-up`, `cdr-md-mq-only`
- `cdr-lg-mq-down`, `cdr-lg-mq-up`, `cdr-lg-mq-only`
- **Migration:** Use `@use '../src/styles/breakpoint-mixins' as mq;` and `@include mq.cdr-*-mq-*;` instead of deprecated `@rei/cdr-tokens` breakpoint mixins
- **Note:** Cedar breakpoint mixins use Cedar breakpoint variables from `@rei/cdr-tokens/dist/docsite/scss/foundations/cdr-breakpoint` instead of hardcoded values

### Container queries (`cdr-breakpoint-mixins.scss`)

- **Status:** ✅ **COMPLETED** — Cedar container query mixins are now available in `src/styles/breakpoint-mixins.scss`
- `cdr-xs-cq-up`, `cdr-xs-cq-only`
- `cdr-sm-cq-down`, `cdr-sm-cq-up`, `cdr-sm-cq-only`
- `cdr-md-cq-down`, `cdr-md-cq-up`, `cdr-md-cq-only`
- `cdr-lg-cq-down`, `cdr-lg-cq-up`, `cdr-lg-cq-only`
- Each takes an optional `$name` container-name param and includes a `@supports not (contain: inline-size)` media-query fallback for browsers without container query support (currently caveated as removable "once Safari 15 is no longer supported" — revisit whether that fallback is still needed when rebuilding).
- **Migration:** Use `@use '../src/styles/breakpoint-mixins' as mq;` and `@include mq.cdr-*-cq-*;` instead of deprecated `@rei/cdr-tokens` container query mixins

### Display/utility helpers (`cdr-display-mixins.scss`)

- **Status:** ✅ **COMPLETED** — Cedar display/utility mixins are now available in `src/styles/display-mixins.scss`
- `cdr-display-sr-only`, `cdr-display-sr-focusable`
- `cdr-container-base`, `cdr-container-static`, `cdr-container`, `cdr-container-fluid`
- These depend internally on the breakpoint mixins above and on `cdr-space`/`cdr-breakpoint` foundation tokens — replacements need the same dependency chain.
- **Migration:** Use `@use '../src/styles/display-mixins' as display;` and `@include display.cdr-display-*;` or `@include display.cdr-container-*;` instead of deprecated `@rei/cdr-tokens` display mixins
- **Note:** Cedar display mixins use Cedar token variables from `@rei/cdr-tokens/dist/docsite` instead of hardcoded values. Replaced deprecated `clip` property with `clip-path` for screen reader utilities.

### Typography mixins (`cdr-type-mixins.scss`)

- **Status:** ✅ **COMPLETED** — Cedar typography mixins are now available in `src/styles/typography-mixins.scss`
- Text style primitives: `cdr-icon`, `cdr-text-italic`, `cdr-text-strong`, `cdr-text-default`
- Heading families: `cdr-text-heading-display-{800,900,1000,1100,1200,1300,1400,1500,1600}`, `cdr-text-heading-sans-{200..600}`, `cdr-text-heading-serif-{200..1200}`, `cdr-text-heading-serif-strong-{600..1200}`
- Body/subheading/eyebrow: `cdr-text-body-{300,400,500}`, `cdr-text-body-strong-{300,400,500}`, `cdr-text-subheading-sans-{300..600}`, `cdr-text-eyebrow-100`
- Utility text: `cdr-text-utility-sans-{100..800}`, `cdr-text-utility-sans-strong-{100..800}`, `cdr-text-utility-serif-{200..800}`, `cdr-text-utility-serif-strong-{200..800}`
- **Migration:** Use `@use '../src/styles/typography-mixins' as type;` and `@include type.cdr-text-*;` instead of deprecated `@rei/cdr-tokens` typography mixins
- **Note:** Cedar typography mixins use Cedar token variables from `@rei/cdr-tokens/dist/docsite` instead of hardcoded values
- Each mixin in the current source also ships a matching `%placeholder` selector (e.g. `%cdr-text-default`) for `@extend`-based usage — Cedar's replacement does not include placeholder selectors; mixin-only is sufficient for the new API.

## Design Direction — Attribute-Selector Pattern For Display/Typography (Not Yet Proven, Check Before Committing)

`rei-cedar-tokens/docs/tickets/intent-css-attribute-selector.md` proposes a `[data-cdr-intent="primary"]` attribute-selector hook for intents, but that ticket **has not been built yet** — it's planned as a minor, post-release follow-up, not an existing precedent to copy. Don't reference it here as proven prior art; if it ships before this ticket starts, re-check how it actually turned out.

Worth noting for scoping purposes: intents don't need a new Sass mixin to get there. The token pipeline (`rei-cedar-tokens/style-dictionary/utils/intents-output.ts`) already emits intents as flat bundles — CSS custom properties, SCSS variables, and a `CdrIntents`/`CdrIntentOrder` TS object — with no mixin generation involved. The remaining work for that ticket is just a plain CSS/SCSS rule set in Cedar that maps `[data-cdr-intent="primary"]` onto the already-emitted custom properties, not a mixin.

The same shape of question applies here: for **display/utility helpers** and **typography mixins**, which are bundles of static property values applied to a selector, a bundled-attribute-selector (consuming values already available from `@rei/cdr-tokens`) may be a simpler replacement than a Sass `@include` mixin — it needs no Sass compiler and sidesteps the `%placeholder`/`@include` duplication in the current source. **Breakpoint and container queries** are a weaker fit — they're structural (`@media`/`@container` wrapping arbitrary author CSS via `@content`), not a static bundle, so an attribute selector can't substitute for the media-query mixin itself; those likely stay Sass mixins (and/or JS detection like `getCurrentBreakpoint()`).

- [ ] Decide, per mixin category, whether to use a bundled attribute-selector (consuming `@rei/cdr-tokens` values directly, no mixin) instead of — or alongside — a traditional Sass mixin, and document the reasoning. Don't assume the intents ticket's outcome; evaluate independently, and only align with it later if useful.

## Rules For How The Replacements Should Be Built

- **Consume tokens, don't hardcode values.** The current mixins hardcode breakpoint pixel values and font stacks/sizes directly. Cedar's replacements must read from `@rei/cdr-tokens` (e.g. `CdrBreakpointSm`/`$cdr-breakpoint-sm` equivalents, typography foundation tokens) so they stay in sync with token updates instead of drifting.
- **Use `@use`/`@forward`, not `@import`.** `@import` is deprecated in Dart Sass and being removed; follow the modernization already done in `@rei/cdr-component-variables` v11 (see Reference below) rather than reintroducing legacy syntax.
- **Match Cedar naming conventions**, not a verbatim copy of the token package's names, where Cedar already has a clearer pattern (e.g. the JS `getCurrentBreakpoint()` naming style in `src/mixins/breakpoints.ts` vs. the SCSS `cdr-sm-mq-up` style — reconcile naming between the JS and SCSS surfaces so they describe the same breakpoints consistently).
- **No silent behavior drift.** Replacements should produce the same CSS output as the deprecated mixins for a 1:1 migration path, unless a deliberate design change is being made (and if so, call it out explicitly in the migration docs, not just in code).

## Distribution — Open Question To Resolve

Cedar does not currently ship Sass mixins as a public package surface. Candidates considered:

1. **`@rei/cedar`'s own `exports` map** already reserves `./mixins/*`, but today that only resolves TS (`src/mixins/breakpoints.ts` → `dist/mixins/breakpoints.mjs`). Shipping real SCSS alongside would need a parallel `./mixins/*.scss` style export and a build step to copy/compile SCSS into `dist/mixins/`. Appealing because most consumers already install `@rei/cedar`, so there's no new package to adopt — but it does mean pulling in the full component library's install footprint just to get utility mixins.
2. **`@rei/cdr-component-variables`** — ruled out. That package exists specifically to let non-Cedar markup recreate Cedar _component_ CSS (buttons, chips, etc.); these are general-purpose utility mixins (breakpoints, typography, display helpers), not component recreation. Wrong conceptual home even though its `@forward`/`index.scss` distribution mechanics are reusable as a pattern.
3. **A new, dedicated package** (e.g. `@rei/cdr-style-mixins` or similar naming — name TBD) scoped purely to these utility mixins. Worth considering because: these mixins remain available (deprecated) in `@rei/cdr-tokens` directly, so there's precedent for them living outside the main component package; a lightweight, Cedar-independent package lets teams who only need utility CSS (not the full Vue component library) adopt it without the `@rei/cedar` install footprint; and it gives the mixins their own release/versioning cadence independent of Cedar component releases.

This ticket needs a decision — ship SCSS mixins directly from `@rei/cedar`, or stand up a new dedicated package — before implementation starts. Whichever is chosen, follow the `@use`/`@forward` + `index.scss` barrel convention already established by `@rei/cdr-component-variables` rather than inventing a new one.

- [ ] Decide and document the distribution surface (package + entrypoint) for the new mixins — `@rei/cedar` vs. a new dedicated package.
- [ ] Ship an `index.scss` (or equivalent barrel) that `@forward`s all replacement mixins, matching the `@rei/cdr-component-variables` convention of "import the index to get everything in the right load order."

## TS Barrel

- [ ] Decide whether each SCSS mixin category needs a TS/JS equivalent exported through `@rei/cedar`'s existing `./mixins/*` surface (as `breakpoints.ts` already does for breakpoint detection), or whether SCSS-only is acceptable for the mixins that are purely presentational (typography, display helpers). Breakpoint logic already has a JS consumer (`getCurrentBreakpoint`) — confirm whether container-query equivalents need the same JS-side treatment, or if they're CSS-only by nature.
- [ ] If new TS equivalents are added, they follow the existing `src/mixins/*.ts` file-per-concern pattern and are added to the `build/generate-entrypoint-dts.ts` / entrypoint generation pipeline so `.d.ts` output is produced automatically like other Cedar exports.

## Storybook

Cedar's Storybook currently has no foundation/utility-level documentation pages for things like breakpoints or typography scales — the only non-component docs page is `src/Introduction.mdx`. Component-level stories (e.g. `CdrSurface.stories.ts`) pull token metadata from `@rei/cdr-tokens/docsite/json/...` to render token tables, which is a usable pattern to borrow from.

- [ ] Add a Storybook docs page (MDX, following the `Introduction.mdx` precedent) for the new mixins — one per category (breakpoints/container queries, display/utility helpers, typography) or a combined "Foundations > Mixins" section.
- [ ] Each page shows a live/rendered example plus the SCSS needed to produce it (mirroring how `@rei/cdr-component-variables`'s doc site renders example HTML + SCSS side by side).
- [ ] Typography mixins in particular should render each type style visually (similar to how a type-scale page typically works) so consumers can pick a mixin by appearance, not just by name.

## Acceptance Criteria

- [ ] Cedar ships replacements for each mixin listed above, across all four categories: breakpoint media queries, container queries, display/utility helpers, and typography mixins.
- [ ] For display/utility and typography categories, a bundled-attribute-selector approach (consuming `@rei/cdr-tokens` values directly, no mixin) is evaluated as a replacement/supplement to a plain Sass mixin, with the decision documented.
- [ ] Replacements consume `@rei/cdr-tokens` values rather than hardcoded constants, and use `@use`/`@forward`.
- [ ] A decided-and-documented distribution surface (package + entrypoint + barrel file) ships the mixins.
- [ ] A decision is recorded on whether TS equivalents are needed per category, and any needed TS equivalents are added following the `src/mixins/*.ts` + entrypoint-generation pattern.
- [ ] A Storybook docs page (or set of pages) documents the replacements with before/after migration examples (old `@include cdr-*` from the token package → new Cedar usage).
- [ ] Naming/API follows Cedar's existing conventions rather than carrying over the token package's naming verbatim where Cedar has a better pattern already.
- [ ] Coordinate with `rei-cedar-tokens/docs/tickets/mixin-deprecation-cedar-handoff.md` so the token-package deprecation warnings can eventually reference this replacement by name/version once shipped.

## Reference

- Token-package side of this handoff: `rei-cedar-tokens/docs/tickets/mixin-deprecation-cedar-handoff.md` (deprecated-but-restored mixins, acceptance criteria includes "a corresponding story exists on the Cedar side to build the real replacement" — this ticket is that story).
- Deprecated source files for scope reference: `rei-cedar-tokens/style-dictionary/legacy/assets/utilities/cdr-{breakpoint,display,type}-mixins.scss`.
- Existing Cedar JS equivalent for breakpoints to use as a style reference: `src/mixins/breakpoints.ts`.
- Existing SCSS-mixin distribution + `@use`/`@forward` modernization precedent: `rei-cedar-component-variables/README.md` (v11 migration notes).
- Existing Storybook docs-page precedent: `src/Introduction.mdx`; existing token-driven story pattern: `src/components/surface/CdrSurface.stories.ts`.
- Related but not-yet-built effort in the same "move CSS patterns into Cedar" initiative (planned minor, post-release, not a precedent to copy yet): `rei-cedar-tokens/docs/tickets/intent-css-attribute-selector.md`. The intents TS/CSS/SCSS barrel it would build on is already shipped: `rei-cedar-tokens/style-dictionary/utils/intents-output.ts` (`intents-export-surface.md`, PR #313). Existing `[data-*]` attribute-selector convention to follow if this pattern is used: `src/components/surface/CdrSurface.module.scss`.
