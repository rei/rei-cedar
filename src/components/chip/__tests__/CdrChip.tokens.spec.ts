import contract from '../CdrChip.tokens';

describe('CdrChip token contract', () => {
  it('uses the Control interaction family', () => {
    expect(contract.interaction).toBe('control');
  });

  it('captures the existing typography defaults', () => {
    expect(contract.defaults['font-size']).toEqual({ kind: 'literal', value: '14px' });
    expect(contract.defaults['border-radius']).toEqual({ kind: 'literal', value: '30px' });
  });

  it('maps the default chip rest colors to Control neutrals', () => {
    expect(contract.variants.default.rest).toEqual({
      surface: { fullPath: 'surface-neutral-trace' },
      text: 'neutral-prominent',
      icon: 'neutral-intense',
      border: { fullPath: 'border-neutral-prominent' },
    });
  });

  it('declares disabled only for the default variant', () => {
    expect(contract.variants.default.disabled).toBeDefined();
    expect(contract.variants.selected.disabled).toBeUndefined();
  });

  it('maps selected states for the aria-pressed variant', () => {
    expect(contract.variants.selected.rest).toEqual({
      surface: 'natural-bold',
      border: 'neutral-bold',
    });
  });
});
