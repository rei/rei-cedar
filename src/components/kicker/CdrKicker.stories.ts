import type { Meta, StoryObj } from '@storybook/vue3';
import { CdrKicker } from '../../lib';

const meta: Meta<typeof CdrKicker> = {
  title: 'Components/CdrKicker',
  component: CdrKicker,
  parameters: {
    docs: {
      description: {
        component:
          'Content building blocks with pre-defined, fluid styles. Used for small text that appears above larger content.',
      },
    },
  },
  argTypes: {
    tag: {
      control: 'select',
      options: ['span', 'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'Sets the HTML tag for the kicker element',
    },
  },
};

export default meta;

type Story = StoryObj<typeof CdrKicker>;

export const Default: Story = {
  args: {
    default: 'Gear Guides',
  },
  render: (args: any) => ({
    components: { CdrKicker },
    setup() {
      return { args };
    },
    template: '<CdrKicker v-bind="args">{{ args.default }}</CdrKicker>',
  }),
};

export const AsHeading: Story = {
  args: {
    tag: 'h3',
    default: 'Product Category',
  },
  render: (args: any) => ({
    components: { CdrKicker },
    setup() {
      return { args };
    },
    template: '<CdrKicker v-bind="args">{{ args.default }}</CdrKicker>',
  }),
};

export const AsParagraph: Story = {
  args: {
    tag: 'p',
    default: 'Supporting Text',
  },
  render: (args: any) => ({
    components: { CdrKicker },
    setup() {
      return { args };
    },
    template: '<CdrKicker v-bind="args">{{ args.default }}</CdrKicker>',
  }),
};

export const AsDiv: Story = {
  args: {
    tag: 'div',
    default: 'Custom Container',
  },
  render: (args: any) => ({
    components: { CdrKicker },
    setup() {
      return { args };
    },
    template: '<CdrKicker v-bind="args">{{ args.default }}</CdrKicker>',
  }),
};

export const LongText: Story = {
  args: {
    default: 'Comprehensive Gear Selection and Expert Advice',
  },
  render: (args: any) => ({
    components: { CdrKicker },
    setup() {
      return { args };
    },
    template: '<CdrKicker v-bind="args">{{ args.default }}</CdrKicker>',
  }),
};

export const ShortText: Story = {
  args: {
    default: 'New',
  },
  render: (args: any) => ({
    components: { CdrKicker },
    setup() {
      return { args };
    },
    template: '<CdrKicker v-bind="args">{{ args.default }}</CdrKicker>',
  }),
};
