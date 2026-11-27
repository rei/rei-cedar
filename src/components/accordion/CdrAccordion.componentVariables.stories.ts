import type { Meta, StoryObj } from '@storybook/vue3';
import CdrAccordion from './CdrAccordion.vue';

/**
 * This is a documentation-only companion to `Components/Accordion`. It documents the
 * `--cdr-color-accordion-*` and `--cdr-accordion-*` CSS custom properties that CdrAccordion
 * exposes, how the cascade resolves a value, and lets you try overrides live.
 */
const meta: Meta<typeof CdrAccordion> = {
  title: 'Components/Accordion/Component variables',
  component: CdrAccordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
};

export default meta;
type Story = StoryObj<typeof CdrAccordion>;
// ─── Shared doc chrome ──────────────────────────────────────────────────────
const docStyles = `
  <style>
    .var-api-page { max-width: 920px; font-family: inherit; }
    .var-api-page h2 { font-size: 20px; margin: 32px 0 12px; }
    .var-api-page h2:first-child { margin-top: 0; }
    .var-api-page p { font-size: 14px; line-height: 1.6; color: #4b4a48; margin: 0 0 12px; }
    .var-api-page ul { font-size: 14px; line-height: 1.6; color: #4b4a48; margin: 0 0 12px; padding-left: 22px; }
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
    .playground-stage { flex: 0 0 auto; display: flex; align-items: center; justify-content: center; min-width: 260px; min-height: 120px; padding: 24px; border-radius: 8px; background: repeating-conic-gradient(#f1f0ed 0% 25%, #fff 0% 50%) 50% / 16px 16px; }
    .playground-stage > * { flex: 1 1 auto; min-width: 200px; }
    .playground-controls { flex: 1 1 260px; display: flex; flex-direction: column; gap: 12px; min-width: 240px; }
    .playground-controls label { font-size: 12px; font-weight: 600; color: #4b4a48; display: flex; flex-direction: column; gap: 4px; }
    .playground-controls input[type='text'], .playground-controls select { font-size: 13px; padding: 6px 8px; border: 1px solid #d7d4ce; border-radius: 4px; font-family: Menlo, Consolas, monospace; }
    .playground-controls .hint { font-weight: 400; font-size: 11px; color: #736e65; }
    .state-toggle { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: #4b4a48; margin: 0 0 12px; }
  </style>
`;

// ─── Overview ───────────────────────────────────────────────────────────────
export const Overview: Story = {
  name: 'Overview',
  render: () => ({
    template: `${docStyles}
      <div class="var-api-page">
        <h2>What the variable API is</h2>
        <p>
          CdrAccordion is styled through two layers of CSS custom properties:
          <code>--cdr-color-accordion-*</code> color override hooks generated from the token
          contract, and <code>--cdr-accordion-*</code> base defaults for layout and typography.
          You can re-theme the component by overriding these variables instead of forking
          <code>CdrAccordion.module.scss</code>.
        </p>
        <p>
          Color hooks follow the pattern
          <code>--cdr-color-accordion[-&lt;scope&gt;]-&lt;role&gt;[-&lt;state&gt;]</code>:
          a role of <code>surface</code> (background), <code>text</code>, <code>border</code>,
          or <code>icon</code> (fill), plus an optional <code>hover</code>,
          <code>focus-visible</code>, <code>active</code>, or <code>disabled</code> state suffix.
          Each one falls back to a Cedar semantic token (two <code>var()</code> levels —
          e.g. <code>var(--cdr-color-accordion-header-text, var(--cdr-control-text-neutral-prominent))</code>).
        </p>

        <h2>Resolution order (lowest → highest precedence)</h2>
        <div class="cascade-list">
          <div><span class="step-num">1</span>Cedar semantic color token — the contract's mapped <code>--cdr-control-*</code> value</div>
          <div><span class="step-num">2</span><code>--cdr-color-accordion-*</code> override hook — set it anywhere up the tree to retint the component</div>
          <div><span class="step-num">3</span><code>--cdr-accordion-*</code> base defaults — layout/typography captured from the contract</div>
          <div><span class="step-num">4</span>Inline style override — anything you set via the <code>style</code> attribute wins over all of the above</div>
        </div>

        <h2>When to use</h2>
        <ul>
          <li>Theming a one-off instance (inline style) or a surface section (wrapper class)</li>
          <li>Prototyping a new variant against the semantic palette</li>
          <li>Fine-tuning a single role (e.g. only the focus border) without forking styles</li>
        </ul>

        <h2>When not to use</h2>
        <ul>
          <li>To restyle across an app — prefer the semantic tokens themselves so every component moves together</li>
          <li>To change layout structure or behavior — these properties only cover documented styling values</li>
          <li>To hardcode brand values per page — that bypasses the token system and drifts out of sync</li>
        </ul>

        <p>
          Source of truth: <code>src/components/accordion/CdrAccordion.tokens.ts</code> (contract) →
          generated <code>styles/vars/CdrAccordion.maps.scss</code> and
          <code>styles/vars/CdrAccordion.hooks.scss</code>. Run <code>pnpm build:maps</code> after
          editing the contract.
        </p>
      </div>
    `,
  }),
};

// ─── Live Playground ──────────────────────────────────────────────────────
export const LivePlayground: Story = {
  name: 'Live Playground',
  render: () => ({
    components: { CdrAccordion },
    data() {
      return {
        headerSurface: '',
        headerText: '',
        headerIcon: '',
        frameBorder: '',
        contentSurface: '',
        contentText: '',
      };
    },
    computed: {
      overrideStyle(): Record<string, string> {
        const style: Record<string, string> = {};
        if (this.headerSurface) style['--cdr-color-accordion-header-surface'] = this.headerSurface;
        if (this.headerText) style['--cdr-color-accordion-header-text'] = this.headerText;
        if (this.headerIcon) style['--cdr-color-accordion-header-icon'] = this.headerIcon;
        if (this.frameBorder) style['--cdr-color-accordion-frame-border'] = this.frameBorder;
        if (this.contentSurface)
          style['--cdr-color-accordion-content-surface'] = this.contentSurface;
        if (this.contentText) style['--cdr-color-accordion-content-text'] = this.contentText;
        return style;
      },
    },
    template: `${docStyles}
      <div class="var-api-page">
        <h2>Try overriding the variable API</h2>
        <p>
          These inputs set <code>--cdr-color-accordion-*</code> and <code>--cdr-accordion-*</code>
          custom properties on a wrapper element — the same mechanism you'd use in app code
          to theme a section or a one-off instance. Leave a field blank to fall back to the
          contract default.
        </p>
        <div class="playground">
          <div class="playground-stage" :style="overrideStyle">
            <CdrAccordion label="Accordion label" :opened="true">
              <p style="margin: 0;">
                Accordion panel content inherits the content hooks — override
                --cdr-color-accordion-content-* to retint it.
              </p>
            </CdrAccordion>
          </div>
          <div class="playground-controls">
            <label>
              --cdr-color-accordion-header-surface
              <input type="text" v-model="headerSurface" placeholder="e.g. #143528 or revert" />
              <span class="hint">header background (all states)</span>
            </label>
            <label>
              --cdr-color-accordion-header-text
              <input type="text" v-model="headerText" placeholder="e.g. #143528 or revert" />
            </label>
            <label>
              --cdr-color-accordion-header-icon
              <input type="text" v-model="headerIcon" placeholder="e.g. #143528 or revert" />
              <span class="hint">chevron fill</span>
            </label>
            <label>
              --cdr-color-accordion-frame-border
              <input type="text" v-model="frameBorder" placeholder="e.g. #143528 or revert" />
              <span class="hint">top/bottom frame rule</span>
            </label>
            <label>
              --cdr-color-accordion-content-surface
              <input type="text" v-model="contentSurface" placeholder="e.g. #143528 or revert" />
            </label>
            <label>
              --cdr-color-accordion-content-text
              <input type="text" v-model="contentText" placeholder="e.g. #143528 or revert" />
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

function renderTable(headers: string[], rows: VarRow[], showStates: boolean): string {
  const cols = showStates ? headers : headers.filter((h) => h !== 'States');
  const headerHtml = cols.map((h) => `<th class="mono">${h}</th>`).join('');
  const rowsHtml = rows
    .map((r) => {
      const states = r.states?.length
        ? r.states.map((s) => `<span class="state-pill">${s}</span>`).join('')
        : '<span class="hint">—</span>';
      const stateCell = showStates ? `<td>${states}</td>` : '';
      return `
        <tr>
          <td class="mono">${r.name}</td>
          <td class="mono">${r.defaultValue}</td>
          ${stateCell}
        </tr>`;
    })
    .join('');
  return `<table class="var-table"><thead><tr>${headerHtml}</tr></thead><tbody>${rowsHtml}</tbody></table>`;
}

const headerVars: VarRow[] = [
  {
    name: '--cdr-color-accordion-header-surface',
    defaultValue: 'var(--cdr-accordion-header-surface) → transparent',
    states: ['hover', 'focus-visible', 'active'],
    note: 'States resolve to control-surface values',
  },
  {
    name: '--cdr-color-accordion-header-text',
    defaultValue: 'var(--cdr-control-text-neutral-prominent)',
    states: ['hover', 'focus-visible', 'active'],
  },
  {
    name: '--cdr-color-accordion-header-icon',
    defaultValue: 'var(--cdr-control-icon-neutral-prominent)',
    states: ['hover', 'focus-visible', 'active'],
    note: 'Chevron fill',
  },
];

const frameVars: VarRow[] = [
  {
    name: '--cdr-color-accordion-frame-border',
    defaultValue: 'var(--cdr-control-border-neutral-faint)',
    note: 'Top and bottom frame rule',
  },
];

const contentVars: VarRow[] = [
  {
    name: '--cdr-color-accordion-content-surface',
    defaultValue: 'var(--cdr-accordion-content-surface) → transparent',
  },
  {
    name: '--cdr-color-accordion-content-text',
    defaultValue: 'var(--cdr-control-text-neutral-prominent)',
  },
];

const defaultVars: VarRow[] = [
  { name: '--cdr-accordion-button-padding', defaultValue: 'cdr-space-inset-one-x' },
  { name: '--cdr-accordion-icon-margin-left', defaultValue: 'cdr-space-one-x' },
  { name: '--cdr-accordion-icon-transition-duration', defaultValue: 'cdr-duration-3-x' },
  {
    name: '--cdr-accordion-content-container-transition-duration',
    defaultValue: 'cdr-duration-3-x',
  },
  { name: '--cdr-accordion-content-padding-top', defaultValue: 'cdr-space-half-x' },
  { name: '--cdr-accordion-content-padding-inline', defaultValue: 'cdr-space-one-x' },
  { name: '--cdr-accordion-content-padding-bottom', defaultValue: 'cdr-space-one-x' },
  {
    name: '--cdr-accordion-compact-button-padding',
    defaultValue: 'cdr-space-inset-three-quarter-x',
  },
  { name: '--cdr-accordion-border-aligned-margin-inline', defaultValue: 'cdr-space-inset-one-x' },
];

export const Reference: Story = {
  name: 'Reference',
  render: () => ({
    data() {
      return { showStates: true };
    },
    template: `${docStyles}
      <div class="var-api-page">
        <label class="state-toggle">
          <input type="checkbox" v-model="showStates" /> Show state variables
        </label>
        <h2>Header (the trigger row)</h2>
        <p>Rest surface stays transparent; <code>hover</code> / <code>focus-visible</code> / <code>active</code> tint it from the control palette.</p>
        <div v-show="showStates">${renderTable(['Variable', 'Resolves to', 'States'], headerVars, true)}</div>
        <div v-show="!showStates">${renderTable(['Variable', 'Resolves to', 'States'], headerVars, false)}</div>
        <h2>Frame</h2>
        <p>The 1px rules above and below the accordion.</p>
        <div v-show="showStates">${renderTable(['Variable', 'Resolves to', 'States'], frameVars, true)}</div>
        <div v-show="!showStates">${renderTable(['Variable', 'Resolves to', 'States'], frameVars, false)}</div>
        <h2>Content panel</h2>
        <p>Plain-content scope — surface stays transparent unless overridden.</p>
        <div v-show="showStates">${renderTable(['Variable', 'Resolves to', 'States'], contentVars, true)}</div>
        <div v-show="!showStates">${renderTable(['Variable', 'Resolves to', 'States'], contentVars, false)}</div>
        <h2>Base defaults</h2>
        <p>Layout and spacing values declared once on <code>.cdr-accordion</code>. Token references compile to literal values.</p>
        <div v-show="showStates">${renderTable(['Variable', 'Resolves to', 'States'], defaultVars, true)}</div>
        <div v-show="!showStates">${renderTable(['Variable', 'Resolves to', 'States'], defaultVars, false)}</div>
        <p>
          Source of truth: <code>src/components/accordion/CdrAccordion.tokens.ts</code> (contract) →
          generated <code>styles/vars/CdrAccordion.maps.scss</code> and
          <code>styles/vars/CdrAccordion.hooks.scss</code>. Run <code>pnpm build:maps</code> after
          editing the contract.
        </p>
      </div>
    `,
  }),
};
