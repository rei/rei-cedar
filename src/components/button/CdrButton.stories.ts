import type { Meta, StoryObj } from '@storybook/vue3';
import CdrButton from './CdrButton.vue';
import {
  buttonModifierOptions,
  buttonTagOptions,
  buttonTypeOptions,
} from '../../types/componentOptions';

const meta: Meta<typeof CdrButton> = {
  title: 'Components/Button',
  component: CdrButton,
  tags: ['autodocs'],
  args: {
    tag: 'button',
    type: 'button',
    modifier: 'primary',
    size: 'medium',
    fullWidth: false,
    iconOnly: false,
    withBackground: false,
  },
  argTypes: {
    tag: {
      control: 'select',
      options: buttonTagOptions,
      description: 'Renders CdrButton as a button or anchor element',
      table: {
        type: { summary: buttonTagOptions.join(' | ') },
        defaultValue: { summary: 'button' },
      },
    },
    type: {
      control: 'select',
      options: buttonTypeOptions,
      description: 'Sets the button type',
      table: {
        type: { summary: buttonTypeOptions.join(' | ') },
        defaultValue: { summary: 'button' },
      },
    },
    modifier: {
      control: 'select',
      options: buttonModifierOptions,
      description: 'Modifies the style variant for this component',
      table: {
        type: { summary: buttonModifierOptions.join(' | ') },
        defaultValue: { summary: 'primary' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Sets button width to 100%',
      table: {
        type: { summary: 'boolean | string' },
        defaultValue: { summary: 'false' },
      },
    },
    iconOnly: {
      control: 'boolean',
      description: 'Renders an icon-only button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    withBackground: {
      control: 'boolean',
      description: 'Renders an icon-only button with a background color and border',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CdrButton>;

export const Primary: Story = {
  args: {
    modifier: 'primary',
  },
  render: (args: typeof meta.args) => ({
    components: { CdrButton },
    setup() {
      return { args };
    },
    template: '<CdrButton v-bind="args">Add to Cart</CdrButton>',
  }),
};

export const Secondary: Story = {
  args: {
    modifier: 'secondary',
  },
  render: (args: typeof meta.args) => ({
    components: { CdrButton },
    setup() {
      return { args };
    },
    template: '<CdrButton v-bind="args">Save for Later</CdrButton>',
  }),
};

export const Sale: Story = {
  args: {
    modifier: 'sale',
  },
  render: (args: typeof meta.args) => ({
    components: { CdrButton },
    setup() {
      return { args };
    },
    template: '<CdrButton v-bind="args">Shop Sale</CdrButton>',
  }),
};

export const Dark: Story = {
  args: {
    modifier: 'dark',
  },
  render: (args: typeof meta.args) => ({
    components: { CdrButton },
    setup() {
      return { args };
    },
    template: '<CdrButton v-bind="args">Dark Button</CdrButton>',
  }),
};

export const LinkStyle: Story = {
  args: {
    modifier: 'link',
  },
  render: (args: typeof meta.args) => ({
    components: { CdrButton },
    setup() {
      return { args };
    },
    template: '<CdrButton v-bind="args">Link Style Button</CdrButton>',
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { CdrButton },
    template: `
      <div class="story-spacing">
        <CdrButton size="small">Small</CdrButton>
        <CdrButton size="medium">Medium</CdrButton>
        <CdrButton size="large">Large</CdrButton>
      </div>
    `,
  }),
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
  render: (args: typeof meta.args) => ({
    components: { CdrButton },
    setup() {
      return { args };
    },
    template: '<CdrButton v-bind="args">Full Width Button</CdrButton>',
  }),
};

export const AllVariants: Story = {
  render: () => ({
    components: { CdrButton },
    template: `
      <div class="story-spacing story-spacing--vertical">
        <div class="story-spacing">
          <CdrButton modifier="primary">Primary</CdrButton>
          <CdrButton modifier="secondary">Secondary</CdrButton>
          <CdrButton modifier="sale">Sale</CdrButton>
          <CdrButton modifier="link">Link</CdrButton>
          <CdrButton modifier="dark">Dark</CdrButton>
        </div>
      </div>
    `,
  }),
};

export const AsAnchor: Story = {
  args: {
    tag: 'a',
    modifier: 'primary',
  },
  render: (args: typeof meta.args) => ({
    components: { CdrButton },
    setup() {
      return { args };
    },
    template: '<CdrButton v-bind="args" href="#">Button as Link</CdrButton>',
  }),
};
