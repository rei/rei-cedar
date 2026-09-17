# Component Semantic Token Migration Guide

The [component semantic rollout](component-semantic-rollout.md) is the current authoring guide and component inventory. It extends the original Button experiment across Cedar.

- Use the [semantic taxonomy](cedar-semantic-taxonomy.md) for intent, role, identity and expression.
- Use `semantic(path, fallback)` in a component contract and consume the generated Sass map.
- Declare only roles and states that the component renders. States are not suffixes in semantic names.
- Keep text and icon roles independent, preserve public overrides, and validate every fallback.
- Use Button for a complete pressable recipe, Input for named control slots, Banner for static feedback, and Surface for foundation colors.

Run `pnpm build:maps`, `pnpm check:maps`, `pnpm check:tokens`, `pnpm test:tokens` and the affected browser tests. See the rollout for mapping decisions, examples, palette status and deliberate boundaries.
