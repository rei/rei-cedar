import type { Meta, StoryObj } from '@storybook/vue3';
import CdrTitle from './CdrTitle.vue';

const meta: Meta<typeof CdrTitle> = {
  title: 'Components/Title',
  component: CdrTitle,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { CdrTitle },
    setup() {
      return { args };
    },
    template: `
      <CdrTitle v-bind="args">
        This is a Title Component
      </CdrTitle>
    `,
  }),
  args: {
    tag: 'h1',
  },
};

export const H1: Story = {
  render: (args) => ({
    components: { CdrTitle },
    setup() {
      return { args };
    },
    template: `
      <CdrTitle v-bind="args">
        Main Page Title (H1)
      </CdrTitle>
    `,
  }),
  args: {
    tag: 'h1',
  },
};

export const H2: Story = {
  render: (args) => ({
    components: { CdrTitle },
    setup() {
      return { args };
    },
    template: `
      <CdrTitle v-bind="args">
        Section Title (H2)
      </CdrTitle>
    `,
  }),
  args: {
    tag: 'h2',
  },
};

export const H3: Story = {
  render: (args) => ({
    components: { CdrTitle },
    setup() {
      return { args };
    },
    template: `
      <CdrTitle v-bind="args">
        Subsection Title (H3)
      </CdrTitle>
    `,
  }),
  args: {
    tag: 'h3',
  },
};

export const H4: Story = {
  render: (args) => ({
    components: { CdrTitle },
    setup() {
      return { args };
    },
    template: `
      <CdrTitle v-bind="args">
        Minor Heading (H4)
      </CdrTitle>
    `,
  }),
  args: {
    tag: 'h4',
  },
};

export const AllHeadingLevels: Story = {
  render: () => ({
    components: { CdrTitle },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <CdrTitle tag="h1">Heading Level 1</CdrTitle>
        <CdrTitle tag="h2">Heading Level 2</CdrTitle>
        <CdrTitle tag="h3">Heading Level 3</CdrTitle>
        <CdrTitle tag="h4">Heading Level 4</CdrTitle>
        <CdrTitle tag="h5">Heading Level 5</CdrTitle>
        <CdrTitle tag="h6">Heading Level 6</CdrTitle>
      </div>
    `,
  }),
};

export const WithContent: Story = {
  render: (args) => ({
    components: { CdrTitle },
    setup() {
      return { args };
    },
    template: `
      <div>
        <CdrTitle v-bind="args">
          Outdoor Adventure Guide
        </CdrTitle>
        <p style="margin-top: 16px;">
          This is some body text that follows the title. The CdrTitle component
          provides consistent, fluid heading styles across your application.
        </p>
      </div>
    `,
  }),
  args: {
    tag: 'h1',
  },
};

export const MultipleHeadings: Story = {
  render: () => ({
    components: { CdrTitle },
    template: `
      <div>
        <CdrTitle tag="h1">Main Article Title</CdrTitle>
        <p style="margin: 16px 0;">Introduction paragraph with some context.</p>
        
        <CdrTitle tag="h2">First Section</CdrTitle>
        <p style="margin: 16px 0;">Content for the first section.</p>
        
        <CdrTitle tag="h3">Subsection A</CdrTitle>
        <p style="margin: 16px 0;">Detailed content for subsection A.</p>
        
        <CdrTitle tag="h3">Subsection B</CdrTitle>
        <p style="margin: 16px 0;">Detailed content for subsection B.</p>
        
        <CdrTitle tag="h2">Second Section</CdrTitle>
        <p style="margin: 16px 0;">Content for the second section.</p>
      </div>
    `,
  }),
};
