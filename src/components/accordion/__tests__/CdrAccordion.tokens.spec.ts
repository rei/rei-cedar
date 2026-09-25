import contract from '../CdrAccordion.tokens';

describe('CdrAccordion token contract', () => {
  it('captures the existing spacing and transition defaults', () => {
    expect(contract.defaults['button-padding']).toEqual({
      kind: 'token',
      name: 'cdr-space-inset-one-x',
    });
    expect(contract.defaults['content-padding-top']).toEqual({
      kind: 'token',
      name: 'cdr-space-half-x',
    });
    expect(contract.defaults['content-opacity']).toEqual({ kind: 'literal', value: '0' });
  });

  it('separates frame, header, and content color scopes', () => {
    expect(Object.keys(contract.variants)).toEqual(['frame', 'header', 'content']);
    expect(contract.variants.header.rest).toEqual({
      text: 'neutral-prominent',
      icon: 'neutral-prominent',
    });
    expect(contract.variants.content.rest).toEqual({ text: 'neutral-prominent' });
  });

  it('declares the same effective header colors for hover, focus-visible, and active', () => {
    const header = contract.variants.header;
    expect(header.hover).toEqual({
      surface: 'neutral-faint',
      text: 'neutral-prominent',
      icon: 'neutral-prominent',
    });
    expect(header['focus-visible']).toEqual(header.hover);
    expect(header.active).toEqual(header.hover);
    expect(header.disabled).toBeUndefined();
  });
});
