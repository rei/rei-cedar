# Release notes generation guide

This document walks through the end-to-end process for generating Cedar release notes using the documentation agent (Cascade).

## Prerequisites

- Node.js 20+
- `pnpm` installed
- Access to both `rei-cedar` and `rei-cedar-tokens` repos
- Windsurf IDE with Cascade enabled

## Directory structure

```
scripts/agent-config/
├── release-intent.md          # Human-authored release intent (input)
├── release-notes.schema.json  # Generation rules and pipeline config
├── editorial.json             # Voice, tone, and quality checks
├── security.schema.json       # Scrub rules and blocklist
├── commit.schema.json         # Commit and branch mapping
├── storybook.schema.json      # Story scaffolding rules
└── adr.schema.json            # Override ledger rules

dist/                          # Generated artifacts (gitignored)
├── release-notes.draft.md     # Human-readable draft
├── release-notes.design.md    # Design summary
└── release-notes.json         # Machine-readable change records

docs/releases/                 # Archived releases (committed)
├── index.json                 # Append-only release index
├── v17.0.0.json               # Scrubbed machine JSON archive
└── v17.0.0-intent.md          # Archived release intent

releaseNotes/                  # Storybook release notes source
└── 2026-05-20-cedar-17.md     # Markdown with frontmatter

.windsurf/skills/
└── cedar-docs.yaml            # Skill manifest
```

## Step-by-step process

### Phase 1 — Fill the release intent

1. Open `scripts/agent-config/release-intent.md`
2. Replace `vX.X.X` with the target version
3. Fill every section — the agent uses this as its primary input
4. Focus on **what consumers care about**, not implementation details
5. List known breaking changes explicitly so the agent prioritizes them

### Phase 2 — Run the agent

Open Cascade and describe the release. The agent will:

1. Read the release intent and all schema/config files
2. Run baseline diffs between the release branch and main
3. Detect breaking changes using rules in `release-notes.schema.json`
4. Generate 3 artifacts in `dist/`:
   - `release-notes.draft.md` — human-readable release notes
   - `release-notes.design.md` — design team summary
   - `release-notes.json` — machine-readable change records

#### Pipeline order (Phase 6)

The agent executes these steps in sequence:

1. `detectBreakingChanges` — identify consumer-surface breaks
2. `generateHumanReleaseNotes` — draft the human-readable notes
3. `generateDesignSummary` — draft the design summary
4. `draftMigrationSteps` — write concrete migration steps
5. `generateMachineReleaseNotes` — produce the JSON records
6. `unifyDraftTone` — apply editorial quality checks
7. **`stripInternalSections`** — remove "Changes in this branch" and file lists
8. `scanForSecurityViolations` — check for blocklisted patterns

### Phase 3 — Review the drafts

1. Read `dist/release-notes.draft.md` — this is the consumer-facing output
2. Read `dist/release-notes.design.md` — this goes to the design team
3. Verify `dist/release-notes.json` — machine records for tooling

Check for:

- **Breaking change format** — every entry must have bold `**Why:**`, `**Before:**`, `**After:**`, `**Migrate:**` sub-bullets
- **No file paths or file counts** — the output must not contain internal file lists
- **No "Changes in this branch" section** — this is Storybook-only content, stripped before publish
- **Consumer value first** — the overview opens with what teams can do, not what changed internally

### Phase 4 — Archive and publish

Once drafts are approved, tell the agent to archive. It will:

1. Scrub internal fields (`commitSource`, `agentNote`) from the JSON
2. Archive to `docs/releases/<version>.json`
3. Archive the release intent to `docs/releases/<version>-intent.md`
4. Append the release record to `docs/releases/index.json`
5. Reset `scripts/agent-config/release-intent.md` to the blank template

### Phase 5 — Storybook integration

Copy the draft to `releaseNotes/` with frontmatter:

```markdown
---
default: true
version: 17.0.0
date: 2026-05-20
---

# Release notes – v17.0.0

...
```

Set `default: false` on the previous release note file.

Run `pnpm run storybook:release-notes` to regenerate the Storybook data.
The `storybook` and `build-storybook` scripts do this automatically.

### Phase 6 — Validate

Run the validation script:

```bash
pnpm run docs:release-notes
```

This checks:

- `dist/release-notes.draft.md` exists and has expected headings
- `dist/release-notes.json` is valid JSON with required fields per record
- `dist/release-notes.design.md` is present
- `scripts/agent-config/release-intent.md` is not still a blank template

## npm scripts

| Script                    | Purpose                                               |
| ------------------------- | ----------------------------------------------------- |
| `storybook:release-notes` | Regenerate Storybook release notes data               |
| `docs:release-notes`      | Validate release note artifacts                       |
| `storybook`               | Runs `storybook:release-notes` then `storybook dev`   |
| `build-storybook`         | Runs `storybook:release-notes` then `storybook build` |

## Config files reference

### release-notes.schema.json

- **modelRouting** — which Claude model handles each task
- **pipelineOrder** — canonical execution order for Phase 6
- **outputs** — paths for draft, JSON, and design artifacts
- **versioning** — major/minor/patch rules
- **crossRepoImpact** — co-release triggers and fields
- **consumerSurface** — what counts vs what gets filtered
- **humanSections** — section order, required sections, strip rules, breaking change format
- **machineRecord** — JSON record field schema
- **breakingChangeRules** — what is and is not breaking

### editorial.json

- **voice** — Cedar voice: candid senior engineer
- **prohibited** — patterns that must never appear
- **required** — mandatory elements per section type
- **qualityChecks** — automated checks run during `unifyDraftTone`
- **sectionGuidance** — per-section writing instructions

### security.schema.json

- **blocklist.patterns** — regex patterns redacted from all output
- **blocklist.contentRules** — sections and lines stripped before publish
- **publishTargets** — internal (full) vs external (scrubbed) output
- **agentNoteGate** — unresolved notes block publish promotion

## Co-release workflow

When `rei-cedar` and `rei-cedar-tokens` ship together:

1. Fill release intent in **both** repos
2. Run the agent on **tokens first**, then cedar
3. Each set of release notes must name the counterpart version in the overview and BOLO
4. Archive both before publishing either
5. Update Storybook in both repos

## Troubleshooting

- **"release-intent.md is a blank template"** — fill the intent before running the agent
- **"No artifacts found in dist/"** — the agent hasn't generated yet; run Phase 2
- **Storybook shows old release notes** — check which file in `releaseNotes/` has `default: true`
- **Breaking changes missing sub-bullets** — the `breakingFormatTest` quality check should catch this; re-run `unifyDraftTone`
