import contract from '../CdrLink.tokens';

describe('CdrLink token contract', () => {
  it('captures the layout and decoration defaults', () => {
    expect(contract.defaults['font-family']).toEqual({ kind: 'literal', value: 'inherit' });
    expect(contract.defaults['font-size']).toEqual({ kind: 'literal', value: 'inherit' });
    expect(contract.defaults['line-height']).toEqual({ kind: 'literal', value: 'inherit' });
    expect(contract.defaults['align-items']).toEqual({ kind: 'literal', value: 'center' });
    expect(contract.defaults['background-color']).toEqual({
      kind: 'literal',
      value: 'transparent',
    });
    expect(contract.defaults.border).toEqual({ kind: 'literal', value: '0' });
    expect(contract.defaults.cursor).toEqual({ kind: 'literal', value: 'pointer' });
    expect(contract.defaults.display).toEqual({ kind: 'literal', value: 'inline-flex' });
    expect(contract.defaults.margin).toEqual({ kind: 'literal', value: '0' });
    expect(contract.defaults.outline).toEqual({ kind: 'literal', value: 'none' });
    expect(contract.defaults.padding).toEqual({ kind: 'literal', value: '0' });
    expect(contract.defaults['vertical-align']).toEqual({ kind: 'literal', value: 'top' });
    expect(contract.defaults['text-decoration']).toEqual({ kind: 'literal', value: 'underline' });
    expect(contract.defaults['text-decoration-hover']).toEqual({ kind: 'literal', value: 'none' });
  });

  it('is fully cut over: no legacy fallbacks and no legacy-only extras', () => {
    expect(contract.legacy).toBeUndefined();
    for (const variant of Object.values(contract.variants)) {
      for (const extraValue of Object.values(variant.extras ?? {})) {
        expect(extraValue).not.toBeNull();
      }
    }
  });

  it('declares the Action family, hook surface, and default variant', () => {
    expect(contract.interaction).toBe('action');
    expect(contract.hooks).toBe(true);
    expect(contract.defaultVariant).toBe('default');
    expect(contract.recipe).toBeUndefined();
    expect(Object.keys(contract.variants)).toEqual(['default', 'neutral']);
  });

  it('maps the default scope to trigger text with the trigger fill via fullPath', () => {
    const { default: defaultScope, neutral } = contract.variants;

    expect(defaultScope.identity).toBe('trigger');
    expect(defaultScope.rest).toEqual({
      text: 'trigger',
      icon: { fullPath: 'action-text-trigger' },
    });
    expect(defaultScope.hover).toEqual({ text: 'trigger' });
    expect(defaultScope['focus-visible']).toEqual({ text: 'trigger-bold' });
    expect(defaultScope.active).toEqual({ text: 'trigger-bold' });

    expect(neutral.identity).toBe('neutral');
    expect(neutral.rest).toEqual({ text: 'neutral-bold' });
    expect(neutral.hover).toEqual({ text: 'neutral-bold' });
    expect(neutral['focus-visible']).toEqual({ text: 'neutral-bold' });
    expect(neutral.active).toEqual({ text: 'neutral-bold' });
  });
});
