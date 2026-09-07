# Button Semantic Token Migration Guide

**Purpose:** Simple pattern for updating Cedar components to use semantic tokens, based on the button implementation.

**For:** Other engineers to test and apply this pattern to other components.

## The Pattern

When updating a component to use semantic tokens, follow this simple approach:

### 1. Identify the Component's Intent

- **ACTION**: Triggers user actions, navigation, content manipulation, or final submission
- **CONTROL**: User is manipulating or configuring the interface itself
- **SELECTION**: Interactive choice selection that doesn't itself submit data
- **FEEDBACK**: System communications including inline validation

### 2. Map Current Tokens to Semantic Paths

Replace current component tokens with semantic token paths:

**Old pattern:**

```scss
background: tokens.$cdr-color-background-button-primary-rest;
```

**New pattern:**

```scss
background: var(
  --cdr-color-action-surface-brand,
  #{tokens.$cdr-color-background-button-primary-rest}
);
```

### 3. Use Dual-Value Custom Properties

Always provide semantic token with legacy fallback:

```css
--cdr-button-background: var(
  --cdr-color-action-surface-brand,
  var(--cdr-color-background-button-primary-rest)
);
```

### 4. Map Component States to Semantic States

- `rest` → base semantic token
- `hover` → hover semantic token
- `focus-visible` → focus-visible semantic token
- `active` → active semantic token
- `disabled` → disabled semantic token

### 5. Map Component Roles to Semantic Roles

- `background` → `surface` role
- `color` → `text` role
- `border` → `border` role
- `fill` → `icon` role

## Button Example

Here's how the button component maps to semantic tokens:

### Primary Button (ACTION intent)

```scss
.cdr-button--primary {
  // Rest state
  --cdr-button-background: var(
    --cdr-color-action-surface-brand,
    var(--cdr-color-background-button-primary-rest)
  );
  --cdr-button-text: var(--cdr-color-action-text-brand, var(--cdr-color-text-button-primary));
  --cdr-button-border: var(
    --cdr-color-action-border-brand,
    var(--cdr-color-border-button-primary-rest)
  );

  // Hover state
  --cdr-button-background-hover: var(
    --cdr-color-action-surface-brand-faint,
    var(--cdr-color-background-button-primary-hover)
  );
  --cdr-button-text-hover: var(
    --cdr-color-action-text-brand-faint,
    var(--cdr-color-text-button-primary-hover)
  );

  // Disabled state
  --cdr-button-background-disabled: var(
    --cdr-color-action-surface-neutral-trace,
    var(--cdr-color-background-button-default-disabled)
  );
  --cdr-button-text-disabled: var(
    --cdr-color-action-text-disabled,
    var(--cdr-color-text-button-primary-disabled)
  );
}
```

### Key Mappings

- **Intent**: `action` (button triggers user actions)
- **Identity**: `brand` (primary button uses brand identity)
- **Expression**: `faint` for hover states (lighter expression)
- **Roles**: `surface` (background), `text` (color), `border` (border), `icon` (fill)

## Testing Your Component

When applying this pattern to another component:

1. **Verify visual parity** - Component should look identical before/after
2. **Test all states** - rest, hover, focus-visible, active, disabled
3. **Test light/dark modes** - Ensure semantic tokens work in both modes
4. **Check fallbacks** - Legacy tokens should still work if semantic tokens aren't available
5. **Validate intent** - Ensure the component's intent matches the semantic family used

## Common Patterns

### Form Controls (CONTROL intent)

```scss
// Input component example
--cdr-input-border: var(--cdr-color-control-border-neutral, var(--cdr-color-border-input-rest));
--cdr-input-border-focus: var(
  --cdr-color-control-border-neutral-bold,
  var(--cdr-color-border-input-focus)
);
--cdr-input-border-invalid: var(
  --cdr-color-feedback-border-error,
  var(--cdr-color-border-input-error)
);
```

### Selection Components (SELECTION intent)

```scss
// Chip component example (see src/components/chip/CdrChip.tokens.ts —
// selection surfaces exist only at trace/faint/base/subtle steps)
--cdr-chip-background: var(
  --cdr-color-selection-surface-neutral-faint,
  var(--cdr-color-background-chip-rest)
);
--cdr-chip-background-selected: var(
  --cdr-color-selection-surface-neutral-subtle,
  var(--cdr-color-background-chip-selected)
);
```

### Feedback Components (FEEDBACK intent)

```scss
// Banner component example
--cdr-banner-background: var(
  --cdr-color-feedback-surface-warning,
  var(--cdr-color-background-banner-warning)
);
--cdr-banner-text: var(
  --cdr-color-feedback-text-warning-bold,
  var(--cdr-color-text-banner-warning)
);
```

## Next Steps

1. **Apply this pattern to one component** - Start with a simple component like Chip or Card
2. **Document any gaps** - Note if semantic tokens don't exist for a needed state/role
3. **Share findings** - Report back on what works and what needs adjustment
4. **Iterate the pattern** - Refine this guide based on real component migration experience

## Resources

- **Semantic Taxonomy**: `docs/cedar-semantic-taxonomy.md` - Full intent definitions
- **Button Implementation**: `src/components/button/CdrButton.tokens.ts` - Reference implementation
- **Token Contract ADR**: `src/components/button/ADR-component-token-contracts.md` - Future architecture (for reference)

## Questions?

If you encounter issues or have questions about applying this pattern:

1. Check the button implementation as a reference
2. Review the semantic taxonomy for intent definitions
3. Document the issue and share with the team for pattern refinement
