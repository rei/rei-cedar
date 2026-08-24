# Architecture Decision Record: Tooling and Package Modernization (PR Scope)

- **Owner:** Cedar maintainers
- **Scope:** Development tooling and contributor workflow

## Context

This PR updates core project tooling across package management, tests, docs/dev experience,
linting, package publishing, and build system organization.

Primary goals:

- Improve install and build reproducibility across local development and CI.
- Reduce feedback-loop time for tests and linting.
- Align tooling with the current Vue 3 + Vite ecosystem used by Cedar.
- Support modular component imports without expanding Cedar's public API surface unintentionally.
- Make published package contents more explicit and maintainable.
- Keep component runtime API stable while modernizing contributor workflows.

Non-goals for this PR:

- No redesign of component public APIs.
- No breaking removal of the existing root library entrypoint.
- No formal ADR governance rollout yet (template/process can be a follow-up ADR).

## Decision Summary

We are standardizing on:

- **pnpm** for package management and lockfile integrity
- **Vitest** for unit test execution (including snapshots)
- **Vite 8** as the primary build tool for library and local development workflows
- **Storybook 10 (Vue 3 + Vite)** for component development and visual documentation
- **Oxlint + Stylelint + vue-tsc** as the enforced lint/typecheck pipeline
- **Generated modular entrypoints** for `@rei/cedar/<component>` and `@rei/cedar/<component>/types`
- **Explicit package exports** to keep internal implementation files out of the published API surface
- A dedicated **`build/` directory** for custom build scripts and Vite helpers

This standardization applies to local development, CI, and contributor documentation.

Additionally, git hooks are part of the enforcement path via Husky, especially pre-commit checks.

## Why these tools were chosen

### 1) pnpm

- Faster and more deterministic installs in CI and local workflows.
- Strict dependency resolution helps surface undeclared dependency issues earlier.
- Workspace already includes `pnpm-lock.yaml` and CI/husky hooks are aligned to pnpm commands.
- Content-addressable storage and symlinked dependency layout reduce disk duplication and speed repeated installs.
- Standardizing on a single lockfile format avoids drift between local and CI dependency trees.

### Why Corepack is mentioned

- We do **not** strictly require Corepack to use pnpm, but it is the preferred bootstrap path.
- Corepack (bundled with modern Node) helps ensure developers invoke the intended package manager consistently.
- This reduces version skew from globally installed pnpm binaries and lowers "works on my machine" issues.
- If a contributor already has a compatible pnpm setup, they can continue using it without mandatory Corepack steps.

### 2) Vitest

- Native fit with Vite/Vue build tooling, with fast startup and watch mode.
- Jest-like developer ergonomics with better Vite integration.
- Existing tests and snapshots are already compatible with Vitest conventions.
- Shared transform pipeline with Vite reduces configuration duplication between app build and tests.
- Good support for jsdom-based component tests and snapshot workflows already used in this repository.

### 3) Storybook

- Gives contributors a focused component development environment.
- Improves visual QA, a11y checks (addon-a11y), and component discoverability.
- Uses `@storybook/vue3-vite`, matching the project's Vue 3 + Vite stack.
- Strengthens communication with design/QA by providing isolated, reproducible component states.
- Reduces local ad-hoc demo setup by making Storybook the standard component playground.
- Storybook 10 keeps Cedar aligned with the current addon/runtime ecosystem and Vite integration.

### 4) Vite 8

- Keeps Cedar aligned with the actively maintained Vue build ecosystem.
- Supports library-mode output for both the root entry and generated component entrypoints.
- Reduces bespoke bundler maintenance by consolidating around Vite-driven build configuration.
- Works cleanly with Vitest and Storybook's Vite-based builder.

### 5) Oxlint + Stylelint + vue-tsc

- Oxlint provides fast JavaScript and TypeScript lint feedback during local development and pre-commit.
- Stylelint continues to enforce SCSS and BEM conventions used by Cedar components.
- `vue-tsc` remains the source of truth for type-checking Vue SFCs and library types.
- This split keeps each tool focused on the part of the codebase it validates best.

### 6) Generated modular entrypoints and explicit exports

- Cedar now supports modular imports like `@rei/cedar/button` and `@rei/cedar/button/types`.
- Entrypoints are generated from component source directories to avoid hand-maintaining export lists.
- The package `exports` map now explicitly defines what is public instead of exposing `dist/*` broadly.
- This preserves root imports while preventing accidental imports of internal source structure.

### 7) Dedicated `build/` directory

- Custom scripts such as docgen, lint reporting, and entrypoint generation are now grouped under `build/`.
- Build-only Vite helpers and Rollup/Rolldown configuration are colocated with those scripts.
- This reduces repository-root clutter and makes build ownership easier to understand.

## Packaging and build implications

- `build/generate-entrypoints.ts` generates library entry files under `src/entrypoints/` before the main Vite build.
- `build/generate-entrypoint-dts.ts` creates publish-facing `.d.ts` proxies after the main build.
- Published declarations exclude internal Storybook and example artifacts such as `*.stories.d.ts` and `examples/**/*.d.ts`.
- Storybook builds explicitly filter out `vite-plugin-dts` so `build-storybook` does not emit package declaration files.
- CSS remains a supported public artifact through explicit `exports` entries for built styles.

## Migration path for developers

### Prerequisites

- Node.js version must satisfy `engines.node` (`>=22.12.0 <23`); `.nvmrc` pins the current project version.
- Use pnpm for all package/script workflows.
- Optionally enable Corepack for consistent pnpm invocation:
  - `corepack enable`
  - `corepack prepare pnpm@10.23.0 --activate` (optional if pnpm already available and compatible)

### First-time setup

1. Confirm Node version meets minimum requirement.
2. Ensure pnpm is available (via Corepack or existing install).
3. Run `pnpm install` from repository root.
4. Verify baseline by running `pnpm unit` and `pnpm lint`.

### Day-to-day command mapping

- Install dependencies: `pnpm install`
- Start dev server: `pnpm dev`
- Run unit tests: `pnpm unit`
- Run unit tests in watch mode: `pnpm watch`
- Update snapshots: `pnpm unit:update`
- Run lint suite: `pnpm lint`
- Start Storybook: `pnpm storybook`
- Build Storybook: `pnpm build-storybook`
- Build the package: `pnpm build`
- Run all tests (unit + e2e): `pnpm test`

### Husky pre-commit details

- The pre-commit hook runs: `pnpm unit && pnpm lint-staged`.
- This means each commit must pass unit tests and staged-file lint/format checks before commit creation.
- `lint-staged` currently applies:
  - Oxlint autofix on staged `src/**/*.{js,ts,vue,mjs}`
  - Stylelint autofix on staged `src/**/*.scss`
  - Oxfmt write on staged `src/**/*`
- If the hook fails, fix issues and re-stage updated files before retrying commit.
- To avoid repeated failures, run `pnpm unit` and `pnpm lint` proactively before committing larger changes.

### Contributor expectations

- Prefer pnpm for all local and CI workflows.
- Keep build automation under `build/` rather than reintroducing ad-hoc root scripts.
- Treat `package.json#exports` as the contract for Cedar's public API surface.
- Prefer modular imports for targeted consumption when documenting package usage.
- Keep unit tests/snapshots compatible with Vitest.
- Keep Storybook stories current for new components or meaningful visual states.
- Do not rely on Storybook builds to generate publishable type declarations.
- Do not introduce parallel npm/yarn lockfiles.
- Keep commits pre-commit-clean: do not bypass Husky except in emergency situations coordinated with maintainers.

## Breaking changes / behavior changes

1. **Package manager standardization:** pnpm is now the expected package manager for lockfile and automation consistency.
   - Impact: contributors using npm/yarn need to switch commands and avoid generating additional lockfiles.
2. **Unit test runner behavior:** Jest-specific assumptions or CLI flags may no longer apply; use Vitest scripts.
   - Impact: local aliases and IDE test configurations may need updates to Vitest commands.
3. **Lint workflow:** JavaScript linting is enforced through Oxlint, with Stylelint and `vue-tsc` covering styles and types.
   - Impact: contributor workflows and troubleshooting should reference the current lint commands, not legacy ESLint assumptions.
4. **Package import surface:** modular component paths are now supported, while internal package paths are intentionally blocked by explicit exports.
   - Impact: consumers can import from supported component entrypoints, but deep imports into internal files are no longer part of the contract.
5. **Build layout:** custom build scripts and helpers now live under `build/`.
   - Impact: contributor documentation and tooling references should use the new file locations.
6. **Node runtime floor:** contributors and CI must run a supported Node version matching `engines.node` (`>=22.12.0 <23`).
   - Impact: local Node versions outside Node 22 will fail installs/scripts.
7. **Commit-time quality gate:** Husky pre-commit now enforces unit + staged lint/format checks.
   - Impact: commits can be blocked until local quality issues are resolved.

## Rollback / mitigation

- If onboarding friction occurs, provide a short troubleshooting section in README (pnpm install issues, Node version mismatch, Corepack fallback).
- If CI inconsistencies appear, prioritize lockfile regeneration and dependency cache reset before rule/test changes.
- If package-consumer regressions appear, verify the generated entrypoints and explicit `exports` map before relaxing package boundaries.

## Follow-up (recommended)

- Introduce a formal ADR directory and template (for example: `docs/adr/0001-...md`).
- Define ADR lifecycle states (`proposed`, `accepted`, `superseded`) and required reviewers.
- Backfill ADRs for major historical decisions where context is missing.
- Consider documenting the supported modular import surface in the README or release notes for consumers.
