# AGENTS.md — REI Cedar Component Library

Cedar is REI's Vue 3 component library (`@rei/cedar`). This file provides guidance
for agentic coding assistants working in this repository.

---

## Package Manager & Node

- **Always use `pnpm`** — never `npm` or `yarn`. Do not create `package-lock.json` or `yarn.lock`.
- **Node >= 22.0.0** required.

---

## Build / Lint / Test Commands

### Development

```bash
pnpm dev              # Vite dev server on port 3000
pnpm storybook        # Storybook on port 6006
pnpm watch            # Vitest in interactive watch mode
```

### Build

```bash
pnpm build            # Full production build (type-check → ESM → UMD → icons → docgen → CSS)
pnpm build:umd        # UMD bundle only
pnpm clean            # Remove dist/
```

### Tests

```bash
pnpm unit                                            # Run all unit tests (single pass)
pnpm unit -- src/components/button/__tests__/CdrButton.spec.js  # Run ONE test file
pnpm vitest run src/components/button/__tests__/CdrButton.spec.js  # Equivalent
pnpm vitest run -t "renders correctly"               # Run tests matching a name pattern
pnpm unit:update                                     # Update snapshots
pnpm coverage                                        # Unit tests + coverage report
pnpm test:playwright                                 # Playwright e2e tests (requires dev server)
```

> Unit tests live in `src/components/<name>/__tests__/<Name>.spec.js`.
> Test files are plain JavaScript (not TypeScript).

### Lint & Format

```bash
pnpm lint             # Run all linters (ESLint + Stylelint + type-check)
pnpm lint:js          # ESLint only (src/**/*.{js,vue,ts,mjs})
pnpm lint:js:fix      # ESLint with auto-fix
pnpm lint:styles      # Stylelint on SCSS
pnpm lint:styles:fix  # Stylelint with auto-fix
pnpm lint:types       # vue-tsc type-check (no emit)
pnpm format           # Prettier on all files
```

> **Pre-commit hooks** run `pnpm unit && lint-staged` automatically via Husky.
> `pnpm prepush` runs `lint` + `unit` — all must pass before pushing.

---

## Creating a New Component

```bash
pnpm create           # Interactive component scaffolding (runs generator.js)
```

---

## Project Structure

```
src/
  components/<name>/
    Cdr<Name>.vue             # Component (script setup + template + scoped style)
    types.ts                  # TypeScript prop types (exported as Cdr<Name>Props)
    Cdr<Name>.stories.ts      # Storybook stories
    styles/
      Cdr<Name>.module.scss   # CSS Modules SCSS
      vars/                   # SCSS variable/mixin partials
    examples/
    __tests__/
      Cdr<Name>.spec.js       # Vitest unit tests
      __snapshots__/
  styles/                     # Global SCSS (reset, fonts, palette, fluid vars)
  types/                      # Shared TS types
  utils/                      # mapClasses, buildClass, debounce, etc.
  props/                      # Shared prop definitions
  lib.ts                      # Public library entry point (all exports)
```

---

## Vue Component Code Style

### File Structure (always `<script setup lang="ts">`)

```vue
<script setup lang="ts">
// 1. Vue core
import { useCssModule, computed, ref, watch, onMounted } from 'vue';
import type { Ref } from 'vue';

// 2. Third-party / design tokens
import { CdrBreakpointSm } from '@rei/cdr-tokens';

// 3. Internal utilities
import mapClasses from '../../utils/mapClasses';

// 4. Sibling components
import CdrButton from '../button/CdrButton.vue';

// 5. Local types (always `import type`)
import type { CdrButtonProps } from './types';

defineOptions({ name: 'CdrButton' });

const props = withDefaults(defineProps<CdrButtonProps>(), {
  tag: 'button',
  modifier: 'primary',
});

defineSlots<{ default(props: Record<string, never>): any }>();

const emits = defineEmits<{ 'event-name': [event: Event] }>();

const style = useCssModule();
const baseClass = 'cdr-button';

const isOpen = ref<boolean>(false);

/** JSDoc on all computed properties */
const rootClass = computed<string>(() => `${baseClass}--active`);

const onClick = (e: Event): void => {
  /* ... */
};
</script>

<template>
  <component
    :is="tag"
    :class="mapClasses(style, baseClass, rootClass)"
  >
    <slot />
  </component>
</template>

<style lang="scss" module src="./styles/CdrButton.module.scss" />
```

### Key Rules

- Use `<script setup lang="ts">` — no Options API.
- Props are a TypeScript `type` (not `interface`) in `types.ts`, named `Cdr<Name>Props`.
- Use `withDefaults()` for all prop defaults; no `validator` functions — use TS union types.
- All class binding goes through `mapClasses(style, ...)` — never raw string concatenation.
- `<style>` tag always uses `lang="scss" module` with an external `src=` path.
- The `<script>` and `<style>` blocks are **not** indented (Prettier: `vueIndentScriptAndStyle: false`).

---

## Naming Conventions

| Item                    | Convention                        | Example                           |
| ----------------------- | --------------------------------- | --------------------------------- |
| Component files         | `PascalCase`, `Cdr` prefix        | `CdrButton.vue`                   |
| `defineOptions` name    | `PascalCase`, `Cdr` prefix        | `'CdrButton'`                     |
| Types / interfaces      | `PascalCase` (ESLint-enforced)    | `CdrButtonProps`                  |
| Props                   | `camelCase`                       | `iconOnly`, `fullWidth`           |
| Emits                   | `kebab-case`                      | `'accordion-toggle'`              |
| Slots                   | `kebab-case`                      | `'icon-left'`                     |
| CSS classes             | BEM (Stylelint-enforced)          | `cdr-button__icon--active`        |
| CSS base class constant | `camelCase` const                 | `const baseClass = 'cdr-button'`  |
| Event handlers          | `camelCase`, `on`/`handle` prefix | `onClick`, `handleTransitionEnd`  |
| Utility functions       | `camelCase`                       | `mapClasses`, `buildBooleanClass` |
| Provide/inject keys     | `camelCase` + `Key` suffix        | `selectedTabKey`, `motionKey`     |
| Component directories   | `camelCase`                       | `button/`, `formGroup/`           |

---

## TypeScript

- `strict: true` throughout. `noUnusedLocals` and `noUnusedParameters` are errors.
- `@typescript-eslint/no-explicit-any` is **off** — `any` is permitted.
- Unused identifiers prefixed with `_` are exempt (e.g. `_unused`).
- TypeScript is type-check only (`noEmit: true`); Vite handles transpilation.
- Type-only imports must use `import type`.

---

## SCSS / Styles

- CSS Modules — every component has its own `.module.scss`.
- **BEM naming** is enforced by Stylelint: `block__element--modifier`.
- Token import: `@use '@rei/cdr-tokens/dist/rei-dot-com/scss/cdr-tokens' as tokens;`
- Local vars: `@use './vars/CdrButton.vars' as vars;`
- Responsive breakpoint classes use escaped `@` suffix: `cdr-button--large\@sm`
- Responsive media queries use token mixins: `@include tokens.cdr-sm-mq-only { ... }`

---

## Formatting (Prettier)

- `printWidth: 100`, `tabWidth: 2`, spaces (no tabs)
- `singleQuote: true` in JS/TS
- `trailingComma: 'all'`
- `singleAttributePerLine: true` — each HTML attribute on its own line
- `semi: true`

---

## Testing Guidelines

- **Test files are `.spec.js`** (plain JavaScript, not TypeScript).
- Use `@vue/test-utils` (`mount`, `shallowMount`) and `sinon` for spies/stubs.
- Every component should have: snapshot test, default prop values, all accepted prop types,
  positive/negative cases, emitted events, and an axe accessibility check.
- When updating snapshots intentionally, run `pnpm unit:update` and explain the change in the PR.
- Boundary conditions to cover: conformance, ordering, range, existence, cardinality, edge values
  (null, empty string, very long strings, floats, 0).

---

## Commit Convention

Commits must follow **Conventional Commits** (enforced by commitlint + Husky):

```
<type>(<optional scope>): <description>
```

Allowed types: `feat`, `fix`, `docs`, `chore`, `style`, `refactor`, `ci`, `test`, `revert`, `perf`, `vercel`

---

## Accessibility

- All components must pass **WCAG 2.1 AA**.
- Unit tests should include an axe check (`@axe-core/playwright` for e2e).
- PR checklist requires axe pass on Chrome, Firefox, Edge, Safari, iOS, and Android.
