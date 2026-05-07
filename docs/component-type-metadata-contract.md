# Component Type Metadata Contract

## Purpose

Define a unified consumer contract for Cedar component type output that matches the token contract experience:

- predictable import surfaces
- rich IDE hover metadata
- publish-time validation

## Contract Schema

The generated component contract output (for example `dist/component-docgen.json`) should include:

1. Component metadata

- `displayName` (string)
- `description` (non-empty string)
- `sourceFiles` (non-empty array)

2. Prop metadata

- `name` (string)
- `type` (present)
- `description` (non-empty string)
- `required` (boolean)
- `defaultValue` when applicable

3. Optional extended metadata (recommended)

- deprecation notice and replacement
- stability tier (`stable`, `experimental`, `deprecated`)
- accessibility notes when behavior requires guidance

## Acceptance Criteria

FE4 is considered complete when:

- this schema is documented in repo docs
- generator expectations are explicit and testable
- follow-up validation gates are defined and wired into scripts

FE5 is considered complete when:

- a script validates generated docgen contract output
- validation fails on newly introduced missing metadata
- baseline legacy metadata debt is tracked explicitly via allowlist
- validation runs through `contract:check`

## Transitional Policy

Cedar currently has legacy metadata gaps. To avoid blocking unrelated changes while still preventing regressions:

- known gaps are stored in `build/docgen-metadata-allowlist.json`
- validator fails on new gaps not in allowlist
- validator warns on stale allowlist entries that can be removed

## Contract Evolution

When improving metadata coverage:

1. Add missing descriptions in component source comments.
2. Regenerate docgen output.
3. Remove resolved entries from allowlist.
4. Keep validator strict for new regressions.
