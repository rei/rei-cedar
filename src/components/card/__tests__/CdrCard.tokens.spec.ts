import contract from '../CdrCard.tokens';

describe('CdrCard token contract', () => {
  it('uses the Action interaction family for the card link', () => {
    expect(contract.interaction).toBe('action');
  });

  it('maps the base surface and text to Universal tokens', () => {
    expect(contract.variants.base.rest.surface).toEqual({ fullPath: 'surface-natural' });
    expect(contract.variants.base.rest.text).toEqual({ fullPath: 'text-neutral-prominent' });
  });

  it('maps the link text and its hover state', () => {
    expect(contract.variants.link.rest).toEqual({ text: 'neutral-bold' });
    expect(contract.variants.link.hover).toEqual({ text: 'trigger' });
  });

  it('captures the existing radius and shadow defaults', () => {
    expect(contract.defaults['border-radius']).toEqual({
      kind: 'token',
      name: 'cdr-radius-softer',
    });
    expect(contract.defaults['box-shadow']).toEqual({
      kind: 'token',
      name: 'cdr-prominence-raised',
    });
  });
});
