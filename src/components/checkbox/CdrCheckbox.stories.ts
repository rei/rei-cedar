import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import CdrCheckbox from './CdrCheckbox.vue';

const meta: Meta<typeof CdrCheckbox> = {
  title: 'Components/Checkbox',
  component: CdrCheckbox,
  tags: ['autodocs'],
  args: {
    size: 'medium',
    background: 'primary',
    disabled: false,
    indeterminate: false,
    modifier: '',
  },
};

export default meta;
type Story = StoryObj<typeof CdrCheckbox>;

export const Default: Story = {
  render: (args) => ({
    components: { CdrCheckbox },
    setup() {
      const checked = ref(false);
      return { args, checked };
    },
    template:
      '<CdrCheckbox v-bind="args" v-model="checked">Accept terms and conditions</CdrCheckbox>',
  }),
};

export const Checked: Story = {
  render: (args) => ({
    components: { CdrCheckbox },
    setup() {
      const checked = ref(true);
      return { args, checked };
    },
    template: '<CdrCheckbox v-bind="args" v-model="checked">Checked by default</CdrCheckbox>',
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { CdrCheckbox },
    setup() {
      const checked = ref(false);
      return { args, checked };
    },
    template: '<CdrCheckbox v-bind="args" v-model="checked">Disabled checkbox</CdrCheckbox>',
  }),
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
  render: (args) => ({
    components: { CdrCheckbox },
    setup() {
      const checked = ref(false);
      return { args, checked };
    },
    template: '<CdrCheckbox v-bind="args" v-model="checked">Indeterminate state</CdrCheckbox>',
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { CdrCheckbox },
    setup() {
      const small = ref(true);
      const medium = ref(true);
      const large = ref(true);
      return { small, medium, large };
    },
    template: `
      <div class="story-spacing story-spacing--vertical">
        <CdrCheckbox size="small" v-model="small">Small checkbox</CdrCheckbox>
        <CdrCheckbox size="medium" v-model="medium">Medium checkbox</CdrCheckbox>
        <CdrCheckbox size="large" v-model="large">Large checkbox</CdrCheckbox>
      </div>
    `,
  }),
};

export const CheckboxGroup: Story = {
  render: () => ({
    components: { CdrCheckbox },
    setup() {
      const selections = ref<string[]>(['hiking']);
      return { selections };
    },
    template: `
      <fieldset style="border: none; padding: 0;">
        <legend style="font-weight: bold; margin-bottom: 8px;">Select your interests:</legend>
        <div class="story-spacing story-spacing--vertical">
          <CdrCheckbox v-model="selections" custom-value="hiking">Hiking</CdrCheckbox>
          <CdrCheckbox v-model="selections" custom-value="camping">Camping</CdrCheckbox>
          <CdrCheckbox v-model="selections" custom-value="climbing">Climbing</CdrCheckbox>
          <CdrCheckbox v-model="selections" custom-value="cycling">Cycling</CdrCheckbox>
          <CdrCheckbox v-model="selections" custom-value="paddling">Paddling</CdrCheckbox>
        </div>
        <p style="margin-top: 16px; color: #666;">Selected: {{ selections.join(', ') || 'None' }}</p>
      </fieldset>
    `,
  }),
};

export const HideFigure: Story = {
  args: {
    modifier: 'hide-figure',
  },
  render: (args) => ({
    components: { CdrCheckbox },
    setup() {
      const checked = ref(false);
      return { args, checked };
    },
    template: `
      <CdrCheckbox v-bind="args" v-model="checked">
        <span :style="{ fontWeight: checked ? 'bold' : 'normal' }">
          Hidden checkbox (click to toggle)
        </span>
      </CdrCheckbox>
    `,
  }),
};

export const SecondaryBackground: Story = {
  args: {
    background: 'secondary',
  },
  render: (args) => ({
    components: { CdrCheckbox },
    setup() {
      const checked = ref(true);
      return { args, checked };
    },
    template: `
      <div style="background: #f7f5f0; padding: 24px; border-radius: 4px;">
        <CdrCheckbox v-bind="args" v-model="checked">Checkbox on secondary background</CdrCheckbox>
      </div>
    `,
  }),
};
