# Component semantic color rollout

**Start here.** This is the current authoring guide and decision record. `docs/cedar-semantic-taxonomy.md`
is the original discovery record. `docs/banner-semantic-implementation.md` and
`docs/action-semantic-implementation.md` are frozen historical notes from the early
proof-of-concept — they remain for archaeology only; open items live in the gap
register below, not in those files.

Components used to choose colors by their current appearance: a button asked for “green,” an input asked for a legacy gray, and an icon often followed text by accident. That makes a new theme hard to build and makes the code describe the paint instead of the purpose. Semantic tokens fix that by letting a component say what a color does—surface, text, border or icon—and why it exists—action, control, selection or feedback—while the theme supplies the actual value.

Every choice below follows three practical rules: preserve the current rendered color through a legacy fallback, give text and icons separate controls, and model only states the component really renders. This keeps the migration safe today and gives future palettes clear places to plug in.

The completed work maps **42 color-owning components** to generated contracts: **36 new contracts** and refinements to the six components in [PR #249](https://github.com/rei/rei-cedar/pull/249). Those contracts produce **416 assignments across 126 semantic names**, wire into each component’s existing Sass variables, and keep public custom-property overrides working. Layout-only and composition components inherit the colors of the components they compose.

The rest of this document explains the decisions in plain language, shows where each component landed, and records the checks that prove the migration is complete.

## What the PR is building

The [Button contract commit](https://github.com/rei/rei-cedar/commit/96130ffe4) makes TypeScript the source of component assignments and generates Sass maps and an optional CSS assignment layer. The [taxonomy refinement](https://github.com/rei/rei-cedar/commit/dd882636f) separates interaction intent from presentation. The [Banner migration](https://github.com/rei/rei-cedar/commit/baa96b707) applies feedback intent; the [Link, Pagination, Chip and Card migration](https://github.com/rei/rei-cedar/commit/2724a35e2) demonstrates action, selection and foundation-only usage.

The intention is a gradual change in the source of styling decisions. Components ask for a meaningful role; themes eventually supply its color. Existing selectors, behavior and legacy values bridge the migration. This rollout follows that approach and keeps space, shape, typography, motion and prominence in their current foundations.

## Mapping decisions

Paths follow `color[.interaction].role.identity[.expression]`, with hyphens in CSS. Omit the interaction for content and foundations. Omit the expression for base. States such as hover, checked and disabled belong to component slots, not to the semantic vocabulary.

| Pattern                          | Assignment                                                                 | Reason                                                                                              |
| -------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Neutral canvas and reading text  | `surface-neutral-trace`, `text-neutral`                                    | A container is not an action just because it contains a link (Card is a decided exception, see G2). |
| Supporting content               | `text-neutral-subtle`                                                      | Describes hierarchy without naming a specific gray.                                                 |
| Input and disclosure affordances | `control-{role}-neutral`                                                   | Configuring values and visible content share control intent.                                        |
| Checked controls                 | Stronger neutral surface and independent contrasting icon                  | Selection is not automatically a success message.                                                   |
| Choice tiles and grouped options | Selection surface faint at rest, base on interaction, subtle when selected | Extends Chip's established expression sequence to ToggleButton and SurfaceSelection.                |
| Validation and status            | `feedback-{role}-{identity}`                                               | An error crosses the control's neutral context into feedback.                                       |
| Disabled treatment               | Neutral faint text/icon, family-specific muted surface                     | Disabled is a behavior, not an identity. Keep it distinct from ordinary supporting text.            |
| Icons and text                   | Independent `icon` and `text` roles                                        | Themes can tune visual weight independently even when legacy values coincide.                       |
| Image overlay                    | Neutral endpoints; opacity stays in CSS                                    | Theme the color while retaining the existing fade.                                                  |

Expressions describe the intent of each role; they are not a universal lightness ladder or an automatic rule that every hover becomes faint. Inverse text can use a strong expression while remaining a light color on a dark surface. Focus, disabled and checked selectors retain the component's existing state precedence. Surface intentionally lets checked styling win when a surface is both checked and disabled; its native or ARIA disabled state still controls interaction. Contracts call the focus slot `focus-visible` because it names the keyboard intent, while legacy modules that use broad `:focus` keep that selector to preserve established pointer behavior.

The checked, unchecked, disabled and focused treatments are separate where the component renders them. For example, a disabled unchecked radio dot follows its surrounding surface so it stays invisible; it must not adopt the visible disabled-icon color.

## Coverage

Names below omit the `Cdr` prefix. Companion elements share their owning component's contract.

| Primary context         | Components                                                                                                                                               |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Action                  | Button, Link, Pagination, Breadcrumb, Filmstrip                                                                                                          |
| Control                 | Input, Select, Checkbox, Radio, LabelStandalone, LabelWrapper, FormGroup, Accordion, Tabs, Switch, SurfaceScroll                                         |
| Selection               | Chip, ToggleButton (including ToggleGroup), SurfaceSelection                                                                                             |
| Feedback                | Banner, FormError, Toast, FulfillmentTile (status icon), Skeleton                                                                                        |
| Content and foundations | Abstract, Title, Kicker, Caption, Quote, Text, List, Icon, Card, LandingLead, SplitSurface, Popup, Table, Modal, Tooltip, Rating, Surface, ObjectOverlay |

A component's primary context does not constrain every child role. Accordion content uses foundation text, its disclosure uses control, and a validation message uses feedback. Surface status borders use feedback while its canvas remains a foundation. Filmstrip buttons inherit Button semantics; Filmstrip only owns its focus border. Composition-only components such as SurfaceNavigation inherit Surface and their child components.

## Authoring and editing

1. Trace the rendered property, all selectors that change it, and its public custom property overrides.
2. Reuse a semantic role because its purpose matches, not merely because its current hex value matches.
3. Add only consumed slots. Static components need no invented hover or disabled matrix. Use variants for actual variants and named defaults for specific slots.
4. Keep every published legacy fallback. Use a literal only for intentional CSS values that have no published token.
5. Generate maps, check them, and exercise the affected states with and without semantic overrides.

### When to omit `interaction`

Omission IS the universal case — there is no `universal` value. Omit the family
segment for content and foundation canvases that carry no interaction meaning:
`Surface`, `Text`, `Abstract`, and Accordion content. A container is not an action
just because it contains a link — with one decided exception: `Card` canvas was
assigned `action.surface.neutral.trace` + `action.text.neutral.bold` per the team's
Figma answers (an `action.surface.neutral.trace` row sits in the Card band; Card's
clickable overlay escapes to `action-text-trigger` on hover). When canvas and tint
meanings collide, the decider is design, not engineering.

```ts
import type { ComponentTokenContract } from '../../../build/component-tokens/types';
import { semantic, token } from '../../../build/component-tokens/types';

const contract: ComponentTokenContract = {
  component: 'cdr-example',
  prefix: '--cdr-example',
  interaction: 'control',
  defaults: {
    text: semantic('control-text-neutral', token('cdr-color-text-input-default')),
    'error-border': semantic('feedback-border-error', token('cdr-color-border-input-error')),
  },
  variants: {},
};
export default contract;
```

```scss
@use './vars/CdrExample.maps' as maps;
@use 'sass:map';

.cdr-example {
  color: var(--cdr-example-text, #{map.get(maps.$example-defaults, text)});
}
```

The generated Sass value resolves semantic CSS variable → runtime legacy CSS variable → compiled Sass fallback. Existing component overrides remain outside that expression. The optional Button CSS assignment artifact uses the same semantic and legacy names but still requires the published legacy CSS variable stylesheet; it is an assignment layer, not a standalone component stylesheet.

`pnpm build:maps` formats and writes generated files. `pnpm check:maps` compares them without writing. `pnpm check:tokens` checks the build-time types excluded from the runtime package's type build. `pnpm test:tokens` checks taxonomy, published fallback references, component coverage, independent roles, sparse states and consumed slots. Lint and CI include the new checks. No dependency was added.

`pnpm build:variables [destination]` exports every generated map with the existing supported mixins. The aggregate Sass entry forwards the copied modules, avoiding repeated `@use` namespace declarations from concatenation. Ship the directory together with its entry file.

## Improvements discovered during integration

- Ran five independent Luna adversarial reviews covering taxonomy, fallback chains, generation, accessibility and documentation; their findings drove the validator guards, native disabled behavior, consecutive-disabled tab navigation, halo literals and the provenance wording below.
- Removed fabricated Banner states and unconsumed Link, Pagination and Card slots. Kept the complete pressable matrix for Button's actual recipe.
- Corrected disabled and foundation paths that did not fit the taxonomy. Card canvas uses `action.surface.neutral.trace` + `action.text.neutral.bold` per the team's Figma answers (see G2). Card links stay neutral at rest and switch to `action-text-trigger` only on hover.
- Preserved runtime legacy variables in variant maps as well as named defaults. This restores the existing membership palette's primary Button background and border (`#13352c`), which the PR's compiled Sass fallback had bypassed.
- Added strict errors for unknown legacy tokens, malformed semantic names, unused fallbacks and unimplemented contract features. If a canonical semantic manifest is supplied, requested names must exist there.
- Made the validator reject unknown interaction families, identities and variant fields before generation.
- Gave Banner text, icon tile, outline and halo their own consumed assignments; error text and icons no longer share a semantic role by accident.
- Made Tabs' default gradient follow its semantic canvas while retaining the explicit `backgroundColor` prop. The changed snapshot records that intentional CSS-variable default.
- Replaced ObjectOverlay's hardcoded endpoints with semantic neutral colors while retaining alpha through native `color-mix()`.
- Kept the white icon halo literal in Banner, Toast and FulfillmentTile. It sits on a colored tile and must not change when a future theme redefines a neutral canvas; a dedicated halo token can replace it when that role is specified.
- Corrected Surface state assignments to use its state variables and actual ARIA/native checked and disabled selectors. Explicit state props take precedence over SurfaceSelection defaults. Regression tests cover checked, disabled, hover and focus overrides.
- Removed Filmstrip's obsolete Button overrides and repaired Checkbox's missing active-icon Sass fallback.

## Open gap register

The prospective names below are requested, not confirmed. Everything renders today
through legacy fallbacks; the risk column states what changes on ship day if a gap
is still unfilled. Owner defaults to Design unless named; engineering tracks this
table, not chat threads.

| #   | Needed deck names                                                                                                                                                 | Used by                        | Post-ship behavior if unfilled                                                                                                                | Owner / next step                          |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| G1  | `feedback.surface/text/border.neutral` (+ `text-neutral-bold`; only `border.neutral.trace` exists)                                                                | Banner default, Toast default  | Surfaces stay legacy; Banner message text flips `inherit` → new color whenever the name appears — gate palette publication on contrast review | Design: add or reject; eng: keep fallbacks |
| G2  | Card canvas: `action.surface.neutral.trace` + `action.text.neutral.bold` (as coded, per team Figma answers; supersedes the earlier universal proposal)            | Card                           | Canvas stays legacy either way; an `action.surface.neutral.trace` row sits in the Card band                                                   | **Decided by design team; recorded here**  |
| G3  | Chip selected depth beyond `subtle` (no bold/intense selection surface exists; selected `#d5cfc3` is darker than pressed `#edeae3` yet both map `subtle`)         | Chip selected                  | Selected and pressed converge at `subtle`                                                                                                     | Design: accept ceiling or add a step       |
| G4  | Link states: `trigger` / `trigger-faint` / `trigger-bold` with rest / hover-focus / active labels in Figma; legacy rest=hover `#406eb5`, active darkest `#0b2d60` | Link, Button-link, Breadcrumb  | Coded rest=trigger, hover=faint (new-model intent), active/focus=bold (legacy darkness); hover shift is new behavior                          | Design: confirm; recorded here             |
| G5  | `feedback.icon.info/success/warning` (deck has only `neutral` + `error`)                                                                                          | Banner, Toast, FulfillmentTile | Icons stay legacy                                                                                                                             | Design: add or confirm icon/text sharing   |

Ship-risk summary: no gap breaks rendering today (fallbacks + literals cover every
consumed property), but shipping a semantic palette while G1/G2 are open activates
new colors with no contrast sign-off — notably Banner message text. Gate semantic
palette publication on G1 resolution and a contrast review of text-on-tint pairings.
Literal-backed assignments (rating stars, skeleton shimmer, scrollbar edge, halo)
are intentional and ship-safe by construction.

## Palette status and deliberate boundaries

The installed `@rei/cdr-tokens@14.0.0` contains the current legacy palettes, not a published semantic palette. The source design decks cited by the PR are not included in this checkout. These new component assignments are therefore reviewable proposals following the repository's taxonomy; they are not claims of newly confirmed Figma values. Existing fallback values are preserved. A future semantic palette must be reviewed for contrast and role pairing before publication.

The modal scrim remains the published translucent overlay token. Mapping it directly to an opaque neutral would lose its opacity and obscure the page. Elevation shadows, layout geometry, inherited `currentColor`, transparency and state mechanics remain CSS or their existing foundation tokens. They are not missing color contracts. Introduce semantic prominence/opacity when that foundation has a real specification.

The browser tests exercise legacy fallback rendering without a global token sheet, custom-property precedence, independent roles, focus visibility and control/selection states in Chromium, Firefox and WebKit. The existing accessibility suite also checks the default and Sandstone galleries. This validates the implementation and existing palettes; sentinel theme colors in the regression tests are deliberately distinguishable test values, not a proposed visual palette.
