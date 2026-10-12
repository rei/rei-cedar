import contract from '../CdrFormGroup.tokens';

describe('CdrFormGroup token contract', () => {
  it('uses the Control interaction family, with a Feedback error state', () => {
    expect(contract.interaction).toBe('control');
  });

  it('maps the error surface and border to Feedback error tokens', () => {
    expect(contract.variants.error.rest).toEqual({
      surface: { fullPath: 'feedback-surface-error-trace' },
      border: { fullPath: 'feedback-border-error' },
    });
  });

  it('keeps the optional label Universal and maps the disabled label in Control', () => {
    expect(contract.variants.optional.rest.text).toEqual({ fullPath: 'text-neutral' });
    expect(contract.variants.disabled.rest.text).toBe('neutral-faint');
  });

  it('captures the existing content radius default', () => {
    expect(contract.defaults['content-border-radius']).toEqual({
      kind: 'token',
      name: 'cdr-radius-softer',
    });
  });
});
