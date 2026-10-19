import contract from '../CdrSelect.tokens';

describe('CdrSelect token contract', () => {
  it('captures the layout defaults', () => {
    expect(contract.defaults.radius).toEqual({ kind: 'token', name: 'cdr-radius-softer' });
    expect(contract.defaults.height).toEqual({ kind: 'literal', value: '4rem' });
    expect(contract.defaults['large-height']).toEqual({ kind: 'literal', value: '4.8rem' });
    expect(contract.defaults['padding-left']).toEqual({ kind: 'token', name: 'cdr-space-half-x' });
    expect(contract.defaults['padding-right']).toEqual({ kind: 'token', name: 'cdr-space-two-x' });
    expect(contract.defaults['icon-offset']).toEqual({ kind: 'token', name: 'cdr-space-half-x' });
    expect(contract.defaults['multiple-padding']).toEqual({
      kind: 'token',
      name: 'cdr-space-half-x',
    });
  });

  it('is fully cut over: no legacy fallbacks', () => {
    expect(contract.legacy).toBeUndefined();
  });

  it('declares the Control family, hook surface, and variant order', () => {
    expect(contract.interaction).toBe('control');
    expect(contract.defaultVariant).toBe('default');
    expect(contract.recipe).toBeUndefined();
    expect(Object.keys(contract.variants)).toEqual([
      'default',
      'secondary',
      'error',
      'prompt',
      'caret',
    ]);
  });

  it('maps the default scope to control neutral tokens', () => {
    const { default: defaultScope } = contract.variants;

    expect(defaultScope.identity).toBe('neutral');
    expect(defaultScope.rest).toEqual({
      surface: 'neutral-faint',
      text: 'neutral-bold',
      border: 'neutral',
    });
    expect(defaultScope['focus-visible']).toEqual({
      surface: 'neutral-faint',
      border: 'neutral-intense',
    });
    expect(defaultScope.disabled).toEqual({
      surface: 'neutral-faint',
      text: 'neutral-faint',
      border: 'neutral-faint',
    });
  });

  it('maps the secondary, error, prompt, and caret scopes', () => {
    const { secondary, error, prompt, caret } = contract.variants;

    expect(secondary.identity).toBe('neutral');
    expect(secondary.rest).toEqual({ surface: 'neutral-trace' });
    expect(secondary['focus-visible']).toEqual({ surface: 'neutral-trace' });

    expect(error.identity).toBe('error');
    expect(error.rest).toEqual({
      surface: { fullPath: 'feedback-surface-error-trace' },
      border: { fullPath: 'feedback-border-error' },
    });

    expect(prompt.identity).toBe('neutral');
    expect(prompt.rest).toEqual({ text: 'neutral-prominent' });
    expect(prompt.disabled).toEqual({ text: 'neutral-faint' });

    expect(caret.identity).toBe('neutral');
    expect(caret.rest).toEqual({ icon: 'neutral-intense' });
    expect(caret.disabled).toEqual({ icon: 'neutral' });
  });
});
