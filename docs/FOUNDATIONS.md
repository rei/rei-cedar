# FOUNDATIONS.md — Cedar design principles as citable rules

**Version 0.1.0-DRAFT** · status: **evidence draft for design/engineering ratification** ·
pattern: `bramblyhedge/DESIGN.md` (principles as numbered, testable rules)

This document is the normative statement of Cedar's design principles — the rules
a design review, a token change, or a component diff is judged _against_, cited by
section number. Each principle is a named, testable claim, not a value statement.

It is the layer **above** the machine: `docs/ARCHITECTURE.md`, ADRs, and token
contracts describe _how_ Cedar is built; this document records _what Cedar
believes_. ADRs record decisions; these are the principles those decisions serve.
If code and this document disagree, fix one of them in the same change.

**Every candidate rule below cites the artifact it was extracted from.** Nothing
here is invented; genuinely undecided questions live in §6, not as guessed answers.

---

## Contents

1. [Principles](#1-principles)
2. [The tiered contract](#2-the-tiered-contract)
3. [Accessibility and state](#3-accessibility-and-state)
4. [Deprecation and lifecycle](#4-deprecation-and-lifecycle)
5. [Never list](#5-never-list)
6. [Open questions for the design team](#6-open-questions-for-the-design-team)
7. [Governance](#7-governance)
8. [Changelog](#8-changelog)

---

## 1. Principles

Every finding in a review should be able to cite one of these. If a ruling can't
point at a principle, it's an opinion — either the principle is missing (add it)
or the ruling is taste (drop it).

### §1.1 Elements are atoms; intents are compositions

Colour tokens have exactly two consumer lookup axes: the **element** being
coloured (`color.text.*`, `color.border.*`, `color.icon.*`, `color.surface.*`,
`color.action.*`, `color.control.*`, `color.feedback.*`, `color.selection.*`,
`color.graphic.*`) and the **intent** — a curated set of element slots composed
as one decision ("Primary = this surface + this text + this border + this icon").

A consumer picks an element token or an intent slot — never a palette step, and
never hand-pairs text against a surface the intent contract doesn't sanction.

_Source: ADR 0007 (`metadata/intents.json` — "curated intent sets encode the
pairing as a decision the system makes"), `docs/STORYBOOK-IA.md` IA decisions._

### §1.2 The taxonomy is closed and omission is not a value

Semantic names follow the five-tier model — Foundation · Interaction Family ·
Role · Identity · Expression. Family and Expression may be _omitted_; omission is
a structural signal (universal across families / default strength), never an
empty value. New names enter the taxonomy by extending this model, not by
coining adjacent vocabulary.

_Source: `docs/cedar-semantic-taxonomy.md` (confirmed against the Cedar
Evolution strategic deck, Sept 2026)._

### §1.3 One name across every surface

The contract name of a thing is identical in design tooling, docs, and code. If
a token is `graphik` in the type family, the docs page says `graphik` — label ↔
syntax parity is a correctness requirement, because consumers copy the label
into an import. Aliases and deprecated names are listed as _aliases_, never
presented as the name.

_Source: content-design review finding on `CdrColorGraphik` vs. the "Graphic"
nav label; Carbon's label↔syntax parity convention._

### §1.4 A scale is closed: a value off it is a finding

Space, type, radius, and elevation values come from their named scales and
nothing else. A hardcoded size that could have been a scale step is a defect,
not a style choice — even where the rendered pixel is identical.

_Source: pattern from `DESIGN.md` §5.3 ("a value off the scale is a finding");
Cedar precedent is the token contract itself — components assign tokens, not
literals (`_.tokens.ts`contracts,`build/component-tokens/`).\*

### §1.5 State is never colour alone

A state change that only recolours is incomplete: selection carries a
non-colour signal, focus is a visible ring on every interactive element, and
disabled belongs to the surface it's printed on. Target: WCAG 2.2 AA — 4.5:1
for text, 3:1 for non-text UI and large type.

_Source: WCAG 2.2 AA contract cited across component `_.tokens.ts`state
matrices (e.g. checkbox Figma-aligned state spec);`docs/STORYBOOK-IA.md`P0
review finding (invisible`!` fail flags, tooltip-trapped ratios).\*

### §1.6 Contrast is a property of the contract, computed at build time

Which ink may sit on which ground is **data emitted by the token pipeline**,
not a judgement made by a component, a docs page, or an agent. Floors: text
≥ 4.5:1, non-text ≥ 3:1. Docs and Storybook _display_ this contract data; they
never run WCAG math themselves.

_Source: ADR 0007 ("accessibility contrast is pipeline-computed metadata used
to validate intent compositions at build time — the system shields consumers
from WCAG math");
`rei-cedar-tokens/docs/tickets/accessibility-metadata-in-contract.md` (proposed:
`$extensions.cedar.accessibility`)._

### §1.7 The docs and the contract are one surface

Storybook and authored docs render _from_ the token contract (`metadata/`,
`$extensions.cedar.*`), never restate it. A docs page that retypes a value, a
name, or a pairing is a defect — the contract is right or the contract changes.

_Source: `docs/STORYBOOK-IA.md` (tables generated from `token-metadata.ts`;
blurb drift between Overview and `familyGuides` was an observed defect)._

### §1.8 Motion may confirm a state, never carry one

_(Placeholder principle — motion is an under-encoded foundation in Cedar. See §6.)_

---

## 2. The tiered contract

Consumers interact with Cedar colour through exactly these layers. Each tier
names who may read it:

| Tier                   | Names                                                   | Who may use it                                      |
| ---------------------- | ------------------------------------------------------- | --------------------------------------------------- |
| Palette (reference)    | `color.option.*` primitives                             | The token pipeline and docs only                    |
| Semantic (elements)    | `color.text.*`, `color.surface.*`, … `color.graphic.*`  | Component token contracts; application styling      |
| Intents (compositions) | `CdrIntents`, `--cdr-color-intent-*`, `data-cdr-intent` | Product teams; the sanctioned way to theme a region |
| Component              | `*.tokens.ts` assignments → `*.module.scss`             | The component library itself                        |

Reaching below your tier is a finding. Application CSS never reads
`color.option.*`; components never read the palette; a team that needs a value
the semantic tier doesn't provide has found a gap in the contract — the fix is a
new semantic token, not a literal.

_Source: ADR 0007 context layer model; `docs/STORYBOOK-IA.md` (Palette
quarantined as internal reference); `AGENTS.md` (contracts own token
assignments)._

---

## 3. Accessibility and state

- **Contrast by construction** (§1.6): the pipeline emits ground sets and
  computed ratios; intent compositions that fall below their floor fail the
  contract suite.
- **State is never colour alone** (§1.5).
- **Touch targets** meet the platform minimum; body text and type floors are set
  by the type scale, not by component convenience.
- **`prefers-reduced-motion`, `prefers-contrast`, `forced-colors`** each get a
  defined behaviour per foundation area — see §6, motion and platform notes are
  under-encoded today.
- Verified mechanically where possible: contract tests (`src/contract/`),
  component specs, and the Storybook render smoke spec — not by docs claim.

---

## 4. Deprecation and lifecycle

Deprecation is a **contract act**, and it has a required shape:

1. The thing keeps working — no removal without an overlap window.
2. It warns at consumer build time and names the removal version
   (e.g. `@warn … "will be removed in the next major release (v16)"`).
3. The replacement exists and is named _before_ the warning ships — a
   deprecation with no landing spot can never be enforced.
4. The deprecation is recorded in the token contract
   (`$extensions.cedar.deprecation`) so docs, tests, and Figma all read the
   same flag.

_Source: `docs/DEPRECATION.md`; `rei-cedar-tokens` PR #316 (mixin `@warn`);
`rei-cedar/docs/tickets/scss-mixin-replacement.md` (the landing-spot rule —
"that promise doesn't have an implementation yet" was called out as the defect
this rule prevents)._

---

## 5. Never list

Explicit bans, each enforceable or already enforced:

- **No palette-tier reads in components or application CSS.** (`color.option.*`
  is internal — §2.)
- **No hand-authored computed metadata.** `description` is human guidance;
  computed fields (ratios, ground sets) are pipeline output. (ADR 0006/0007.)
- **No name drift between docs and code** (§1.3).
- **No unversioned deprecation** — a warning without a named removal version and
  a named replacement is a defect (§4).
- **No colour literals in component SCSS** — contracts own assignments; module
  scss owns selectors and behaviour only.
- **No silent behaviour drift in replacements** — a migration produces the same
  rendered output or calls the change out explicitly in migration docs.

---

## 6. Open questions for the design team

Genuinely undecided items — recorded as questions, not guessed answers:

- **Motion language.** Cedar has no named motion vocabulary or budgets. What is
  the motion metaphor (and what may never move)?
- **Elevation/light model.** Elevation is encoded in tokens but has no stated
  principle (height-as-importance? light model?).
- **SCSS-only consumers and palettes.** Intents/`data-palette` engage through
  CSS custom properties; a consumer using only SCSS has no path in. Is
  SCSS-mixin coverage of intents a committed contract surface?
- **Intent coverage completeness.** Authored intents cover 4 of 9 slots;
  `color.control.*` and `color.action.*` have no intent owner. Is full coverage
  a release criterion?
- **Non-container intents.** Link exists as an intent that is not a container;
  are there others (e.g. a `focus` intent), and does the slots×intents model
  admit them uniformly?
- **Typography foundations.** The type scale and family rules exist in tokens
  and mixins but have no normative statement here.

---

## 7. Governance

1. **Principles change by human decision and a version bump** — the same way an
   ADR changes. This document is normative; edits are reviewed by Cedar
   design/engineering owners.
2. **Rules and code land together.** A change that violates a principle either
   amends this document in the same PR (with the reasoning) or is a defect.
3. **Repeated agent/reviewer findings get promoted to deterministic checks** —
   contract tests, lint rules, or pipeline validation — never left as repeated
   LLM judgement. The doc holds the accountability; the check holds the
   enforcement.
4. **Citations.** A review finding cites `FOUNDATIONS.md §n`. A finding that
   can't cite a section either reveals a missing principle (§6 or a new §1.x)
   or is taste.
5. **Versioning:** patch (clarification/fix), minor (new principle or section),
   major (a principle is reversed or a tier model changes).

---

## 8. Changelog

| Version     | Date       | Change                                                                                                                                                                                                                                                                                                                          |
| ----------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0.1.0-DRAFT | 2026-11-11 | Evidence draft: 7 candidate principles extracted from ADR 0006/0007, `cedar-semantic-taxonomy.md`, `DEPRECATION.md`, `STORYBOOK-IA.md`, and the mixin-deprecation rulings; structure adapted from Brambly Hedge `DESIGN.md`. Awaiting design/engineering owner ratification — see `docs/tickets/foundations-principles-doc.md`. |
