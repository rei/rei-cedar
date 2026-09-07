# Action-Family Semantic Token Implementation (Link, Pagination, Chip, Card)

**Status:** Follow-up to Button (reference) and Banner (`docs/banner-semantic-implementation.md`)

This document covers the four remaining action-family migrations. Each follows the
Button pattern — contract (`*.tokens.ts`) → generated maps (`pnpm build:maps`) →
module consumes maps — with family-specific notes below. CdrButton itself needed no
changes (its generated outputs are byte-identical before/after the pipeline work).

## Intent Classification

| Component     | Family                               | Identity mapping                              |
| ------------- | ------------------------------------ | --------------------------------------------- |
| CdrLink       | `action` (navigation)                | `standard → trigger`, `neutral → neutral`     |
| CdrPagination | `action` (navigation)                | single `default → neutral`                    |
| CdrChip       | `selection` (choice selection)       | `default → neutral`, `selected → neutral`     |
| CdrCard       | _(omitted — foundation-only canvas)_ | `default → neutral`, `link overlay → trigger` |

None declares a `recipe`: only pressable-style components get generated CSS, so all
four consume the SCSS maps directly (Banner precedent).

## Per-Component Notes

### CdrLink (`src/components/link/CdrLink.tokens.ts`)

- Text-like component: only `text`/`icon` slots are consumed; `surface`/`border`
  repeat the text suffix with no legacy fallback so the matrix stays uniform. They
  are unconsumed and inert — NOT a token requirement.
- `focus-visible` repeats rest (focus changes only the outline today); `disabled`
  repeats rest with no fallback (no disabled styling exists).
- `standalone` is decoration-only, `inheritColor` is a behavior — neither carries tokens.
- The old per-property override API (`--cdr-link-text-color`, …) is replaced by the
  `--cdr-link-*` chain (same trade-off as Button/Banner).

### CdrPagination (`src/components/pagination/CdrPagination.tokens.ts`)

- Single `default` variant: text/fill `neutral` (legacy `text-primary`, disabled
  `text-disabled`), hover wash `surface-neutral-faint` (legacy `pagination-hover`),
  current-page keyline `border-neutral` (legacy `pagination-keyline`).
- Rest/disabled surfaces and the disabled border are unconsumed (transparent
  backgrounds) and intentionally bare. Hover/focus/active share one wash value
  but consume distinct props so states can diverge later.

### CdrChip (`src/components/chip/CdrChip.tokens.ts`)

- First `selection`-family component. Two variants (`default`, `selected`) because
  the generator has no `conditions` support — the selected treatment reassigns the
  same `--cdr-chip-*` properties under `[aria-pressed]`, so state rules follow
  automatically (pressed wins over disabled, matching legacy CSS order).
- Expressions use only Figma-confirmed selection steps: rest faint, hover/focus
  base (focus distinguished by elevation, as in legacy), active/selected subtle,
  disabled trace. Text never recolors (legacy parity).
- The legacy `selected-:active` block's own quirk (it references the
  `selected-focus` border token) is preserved verbatim.

### CdrCard (`src/components/card/CdrCard.tokens.ts`)

- Foundation-only: `interaction` is omitted because card surfaces are primitive
  canvas colors. Two variants: `default` (canvas) and `link` (stretched overlay,
  whose hover escapes to the real Figma token `action-text-trigger` via fullPath).
- Border/icon slots are unconsumed (elevation via box-shadow) and bare.
- Cards's canvas tokens do not exist in the deck — see gap G3 below.

## Figma Gap Matrix (verified against `Visual Token Mapping & Examples`)

Every semantic var emitted by the five migrated components was checked against the
deck's 163 mapped names. `EXISTS` = in the deck; `ABSENT + consumed` = renders via
legacy fallback today, token must be added; `ABSENT + inert` = unconsumed bare var,
no action needed.

| #   | Token                                                                                                                                               | Used by                     | Deck    | Status                                                                                           |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ------- | ------------------------------------------------------------------------------------------------ |
| G1  | `feedback.surface/text/border.neutral` (+`text-neutral-bold`)                                                                                       | Banner default              | ABSENT  | **Gap, consumed** — flagged for design                                                           |
| G2  | `surface-primary`, `text-primary`                                                                                                                   | Card canvas                 | ABSENT  | **Gap, consumed** — flagged for design                                                           |
| G3  | `action.surface.trigger` (+`-faint`)                                                                                                                | Link surface slot           | ABSENT  | Inert (unconsumed), no action                                                                    |
| –   | `feedback.*` colored identities, `action.text.trigger`(+`-faint`), `action.*.neutral`, `selection.*.neutral` steps, universal `border/text.neutral` | Banner/Link/Pagination/Chip | EXISTS  | No gap                                                                                           |
| –   | Chip selected depth                                                                                                                                 | Chip                        | Partial | Expressive gap: no bold/intense selection surface exists; `subtle` is the darkest available step |

Net: Link, Pagination, and Chip introduce **no new consumed-token gaps**. The two
consumed gaps remain Banner-default (G1) and Card-canvas (G2) — both render correctly
today through legacy fallbacks and both name exactly what design must add.

## Files Added / Modified (this batch)

- `src/components/{link,chip,card}/C*.tokens.ts` + `styles/vars/C*.maps.scss` (new)
- `src/components/pagination/CdrPagination.tokens.ts` + `styles/vars/CdrPagination.maps.scss` (new)
- `src/components/{link,chip,card,pagination}/styles/*.module.scss|*.vars.scss` — consume maps
- `build/component-variables-transfer.ts` — all new maps/vars registered
- `docs/action-semantic-implementation.md` — this file

## Testing

```bash
pnpm vitest run src/components/link src/components/chip src/components/card src/components/pagination
```

All suites pass with untouched snapshots (selectors unchanged; only custom-property
plumbing moved). Visual parity holds by construction: every consumed property keeps
its legacy fallback, verified by compiling each module against `@rei/cdr-tokens`.
