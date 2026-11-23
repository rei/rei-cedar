import type { Meta, StoryObj } from '@storybook/vue3';
import SassMixinsDemo from './SassMixinsDemo.vue';

const meta: Meta<typeof SassMixinsDemo> = {
  title: 'Guides/Sass Mixins',
  component: SassMixinsDemo,
};

export default meta;
type Story = StoryObj<typeof SassMixinsDemo>;

/**
 * Live output of the four Cedar-owned mixin families. Documentation lives in
 * the accompanying "Sass Mixins" docs entry (same title).
 */
export const Live: Story = {
  render: () => ({
    components: { SassMixinsDemo },
    template: '<SassMixinsDemo />',
  }),
};
