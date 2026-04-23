import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import CdrToast from './CdrToast.vue';
import CdrButton from '../button/CdrButton.vue';
import IconInformationFill from '../icon/comps/information-fill.vue';
import IconCheckFill from '../icon/comps/check-fill.vue';
import IconWarningFill from '../icon/comps/warning-fill.vue';
import IconErrorFill from '../icon/comps/error-fill.vue';
import { statusTypeOptions } from '../../types/other';

const meta: Meta<typeof CdrToast> = {
  title: 'Components/Toast',
  component: CdrToast,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: statusTypeOptions,
      description: 'Sets the toast type',
      table: {
        type: { summary: statusTypeOptions.join(' | ') },
        defaultValue: { summary: 'default' },
      },
    },
    open: {
      control: 'boolean',
      description: 'Used to programmatically control the toast open/close state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    autoDismiss: {
      control: 'boolean',
      description: 'Set to false to disable automatic closing after the dismissDelay',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    dismissDelay: {
      control: 'number',
      description: 'Sets the interval (in milliseconds) before the toast automatically closes',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5000' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: typeof meta.args) => ({
    components: { CdrToast, CdrButton },
    setup() {
      const isOpen = ref(false);
      const showToast = () => {
        isOpen.value = true;
      };
      return { args, isOpen, showToast };
    },
    template: `
      <div>
        <CdrButton @click="showToast">Show Toast</CdrButton>
        <CdrToast v-bind="args" :open="isOpen" @closed="isOpen = false">
          This is a default toast message
        </CdrToast>
      </div>
    `,
  }),
  args: {
    type: 'default',
  },
};

export const Info: Story = {
  render: (args: typeof meta.args) => ({
    components: { CdrToast, CdrButton, IconInformationFill },
    setup() {
      const isOpen = ref(false);
      const showToast = () => {
        isOpen.value = true;
      };
      return { args, isOpen, showToast };
    },
    template: `
      <div>
        <CdrButton @click="showToast">Show Info Toast</CdrButton>
        <CdrToast v-bind="args" :open="isOpen" @closed="isOpen = false">
          <template #icon-left>
            <IconInformationFill />
          </template>
          Your information has been saved
        </CdrToast>
      </div>
    `,
  }),
  args: {
    type: 'info',
  },
};

export const Success: Story = {
  render: (args: typeof meta.args) => ({
    components: { CdrToast, CdrButton, IconCheckFill },
    setup() {
      const isOpen = ref(false);
      const showToast = () => {
        isOpen.value = true;
      };
      return { args, isOpen, showToast };
    },
    template: `
      <div>
        <CdrButton @click="showToast">Show Success Toast</CdrButton>
        <CdrToast v-bind="args" :open="isOpen" @closed="isOpen = false">
          <template #icon-left>
            <IconCheckFill />
          </template>
          Action completed successfully!
        </CdrToast>
      </div>
    `,
  }),
  args: {
    type: 'success',
  },
};

export const Warning: Story = {
  render: (args: typeof meta.args) => ({
    components: { CdrToast, CdrButton, IconWarningFill },
    setup() {
      const isOpen = ref(false);
      const showToast = () => {
        isOpen.value = true;
      };
      return { args, isOpen, showToast };
    },
    template: `
      <div>
        <CdrButton @click="showToast">Show Warning Toast</CdrButton>
        <CdrToast v-bind="args" :open="isOpen" @closed="isOpen = false">
          <template #icon-left>
            <IconWarningFill />
          </template>
          Please review your input before continuing
        </CdrToast>
      </div>
    `,
  }),
  args: {
    type: 'warning',
  },
};

export const Error: Story = {
  render: (args: typeof meta.args) => ({
    components: { CdrToast, CdrButton, IconErrorFill },
    setup() {
      const isOpen = ref(false);
      const showToast = () => {
        isOpen.value = true;
      };
      return { args, isOpen, showToast };
    },
    template: `
      <div>
        <CdrButton @click="showToast">Show Error Toast</CdrButton>
        <CdrToast v-bind="args" :open="isOpen" @closed="isOpen = false">
          <template #icon-left>
            <IconErrorFill />
          </template>
          An error occurred while processing your request
        </CdrToast>
      </div>
    `,
  }),
  args: {
    type: 'error',
  },
};

export const NoAutoDismiss: Story = {
  render: (args: typeof meta.args) => ({
    components: { CdrToast, CdrButton },
    setup() {
      const isOpen = ref(false);
      const showToast = () => {
        isOpen.value = true;
      };
      return { args, isOpen, showToast };
    },
    template: `
      <div>
        <CdrButton @click="showToast">Show Persistent Toast</CdrButton>
        <CdrToast v-bind="args" :open="isOpen" @closed="isOpen = false">
          This toast will not auto-dismiss. Click the X to close.
        </CdrToast>
      </div>
    `,
  }),
  args: {
    autoDismiss: false,
  },
};

export const CustomDelay: Story = {
  render: (args: typeof meta.args) => ({
    components: { CdrToast, CdrButton },
    setup() {
      const isOpen = ref(false);
      const showToast = () => {
        isOpen.value = true;
      };
      return { args, isOpen, showToast };
    },
    template: `
      <div>
        <CdrButton @click="showToast">Show Toast (10s delay)</CdrButton>
        <CdrToast v-bind="args" :open="isOpen" @closed="isOpen = false">
          This toast will stay visible for 10 seconds
        </CdrToast>
      </div>
    `,
  }),
  args: {
    dismissDelay: 10000,
  },
};
