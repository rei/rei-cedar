import type { Meta, StoryObj } from '@storybook/vue3';
import CdrSurfaceNavigation from './CdrSurfaceNavigation.vue';

const meta: Meta<typeof CdrSurfaceNavigation> = {
  title: 'Components/SurfaceNavigation',
  component: CdrSurfaceNavigation,
  tags: ['autodocs'],
  argTypes: {
    background: {
      control: 'text',
      description: "Adds in a background color based on the current palette's tokens",
    },
    borderColor: {
      control: 'text',
      description: 'Specifies a border color based on the token options within Cedar',
    },
    borderStyle: {
      control: 'text',
      description: 'Specifies a border style based on the token options within Cedar',
    },
    borderWidth: {
      control: 'text',
      description: 'Specifies a border width based on the token options within Cedar',
    },
    borderRadius: {
      control: 'text',
      description: 'Adds in a border radius based on the token options within Cedar',
    },
    boxShadow: {
      control: 'text',
      description: 'Adds a shadow based on the token options within Cedar',
    },
    tag: {
      control: 'text',
      description: 'Determines which HTML tag to use',
    },
    palette: {
      control: 'select',
      options: ['default', 'sandstone', 'membership-subtle', 'membership-vibrant'],
      description: "Defines a palette for the component's style variations",
    },
  },
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
    borderColor: 'primary' as any,
    borderStyle: 'solid',
    borderWidth: 'one-x' as any,
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
    boxShadow: 'raised-200' as any,
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
