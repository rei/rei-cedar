# ADR 0009: Cedar Component Semantic Token Consumption Pattern

## Status

**Proposed**

## Context

Cedar components currently consume tokens from `@rei/cdr-tokens` in inconsistent ways. Some components use component-scoped CSS custom properties with fallbacks to semantic tokens, while others reference semantic tokens directly. This inconsistency makes it difficult for consumers to theme components and creates maintenance overhead.

The current landscape includes:

- **Component-scoped variables**: Components like Button, Card, Input, Link, Checkbox, and Radio use patterns like `var(--cdr-button-primary-background-color-rest, var(--cdr-color-background-button-primary-rest, #{tokens.$cdr-color-background-button-primary-rest}))`
- **Direct semantic token usage**: Components like Banner and Kicker reference semantic tokens directly without component-scoped variables
- **Data attribute driven components**: Surface and MediaObject use data attributes and inline styles to set CSS custom properties
- **Component variables project**: A build script transfers component vars files to a separate repo (`rei-cedar-component-variables`) for external consumers

This ADR defines a consistent pattern for all Cedar components to consume semantic tokens, establishing a foundation for the component migration work in Doc 03.

## Decision

Cedar components will use component-scoped CSS custom properties with fallbacks to semantic tokens, which themselves fall back to default values from the token package.

### Pattern Definition

```
--cdr-{component}-{property} → {semantic-token} → {default-value}
```

**Example:**

```css
background: var(--cdr-accordion-border, var(--cdr-color-border-base, #ccc));
```

### Component Variable Naming Convention

Component-scoped CSS custom properties follow the pattern:

```
--cdr-{component}-{property}
```

**Rules:**

- Use kebab-case for component names (e.g., `button`, `media-object`, `surface-selection`)
- Use kebab-case for property names (e.g., `background-color`, `text-color`, `border-width`)
- Include state suffixes for interactive states: `-rest`, `-hover`, `-active`, `-focus`, `-disabled`, `-checked`, `-loading`
- Include modifier suffixes for component variants: `-primary`, `-secondary`, `-dark`, `-sale`, `-link`

**Examples:**

- `--cdr-button-primary-background-color-rest`
- `--cdr-card-base-background-color`
- `--cdr-input-text-color-default`
- `--cdr-media-object-align`
- `--cdr-surface-background`

### Fallback Chain

The fallback chain has three levels:

1. **Component variable**: `--cdr-{component}-{property}` - Allows component-level theming
2. **Semantic token**: `--cdr-{token-category}-{token-name}` - Provides semantic meaning and design system consistency
3. **Default value**: The SCSS variable from `@rei/cdr-tokens` - Ensures fallback if tokens are not loaded

**Implementation in SCSS:**

```scss
@use '@rei/cdr-tokens/scss' as tokens;

background-color: var(
  --cdr-button-primary-background-color-rest,
  var(
    --cdr-color-background-button-primary-rest,
    #{tokens.$cdr-color-background-button-primary-rest}
  )
);
```

### Simplification Rules

#### When to Use Component Prefix

**Always use component prefix for:**

- Component-specific properties that are not shared across components
- Properties that have component-specific semantics or behavior
- Properties where component-level theming is a valid use case

**Examples with component prefix:**

```css
--cdr-button-primary-background-color-rest
--cdr-card-base-background-color-rest
```

**Consider omitting component prefix for:**

- Truly shared properties that have identical semantics across all components
- Properties where component-level theming would be confusing or anti-pattern
- Properties that are design primitives rather than component-specific

**Examples without component prefix (rare):**

```css
--cdr-border-radius-base (if truly shared across all components)
```

**Decision:** Default to including component prefix. Only omit when there's strong evidence that the property is universally shared and component-level theming would be harmful.

#### Nested vs Flattened Properties

**Use nested properties when:**

- Properties have a hierarchical relationship
- Grouping improves readability and maintainability
- The hierarchy reflects the component's structure or API

**Examples of nested properties:**

```css
--cdr-button-primary-background-color-rest
--cdr-button-primary-text-color-rest
--cdr-button-primary-box-shadow-color-rest
```

**Use flattened properties when:**

- Properties are independent and don't have a clear hierarchy
- Flattening reduces verbosity without losing clarity
- The property is a simple, single-value attribute

**Examples of flattened properties:**

```css
--cdr-card-base-background-color
--cdr-input-text-color-default
--cdr-link-text-decoration
```

**Decision:** Use nested properties when they reflect component variants or states. Use flattened properties for simple, independent attributes.

### Data Attribute Driven Components

Data attribute driven components (Surface, MediaObject) interact positively with this pattern:

**Surface Component:**

- Uses data attributes like `data-background="primary"` to map to component variables
- The CSS module maps data attributes to component variables: `--cdr-surface-background`
- Consumers can theme by setting component variables directly or via data attributes
- The pattern supports state-based configurations through data attributes like `data-background-hover`

**MediaObject Component:**

- Uses inline styles to set component variables like `--cdr-media-object-align`
- Supports responsive breakpoints through breakpoint-specific variables
- The vars file uses mixins that reference component variables
- Consumers can theme by setting component variables via inline styles or CSS

**Benefits for data attribute components:**

- Component variables provide a theming surface that works alongside data attributes
- Data attributes become a convenience layer for common configurations
- Advanced theming is still possible through direct variable manipulation
- The pattern maintains consistency with other Cedar components

### Ramifications to Cedar Component Variables Project

The cedar component variables project (`rei-cedar-component-variables`) will be affected:

**Current state:**

- Build script copies vars files to external repo
- Creates index file and single combined file
- Supports 18 components

**Changes required:**

- Vars files will need to adopt the new pattern consistently
- The build script may need updates to handle the new variable structure
- Documentation for external consumers will need to reflect the new pattern
- The external repo will need to be updated to match the new pattern

**Benefits:**

- External consumers get a consistent theming API across all components
- The pattern aligns with how consumers expect to theme components
- Reduces confusion about which variables to use for theming
- Makes the component variables project more valuable and maintainable

**Migration effort:**

- Update all 18 supported component vars files to use the new pattern
- Test the build script with updated vars files
- Update documentation in the external repo
- Coordinate with consumers who may be using the current pattern

## Migration Path

### Phase 1: Pattern Adoption (New Components)

1. **Apply pattern to new components immediately**
   - All new components must use the pattern from the start
   - Include the pattern in component templates and generator
   - Update documentation to reflect the pattern

### Phase 2: Existing Component Migration

2. **Migrate existing components incrementally**
   - Prioritize components based on usage and maintenance needs
   - Start with components that already use component-scoped variables (Button, Card, Input, etc.)
   - Then migrate components that use direct semantic token references (Banner, Kicker, etc.)
   - Finally migrate data attribute components if needed (Surface, MediaObject)

3. **Migration steps per component:**
   - Audit current token usage in the component
   - Identify all semantic token references
   - Create component-scoped variables following the naming convention
   - Update fallback chain to use the pattern
   - Test component behavior and theming
   - Update component documentation
   - Update stories and examples

4. **Testing strategy:**
   - Visual regression tests to ensure no breaking changes
   - Test theming capabilities through component variables
   - Test fallback behavior when tokens are not loaded
   - Test data attribute components with new pattern

### Phase 3: Component Variables Project Update

5. **Update the component variables project**
   - Update build script if needed
   - Migrate all supported component vars files
   - Test the external build and distribution
   - Update external documentation

### Phase 4: Documentation and Communication

6. **Update Cedar documentation**
   - Document the pattern in the Cedar architecture docs
   - Update component theming guides
   - Add examples of how to use component variables for theming
   - Document the migration for consumers

7. **Communicate changes to consumers**
   - Announce the pattern change through release notes
   - Provide migration guides for consumers
   - Highlight the benefits of the new pattern
   - Provide support during the transition period

## Consequences

### Positive

- **Consistency**: All Cedar components will consume tokens in the same way
- **Theming**: Consumers get a consistent theming API across all components
- **Maintainability**: Easier to understand and maintain component styles
- **Flexibility**: Component variables provide a theming surface without requiring semantic token changes
- **Migration**: Clear path for migrating existing components to the pattern
- **Documentation**: Easier to document component theming capabilities

### Negative

- **Migration effort**: Significant effort required to migrate existing components
- **Verbosity**: Component variable names can be longer than direct semantic token references
- **Learning curve**: Consumers and contributors need to learn the new pattern
- **Breaking changes**: May be breaking for consumers who have customized components using current patterns

### Risks

- **Incomplete migration**: Risk of not migrating all components consistently
- **Naming conflicts**: Risk of component variable name collisions if naming convention is not followed
- **Performance**: Additional CSS custom properties may have a small performance impact
- **Consumer confusion**: Risk of confusing consumers about which variables to use for theming

## Alternatives Considered

### Alternative 1: Direct Semantic Token Usage Only

**Description**: All components reference semantic tokens directly without component-scoped variables.

**Pros**:

- Simpler implementation
- Less verbose
- No additional CSS custom properties

**Cons**:

- No component-level theming surface
- Consumers must modify semantic tokens to theme components
- Less flexibility for component-specific theming
- Doesn't align with current best practices for component theming

**Rejected**: Component-level theming is a valid use case that should be supported.

### Alternative 2: Component Variables Without Semantic Token Fallback

**Description**: Component variables fall back directly to default values without semantic tokens.

**Pros**:

- Simpler fallback chain
- Fewer CSS custom properties

**Cons**:

- Loses semantic meaning
- Breaks connection to design system
- Makes it harder to understand design intent
- Reduces value of semantic tokens

**Rejected**: Semantic tokens provide important design system context and should be part of the fallback chain.

### Alternative 3: Hybrid Approach

**Description**: Some components use component variables, others use semantic tokens directly based on component type.

**Pros**:

- Flexibility to choose the right approach per component
- Less migration effort

**Cons**:

- Inconsistent approach across components
- Confusing for consumers
- Harder to maintain
- Defeats the purpose of establishing a pattern

**Rejected**: Consistency is important for a design system and this approach would create confusion.
