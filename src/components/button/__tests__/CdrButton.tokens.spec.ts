import contract from '../CdrButton.tokens';

describe('CdrButton token contract', () => {
  it('captures the layout, typography, and elevation defaults', () => {
    expect(contract.defaults.radius).toEqual({ kind: 'token', name: 'cdr-radius-softer' });
    expect(contract.defaults.padding).toEqual({
      kind: 'token',
      name: 'cdr-space-inset-one-x-squish',
    });
    expect(contract.defaults['font-family']).toEqual({
      kind: 'token',
      name: 'cdr-font-family-sans',
    });
    expect(contract.defaults['font-style']).toEqual({ kind: 'literal', value: 'normal' });
    expect(contract.defaults['icon-only-radius']).toEqual({
      kind: 'token',
      name: 'cdr-radius-soft',
    });
    expect(contract.defaults['icon-only-padding']).toEqual({
      kind: 'token',
      name: 'cdr-space-inset-half-x',
    });
    expect(contract.defaults['icon-only-large-padding']).toEqual({
      kind: 'token',
      name: 'cdr-space-three-quarter-x',
    });
    expect(contract.defaults.elevation).toEqual({
      kind: 'literal',
      value: '0 0 0 0 transparent',
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

  it('declares the Action family, every color scope, and the default variant', () => {
    expect(contract.interaction).toBe('action');
    expect(contract.recipe).toBe('pressable');
    expect(contract.defaultVariant).toBe('primary');
    expect(Object.keys(contract.variants)).toEqual([
      'primary',
      'secondary',
      'dark',
      'sale',
      'link',
      'icon-only',
      'with-background',
    ]);
  });

  it('exposes the active inset as a value-carrying extra on every bordered scope', () => {
    const inset = (variant: string) => contract.variants[variant].extras?.['active-inset'];

    expect(inset('primary')).toEqual({
      kind: 'literal',
      value: 'var(--cdr-color-border-neutral-trace)',
    });
    expect(inset('secondary')).toEqual({
      kind: 'literal',
      value: 'var(--cdr-color-border-neutral-trace)',
    });
    expect(inset('dark')).toEqual({
      kind: 'literal',
      value: 'var(--cdr-color-action-border-neutral-faint)',
    });
    expect(inset('sale')).toEqual({
      kind: 'literal',
      value: 'var(--cdr-color-border-neutral-trace)',
    });
    expect(inset('with-background')).toEqual({
      kind: 'literal',
      value: 'var(--cdr-color-border-neutral-trace)',
    });
    expect(inset('link')).toBeUndefined();
    expect(inset('icon-only')).toBeUndefined();

    // The link scope's transparent background is a value-carrying extra too.
    expect(contract.variants.link.extras?.surface).toEqual({
      kind: 'literal',
      value: 'transparent',
    });
  });

  it('maps the filled variants to approved roles and states', () => {
    const { primary, secondary, dark, sale } = contract.variants;

    expect(primary.identity).toBe('brand');
    expect(primary.rest).toEqual({
      surface: 'brand',
      text: 'neutral-trace',
      border: 'brand',
      icon: 'neutral-trace',
    });
    expect(primary.hover).toEqual({
      surface: 'brand-faint',
      text: 'brand',
      border: 'brand',
      // Palette gap: no action-icon-brand; the icon reuses the brand text token.
      icon: { fullPath: 'action-text-brand' },
    });
    expect(primary.active).toEqual(primary.rest);
    expect(primary.disabled).toEqual({
      surface: 'neutral-prominent',
      text: 'neutral-trace',
      border: 'neutral-faint',
      icon: 'neutral-trace',
    });

    expect(secondary.rest).toEqual({
      surface: 'neutral-faint',
      text: 'neutral-bold',
      border: 'neutral',
      icon: 'neutral',
    });
    expect(secondary.active).toEqual({
      surface: 'neutral-bold',
      text: 'neutral-trace',
      border: 'neutral',
      icon: 'neutral-trace',
    });
    expect(secondary.disabled).toEqual({
      surface: 'neutral-faint',
      text: 'neutral-subtle',
      border: 'neutral-faint',
      icon: 'neutral-subtle',
    });

    expect(dark.rest).toEqual({
      surface: 'neutral-intense',
      text: 'neutral-trace',
      border: 'neutral-bold',
      icon: 'neutral-trace',
    });
    expect(dark.hover.surface).toBe('neutral');
    expect(dark.active).toEqual(dark.rest);
    expect(dark.disabled).toEqual(primary.disabled);

    expect(sale.rest).toEqual({
      surface: 'sale',
      text: 'neutral-trace',
      border: 'sale',
      icon: 'neutral-trace',
    });
    expect(sale.hover).toEqual({
      surface: 'sale-faint',
      text: 'sale',
      border: 'sale',
      icon: 'sale',
    });
    expect(sale.active).toEqual(sale.rest);
    expect(sale.disabled).toEqual(primary.disabled);
  });

  it('maps the special-case scopes to trigger and neutral tokens', () => {
    const { link, 'icon-only': iconOnly, 'with-background': withBackground } = contract.variants;

    expect(link.identity).toBe('trigger');
    expect(link.rest.text).toBe('trigger');
    expect(link.rest.icon).toEqual({ fullPath: 'action-text-trigger' });
    expect(link['focus-visible']?.text).toBe('trigger-bold');
    expect(link.active?.text).toBe('trigger-bold');
    expect(link.disabled).toEqual({ text: 'neutral-subtle', icon: 'neutral-subtle' });

    expect(iconOnly.rest.icon).toBe('neutral');
    expect(iconOnly['focus-visible']).toEqual({ icon: 'neutral', border: 'neutral' });
    expect(iconOnly.disabled?.icon).toBe('neutral-subtle');

    expect(withBackground.rest).toEqual({
      surface: 'neutral-faint',
      border: 'neutral',
      icon: 'neutral',
    });
    expect(withBackground.hover).toEqual({
      surface: 'neutral-subtle',
      border: 'neutral-bold',
      icon: 'neutral',
    });
    expect(withBackground['focus-visible']).toEqual(withBackground.hover);
    expect(withBackground.active?.text).toBe('neutral-trace');
    expect(withBackground.active?.border).toBe('neutral');
    expect(withBackground.disabled).toEqual({
      surface: 'neutral-faint',
      border: 'neutral-faint',
      icon: 'neutral-subtle',
    });
  });
});
