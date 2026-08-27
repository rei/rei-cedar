# ADR: Component Token Contracts

**Status:** Prototype (CdrButton only)
**Date:** June 2026

## Problem

Component styling in Cedar has three pain points:

1. **Token coupling.** Components reference tokens by name (`tokens.$cdr-color-background-button-primary-rest`). Rename a token and the component breaks silently until Sass compilation catches it — no earlier, no clearer.

2. **SCSS-only consumers.** Non-template consumers (web components, vanilla HTML, non-Vue frameworks) must use the `component-variables` SCSS mixin pipeline. There is no plain CSS option.

3. **Duplicated behavior.** Components in the same interaction family (Button, Chip, Card) repeat the same state logic (hover thickens border, active adds inset ring, disabled grays out). This pattern is hand-written in each component's vars file.

## Decision

Introduce a **component token contract** — a TypeScript file per component that declares what the component needs from the token system. A generator reads the contract and produces:

- **SCSS maps** (`CdrButton.maps.scss`) — consumed by the module file for the CSS Modules build
- **Flat CSS** (`CdrButton.css`) — consumed by non-SCSS consumers directly

The state behavior (how hover/active/disabled work) is encoded in a **family template** — a shared TypeScript module per interaction family. The contract provides DATA (which tokens, which variants); the family template provides BEHAVIOR (how states work).

## Architecture

```
build/
  component-tokens/
    types.ts                      ← TypeScript vocabulary (Intent, Identity, DepthMap, etc.)
    families/
      action.ts                   ← Behavior template for action-family components
  generate-component-maps.ts      ← Generator: contract → SCSS maps + CSS

src/components/button/
  CdrButton.tokens.ts             ← Contract (source of truth for this component)
  styles/
    CdrButton.css                 ← GENERATED: flat CSS for non-SCSS consumers
    CdrButton.module.scss         ← Module: inlines base behavior, iterates maps
    vars/
      CdrButton.maps.scss        ← GENERATED: SCSS maps for the module file
      CdrButton.vars.scss        ← Special case mixins + backward-compat aliases
```

### Data flow

```
CdrButton.tokens.ts ──┬──> generate-component-maps.ts ──┬──> CdrButton.maps.scss  (SCSS maps)
                       │                                  └──> CdrButton.css        (flat CSS)
                       │
                       └──> action.ts family template (provides state behavior)
```

### How the contract reads

```typescript
const contract: ComponentTokenContract = {
  component: 'cdr-button',
  prefix: '--cdr-button',
  family: 'action',

  defaults: {
    'radius': 'cdr-radius-softer',        // token reference → var(--cdr-radius-softer)
    'font-weight': 500,                    // literal value
    'background': 'transparent',           // literal value
    ...
  },

  variants: {
    primary: {
      intent: 'action', identity: 'brand',
      //             bg                fg              edge
      rest:     { bg: 'brand',       fg: 'brand',     edge: 'brand' },
      hover:    { bg: 'brand-faint', fg: 'brand-faint', edge: 'brand-faint' },
      ...
    },
  },

  sizes: {
    small:  { 'font-size': '1.4rem', 'padding': 'cdr-space-inset-three-quarter-x-squish', ... },
    medium: { ... },
    large:  { ... },
  },

  legacy: { ... },   // ← TEMPORARY — see below
};
```

Each variant maps three depths (`bg` → surface, `fg` → text, `edge` → border) to semantic token suffixes across four states. The generator builds dual-value CSS:

```css
--cdr-button-background: var(--cdr-color-action-surface-brand, var(--cdr-color-background-button-primary-rest));
                          ↑ future semantic token                ↑ current legacy fallback
```

### What the module file looks like

The module file owns the standard path directly — no base mixin indirection:

```scss
.cdr-button {
  // Resets
  border: none; cursor: pointer; display: inline-flex; ...

  // Defaults from map
  @each $key, $value in maps.$button-defaults {
    --cdr-button-#{$key}: #{$value};
  }

  // Applied styles
  background-color: var(--cdr-button-background);
  color: var(--cdr-button-text);
  ...

  // States
  &:hover, &:focus { @include _state-colors(hover); box-shadow: ...; }
  &:active         { @include _state-colors(active); box-shadow: ...; }
  &[disabled]      { @include _state-colors(disabled); box-shadow: ...; }

  // Variants — each sets custom properties from map
  @each $variant, $colors in maps.$button-colors {
    &--#{$variant} {
      @each $key, $value in $colors { --cdr-button-#{$key}: #{$value}; }
    }
  }

  // Special cases (structural overrides, not just data)
  &--link { @include vars.cdr-button-link-mixin; }
  &--icon-only { @include vars.cdr-button-icon-only-mixin; ... }
}
```

## What is temporary

### 1. The `legacy` section in the contract

The `legacy` map bridges current `@rei/cdr-tokens` variable names to the dual-value CSS pattern. It produces the fallback in:

```css
var(--cdr-color-action-surface-brand, var(--cdr-color-background-button-primary-rest))
```

**Delete when:** semantic tokens ship in `@rei/cdr-tokens`. The generator then produces clean `var(--cdr-color-action-surface-brand)` without fallbacks.

### 2. Backward-compat aliases in `CdrButton.vars.scss`

The bottom half of the vars file contains named mixin aliases (`cdr-button-primary-mixin`, `cdr-button-base-mixin`, etc.) for `component-variables` SCSS consumers.

**Delete when:** consumers migrate to `CdrButton.css` class-based usage. The vars file then shrinks to just the four special case mixins (link, icon-only, with-background, elevated).

### 3. The special case mixins themselves

Link, icon-only, with-background, and elevated are structural variants that override the standard action-family pattern (different box-shadow construction, different layout, different pseudo-class behavior).

**Delete when:** these variants are either:

- Added to the contract with their own state maps (if their pattern is data-driven)
- Moved to their own family template (if they represent a genuinely different behavior pattern, e.g. a "link family")
- Kept hand-written (if they're truly one-off structural overrides)

### 4. The generated files are committed (not gitignored)

`CdrButton.maps.scss` and `CdrButton.css` are generated but committed to the repo. This is intentional during the prototype phase — `component-variables` consumers `@use` the maps file directly, and we want the CSS file reviewable.

**Revisit when:** a CI step runs the generator. Then generated files can be gitignored and produced at build time.

## How to templatize this for another component

### Step 1: Identify the family

Does the component belong to an existing interaction family?

| Family        | Pattern                                                                                       | Components                       |
| ------------- | --------------------------------------------------------------------------------------------- | -------------------------------- |
| **action**    | Rest → hover thickens border + raises elevation → active adds inset ring → disabled grays out | Button, Chip, Card, ToggleButton |
| **selection** | Unselected/selected axis + interaction states                                                 | Checkbox, Radio, ChipGroup       |
| **control**   | Input-focused interactions                                                                    | Input, Select, Textarea          |

If the family template exists (`build/component-tokens/families/{family}.ts`), skip to Step 2. If not, you'll need to write the template — extract the state behavior pattern from the existing vars file and parameterize it.

### Step 2: Write the contract

Create `src/components/{name}/Cdr{Name}.tokens.ts`:

1. **Audit the current vars file.** Open it and identify:
   - What custom properties exist → `defaults`
   - What color variants exist and how they map to tokens → `variants`
   - What sizes exist → `sizes`

2. **Map the variant colors to semantic suffixes.** For each variant × state × depth, determine:
   - The intent (action, selection, etc.)
   - The identity (brand, neutral, sale, etc.)
   - The suffix (the prominence/modifier after the identity)

3. **Build the legacy map.** For each variant property, record the current `@rei/cdr-tokens` variable name.

4. **Set the family.** Add `family: 'action'` (or whichever family applies).

Use `CdrButton.tokens.ts` as a reference.

### Step 3: Generate and verify

```bash
npm run build:maps          # generates .maps.scss + .css
```

Compare the generated SCSS maps against the hand-written originals:

```bash
# Save old output
npx sass src/components/{name}/styles/CdrButton.module.scss > /tmp/before.css

# Swap in generated maps, recompile
npx sass src/components/{name}/styles/CdrButton.module.scss > /tmp/after.css

diff /tmp/before.css /tmp/after.css
```

The diff should be empty (identical CSS output).

### Step 4: Restructure the module file

Move the base behavior from the vars file's base mixin into the module file directly (see the button's module file for the pattern). The vars file keeps only special case mixins.

### Step 5: Verify everything

```bash
npm run unit              # all tests pass
npm run build             # full build succeeds
npm run storybook         # visual verification
```

## Open questions

1. **Two-axis components.** Chips and checkboxes have both a selection axis AND an interaction axis. Their contracts may need nested variant dimensions.

2. **Token validation.** The generator doesn't currently validate that semantic token suffixes correspond to real tokens. Adding this would catch typos early.

3. **Generated-file CI.** Should the generator run in CI to ensure generated files stay in sync with contracts? A `build:maps` check step would catch drift.

4. **CSS output for special cases.** The flat CSS doesn't include link, icon-only, with-background, or elevated variants. These would need separate handling — either appended to the generated file or provided as supplementary CSS.
