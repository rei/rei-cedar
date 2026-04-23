import type { Meta, StoryObj } from '@storybook/vue3';
import CdrList from './CdrList.vue';
import CdrLink from '../link/CdrLink.vue';
import { listTagOptions } from '../../types/other';

const meta = {
  title: 'Components/List',
  component: CdrList,
  tags: ['autodocs'],
  args: {
    tag: 'ul',
  },
  argTypes: {
    tag: {
      control: 'select',
      options: listTagOptions,
      description: 'Sets the HTML list element used to render the component',
      table: {
        type: { summary: listTagOptions.join(' | ') },
        defaultValue: { summary: 'ul' },
      },
    },
  },
} satisfies Meta<typeof CdrList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unordered: Story = {
  args: {
    modifier: 'unordered',
  },
  render: (args) => ({
    components: { CdrList, CdrLink },
    setup() {
      return { args };
    },
    template: `
      <CdrList v-bind="args">
        <li>Default list item 1</li>
        <li>Default list item 2</li>
        <li>
          Default list item 3
          <CdrList modifier="unordered">
            <li>Nested list item 1</li>
            <li>Nested list item 2</li>
          </CdrList>
        </li>
      </CdrList>
    `,
  }),
};

export const Ordered: Story = {
  args: {
    tag: 'ol',
    modifier: 'ordered',
  },
  render: (args) => ({
    components: { CdrList },
    setup() {
      return { args };
    },
    template: `
      <CdrList v-bind="args">
        <li>Ordered list item 1</li>
        <li>Ordered list item 2</li>
        <li>Ordered list item 3</li>
        <li>Ordered list item 4</li>
      </CdrList>
    `,
  }),
};

export const Compact: Story = {
  args: {
    modifier: 'unordered compact',
  },
  render: (args) => ({
    components: { CdrList, CdrLink },
    setup() {
      return { args };
    },
    template: `
      <CdrList v-bind="args">
        <li><CdrLink href="https://www.rei.com/">REI.com</CdrLink></li>
        <li><CdrLink href="https://www.rei.com/h/adventure-projects">Adventure Projects</CdrLink></li>
        <li><CdrLink href="https://www.rei.com/stewardship">Stewardship</CdrLink></li>
      </CdrList>
    `,
  }),
};

export const Inline: Story = {
  args: {
    modifier: 'unordered inline',
  },
  render: (args) => ({
    components: { CdrList, CdrLink },
    setup() {
      return { args };
    },
    template: `
      <CdrList v-bind="args">
        <li><CdrLink href="#">Inline item 1</CdrLink></li>
        <li><CdrLink href="#">Inline item 2</CdrLink></li>
        <li><CdrLink href="#">Inline item 3</CdrLink></li>
      </CdrList>
    `,
  }),
};

export const Bare: Story = {
  args: {},
  render: (args) => ({
    components: { CdrList },
    setup() {
      return { args };
    },
    template: `
      <CdrList v-bind="args">
        <li>Bare list item 1</li>
        <li>Bare list item 2</li>
        <li>Bare list item 3</li>
      </CdrList>
    `,
  }),
};

export const NestedLists: Story = {
  args: {
    tag: 'ol',
    modifier: 'ordered',
  },
  render: (args) => ({
    components: { CdrList },
    setup() {
      return { args };
    },
    template: `
      <CdrList v-bind="args">
        <li>
          Ordered list item 1
          <CdrList tag="ol" modifier="ordered">
            <li>Nested ordered item 1</li>
            <li>Nested ordered item 2</li>
          </CdrList>
        </li>
        <li>Ordered list item 2</li>
        <li>Ordered list item 3</li>
      </CdrList>
    `,
  }),
};
