import type { Meta, StoryObj } from '@storybook/vue3';
import CdrLink from './CdrLink.vue';

const meta: Meta<typeof CdrLink> = {
  title: 'Components/Link',
  component: CdrLink,
  tags: ['autodocs'],
  args: {
    tag: 'a',
    href: '#',
    modifier: '',
    inheritColor: false,
  },
};

export default meta;
type Story = StoryObj<typeof CdrLink>;

export const Default: Story = {
  render: (args) => ({
    components: { CdrLink },
    setup() {
      return { args };
    },
    template: '<CdrLink v-bind="args">Default Link</CdrLink>',
  }),
};

export const Standalone: Story = {
  args: {
    modifier: 'standalone',
  },
  render: (args) => ({
    components: { CdrLink },
    setup() {
      return { args };
    },
    template: '<CdrLink v-bind="args">Standalone Link</CdrLink>',
  }),
};

export const InheritColor: Story = {
  args: {
    inheritColor: true,
  },
  render: (args) => ({
    components: { CdrLink },
    setup() {
      return { args };
    },
    template: `
      <p style="color: #b11020;">
        This text is red and the <CdrLink v-bind="args">link inherits the color</CdrLink>.
      </p>
    `,
  }),
};

export const ExternalLink: Story = {
  args: {
    href: 'https://www.rei.com',
    target: '_blank',
  },
  render: (args) => ({
    components: { CdrLink },
    setup() {
      return { args };
    },
    template: '<CdrLink v-bind="args">Visit REI.com (opens in new tab)</CdrLink>',
  }),
};

export const InParagraph: Story = {
  render: () => ({
    components: { CdrLink },
    template: `
      <p>
        Looking for outdoor gear? Check out our
        <CdrLink href="#">camping equipment</CdrLink>,
        <CdrLink href="#">hiking boots</CdrLink>, and
        <CdrLink href="#">backpacks</CdrLink> for your next adventure.
      </p>
    `,
  }),
};

export const AsButton: Story = {
  args: {
    tag: 'button',
  },
  render: (args) => ({
    components: { CdrLink },
    setup() {
      return { args };
    },
    template: '<CdrLink v-bind="args">Link styled as button</CdrLink>',
  }),
};
