import type { Meta, StoryObj } from '@storybook/vue3';
import CdrSelect from './CdrSelect.vue';

/**
 * This is a documentation-only companion to `Components/Select`. It documents the
 * `--cdr-color-select-*` and `--cdr-select-*` CSS custom properties that CdrSelect
 * exposes, how the cascade resolves a value, and lets you try overrides live.
 */
const meta: Meta<typeof CdrSelect> = {
  title: 'Components/Select/Component variables',
  component: CdrSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
};

export default meta;
type Story = StoryObj<typeof CdrSelect>;
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
          CdrSelect is styled through two layers of CSS custom properties:
          <code>--cdr-color-select-*</code> color override hooks generated from the token
          contract, and <code>--cdr-select-*</code> base defaults for layout and typography.
          You can re-theme the component by overriding these variables instead of forking
          <code>CdrSelect.module.scss</code>.
        </p>
        <p>
          Color hooks follow the pattern
          <code>--cdr-color-select[-&lt;scope&gt;]-&lt;role&gt;[-&lt;state&gt;]</code>:
          a role of <code>surface</code> (background), <code>text</code>, <code>border</code>,
          or <code>icon</code> (fill), plus an optional <code>hover</code>,
          <code>focus-visible</code>, <code>active</code>, or <code>disabled</code> state suffix.
          Each one falls back to a Cedar semantic token (two <code>var()</code> levels —
          e.g. <code>var(--cdr-color-select-border-focus-visible, var(--cdr-control-border-neutral-intense))</code>).
        </p>

        <h2>Resolution order (lowest → highest precedence)</h2>
        <div class="cascade-list">
          <div><span class="step-num">1</span>Cedar semantic color token — the contract's mapped <code>--cdr-control-*</code> value</div>
          <div><span class="step-num">2</span><code>--cdr-color-select-*</code> override hook — set it anywhere up the tree to retint the component</div>
          <div><span class="step-num">3</span><code>--cdr-select-*</code> base defaults — layout/typography captured from the contract</div>
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
          Source of truth: <code>src/components/select/CdrSelect.tokens.ts</code> (contract) →
          generated <code>styles/vars/CdrSelect.maps.scss</code> and
          <code>styles/vars/CdrSelect.hooks.scss</code>. Run <code>pnpm build:maps</code> after
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
    components: { CdrSelect },
    data() {
      return {
        selected: '',
        opts: ['Small', 'Medium', 'Large'],
        surface: '',
        text: '',
        border: '',
        caretIcon: '',
        errorSurface: '',
        radius: '',
      };
    },
    computed: {
      overrideStyle(): Record<string, string> {
        const style: Record<string, string> = {};
        if (this.surface) style['--cdr-color-select-surface'] = this.surface;
        if (this.text) style['--cdr-color-select-text'] = this.text;
        if (this.border) style['--cdr-color-select-border'] = this.border;
        if (this.caretIcon) style['--cdr-color-select-caret-icon'] = this.caretIcon;
        if (this.errorSurface) style['--cdr-color-select-error-surface'] = this.errorSurface;
        if (this.radius) style['--cdr-select-radius'] = this.radius;
        return style;
      },
    },
    template: `${docStyles}
      <div class="var-api-page">
        <h2>Try overriding the variable API</h2>
        <p>
          These inputs set <code>--cdr-color-select-*</code> and <code>--cdr-select-*</code>
          custom properties on a wrapper element — the same mechanism you'd use in app code
          to theme a section or a one-off instance. Leave a field blank to fall back to the
          contract default.
        </p>
        <div class="playground">
          <div class="playground-stage" :style="overrideStyle">
            <CdrSelect v-model="selected" label="Size" prompt="Pick a size" :options="opts" />
          </div>
          <div class="playground-controls">
            <label>
              --cdr-color-select-surface
              <input type="text" v-model="surface" placeholder="e.g. #143528 or revert" />
              <span class="hint">field background</span>
            </label>
            <label>
              --cdr-color-select-text
              <input type="text" v-model="text" placeholder="e.g. #143528 or revert" />
            </label>
            <label>
              --cdr-color-select-border
              <input type="text" v-model="border" placeholder="e.g. #143528 or revert" />
              <span class="hint">rendered as the inset box-shadow</span>
            </label>
            <label>
              --cdr-color-select-caret-icon
              <input type="text" v-model="caretIcon" placeholder="e.g. #143528 or revert" />
              <span class="hint">dropdown caret fill</span>
            </label>
            <label>
              --cdr-color-select-error-surface
              <input type="text" v-model="errorSurface" placeholder="e.g. #143528 or revert" />
              <span class="hint">only visible on --error variant</span>
            </label>
            <label>
              --cdr-select-radius
              <input type="text" v-model="radius" placeholder="e.g. #143528 or revert" />
              <span class="hint">a base default, not a color hook</span>
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

const defaultVars: VarRow[] = [
  {
    name: '--cdr-color-select-surface',
    defaultValue: 'var(--cdr-control-surface-neutral-faint)',
    states: ['focus-visible', 'disabled'],
  },
  {
    name: '--cdr-color-select-text',
    defaultValue: 'var(--cdr-control-text-neutral-bold)',
    states: ['disabled'],
  },
  {
    name: '--cdr-color-select-border',
    defaultValue: 'var(--cdr-control-border-neutral)',
    states: ['focus-visible', 'disabled'],
    note: 'Rendered as an inset box-shadow ring',
  },
];

const variantVars: VarRow[] = [
  {
    name: '--cdr-color-select-secondary-surface',
    defaultValue: 'var(--cdr-control-surface-neutral-trace)',
    states: ['focus-visible'],
    note: 'Used by --secondary variant',
  },
  {
    name: '--cdr-color-select-error-surface',
    defaultValue: 'var(--cdr-feedback-surface-error-trace)',
    note: 'Used by --error variant',
  },
  {
    name: '--cdr-color-select-error-border',
    defaultValue: 'var(--cdr-feedback-border-error)',
    note: 'Used by --error variant',
  },
];

const partVars: VarRow[] = [
  {
    name: '--cdr-color-select-prompt-text',
    defaultValue: 'var(--cdr-control-text-neutral-prominent)',
    states: ['disabled'],
    note: 'The placeholder option',
  },
  {
    name: '--cdr-color-select-caret-icon',
    defaultValue: 'var(--cdr-control-icon-neutral-intense)',
    states: ['disabled'],
    note: 'The dropdown caret',
  },
];

const layoutVars: VarRow[] = [
  { name: '--cdr-select-radius', defaultValue: 'cdr-radius-softer' },
  { name: '--cdr-select-height', defaultValue: '4rem' },
  { name: '--cdr-select-large-height', defaultValue: '4.8rem' },
  { name: '--cdr-select-padding-left', defaultValue: 'cdr-space-half-x' },
  { name: '--cdr-select-padding-right', defaultValue: 'cdr-space-two-x' },
  { name: '--cdr-select-icon-offset', defaultValue: 'cdr-space-half-x' },
  { name: '--cdr-select-multiple-padding', defaultValue: 'cdr-space-half-x' },
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
        <h2>Field colors (default variant)</h2>
        <p>The <code>default</code> scope omits its scope segment — these are the shortest hook names.</p>
        <div v-show="showStates">${renderTable(['Variable', 'Resolves to', 'States'], defaultVars, true)}</div>
        <div v-show="!showStates">${renderTable(['Variable', 'Resolves to', 'States'], defaultVars, false)}</div>
        <h2>Variant scopes</h2>
        <p>Secondary and error states keep their scope segment.</p>
        <div v-show="showStates">${renderTable(['Variable', 'Resolves to', 'States'], variantVars, true)}</div>
        <div v-show="!showStates">${renderTable(['Variable', 'Resolves to', 'States'], variantVars, false)}</div>
        <h2>Part scopes</h2>
        <p>Prompt text and caret icon.</p>
        <div v-show="showStates">${renderTable(['Variable', 'Resolves to', 'States'], partVars, true)}</div>
        <div v-show="!showStates">${renderTable(['Variable', 'Resolves to', 'States'], partVars, false)}</div>
        <h2>Base defaults</h2>
        <p>Layout values declared once on <code>.cdr-select</code>. Token references compile to literal values.</p>
        <div v-show="showStates">${renderTable(['Variable', 'Resolves to', 'States'], layoutVars, true)}</div>
        <div v-show="!showStates">${renderTable(['Variable', 'Resolves to', 'States'], layoutVars, false)}</div>
        <p>
          Source of truth: <code>src/components/select/CdrSelect.tokens.ts</code> (contract) →
          generated <code>styles/vars/CdrSelect.maps.scss</code> and
          <code>styles/vars/CdrSelect.hooks.scss</code>. Run <code>pnpm build:maps</code> after
          editing the contract.
        </p>
      </div>
    `,
  }),
};
