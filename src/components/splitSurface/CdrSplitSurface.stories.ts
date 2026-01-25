import type { Meta, StoryObj } from '@storybook/vue3';
import CdrSplitSurface from './CdrSplitSurface.vue';

const meta: Meta<typeof CdrSplitSurface> = {
  title: 'Components/SplitSurface',
  component: CdrSplitSurface,
  tags: ['autodocs'],
  argTypes: {
    surface: {
      control: 'select',
      options: ['top', 'bottom'],
      description: 'Sets the orientation of the surface to the top or bottom slot',
    },
    tag: {
      control: 'text',
      description: 'Sets the HTML tag for the split-surface element',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { CdrSplitSurface },
    setup() {
      return { args };
    },
    template: `
      <CdrSplitSurface v-bind="args">
        <template #top>
          <div style="padding: 24px; background: #f0f0f0;">
            <h2>Top Section</h2>
            <p>This is the top content area.</p>
          </div>
        </template>
        <template #bottom>
          <div style="padding: 24px; background: #e0e0e0;">
            <h2>Bottom Section</h2>
            <p>This is the bottom content area.</p>
          </div>
        </template>
      </CdrSplitSurface>
    `,
  }),
  args: {
    surface: 'bottom',
  },
};

export const TopSurface: Story = {
  render: (args) => ({
    components: { CdrSplitSurface },
    setup() {
      return { args };
    },
    template: `
      <CdrSplitSurface v-bind="args">
        <template #top>
          <div style="padding: 32px; background: #4A90E2; color: white;">
            <h2>Featured Content</h2>
            <p>This section has the surface treatment applied.</p>
          </div>
        </template>
        <template #bottom>
          <div style="padding: 32px;">
            <h3>Regular Content</h3>
            <p>This is the standard content area below.</p>
          </div>
        </template>
      </CdrSplitSurface>
    `,
  }),
  args: {
    surface: 'top',
  },
};

export const BottomSurface: Story = {
  render: (args) => ({
    components: { CdrSplitSurface },
    setup() {
      return { args };
    },
    template: `
      <CdrSplitSurface v-bind="args">
        <template #top>
          <div style="padding: 32px;">
            <h3>Regular Content</h3>
            <p>This is the standard content area above.</p>
          </div>
        </template>
        <template #bottom>
          <div style="padding: 32px; background: #50C878; color: white;">
            <h2>Featured Content</h2>
            <p>This section has the surface treatment applied.</p>
          </div>
        </template>
      </CdrSplitSurface>
    `,
  }),
  args: {
    surface: 'bottom',
  },
};

export const AsArticle: Story = {
  render: (args) => ({
    components: { CdrSplitSurface },
    setup() {
      return { args };
    },
    template: `
      <CdrSplitSurface v-bind="args">
        <template #top>
          <div style="padding: 24px; background: #f5f5f5;">
            <h1>Article Title</h1>
            <p>Introduction paragraph</p>
          </div>
        </template>
        <template #bottom>
          <div style="padding: 24px;">
            <p>Article body content goes here...</p>
          </div>
        </template>
      </CdrSplitSurface>
    `,
  }),
  args: {
    surface: 'top',
    tag: 'article',
  },
};
