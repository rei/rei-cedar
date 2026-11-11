---
status: drafted — awaiting owner ratification
priority: high
---

**Draft:** `docs/FOUNDATIONS.md` v0.1.0-DRAFT on branch `docs/foundations-draft`.
Structure adapted from `bramblyhedge/DESIGN.md`; each candidate principle cites
the artifact it was extracted from. Needs design/engineering owner review before
it becomes normative — §6 holds the genuinely undecided questions.

# Ticket: Author `docs/FOUNDATIONS.md` — Cedar's design principles as citable rules

## Status: proposed (human-authored, no agent pass)

## Goal

Write `docs/FOUNDATIONS.md` in this repo: the normative statement of Cedar's
design principles — the rules a design review, a token change, or a component
diff can be judged _against_, cited by section number. Each principle is a
named, testable claim, not a value statement.

## Why this matters

Cedar's docs currently describe the _machine_ (ARCHITECTURE.md, ADRs,
contracts) but not the _language_. ADRs record decisions; nothing records the
principles those decisions serve. Consequences we already feel:

- Reviews degrade to taste. The `reviewer` and `qa` agents cite file:line but
  have no rule to cite for "this shouldn't be that way." A finding that can't
  point at a principle is an opinion.
- The agent program's proof tests ("3 representative stories through
  implement → QA → review") can't be scored fairly — the reviewer has no
  spec to review against.
- Token intent lives in `metadata/intents.json` (machine-readable), but there
  is no human-authored "why" a person or agent can invoke.

Reference implementation: the Brambly Hedge `DESIGN.md` — principles as
numbered rules ("motion may confirm a state, never carry one", "elevation is
physical height under one light source"), a changelog with version bumps, and
lint gates that promote repeated rulings into enforceable checks. That doc is
what made agent review verdicts binding rather than advisory — the _doc_ held
the accountability, the agent only held the evidence.

## Scope

In scope:

- `docs/FOUNDATIONS.md` covering the foundation areas Cedar already encodes:
  colour (role discipline, contrast floors), typography (scale discipline),
  space, elevation/light, motion, iconography, expression/emphasis. Plus a
  governance section: how principles get added/changed, versioning, and the
  rule that repeated review rulings get promoted to lint/CI checks.
- Each principle: a name, a one-sentence rule, and a testable claim (how you'd
  check it — even if the check is manual today).
- Links from `AGENTS.md`, `rei-cedar-tokens` docs index, and
  `REI/docs/agent/planning-sources.md` — never duplicated into them.

Out of scope:

- Inventing new design decisions. This doc _captures_ what Cedar already
  believes, names it, and makes it checkable. Genuinely undecided questions
  get a "questions for the design team" section, not a guessed answer.
- Token values, API contracts, ADR content. This is the layer above.
- Storybook presentation — a separate ticket renders this doc into the
  Storybook Foundations section (scaffold already exists at
  `src/stories/foundations/`).

## Acceptance criteria

- [ ] Every foundation area has ≥ 1 named principle with a testable claim.
- [ ] A design reviewer could cite `FOUNDATIONS.md §n` in a finding the way a
      bramblyhedge ruling cites `DESIGN.md §n`.
- [ ] Governance section states: principles change by human decision + version
      bump; recurring agent findings get promoted to deterministic checks
      (lint/CI), never left as repeated LLM judgment.
- [ ] `AGENTS.md` links to it as the source of truth for visual/design
      questions; rei-cedar-tokens docs index links to it.
- [ ] Reviewed and approved by the Cedar design/engineering owners — this is a
      normative doc, like an ADR.

## Suggested size

Small-to-medium for drafting; the effort is review and sign-off, not word
count. A strong v1 is ~2–4 pages of rules. Do not let it grow into a style
guide — rules, not examples.
