import contract from '../CdrFormError.tokens';

describe('CdrFormError token contract', () => {
  it('maps only the icon fill to the Feedback error icon token', () => {
    expect(contract.interaction).toBe('feedback');
    expect(Object.keys(contract.variants.default.rest)).toEqual(['icon']);
    expect(contract.variants.default.rest.icon).toBe('error');
  });

  it('captures the existing top margin default', () => {
    expect(contract.defaults['margin-top']).toEqual({ kind: 'token', name: 'cdr-space-quarter-x' });
  });
});
