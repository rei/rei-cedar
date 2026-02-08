import type { Meta, StoryObj } from '@storybook/vue3';
import CdrTooltip from './CdrTooltip.vue';
import CdrButton from '../button/CdrButton.vue';

const meta: Meta<typeof CdrTooltip> = {
  title: 'Components/Tooltip',
  component: CdrTooltip,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description:
        'Sets the position where the tooltip will render relative to the trigger element',
      table: {
        type: { summary: 'top | bottom | left | right' },
        defaultValue: { summary: 'top' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { CdrTooltip, CdrButton },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 100px; text-align: center;">
        <CdrTooltip v-bind="args">
          <template #trigger>
            <CdrButton>Hover for tooltip</CdrButton>
          </template>
          This is a helpful tooltip message
        </CdrTooltip>
      </div>
    `,
  }),
  args: {
    position: 'top',
  },
};

export const TopPosition: Story = {
  render: (args) => ({
    components: { CdrTooltip, CdrButton },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 100px; text-align: center;">
        <CdrTooltip v-bind="args">
          <template #trigger>
            <CdrButton>Top Tooltip</CdrButton>
          </template>
          Tooltip appears above the button
        </CdrTooltip>
      </div>
    `,
  }),
  args: {
    position: 'top',
  },
};

export const BottomPosition: Story = {
  render: (args) => ({
    components: { CdrTooltip, CdrButton },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 100px; text-align: center;">
        <CdrTooltip v-bind="args">
          <template #trigger>
            <CdrButton>Bottom Tooltip</CdrButton>
          </template>
          Tooltip appears below the button
        </CdrTooltip>
      </div>
    `,
  }),
  args: {
    position: 'bottom',
  },
};

export const LeftPosition: Story = {
  render: (args) => ({
    components: { CdrTooltip, CdrButton },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 100px; text-align: center;">
        <CdrTooltip v-bind="args">
          <template #trigger>
            <CdrButton>Left Tooltip</CdrButton>
          </template>
          Tooltip appears to the left
        </CdrTooltip>
      </div>
    `,
  }),
  args: {
    position: 'left',
  },
};

export const RightPosition: Story = {
  render: (args) => ({
    components: { CdrTooltip, CdrButton },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 100px; text-align: center;">
        <CdrTooltip v-bind="args">
          <template #trigger>
            <CdrButton>Right Tooltip</CdrButton>
          </template>
          Tooltip appears to the right
        </CdrTooltip>
      </div>
    `,
  }),
  args: {
    position: 'right',
  },
};

export const AllPositions: Story = {
  render: () => ({
    components: { CdrTooltip, CdrButton },
    template: `
      <div style="padding: 150px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 100px;">
        <div style="text-align: center;">
          <CdrTooltip position="top">
            <template #trigger>
              <CdrButton>Top</CdrButton>
            </template>
            Tooltip on top
          </CdrTooltip>
        </div>
        
        <div style="text-align: center;">
          <CdrTooltip position="bottom">
            <template #trigger>
              <CdrButton>Bottom</CdrButton>
            </template>
            Tooltip on bottom
          </CdrTooltip>
        </div>
        
        <div style="text-align: center;">
          <CdrTooltip position="left">
            <template #trigger>
              <CdrButton>Left</CdrButton>
            </template>
            Tooltip on left
          </CdrTooltip>
        </div>
        
        <div style="text-align: center;">
          <CdrTooltip position="right">
            <template #trigger>
              <CdrButton>Right</CdrButton>
            </template>
            Tooltip on right
          </CdrTooltip>
        </div>
      </div>
    `,
  }),
};

export const LongContent: Story = {
  render: (args) => ({
    components: { CdrTooltip, CdrButton },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 100px; text-align: center;">
        <CdrTooltip v-bind="args">
          <template #trigger>
            <CdrButton>Hover for detailed info</CdrButton>
          </template>
          This is a longer tooltip message that provides more detailed information
          about the action or element. It can wrap to multiple lines if needed.
        </CdrTooltip>
      </div>
    `,
  }),
  args: {
    position: 'top',
  },
};

export const MultipleTooltips: Story = {
  render: () => ({
    components: { CdrTooltip, CdrButton },
    template: `
      <div style="padding: 100px; display: flex; gap: 24px; justify-content: center;">
        <CdrTooltip position="top">
          <template #trigger>
            <CdrButton>Save</CdrButton>
          </template>
          Save your changes
        </CdrTooltip>
        
        <CdrTooltip position="top">
          <template #trigger>
            <CdrButton>Cancel</CdrButton>
          </template>
          Discard changes
        </CdrTooltip>
        
        <CdrTooltip position="top">
          <template #trigger>
            <CdrButton>Delete</CdrButton>
          </template>
          Permanently delete this item
        </CdrTooltip>
      </div>
    `,
  }),
};
