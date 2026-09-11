# Button Semantic Token Implementation

> Historical PR implementation notes. The [component rollout](component-semantic-rollout.md) records the current sparse contracts, independent icon roles, corrected taxonomy paths and fallback policy. Current contracts and generated maps supersede examples below.

**Status:** Reference implementation for semantic token migration pattern

## Current Implementation

The button component has been updated to use semantic tokens following the pattern described in `docs/button-semantic-migration-guide.md`.

## Key Changes

### 1. Semantic Token Paths

Button now uses semantic token paths with legacy fallbacks:

```css
/* Old approach */
background: tokens.$cdr-color-background-button-primary-rest;

/* New approach */
background: var(--cdr-color-action-surface-brand, var(--cdr-color-background-button-primary-rest));
```

### 2. Intent Classification

Button is classified as **ACTION** intent:

- Triggers user actions, navigation, content manipulation, or final submission
- Uses `action` interaction family in semantic paths

### 3. State Mapping

Button states map to semantic states:

- `rest` → base semantic token
- `hover` → hover semantic token with `faint` expression
- `focus-visible` → focus-visible semantic token with `faint` expression
- `active` → active semantic token (returns to base)
- `disabled` → disabled semantic token with `neutral-trace` surface

### 4. Role Mapping

Button properties map to semantic roles:

- `background` → `surface` role
- `text` → `text` role
- `border` → `border` role
- `fill` → `icon` role

## Button Variants

### Primary Button (brand identity)

```css
--cdr-button-background: var(
  --cdr-color-action-surface-brand,
  var(--cdr-color-background-button-primary-rest)
);
--cdr-button-text: var(--cdr-color-action-text-brand, var(--cdr-color-text-button-primary));
--cdr-button-border: var(
  --cdr-color-action-border-brand,
  var(--cdr-color-border-button-primary-rest)
);
```

### Secondary Button (neutral identity)

```css
--cdr-button-background: var(
  --cdr-color-action-surface-neutral-faint,
  var(--cdr-color-background-button-secondary-rest)
);
--cdr-button-text: var(--cdr-color-action-text-neutral, var(--cdr-color-text-button-secondary));
--cdr-button-border: var(
  --cdr-color-action-border-neutral-faint,
  var(--cdr-color-border-button-secondary-rest)
);
```

### Dark Button (neutral identity, intense expression)

```css
--cdr-button-background: var(
  --cdr-color-action-surface-neutral-intense,
  var(--cdr-color-background-button-dark-rest)
);
--cdr-button-text: var(--cdr-color-action-text-neutral-intense, var(--cdr-color-text-button-dark));
--cdr-button-border: var(
  --cdr-color-action-border-neutral-intense,
  var(--cdr-color-border-button-dark-rest)
);
```

### Sale Button (sale identity)

```css
--cdr-button-background: var(
  --cdr-color-action-surface-sale,
  var(--cdr-color-background-button-sale-rest)
);
--cdr-button-text: var(--cdr-color-action-text-sale, var(--cdr-color-text-button-sale));
--cdr-button-border: var(--cdr-color-action-border-sale, var(--cdr-color-border-button-sale-rest));
```

## Files Modified

- `src/components/button/CdrButton.tokens.ts` - Token contract with semantic mappings
- `src/components/button/styles/CdrButton.tokens.css` - Generated CSS with semantic tokens
- `src/components/button/styles/vars/CdrButton.maps.scss` - SCSS maps with semantic tokens
- `src/components/button/styles/CdrButton.module.scss` - Component styles using generated maps

## Testing

To verify the implementation:

1. **Visual parity**: Button should look identical to previous implementation
2. **State testing**: Test all states (rest, hover, focus-visible, active, disabled)
3. **Mode testing**: Test in both light and dark modes
4. **Fallback testing**: Ensure legacy tokens work if semantic tokens unavailable

## For Other Engineers

Use this implementation as a reference when applying the semantic token pattern to other components:

1. **Study the button contract** (`src/components/button/CdrButton.tokens.ts`)
2. **Follow the migration guide** (`docs/button-semantic-migration-guide.md`)
3. **Apply the pattern** to your component
4. **Test thoroughly** for visual parity and functionality
5. **Document findings** to help refine the pattern

## Next Steps

This implementation serves as the foundation for:

- Testing the semantic token pattern on other components
- Identifying gaps in the semantic token system
- Refining the migration pattern based on real-world usage
- Building confidence in the semantic token approach before broader rollout
