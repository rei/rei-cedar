# Isolated Storybook + Playwright Preview

## What runs where

- The Playwright config's `webServer` is the Vite dev application on port 3000;
  it does **not** start Storybook. Start Storybook manually from the isolated
  copy on a separate free port.
- `test/playwright/visual-baseline.spec.ts` is a reusable runner. Configure it
  with `VISUAL_COMPONENT`, `VISUAL_STORYBOOK_ID`, `VISUAL_STORIES`, and, for
  interactive components, `VISUAL_STATES`, `VISUAL_STATE_STORIES`, and
  `VISUAL_STATE_SELECTOR` rather than creating a component-specific config.
- Visual baselines are committed under `test/visual-baseline/<component>/`.
  Temporary after and delta images are under gitignored
  `test/visual-after/` and `test/visual-delta/`.

**Doc-site token compatibility:** `.storybook/_tokens-compat.scss` supplies
`$cdr-color-background-primary` and `$cdr-color-background-secondary`, which
the installed doc-site Sass package no longer exports, so Storybook's global
styles compile. Leave that file and its `@use` in place; the isolated copy
inherits them automatically.

Example target setup:

```bash
export VISUAL_COMPONENT=cdr-abstract
export VISUAL_STORYBOOK_ID=components-abstract
export VISUAL_STORIES=default,fluid-responsive,different-tags,in-article,multiple-abstracts
export VISUAL_STATES=rest
export STORYBOOK_URL=http://localhost:6006
```

The agent inspects the target's story file and supplies its real Storybook ID
and story IDs; do not reuse the example values for another component. For an
interactive target, list its supported states and choose stories with a visible
trigger. Example for Accordion: `VISUAL_STATES=rest,hover,focus-visible,active`,
`VISUAL_STATE_STORIES=default,compact,border-aligned,opened,no-content-spacing`,
`VISUAL_STATE_SELECTOR=[aria-expanded]`. Do not request `disabled` when the
component has no disabled state.

## Isolated copy — never preview by editing the active component

Create a temporary copy of the current working tree **before Gate 1** so both
original and proposed renders use the same isolated Storybook, while the active
checkout remains untouched:

```bash
PREVIEW_ROOT="$(mktemp -d "${TMPDIR:-/tmp}/cedar-semantic-preview.XXXXXX")"
mkdir -p "$PREVIEW_ROOT/repo"
rsync -a --exclude='.git' --exclude='node_modules' --exclude='dist' \
  --exclude='storybook-static' --exclude='test-results' --exclude='playwright-report' \
  ./ "$PREVIEW_ROOT/repo/"
ln -s "$PWD/node_modules" "$PREVIEW_ROOT/repo/node_modules"
```

Apply proposed contract, component, and style changes **only** in
`$PREVIEW_ROOT/repo`. Run the isolated copy's tests there. Start its Storybook
on a free port (for example, `pnpm exec storybook dev --port 6007`) and set
`STORYBOOK_URL=http://localhost:6007` for the Playwright capture. Keep the
temporary path and port distinct from the active checkout's Storybook.

For a color-only preview before the full refactor is ready, write the proposed
CSS to a temporary file outside the repo and set `VISUAL_PREVIEW_CSS` to that
file. The visual test injects it into the story page; it does not alter the
component source. This preview can show color differences, but it is not a
substitute for testing the isolated proposed component implementation.

## Capture the original baseline (Gate 1)

Keep the isolated copy's component unmodified for this capture. Start its
Storybook on a free port, set `STORYBOOK_URL` to that port, then capture the
original stories:

```bash
npx playwright test test/playwright/visual-baseline.spec.ts \
  --project=visual --update-snapshots
```

This writes one PNG per story × state × viewport under
`test/visual-baseline/<component>/`. Verify the expected filenames/count. Do
**not** open a baseline-only gallery or present original-only screenshots.
Keep the captures private until the complete Before | Delta | After gallery is
ready at Gate 4. Never capture “after” over the baseline directory.

## Capture and compare the isolated proposal (Gate 4)

From a second terminal, start Storybook from the isolated copy on its own port:

```bash
cd "$PREVIEW_ROOT/repo"
pnpm exec storybook dev --port 6007
```

Set `STORYBOOK_URL=http://localhost:6007`, then run the following commands
from `$PREVIEW_ROOT/repo`. `VISUAL_PREVIEW_CSS` is optional and only for a
CSS-only preview:

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

Open the gallery only once, after the baseline, after, and delta images all
exist. Do not open a baseline-only gallery earlier in the workflow.

The gallery opens automatically. It shows Before | red-pixel Delta | Proposed
After. Panes are cropped to content; click an image for full size. Show key
before/after/delta images inline as well. A missing after image, unreadable PNG,
size mismatch, or skipped diff makes `pnpm diff` fail; fix that before asking
for sign-off.

Playwright uses the approved per-pixel threshold `0.05` (5%) and
`maxDiffPixels: 0`; keep this setting unchanged. The red-pixel diff uses a
separate absolute Euclidean RGB distance threshold of 2 (not a percentage) so
small token shifts remain visible in the Gallery. These metrics differ; inspect
the images and counts on the same browser/platform, then disposition every
difference as an approved recolor or unintended change. A Playwright failure
caused only by an accepted recolor is expected, not a layout regression.

## Final apply

Ask one explicit question: accept the **complete** proposed file diff and visual
result, or adjust? Do not edit the active component before acceptance. Once
accepted, copy only the reviewed target/contract/generated/test files from the
isolated copy, not the full directory. Then re-run tests and capture final after
images from the active checkout. Re-open the gallery and show the result.

## Dark mode

If the component is themed, capture the same stories in the dark theme and
compare separately. If there is no dark mode or relevant theme state, record
that explicitly at the gate.
