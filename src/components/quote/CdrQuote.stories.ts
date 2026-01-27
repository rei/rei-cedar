import type { Meta, StoryObj } from '@storybook/vue3';
import CdrQuote from './CdrQuote.vue';

const meta = {
  title: 'Components/Quote',
  component: CdrQuote,
  tags: ['autodocs'],
  args: {
    tag: 'blockquote',
    modifier: '',
  },
} satisfies Meta<typeof CdrQuote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    summary: 'The mountains are calling and I must go.',
    citation: 'John Muir',
  },
  render: (args) => ({
    components: { CdrQuote },
    setup() {
      return { args };
    },
    template: `<CdrQuote v-bind="args" />`,
  }),
};

export const Blockquote: Story = {
  args: {
    tag: 'blockquote',
    summary: 'In every walk with nature one receives far more than he seeks.',
    citation: 'John Muir',
  },
  render: (args) => ({
    components: { CdrQuote },
    setup() {
      return { args };
    },
    template: `<CdrQuote v-bind="args" />`,
  }),
};

export const PullQuote: Story = {
  args: {
    modifier: 'pull',
    summary: 'The best view comes after the hardest climb.',
    citation: 'Unknown',
  },
  render: (args) => ({
    components: { CdrQuote },
    setup() {
      return { args };
    },
    template: `
      <div>
        <p style="max-width: 600px; margin-bottom: 24px;">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <CdrQuote v-bind="args" />
        <p style="max-width: 600px; margin-top: 24px;">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
          eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
          in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    `,
  }),
};

export const WithSlotContent: Story = {
  args: {
    citation: 'Henry David Thoreau',
  },
  render: (args) => ({
    components: { CdrQuote },
    setup() {
      return { args };
    },
    template: `
      <CdrQuote v-bind="args">
        I went to the woods because I wished to live deliberately, to front only 
        the essential facts of life, and see if I could not learn what it had to 
        teach, and not, when I came to die, discover that I had not lived.
      </CdrQuote>
    `,
  }),
};

export const NoCitation: Story = {
  args: {
    summary: 'Adventure awaits those who seek it.',
  },
  render: (args) => ({
    components: { CdrQuote },
    setup() {
      return { args };
    },
    template: `<CdrQuote v-bind="args" />`,
  }),
};

export const AsideTag: Story = {
  args: {
    tag: 'aside',
    summary: 'This quote uses an aside element for semantic HTML.',
    citation: 'Example',
  },
  render: (args) => ({
    components: { CdrQuote },
    setup() {
      return { args };
    },
    template: `<CdrQuote v-bind="args" />`,
  }),
};

export const InlineQuote: Story = {
  args: {
    tag: 'q',
    summary: 'Not all who wander are lost',
    citation: 'J.R.R. Tolkien',
  },
  render: (args) => ({
    components: { CdrQuote },
    setup() {
      return { args };
    },
    template: `
      <p style="max-width: 600px;">
        As Tolkien famously wrote, <CdrQuote v-bind="args" />, reminding us 
        that exploration and discovery are valuable pursuits.
      </p>
    `,
  }),
};

export const LongQuote: Story = {
  args: {
    summary:
      'There is a pleasure in the pathless woods, there is a rapture on the lonely shore, there is society where none intrudes, by the deep sea, and music in its roar: I love not man the less, but Nature more.',
    citation: 'Lord Byron',
  },
  render: (args) => ({
    components: { CdrQuote },
    setup() {
      return { args };
    },
    template: `<CdrQuote v-bind="args" />`,
  }),
};

export const MultiParagraphQuote: Story = {
  args: {
    citation: 'Aldo Leopold',
  },
  render: (args) => ({
    components: { CdrQuote },
    setup() {
      return { args };
    },
    template: `
      <CdrQuote v-bind="args">
        <p>We abuse land because we regard it as a commodity belonging to us.</p>
        <p>When we see land as a community to which we belong, we may begin to use it with love and respect.</p>
      </CdrQuote>
    `,
  }),
};
