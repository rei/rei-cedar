# Figma → Cedar sync adapter

**Status:** button POC. Read-only.

The adapter compares the Figma component variables in the CDR Components color
collection with the Cedar button contract and the installed `@rei/cdr-tokens`
package. It is a drift detector, not a writer: it never changes Figma or the
Cedar source.

## Why

Figma is the design source for the component color contract. Cedar's generated
button maps are derived from `src/components/button/CdrButton.tokens.ts`, which
references semantic tokens from `@rei/cdr-tokens`. A manual copy step leaves
three possible gaps:

1. a Figma variable points at the wrong semantic token;
2. a contract slot is not represented in the Figma variable set;
3. the installed token package resolves a semantic token to a different value
   than the Figma semantic library.

The adapter reports all three independently.

## Usage

Create a Figma personal access token with read access to variables, then:

```bash
export FIGMA_ACCESS_TOKEN=figd_...
pnpm figma:check:button
pnpm figma:check:button --verbose
pnpm figma:check:button --json /tmp/button-figma-sync.json
```

`FIGMA_TOKEN` and `--token <pat>` are also accepted. The command exits non-zero
when it finds mapping or value drift. The token is never written to the repo.

The equivalent direct command is:

```bash
pnpm exec tsx build/figma/cli.ts button
```

## How it works

- `build/figma/client.ts` fetches `/v1/files/:key/variables/local`.
- `build/figma/resolve.ts` merges the source file with its variable-library
  files and resolves `VARIABLE_ALIAS` chains to a final color. The button source
  file is `dGjTo4tpmVlSZQPWPnCLy0`; its semantic library is
  `7Cuo6NPfzPwNfGoht4WkFp`.
- `build/figma/adapters/button.ts` is the declarative mapping manifest. Each
  binding maps one Figma variable to one or more Cedar contract slots.
- `build/figma/tokens.ts` reads the installed foundation CSS and normalizes the
  values for comparison.
- `build/figma/adapter.ts` runs the checks and produces a structured report.

### Alias vs. value comparisons

- `compare: 'alias'` (default) requires the Figma variable to point at the same
  semantic token as the Cedar contract.
- `compare: 'value'` only compares the resolved color. It is used where Figma
  intentionally uses a different element role with the same value, such as a
  text variable backing an icon slot.

Values are always compared when the Cedar contract references a token that the
installed package exposes. This keeps the Figma library and package from
silently drifting even when the alias name is correct.

### Mapped and legacy variables

Every `button/*` variable in the source collection must be classified exactly
once:

- `bindings` — represented by at least one Cedar contract slot;
- `legacy` — intentionally not rendered by CdrButton (for example the retired
  `default` scope, an unused alt-icon background, or a draft duplicate).

The CLI fails on unclassified variables. `legacy` entries are reported for
traceability, and stale entries produce a warning so the manifest can be
cleaned up.

## Button POC result

The latest snapshot is in `docs/figma-button-sync-report.md`.

The adapter currently classifies 35 mapped variables and 6 legacy variables.
It verifies 74 contract targets. The mapping covers the approved primary
(2026-10-02) and secondary (2026-10-06) decisions, including:

- primary rest/active text and icon `neutral-faint`;
- primary `active-inset` → `action/surface/brand-faint`;
- secondary active surface → `action/icon/neutral` via the source-authored
  cross-role reference;
- secondary active text/icon `neutral-faint` and `active-inset`
  `action/surface/neutral-subtle`;
- secondary disabled surface `action/surface/neutral-trace`;
- dark rest/active text/icon `neutral-faint` and `active-inset`
  `action/surface/neutral`;
- sale `active-inset` `action/surface/neutral-trace`, with the draft
  `surround-surface-active` kept as a legacy pending decision.

The six legacy variables are intentionally not rendered by CdrButton:

- `button/default/border-disabled` and `button/default/surface-disabled` — the
  retired `default` scope;
- `button/icon-only/border-active` — a primitive `warm-grey/600` alias with no
  approved semantic equivalent for the current value; CdrButton uses
  `action/border/neutral`;
- `button/icon-only/surface-active` — CdrButton icon-only has no active surface;
  pending design confirmation;
- `button/primary/surface-icon-alt-hover` — unused alternate icon background;
  the current hover icon uses `action/text/brand`;
- `button/sale/surround-surface-active` — draft duplicate of
  `border-active-inset`; Cedar keeps the existing neutral-trace active inset
  until design confirms the sale-faint surround.

The live check also detects a token-package lag on the sale palette: the Figma
semantic library currently resolves sale to `#d93f00` (faint `#ffe9df`), while
`@rei/cdr-tokens@15.0.0-alpha.4` still publishes `#d44703` (`#ffe9e0`). The
alias names match; only the values differ. Update the token package (or the
Figma library) rather than hard-coding the sale colors in the button contract.

## Adding another component

1. Add a manifest under `build/figma/adapters/`.
2. Register it in `build/figma/cli.ts`.
3. Run the check with a token and resolve the reported alias/value drift.
4. Add the manifest to the adapter unit test so every target stays
   contract-backed.

## Limitations

- The POC checks the `web-light` mode only (mode `6508:1`).
- Focus and loading are not modeled as separate Figma states; the adapter
  follows the approved palette-only decisions already encoded in the contract.
- The adapter does not write to Figma. A future write path would need explicit
  approval and a Figma token with write scope.
