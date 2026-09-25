import contract from '../CdrBreadcrumb.tokens';

describe('CdrBreadcrumb token contract', () => {
  it('captures the existing layout, reset, and spacing defaults', () => {
    expect(contract.defaults['delimiter-padding']).toEqual({
      kind: 'token',
      name: 'cdr-space-half-x',
    });
    expect(contract.defaults['line-height']).toEqual({ kind: 'literal', value: '1' });
    expect(contract.defaults['link-color']).toEqual({ kind: 'literal', value: 'inherit' });
    expect(contract.defaults['ellipses-icon-border-bottom']).toEqual({
      kind: 'literal',
      value: '1px solid transparent',
    });
  });

  it('uses the Action family for the trail and the ellipsis trigger', () => {
    expect(contract.interaction).toBe('action');
    expect(Object.keys(contract.variants)).toEqual(['default', 'ellipsis']);
  });

  it('maps rest text to neutral-prominent and every highlight state to trigger', () => {
    const { default: trail, ellipsis } = contract.variants;

    expect(trail.rest).toEqual({ text: 'neutral-prominent' });
    expect(trail.hover).toEqual({ text: 'trigger' });
    expect(trail['focus-visible']).toEqual({ text: 'trigger' });
    expect(trail.active).toEqual({ text: 'trigger' });
    expect(trail.disabled).toBeUndefined();

    expect(ellipsis.rest).toEqual({ text: 'neutral-prominent' });
    expect(ellipsis.hover).toEqual({ text: 'trigger' });
    expect(ellipsis['focus-visible']).toEqual({ text: 'trigger' });
    expect(ellipsis.active).toEqual({ text: 'trigger' });
    expect(ellipsis.disabled).toBeUndefined();
  });
});
