import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import CdrSelect from './CdrSelect.vue';

const meta: Meta<typeof CdrSelect> = {
  title: 'Components/Select',
  component: CdrSelect,
  tags: ['autodocs'],
  args: {
    label: 'Select Label',
    hideLabel: false,
    background: 'primary',
    error: false,
  },
  argTypes: {
    background: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Sets the background color the select is rendered on',
      table: {
        type: { summary: 'primary | secondary' },
        defaultValue: { summary: 'primary' },
      },
    },
    error: {
      control: 'radio',
      options: [false, true, 'error message'],
      description: 'Sets the select to an error state, displays the error slot if one is present',
      table: {
        type: { summary: 'boolean | string' },
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: 'select',
      options: [undefined, 'large'],
      description: 'Sets the component size',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CdrSelect>;

const stateOptions = [
  { text: 'California', value: 'CA' },
  { text: 'Colorado', value: 'CO' },
  { text: 'Oregon', value: 'OR' },
  { text: 'Washington', value: 'WA' },
];

const simpleOptions = ['Small', 'Medium', 'Large', 'X-Large'];

export const Default: Story = {
  args: {
    label: 'State',
    prompt: 'Select a state',
    options: stateOptions,
  },
  render: (args) => ({
    components: { CdrSelect },
    setup() {
      const selected = ref('');
      return { args, selected };
    },
    template: '<CdrSelect v-bind="args" v-model="selected" />',
  }),
};

export const WithSimpleOptions: Story = {
  args: {
    label: 'Size',
    prompt: 'Choose a size',
    options: simpleOptions,
  },
  render: (args) => ({
    components: { CdrSelect },
    setup() {
      const selected = ref('');
      return { args, selected };
    },
    template: '<CdrSelect v-bind="args" v-model="selected" />',
  }),
};

export const WithError: Story = {
  args: {
    label: 'State',
    prompt: 'Select a state',
    options: stateOptions,
    error: true,
  },
  render: (args) => ({
    components: { CdrSelect },
    setup() {
      const selected = ref('');
      return { args, selected };
    },
    template: `
      <CdrSelect v-bind="args" v-model="selected">
        <template #error>Please select a state</template>
      </CdrSelect>
    `,
  }),
};

export const LargeSize: Story = {
  args: {
    label: 'Country',
    prompt: 'Select a country',
    size: 'large',
    options: ['United States', 'Canada', 'Mexico'],
  },
  render: (args) => ({
    components: { CdrSelect },
    setup() {
      const selected = ref('');
      return { args, selected };
    },
    template: '<CdrSelect v-bind="args" v-model="selected" />',
  }),
};

export const HiddenLabel: Story = {
  args: {
    label: 'Sort by',
    hideLabel: true,
    prompt: 'Sort by...',
    options: ['Price: Low to High', 'Price: High to Low', 'Newest', 'Best Selling'],
  },
  render: (args) => ({
    components: { CdrSelect },
    setup() {
      const selected = ref('');
      return { args, selected };
    },
    template: '<CdrSelect v-bind="args" v-model="selected" />',
  }),
};

export const Preselected: Story = {
  args: {
    label: 'Quantity',
    options: ['1', '2', '3', '4', '5'],
  },
  render: (args) => ({
    components: { CdrSelect },
    setup() {
      const selected = ref('1');
      return { args, selected };
    },
    template: '<CdrSelect v-bind="args" v-model="selected" />',
  }),
};

export const SecondaryBackground: Story = {
  args: {
    label: 'Category',
    prompt: 'Select category',
    background: 'secondary',
    options: ['Camping', 'Hiking', 'Climbing', 'Cycling'],
  },
  render: (args) => ({
    components: { CdrSelect },
    setup() {
      const selected = ref('');
      return { args, selected };
    },
    template: `
      <div style="background: #f7f5f0; padding: 24px; border-radius: 4px;">
        <CdrSelect v-bind="args" v-model="selected" />
      </div>
    `,
  }),
};
