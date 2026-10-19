import contract from '../CdrRadio.tokens';

describe('CdrRadio token contract', () => {
  it('uses the Control interaction family', () => {
    expect(contract.interaction).toBe('control');
  });

  it('documents the unchecked rest inherited from CdrLabelWrapper', () => {
    expect(contract.variants.default.rest).toEqual({
      surface: 'neutral-faint',
      border: 'neutral',
    });
  });

  it('maps the checked rest to bold Control tokens with a trace icon', () => {
    expect(contract.variants.checked.rest).toEqual({
      surface: 'neutral-bold',
      border: 'neutral-bold',
      icon: 'neutral-trace',
    });
  });

  it('maps the hover outline to neutral-intense (nearest approved, visibly darker)', () => {
    expect(contract.variants.default.hover).toEqual({
      surface: 'neutral-faint',
      border: 'neutral-intense',
    });
  });

  it('maps the checked-active dot to the approved intense icon, not the checkbox alias', () => {
    expect(contract.variants.checked.active).toEqual({ icon: 'neutral-intense' });
  });

  it('keeps the checked focus and hover surfaces on prominent', () => {
    expect(contract.variants.checked.hover?.surface).toBe('neutral-prominent');
    expect(contract.variants.checked['focus-visible']?.surface).toBe('neutral-prominent');
  });

  it('captures the radio-owned figure and inner-circle layout values', () => {
    expect(contract.defaults['figure-radius']).toEqual({ kind: 'literal', value: '100%' });
    expect(contract.defaults['inner-circle-size']).toEqual({ kind: 'literal', value: '0.4rem' });
    expect(contract.defaults['inner-circle-radius']).toEqual({
      kind: 'token',
      name: 'cdr-radius-round',
    });
  });
});
