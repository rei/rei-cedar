import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, watch } from 'vue';
import CdrSwitch from './CdrSwitch.vue';

const meta: Meta<typeof CdrSwitch> = {
  title: 'Components/Switch',
  component: CdrSwitch,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['medium', 'large'],
      description: 'Sets the size of the switch',
      table: {
        type: { summary: 'medium | large' },
        defaultValue: { summary: 'medium' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { CdrSwitch },
    setup() {
      const { modelValue, ...restArgs } = args;
      const checked = ref(modelValue);
      watch(
        () => args.modelValue,
        (newVal) => {
          checked.value = newVal;
        },
      );
      return { checked, restArgs };
    },
    template: `
      <CdrSwitch v-model="checked" v-bind="restArgs">
        Enable notifications
      </CdrSwitch>
    `,
  }),
  args: {
    modelValue: false,
    size: 'medium',
  },
};

export const Checked: Story = {
  render: (args) => ({
    components: { CdrSwitch },
    setup() {
      const { modelValue, ...restArgs } = args;
      const checked = ref(modelValue);
      watch(
        () => args.modelValue,
        (newVal) => {
          checked.value = newVal;
        },
      );
      return { checked, restArgs };
    },
    template: `
      <CdrSwitch v-model="checked" v-bind="restArgs">
        Feature enabled
      </CdrSwitch>
    `,
  }),
  args: {
    modelValue: true,
    size: 'medium',
  },
};

export const Large: Story = {
  render: (args) => ({
    components: { CdrSwitch },
    setup() {
      const { modelValue, ...restArgs } = args;
      const checked = ref(modelValue);
      watch(
        () => args.modelValue,
        (newVal) => {
          checked.value = newVal;
        },
      );
      return { checked, restArgs };
    },
    template: `
      <CdrSwitch v-model="checked" v-bind="restArgs">
        Large switch option
      </CdrSwitch>
    `,
  }),
  args: {
    modelValue: false,
    size: 'large',
  },
};

export const FullWidth: Story = {
  render: (args) => ({
    components: { CdrSwitch },
    setup() {
      const { modelValue, ...restArgs } = args;
      const checked = ref(modelValue);
      watch(
        () => args.modelValue,
        (newVal) => {
          checked.value = newVal;
        },
      );
      return { checked, restArgs };
    },
    template: `
      <div style="border: 1px dashed #ccc; padding: 16px;">
        <CdrSwitch v-model="checked" v-bind="restArgs">
          Full width switch
        </CdrSwitch>
      </div>
    `,
  }),
  args: {
    modelValue: false,
    fullWidth: true,
  },
};

export const MultipleSettings: Story = {
  render: () => ({
    components: { CdrSwitch },
    setup() {
      const darkMode = ref(false);
      const notifications = ref(true);
      const autoSave = ref(true);
      return { darkMode, notifications, autoSave };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <CdrSwitch v-model="darkMode">
          Dark mode
        </CdrSwitch>
        <CdrSwitch v-model="notifications">
          Push notifications
        </CdrSwitch>
        <CdrSwitch v-model="autoSave">
          Auto-save
        </CdrSwitch>
      </div>
    `,
  }),
};
