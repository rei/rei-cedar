import type { Meta, StoryObj } from '@storybook/vue3';
import CdrLabelStandalone from './CdrLabelStandalone.vue';

const meta: Meta<typeof CdrLabelStandalone> = {
  title: 'Components/CdrLabelStandalone',
  component: CdrLabelStandalone,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CdrLabelStandalone>;

export const Default: Story = {
  args: {
    forId: 'example-input-1',
    label: 'Email Address',
  },
  render: (args: any) => ({
    components: { CdrLabelStandalone },
    setup() {
      return { args };
    },
    template: `
      <CdrLabelStandalone v-bind="args">
        <input :id="args.forId" type="email" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
      </CdrLabelStandalone>
    `,
  }),
};

export const Required: Story = {
  args: {
    forId: 'example-input-2',
    label: 'Full Name',
    required: true,
  },
  render: (args: any) => ({
    components: { CdrLabelStandalone },
    setup() {
      return { args };
    },
    template: `
      <CdrLabelStandalone v-bind="args">
        <input :id="args.forId" type="text" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
      </CdrLabelStandalone>
    `,
  }),
};

export const Optional: Story = {
  args: {
    forId: 'example-input-3',
    label: 'Phone Number',
    optional: true,
  },
  render: (args: any) => ({
    components: { CdrLabelStandalone },
    setup() {
      return { args };
    },
    template: `
      <CdrLabelStandalone v-bind="args">
        <input :id="args.forId" type="tel" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
      </CdrLabelStandalone>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    forId: 'example-input-4',
    label: 'Disabled Field',
    disabled: true,
  },
  render: (args: any) => ({
    components: { CdrLabelStandalone },
    setup() {
      return { args };
    },
    template: `
      <CdrLabelStandalone v-bind="args">
        <input :id="args.forId" type="text" disabled style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; background: #f5f5f5;" />
      </CdrLabelStandalone>
    `,
  }),
};

export const HiddenLabel: Story = {
  args: {
    forId: 'example-input-5',
    label: 'Search',
    hideLabel: true,
  },
  render: (args: any) => ({
    components: { CdrLabelStandalone },
    setup() {
      return { args };
    },
    template: `
      <CdrLabelStandalone v-bind="args">
        <input :id="args.forId" type="search" placeholder="Search..." style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
      </CdrLabelStandalone>
    `,
  }),
};

export const WithHelperText: Story = {
  args: {
    forId: 'example-input-6',
    label: 'Username',
  },
  render: (args: any) => ({
    components: { CdrLabelStandalone },
    setup() {
      return { args };
    },
    template: `
      <CdrLabelStandalone v-bind="args">
        <template #helper>
          Must be 3-20 characters
        </template>
        <input :id="args.forId" type="text" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
      </CdrLabelStandalone>
    `,
  }),
};

export const WithInfoText: Story = {
  args: {
    forId: 'example-input-7',
    label: 'Password',
  },
  render: (args: any) => ({
    components: { CdrLabelStandalone },
    setup() {
      return { args };
    },
    template: `
      <CdrLabelStandalone v-bind="args">
        <input :id="args.forId" type="password" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
        <template #info>
          At least 8 characters with a mix of letters and numbers
        </template>
      </CdrLabelStandalone>
    `,
  }),
};

export const WithError: Story = {
  args: {
    forId: 'example-input-8',
    label: 'Email',
    required: true,
  },
  render: (args: any) => ({
    components: { CdrLabelStandalone },
    setup() {
      return { args };
    },
    template: `
      <CdrLabelStandalone v-bind="args">
        <input :id="args.forId" type="email" style="width: 100%; padding: 8px; border: 1px solid #d32f2f; border-radius: 4px;" />
        <template #error>
          <span style="color: #d32f2f;">Please enter a valid email address</span>
        </template>
      </CdrLabelStandalone>
    `,
  }),
};
