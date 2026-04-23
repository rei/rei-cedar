import type { Meta, StoryObj } from '@storybook/vue3';
import CdrSurfaceNavigation from './CdrSurfaceNavigation.vue';

const meta: Meta<typeof CdrSurfaceNavigation> = {
  title: 'Components/SurfaceNavigation',
  component: CdrSurfaceNavigation,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { CdrSurfaceNavigation },
    setup() {
      return { args };
    },
    template: `
      <CdrSurfaceNavigation v-bind="args">
        <nav style="padding: 16px;">
          <ul style="display: flex; gap: 24px; list-style: none; margin: 0; padding: 0;">
            <li><a href="#">Home</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </CdrSurfaceNavigation>
    `,
  }),
  args: {
    background: 'primary',
  },
};

export const WithBorder: Story = {
  render: (args) => ({
    components: { CdrSurfaceNavigation },
    setup() {
      return { args };
    },
    template: `
      <CdrSurfaceNavigation v-bind="args">
        <nav style="padding: 16px;">
          <ul style="display: flex; gap: 24px; list-style: none; margin: 0; padding: 0;">
            <li><a href="#">Shop</a></li>
            <li><a href="#">Classes</a></li>
            <li><a href="#">Experiences</a></li>
          </ul>
        </nav>
      </CdrSurfaceNavigation>
    `,
  }),
  args: {
    background: 'secondary',
    borderColor: 'primary',
    borderStyle: 'solid',
    borderWidth: 'one-x',
  },
};

export const WithShadow: Story = {
  render: (args) => ({
    components: { CdrSurfaceNavigation },
    setup() {
      return { args };
    },
    template: `
      <CdrSurfaceNavigation v-bind="args">
        <nav style="padding: 20px;">
          <ul style="display: flex; gap: 32px; list-style: none; margin: 0; padding: 0;">
            <li><a href="#">Camping</a></li>
            <li><a href="#">Hiking</a></li>
            <li><a href="#">Climbing</a></li>
            <li><a href="#">Cycling</a></li>
          </ul>
        </nav>
      </CdrSurfaceNavigation>
    `,
  }),
  args: {
    background: 'primary',
    boxShadow: 'elevated',
  },
};

export const AsNav: Story = {
  render: (args) => ({
    components: { CdrSurfaceNavigation },
    setup() {
      return { args };
    },
    template: `
      <CdrSurfaceNavigation v-bind="args">
        <ul style="display: flex; gap: 24px; list-style: none; margin: 0; padding: 16px;">
          <li><a href="#">Main</a></li>
          <li><a href="#">Categories</a></li>
          <li><a href="#">Deals</a></li>
        </ul>
      </CdrSurfaceNavigation>
    `,
  }),
  args: {
    tag: 'nav',
    background: 'primary',
  },
};
