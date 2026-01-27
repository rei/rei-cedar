import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, watch } from 'vue';
import CdrRadio from './CdrRadio.vue';

const meta = {
  title: 'Components/Radio',
  component: CdrRadio,
  tags: ['autodocs'],
  args: {
    name: 'radio-group',
    disabled: false,
  },
} satisfies Meta<typeof CdrRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { CdrRadio },
    setup() {
      const selected = ref('option1');
      watch(
        () => args.modelValue,
        (newVal) => {
          if (newVal !== undefined) selected.value = newVal as string;
        },
      );
      const { modelValue: _, ...restArgs } = args;
      return { restArgs, selected };
    },
    template: `
      <div>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="option1">
          Option 1
        </CdrRadio>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="option2">
          Option 2
        </CdrRadio>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="option3">
          Option 3
        </CdrRadio>
        <p style="margin-top: 16px;">Selected: {{ selected }}</p>
      </div>
    `,
  }),
};

export const Small: Story = {
  args: {
    size: 'small',
  },
  render: (args) => ({
    components: { CdrRadio },
    setup() {
      const selected = ref('small1');
      watch(
        () => args.modelValue,
        (newVal) => {
          if (newVal !== undefined) selected.value = newVal as string;
        },
      );
      const { modelValue: _, ...restArgs } = args;
      return { restArgs, selected };
    },
    template: `
      <div>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="small1">
          Small Option 1
        </CdrRadio>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="small2">
          Small Option 2
        </CdrRadio>
      </div>
    `,
  }),
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
  render: (args) => ({
    components: { CdrRadio },
    setup() {
      const selected = ref('medium1');
      watch(
        () => args.modelValue,
        (newVal) => {
          if (newVal !== undefined) selected.value = newVal as string;
        },
      );
      const { modelValue: _, ...restArgs } = args;
      return { restArgs, selected };
    },
    template: `
      <div>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="medium1">
          Medium Option 1
        </CdrRadio>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="medium2">
          Medium Option 2
        </CdrRadio>
      </div>
    `,
  }),
};

export const Large: Story = {
  args: {
    size: 'large',
  },
  render: (args) => ({
    components: { CdrRadio },
    setup() {
      const selected = ref('large1');
      watch(
        () => args.modelValue,
        (newVal) => {
          if (newVal !== undefined) selected.value = newVal as string;
        },
      );
      const { modelValue: _, ...restArgs } = args;
      return { restArgs, selected };
    },
    template: `
      <div>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="large1">
          Large Option 1
        </CdrRadio>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="large2">
          Large Option 2
        </CdrRadio>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { CdrRadio },
    setup() {
      const selected = ref('option1');
      watch(
        () => args.modelValue,
        (newVal) => {
          if (newVal !== undefined) selected.value = newVal as string;
        },
      );
      const { modelValue: _, ...restArgs } = args;
      return { restArgs, selected };
    },
    template: `
      <div>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="option1">
          Disabled Option 1
        </CdrRadio>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="option2">
          Disabled Option 2
        </CdrRadio>
      </div>
    `,
  }),
};

export const SecondaryBackground: Story = {
  args: {
    background: 'secondary',
  },
  render: (args) => ({
    components: { CdrRadio },
    setup() {
      const selected = ref('option1');
      watch(
        () => args.modelValue,
        (newVal) => {
          if (newVal !== undefined) selected.value = newVal as string;
        },
      );
      const { modelValue: _, ...restArgs } = args;
      return { restArgs, selected };
    },
    template: `
      <div style="background-color: #f5f5f5; padding: 16px;">
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="option1">
          Option 1 on Secondary Background
        </CdrRadio>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="option2">
          Option 2 on Secondary Background
        </CdrRadio>
      </div>
    `,
  }),
};

export const HideFigure: Story = {
  args: {
    modifier: 'hide-figure',
  },
  render: (args) => ({
    components: { CdrRadio },
    setup() {
      const selected = ref('option1');
      watch(
        () => args.modelValue,
        (newVal) => {
          if (newVal !== undefined) selected.value = newVal as string;
        },
      );
      const { modelValue: _, ...restArgs } = args;
      return { restArgs, selected };
    },
    template: `
      <div>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="option1">
          Hidden Figure Option 1
        </CdrRadio>
        <CdrRadio v-bind="restArgs" v-model="selected" customValue="option2">
          Hidden Figure Option 2
        </CdrRadio>
      </div>
    `,
  }),
};
