# Cedar Consumer Contract System

## Goal

Cedar components should provide the same predictable consumer contract shape as Cedar tokens:

- semantic root contract
- focused module contract
- complete metadata contract for IDE hover and docs
- runtime/type parity contract

## Contract Surfaces

1. Semantic root surface

- Example: package root exports grouped, stable public contracts.
- Consumer promise: easy discovery and consistent import ergonomics.

2. Focused domain surface

- Example: narrow imports for specific domains.
- Consumer promise: small import boundary and clearer intent.

3. Flat utility surface

- Example: one-off tooling and scripts.
- Consumer promise: complete machine-readable access.

## Contract Metadata Requirements

Every exported consumer-facing symbol should be backed by metadata that can power IDE and docs:

- description
- value shape or default (where relevant)
- deprecation and replacement guidance (where relevant)
- stability tier (`stable`, `experimental`, `deprecated`)

## Implementation Principles

1. Single source of truth

- Runtime values, type declarations, and docs should be generated from one source.

2. Publish-time safety gates

- Fail if public export entries point to missing files.
- Fail if root/focused contract entries are missing required files.

3. Consumer-first defaults

- Keep semantic root ergonomic.
- Keep focused modules explicit and composable.

## Feature Enhancement Plan (Prioritized)

- [x] FE1: Add consumer contract docs and system checklist in repo docs.
- [x] FE2: Add build-time validator for public contract export integrity.
- [x] FE3: Wire contract validator into standard scripts so regressions fail fast.
- [x] FE4: Define component type metadata schema and generator acceptance criteria.
- [x] FE5: Add docgen output checks that enforce metadata presence for component API docs.

## Done Criteria

A feature is done when all are true:

- code and docs updated
- script/lint or test gate added when applicable
- checklist item marked complete in this file
