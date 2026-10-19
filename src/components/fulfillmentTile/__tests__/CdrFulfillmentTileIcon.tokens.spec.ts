import contract from '../CdrFulfillmentTileIcon.tokens';

describe('CdrFulfillmentTileIcon token contract', () => {
  it('uses the Feedback interaction family', () => {
    expect(contract.interaction).toBe('feedback');
  });

  it('maps the icon background to the Universal natural surface', () => {
    expect(contract.variants.default.rest.surface).toEqual({ fullPath: 'surface-natural' });
  });

  it('reuses approved Feedback border values for fills without icon tokens', () => {
    expect(contract.variants.default.rest.icon).toEqual({ fullPath: 'feedback-border-natural' });
    expect(contract.variants.info.rest.icon).toEqual({ fullPath: 'feedback-border-info' });
    expect(contract.variants.warning.rest.icon).toEqual({ fullPath: 'feedback-border-warning' });
    expect(contract.variants.success.rest.icon).toEqual({ fullPath: 'feedback-border-success' });
  });

  it('uses the real Feedback icon token for the error fill', () => {
    expect(contract.variants.error.rest.icon).toEqual({ fullPath: 'feedback-icon-error' });
  });

  it('captures the icon-owned layout values', () => {
    expect(contract.defaults.size).toEqual({ kind: 'literal', value: '2.2rem' });
    expect(contract.defaults['icon-margin']).toEqual({
      kind: 'token',
      name: 'cdr-space-quarter-x',
    });
  });
});
