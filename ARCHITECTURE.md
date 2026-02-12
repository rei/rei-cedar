# Architecture Decision Record: Tooling Modernization (PR Scope)

- **Owner:** Cedar maintainers
- **Scope:** Development tooling and contributor workflow

## Context

This PR updates core project tooling across package management, tests, docs/dev experience, and linting.

Primary goals:

- Improve install and build reproducibility across local development and CI.
- Reduce feedback-loop time for tests and linting.
- Align tooling with the current Vue 3 + Vite ecosystem used by Cedar.
- Keep component runtime API stable while modernizing contributor workflows.

Non-goals for this PR:

- No redesign of component public APIs.
- No formal ADR governance rollout yet (template/process can be a follow-up ADR).

## Decision Summary

We are standardizing on:

- **pnpm** for package management and lockfile integrity
- **Vitest** for unit test execution (including snapshots)
- **Storybook (Vue 3 + Vite)** for component development and visual documentation
- **ESLint flat config** (`eslint.config.js`) as the single lint configuration entrypoint

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

### 4) ESLint flat config

- Uses ESLint's current recommended config model.
- Centralized, explicit config in `eslint.config.js` with clearer layering and overrides.
- Easier maintenance for mixed JS/TS/Vue codebases.
- Better long-term compatibility with ESLint v9+ ecosystem direction.
- Improves readability of lint intent by colocating ignore patterns, parser config, and rules.

## Migration path for developers

### Prerequisites

- Node.js version must satisfy `engines.node` (`>=22.0.0`).
- Use pnpm for all package/script workflows.
- Optionally enable Corepack for consistent pnpm invocation:
	- `corepack enable`
	- `corepack prepare pnpm@latest --activate` (optional if pnpm already available and compatible)

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
- Run all tests (unit + e2e): `pnpm test`

### Husky pre-commit details

- The pre-commit hook runs: `pnpm unit && pnpm lint-staged`.
- This means each commit must pass unit tests and staged-file lint/format checks before commit creation.
- `lint-staged` currently applies:
	- ESLint autofix on staged `src/**/*.{js,ts,vue,mjs}`
	- Stylelint autofix on staged `src/**/*.scss`
	- Prettier write on staged `src/**/*`
- If the hook fails, fix issues and re-stage updated files before retrying commit.
- To avoid repeated failures, run `pnpm unit` and `pnpm lint` proactively before committing larger changes.

### Contributor expectations

- Prefer pnpm for all local and CI workflows.
- Keep lint rule changes in `eslint.config.js` (not legacy `.eslintrc*` files).
- Keep unit tests/snapshots compatible with Vitest.
- Keep Storybook stories current for new components or meaningful visual states.
- Do not introduce parallel npm/yarn lockfiles.
- Keep commits pre-commit-clean: do not bypass Husky except in emergency situations coordinated with maintainers.

## Breaking changes / behavior changes

1. **Package manager standardization:** pnpm is now the expected package manager for lockfile and automation consistency.
	- Impact: contributors using npm/yarn need to switch commands and avoid generating additional lockfiles.
2. **Unit test runner behavior:** Jest-specific assumptions or CLI flags may no longer apply; use Vitest scripts.
	- Impact: local aliases and IDE test configurations may need updates to Vitest commands.
3. **Lint configuration model:** legacy ESLint config file patterns are superseded by flat config (`eslint.config.js`).
	- Impact: lint rule edits should be made in flat config format only.
4. **Node runtime floor:** contributors and CI must run Node 22+.
	- Impact: older local Node versions will fail installs/scripts.
5. **Commit-time quality gate:** Husky pre-commit now enforces unit + staged lint/format checks.
	- Impact: commits can be blocked until local quality issues are resolved.

## Rollback / mitigation

- If onboarding friction occurs, provide a short troubleshooting section in README (pnpm install issues, Node version mismatch, Corepack fallback).
- If CI inconsistencies appear, prioritize lockfile regeneration and dependency cache reset before rule/test changes.

## Follow-up (recommended)

- Introduce a formal ADR directory and template (for example: `docs/adr/0001-...md`).
- Define ADR lifecycle states (`proposed`, `accepted`, `superseded`) and required reviewers.
- Backfill ADRs for major historical decisions where context is missing.