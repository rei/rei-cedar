import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import CdrSurfaceSelection from './CdrSurfaceSelection.vue';

const meta: Meta<typeof CdrSurfaceSelection> = {
  title: 'Components/SurfaceSelection',
  component: CdrSurfaceSelection,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { CdrSurfaceSelection },
    setup() {
      return { args };
    },
    template: `
      <CdrSurfaceSelection v-bind="args">
        <div style="padding: 24px;">
          <h3>Selection Option</h3>
          <p>Click to select this option</p>
        </div>
      </CdrSurfaceSelection>
    `,
  }),
  args: {
    checked: false,
    role: 'checkbox',
  },
};

export const Checked: Story = {
  render: (args) => ({
    components: { CdrSurfaceSelection },
    setup() {
      return { args };
    },
    template: `
      <CdrSurfaceSelection v-bind="args">
        <div style="padding: 24px;">
          <h3>Selected Option</h3>
          <p>This option is currently selected</p>
        </div>
      </CdrSurfaceSelection>
    `,
  }),
  args: {
    checked: true,
    role: 'checkbox',
  },
};

export const Disabled: Story = {
  render: (args) => ({
    components: { CdrSurfaceSelection },
    setup() {
      return { args };
    },
    template: `
      <CdrSurfaceSelection v-bind="args">
        <div style="padding: 24px;">
          <h3>Disabled Option</h3>
          <p>This option cannot be selected</p>
        </div>
      </CdrSurfaceSelection>
    `,
  }),
  args: {
    disabled: true,
    role: 'checkbox',
  },
};

export const Loading: Story = {
  render: (args) => ({
    components: { CdrSurfaceSelection },
    setup() {
      return { args };
    },
    template: `
      <CdrSurfaceSelection v-bind="args">
        <div style="padding: 24px;">
          <h3>Loading Option</h3>
          <p>This option is currently loading</p>
        </div>
      </CdrSurfaceSelection>
    `,
  }),
  args: {
    loading: true,
    role: 'checkbox',
  },
};

export const RadioButton: Story = {
  render: (args) => ({
    components: { CdrSurfaceSelection },
    setup() {
      return { args };
    },
    template: `
      <CdrSurfaceSelection v-bind="args">
        <div style="padding: 20px;">
          <h4>Radio Option</h4>
          <p>One of several mutually exclusive options</p>
        </div>
      </CdrSurfaceSelection>
    `,
  }),
  args: {
    role: 'radio',
    checked: false,
  },
};

export const InteractiveGroup: Story = {
  render: () => ({
    components: { CdrSurfaceSelection },
    setup() {
      const selected = ref<number | null>(null);
      return { selected };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <CdrSurfaceSelection
          v-for="i in 3"
          :key="i"
          :checked="selected === i"
          role="radio"
          @click="selected = i"
          style="cursor: pointer;"
        >
          <div style="padding: 20px;">
            <h4>Option {{ i }}</h4>
            <p>{{ selected === i ? 'Selected' : 'Click to select' }}</p>
          </div>
        </CdrSurfaceSelection>
      </div>
    `,
  }),
};
