import type { Meta, StoryObj } from '@storybook/vue3';
import CdrButton from './CdrButton.vue';

/**
 * This is a documentation-only companion to `Components/Button`. It documents the
 * `--cdr-button-*` CSS custom properties that CdrButton exposes, how the cascade
 * resolves a value, and lets you try overrides live.
 */
const meta: Meta<typeof CdrButton> = {
  title: 'Components/Button/Custom properties',
  component: CdrButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
};

export default meta;
type Story = StoryObj<typeof CdrButton>;

// ─── Shared doc chrome ──────────────────────────────────────────────────────

const docStyles = `
  <style>
    .var-api-page { max-width: 920px; font-family: inherit; }
    .var-api-page h2 { font-size: 20px; margin: 32px 0 12px; }
    .var-api-page h2:first-child { margin-top: 0; }
    .var-api-page p { font-size: 14px; line-height: 1.6; color: #4b4a48; margin: 0 0 12px; }
    .var-api-page code { font-family: Menlo, Consolas, monospace; font-size: 12.5px; background: #f1f0ed; padding: 1px 5px; border-radius: 3px; }
    .cascade-list { font-family: Menlo, Consolas, monospace; font-size: 12.5px; background: #1b1a19; color: #f1f0ed; padding: 16px 20px; border-radius: 8px; line-height: 1.9; margin: 0 0 16px; }
    .cascade-list .step-num { color: #9fd4a3; margin-right: 8px; }
    .var-table { width: 100%; border-collapse: collapse; margin: 0 0 24px; font-size: 13px; }
    .var-table th { text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; color: #736e65; border-bottom: 2px solid #e5e2dc; padding: 6px 10px 8px 0; }
    .var-table td { padding: 7px 10px 7px 0; border-bottom: 1px solid #ece9e3; vertical-align: top; }
    .var-table tr:last-child td { border-bottom: none; }
    .var-table td.mono, .var-table th.mono { font-family: Menlo, Consolas, monospace; font-size: 12px; }
    .state-pill { display: inline-block; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; padding: 2px 6px; border-radius: 4px; background: #ddeafb; color: #1b437e; margin: 0 4px 4px 0; }
    .playground { display: flex; gap: 32px; flex-wrap: wrap; align-items: flex-start; margin-bottom: 8px; }
    .playground-stage { flex: 0 0 auto; display: flex; align-items: center; justify-content: center; min-width: 220px; min-height: 120px; padding: 24px; border-radius: 8px; background: repeating-conic-gradient(#f1f0ed 0% 25%, #fff 0% 50%) 50% / 16px 16px; }
    .playground-controls { flex: 1 1 260px; display: flex; flex-direction: column; gap: 12px; min-width: 240px; }
    .playground-controls label { font-size: 12px; font-weight: 600; color: #4b4a48; display: flex; flex-direction: column; gap: 4px; }
    .playground-controls input[type='text'], .playground-controls select { font-size: 13px; padding: 6px 8px; border: 1px solid #d7d4ce; border-radius: 4px; font-family: Menlo, Consolas, monospace; }
    .playground-controls .hint { font-weight: 400; font-size: 11px; color: #736e65; }
  </style>
`;

// ─── Overview ───────────────────────────────────────────────────────────────

export const Overview: Story = {
  name: 'Overview',
  render: () => ({
    template: `${docStyles}
      <div class="var-api-page">
        <h2>What the Variable API is</h2>
        <p>
          CdrButton is styled entirely through a set of <code>--cdr-button-*</code> CSS custom
          properties. The component's own stylesheet never hardcodes a color, so you can re-theme
          a button — or build a brand-new variant — by overriding these variables, without
          forking <code>CdrButton.module.scss</code>.
        </p>
        <p>
          Properties follow the pattern <code>--cdr-button-&lt;property&gt;</code> for the resting
          state, and <code>--cdr-button-&lt;property&gt;-&lt;state&gt;</code> for
          <code>hover</code>, <code>focus-visible</code>, <code>active</code>, and
          <code>disabled</code>. For example: <code>--cdr-button-background</code> and
          <code>--cdr-button-background-hover</code>.
        </p>

        <h2>Resolution order (lowest → highest precedence)</h2>
        <div class="cascade-list">
          <div><span class="step-num">1</span>Component defaults — set once on <code>.cdr-button</code> (layout, typography, transitions)</div>
          <div><span class="step-num">2</span>Variant class — <code>.cdr-button--primary</code> / <code>--secondary</code> / <code>--dark</code> / <code>--sale</code> set color + elevation per state</div>
          <div><span class="step-num">3</span>Size class — <code>.cdr-button--small</code> / <code>--medium</code> / <code>--large</code> (and responsive <code>@xs/@sm/@md/@lg</code> variants) set typography + spacing</div>
          <div><span class="step-num">4</span>Pseudo-class state — <code>:hover</code>, <code>:focus-visible</code>, <code>:active</code>, <code>[disabled]</code> read the <code>-hover</code> / <code>-focus-visible</code> / <code>-active</code> / <code>-disabled</code> suffixed variable, falling back to the resting value if unset</div>
          <div><span class="step-num">5</span>Inline style override — anything you set via the <code>style</code> attribute on the rendered element wins over all of the above</div>
        </div>
        <p>
          This means the safest way to customize a button is to override the variable at the
          narrowest scope you need (inline style for a one-off instance, a wrapper class for a
          whole surface) rather than editing generated files — see the
          <code>Reference</code> story below for the full variable list, and
          <code>Live Playground</code> to try it.
        </p>

        <h2>Where variables come from</h2>
        <p>
          Values are not hardcoded hex/px literals — each one resolves to a Cedar semantic color
          or foundation token (e.g. <code>--cdr-button-background</code> resolves through
          <code>--cdr-color-action-surface-brand</code>, which itself falls back to a legacy
          token if the semantic layer is unavailable). This file is generated from
          <code>src/components/button/CdrButton.tokens.ts</code> — do not hand-edit
          <code>CdrButton.tokens.css</code> or the <code>vars/</code> SCSS maps; change the
          contract and run <code>pnpm build:maps</code>.
        </p>
      </div>
    `,
  }),
};

// ─── Live Playground ──────────────────────────────────────────────────────

export const LivePlayground: Story = {
  name: 'Live Playground',
  render: () => ({
    components: { CdrButton },
    data() {
      return {
        variant: 'primary',
        background: '',
        text: '',
        border: '',
        radius: '',
      };
    },
    computed: {
      overrideStyle(): Record<string, string> {
        const style: Record<string, string> = {};
        if (this.background) style['--cdr-button-background'] = this.background;
        if (this.text) style['--cdr-button-text'] = this.text;
        if (this.border) style['--cdr-button-border'] = this.border;
        if (this.radius) style['--cdr-button-radius'] = this.radius;
        return style;
      },
    },
    template: `${docStyles}
      <div class="var-api-page">
        <h2>Try overriding the variable API</h2>
        <p>
          These inputs set inline <code>--cdr-button-*</code> custom properties on the button
          element itself — the same mechanism you'd use in app code to theme a single instance.
          Leave a field blank to fall back to the variant's default.
        </p>
        <div class="playground">
          <div class="playground-stage">
            <CdrButton :modifier="variant" :style="overrideStyle">Add to Cart</CdrButton>
          </div>
          <div class="playground-controls">
            <label>
              Variant
              <select v-model="variant">
                <option value="primary">primary</option>
                <option value="secondary">secondary</option>
                <option value="dark">dark</option>
                <option value="sale">sale</option>
              </select>
            </label>
            <label>
              --cdr-button-background
              <input type="text" v-model="background" placeholder="e.g. #0b2d60 or oklch(45% 0.12 266)" />
              <span class="hint">Overrides the resting background color</span>
            </label>
            <label>
              --cdr-button-text
              <input type="text" v-model="text" placeholder="e.g. #ffffff" />
            </label>
            <label>
              --cdr-button-border
              <input type="text" v-model="border" placeholder="e.g. transparent" />
            </label>
            <label>
              --cdr-button-radius
              <input type="text" v-model="radius" placeholder="e.g. 999px" />
              <span class="hint">Try 0 (square) or 999px (pill)</span>
            </label>
          </div>
        </div>
      </div>
    `,
  }),
};

// ─── Reference tables ───────────────────────────────────────────────────────

interface VarRow {
  name: string;
  defaultValue: string;
  states?: string[];
  note?: string;
}

function renderTable(headers: string[], rows: VarRow[]): string {
  const headerHtml = headers.map((h) => `<th class="mono">${h}</th>`).join('');
  const rowsHtml = rows
    .map((r) => {
      const states = r.states?.length
        ? r.states.map((s) => `<span class="state-pill">${s}</span>`).join('')
        : '<span class="hint">—</span>';
      return `
        <tr>
          <td class="mono">${r.name}</td>
          <td class="mono">${r.defaultValue}</td>
          <td>${states}</td>
        </tr>`;
    })
    .join('');
  return `<table class="var-table"><thead><tr>${headerHtml}</tr></thead><tbody>${rowsHtml}</tbody></table>`;
}

const layoutVars: VarRow[] = [
  { name: '--cdr-button-radius', defaultValue: 'var(--cdr-radius-softer)' },
  { name: '--cdr-button-padding', defaultValue: 'var(--cdr-space-inset-one-x-squish)' },
  { name: '--cdr-button-font-family', defaultValue: 'var(--cdr-font-family-sans)' },
  { name: '--cdr-button-font-weight', defaultValue: '500' },
  { name: '--cdr-button-letter-spacing', defaultValue: '-0.008rem' },
  { name: '--cdr-button-font-size', defaultValue: '1.6rem (size-dependent)' },
  { name: '--cdr-button-line-height', defaultValue: '2.2rem (size-dependent)' },
  { name: '--cdr-button-icon-size', defaultValue: 'var(--cdr-icon-size) (size-dependent)' },
  { name: '--cdr-button-icon-padding', defaultValue: 'var(--cdr-space-one-x) (size-dependent)' },
  { name: '--cdr-button-icon-gap', defaultValue: 'var(--cdr-space-quarter-x)' },
  { name: '--cdr-button-transition-duration', defaultValue: 'var(--cdr-duration-2-x)' },
  { name: '--cdr-button-transition-timing', defaultValue: 'var(--cdr-timing-function-ease)' },
];

const colorVars: VarRow[] = [
  {
    name: '--cdr-button-background',
    defaultValue: 'var(--cdr-color-action-surface-*, legacy fallback)',
    states: ['hover', 'focus-visible', 'active', 'disabled'],
  },
  {
    name: '--cdr-button-text',
    defaultValue: 'var(--cdr-color-action-text-*, legacy fallback)',
    states: ['hover', 'focus-visible', 'active', 'disabled'],
  },
  {
    name: '--cdr-button-border',
    defaultValue: 'var(--cdr-color-action-border-*, legacy fallback)',
    states: ['hover', 'focus-visible', 'active', 'disabled'],
  },
  {
    name: '--cdr-button-fill',
    defaultValue: 'var(--cdr-color-action-icon-*, legacy fallback)',
    states: ['hover', 'focus-visible', 'active', 'disabled'],
    note: 'Controls icon fill color',
  },
  {
    name: '--cdr-button-active-inset',
    defaultValue: 'var(--cdr-color-action-border-*-subtle, legacy fallback)',
    note: 'Inner inset ring drawn only in the active state',
  },
];

const elevationVars: VarRow[] = [
  { name: '--cdr-button-elevation', defaultValue: '0 0 0 0 transparent' },
  { name: '--cdr-button-elevation-hover', defaultValue: 'var(--cdr-prominence-raised)' },
  { name: '--cdr-button-elevation-focus-visible', defaultValue: 'var(--cdr-prominence-raised)' },
  { name: '--cdr-button-elevation-active', defaultValue: '0 0 0 0 transparent' },
];

const linkVars: VarRow[] = [
  {
    name: '--cdr-button-link-text',
    defaultValue: 'var(--cdr-color-action-text-trigger, ...)',
    states: ['hover', 'active'],
  },
  {
    name: '--cdr-button-link-icon',
    defaultValue: 'var(--cdr-color-action-icon-trigger, ...)',
    states: ['hover', 'active'],
  },
];

const iconOnlyVars: VarRow[] = [
  {
    name: '--cdr-button-icon-only-fill',
    defaultValue: 'var(--cdr-color-action-icon-neutral, ...)',
    states: ['disabled'],
  },
  {
    name: '--cdr-button-icon-only-border-focus',
    defaultValue: 'var(--cdr-color-action-border-neutral-subtle, ...)',
  },
];

export const Reference: Story = {
  name: 'Reference',
  render: () => ({
    template: `${docStyles}
      <div class="var-api-page">
        <h2>Layout &amp; typography</h2>
        <p>Set once on <code>.cdr-button</code>; most are also redeclared per size class.</p>
        ${renderTable(['Variable', 'Default', 'Has state variants?'], layoutVars)}

        <h2>Color (per variant, per state)</h2>
        <p>
          Declared by each variant class (<code>--primary</code>, <code>--secondary</code>,
          <code>--dark</code>, <code>--sale</code>). Every color property has a resting value and
          a parallel <code>-hover</code> / <code>-focus-visible</code> / <code>-active</code> /
          <code>-disabled</code> variable; pseudo-class selectors read the suffixed variable and
          fall back to the resting one if it isn't set.
        </p>
        ${renderTable(['Variable', 'Default pattern', 'State suffixes'], colorVars)}

        <h2>Elevation &amp; transition</h2>
        ${renderTable(['Variable', 'Default', 'Has state variants?'], elevationVars)}

        <h2>Link variant extras</h2>
        <p>Used when <code>modifier="link"</code>; independent of the surface/border variables above.</p>
        ${renderTable(['Variable', 'Default pattern', 'State suffixes'], linkVars)}

        <h2>Icon-only variant extras</h2>
        <p>Used when <code>iconOnly</code> is set.</p>
        ${renderTable(['Variable', 'Default pattern', 'State suffixes'], iconOnlyVars)}

        <p>
          Source of truth: <code>src/components/button/CdrButton.tokens.ts</code> (contract) →
          generated <code>styles/CdrButton.tokens.css</code> and
          <code>styles/vars/CdrButton.maps.scss</code>. Run <code>pnpm build:maps</code> after
          editing the contract.
        </p>
      </div>
    `,
  }),
};
