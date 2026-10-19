import contract from '../CdrSwitch.tokens';

describe('CdrSwitch token contract', () => {
  it('uses the Control interaction family', () => {
    expect(contract.interaction).toBe('control');
  });

  it('maps the track rest to a faint surface with neutral border and prominent icons', () => {
    expect(contract.variants.default.rest).toEqual({
      surface: 'neutral-faint',
      border: 'neutral',
      icon: 'neutral-prominent',
    });
  });

  it('maps the hover outline and icons to bold/intense Control tokens', () => {
    expect(contract.variants.default.hover).toEqual({
      surface: 'neutral-faint',
      border: 'neutral-bold',
      icon: 'neutral-intense',
    });
  });

  it('maps the checked track to bold and the selected surface to intense', () => {
    expect(contract.variants.checked.rest).toEqual({ surface: 'neutral-bold', icon: 'neutral' });
    expect(contract.variants.checked.hover?.surface).toBe('neutral-intense');
    expect(contract.variants.checked['focus-visible']?.surface).toBe('neutral-intense');
  });

  it('gives the handle its own scopes so its border can diverge from the track', () => {
    expect(contract.variants.handle.rest).toEqual({ surface: 'natural-bold', border: 'neutral' });
    expect(contract.variants['handle-checked'].rest).toEqual({ surface: 'natural-bold' });
    expect(contract.variants['handle-checked']['focus-visible']).toEqual({
      border: 'neutral-faint',
    });
  });

  it('captures the switch-owned spacing and transition values', () => {
    expect(contract.defaults.margin).toEqual({ kind: 'token', name: 'cdr-space-quarter-x' });
    expect(contract.defaults['transition-duration']).toEqual({
      kind: 'token',
      name: 'cdr-duration-3-x',
    });
    expect(contract.defaults['transition-timing']).toEqual({
      kind: 'token',
      name: 'cdr-timing-function-ease-out',
    });
  });
});
