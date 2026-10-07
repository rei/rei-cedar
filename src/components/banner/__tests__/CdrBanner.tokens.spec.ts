import contract from '../CdrBanner.tokens';

describe('CdrBanner token contract', () => {
  it('captures the layout and elevation defaults', () => {
    expect(contract.defaults['left-border-width']).toEqual({
      kind: 'literal',
      value: '0.4rem',
    });
    expect(contract.defaults['left-border-style']).toEqual({ kind: 'literal', value: 'solid' });
    expect(contract.defaults['main-min-height']).toEqual({ kind: 'literal', value: '3.2rem' });
    expect(contract.defaults['message-padding']).toEqual({
      kind: 'token',
      name: 'cdr-space-half-x',
    });
    expect(contract.defaults['message-body-padding']).toEqual({
      kind: 'token',
      name: 'cdr-space-half-x',
    });
    expect(contract.defaults['icon-left-size']).toEqual({ kind: 'literal', value: '2.2rem' });
    expect(contract.defaults['icon-left-margin']).toEqual({
      kind: 'token',
      name: 'cdr-space-quarter-x',
    });
    expect(contract.defaults['icon-left-stroke-width']).toEqual({
      kind: 'literal',
      value: '0.4rem',
    });
    expect(contract.defaults['icon-left-paint-order']).toEqual({
      kind: 'literal',
      value: 'stroke fill',
    });
    expect(contract.defaults['icon-right-size']).toEqual({ kind: 'literal', value: '2rem' });
    expect(contract.defaults['info-action-max-height']).toEqual({
      kind: 'literal',
      value: '3.2rem',
    });
    expect(contract.defaults['info-action-width']).toEqual({ kind: 'literal', value: '4rem' });
    expect(contract.defaults['info-action-icon-size']).toEqual({
      kind: 'literal',
      value: '2.2rem',
    });
    expect(contract.defaults.prominence).toEqual({
      kind: 'token',
      name: 'cdr-prominence-raised',
    });
  });

  it('is fully cut over: no legacy fallbacks and no legacy-only extras', () => {
    expect(contract.legacy).toBeUndefined();
    for (const variant of Object.values(contract.variants)) {
      for (const extraValue of Object.values(variant.extras ?? {})) {
        expect(extraValue).not.toBeNull();
      }
    }
  });

  it('declares the Feedback family, hook surface, and default variant', () => {
    expect(contract.interaction).toBe('feedback');
    expect(contract.hooks).toBe(true);
    expect(contract.defaultVariant).toBe('default');
    expect(contract.recipe).toBeUndefined();
    expect(Object.keys(contract.variants)).toEqual([
      'default',
      'info',
      'success',
      'warning',
      'error',
      'message-body',
      'icon-right',
      'info-action',
    ]);
  });

  it('maps each status to faint surfaces, status borders, and tinted icon bubbles', () => {
    const { default: defaultStatus, info, success, warning, error } = contract.variants;

    expect(defaultStatus.identity).toBe('natural');
    expect(defaultStatus.rest).toEqual({
      surface: 'natural-faint',
      border: 'natural',
      icon: { fullPath: 'feedback-border-natural' },
    });
    expect(defaultStatus.extras).toEqual({
      outline: { kind: 'literal', value: 'var(--cdr-color-feedback-border-natural-faint)' },
      'icon-left-surface': {
        kind: 'literal',
        value: 'var(--cdr-color-feedback-surface-natural)',
      },
      'icon-stroke': { kind: 'literal', value: 'var(--cdr-color-feedback-icon-neutral)' },
    });

    expect(info.rest).toEqual({
      surface: 'info-faint',
      border: 'info',
      icon: { fullPath: 'feedback-border-info' },
    });
    expect(info.extras?.outline).toEqual({
      kind: 'literal',
      value: 'var(--cdr-color-feedback-border-info-faint)',
    });
    expect(info.extras?.['icon-left-surface']).toEqual({
      kind: 'literal',
      value: 'var(--cdr-color-feedback-surface-info)',
    });

    expect(success.rest).toEqual({
      surface: 'success-faint',
      border: 'success',
      icon: { fullPath: 'feedback-border-success' },
    });
    expect(success.extras?.outline).toEqual({
      kind: 'literal',
      value: 'var(--cdr-color-feedback-border-success-faint)',
    });

    expect(warning.rest).toEqual({
      surface: 'warning-faint',
      border: 'warning',
      icon: { fullPath: 'feedback-border-warning' },
    });
    expect(warning.extras?.outline).toEqual({
      kind: 'literal',
      value: 'var(--cdr-color-feedback-border-warning-faint)',
    });

    expect(error.rest).toEqual({
      surface: 'error-trace',
      border: 'error',
      icon: 'error',
    });
    expect(error.extras?.outline).toEqual({
      kind: 'literal',
      value: 'var(--cdr-color-feedback-border-error-faint)',
    });
    expect(error.extras?.['icon-left-surface']).toEqual({
      kind: 'literal',
      value: 'var(--cdr-color-feedback-surface-error)',
    });
  });

  it('keeps the icon stroke neutral across every status', () => {
    for (const status of ['default', 'info', 'success', 'warning', 'error'] as const) {
      expect(contract.variants[status].extras?.['icon-stroke']).toEqual({
        kind: 'literal',
        value: 'var(--cdr-color-feedback-icon-neutral)',
      });
    }
  });

  it('assigns the part scopes their own categories via fullPath', () => {
    expect(contract.variants['message-body'].rest).toEqual({ surface: 'neutral-trace' });
    expect(contract.variants['icon-right'].rest).toEqual({
      icon: { fullPath: 'text-neutral-bold' },
    });
    expect(contract.variants['info-action'].rest).toEqual({
      icon: { fullPath: 'action-text-trigger' },
    });
  });
});
