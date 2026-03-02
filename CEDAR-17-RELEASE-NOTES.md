# Cedar 17

TypeScript types for all components, tree-shakeable per-component entrypoints, Vue 3 script-setup migration, Storybook, and a modernized toolchain.

## Update steps

| package name | version |
|---|---|
| `@rei/cedar` | ^17.x.x |

> **Node.js requirement raised:** Cedar 17 requires **Node.js >= 22**. Node 20 is no longer supported.

---

## New features

### TypeScript types for every component

Every Cedar component now ships a `types.ts` that exports a fully-typed `Props` interface. Types are re-exported from each component's individual entrypoint and from the main package entry:

```ts
import type { CdrButtonProps, CdrInputProps, CdrModalProps } from '@rei/cedar';
```

This enables autocomplete, inline prop documentation, and compile-time safety in TypeScript projects with no additional setup. Examples of the new interfaces:

```ts
import type { CdrAccordionProps } from '@rei/cedar/accordion';
import type { CdrInputProps }     from '@rei/cedar/input';
import type { CdrModalProps }     from '@rei/cedar/modal';

// Use them to type your own wrapper components or composables
const modalProps: CdrModalProps = {
  opened: true,
  label: 'Confirm action',
  role: 'alertdialog',
};
```

### Per-component tree-shakeable entrypoints

76 dedicated entrypoints have been added under `@rei/cedar/<component-name>`, one per component and one per text preset. Bundlers (Vite, Rollup, Webpack 5) can now eliminate every Cedar component your project does not use.

**Recommended usage — import only what you need:**

```ts
import { CdrButton }     from '@rei/cedar/button';
import { CdrInput }      from '@rei/cedar/input';
import { CdrModal }      from '@rei/cedar/modal';
import { CdrAccordion }  from '@rei/cedar/accordion';
import { CdrFilmstrip }  from '@rei/cedar/filmstrip';
```

**Types are co-located with the entrypoint:**

```ts
import { CdrButton }           from '@rei/cedar/button';
import type { CdrButtonProps } from '@rei/cedar/button';
```

**Text preset entrypoints:**

```ts
import { CdrText } from '@rei/cedar/heading-display';
import { CdrText } from '@rei/cedar/heading-serif';
import { CdrText } from '@rei/cedar/body';
import { CdrText } from '@rei/cedar/utility-sans';
import { CdrText } from '@rei/cedar/eyebrow';
```

**Avoid the barrel import in performance-sensitive contexts:**

```ts
// Before — pulls the entire Cedar bundle
import { CdrButton, CdrInput, CdrModal } from '@rei/cedar';

// After — bundler tree-shakes to only the three components above
import { CdrButton } from '@rei/cedar/button';
import { CdrInput }  from '@rei/cedar/input';
import { CdrModal }  from '@rei/cedar/modal';
```

The main `@rei/cedar` barrel import remains available and unchanged for projects that prefer it or that rely on a bundler with full tree-shaking already configured.

### New exports added to the main entrypoint

The following components existed in the codebase but were not exported from `@rei/cedar`. They are now fully public and available from both the barrel and their dedicated entrypoints:

| Component | Entrypoint |
|---|---|
| `CdrFormError` | `@rei/cedar/form-error` |
| `CdrLabelStandalone` | `@rei/cedar/label-standalone` |
| `CdrLabelWrapper` | `@rei/cedar/label-wrapper` |
| `CdrPopup` | `@rei/cedar/popup` |
| `CdrFilmstripEngine` | `@rei/cedar/filmstrip-engine` |

### Storybook

`storybook` ^8.6 with the `@storybook/vue3-vite` builder, accessibility addon, and essentials addon has been added to the project. This provides an interactive development and documentation environment for components, making it easier to explore Cedar components in isolation, test edge cases, and review accessibility directly in the browser.

---

## Vue 3 component migration

35 components have been migrated from the legacy Options API / runtime `defineProps` object syntax to the modern Vue 3 `<script setup>` + TypeScript generic API. This is an internal refactor — the public prop API of each component is unchanged.

**What changed internally:**

```ts
// Before — runtime object syntax with inline JSDoc
const props = defineProps({
  modifier: {
    type: String,
    required: false,
    default: 'primary',
    validator: (value: string) => propValidator(value, ['primary', 'secondary']),
  },
});

// After — TypeScript generic syntax backed by the new types.ts
const props = withDefaults(defineProps<CdrButtonProps>(), {
  modifier: 'primary',
});
```

12 components also added `defineSlots<{}>()` typed slot declarations, giving TypeScript consumers slot-level type checking:

```ts
// Example: CdrToast now declares its slots with types
defineSlots<{
  /** Icon matching toast messaging type */
  'icon-left'(props: Record<string, never>): any;
  /** Toast message body */
  'default'(props: Record<string, never>): any;
}>();
```

**Migrated components:** `CdrAbstract`, `CdrAccordion`, `CdrAccordionGroup`, `CdrCheckbox`, `CdrFilmstripEngine`, `CdrFulfillmentTile`, `CdrImg`, `CdrInput`, `CdrKicker`, `CdrLink`, `CdrMediaObject`, `CdrModal`, `CdrObjectOverlay`, `CdrPagination`, `CdrPicture`, `CdrPopover`, `CdrRating`, `CdrSelect`, `CdrSplitSurface`, `CdrSurfaceSelection`, `CdrTabs`, `CdrText`, `CdrTitle`, `CdrToast`, `CdrToggleGroup`, `CdrTooltip`, and all 8 text preset components (`CdrBody`, `CdrEyebrow`, `CdrHeadingDisplay`, `CdrHeadingSans`, `CdrHeadingSerif`, `CdrSubheadingSans`, `CdrUtilitySans`, `CdrUtilitySerif`).

---

## Breaking changes

### Node.js minimum version raised to 22

The `engines` field in `package.json` now requires `node >= 22.0.0`. The `npm` engine constraint has been removed in favour of the existing `pnpm` lockfile.

### `tabbable` upgraded from v4 to v6

`tabbable` is a runtime dependency used by the focus-trap logic in `CdrPopover` and `CdrModal`. v6 switched from a default export to named exports:

**Before (tabbable v4)**
```ts
import tabbable from 'tabbable';
tabbable(container);
```

**After (tabbable v6)**
```ts
import { tabbable } from 'tabbable';
tabbable(container);
```

If your project imports `tabbable` directly alongside Cedar, update to the named export.

---

## Bug fixes

### `CdrTabPanel`: removed erroneous `aria-hidden` on active panel

`CdrTabPanel` was setting `:aria-hidden="!isActive"` on the panel element. This caused the active tab panel — which is visible and focusable via `tabindex="0"` — to be simultaneously hidden from the accessibility tree in some states, breaking screen reader navigation. The attribute has been removed; visibility is now controlled exclusively by `v-show`.

### `CdrFilmstripEngine`: resize observer lifecycle fixed

The `useResizeObserver` call was previously initialised inside `onMounted` with its cleanup registered inside `onUnmounted` — also nested inside `onMounted`. This caused the cleanup to never run in certain unmount sequences, leaking the observer. The observer is now initialised at setup time and its stop handle is called directly in `onUnmounted`.

### `CdrPopover`: `aria-controls` now set imperatively on mount

`aria-controls` could be missing from the trigger element in certain slot rendering orders. It is now explicitly applied in `onMounted` to guarantee the attribute is always present regardless of slot timing.

### `CdrLabelStandalone`: removed stray whitespace adjacent to required/optional spans

A template formatting inconsistency caused a stray space character to appear next to the required asterisk and optional label text in some rendering contexts. The template whitespace has been normalised.

### `CdrTabs`: resize and scroll listeners now cleaned up on unmount

`CdrTabs` adds `resize` and `scroll` event listeners on mount. These were not removed on unmount, causing memory leaks when tabs were conditionally rendered. `onUnmounted` now calls `removeEventListener` for both handlers.

---

## Toolchain updates

### ESLint + Prettier replaced by oxlint + oxfmt

| Before | After |
|---|---|
| `eslint` ^8 + `eslint-plugin-vue` + `@typescript-eslint/*` | `oxlint` ^1.50 |
| `prettier` + `eslint-plugin-prettier` | `oxfmt` ^0.35 |

`.eslintrc` and `.prettierrc.json` are removed. Config now lives in `.oxlintrc.json` and `.oxfmtrc.json`. `lint-staged` runs both tools automatically on staged files via the Husky pre-commit hook.

Contributor commands:

```sh
pnpm lint:js          # check
pnpm lint:js:fix      # auto-fix
pnpm format:check     # check formatting
pnpm format           # auto-format
```

### Commitizen + commitlint enforced on every commit

Conventional Commits are now enforced at commit time:

- `commitizen` (`cz-conventional-changelog`) is wired to `prepare-commit-msg` via Husky. Running `git commit` launches an interactive prompt.
- `commitlint` validates the final message against `@commitlint/config-conventional`.

```sh
pnpm commit   # guided commit wizard
```

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `revert`, `vercel`.

### Major dependency version bumps

| Package | Before | After |
|---|---|---|
| `vite` | ^5.0 | ^7.3 |
| `vitest` | ^1.1 | ^4.0 |
| `typescript` | 5.6.3 | 5.9.3 |
| `vue-tsc` | 2.1.10 | 3.2.2 |
| `vite-plugin-dts` | ^3.3 | ^4.5 |
| `@vitejs/plugin-vue` | ^4 | ^6 |
| `husky` | ^4 | ^9 |
| `@playwright/test` | ^1.49 | ^1.57 |
| `@vue/test-utils` | ^2.2 | ^2.4 |
| `sass` | ^1.9 | ^1.97 |
| `stylelint` | ^16.10 | ^16.26 |
| `postcss` | ^8.4 | ^8.5 |
| `jsdom` | ^16 | ^27 |
| `sinon` | ^11 | ^21 |
| `fs-extra` | ^10 | ^11 |
| `glob` | ^7 | ^13 |
| `chalk` | ^4 | ^5 |
| `c8` | ^7 | ^10 |

### `@types/tabbable` removed

Type declarations are now bundled inside `tabbable` v6 itself, so the separate `@types/tabbable` dev dependency has been removed.

---

## Test suite

All **64 test files / 550 tests** pass. As part of the Vue 3 migration and oxfmt formatting rollout, all spec files across every component and utility were updated to match the new code style (trailing commas, consistent semicolons, import grouping). All affected snapshots have been regenerated to reflect the reformatted component templates.
