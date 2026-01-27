import type { Meta, StoryObj } from '@storybook/vue3';
import CdrSurface from './CdrSurface.vue';

const meta: Meta<typeof CdrSurface> = {
  title: 'Components/Surface',
  component: CdrSurface,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { CdrSurface },
    setup() {
      return { args };
    },
    template: `
      <CdrSurface v-bind="args">
        <div style="padding: 24px;">
          <h2>Surface Content</h2>
          <p>This is content inside a surface container.</p>
        </div>
      </CdrSurface>
    `,
  }),
  args: {
    background: 'primary',
  },
};

export const WithBorder: Story = {
  render: (args) => ({
    components: { CdrSurface },
    setup() {
      return { args };
    },
    template: `
      <CdrSurface v-bind="args">
        <div style="padding: 24px;">
          <h3>Bordered Surface</h3>
          <p>This surface has a border applied.</p>
        </div>
      </CdrSurface>
    `,
  }),
  args: {
    background: 'secondary',
    borderColor: 'primary' as any,
    borderStyle: 'solid',
    borderWidth: 'one-x' as any,
  },
};

export const WithShadow: Story = {
  render: (args) => ({
    components: { CdrSurface },
    setup() {
      return { args };
    },
    template: `
      <CdrSurface v-bind="args">
        <div style="padding: 32px;">
          <h3>Shadowed Surface</h3>
          <p>This surface has a box shadow for depth.</p>
        </div>
      </CdrSurface>
    `,
  }),
  args: {
    background: 'primary',
    boxShadow: 'raised-100' as any,
  },
};

export const RoundedCorners: Story = {
  render: (args) => ({
    components: { CdrSurface },
    setup() {
      return { args };
    },
    template: `
      <CdrSurface v-bind="args">
        <div style="padding: 24px;">
          <h3>Rounded Surface</h3>
          <p>This surface has rounded corners.</p>
        </div>
      </CdrSurface>
    `,
  }),
  args: {
    background: 'secondary',
    borderRadius: 'soft',
  },
};

export const SandstonePalette: Story = {
  render: (args) => ({
    components: { CdrSurface },
    setup() {
      return { args };
    },
    template: `
      <CdrSurface v-bind="args">
        <div style="padding: 24px;">
          <h3>Sandstone Palette</h3>
          <p>This surface uses the sandstone palette.</p>
        </div>
      </CdrSurface>
    `,
  }),
  args: {
    palette: 'sandstone',
  },
};

export const MembershipSubtle: Story = {
  render: (args) => ({
    components: { CdrSurface },
    setup() {
      return { args };
    },
    template: `
      <CdrSurface v-bind="args">
        <div style="padding: 24px;">
          <h3>Membership Subtle</h3>
          <p>This surface uses the membership-subtle palette.</p>
        </div>
      </CdrSurface>
    `,
  }),
  args: {
    palette: 'membership-subtle',
  },
};

export const MembershipVibrant: Story = {
  render: (args) => ({
    components: { CdrSurface },
    setup() {
      return { args };
    },
    template: `
      <CdrSurface v-bind="args">
        <div style="padding: 24px;">
          <h3>Membership Vibrant</h3>
          <p>This surface uses the membership-vibrant palette.</p>
        </div>
      </CdrSurface>
    `,
  }),
  args: {
    palette: 'membership-vibrant',
  },
};

export const AsSection: Story = {
  render: (args) => ({
    components: { CdrSurface },
    setup() {
      return { args };
    },
    template: `
      <CdrSurface v-bind="args">
        <div style="padding: 32px;">
          <h2>Section Title</h2>
          <p>This surface is rendered as a section element.</p>
        </div>
      </CdrSurface>
    `,
  }),
  args: {
    tag: 'section',
    background: 'primary',
    borderRadius: 'soft',
    boxShadow: 'raised-200' as any,
  },
};
