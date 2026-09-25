---
name: semantic-token-migration
description: Migrate Cedar components to semantic colors through a generic token contract, category-scoped manual mapping, an isolated preview, and Storybook + Playwright comparison. Always asks for the component first, then recommends a category for the human to confirm or change.
license: proprietary
metadata:
  author: rei-cedar
  version: '0.3.0'
  taxonomy: docs/cedar-semantic-taxonomy.md
---

# Semantic Token Migration

Follow the phases in order and pause at each human approval gate. Color
assignments are manual: never bulk-replace names or guess an ambiguous mapping.

**One approval question per gate:** show the artifact and ask once whether to
approve it and proceed to the next phase. Do not ask a second “confirm” or
“continue?” question for the same gate after the human approves.

**Protect the original component:** do not edit the target component's files in
the active checkout while preparing the proposal or visual preview. Work in an
isolated temporary copy of the current working tree, including existing user
changes. Show the proposed file diff and visual comparison; copy only approved
files back after explicit acceptance of the complete change set. Never reset or
overwrite unrelated user changes.

## Read before classifying

- `references/contract-pattern.md` — generic contract and map consumption
- `references/screenshot-workflow.md` — isolated preview and comparison
- `references/color-lookup.md` and `references/semantic-colors.json` — allowed colors
- `docs/cedar-semantic-taxonomy.md` — taxonomy and omission rules
- `docs/semantic-token-mapping.md` — category decision flow, per component part
- `build/component-tokens/types.ts`, `naming.ts`, `validate.ts`, and `generate-component-maps.ts`
- Load `vue-best-practices` when the target is a Vue component.

## Phase 0 — Component first, category second (Gate 0)

### 0.1 Ask for the component (first question)

Use the question tool to ask **“Which component should we migrate?”** and wait
for a free-text answer. Do not show a list of components or ask for category
first. Resolve the answer to an actual folder and component under
`src/components/`. If it is ambiguous or does not resolve, ask for a correction
before proceeding.

### 0.2 Inspect the component and recommend a category

Read the resolved component's Vue/implementation file, props/types, styles,
stories, and tests. Classify each color-bearing part (surface, text, border,
icon, trigger) using `docs/semantic-token-mapping.md`. Base the category
recommendation on the component's actual purpose and parts, not its name alone.

### 0.3 Ask for the category (second question)

Use the question tool with all six categories. Put the evidence-based
recommendation first and mark it `(Recommended)`; offer the remaining five as
alternatives. The question must restate the resolved component and give a
one-sentence reason for the recommendation. The user may select any category,
including a different one from the recommendation. Do not proceed until one is
confirmed.
Treat this choice as the category for the component's primary interactive
purpose. If a distinct part clearly has another semantic purpose (for example,
a control trigger with plain Universal panel content), assign that part its own
category in the Gate 0 mapping table rather than forcing every color into the
component's primary category.

- **Universal** — plain content/surface with no interaction or status meaning
- **Graphics** — decorative or informational visuals
- **Feedback** — system status, validation, loading, warning, success, or error
- **Action** — commits, submits, navigates, or triggers an action
- **Control** — manipulates/configures the interface in place
- **Selection** — expresses a choice among alternatives

Map the chosen category to the contract's `interaction`:

| Category  | `interaction` |
| --------- | ------------- |
| Action    | `action`      |
| Control   | `control`     |
| Selection | `selection`   |
| Feedback  | `feedback`    |
| Universal | omit          |
| Graphics  | omit          |

Never write `universal` or `graphics` as an `interaction`. If one component
contains parts with different purposes, classify those parts separately and
record the result before drafting the contract. The contract's `interaction`
is the primary component category; use a separate named color scope for each
part that needs distinct role/state values. A scope can represent a real
component variant or a part such as `header`, `content`, or `frame`. If a part
uses a different category, use `fullPath` to preserve that part's exact
semantic namespace rather than inheriting the component's primary category.

Universal colors use the ordinary role/identity path with no interaction
segment (for example, `text.neutral` → `--cdr-color-text-neutral`). Graphics
colors use the separate `graphic` token group (for example,
`graphic.surface.brand`); keep `interaction` omitted and use `fullPath` to
preserve that `graphic-` segment. Do not mislabel Graphics as an interaction.

### 0.4 Build the complete old → new token table

Inspect the component's actual selectors and behavior to determine supported
states. For each color-bearing **variant × part × role**, include rows for
`rest`, `hover`, `focus-visible`, `active`, and `disabled`. For a supported
state, show the effective old and new mappings. If it inherits `rest`, write
`inherits rest` and show the effective mapping. If unsupported, write
`N/A — unsupported`; do not invent a token. A plain text component gets one
rest mapping and explicit N/A rows for the unsupported interaction states.

| Part | Category | Variant | Role | State | Old token | Old hex | New semantic token | New hex | Why |
| ---- | -------- | ------- | ---- | ----- | --------- | ------- | ------------------ | ------- | --- |

Use the correct category table in `references/color-lookup.md` for each part;
the recommended component category scopes its primary interactive part, while
plain/static parts may use Universal or Graphics when justified by the taxonomy.
Look up old values recursively under
`node_modules/@rei/cdr-tokens/dist/rei-dot-com/json/` (both `foundations/` and
`components/`; component-specific legacy colors are often in the latter). If
this package path is unavailable, report it rather than guessing. Prefer the
semantic color list's `legacy` match as the reason; check its contrast notes
against the actual component surface. That list's `legacy` field contains a
CSS custom-property name; it is not a Sass variable for the contract.

Also inventory current component-scoped override properties (including
`ITEM_DOC` comments and repository consumers). List any proposed renames or
removed hooks separately from color-token mappings. Do not silently break a
documented override API; get explicit approval or preserve compatibility within
the two-level rule.

Render a TUI swatch for each real old → new state mapping:

```bash
pnpm gate0 --compact \
  --before "<old-hex>" --after "<new-hex>" \
  --before-name "<old-token>" --after-name "<new-token>" \
  --state "<state>" --title "Gate 0 — <Component> · <Category>" \
  --reason "<mapping rationale>"
```

Do not present placeholder colors as evidence. State whether the change is
intentional. Gate 0 requires explicit approval of the state-complete mapping;
the original component remains untouched.

## Phase 1 — Capture the original (Gate 1)

Start Storybook manually (`pnpm storybook`, normally port 6006). Playwright's
configured web server is the Vite app, not Storybook. Inspect the actual story
IDs and set:

```bash
export VISUAL_COMPONENT=<kebab-name>
export VISUAL_STORYBOOK_ID=<storybook-id>
export VISUAL_STORIES=<comma-separated-story-ids>
export VISUAL_STATES=<supported-states>
# For interactive components only:
export VISUAL_STATE_STORIES=<stories-with-visible-trigger>
export VISUAL_STATE_SELECTOR=<trigger-selector>
export STORYBOOK_URL=http://localhost:6006
npx playwright test test/playwright/visual-baseline.spec.ts \
  --project=visual --update-snapshots
```

Capture all relevant stories, supported states, and desktop/mobile viewports.
Baselines live in `test/visual-baseline/<kebab-name>/` and are intended to be
committed. Verify the baseline files/counts, but do **not** open a baseline-only
gallery or show original-only screenshots. Keep the baseline ready for the one
complete comparison after the proposal. No target source edits.

Ask Gate 1 approval once. Approval means the original baseline is accepted and
Phase 2 may start in the isolated copy; do not ask again whether to continue.

## Phase 2 — Simplify and draft the contract (isolated copy only)

Refactor only what improves clarity without changing behavior. Follow local Vue
and SCSS conventions. Use typed props/slots, `mapClasses` where class mapping
is needed, BEM classes, and external style modules. Avoid mechanical
abstractions without a concrete benefit.

Create `src/components/<folder>/Cdr<Name>.tokens.ts` from the existing styles:

1. Set `component`, `prefix`, and `interaction` when applicable.
2. `defaults` must not be empty. Copy existing source values into `token()` or
   `literal()`—including existing `var(--...)` values. The module loops the
   generated defaults map into component custom properties and consumes those
   properties instead of repeating base literals.
3. Declare only real color scopes/variants, roles, and states. A scope key can
   represent a component variant or a distinct color-bearing part when that
   part has its own role/state mapping. `rest` is required and can contain
   partial roles (plain text can declare only `rest.text`). Add
   `hover`/`focus-visible`/`active`/`disabled` only when the component actually
   implements those states. The generator emits explicit entries only; it
   creates no phantom roles or states.
4. Include `sizes` only when the component has sizes.
5. Omit the contract's `legacy` fallback map for this two-level cutover. Keep
   old names and values in the Gate 0 table; a legacy fallback nested under the
   component override would add a third `var()` level.
6. Run `pnpm build:maps`. Review
   `styles/vars/Cdr<Name>.maps.scss` and, when a recipe emits it,
   `styles/Cdr<Name>.tokens.css`. CI does not currently enforce regeneration;
   verify by rerunning the generator and reviewing the resulting diff. The
   generator warns when a semantic name is absent from the approved color list;
   resolve every warning for the target rather than accepting a fallback.
   The generator scans all contracts, so record unrelated pre-existing
   warnings separately; do not change another component as collateral work.

The stylesheet must consume the generated maps. Loop the defaults map into
`--cdr-<component>-<property>` values. For a semantic color, read the matching
color-map entry as the fallback. For an unchanged literal such as `transparent`,
put its source value in `defaults` and use that component property as the
fallback. Both compile to exactly two `var()` levels:

```scss
// Rest text, default variant; map value is var(--cdr-color-text-neutral).
color: var(--cdr-color-abstract-text, map.get(maps.$abstract-colors, default, text));

// Hover text, named variant.
color: var(
  --cdr-color-example-warning-text-hover,
  map.get(maps.$example-colors, warning, text-hover)
);

// Unchanged transparent surface uses the captured literal default.
background-color: var(--cdr-color-example-header-surface, var(--cdr-example-header-surface));
```

The compiled form is
`var(--cdr-color-<component>[-<variant>]-<role>[-<state>], var(--cdr-color-<semantic>))`.
The component-scoped override is first; the semantic token (or, for an
unchanged literal, the captured component default) is second. Do not define the
override custom property inside the component. For a default/single variant
omit `<variant>`; for non-rest values append `-hover`, `-focus-visible`,
`-active`, or `-disabled`.

Until these future semantic tokens are provided by `@rei/cdr-tokens`, define a
temporary local shim for each approved semantic color used by the component,
using its value from `semantic-colors.json`. Document that shim as temporary
and remove it when the shared token ships. This shim is distinct from the
component override hook: never define the override hook locally.

All runtime semantic names use the planned `--cdr-color-*` convention. The
Figma export's web names omit the `color-` segment; the simplified local list
is normalized to the planned form (e.g. `--cdr-text-neutral` becomes
`--cdr-color-text-neutral`). Never mix the forms.

### Isolated preview

Make all proposed changes in an isolated temporary copy of the current working
tree, including the user's existing changes. For example:

```bash
PREVIEW_ROOT="$(mktemp -d "${TMPDIR:-/tmp}/cedar-semantic-preview.XXXXXX")"
mkdir -p "$PREVIEW_ROOT/repo"
rsync -a --exclude='.git' --exclude='node_modules' --exclude='dist' \
  --exclude='storybook-static' --exclude='test-results' --exclude='playwright-report' \
  ./ "$PREVIEW_ROOT/repo/"
ln -s "$PWD/node_modules" "$PREVIEW_ROOT/repo/node_modules"
```

Apply proposed files only under `$PREVIEW_ROOT/repo`. Start that copy's
Storybook on an available port and point `STORYBOOK_URL` to it. For an early
color-only preview, write a temporary CSS override outside the repo and set
`VISUAL_PREVIEW_CSS=/path/to/preview.css`; Playwright injects that stylesheet
without modifying the component. A CSS-only preview is not a substitute for
testing the isolated proposed implementation. Never replace the active
component directory wholesale.

## Phase 3 — Test the isolated proposal

Run target unit tests, style lint, type-check, and visual comparison in the
isolated copy. Tests must assert useful component behavior and contract/state
details, not only generic tags or snapshots. Ensure stories cover all supported
visual states. Record repository-wide pre-existing failures separately.

## Phase 4 — Compare and approve the proposal (Gate 4)

Capture the proposed implementation with the same stories/viewports as Gate 1:

```bash
CAPTURE_AFTER=1 npx playwright test test/playwright/visual-baseline.spec.ts \
  --project=visual
pnpm diff \
  --before "test/visual-baseline/$VISUAL_COMPONENT" \
  --after "test/visual-after/$VISUAL_COMPONENT" \
  --out "test/visual-delta/$VISUAL_COMPONENT"
pnpm gallery \
  --before "test/visual-baseline/$VISUAL_COMPONENT" \
  --delta "test/visual-delta/$VISUAL_COMPONENT" \
  --after "test/visual-after/$VISUAL_COMPONENT" \
  --title "$VISUAL_COMPONENT — before | delta | proposed"
```

The gallery opens Before | red-pixel Delta | Proposed After. Keep Playwright's
approved per-pixel threshold `0.05` (5%) and `maxDiffPixels: 0` unchanged. The
red-pixel diff uses a separate absolute Euclidean RGB-distance threshold of 2
(not a percentage) so small token shifts remain visible. Inspect all images and
counts; disposition every difference as an approved recolor or an unintended
change. A Playwright failure caused only by an accepted recolor is expected,
not a layout regression.

**Gate 4:** ask one explicit question to accept or adjust the complete proposed
component, contract, generated-map, and test changes. Until acceptance, the
active checkout's original component remains untouched.

## Phase 5 — Apply accepted changes and verify

After acceptance, apply only the reviewed files from the isolated copy. Confirm
the target diff matches the approved proposal. Run unit tests,
`pnpm lint:styles`, `pnpm lint:js`, `pnpm lint:types`, and the Playwright
comparison. Re-open the final gallery and show the images inline. Document
pre-existing failures and missing semantic colors; do not invent tokens.

## Rules

- Ask for the component first; ask for category second with an evidence-based
  recommendation and all six categories available.
- The old/new token table has state rows for `rest`, `hover`, `focus-visible`,
  `active`, and `disabled`; unsupported states are explicitly `N/A`.
- Do not edit the original component until the isolated proposal is explicitly
  accepted in full.
- Map colors manually per part/role/state. No bulk replacement or guessing.
- Keep exactly two color `var()` levels: component override first, mapped
  semantic token second. No third legacy fallback.
- Populate defaults from actual source values and consume the generated map.
