import type { Meta, StoryObj } from '@storybook/vue3';
import {
  categories,
  colorRoles,
  docsShell,
  expressions,
  grammarTiers,
  tokenHex,
} from './semanticColorData';

// Video chapters: palettes, filter, families, grammar, roles.
// Sources: video/src/film/FoundationScenes.tsx + docs/cedar-semantic-taxonomy.md

const meta: Meta = {
  title: 'Semantic Color/Foundations',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    actions: { disable: true },
    docs: {
      description: {
        component:
          'Primitives, scopes, families, token grammar, and color roles. Mirrors video chapters 04–08.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const page = (inner: string) => ({
  template: `<div style="${docsShell}">${inner}</div>`,
});

export const Palettes: Story = {
  name: '05 Color foundations',
  parameters: {
    docs: {
      description: {
        story:
          'Video `palettes`: complete primitive palettes are raw material. OKLCH keeps relationships perceptually consistent. Source: video/web-tokens.json.',
      },
    },
  },
  render: () =>
    page(`
      <p style="font: 12px monospace; letter-spacing: 2px; color: #143528;">05 / PRIMITIVES</p>
      <h2 style="font-family: Stuart, Georgia, serif; font-size: 32px; color: #143528;">A full spectrum of possibility.</h2>
      <p style="color: #4c473e;">Every Cedar palette is here. Semantic meaning turns the range into decisions.</p>
      <div style="border: 1px solid #d7d4ce; border-radius: 12px; padding: 16px; background: #fff; margin-top: 16px;">
        <div style="font-family: Stuart, Georgia, serif; font-size: 28px; color: #143528;">OKLCH</div>
        <p style="color: #746e63;">A more perceptually uniform color model: Lightness · Chroma · Hue.</p>
        <p style="font: 12px monospace; color: #8e887d;">Primitives provide the range. The semantic layer adds the reason to choose.</p>
      </div>
    `),
};

export const ScopedByPurpose: Story = {
  name: '06 Color scoped by purpose',
  parameters: {
    docs: {
      description: {
        story:
          'Video `filter`: choose colors by purpose. Scopes guide text, surfaces, and graphics so there is less guesswork.',
      },
    },
  },
  render: () =>
    page(`
      <p style="font: 12px monospace; letter-spacing: 2px; color: #143528;">06 / SCOPES</p>
      <h2 style="font-family: Stuart, Georgia, serif; font-size: 32px; color: #143528;">Choose by purpose.</h2>
      <div style="display: grid; gap: 12px; margin-top: 16px;">
        <div style="border: 1px solid #d7d4ce; border-radius: 12px; padding: 16px; display: flex; gap: 16px; align-items: center;">
          <div style="width: 72px; height: 56px; display: grid; place-items: center; border-radius: 8px; background: #f8f7f2; color: ${tokenHex('--cdr-color-text-brand')}; font-family: Stuart, Georgia, serif; font-size: 32px;">Aa</div>
          <div><div style="font-size: 20px; color: #143528;">Text</div><div style="color: #746e63;">Readable information</div><div style="font: 12px monospace; color: #8e887d;">color.text.brand</div></div>
        </div>
        <div style="border: 1px solid #d7d4ce; border-radius: 12px; padding: 16px; display: flex; gap: 16px; align-items: center;">
          <div style="width: 72px; height: 56px; display: grid; place-items: center; border-radius: 8px; background: ${tokenHex('--cdr-color-surface-neutral-subtle')}; color: #143528;">Content</div>
          <div><div style="font-size: 20px; color: #143528;">Surfaces</div><div style="color: #746e63;">Backgrounds with a purpose</div><div style="font: 12px monospace; color: #8e887d;">color.surface.neutral.subtle</div></div>
        </div>
        <div style="border: 1px solid #d7d4ce; border-radius: 12px; padding: 16px; display: flex; gap: 16px; align-items: center;">
          <div style="width: 72px; height: 56px; display: grid; place-items: center; border-radius: 8px; background: #f8f7f2; color: ${tokenHex('--cdr-color-graphic-surface-rating')};">★★★</div>
          <div><div style="font-size: 20px; color: #143528;">Graphics</div><div style="color: #746e63;">Visual expression</div><div style="font: 12px monospace; color: #8e887d;">color.graphic.surface.rating</div></div>
        </div>
      </div>
    `),
};

export const Families: Story = {
  name: '07 Start with user intent',
  parameters: {
    docs: {
      description: {
        story:
          'Video `families`: six categories, four interaction families. Ask what the user is trying to do before choosing a component or color.',
      },
    },
  },
  render: () => ({
    setup() {
      return { categories, tokenHex };
    },
    template: `
      <div style="${docsShell}">
        <p style="font: 12px monospace; letter-spacing: 2px; color: #143528;">07 / FAMILIES</p>
        <h2 style="font-family: Stuart, Georgia, serif; font-size: 32px; color: #143528;">Classify by what it does.</h2>
        <p style="color: #4c473e;">Six categories. Four interaction families. One decision: why does this part exist?</p>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 16px;">
          <div v-for="c in categories" :key="c.id" style="border: 1px solid #d7d4ce; border-radius: 12px; padding: 16px; background: #fff;">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <span style="font-family: Stuart, Georgia, serif; font-size: 20px; color: #143528;">{{ c.label }}</span>
              <span style="font: 11px monospace; color: #8e887d;">{{ c.kind }}</span>
            </div>
            <div style="font-size: 14px; color: #746e63; margin: 8px 0;">{{ c.line }}</div>
            <div :style="{ background: tokenHex(c.token), borderRadius: '6px', padding: '10px 12px', color: '#143528' }">{{ c.example }}</div>
            <div style="font: 11px monospace; color: #8e887d; margin-top: 8px;">{{ c.question }}</div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const TokenGrammar: Story = {
  name: '08 Five questions in a name',
  parameters: {
    docs: {
      description: {
        story:
          'Video `grammar`: color[.family].role.identity[.expression]. Base expression and missing family are omitted, never written as `base` or `universal`.',
      },
    },
  },
  render: () => ({
    setup() {
      return { grammarTiers, expressions, tokenHex };
    },
    template: `
      <div style="${docsShell}">
        <p style="font: 12px monospace; letter-spacing: 2px; color: #e5fd9c;">08 / GRAMMAR</p>
        <h2 style="font-family: Stuart, Georgia, serif; font-size: 32px; color: #f8f7f2;">A name you can reason about.</h2>
        <div style="background: #143528; color: #f8f7f2; border-radius: 16px; padding: 24px; margin-top: 16px;">
          <div style="display: flex; gap: 12px;">
            <div v-for="t in grammarTiers" :key="t.label" style="flex: 1;">
              <div style="font: 11px monospace; color: #9ebaa6;">{{ t.label.toUpperCase() }}</div>
              <div style="font: 20px monospace; background: #e5fd9c; color: #143528; border-radius: 8px; padding: 12px; text-align: center; margin: 8px 0;">{{ t.value }}</div>
              <div style="font-size: 13px; color: #c0ccbe;">{{ t.question }}</div>
            </div>
          </div>
          <div style="font: 18px monospace; color: #e5fd9c; margin-top: 20px;">--cdr-color-action-surface-brand-faint</div>
          <div style="display: flex; gap: 12px; align-items: center; margin-top: 12px; color: #c0ccbe;">
            <span :style="{ width: '48px', height: '28px', borderRadius: '6px', background: tokenHex('--cdr-color-action-surface-brand-faint'), display: 'inline-block' }"></span>
            <span>An Action surface. Brand identity. A Faint expression.</span>
          </div>
          <div style="display: flex; gap: 6px; margin-top: 20px;">
            <span v-for="e in expressions" :key="e" :style="{ flex: 1, borderTop: e === 'faint' ? '3px solid #e5fd9c' : '3px solid #48624d', paddingTop: '8px', font: '11px monospace', color: e === 'faint' ? '#e5fd9c' : '#9ebaa6' }">{{ e }}</span>
          </div>
        </div>
      </div>
    `,
  }),
};

export const ColorRoles: Story = {
  name: '09 One component, four roles',
  parameters: {
    docs: {
      description: {
        story:
          'Video `roles`: surface, border, text, and icon each have a job. Map them independently to the part that paints the color.',
      },
    },
  },
  render: () => ({
    setup() {
      return { colorRoles, tokenHex };
    },
    template: `
      <div style="${docsShell}">
        <p style="font: 12px monospace; letter-spacing: 2px; color: #143528;">09 / ROLES</p>
        <h2 style="font-family: Stuart, Georgia, serif; font-size: 32px; color: #143528;">One component. Four color jobs.</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px; align-items: start;">
          <div :style="{ background: tokenHex('--cdr-color-action-surface-brand'), color: tokenHex('--cdr-color-action-text-neutral-trace'), borderRadius: '12px', padding: '20px', textAlign: 'center', fontSize: '20px' }">
            Add to cart →
          </div>
          <div style="display: grid; gap: 8px;">
            <div v-for="r in colorRoles" :key="r.label" style="border: 1px solid #d7d4ce; border-radius: 10px; padding: 12px 14px; background: #fff;">
              <div style="display: flex; justify-content: space-between; align-items: center; color: #143528;">
                <strong>{{ r.label }}</strong>
                <span :style="{ width: '32px', height: '18px', background: tokenHex(r.token), border: '1px solid #d7d4ce', borderRadius: '4px', display: 'inline-block' }"></span>
              </div>
              <div style="font-size: 13px; color: #746e63;">{{ r.description }}</div>
              <div style="font: 11px monospace; color: #8e887d;">{{ r.token }}</div>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};
