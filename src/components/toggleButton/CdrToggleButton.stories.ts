import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, watch } from 'vue';
import CdrToggleGroup from './CdrToggleGroup.vue';
import CdrToggleButton from './CdrToggleButton.vue';

const meta: Meta<typeof CdrToggleGroup> = {
  title: 'Components/ToggleButton',
  component: CdrToggleGroup,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'v-model binding',
    },
    size: {
      control: 'select',
      options: ['medium', 'large'],
      description: 'Sets toggle button size',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { CdrToggleGroup, CdrToggleButton },
    setup() {
      const { modelValue, ...restArgs } = args;
      const selected = ref(modelValue);
      watch(
        () => args.modelValue,
        (newVal) => {
          selected.value = newVal;
        },
      );
      return { selected, restArgs };
    },
    template: `
      <CdrToggleGroup v-model="selected" v-bind="restArgs">
        <CdrToggleButton toggle-value="Option 1" />
        <CdrToggleButton toggle-value="Option 2" />
        <CdrToggleButton toggle-value="Option 3" />
      </CdrToggleGroup>
    `,
  }),
  args: {
    modelValue: 'Option 1',
    size: 'medium',
  },
};

export const Large: Story = {
  render: (args) => ({
    components: { CdrToggleGroup, CdrToggleButton },
    setup() {
      const { modelValue, ...restArgs } = args;
      const selected = ref(modelValue);
      watch(
        () => args.modelValue,
        (newVal) => {
          selected.value = newVal;
        },
      );
      return { selected, restArgs };
    },
    template: `
      <CdrToggleGroup v-model="selected" v-bind="restArgs">
        <CdrToggleButton toggle-value="Small" />
        <CdrToggleButton toggle-value="Medium" />
        <CdrToggleButton toggle-value="Large" />
        <CdrToggleButton toggle-value="X-Large" />
      </CdrToggleGroup>
    `,
  }),
  args: {
    modelValue: 'Medium',
    size: 'large',
  },
};

export const CustomLabels: Story = {
  render: (args) => ({
    components: { CdrToggleGroup, CdrToggleButton },
    setup() {
      const { modelValue, ...restArgs } = args;
      const selected = ref(modelValue);
      watch(
        () => args.modelValue,
        (newVal) => {
          selected.value = newVal;
        },
      );
      return { selected, restArgs };
    },
    template: `
      <CdrToggleGroup v-model="selected" v-bind="restArgs">
        <CdrToggleButton toggle-value="1">
          <span style="font-weight: bold;">1 Day</span>
        </CdrToggleButton>
        <CdrToggleButton toggle-value="7">
          <span style="font-weight: bold;">7 Days</span>
        </CdrToggleButton>
        <CdrToggleButton toggle-value="30">
          <span style="font-weight: bold;">30 Days</span>
        </CdrToggleButton>
      </CdrToggleGroup>
    `,
  }),
  args: {
    modelValue: '7',
    size: 'medium',
  },
};

export const TwoOptions: Story = {
  render: (args) => ({
    components: { CdrToggleGroup, CdrToggleButton },
    setup() {
      const { modelValue, ...restArgs } = args;
      const selected = ref(modelValue);
      watch(
        () => args.modelValue,
        (newVal) => {
          selected.value = newVal;
        },
      );
      return { selected, restArgs };
    },
    template: `
      <CdrToggleGroup v-model="selected" v-bind="restArgs">
        <CdrToggleButton toggle-value="List" />
        <CdrToggleButton toggle-value="Grid" />
      </CdrToggleGroup>
    `,
  }),
  args: {
    modelValue: 'Grid',
    size: 'medium',
  },
};

export const ManyOptions: Story = {
  render: (args) => ({
    components: { CdrToggleGroup, CdrToggleButton },
    setup() {
      const { modelValue, ...restArgs } = args;
      const selected = ref(modelValue);
      watch(
        () => args.modelValue,
        (newVal) => {
          selected.value = newVal;
        },
      );
      return { selected, restArgs };
    },
    template: `
      <CdrToggleGroup v-model="selected" v-bind="restArgs">
        <CdrToggleButton toggle-value="XS" />
        <CdrToggleButton toggle-value="S" />
        <CdrToggleButton toggle-value="M" />
        <CdrToggleButton toggle-value="L" />
        <CdrToggleButton toggle-value="XL" />
        <CdrToggleButton toggle-value="XXL" />
      </CdrToggleGroup>
    `,
  }),
  args: {
    modelValue: 'M',
    size: 'medium',
  },
};

export const InteractiveExample: Story = {
  render: () => ({
    components: { CdrToggleGroup, CdrToggleButton },
    setup() {
      const viewMode = ref('list');
      const sortBy = ref('name');
      return { viewMode, sortBy };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h4>View Mode: {{ viewMode }}</h4>
          <CdrToggleGroup v-model="viewMode">
            <CdrToggleButton toggle-value="list">List</CdrToggleButton>
            <CdrToggleButton toggle-value="grid">Grid</CdrToggleButton>
            <CdrToggleButton toggle-value="compact">Compact</CdrToggleButton>
          </CdrToggleGroup>
        </div>
        
        <div>
          <h4>Sort By: {{ sortBy }}</h4>
          <CdrToggleGroup v-model="sortBy" size="large">
            <CdrToggleButton toggle-value="name">Name</CdrToggleButton>
            <CdrToggleButton toggle-value="price">Price</CdrToggleButton>
            <CdrToggleButton toggle-value="rating">Rating</CdrToggleButton>
            <CdrToggleButton toggle-value="newest">Newest</CdrToggleButton>
          </CdrToggleGroup>
        </div>
      </div>
    `,
  }),
};
