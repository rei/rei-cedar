import type { Meta, StoryObj } from '@storybook/vue3';
import { defineComponent, h } from 'vue';

const UsingTokensView = defineComponent({
  name: 'UsingTokensView',
  setup() {
    return () =>
      h('div', {
        class: 'docs-page cdr-doc-content',
        innerHTML: `
          <article>
            <h1>Using Tokens with Cedar Components</h1>
            <p>
              Cedar components expose CSS custom properties (also called CSS variables) that allow you to customize component appearance without forking the component's styles. These custom properties follow the pattern <code>--cdr-*</code> and provide a clean override surface for theming and brand customization.
            </p>

            <h2>What are CSS custom properties?</h2>
            <p>
              CSS custom properties are variables defined in CSS that can be used throughout your stylesheet. Cedar components use them extensively to expose customization points. For example, the button component defines <code>--cdr-button-background</code>, <code>--cdr-button-text</code>, and many other properties that you can override.
            </p>

            <h2>How to override component styles</h2>
            <p>
              There are three levels at which you can override Cedar component custom properties:
            </p>

            <h3>1. Instance-level overrides</h3>
            <p>
              For one-off customizations, use inline styles on the component instance:
            </p>
            <pre><code>&lt;cdr-button style="--cdr-button-background: #0067A0; --cdr-button-text: #ffffff;"&gt;
  Custom Button
&lt;/cdr-button&gt;</code></pre>

            <h3>2. Class-level overrides</h3>
            <p>
              For consistent theming across multiple instances, create a wrapper class:
            </p>
            <pre><code>.my-brand-button {
  --cdr-button-background: #0067A0;
  --cdr-button-text: #ffffff;
  --cdr-button-border: #005588;
}</code></pre>

            <h3>3. Global overrides</h3>
            <p>
              For app-wide theming, override properties in your global stylesheet:
            </p>
            <pre><code>:root {
  --cdr-button-background: #0067A0;
  --cdr-button-text: #ffffff;
}</code></pre>

            <h2>Component-specific custom properties</h2>
            <p>
              Each Cedar component documents its available custom properties. See the component's "Custom properties" story in Storybook for a complete reference. For example, the button component exposes properties for:
            </p>
            <ul>
              <li>Colors (background, text, border, icon fill)</li>
              <li>Layout (padding, radius, font size)</li>
              <li>Typography (font family, font weight, letter spacing)</li>
              <li>Elevation (box shadow for hover/focus states)</li>
            </ul>

            <h2>State-specific overrides</h2>
            <p>
              Many components support state-specific custom properties. For example, the button has separate properties for hover, focus-visible, active, and disabled states:
            </p>
            <pre><code>.my-brand-button {
  --cdr-button-background: #0067A0;
  --cdr-button-background-hover: #005588;
  --cdr-button-background-active: #004466;
}</code></pre>

            <h2>Fallback behavior</h2>
            <p>
              Cedar custom properties use fallback values to ensure components render correctly even if you don't override them. The fallback chain typically looks like:
            </p>
            <pre><code>var(--your-override, var(--cdr-semantic-token, var(--cdr-legacy-token)))</code></pre>
            <p>
              This means your override takes precedence, followed by the semantic token, and finally the legacy token as a last resort.
            </p>

            <h2>Best practices</h2>
            <ul>
              <li>Override at the narrowest scope you need (instance > class > global)</li>
              <li>Use semantic tokens when possible for consistency</li>
              <li>Test your overrides across all component states (hover, focus, active, disabled)</li>
              <li>Document your custom property overrides for your team</li>
              <li>Avoid editing generated Cedar files — use custom properties instead</li>
            </ul>

            <h2>Learn more</h2>
            <p>
              See individual component stories for their specific custom property documentation. The button component's "Custom properties" story provides a live playground for experimenting with overrides.
            </p>
          </article>
        `,
      });
  },
});

const meta: Meta<typeof UsingTokensView> = {
  title: 'Guides/Using Tokens',
  component: UsingTokensView,
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    actions: { disable: true },
  },
};

export default meta;
type Story = StoryObj<typeof UsingTokensView>;

export const Overview: Story = {};
