import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { findContracts, generateScss } from '../../generate-component-maps';
import { generateActionCSS } from '../families/action';
import { loadTokenManifest, validateContract } from '../validate';
import { semantic, token, literal } from '../types';
import type { ComponentTokenContract } from '../types';

const root = path.resolve(import.meta.dirname, '../../..');
const source = path.join(root, 'src/components');
const manifest = await loadTokenManifest();
const files = findContracts(source);
const contracts = await Promise.all(
  files.map(async (file) => ({
    file,
    contract: (await import(file)).default as ComponentTokenContract,
  })),
);
const fixture: ComponentTokenContract = {
  component: 'cdr-example',
  prefix: '--cdr-example',
  interaction: 'control',
  defaults: { text: semantic('control-text-neutral', token('cdr-color-text-primary')) },
  variants: { default: { identity: 'neutral', rest: { icon: 'neutral' } } },
  legacy: { 'default/fill': 'cdr-color-icon-default' },
};

describe('component token contracts', () => {
  it('validates every shipped contract and keeps all color-owning components covered', () => {
    for (const { contract } of contracts)
      expect(() => validateContract(contract, manifest), contract.component).not.toThrow();
    expect(contracts.length).toBe(42);
    for (const file of fs.readdirSync(source, { recursive: true }) as string[]) {
      if (
        !file.includes(`${path.sep}styles${path.sep}`) ||
        !file.endsWith('.scss') ||
        file.endsWith('.maps.scss')
      )
        continue;
      const text = fs.readFileSync(path.join(source, file), 'utf8');
      if (/maps\.\$|\$cdr-color|--cdr-color|#[0-9a-f]{6}\b/i.test(text)) {
        expect(
          contracts.some(
            (c) => path.dirname(c.file) === path.join(source, file.split(path.sep)[0]),
          ),
          file,
        ).toBe(true);
      }
    }
  });

  it('emits independent icons, sparse states, and a runtime plus Sass legacy fallback', () => {
    validateContract(fixture, manifest);
    const output = generateScss(fixture, path.join(source, 'example/CdrExample.tokens.ts'));
    expect(output).toContain(
      'var(--cdr-color-control-text-neutral, var(--cdr-color-text-primary, #{tokens.$cdr-color-text-primary}))',
    );
    expect(output).toContain(
      'fill: var(--cdr-color-control-icon-neutral, var(--cdr-color-icon-default, #{tokens.$cdr-color-icon-default}))',
    );
    expect(output).not.toContain('fill-hover:');
    expect(output).not.toContain('background:');
  });

  it('rejects broken fallbacks, invalid taxonomy, unsupported features, and stale semantic manifests', () => {
    expect(() =>
      validateContract({ ...fixture, defaults: { text: token('cdr-does-not-exist') } }, manifest),
    ).toThrow('unknown fallback');
    expect(() =>
      validateContract(
        {
          ...fixture,
          variants: { default: { identity: 'neutral', rest: { text: 'neutral-base' } } },
          legacy: {},
        },
        manifest,
      ),
    ).toThrow('invalid semantic path');
    expect(() =>
      validateContract(
        {
          ...fixture,
          variants: { default: { identity: 'bogus', rest: { icon: 'neutral' } } },
          legacy: { 'default/fill': 'cdr-color-icon-default' },
        } as unknown as ComponentTokenContract,
        manifest,
      ),
    ).toThrow('identity');
    expect(() =>
      validateContract(
        { ...fixture, interaction: 'bogus' } as unknown as ComponentTokenContract,
        manifest,
      ),
    ).toThrow('interaction');
    expect(() =>
      validateContract(
        {
          ...fixture,
          variants: {
            default: {
              identity: 'neutral',
              rest: { icon: 'neutral' },
              pressed: { icon: 'neutral' },
            },
          },
          legacy: { 'default/fill': 'cdr-color-icon-default' },
        } as unknown as ComponentTokenContract,
        manifest,
      ),
    ).toThrow('unknown variant field');
    expect(() =>
      validateContract({ ...fixture, conditions: { checked: { text: 'neutral' } } }, manifest),
    ).toThrow('conditions');
    expect(() =>
      validateContract({ ...fixture, legacy: { 'default/fill': 'cdr-missing' } }, manifest),
    ).toThrow('unknown fallback');
    expect(() => validateContract({ ...fixture, legacy: {} }, manifest)).toThrow(
      'missing published fallback',
    );
    expect(() =>
      validateContract(fixture, {
        ...manifest,
        semanticTokens: new Set(['cdr-color-text-neutral']),
      }),
    ).toThrow('absent from');
    expect(() =>
      validateContract(
        { ...fixture, defaults: { text: semantic('text-neutral', literal('')) } },
        manifest,
      ),
    ).toThrow('empty fallback');
  });

  it('keeps CSS and SCSS output aligned for Button extras and independent icons', () => {
    const button = contracts.find((c) => c.contract.component === 'cdr-button')!.contract;
    const output = generateActionCSS(button);
    expect(output).toContain('--cdr-button-fill: var(--cdr-color-action-icon-brand,');
    expect(output).toContain(
      '--cdr-button-active-inset: var(--cdr-color-action-border-brand-subtle,',
    );
    expect(output).toContain('--cdr-button-link-icon: var(--cdr-color-action-icon-trigger,');
    expect(output).not.toMatch(
      /--cdr-color-action-(?:text|icon)-(?:disabled|icon-default|neutral-base)/,
    );
  });

  it('has no unconsumed named color slots in the new defaults-only contracts', () => {
    for (const { file, contract } of contracts) {
      if (Object.keys(contract.variants).length) continue;
      const dir = path.join(path.dirname(file), 'styles');
      const styles = (fs.readdirSync(dir, { recursive: true }) as string[])
        .filter((f) => f.endsWith('.scss') && !f.endsWith('.maps.scss'))
        .map((f) => fs.readFileSync(path.join(dir, f), 'utf8'))
        .join('\n');
      for (const key of Object.keys(contract.defaults)) {
        expect(styles, `${contract.component}.${key}`).toMatch(
          new RegExp(`map\\.get\\(\\s*maps\\.\\$[\\w-]+,\\s*${key}\\s*\\)`),
        );
      }
    }
  });

  it('consumes every declared variant slot, extra, and default', () => {
    const roleProp: Record<string, string> = {
      surface: 'background',
      text: 'text',
      border: 'border',
      icon: 'fill',
    };
    for (const { file, contract } of contracts) {
      if (!Object.keys(contract.variants).length) continue;
      const short = contract.component.replace(/^cdr-/, '');
      const prefix = contract.prefix.replace(/^--/, '');
      const dir = path.join(path.dirname(file), 'styles');
      const styles = (fs.readdirSync(dir, { recursive: true }) as string[])
        .filter((f) => f.endsWith('.scss') && !f.endsWith('.maps.scss'))
        .map((f) => fs.readFileSync(path.join(dir, f), 'utf8'))
        .join('\n');
      const wholeColors = new RegExp(`@each[\\s\\S]*?maps\\.\\$${short}-colors`).test(styles);
      const wholeDefaults = new RegExp(`@each[\\s\\S]*?maps\\.\\$${short}-defaults`).test(styles);
      const covered = (map: 'colors' | 'defaults', key: string, variant?: string) => {
        if (map === 'colors' && wholeColors) return true;
        if (map === 'defaults' && wholeDefaults) return true;
        const get = new RegExp(
          `map\\.get\\(\\s*maps\\.\\$${short}-${map}\\s*,\\s*${variant ?? key}\\s*\\)`,
        );
        if (get.test(styles)) return true;
        return new RegExp(`var\\(--${prefix}-${key}(?=[,)\\s])`).test(styles);
      };
      for (const key of Object.keys(contract.defaults)) {
        expect(styles, `${contract.component}.defaults.${key}`).toBe(
          covered('defaults', key) ? styles : '',
        );
      }
      for (const [name, variant] of Object.entries(contract.variants)) {
        for (const [state, slots] of Object.entries(variant)) {
          if (state === 'extras' || state === 'identity' || !slots || typeof slots !== 'object')
            continue;
          for (const role of Object.keys(slots)) {
            const key = `${roleProp[role]}${state === 'rest' ? '' : `-${state}`}`;
            expect(styles, `${contract.component}.${name}.${state}.${role}`).toBe(
              covered('colors', key, name) ? styles : '',
            );
          }
        }
        for (const key of Object.keys(variant.extras ?? {})) {
          expect(styles, `${contract.component}.${name}.extras.${key}`).toBe(
            covered('colors', key, name) ? styles : '',
          );
        }
      }
    }
  });
});
