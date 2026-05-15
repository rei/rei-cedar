# Cedar Token Migration PR Notes

## Summary

- Upgrades `@rei/cdr-tokens` from `14.0.0-alpha.0` to `14.0.0-alpha.7`.
- Aligns Cedar type and spacing APIs with token-derived names from `@rei/cdr-tokens`.
- Replaces legacy numeric text scale props with dashed Cedar token-style values such as `scale-minus-1`, `scale-0`, and `scale-4`.
- Keeps Cedar spacing option names descriptive (`scale-4`, `scale-3--5`) while mapping them to canonical token CSS custom properties (`--cdr-space-scale-4`, `--cdr-space-scale-3-5`).
- Imports runtime token values directly from `@rei/cdr-tokens/tokens` and keeps only Cedar-specific token adapters in `src/tokens/adapters.ts`.

## Breaking Changes

### Text Preset `scale` Props

Text preset components now expect dashed Cedar scale values derived from `@rei/cdr-tokens` `CdrTypeKey` values instead of bare numeric strings.

| Previous value | New value       |
| -------------- | --------------- |
| `-2`           | `scale-minus-2` |
| `-1`           | `scale-minus-1` |
| `0`            | `scale-0`       |
| `1`            | `scale-1`       |
| `2`            | `scale-2`       |
| `3`            | `scale-3`       |
| `4`            | `scale-4`       |
| `5`            | `scale-5`       |
| `6`            | `scale-6`       |
| `7`            | `scale-7`       |

Affected components:

- `CdrBody`
- `CdrSubheadingSans`
- `CdrUtilitySans`
- `CdrUtilitySerif`
- `CdrHeadingDisplay`
- `CdrHeadingSans`
- `CdrHeadingSerif`
- `CdrFulfillmentTile` content scale options

Example migration:

```vue
<!-- Before -->
<CdrBody scale="1">Body text</CdrBody>

<!-- After -->
<CdrBody scale="scale-1">Body text</CdrBody>
```

### Removed `ScaleValue` Type

`ScaleValue` was removed from `src/types/other.ts`. Use `TypeScale` instead.

```ts
import type { TypeScale } from '@rei/cedar';
```

For constrained text scales, use `Extract<TypeScale, ...>` as component props do internally.

### Space Scale Option Names

The public Cedar-facing spacing option names remain descriptive:

- `scale-0` through `scale-8`
- `scale-0--1`
- `scale-3--4`
- `scale-3--5`

Do not use shortened forms like `4`, `35`, `01`, or `34` for Cedar spacing options.

### Compound Space CSS Custom Properties

Canonical CSS custom property names now match `@rei/cdr-tokens`:

| Cedar option | Canonical CSS custom property |
| ------------ | ----------------------------- |
| `scale-0--1` | `--cdr-space-scale-0-1`       |
| `scale-3--4` | `--cdr-space-scale-3-4`       |
| `scale-3--5` | `--cdr-space-scale-3-5`       |

Old double-hyphen CSS custom properties such as `--cdr-space-scale-3--5` should not be documented or used.

### Token Package Source

The repo now consumes the published token package instead of the local workspace override:

- `@rei/cdr-tokens`: `14.0.0-alpha.7`
- `pnpm-workspace.yaml` local override was removed

If local token development is needed, use a temporary local setup outside this production migration branch.

## Non-Breaking Changes

### Token-Derived Types

`src/types/other.ts` now derives core Cedar token types from `@rei/cdr-tokens` key types where available:

- `Breakpoint`
- `TypeScale`
- `Background`
- `BorderColor`
- `Radius`
- `Shadow`
- `SpaceFixed`
- `SpaceFluid`
- `SpaceScale`
- `Space`

Semantic Cedar-only values remain in `src/types/other.ts`.

### Runtime Token Access

Runtime token values are imported directly from `@rei/cdr-tokens/tokens`.

The local `src/tokens/adapters.ts` module only provides Cedar-specific mapping helpers:

- `typeScaleCssSuffix()` for mapping `CdrTypeKey` values to CSS variable suffixes

### Text Preset CSS Variables

Text preset components now emit canonical CSS custom properties for negative type scales:

| Previous output       | New output                 |
| --------------------- | -------------------------- |
| `--cdr-type-scale--1` | `--cdr-type-scale-minus-1` |
| `--cdr-type-scale--2` | `--cdr-type-scale-minus-2` |

Line-height mappings now use the token package’s available fluid line-height tokens:

- `CdrBody` uses `cdr-line-height-ratio-body-1` for `scale-1`.
- `CdrBody` uses `cdr-line-height-ratio-body-0` for smaller body scales.
- `CdrSubheadingSans` maps `scale-minus-1` to `cdr-line-height-ratio-subheading-sans-0`.

## Docs Site Update Notes

Use these notes when updating `https://cedar.rei.com/tokens/web#text-fluid%20type%20scale` and related token pages.

### Text Fluid Type Scale

Document text scale prop usage with token key names instead of legacy numeric prop values.

Recommended docs copy:

```md
Text preset `scale` props use Cedar token key names from `@rei/cdr-tokens`.

Use `scale-minus-2`, `scale-minus-1`, `scale-0`, `scale-1`, and higher `scale-*` values depending on the preset. These map to canonical CSS custom properties like `--cdr-type-scale-minus-1`, `--cdr-type-scale-0`, and `--cdr-type-scale-4`.
```

Examples to update:

```vue
<!-- Before -->
<CdrUtilitySans scale="-1">Utility text</CdrUtilitySans>
<CdrHeadingDisplay scale="4">Display heading</CdrHeadingDisplay>

<!-- After -->
<CdrUtilitySans scale="scale-minus-1">Utility text</CdrUtilitySans>
<CdrHeadingDisplay scale="scale-4">Display heading</CdrHeadingDisplay>
```

### Fluid Line Height

Call out that text preset components use the available fluid line-height tokens from the token package:

- `cdr-line-height-ratio-body-0`
- `cdr-line-height-ratio-body-1`
- `cdr-line-height-ratio-subheading-sans-0`
- `cdr-line-height-ratio-subheading-sans-1`
- `cdr-line-height-ratio-subheading-sans-2`
- `cdr-line-height-ratio-utility-minus-1`
- `cdr-line-height-ratio-utility-0`
- `cdr-line-height-ratio-utility-1`
- `cdr-line-height-ratio-utility-2`
- `cdr-line-height-ratio-utility-3`

### Space Scale Docs

Keep Cedar option names distinct from CSS custom property names.

| Docs concept         | Use this shape          |
| -------------------- | ----------------------- |
| Cedar spacing option | `scale-3--5`            |
| CSS custom property  | `--cdr-space-scale-3-5` |
| Token name           | `CdrSpaceScale35`       |

Recommended docs copy:

```md
Cedar spacing options keep the existing descriptive option names, such as `scale-4` and `scale-3--5`. These map to canonical token CSS custom properties, such as `--cdr-space-scale-4` and `--cdr-space-scale-3-5`.
```

## PR Description Draft

## Summary

- Upgrade Cedar to `@rei/cdr-tokens@14.0.0-alpha.7` and remove the local token workspace override.
- Migrate text preset `scale` props to dashed Cedar token-style values derived from `CdrTypeKey`.
- Import runtime token values directly from `@rei/cdr-tokens/tokens` and keep Cedar-specific token/CSS-var helpers in `src/tokens/adapters.ts`.
- Restore descriptive Cedar spacing option names while mapping to canonical token CSS custom properties.
- Add generated token type scaffolding and runtime helper tests.

## Breaking Changes

- Text preset `scale` props no longer use bare numeric strings such as `-1`, `0`, or `4`; use dashed values such as `scale-minus-1`, `scale-0`, and `scale-4`.
- `ScaleValue` was removed; use `TypeScale` for type-scale values.
- Compound space CSS custom properties now use token-canonical single-hyphen numeric ranges, such as `--cdr-space-scale-3-5`.

## Testing

- `pnpm lint`
- `pnpm unit`
- `pnpm build`

## Follow-Up Docs Work

- Update text preset examples to use dashed Cedar token-style scale props.
- Update token docs to distinguish Cedar option names (`scale-3--5`) from CSS custom properties (`--cdr-space-scale-3-5`).
- Update the Web Tokens text fluid type scale page to show `scale-minus-*` / `scale-*` prop values.
