import type { Meta, StoryObj } from '@storybook/vue3';
import CdrLabelWrapper from './CdrLabelWrapper.vue';

const meta: Meta<typeof CdrLabelWrapper> = {
  title: 'Components/CdrLabelWrapper',
  component: CdrLabelWrapper,
  parameters: {
    docs: {
      description: {
        component:
          'Wrapper component for custom form controls like checkboxes and radio buttons. Provides consistent styling and layout for labeled form elements.',
      },
    },
  },
  argTypes: {
    labelClass: {
      control: 'text',
      description: 'Custom CSS class for the label element',
    },
    contentClass: {
      control: 'text',
      description: 'Custom CSS class for the content element',
    },
    background: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Sets the background color',
    },
    disabled: {
      control: 'boolean',
      description: 'Sets the disabled state',
    },
    modifier: {
      control: 'text',
      description: 'Sets a modifier class',
    },
    size: {
      control: 'text',
      description: 'Sets the size, supports responsive values',
    },
  },
};

export default meta;

type Story = StoryObj<typeof CdrLabelWrapper>;

export const Default: Story = {
  args: {
    background: 'primary',
  },
  render: (args: any) => ({
    components: { CdrLabelWrapper },
    setup() {
      return { args };
    },
    template: `
      <CdrLabelWrapper v-bind="args">
        <template #input>
          <input type="checkbox" />
        </template>
        Standard checkbox label
      </CdrLabelWrapper>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    background: 'primary',
    disabled: true,
  },
  render: (args: any) => ({
    components: { CdrLabelWrapper },
    setup() {
      return { args };
    },
    template: `
      <CdrLabelWrapper v-bind="args">
        <template #input>
          <input type="checkbox" disabled />
        </template>
        Disabled checkbox label
      </CdrLabelWrapper>
    `,
  }),
};

export const RadioButton: Story = {
  args: {
    background: 'primary',
  },
  render: (args: any) => ({
    components: { CdrLabelWrapper },
    setup() {
      return { args };
    },
    template: `
      <div>
        <CdrLabelWrapper v-bind="args">
          <template #input>
            <input type="radio" name="example" value="1" />
          </template>
          Option 1
        </CdrLabelWrapper>
        <CdrLabelWrapper v-bind="args">
          <template #input>
            <input type="radio" name="example" value="2" />
          </template>
          Option 2
        </CdrLabelWrapper>
      </div>
    `,
  }),
};

export const SecondaryBackground: Story = {
  args: {
    background: 'secondary',
  },
  render: (args: any) => ({
    components: { CdrLabelWrapper },
    setup() {
      return { args };
    },
    template: `
      <CdrLabelWrapper v-bind="args">
        <template #input>
          <input type="checkbox" />
        </template>
        Checkbox on secondary background
      </CdrLabelWrapper>
    `,
  }),
};

export const WithModifier: Story = {
  args: {
    background: 'primary',
    modifier: 'compact',
  },
  render: (args: any) => ({
    components: { CdrLabelWrapper },
    setup() {
      return { args };
    },
    template: `
      <CdrLabelWrapper v-bind="args">
        <template #input>
          <input type="checkbox" />
        </template>
        Compact checkbox
      </CdrLabelWrapper>
    `,
  }),
};

export const WithCustomClass: Story = {
  args: {
    background: 'primary',
    labelClass: 'custom-label-class',
    contentClass: 'custom-content-class',
  },
  render: (args: any) => ({
    components: { CdrLabelWrapper },
    setup() {
      return { args };
    },
    template: `
      <CdrLabelWrapper v-bind="args">
        <template #input>
          <input type="checkbox" />
        </template>
        Custom styled checkbox
      </CdrLabelWrapper>
    `,
  }),
};

export const LongLabelText: Story = {
  args: {
    background: 'primary',
  },
  render: (args: any) => ({
    components: { CdrLabelWrapper },
    setup() {
      return { args };
    },
    template: `
      <CdrLabelWrapper v-bind="args">
        <template #input>
          <input type="checkbox" />
        </template>
        This is a very long label that demonstrates how the label wrapper handles text wrapping when the content is longer than a single line
      </CdrLabelWrapper>
    `,
  }),
};

export const MultipleCheckboxes: Story = {
  args: {
    background: 'primary',
  },
  render: (args: any) => ({
    components: { CdrLabelWrapper },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <CdrLabelWrapper v-bind="args">
          <template #input>
            <input type="checkbox" />
          </template>
          Hiking
        </CdrLabelWrapper>
        <CdrLabelWrapper v-bind="args">
          <template #input>
            <input type="checkbox" />
          </template>
          Camping
        </CdrLabelWrapper>
        <CdrLabelWrapper v-bind="args">
          <template #input>
            <input type="checkbox" />
          </template>
          Climbing
        </CdrLabelWrapper>
      </div>
    `,
  }),
};
