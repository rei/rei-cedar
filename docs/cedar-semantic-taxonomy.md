# Cedar Semantic Taxonomy — Discovery & Alignment

**Status:** Confirmed against source material (Aug 2026), refined with component analysis (Sept 2026)
**Sources:**

- `Semantics - Color.pdf`, `Primitives - Color.pdf` (Figma-exported token/primitive decks)
- `Cedar Evolution: Strategic Shift.pptx` (Michelle Lam, Cedar Product Designer, Sept 2026)
- Working session with engineering (this document)

**Supersedes:** `docs/semantic-taxonomy-confluence.md` is an earlier, parallel effort using different
vocabulary (`intent`/`family`/`variant`, `on`/`edge`/`inverse` modifiers, 2D depth×intensity grid).
That document predates the model below and has not been reconciled with it. Treat this document as
current; treat the Confluence doc as historical input that needs re-validation against this model.

## The five-tier model

Confirmed verbatim from the strategic deck (slide 14):

```
FOUNDATION           "The system domain."
INTERACTION FAMILY   "Why the thing exists."
ROLE                 "What job it performs."
IDENTITY             "What it means."
EXPRESSION           "How strongly it expresses itself."
```

| Tier                   | Answers                                 | Values                                                                                                                                          |
| ---------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Foundation**         | What design-language primitive is this? | `color` (first formalized); size, shape, radius, spacing, typography, motion are the same kind of thing and will follow                         |
| **Interaction Family** | Why does this exist?                    | `action` \| `feedback` \| `selection` \| `control` — **omittable** (see below)                                                                  |
| **Role**               | What job does it perform?               | `surface` \| `text` \| `border` \| `icon`                                                                                                       |
| **Identity**           | What does it mean?                      | `brand` \| `accent` \| `warning` \| `success` \| `sale` \| `trigger` \| `neutral` \| `natural` \| `info` \| `membership` \| `rating` \| `error` |
| **Expression**         | How strongly should it express itself?  | `trace` \| `faint` \| `subtle` \| `base` \| `prominent` \| `bold` \| `intense` — **omittable** (see below)                                      |

Foundation is not "color, in a universal/global scope." It's the design-language foundation layer
generally — color is the first of several primitive systems (size, shape, radius, spacing,
typography, motion) that will eventually receive the same semantic treatment.

## Critical correction: omission is not a value

Interaction Family and Expression are **optional modifiers on the token path, not enumerations that
include a "none" or "default" member.**

- No interaction context → the segment is _absent_ from the token name:
  - `cdr-color-surface-brand` — not `cdr-color-universal-surface-brand`. There is no `universal`
    identity/interaction value; "universal" is what you get when you don't write an interaction
    segment.
- Base expression → the segment is _absent_ from the token name:
  - `color.surface.brand` **is** `color.surface.brand.base`. `base` is never written as a literal
    suffix in a real token name; it's the state of not appending an expression segment.

This means the type system must model these tiers as optional path segments with omission
semantics, not as required enums with placeholder values. A generator that always emits
`-base` or `-universal` is wrong.

## Confirmed token grammar

```
color[.interaction-family].role.identity[.expression]
```

Examples pulled directly from the source decks:

```
color.action.surface.brand.faint
color.action.surface.brand              (implicit .base)
color.feedback.surface.warning.bold
color.feedback.text.warning.bold
color.icon.accent                        (no interaction family — universal/foundation-only)
color.icon.accent.faint
color.icon.membership
color.icon.brand
color.icon.sale
color.icon.natural
color.surface.neutral.trace              (no interaction family)
color.text.brand                         (no interaction family, implicit .base)
```

## Identity list (confirmed, not the abbreviated deck slide list)

The strategic deck's summary slide lists a subset (`brand, accent, warning, success, sale, trigger,
neutral`) for space. The token decks confirm additional identities in active use:

```
brand | accent | warning | success | sale | trigger | neutral | natural | info | membership | rating | error
```

`neutral` and `natural` are **distinct identities**, not synonyms. Feedback tends to use
`info/success/natural/warning/error`; Action tends to use `brand/neutral/sale/trigger`.

## Role list (confirmed)

```
surface | text | border | icon
```

Icon is an **independently addressable role**, not derived from text by mirroring. Real tokens
confirm distinct values: `color.action.icon.neutral.bold` differs from `color.action.text.neutral.bold`.

## Retired / incorrect identities

The strategic deck explicitly calls out old, implementation-oriented naming as the thing being
replaced (slide 3: `PRIMARY BUTTON`, `INVERSE BUTTON`, `MODAL SURFACE` — "these names describe how
something is built, not what it means").

- **`inverse` is not an identity.** A "dark"/"inverse" button variant is `identity: neutral` at a
  `bold`/`intense` expression, not a separate identity value.
- **`link` is not an identity.** The identity for link/trigger-style interactive text is `trigger`.

## Primitive families (OKLCH, confirmed from `Primitives - Color.pdf`)

Each identity resolves to a primitive color family generated from an OKLCH chroma curve
(`C(L)` parameterized by `Cmax`, `Lo`, `Wlight`, `Wdark`, chroma floors):

| Identity          | Primitive family  | Hue |
| ----------------- | ----------------- | --- |
| trigger           | alpine-lake-blue  | 259 |
| info              | info-blue         | 200 |
| membership        | membership-text   | 173 |
| brand             | blue-spruce-green | 166 |
| _(unlabeled)_     | sage-green        | 158 |
| success           | success-green     | 146 |
| rating            | golden-yellow     | 78  |
| neutral           | warm-grey         | 82  |
| natural / default | natural-grey      | 89  |
| warning           | warning-yellow    | 92  |
| error             | error-red         | 30  |
| sale              | new-sale-red      | 39  |

Four additional unlabeled hues (120, 116, 104, 95) exist in the primitive deck and appear reserved
for future identities — not yet assigned.

## Expression is a hierarchy primitive, not a color concept

This is the single most important discovery from this round of review (originally surfaced via
Copilot analysis of the repeated `trace/faint/subtle/base/prominent/bold/intense` scale appearing
identically across every role and identity):

**Expression does not encode meaning. It encodes visual prominence.** The same seven-step scale
appears under `surface`, `text`, `border`, and `icon`, across every identity, because it isn't a
color-specific property — it's a **hierarchy primitive** that color happens to be the first system
to consume. The same scale should eventually apply to space, shape, motion, and other foundations
(e.g., a "bold" spacing rhythm, a "prominent" radius).

Practical implication: Expression should not be hard-coded per-identity as an arbitrary string
suffix. It should be a single shared enum (`trace | faint | subtle | base | prominent | bold |
intense`) that any foundation can reference, with the understanding that `base` is the
omission-default described above.

**Constraint:** Expression is not yet a universal runtime function (e.g., "reduce chroma by 30%
uniformly"). Each primitive family has different `Cmax`, `Lo`, curve widths, and chroma floors, so
the same expression step produces different absolute chroma/lightness deltas per identity. Expression
should be modeled as a relative hierarchy position resolved per-identity at build time into an
explicit token, not computed via a single runtime CSS color function.

## Interaction Family (refined Sept 2026)

```
action | feedback | selection | control
```

Definitions confirmed verbatim from the deck:

| Interaction Family | User perspective                                                                                                                                                                   | Example components                                                                                                                  |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Action             | Interactive elements that trigger user actions, navigation, content manipulation, or final submission                                                                              | CdrButton, CdrCard, CdrLink, CdrChip, CdrPagination, carousel arrows, media controls                                                |
| Feedback           | System communications that provide status information, validation results, or operational feedback (including inline validation on form controls)                                  | CdrBanner, CdrToast, CdrFormError, control error states                                                                             |
| Selection          | Interactive choice selection patterns where users select options (color, size, shipping method, etc.) that don't themselves submit data but are used in conjunction with an action | CdrSurfaceSelection, color swatches, size selectors, option tiles, variant choosers                                                 |
| Control            | The user is manipulating or configuring the interface itself (error states use FEEDBACK intent)                                                                                    | CdrInput, CdrSelect, CdrCheckbox, CdrRadio, CdrSwitch, CdrFormGroup, CdrLabelStandalone, CdrAccordion, show password, view controls |

**Key distinctions:**

- **CONTROL vs ACTION**: CONTROL = manipulating/configuring interface; ACTION = triggers actions/navigation/final submission
- **CONTROL vs SELECTION**: CONTROL = interface manipulation; SELECTION = choice selection submitted elsewhere (e.g., color swatch + "Add to Cart")
- **CONTROL vs FEEDBACK**: CONTROL = input mechanism (default, focus, disabled); FEEDBACK = system communication (error, success, warning states)

"Interaction Family" is one concept, not "family" as a generic grouping term (e.g. not a
component-family grouping like "Button/Chip/Card share a family"). Don't reuse the word `family`
elsewhere in the taxonomy for anything other than this tier.

## Relationship to component contracts (`build/component-tokens/`)

The button token contract prototype (`src/components/button/CdrButton.tokens.ts`,
`build/component-tokens/types.ts`) needs to be corrected to match this model:

- `ColorSlot` should be `surface | text | border | icon`, not the earlier invented
  `surface | content | edge`.
- Icon should be independently specified per variant/state, not mirrored from text by default.
- `ColorIdentity` should use the real identity list above, not the earlier invented
  `brand | neutral | sale | inverse | link`.
- The button's `dark` variant is `identity: neutral` at an intense expression — not a separate
  `inverse` identity.
- The button's `link` special case is `identity: trigger` — not a separate `link` identity.
- `interaction` (renamed from the earlier `family` property) should be optional, matching the
  omission convention, though CdrButton will always set it to `'action'`.
- Expression suffixes should omit `base` rather than emit it literally.

## What is NOT being acted on yet (flagged for future debate)

An open hypothesis, explicitly not to be implemented without further design discussion: Foundation
primitives (color, radius, spacing, typography, motion) may not just be structural building blocks —
each may be expressing something at a higher semantic layer:

```
Color      → expresses emotion
Radius     → expresses approachability / selectability / relatability
Spacing    → expresses rhythm
Typography → expresses voice
Motion     → expresses personality
```

...composing into holistic mechanisms that map to customer intent (deck slide 24's "Intent System"
tier): _help the customer decide, help the customer act, help the customer understand._ This is a
compelling framing but is speculative pending design debate — do not build against it yet.

## Ladder from customer intent to implementation (confirmed, deck slide 24)

```
LEVEL 3 — Intent System        Help the customer decide / act / understand
LEVEL 2 — Semantic System       Action | Feedback | Selection | (Control)
LEVEL 1 — Component System      button.primary, card.default
```

Cedar's semantic taxonomy work (this document) sits at Level 2, translating Level 3 customer intent
into a consistent system grammar that Level 1 component implementations then express per platform.
