import contract from '../CdrCheckbox.tokens';

describe('CdrCheckbox token contract', () => {
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
    expect(contract.variants.default.hover?.border).toBe('neutral-intense');
  });

  it('maps the active check to the bold icon token', () => {
    expect(contract.variants.checked.active?.icon).toBe('neutral-bold');
  });

  it('captures the checkbox-owned figure and icon layout values', () => {
    expect(contract.defaults['figure-radius']).toEqual({ kind: 'token', name: 'cdr-radius-soft' });
    expect(contract.defaults['svg-width']).toEqual({ kind: 'literal', value: '1.6rem' });
    expect(contract.defaults['indeterminate-width']).toEqual({ kind: 'literal', value: '8px' });
  });
});
