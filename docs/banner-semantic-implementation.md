# Banner Semantic Token Implementation

> Historical PR implementation notes. The [component rollout](component-semantic-rollout.md) records the current sparse contracts, independent icon roles, corrected taxonomy paths and fallback policy. Current contracts and generated maps supersede examples below.

**Status:** Second component migrated with the semantic token pattern (after Button)

## Current Implementation

The banner component has been updated to use semantic tokens following the pattern described in `docs/button-semantic-migration-guide.md` and the reference implementation in `src/components/button/CdrButton.tokens.ts`.

## Key Changes

### 1. Semantic Token Paths

Banner now uses semantic token paths with legacy fallbacks:

```css
/* Old approach */
background-color: var(
  --cdr-banner-warning-background-color,
  var(--cdr-color-background-message-warning-01, #{tokens.$cdr-color-background-message-warning-01})
);

/* New approach (generated into CdrBanner.maps.scss from the contract) */
background: var(
  --cdr-color-feedback-surface-warning,
  #{tokens.$cdr-color-background-message-warning-01}
);
```

### 2. Intent Classification

Banner is classified as **FEEDBACK** intent:

- System communications that provide status information or operational feedback
- Uses `feedback` interaction family in semantic paths
- Banner `type` maps 1:1 to an identity: `default → neutral`, `info → info`, `success → success`, `warning → warning`, `error → error`

### 3. State Mapping

Banner is static — it has no hover, active, or disabled states. Every state in the
contract repeats the rest slots so the role × state matrix stays satisfied without
inventing states the component does not have.

### 4. Role Mapping

Banner properties map to semantic roles:

- main background → `surface` role (base expression, per the migration guide)
- message text → `text` role (`{identity}-bold`)
- wrapper left-border accent → `border` role (base expression)
- left icon fill → `icon` role (specified independently per variant; the generator
  resolves it against the text-role namespace, matching Button — see open issue below)
- thin outline → `extras.outline` (legacy-only until a faint-step border token is wired)
- icon tile background → `extras.icon-tile-background` (legacy-only; the 4-role
  matrix holds a single surface per state, so the second surface has no slot yet)

### 5. Default Variant Defines feedback.surface.neutral Prospectively

Figma's feedback mapping has no `feedback.surface.neutral` — feedback surfaces exist
only for `info / success / natural / warning / error`. Rather than resolving `default`
against universal foundation-only tokens, the contract maps it to feedback-family
neutral tokens that design still needs to add to the deck:

- `--cdr-color-feedback-surface-neutral`
- `--cdr-color-feedback-text-neutral-bold`
- `--cdr-color-feedback-border-neutral`
- `--cdr-color-feedback-text-neutral` (icon fill, via the text namespace — see open issue below)

This is deliberate: the component is wholly feedback (interaction is component-level,
not per-variant), and the mapping tells the token pipeline exactly which tokens are
missing. Legacy fallbacks preserve rendering until they ship.

### 6. Message Text Inherits Until Semantics Ship

Banner message has no legacy text token (it inherits). Its text slots therefore carry
no legacy fallback: while semantic tokens are unshipped the bare `var(--cdr-color-…)`
is invalid at computed-value time and preserves `inherit`; once shipped it applies
the identity text color.

## Banner Variants

### Default Banner (neutral identity, feedback family — tokens pending, see below)

```css
--cdr-banner-background: var(
  --cdr-color-feedback-surface-neutral,
  var(--cdr-color-background-message-default-01)
);
--cdr-banner-text: var(--cdr-color-feedback-text-neutral-bold);
--cdr-banner-border: var(
  --cdr-color-feedback-border-neutral,
  var(--cdr-color-border-message-default-01)
);
--cdr-banner-fill: var(--cdr-color-feedback-text-neutral, var(--cdr-color-icon-message-default));
```

### Info / Success / Warning / Error Banners (feedback identities)

```css
/* warning shown; info/success/error follow the same shape */
--cdr-banner-background: var(
  --cdr-color-feedback-surface-warning,
  var(--cdr-color-background-message-warning-01)
);
--cdr-banner-text: var(--cdr-color-feedback-text-warning-bold);
--cdr-banner-border: var(
  --cdr-color-feedback-border-warning,
  var(--cdr-color-border-message-warning-01)
);
--cdr-banner-fill: var(--cdr-color-feedback-text-warning, var(--cdr-color-icon-message-warning));
```

Shared (non-variant) properties stay on legacy tokens via the contract defaults:

- message-body background → `cdr-color-background-primary`
- icon-right fill → `cdr-color-text-emphasis`
- info-action fill → `cdr-color-text-link-rest` (future: identity `trigger`)

## Files Added / Modified

- `src/components/banner/CdrBanner.tokens.ts` — token contract with semantic mappings (new)
- `src/components/banner/styles/vars/CdrBanner.maps.scss` — generated SCSS maps (new; do not edit, run `pnpm build:maps`)
- `src/components/banner/styles/vars/CdrBanner.vars.scss` — color mixins removed; base mixin + `$left-border` kept
- `src/components/banner/styles/CdrBanner.module.scss` — consumes maps via `@each`, following `CdrButton.module.scss`
- `build/generate-component-maps.ts` — map names derived from the contract component (`$banner-*` vs `$button-*`); empty default groups skipped
- `build/component-variables-transfer.ts` — `CdrBanner.maps.scss` / `CdrBanner.vars.scss` registered in `SUPPORTED_COMPONENTS` so consumer builds receive them
- `docs/banner-semantic-implementation.md` — this file

## Breaking Notes (Same Trade-Offs as Button)

- The per-variant override API (`--cdr-banner-{type}-background-color`, …) is replaced
  by the single `--cdr-banner-*` chain, matching Button's migration. If override parity
  is required, it is a separate docgen/contract decision.
- No `.tokens.css` is generated: only the `action` family has a CSS behavior template.
  Banner consumes the SCSS maps directly (no recipe in the contract).

## Testing

To verify the implementation:

1. **Visual parity**: Banner should look identical to previous implementation
2. **Variant testing**: Test all five types (default, info, success, warning, error)
3. **Slot testing**: icon-left, icon-right, message-body, info-action slots
4. **Fallback testing**: Legacy tokens render while semantic tokens are unshipped

```bash
pnpm vitest run src/components/banner/__tests__/CdrBanner.spec.js
pnpm lint:styles
```

## Gaps Found (Feed Back Into the System)

1. **No `feedback.surface.neutral` (plus text/border) in Figma** — the contract maps
   `default` to these feedback-family tokens prospectively so the pipeline knows they
   are missing; design to add them to the `Visual Token Mapping & Examples` deck.
   Rendering is unaffected (legacy fallbacks) until they ship.
2. **Historical generator note:** the old PR generator resolved `icon` against the text namespace. The current generator emits `--cdr-color-{family}-icon-*` independently.
3. **One surface slot, two surfaces** (main background + icon tile) and **one border slot, two borders** (accent + thin outline). Components with layered surfaces need extended slots or compositional conditions; `extras` is legacy-only today.
4. **`feedback.icon.{info,success,warning}` source status is unverified here** — the current contracts preserve the published icon fallbacks and keep their icon role independent.
5. **Regeneration is self-stabilizing**: `pnpm build:maps` now pipes generator output
   through `oxfmt --write`, so committed maps files are canonical and regeneration
   is byte-stable (verified: re-running produces zero diff, including Button).

## For Other Engineers

Use Button (`src/components/button/CdrButton.tokens.ts`) and Banner
(`src/components/banner/CdrBanner.tokens.ts`) as the two reference contracts —
action/static-interactive vs. feedback/static — then follow
`docs/button-semantic-migration-guide.md`.
