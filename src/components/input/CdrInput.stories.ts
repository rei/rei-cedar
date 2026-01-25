import type { Meta, StoryObj } from '@storybook/vue3';
import CdrInput from './CdrInput.vue';

const meta: Meta<typeof CdrInput> = {
  title: 'Components/Input',
  component: CdrInput,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [
        'text',
        'email',
        'number',
        'password',
        'search',
        'url',
        'tel',
        'date',
        'datetime-local',
      ],
      description: 'Type attribute for the input',
    },
    label: {
      control: 'text',
      description: 'Sets the text value for the input label',
    },
    hideLabel: {
      control: 'boolean',
      description: 'Removes the label element but sets aria-label',
    },
    background: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Sets the background color the input is rendered on',
    },
    size: {
      control: 'select',
      options: ['', 'large'],
      description: 'Sets the input field size',
    },
    disabled: {
      control: 'boolean',
      description: 'Sets the disabled state',
    },
    required: {
      control: 'boolean',
      description: 'Sets aria-required and displays an asterisk',
    },
    error: {
      control: 'boolean',
      description: 'Sets the input to an error state',
    },
    rows: {
      control: 'number',
      description: 'Number of rows (converts to textarea if > 1)',
    },
  },
  args: {
    type: 'text',
    label: 'Input Label',
    hideLabel: false,
    background: 'primary',
    disabled: false,
    required: false,
    error: false,
    rows: 1,
  },
};

export default meta;
type Story = StoryObj<typeof CdrInput>;

export const Default: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
  },
  render: (args) => ({
    components: { CdrInput },
    setup() {
      return { args };
    },
    template: '<CdrInput v-bind="args" />',
  }),
};

export const WithPlaceholder: Story = {
  args: {
    label: 'Search',
    type: 'search',
  },
  render: (args) => ({
    components: { CdrInput },
    setup() {
      return { args };
    },
    template: '<CdrInput v-bind="args" placeholder="Search for products..." />',
  }),
};

export const Required: Story = {
  args: {
    label: 'Full Name',
    required: true,
  },
  render: (args) => ({
    components: { CdrInput },
    setup() {
      return { args };
    },
    template: '<CdrInput v-bind="args" />',
  }),
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    error: true,
  },
  render: (args) => ({
    components: { CdrInput },
    setup() {
      return { args };
    },
    template: `
      <CdrInput v-bind="args">
        <template #error>Please enter a valid email address</template>
      </CdrInput>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    disabled: true,
  },
  render: (args) => ({
    components: { CdrInput },
    setup() {
      return { args };
    },
    template: '<CdrInput v-bind="args" value="Cannot edit this" />',
  }),
};

export const HiddenLabel: Story = {
  args: {
    label: 'Search',
    hideLabel: true,
    type: 'search',
  },
  render: (args) => ({
    components: { CdrInput },
    setup() {
      return { args };
    },
    template: '<CdrInput v-bind="args" placeholder="Search..." />',
  }),
};

export const LargeSize: Story = {
  args: {
    label: 'Large Input',
    size: 'large',
  },
  render: (args) => ({
    components: { CdrInput },
    setup() {
      return { args };
    },
    template: '<CdrInput v-bind="args" />',
  }),
};

export const Textarea: Story = {
  args: {
    label: 'Comments',
    rows: 4,
  },
  render: (args) => ({
    components: { CdrInput },
    setup() {
      return { args };
    },
    template: '<CdrInput v-bind="args" placeholder="Enter your comments here..." />',
  }),
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    required: true,
  },
  render: (args) => ({
    components: { CdrInput },
    setup() {
      return { args };
    },
    template: '<CdrInput v-bind="args" />',
  }),
};

export const InputTypes: Story = {
  render: () => ({
    components: { CdrInput },
    template: `
      <div class="story-spacing story-spacing--vertical" style="max-width: 400px;">
        <CdrInput label="Text" type="text" />
        <CdrInput label="Email" type="email" />
        <CdrInput label="Password" type="password" />
        <CdrInput label="Number" type="number" />
        <CdrInput label="Search" type="search" />
        <CdrInput label="Tel" type="tel" />
        <CdrInput label="URL" type="url" />
        <CdrInput label="Date" type="date" />
      </div>
    `,
  }),
};

export const SecondaryBackground: Story = {
  args: {
    label: 'Secondary Background',
    background: 'secondary',
  },
  parameters: {
    backgrounds: { default: 'light' },
  },
  render: (args) => ({
    components: { CdrInput },
    setup() {
      return { args };
    },
    template: `
      <div style="background: #f7f5f0; padding: 24px; border-radius: 4px;">
        <CdrInput v-bind="args" />
      </div>
    `,
  }),
};
