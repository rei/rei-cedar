import contract from '../CdrInput.tokens';

describe('CdrInput token contract', () => {
  it('captures the layout defaults', () => {
    expect(contract.defaults.radius).toEqual({ kind: 'token', name: 'cdr-radius-softer' });
    expect(contract.defaults.padding).toEqual({ kind: 'token', name: 'cdr-space-inset-half-x' });
    expect(contract.defaults.height).toEqual({ kind: 'literal', value: '4rem' });
    expect(contract.defaults['large-height']).toEqual({ kind: 'literal', value: '4.8rem' });
    expect(contract.defaults['icon-offset']).toEqual({ kind: 'token', name: 'cdr-space-half-x' });
    expect(contract.defaults['helper-margin-top']).toEqual({
      kind: 'token',
      name: 'cdr-space-quarter-x',
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
      'placeholder',
      'helper',
      'label',
    ]);
  });

  it('maps the default scope to control neutral tokens', () => {
    const { default: defaultScope } = contract.variants;

    expect(defaultScope.identity).toBe('neutral');
    expect(defaultScope.rest).toEqual({
      surface: 'neutral-faint',
      text: 'neutral-bold',
      border: 'neutral',
      icon: 'neutral-prominent',
    });
    expect(defaultScope['focus-visible']).toEqual({
      surface: 'neutral-faint',
      border: 'neutral-intense',
      icon: 'neutral-intense',
    });
    expect(defaultScope.disabled).toEqual({
      surface: 'neutral-faint',
      text: 'neutral-faint',
      border: 'neutral-faint',
    });
  });

  it('maps the secondary, error, placeholder, helper, and label scopes', () => {
    const { secondary, error, placeholder, helper, label } = contract.variants;

    expect(secondary.identity).toBe('neutral');
    expect(secondary.rest).toEqual({ surface: 'neutral-trace' });
    expect(secondary['focus-visible']).toEqual({ surface: 'neutral-trace' });

    expect(error.identity).toBe('error');
    expect(error.rest).toEqual({
      surface: { fullPath: 'feedback-surface-error-trace' },
      border: { fullPath: 'feedback-border-error' },
    });

    expect(placeholder.identity).toBe('neutral');
    expect(placeholder.rest).toEqual({ text: 'neutral' });
    expect(placeholder.disabled).toEqual({ text: 'neutral-faint' });

    expect(helper.identity).toBe('neutral');
    expect(helper.rest).toEqual({ text: 'neutral' });

    expect(label.identity).toBe('neutral');
    expect(label.rest).toEqual({ border: 'neutral' });
  });
});
