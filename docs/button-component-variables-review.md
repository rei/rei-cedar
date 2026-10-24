# CdrButton local verification

Source migration: PR #249, commit `079647d939ea290b4719781fa8ea7eecbfe57ded`.
Both sibling checkouts use the local branch `local/button-contract-variables`.

Three independent adversarial reviews were completed. They found and resolved:

1. Missing legacy component hooks: all 108 are retained, including isolated
   elevated aliases. New component hooks take precedence. Deprecated global
   token defaults are excluded so they cannot cancel the semantic colors.
2. Incomplete CSS output and package setup: added elevated classes, standard Sass
   token paths, the standalone bundle, runtime token-loading documentation, and
   a package installation check without Vue.
3. Icon helpers losing to base-selector specificity: helpers now set the local
   size/padding variables consumed by the base. The alpha token upgrade also
   exposed Card's removed white Sass token; the scoped export preserves that
   existing fallback without migrating Card. The reviewer independently
   recompiled Card from the direct, index and bundle entrypoints and closed both
   findings.

Final checks:

- `pnpm unit`: 740 tests in 94 files pass.
- `pnpm test:variables`: 9 integration checks pass.
- `pnpm exec playwright test --config playwright.component-variables.config.ts`:
  12 tests pass across Chromium, Firefox and WebKit. These compare the examples
  around every breakpoint and exercise interaction states and legacy overrides.
- Lint, Sass lint, TypeScript, changed-file formatting and `git diff --check` pass.
- Rebuilding leaves all 53 generated artifacts byte-identical.
- Comparing the original PR Sass output with the refactored output finds zero
  declaration differences across its 71 original rules. Elevated CSS classes
  are additional output.
- An isolated tarball install compiled all three package entrypoints using Sass
  and tokens, with neither Vue nor `@rei/cedar` installed.
- The mobile view passed 105 variant × size × state comparisons and rendered at
  360px and 390px with no JavaScript errors.

The compatibility target is CdrButton's Sass API with the PR's semantic styling.
It still requires runtime semantic token CSS and migration of old global token
overrides. The work does not produce LESS or promise pixel identity with v11.
