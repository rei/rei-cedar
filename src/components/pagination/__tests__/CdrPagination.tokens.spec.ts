import contract from '../CdrPagination.tokens';

describe('CdrPagination token contract', () => {
  it('captures the layout and keyline geometry defaults', () => {
    expect(contract.defaults['link-padding']).toEqual({
      kind: 'token',
      name: 'cdr-space-inset-three-quarter-x-squish',
    });
    expect(contract.defaults['link-radius']).toEqual({ kind: 'token', name: 'cdr-radius-softer' });
    expect(contract.defaults['link-gap']).toEqual({ kind: 'token', name: 'cdr-space-quarter-x' });
    expect(contract.defaults['prev-margin-right']).toEqual({
      kind: 'token',
      name: 'cdr-space-one-x',
    });
    expect(contract.defaults['next-margin-left']).toEqual({
      kind: 'token',
      name: 'cdr-space-one-x',
    });
    expect(contract.defaults['caret-margin-right']).toEqual({
      kind: 'token',
      name: 'cdr-space-eighth-x',
    });
    expect(contract.defaults['caret-margin-left']).toEqual({
      kind: 'token',
      name: 'cdr-space-eighth-x',
    });
    expect(contract.defaults['keyline-height']).toEqual({ kind: 'literal', value: '2px' });
    expect(contract.defaults['keyline-width']).toEqual({ kind: 'literal', value: '80%' });
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
    expect(Object.keys(contract.variants)).toEqual(['default', 'current']);
  });

  it('maps links to neutral action text with state surfaces and disabled text', () => {
    const { default: defaultScope, current } = contract.variants;

    expect(defaultScope.identity).toBe('neutral');
    expect(defaultScope.rest).toEqual({ text: 'neutral-bold', icon: 'neutral-bold' });
    expect(defaultScope.hover).toEqual({ surface: 'neutral-faint' });
    expect(defaultScope['focus-visible']).toEqual({ surface: 'neutral-faint' });
    expect(defaultScope.active).toEqual({ surface: 'neutral-faint' });
    expect(defaultScope.disabled).toEqual({ text: 'neutral-subtle', icon: 'neutral-subtle' });

    expect(current.identity).toBe('trigger');
    expect(current.rest).toEqual({ border: 'trigger' });
  });
});
