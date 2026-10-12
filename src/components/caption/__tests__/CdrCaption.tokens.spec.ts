import contract from '../CdrCaption.tokens';

describe('CdrCaption token contract', () => {
  it('captures the existing base values from the original stylesheet', () => {
    expect(contract.defaults['max-width']).toEqual({ kind: 'literal', value: '530px' });
    expect(contract.defaults['summary-font-size']).toEqual({ kind: 'literal', value: '1.4rem' });
    expect(contract.defaults['cite-font-size']).toEqual({ kind: 'literal', value: '1.2rem' });
  });

  it('is a Universal contract with no interaction family', () => {
    expect(contract.interaction).toBeUndefined();
  });

  it('maps summary and cite to their resting text role only', () => {
    expect(contract.variants.summary.rest).toEqual({ text: 'neutral-prominent' });
    expect(contract.variants.cite.rest).toEqual({ text: 'neutral' });

    for (const variant of Object.values(contract.variants)) {
      expect(variant.hover).toBeUndefined();
      expect(variant['focus-visible']).toBeUndefined();
      expect(variant.active).toBeUndefined();
      expect(variant.disabled).toBeUndefined();
    }
  });

  it('generates hooks with summary as the default scope', () => {
    expect(contract.hooks).toBe(true);
    expect(contract.defaultVariant).toBe('summary');
  });
});
