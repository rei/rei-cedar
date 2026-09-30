# Semantic Token Mapping Guide

**Relationship to other docs:** `docs/cedar-semantic-taxonomy.md` and
`docs/component-semantic-rollout.md` are the authoritative record of decided,
shipped token assignments (`interaction` values are set in each component's
`Cdr*.tokens.ts` contract). This doc is an **educational companion** aimed at
developers: it teaches the reasoning model (decide by role/intent, not by
component name) so the _next_ component or edge case gets classified
correctly without waiting on a taxonomy doc update.

Two conclusions below intentionally **disagree** with what's currently
shipped, and are called out explicitly rather than silently aligned:
`CdrTabs` (shipped as Control; reasoned here as Selection) and
`CdrToggleButton`/`CdrToggleGroup` (shipped as one Selection contract; reasoned
here as split Control/Selection by whether it's standalone or in an exclusive
group). These are tracked as **G6** and **G7** in
`component-semantic-rollout.md`'s open gap register for design/eng review —
treat the shipped `interaction` value as current truth until those are
resolved, and use this doc's reasoning model to argue the case either way.

## Why this doc exists

The most common mistake when applying semantic color tokens is treating the
mapping as **"this component = this palette."** It isn't. A single component
is often made of several parts, and each part plays a different role for the
user. The palette is decided **per role, per part** — not per component name.

> **CdrRating** is the clearest example: the star icons in a read-only
> product rating are decorative (**Graphic**). The same star icons used as an
> interactive input in a "leave a review" form are a user choice
> (**Selection**). The "(128 reviews)" label next to either is plain content
> (**Universal**). Same component, three palettes, depending on which
> instance and which part you're looking at.

**Before applying a token, ask: "What is the user doing with this specific
part of the component?"** — not "what is this component called?"

---

## The six semantic groups

| Group         | User's intent                                                       | Who's driving it |
| ------------- | ------------------------------------------------------------------- | ---------------- |
| **Action**    | Move me forward, submit, commit, navigate                           | User             |
| **Control**   | Manipulate the interface in place, don't move me or submit anything | User             |
| **Selection** | "I want _this one_" — choosing among options                        | User             |
| **Feedback**  | Something happened / is happening (status, validation, loading)     | System           |
| **Graphic**   | Purely decorative or informational visuals with no interaction      | Neither (static) |
| **Universal** | Default text, backgrounds, containers with no inherent meaning      | Neither (static) |

### Action

The interaction moves the user **through a flow** or **submits/commits**
something: navigate, add to cart, confirm, delete, follow a link.

_Ask: does clicking this take the user somewhere else, or make something
happen elsewhere in the system?_

### Control

The interaction manipulates **the interface itself, in place** — it doesn't
move the user anywhere and doesn't submit or commit anything. Play/pause,
volume, a stepper's +/-, expanding an accordion panel, flipping a single
on/off switch.

_Ask: is the user just operating a mechanism, with no choice being expressed
and nowhere being gone to?_

### Selection

The user is making a **choice** among options, and that choice is expressed
visually as "this one is currently chosen." This can _also_ control the
interface (a filter chip narrows a list) — but the deciding factor is intent,
not the mechanical side effect. If the user's intent is "I want this one,"
it's Selection, even if you can also describe it as "controlling" something.

_Ask: is the user picking one thing out of a set of alternatives, with the
choice persisting visually?_

### Feedback

The **system**, not the user, is communicating something: a banner, a toast,
a form validation error, a loading skeleton. Feedback has a neutral
("natural") tone in addition to info/success/warning/error — that neutral
tone is for cases where the system is just saying "something is happening,"
with no positive or negative judgment yet (e.g. a loading state).

_Ask: did the user cause this appearance directly, or is the system telling
the user something happened?_

### Graphic

Decorative or purely informational imagery with no interactive state and no
system-status meaning — icon fills, illustrations, static rating stars.

_Ask: is this just showing information, with no click/hover/focus state and
no status being communicated?_

### Universal

Default containers, backgrounds, and text with no inherent role. This is the
fallback, not a first choice — everything else in this doc is about pulling
things _out_ of Universal into a more specific group where a real role
exists.

---

## Decision flow

Use this in order for every distinct part of a component:

1. **Does this part have no interactive state and no status meaning?**
   → It's static. Is it decorative/illustrative? → **Graphic**. Otherwise →
   **Universal**.
2. **Is the system changing this part's appearance on its own (not from a
   direct user click)?** → **Feedback**.
3. **Does clicking/activating this part move the user elsewhere, or
   submit/commit something?** → **Action**.
4. **Does clicking/activating this part express "I want this one" among a
   set of alternatives, with the chosen state persisting visually?**
   → **Selection**.
5. **Otherwise, does it manipulate the interface directly, in place?**
   → **Control**.

Icons are a special case: they carry **no palette of their own**. They
inherit color from whatever context they're in (an Action button's icon
takes Action tokens, a Control's icon takes Control tokens, etc.) via
`currentColor`, unless a token is explicitly assigned because the icon needs
to carry meaning independent of its container (e.g. Rating's static stars
use `graphic-*` tokens regardless of what surface they sit on).

---

## Worked examples: same component, multiple palettes

| Component                      | Part                                                     | Role                                                                | Palette                                |
| ------------------------------ | -------------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------- |
| `CdrRating`                    | Star fills, static/display-only (e.g. product card)      | Decorative, no interaction                                          | Graphic                                |
| `CdrRating`                    | Star fills, interactive input (e.g. "rate this product") | User choosing a value                                               | Selection                              |
| `CdrRating`                    | Review count label                                       | Plain content                                                       | Universal                              |
| `CdrAccordion`                 | Header trigger (chevron, clickable row)                  | Reveal content in place, independent per-panel, no exclusivity      | Control                                |
| `CdrAccordion`                 | Panel content                                            | Plain content                                                       | Universal                              |
| `CdrToggleButton` (standalone) | The button itself                                        | Binary on/off mechanism, no alternatives being chosen               | Control _(shipped: Selection, see G7)_ |
| `CdrToggleGroup`               | Each button inside the group                             | Exclusive choice (`role="radiogroup"`, one selected value)          | Selection ✅ matches shipped           |
| `CdrTabs`                      | Tab trigger                                              | Choosing which content to view among named options                  | Selection _(shipped: Control, see G6)_ |
| `CdrTabs`                      | Tab panel content                                        | Plain content                                                       | Universal                              |
| `CdrModal`                     | Container/surface                                        | Plain content                                                       | Universal                              |
| `CdrModal`                     | Buttons inside                                           | Submit/dismiss/confirm                                              | Action                                 |
| `CdrModal`                     | Inputs inside                                            | Data entry                                                          | Control                                |
| `CdrModal`                     | Scrim/backdrop                                           | _(gap — no elevation/scrim token group exists yet, see Open Items)_ | —                                      |
| `CdrSkeleton`                  | Shimmer surface                                          | System communicating "loading," neutral status, no judgment         | Feedback (`natural` / `natural-faint`) |
| `CdrPopover` / `CdrTooltip`    | Trigger + surface                                        | Reveal contextual info in place, no navigation/submit               | Control                                |
| `CdrFulfillmentTile`           | Tile container (selected/unselected)                     | "I want this shipping option"                                       | Selection                              |
| `CdrFulfillmentTile`           | Status icon inside tile                                  | Decorative/informational                                            | Graphic                                |
| `CdrFulfillmentTile`           | Price/label text                                         | Plain content                                                       | Universal                              |

---

## Component → palette reference

This is a starting point, not a rulebook — always re-check against the
decision flow above when a component has multiple interactive parts.

### Action

`CdrButton` · `CdrLink` · `CdrCard` · `CdrPagination` · `CdrBreadcrumb`

### Control

`CdrInput` · `CdrSelect` · `CdrCheckbox` · `CdrRadio` · `CdrSwitch` ·
`CdrFormGroup` · `CdrAccordion` / `CdrAccordionGroup` (header trigger) ·
`CdrPopover` · `CdrTooltip` · `CdrLabelStandalone` · `CdrLabelWrapper` ·
standalone `CdrToggleButton` _(shipped as Selection — see G7)_ ·
`CdrTabs` / `CdrTabPanel` _(this is the shipped assignment — see G6 for the
Selection argument)_

### Selection

`CdrToggleGroup` · `CdrSurfaceSelection` · `CdrFulfillmentTile` (tile
surface) · `CdrChip` / `CdrChipGroup` (shipped, settled) · `CdrTabs` /
`CdrTabPanel` _(proposed here, not yet shipped — see G6)_

### Feedback

`CdrBanner` · `CdrToast` · `CdrFormError` · `CdrSkeleton` /
`CdrSkeletonBone`

### Graphic

`CdrRating` (static display) · `CdrFulfillmentTileIcon` · decorative use of
`CdrIcon`

### Universal

`CdrSurface` · `CdrSurfaceScroll` · `CdrSplitSurface` · `CdrSurfaceNavigation`
· `CdrMediaObject` · `CdrLandingLead` · `CdrTable` (base cells) · `CdrList` ·
`CdrQuote` · `CdrCaption` · all `CdrText` / heading / preset components ·
`CdrAccordion` panel content · `CdrModal` container

---

## Open items — not yet resolved

- **`CdrTabs` — Control (shipped) vs. Selection (reasoned here) — tracked as
  G6 in `component-semantic-rollout.md`.** Shipped contract sets
  `interaction: 'control'`. The argument for Control: switching tabs
  manipulates what's displayed in place, doesn't navigate or submit. The
  argument for Selection: the user's intent is "I want to view _this_
  content," a choice among named alternatives, the same intent driving
  `CdrToggleGroup`'s Selection assignment. Needs a design decision, not an
  engineering guess — raised for review.
- **`CdrToggleButton`/`CdrToggleGroup` — one Selection contract (shipped) vs.
  split by context (reasoned here) — tracked as G7.** Shipped: both ship
  as a single Selection contract. Proposed split: a standalone
  `CdrToggleButton` (no group, binary on/off, no alternatives) reads as
  Control by the same logic as `CdrSwitch`; only `CdrToggleGroup`
  (`role="radiogroup"`, exclusive `v-model`) expresses "I want this one." If
  Cedar's standalone `CdrToggleButton` is never actually used outside a
  group in practice, this may be a non-issue — worth checking real usage
  before changing the contract.
- **Elevation / shadow / scrim**: no token group currently exists for this.
  Needed independently of color-role tokens by `CdrModal` (scrim),
  `CdrSkeleton`, `CdrPopover`/`CdrTooltip`, and `CdrToast`. This is a
  separate axis from semantic color and should not be folded into any of
  the six groups above — track as its own token family. (Note:
  `component-semantic-rollout.md` explicitly scopes the modal scrim as a
  deliberate boundary, not a missing contract — confirm before treating
  this as new work.)
- **`CdrTable` sortable headers**: if/when interactive sort controls are
  added to table headers, those specific header cells should pull
  Action or Control tokens; the table body remains Universal.
