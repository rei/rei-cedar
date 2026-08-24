import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import CdrFormGroup from './CdrFormGroup.vue';
import CdrCheckbox from '../checkbox/CdrCheckbox.vue';
import CdrRadio from '../radio/CdrRadio.vue';
import CdrInput from '../input/CdrInput.vue';
import { errorStateOptions } from '../../types/componentOptions';

const meta: Meta<typeof CdrFormGroup> = {
  title: 'Components/FormGroup',
  component: CdrFormGroup,
  tags: ['autodocs'],
  args: {
    label: 'Form Group Label',
    required: false,
    optional: false,
    disabled: false,
  },
  argTypes: {
    error: {
      control: 'radio',
      options: errorStateOptions,
      description: 'Sets the form group to an error state',
      table: {
        type: { summary: 'boolean | string' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CdrFormGroup>;

export const Default: Story = {
  render: (args) => ({
    components: { CdrFormGroup, CdrCheckbox },
    setup() {
      const selected = ref<string[]>([]);
      return { args, selected };
    },
    template: `
      <CdrFormGroup v-bind="args">
        <CdrCheckbox v-model="selected" custom-value="option1">Option 1</CdrCheckbox>
        <CdrCheckbox v-model="selected" custom-value="option2">Option 2</CdrCheckbox>
        <CdrCheckbox v-model="selected" custom-value="option3">Option 3</CdrCheckbox>
      </CdrFormGroup>
    `,
  }),
};

export const WithCheckboxes: Story = {
  render: () => ({
    components: { CdrFormGroup, CdrCheckbox },
    setup() {
      const interests = ref<string[]>(['hiking']);
      return { interests };
    },
    template: `
      <CdrFormGroup label="Select your interests">
        <CdrCheckbox v-model="interests" custom-value="hiking">Hiking</CdrCheckbox>
        <CdrCheckbox v-model="interests" custom-value="camping">Camping</CdrCheckbox>
        <CdrCheckbox v-model="interests" custom-value="climbing">Climbing</CdrCheckbox>
        <CdrCheckbox v-model="interests" custom-value="biking">Biking</CdrCheckbox>
      </CdrFormGroup>
      <p style="margin-top: 16px; color: #666;">Selected: {{ interests.join(', ') || 'None' }}</p>
    `,
  }),
};

export const WithRadios: Story = {
  render: () => ({
    components: { CdrFormGroup, CdrRadio },
    setup() {
      const size = ref('medium');
      return { size };
    },
    template: `
      <CdrFormGroup label="Select size">
        <CdrRadio v-model="size" name="size" value="small">Small</CdrRadio>
        <CdrRadio v-model="size" name="size" value="medium">Medium</CdrRadio>
        <CdrRadio v-model="size" name="size" value="large">Large</CdrRadio>
        <CdrRadio v-model="size" name="size" value="xlarge">Extra Large</CdrRadio>
      </CdrFormGroup>
      <p style="margin-top: 16px; color: #666;">Selected: {{ size }}</p>
    `,
  }),
};

export const Required: Story = {
  render: () => ({
    components: { CdrFormGroup, CdrCheckbox },
    setup() {
      const terms = ref<boolean>(false);
      return { terms };
    },
    template: `
      <CdrFormGroup label="Terms and Conditions" required>
        <CdrCheckbox v-model="terms">I agree to the terms and conditions</CdrCheckbox>
      </CdrFormGroup>
    `,
  }),
};

export const Optional: Story = {
  render: () => ({
    components: { CdrFormGroup, CdrCheckbox },
    setup() {
      const newsletter = ref<boolean>(false);
      return { newsletter };
    },
    template: `
      <CdrFormGroup label="Newsletter Subscription" optional>
        <CdrCheckbox v-model="newsletter">Subscribe to our newsletter</CdrCheckbox>
      </CdrFormGroup>
    `,
  }),
};

export const WithError: Story = {
  render: () => ({
    components: { CdrFormGroup, CdrCheckbox },
    setup() {
      const selected = ref<string[]>([]);
      const error = ref('Please select at least one option');
      return { selected, error };
    },
    template: `
      <CdrFormGroup label="Select preferences" :error="error" required>
        <template #error>{{ error }}</template>
        <CdrCheckbox v-model="selected" custom-value="option1">Option 1</CdrCheckbox>
        <CdrCheckbox v-model="selected" custom-value="option2">Option 2</CdrCheckbox>
        <CdrCheckbox v-model="selected" custom-value="option3">Option 3</CdrCheckbox>
      </CdrFormGroup>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { CdrFormGroup, CdrCheckbox },
    setup() {
      const selected = ref<string[]>(['option1']);
      return { selected };
    },
    template: `
      <CdrFormGroup label="Disabled Form Group" disabled>
        <CdrCheckbox v-model="selected" custom-value="option1">Option 1</CdrCheckbox>
        <CdrCheckbox v-model="selected" custom-value="option2">Option 2</CdrCheckbox>
        <CdrCheckbox v-model="selected" custom-value="option3">Option 3</CdrCheckbox>
      </CdrFormGroup>
    `,
  }),
};

export const MixedInputs: Story = {
  render: () => ({
    components: { CdrFormGroup, CdrCheckbox, CdrInput },
    setup() {
      const preferences = ref<string[]>([]);
      const other = ref('');
      return { preferences, other };
    },
    template: `
      <div class="story-spacing story-spacing--vertical">
        <CdrFormGroup label="Select your preferences" optional>
          <CdrCheckbox v-model="preferences" custom-value="email">Email notifications</CdrCheckbox>
          <CdrCheckbox v-model="preferences" custom-value="sms">SMS notifications</CdrCheckbox>
          <CdrCheckbox v-model="preferences" custom-value="push">Push notifications</CdrCheckbox>
        </CdrFormGroup>
        
        <CdrFormGroup label="Additional comments" optional>
          <CdrInput v-model="other" placeholder="Enter any additional comments..." />
        </CdrFormGroup>
      </div>
    `,
  }),
};

export const CustomLabel: Story = {
  render: () => ({
    components: { CdrFormGroup, CdrCheckbox },
    setup() {
      const selected = ref<string[]>([]);
      return { selected };
    },
    template: `
      <CdrFormGroup>
        <template #label>
          <h3 style="margin: 0; color: #2c6ecb;">Custom Styled Label</h3>
        </template>
        <CdrCheckbox v-model="selected" custom-value="option1">Option 1</CdrCheckbox>
        <CdrCheckbox v-model="selected" custom-value="option2">Option 2</CdrCheckbox>
      </CdrFormGroup>
    `,
  }),
};
