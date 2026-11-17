import type { Meta, StoryObj } from '@storybook/vue3';
import { defineComponent, h } from 'vue';

const ComponentTokenContractsView = defineComponent({
  name: 'ComponentTokenContractsView',
  setup() {
    return () =>
      h('div', {
        class: 'docs-page cdr-doc-content',
        innerHTML: `
          <article>
            <h1>Component Token Contracts</h1>
            <p>
              Cedar components use a token contract system to define their styling in a structured, maintainable way. This system separates the design contract from the implementation, making it easier to migrate to new token systems and maintain consistency across components.
            </p>

            <h2>What is a token contract?</h2>
            <p>
              A token contract is a TypeScript file that declares all the styling values a component uses. For example, the button contract (<code>CdrButton.tokens.ts</code>) defines colors, spacing, typography, and other properties for each variant (primary, secondary, dark, sale) and state (resting, hover, focus, active, disabled).
            </p>

            <h2>Why use contracts?</h2>
            <ul>
              <li><strong>Single source of truth:</strong> All component styling values are defined in one place</li>
              <li><strong>Type safety:</strong> TypeScript ensures contract values are used correctly</li>
              <li><strong>Documentation:</strong> Contracts serve as living documentation of component styling</li>
              <li><strong>Migration path:</strong> Contracts make it easier to migrate between token systems</li>
              <li><strong>Consistency:</strong> Ensures all components follow the same patterns</li>
            </ul>

            <h2>Contract structure</h2>
            <p>
              A typical component contract includes:
            </p>
            <ul>
              <li><strong>Variants:</strong> Different visual styles (e.g., primary, secondary buttons)</li>
              <li><strong>Roles:</strong> Styling categories (e.g., background, text, border)</li>
              <li><strong>States:</strong> Interactive states (e.g., hover, focus, active, disabled)</li>
              <li><strong>Size modifiers:</strong> Responsive sizing (e.g., small, medium, large)</li>
            </ul>

            <h2>How contracts are used</h2>
            <p>
              The contract system generates several files from the contract definition:
            </p>
            <ul>
              <li><strong>Runtime maps:</strong> Sass maps used by the component's stylesheets</li>
              <li><strong>Public hooks:</strong> CSS custom properties that consumers can override</li>
              <li><strong>Token CSS:</strong> Flat CSS for documentation and testing</li>
            </ul>

            <h2>Consumer-facing custom properties</h2>
            <p>
              Contracts generate public CSS custom properties (hooks) that consumers can use to override component styling. These hooks follow the pattern <code>--cdr-component-property</code> and are documented in each component's "Custom properties" story.
            </p>
            <p>
              For example, the button contract generates hooks like:
            </p>
            <pre><code>--cdr-button-background
--cdr-button-text
--cdr-button-border
--cdr-button-background-hover
--cdr-button-text-hover
--cdr-button-border-hover</code></pre>

            <h2>Contract migration</h2>
            <p>
              Cedar is migrating components to use semantic token contracts. The button component is the reference implementation. See <code>docs/button-semantic-implementation.md</code> for details on the migration pattern.
            </p>

            <h2>For component developers</h2>
            <p>
              If you're developing Cedar components, follow these steps when working with contracts:
            </p>
            <ol>
              <li>Edit the contract file (<code>CdrComponent.tokens.ts</code>) to define styling values</li>
              <li>Run <code>pnpm build:maps</code> to generate runtime maps and hooks</li>
              <li>Run <code>pnpm lint</code> and <code>pnpm unit</code> to verify changes</li>
              <li>Review the component in Storybook to confirm visual changes</li>
              <li>Check generated public hooks in <code>CdrComponent.hooks.scss</code></li>
            </ol>

            <h2>Learn more</h2>
            <ul>
              <li>See <code>docs/button-semantic-implementation.md</code> for the reference implementation</li>
              <li>See <code>docs/component-variables.md</code> for the component variables build process</li>
              <li>See individual component "Custom properties" stories for hook documentation</li>
            </ul>
          </article>
        `,
      });
  },
});

const meta: Meta<typeof ComponentTokenContractsView> = {
  title: 'Guides/Component Token Contracts',
  component: ComponentTokenContractsView,
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    actions: { disable: true },
  },
};

export default meta;
type Story = StoryObj<typeof ComponentTokenContractsView>;

export const Overview: Story = {};
