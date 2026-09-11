# ADR: Component Token Contracts — The Semantic Contract Layer

**Status:** Prototype (CdrButton only)
**Date:** June 2026, vocabulary corrected August 2026, intents refined September 2026, architectural positioning added September 2026
**See also:** `docs/cedar-semantic-taxonomy.md` — the confirmed taxonomy this contract's
vocabulary must stay in sync with. The taxonomy was refined in Sept 2026 to clarify the
distinction between CONTROL (interface manipulation) vs SELECTION (choice selection) vs ACTION
(trigger actions/navigation). This ADR defines the semantic contract layer between taxonomy
and platform implementations.

## Problem

Component styling in Cedar has three pain points:

1. **Token coupling.** Components reference tokens by name (`tokens.$cdr-color-background-button-primary-rest`). Rename a token and the component breaks silently until Sass compilation catches it — no earlier, no clearer.

2. **SCSS-only consumers.** Non-template consumers (web components, vanilla HTML, non-Vue frameworks) must use the `component-variables` SCSS mixin pipeline. There is no stable CSS styling interface that does not require compiling Cedar's internal Sass.

3. **Duplicated data.** Components in the same interaction family (Button, Chip, Card) repeat the same color variant matrices. The _data_ is the same; only the semantic values differ.

## Architectural Position

Cedar defines a shared interaction language. Semantic tokens express that language. Component contracts bind semantic meaning to component capabilities. Platform implementations render those contracts.

This ADR defines the component contract layer — the bridge between semantic taxonomy and platform-specific implementations.

```
Interaction Language
       ↓
Semantic Tokens
       ↓
Component Contract
       ↓
Generator
       ↓
Web | iOS | Android | Docs | Storybook | (Future: AI)
```

**Why this matters:**

- **Semantic tokens** define the shared interaction language (ACTION, CONTROL, SELECTION, FEEDBACK)
- **Component contracts** bind semantic meaning to component capabilities in a type-safe way
- **Generators** produce platform-specific outputs (CSS, iOS, Android, documentation)
- **Platform implementations** render generated contracts

This layer enables:

- Component migration from component tokens to semantic tokens
- Schema generation for tooling and validation
- Storybook generation with semantic token context
- iOS and Android support from a single source of truth
- Potential future consumers include AI systems for semantic understanding

## Future State

The current implementation generates SCSS maps and CSS from component contracts. The target architecture is a schema-based system where component contracts generate canonical schemas that feed multiple platform outputs.

**Today (Sass Architecture):**

```
Semantic Tokens
       ↓
Component Contracts
       ↓
SCSS Maps
       ↓
CSS
```

**Future (Schema Architecture):**

```
Semantic Tokens
       ↓
Component Contracts
       ↓
Canonical Schema
       ↓
Web | iOS | Android | Storybook | Documentation | (Future: AI Context)
```

**Implementation Timing:** This architectural shift should be pursued incrementally:

1. **Phase 1 (Current):** Prove contract layer with SCSS/CSS generation
2. **Phase 2:** Expand to 3-4 components before building recipe infrastructure
3. **Phase 3:** Implement foundationAssignments when space/typography/prominence are semanticized
4. **Phase 4:** Build canonical schema generation when multi-platform needs are clear
5. **Phase 5:** Add platform-specific generators when iOS/Android requirements are defined

This architectural shift is critical because it positions component contracts as the single source of truth for all platform outputs, not just CSS generation. The canonical schema enables:

- Platform-specific code generation (CSS, iOS Swift, Android Kotlin)
- Documentation generation with semantic context
- Storybook integration with proper token understanding
- (Future) AI context generation with structured semantic information
- Cross-platform consistency from a single contract

## Decision

Introduce a **typed component token contract** for each component. The contract declares the styling capabilities, semantic-token dependencies, and visual recipe required by that component.

A build-time generator will:

- Validate each contract against the published token manifest.
- Generate SCSS maps used by Cedar's internal component styles.
- Generate CSS custom-property assignments for consumers that do not compile Sass.

Components will be associated with an **interaction family** that defines the supported interaction-state model. Reusable visual behavior will be represented through explicit **recipes** rather than being inferred solely from the interaction family.

**Recipe System Discipline:** While recipes are a valuable abstraction, recipe system expansion (recipe engines, generators, dispatch, inheritance) should be deferred until at least 3-4 components share the same recipe patterns. Button alone cannot prove recipe architecture. Start with simple recipe labels and only build recipe infrastructure when clear reuse patterns emerge across multiple components.

### Ownership boundary

This is the most important clause in this ADR:

**Component contracts own generated token assignments. Component modules continue to own structural CSS, layout, selectors, and genuinely component-specific behavior.**

The family template is a _schema_ that defines which color slots and interaction states a component must populate. It does not own the selectors or the visual effects.

## Architecture

```
build/
  component-tokens/
    types.ts                        # Contract vocabulary types
    validate.ts                     # Contract validation against token manifest
    families/
      action.ts                     # Token-assignment schema for action family
  generate-component-maps.ts        # Generator: contract → SCSS maps + CSS

src/components/button/
  CdrButton.tokens.ts               # Component contract
  styles/
    CdrButton.tokens.css            # GENERATED: custom-property assignments
    CdrButton.module.scss           # Component module: base, selectors, special cases
    vars/
      CdrButton.maps.scss          # GENERATED: SCSS maps
      CdrButton.vars.scss          # Special-case mixins + backward-compat aliases
```

### Vocabulary

This contract's vocabulary is derived directly from the confirmed Cedar semantic taxonomy. See
**`docs/cedar-semantic-taxonomy.md`** for the full discovery record (sourced from
`Semantics - Color.pdf`, `Primitives - Color.pdf`, and the `Cedar Evolution: Strategic Shift`
deck). Do not treat the list below as independently authored — it must stay in sync with that
document.

```typescript
type Interaction = 'action' | 'feedback' | 'selection' | 'control'; // omittable — see below
type ColorRole = 'surface' | 'text' | 'border' | 'icon';
type ColorIdentity =
  | 'brand'
  | 'accent'
  | 'warning'
  | 'success'
  | 'sale'
  | 'trigger'
  | 'neutral'
  | 'natural'
  | 'info'
  | 'membership'
  | 'rating'
  | 'error';
type Expression = 'trace' | 'faint' | 'subtle' | 'base' | 'prominent' | 'bold' | 'intense'; // omittable — see below
type InteractionState = 'rest' | 'hover' | 'focus-visible' | 'active' | 'disabled'; // component-behavior concept, not a taxonomy tier
type VisualRecipe = 'pressable' | 'text-action' | 'elevated' | 'icon-only' | 'outlined';
```

Two corrections from an earlier draft of this ADR, now fixed in code:

- The roles are `surface | text | border | icon` — **not** `surface | content | edge`. Icon is an
  independently addressable role, not mirrored from text.
- `inverse` and `link` are **not** identities. A "dark" button variant is `identity: neutral` at an
  intense expression. Link/trigger text is `identity: trigger`.

**Omission is not a value.** Interaction and Expression are optional path segments, not required
enums with a "none"/"default" member:

- No interaction context → the segment is absent: `cdr-color-surface-brand`, never
  `cdr-color-universal-surface-brand`.
- Base expression → the segment is absent: `color.surface.brand` **is**
  `color.surface.brand.base`. `base` is never written literally.

**Note on Identity axis:** The current taxonomy intentionally models all semantic identities
through a single Identity axis. This has proven sufficient for the initial semantic color
foundations and component-contract prototype. Future taxonomy work may further refine the
Identity axis if additional foundations, palettes, or interaction families demonstrate that
certain identities represent fundamentally different concepts (e.g., feedback-specific
identities like warning/success/error vs broader identities like brand/sale/membership).
Such a distinction remains exploratory and should not be introduced until a clear semantic
or implementation benefit has been demonstrated.

### Contract example

```typescript
const contract: ComponentTokenContract = {
  component: 'cdr-button',
  prefix: '--cdr-button',
  interaction: 'action',
  recipe: 'pressable',

  // Foundation assignments (future structure)
  foundationAssignments: {
    color: {
      // Color token references
    },
    radius: {
      // Radius token references
    },
    typography: {
      // Typography token references
    },
    prominence: {
      // Elevation/prominence token references
    },
    space: {
      // Spacing token references
    },
  },

  defaults: {
    // Legacy flat structure - will migrate to foundationAssignments
    radius: token('cdr-radius-softer'),
    'font-weight': literal(500),
    background: literal('transparent'),
    'elevation-focus-visible': token('cdr-prominence-raised'),
    // ...
  },

  variants: {
    primary: {
      identity: 'brand',
      rest: { surface: 'brand', text: 'brand', border: 'brand', icon: 'brand' },
      hover: {
        surface: 'brand-faint',
        text: 'brand-faint',
        border: 'brand-faint',
        icon: 'brand-faint',
      },
      'focus-visible': {
        surface: 'brand-faint',
        text: 'brand-faint',
        border: 'brand-faint',
        icon: 'brand-faint',
      },
      active: { surface: 'brand', text: 'brand', border: 'brand', icon: 'brand' },
      disabled: {
        surface: 'neutral-trace',
        text: 'disabled',
        border: 'neutral-trace',
        icon: 'disabled',
      },
      extras: { 'active-inset': null },
    },
  },

  sizes: {
    small: {
      'font-size': literal('1.4rem'),
      padding: token('cdr-space-inset-three-quarter-x-squish'),
      // ...
    },
  },

  legacy: {
    /* temporary fallbacks */
  },
};
```

Token references are explicit: `token('cdr-radius-softer')` vs `literal(500)`. Note there is no
`on-brand` suffix — the real token is `color.action.text.brand`, text is its own role under the
same identity, not an `on-*` derivative of surface.

### Generated output

```scss
// CdrButton.maps.scss (excerpt)
$button-colors: (
  primary: (
    background: var(
        --cdr-color-action-surface-brand,
        #{tokens.$cdr-color-background-button-primary-rest}
      ),
    text: var(--cdr-color-action-text-brand, #{tokens.$cdr-color-text-button-primary}),
    border: var(--cdr-color-action-border-brand, #{tokens.$cdr-color-border-button-primary-rest}),
    fill: var(--cdr-color-action-text-brand, #{tokens.$cdr-color-text-button-primary}),
    background-hover: var(
        --cdr-color-action-surface-brand-faint,
        #{tokens.$cdr-color-background-button-primary-hover}
      ),
    text-hover: var(
        --cdr-color-action-text-brand-faint,
        #{tokens.$cdr-color-text-button-primary-hover}
      ),
    background-focus-visible: var(
        --cdr-color-action-surface-brand-faint,
        #{tokens.$cdr-color-background-button-primary-hover}
      ),
    // ...
    active-inset: #{tokens.$cdr-color-border-button-primary-active-inset},
  ),
);
```

```css
/* CdrButton.tokens.css (excerpt) */
.cdr-button {
  --cdr-button-radius: var(--cdr-radius-softer);
  /* ... */
}

.cdr-button--primary {
  --cdr-button-background: var(
    --cdr-color-action-surface-brand,
    var(--cdr-color-background-button-primary-rest)
  );
  /* ... */
}
```

### Module file separation of concerns

The module file owns the standard action pressable recipe:

```scss
.cdr-button {
  // Resets, applied styles, layout, icon spacing

  &:hover {
    @include _state-colors(hover); /* shadow */
  }
  &:focus-visible {
    @include _state-colors(focus-visible); /* shadow */
  }
  &:active {
    @include _state-colors(active); /* shadow */
  }
  &[disabled] {
    @include _state-colors(disabled); /* shadow */
  }

  // Variants, sizes, special cases
}
```

Focus is **not** treated as hover. They are independent states with independent token assignments. Focus treatment may overlay rest, hover, selected, or invalid states in more complex components.

## What is temporary

### 1. The `legacy` section in the contract

The `legacy` map bridges current `@rei/cdr-tokens` variable names to the dual-value CSS pattern.

**Delete when:** semantic tokens ship in `@rei/cdr-tokens` and the contract's semantic suffixes resolve without fallbacks.

### 2. Backward-compat aliases in `CdrButton.vars.scss`

Named mixin aliases (`cdr-button-primary-mixin`, `cdr-button-base-mixin`, etc.) support `component-variables` SCSS consumers.

**Delete when:** consumers migrate to `CdrButton.tokens.css` class-based usage.

### 3. Special case mixins

Link, icon-only, with-background, and elevated are structural variants that override the standard pressable recipe.

**Delete when:** they are:

- Added to the contract with their own state maps (if data-driven)
- Moved to their own recipe under the action family (if the visual pattern is reusable)
- Kept hand-written (if they are truly one-off structural overrides)

### 4. Generated files are committed

`CdrButton.maps.scss` and `CdrButton.tokens.css` are generated and committed.

**Revisit when:** CI runs the generator and fails on drift. The stronger position is:

```bash
npm run build:maps
# Regenerate and commit; CI verifies generated artifacts are synchronized with contracts.
```

## Scope of the flat CSS output

`CdrButton.tokens.css` is **not** a complete component stylesheet. It is the token-assignment layer: the set of custom properties each variant and size must define before the component's structural CSS can render correctly.

It does **not** include:

- Link, icon-only, with-background, or elevated special cases
- Structural resets, layout, and pseudo-class effects
- Component-specific selectors and responsive breakpoints for special cases

A future `CdrButton.css` (without `.tokens`) could append the token-assignment layer to the full structural stylesheet. For now, the split keeps the scope honest: the contract generates token data; the module owns component behavior.

## How to templatize this for another component

### Step 1: Identify the interaction family and recipe

### Step 1: Identify the interaction family and recipe

Does the component belong to an existing interaction family? Does it need a new recipe?

**Important:** Components do not define interaction intent — usage does. A single component can serve different interaction intents depending on context:

- **Checkbox**: Can be CONTROL (form submission) or SELECTION (choice selection)
- **Chip**: Can be ACTION (navigation), SELECTION (filter choice), or CONTROL (form input)
- **Accordion**: Can be CONTROL (show/hide content) or SELECTION (active section)

The interaction family table below defines the **semantic intent**, not component classification:

| Interaction Family | User Intent                                             | State model                                                                              | Recipes                                                                           |
| ------------------ | ------------------------------------------------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **action**         | "I want something to happen"                            | rest, hover, focus-visible, active, disabled                                             | pressable, text-action, elevated, icon-only                                       |
| **selection**      | "This is the option I want"                             | rest, hover, focus-visible, active, disabled, selected                                   | selectable, toggle, chip                                                          |
| **control**        | "I am manipulating or configuring the interface itself" | rest, hover, focus-visible, active, disabled, invalid (error states use feedback intent) | input, dropdown, checkbox, radio, switch, accordion, show password, view controls |
| **feedback**       | "The system is telling me something"                    | rest (mostly static, no interaction states)                                              | banner, toast, inline-error                                                       |

**Key distinctions (refined Sept 2026):**

- **CONTROL vs ACTION**: CONTROL = manipulating/configuring interface; ACTION = triggers actions/navigation/final submission
- **CONTROL vs SELECTION**: CONTROL = interface manipulation; SELECTION = choice selection submitted elsewhere (e.g., color swatch + "Add to Cart")
- **CONTROL vs FEEDBACK**: CONTROL = input mechanism (default, focus, disabled); FEEDBACK = system communication (error, success, warning states)
  | **feedback** | rest (mostly static, no interaction states) | banner, toast, inline-error | Banner, Toast, FormError |

### Step 2: Write the contract

Create `src/components/{name}/Cdr{Name}.tokens.ts`:

1. Identify custom properties → `defaults`
2. Identify color variants and semantic slot mappings → `variants`
3. Identify sizes → `sizes`
4. Map current tokens to the `legacy` section

Use `CdrButton.tokens.ts` as the reference.

### Step 3: Validate and generate

```bash
npm run build:maps
```

The generator will warn about unknown token references and fail on malformed contracts.

### Step 4: Verify visual parity

```bash
npx sass src/components/{name}/styles/Cdr{Name}.module.scss > /tmp/after.css
# diff against the original if one exists
```

### Step 5: Restructure the module file

Move base behavior from the vars file's base mixin into the module file. Keep special cases in the vars file.

## Open questions

1. **Two-axis components.** Chips and checkboxes have both a selection axis and an interaction axis. Their contracts may need composable conditions (`selected`, `checked`) layered over the base variant.

2. **Token-manifest integration.** The generator currently loads `@rei/cdr-tokens` JSON foundations and an optional `canonical/tokens.json` for semantic tokens. A single published `tokens.json` manifest would be preferable.

3. **Recipe implementation.** Recipes are currently only labels. A future generator could dispatch to recipe-specific token-assignment templates.

4. **CSS completeness.** When should `CdrButton.tokens.css` grow into a full `CdrButton.css`?

## Acceptance criteria for leaving prototype

- [ ] A second component (ideally with overlapping state axes, e.g. Chip or ToggleButton) reuses the architecture without adding Button-specific logic to the shared family.
- [ ] Token validation catches unknown references and missing semantic combinations with actionable errors.
- [ ] The non-Sass CSS path has a documented and testable scope.
- [ ] Hover, focus-visible, active, and disabled are independently represented in every contract.
- [ ] Generated artifacts are verified in CI.
- [ ] Visual parity is confirmed by diff and Storybook before the prototype is declared complete.
