import contract from '../CdrAbstract.tokens';

describe('CdrAbstract token contract', () => {
  it('captures the existing base and condensed typography values', () => {
    expect(contract.defaults.margin).toEqual({ kind: 'literal', value: '0' });
    expect(contract.defaults['max-width']).toEqual({ kind: 'literal', value: '75ch' });
    expect(contract.defaults['font-size']).toEqual({
      kind: 'literal',
      value: 'var(--cdr-type-scale-1)',
    });
    expect(contract.defaults['font-size-condensed']).toEqual({
      kind: 'literal',
      value: 'var(--cdr-type-scale-0)',
    });
  });

  it('maps only the resting text role; this plain component has no interaction states', () => {
    const variant = contract.variants.default;

    expect(Object.keys(variant.rest)).toEqual(['text']);
    expect(variant.hover).toBeUndefined();
    expect(variant['focus-visible']).toBeUndefined();
    expect(variant.active).toBeUndefined();
    expect(variant.disabled).toBeUndefined();
  });

  it('uses the Universal neutral text identity', () => {
    expect(contract.variants.default.rest.text).toBe('neutral');
  });
});
