# Button Figma → Cedar sync report

Snapshot: 2026-11-05. Generated from `pnpm figma:check:button --json`.

- Source: `color` (`VariableCollectionId:6508:5655`), mode `6508:1`
- Result: **DRIFT DETECTED**
- Mapped variables: 35; legacy: 6; contract targets: 74; verified: 62; errors: 12

## Mapped variables

| Figma variable                             | Figma alias                              | Resolved | Cedar target                  | Expected                                           | Status |
| ------------------------------------------ | ---------------------------------------- | -------- | ----------------------------- | -------------------------------------------------- | ------ |
| `button/primary/surface`                   | `color/action/surface/brand`             | #143528  | primary.rest.surface          | `--cdr-action-surface-brand` (#143528)             | ✅     |
| `button/primary/surface`                   | `color/action/surface/brand`             | #143528  | primary.active.surface        | `--cdr-action-surface-brand` (#143528)             | ✅     |
| `button/primary/text`                      | `color/action/text/neutral-faint`        | #f7f7f5  | primary.rest.text             | `--cdr-action-text-neutral-faint` (#f7f7f5)        | ✅     |
| `button/primary/text`                      | `color/action/text/neutral-faint`        | #f7f7f5  | primary.rest.icon             | `--cdr-action-icon-neutral-faint` (#f7f7f5)        | ✅     |
| `button/primary/text`                      | `color/action/text/neutral-faint`        | #f7f7f5  | primary.active.text           | `--cdr-action-text-neutral-faint` (#f7f7f5)        | ✅     |
| `button/primary/text`                      | `color/action/text/neutral-faint`        | #f7f7f5  | primary.active.icon           | `--cdr-action-icon-neutral-faint` (#f7f7f5)        | ✅     |
| `button/primary/border`                    | `color/action/border/brand`              | #143528  | primary.rest.border           | `--cdr-action-border-brand` (#143528)              | ✅     |
| `button/primary/border`                    | `color/action/border/brand`              | #143528  | primary.hover.border          | `--cdr-action-border-brand` (#143528)              | ✅     |
| `button/primary/border`                    | `color/action/border/brand`              | #143528  | primary.focus-visible.border  | `--cdr-action-border-brand` (#143528)              | ✅     |
| `button/primary/border`                    | `color/action/border/brand`              | #143528  | primary.active.border         | `--cdr-action-border-brand` (#143528)              | ✅     |
| `button/primary/surface-hover`             | `color/action/surface/brand-faint`       | #bfddca  | primary.hover.surface         | `--cdr-action-surface-brand-faint` (#bfddca)       | ✅     |
| `button/primary/surface-hover`             | `color/action/surface/brand-faint`       | #bfddca  | primary.focus-visible.surface | `--cdr-action-surface-brand-faint` (#bfddca)       | ✅     |
| `button/primary/text-hover`                | `color/action/text/brand`                | #143528  | primary.hover.text            | `--cdr-action-text-brand` (#143528)                | ✅     |
| `button/primary/text-hover`                | `color/action/text/brand`                | #143528  | primary.hover.icon            | `--cdr-action-text-brand` (#143528)                | ✅     |
| `button/primary/text-hover`                | `color/action/text/brand`                | #143528  | primary.focus-visible.text    | `--cdr-action-text-brand` (#143528)                | ✅     |
| `button/primary/text-hover`                | `color/action/text/brand`                | #143528  | primary.focus-visible.icon    | `--cdr-action-text-brand` (#143528)                | ✅     |
| `button/primary/surface-disabled`          | `color/action/surface/neutral-prominent` | #d7d4ce  | primary.disabled.surface      | `--cdr-action-surface-neutral-prominent` (#d7d4ce) | ✅     |
| `button/primary/text-disabled`             | `color/action/text/neutral-trace`        | #ffffff  | primary.disabled.text         | `--cdr-action-text-neutral-trace` (#ffffff)        | ✅     |
| `button/primary/text-disabled`             | `color/action/text/neutral-trace`        | #ffffff  | primary.disabled.icon         | `--cdr-action-icon-neutral-trace` (#ffffff)        | ✅     |
| `button/primary/border-disabled`           | `color/action/border/neutral-faint`      | #d7d4ce  | primary.disabled.border       | `--cdr-action-border-neutral-faint` (#d7d4ce)      | ✅     |
| `button/primary/surround-surface-active`   | `color/action/surface/brand-faint`       | #bfddca  | primary.extras.active-inset   | `--cdr-action-surface-brand-faint` (#bfddca)       | ✅     |
| `button/secondary/surface`                 | `color/action/surface/neutral-faint`     | #f7f7f5  | secondary.rest.surface        | `--cdr-action-surface-neutral-faint` (#f7f7f5)     | ✅     |
| `button/secondary/text`                    | `color/action/text/neutral-bold`         | #4c473e  | secondary.rest.text           | `--cdr-action-text-neutral-bold` (#4c473e)         | ✅     |
| `button/secondary/border`                  | `color/action/border/neutral`            | #8e887d  | secondary.rest.border         | `--cdr-action-border-neutral` (#8e887d)            | ✅     |
| `button/secondary/border`                  | `color/action/border/neutral`            | #8e887d  | secondary.active.border       | `--cdr-action-border-neutral` (#8e887d)            | ✅     |
| `button/secondary/surface-active`          | `color/action/icon/neutral`              | #8e887d  | secondary.active.surface      | `--cdr-action-icon-neutral` (#8e887d)              | ✅     |
| `button/secondary/surface-disabled`        | `color/action/surface/neutral-trace`     | #fcfcfb  | secondary.disabled.surface    | `--cdr-action-surface-neutral-trace` (#fcfcfb)     | ✅     |
| `button/secondary/surround-surface-active` | `color/action/surface/neutral-subtle`    | #f1f0ed  | secondary.extras.active-inset | `--cdr-action-surface-neutral-subtle` (#f1f0ed)    | ✅     |
| `button/secondary/text-active`             | `color/action/text/neutral-faint`        | #f7f7f5  | secondary.active.text         | `--cdr-action-text-neutral-faint` (#f7f7f5)        | ✅     |
| `button/secondary/text-active`             | `color/action/text/neutral-faint`        | #f7f7f5  | secondary.active.icon         | `--cdr-action-icon-neutral-faint` (#f7f7f5)        | ✅     |
| `button/secondary/text-disabled`           | `color/action/text/neutral-subtle`       | #cecac3  | secondary.disabled.text       | `--cdr-action-text-neutral-subtle` (#cecac3)       | ✅     |
| `button/secondary/border-disabled`         | `color/action/border/neutral-faint`      | #d7d4ce  | secondary.disabled.border     | `--cdr-action-border-neutral-faint` (#d7d4ce)      | ✅     |
| `button/dark/surface`                      | `color/action/surface/neutral-intense`   | #4c473e  | dark.rest.surface             | `--cdr-action-surface-neutral-intense` (#4c473e)   | ✅     |
| `button/dark/surface`                      | `color/action/surface/neutral-intense`   | #4c473e  | dark.active.surface           | `--cdr-action-surface-neutral-intense` (#4c473e)   | ✅     |
| `button/dark/surface-hover`                | `color/action/surface/neutral`           | #eae7e4  | dark.hover.surface            | `--cdr-action-surface-neutral` (#eae7e4)           | ✅     |
| `button/dark/surface-hover`                | `color/action/surface/neutral`           | #eae7e4  | dark.focus-visible.surface    | `--cdr-action-surface-neutral` (#eae7e4)           | ✅     |
| `button/dark/surface-disabled`             | `color/action/surface/neutral-prominent` | #d7d4ce  | dark.disabled.surface         | `--cdr-action-surface-neutral-prominent` (#d7d4ce) | ✅     |
| `button/dark/text`                         | `color/action/text/neutral-faint`        | #f7f7f5  | dark.rest.text                | `--cdr-action-text-neutral-faint` (#f7f7f5)        | ✅     |
| `button/dark/text`                         | `color/action/text/neutral-faint`        | #f7f7f5  | dark.rest.icon                | `--cdr-action-icon-neutral-faint` (#f7f7f5)        | ✅     |
| `button/dark/text`                         | `color/action/text/neutral-faint`        | #f7f7f5  | dark.active.text              | `--cdr-action-text-neutral-faint` (#f7f7f5)        | ✅     |
| `button/dark/text`                         | `color/action/text/neutral-faint`        | #f7f7f5  | dark.active.icon              | `--cdr-action-icon-neutral-faint` (#f7f7f5)        | ✅     |
| `button/dark/text-hover`                   | `color/action/text/neutral-bold`         | #4c473e  | dark.hover.text               | `--cdr-action-text-neutral-bold` (#4c473e)         | ✅     |
| `button/dark/text-hover`                   | `color/action/text/neutral-bold`         | #4c473e  | dark.hover.icon               | `--cdr-action-icon-neutral-bold` (#4c473e)         | ✅     |
| `button/dark/text-hover`                   | `color/action/text/neutral-bold`         | #4c473e  | dark.focus-visible.text       | `--cdr-action-text-neutral-bold` (#4c473e)         | ✅     |
| `button/dark/text-hover`                   | `color/action/text/neutral-bold`         | #4c473e  | dark.focus-visible.icon       | `--cdr-action-icon-neutral-bold` (#4c473e)         | ✅     |
| `button/dark/text-disabled`                | `color/action/text/neutral-trace`        | #ffffff  | dark.disabled.text            | `--cdr-action-text-neutral-trace` (#ffffff)        | ✅     |
| `button/dark/text-disabled`                | `color/action/text/neutral-trace`        | #ffffff  | dark.disabled.icon            | `--cdr-action-icon-neutral-trace` (#ffffff)        | ✅     |
| `button/dark/border`                       | `color/action/border/neutral-bold`       | #4c473e  | dark.rest.border              | `--cdr-action-border-neutral-bold` (#4c473e)       | ✅     |
| `button/dark/border`                       | `color/action/border/neutral-bold`       | #4c473e  | dark.hover.border             | `--cdr-action-border-neutral-bold` (#4c473e)       | ✅     |
| `button/dark/border`                       | `color/action/border/neutral-bold`       | #4c473e  | dark.focus-visible.border     | `--cdr-action-border-neutral-bold` (#4c473e)       | ✅     |
| `button/dark/border`                       | `color/action/border/neutral-bold`       | #4c473e  | dark.active.border            | `--cdr-action-border-neutral-bold` (#4c473e)       | ✅     |
| `button/dark/border-disabled`              | `color/action/border/neutral-faint`      | #d7d4ce  | dark.disabled.border          | `--cdr-action-border-neutral-faint` (#d7d4ce)      | ✅     |
| `button/dark/border-active-inset`          | `color/action/surface/neutral`           | #eae7e4  | dark.extras.active-inset      | `--cdr-action-surface-neutral` (#eae7e4)           | ✅     |
| `button/sale/surface`                      | `color/action/surface/sale`              | #d93f00  | sale.rest.surface             | `--cdr-action-surface-sale` (#d44703)              | ❌     |
| `button/sale/surface`                      | `color/action/surface/sale`              | #d93f00  | sale.active.surface           | `--cdr-action-surface-sale` (#d44703)              | ❌     |
| `button/sale/surface-hover`                | `color/action/surface/sale-faint`        | #ffe9df  | sale.hover.surface            | `--cdr-action-surface-sale-faint` (#ffe9e0)        | ❌     |
| `button/sale/surface-hover`                | `color/action/surface/sale-faint`        | #ffe9df  | sale.focus-visible.surface    | `--cdr-action-surface-sale-faint` (#ffe9e0)        | ❌     |
| `button/sale/surface-disabled`             | `color/action/surface/neutral-prominent` | #d7d4ce  | sale.disabled.surface         | `--cdr-action-surface-neutral-prominent` (#d7d4ce) | ✅     |
| `button/sale/text`                         | `color/action/text/neutral-trace`        | #ffffff  | sale.rest.text                | `--cdr-action-text-neutral-trace` (#ffffff)        | ✅     |
| `button/sale/text`                         | `color/action/text/neutral-trace`        | #ffffff  | sale.rest.icon                | `--cdr-action-icon-neutral-trace` (#ffffff)        | ✅     |
| `button/sale/text`                         | `color/action/text/neutral-trace`        | #ffffff  | sale.active.text              | `--cdr-action-text-neutral-trace` (#ffffff)        | ✅     |
| `button/sale/text`                         | `color/action/text/neutral-trace`        | #ffffff  | sale.active.icon              | `--cdr-action-icon-neutral-trace` (#ffffff)        | ✅     |
| `button/sale/text`                         | `color/action/text/neutral-trace`        | #ffffff  | sale.disabled.text            | `--cdr-action-text-neutral-trace` (#ffffff)        | ✅     |
| `button/sale/text`                         | `color/action/text/neutral-trace`        | #ffffff  | sale.disabled.icon            | `--cdr-action-icon-neutral-trace` (#ffffff)        | ✅     |
| `button/sale/text-hover`                   | `color/action/text/sale`                 | #d93f00  | sale.hover.text               | `--cdr-action-text-sale` (#d44703)                 | ❌     |
| `button/sale/text-hover`                   | `color/action/text/sale`                 | #d93f00  | sale.hover.icon               | `--cdr-action-icon-sale` (#d44703)                 | ❌     |
| `button/sale/text-hover`                   | `color/action/text/sale`                 | #d93f00  | sale.focus-visible.text       | `--cdr-action-text-sale` (#d44703)                 | ❌     |
| `button/sale/text-hover`                   | `color/action/text/sale`                 | #d93f00  | sale.focus-visible.icon       | `--cdr-action-icon-sale` (#d44703)                 | ❌     |
| `button/sale/border`                       | `color/action/border/sale`               | #d93f00  | sale.rest.border              | `--cdr-action-border-sale` (#d44703)               | ❌     |
| `button/sale/border`                       | `color/action/border/sale`               | #d93f00  | sale.hover.border             | `--cdr-action-border-sale` (#d44703)               | ❌     |
| `button/sale/border`                       | `color/action/border/sale`               | #d93f00  | sale.focus-visible.border     | `--cdr-action-border-sale` (#d44703)               | ❌     |
| `button/sale/border`                       | `color/action/border/sale`               | #d93f00  | sale.active.border            | `--cdr-action-border-sale` (#d44703)               | ❌     |
| `button/sale/border-disabled`              | `color/action/border/neutral-faint`      | #d7d4ce  | sale.disabled.border          | `--cdr-action-border-neutral-faint` (#d7d4ce)      | ✅     |
| `button/sale/border-active-inset`          | `color/action/surface/neutral-trace`     | #fcfcfb  | sale.extras.active-inset      | `--cdr-action-surface-neutral-trace` (#fcfcfb)     | ✅     |

## Legacy variables

These are intentionally not rendered by CdrButton. They remain classified so the adapter fails if a new variable appears without a decision.

| Figma variable                          | Reason                                                                                                                                      |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `button/default/border-disabled`        | legacy default scope is not rendered by CdrButton                                                                                           |
| `button/default/surface-disabled`       | legacy default scope is not rendered by CdrButton                                                                                           |
| `button/icon-only/border-active`        | primitive warm-grey/600 alias; CdrButton icon-only active uses action/border/neutral and has no approved semantic equivalent for this value |
| `button/icon-only/surface-active`       | CdrButton icon-only has no active surface; pending design decision                                                                          |
| `button/primary/surface-icon-alt-hover` | legacy alternate icon background; current primary hover icon uses action/text/brand via fullPath                                            |
| `button/sale/surround-surface-active`   | DRAFT duplicate of sale border-active-inset; active-inset continues to use action/surface/neutral-trace pending design confirmation         |

## Drift

| Figma variable              | Cedar target               | Expected | Figma   |
| --------------------------- | -------------------------- | -------- | ------- |
| `button/sale/surface`       | sale.rest.surface          | #d44703  | #d93f00 |
| `button/sale/surface`       | sale.active.surface        | #d44703  | #d93f00 |
| `button/sale/surface-hover` | sale.hover.surface         | #ffe9e0  | #ffe9df |
| `button/sale/surface-hover` | sale.focus-visible.surface | #ffe9e0  | #ffe9df |
| `button/sale/text-hover`    | sale.hover.text            | #d44703  | #d93f00 |
| `button/sale/text-hover`    | sale.hover.icon            | #d44703  | #d93f00 |
| `button/sale/text-hover`    | sale.focus-visible.text    | #d44703  | #d93f00 |
| `button/sale/text-hover`    | sale.focus-visible.icon    | #d44703  | #d93f00 |
| `button/sale/border`        | sale.rest.border           | #d44703  | #d93f00 |
| `button/sale/border`        | sale.hover.border          | #d44703  | #d93f00 |
| `button/sale/border`        | sale.focus-visible.border  | #d44703  | #d93f00 |
| `button/sale/border`        | sale.active.border         | #d44703  | #d93f00 |

All reported drift is the sale palette value lag between the Figma semantic library and `@rei/cdr-tokens@15.0.0-alpha.4`; the semantic alias names match. `button/secondary/text-disabled` is not compared to an icon slot because no Figma icon variable exists for that state.

## How to refresh

```bash
export FIGMA_ACCESS_TOKEN=figd_...
pnpm figma:check:button --json /tmp/button-figma-sync.json
```

The token is read-only and is never committed.
