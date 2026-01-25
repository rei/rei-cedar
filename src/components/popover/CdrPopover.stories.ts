import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, watch } from 'vue';
import CdrPopover from './CdrPopover.vue';
import CdrButton from '../button/CdrButton.vue';
import CdrText from '../text/CdrText.vue';
import CdrLink from '../link/CdrLink.vue';

const meta = {
  title: 'Components/Popover',
  component: CdrPopover,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    autoPosition: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    id: {
      control: 'text',
    },
  },
  args: {
    position: 'top',
    autoPosition: true,
    id: 'popover-1',
  },
} satisfies Meta<typeof CdrPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Popover Title',
  },
  render: (args) => ({
    components: { CdrPopover, CdrButton, CdrText },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 100px; text-align: center;">
        <CdrPopover v-bind="args">
          <template #trigger>
            <CdrButton>Open Popover</CdrButton>
          </template>
          <CdrText>
            This is a popover with some informational content. 
            It can contain text, links, or other elements.
          </CdrText>
        </CdrPopover>
      </div>
    `,
  }),
};

export const PositionTop: Story = {
  args: {
    label: 'Top Position',
    position: 'top',
  },
  render: (args) => ({
    components: { CdrPopover, CdrButton, CdrText },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 100px; text-align: center;">
        <CdrPopover v-bind="args">
          <template #trigger>
            <CdrButton>Show Above</CdrButton>
          </template>
          <CdrText>This popover appears above the trigger button.</CdrText>
        </CdrPopover>
      </div>
    `,
  }),
};

export const PositionBottom: Story = {
  args: {
    label: 'Bottom Position',
    position: 'bottom',
  },
  render: (args) => ({
    components: { CdrPopover, CdrButton, CdrText },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 100px; text-align: center;">
        <CdrPopover v-bind="args">
          <template #trigger>
            <CdrButton>Show Below</CdrButton>
          </template>
          <CdrText>This popover appears below the trigger button.</CdrText>
        </CdrPopover>
      </div>
    `,
  }),
};

export const PositionLeft: Story = {
  args: {
    label: 'Left Position',
    position: 'left',
  },
  render: (args) => ({
    components: { CdrPopover, CdrButton, CdrText },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 100px; text-align: center;">
        <CdrPopover v-bind="args">
          <template #trigger>
            <CdrButton>Show Left</CdrButton>
          </template>
          <CdrText>This popover appears to the left of the trigger button.</CdrText>
        </CdrPopover>
      </div>
    `,
  }),
};

export const PositionRight: Story = {
  args: {
    label: 'Right Position',
    position: 'right',
  },
  render: (args) => ({
    components: { CdrPopover, CdrButton, CdrText },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 100px; text-align: center;">
        <CdrPopover v-bind="args">
          <template #trigger>
            <CdrButton>Show Right</CdrButton>
          </template>
          <CdrText>This popover appears to the right of the trigger button.</CdrText>
        </CdrPopover>
      </div>
    `,
  }),
};

export const WithLinks: Story = {
  args: {
    label: 'Helpful Links',
    id: 'popover-links',
  },
  render: (args) => ({
    components: { CdrPopover, CdrButton, CdrText, CdrLink },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 100px; text-align: center;">
        <CdrPopover v-bind="args">
          <template #trigger>
            <CdrButton>Open Menu</CdrButton>
          </template>
          <div>
            <CdrText>Quick links:</CdrText>
            <ul style="list-style: none; padding: 0; margin: 8px 0 0 0;">
              <li><CdrLink href="https://www.rei.com">REI Home</CdrLink></li>
              <li><CdrLink href="https://www.rei.com/adventures">Adventures</CdrLink></li>
              <li><CdrLink href="https://www.rei.com/stewardship">Stewardship</CdrLink></li>
            </ul>
          </div>
        </CdrPopover>
      </div>
    `,
  }),
};

export const LongContent: Story = {
  args: {
    label: 'More Information',
    id: 'popover-long',
  },
  render: (args) => ({
    components: { CdrPopover, CdrButton, CdrText },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 100px; text-align: center;">
        <CdrPopover v-bind="args">
          <template #trigger>
            <CdrButton>Learn More</CdrButton>
          </template>
          <CdrText>
            This popover contains more detailed information that might span 
            multiple lines. Popovers are useful for providing contextual help 
            or additional details without cluttering the main interface.
          </CdrText>
          <CdrText>
            They can be dismissed by clicking the X button, pressing ESC, 
            or clicking outside the popover.
          </CdrText>
        </CdrPopover>
      </div>
    `,
  }),
};

export const ProgrammaticControl: Story = {
  args: {
    label: 'Controlled Popover',
    id: 'popover-controlled',
  },
  render: (args) => ({
    components: { CdrPopover, CdrButton, CdrText },
    setup() {
      const isOpen = ref(false);
      watch(
        () => args.open,
        (newVal) => {
          isOpen.value = newVal ?? false;
        },
      );
      const openPopover = () => {
        isOpen.value = true;
      };
      const closePopover = () => {
        isOpen.value = false;
      };
      const { open: _, ...restArgs } = args;
      return { restArgs, isOpen, openPopover, closePopover };
    },
    template: `
      <div style="padding: 100px; text-align: center;">
        <div style="margin-bottom: 16px;">
          <CdrButton @click="openPopover" style="margin-right: 8px;">Open</CdrButton>
          <CdrButton @click="closePopover" modifier="secondary">Close</CdrButton>
        </div>
        <CdrPopover v-bind="restArgs" :open="isOpen" @closed="closePopover">
          <template #trigger>
            <CdrButton>Trigger Button</CdrButton>
          </template>
          <CdrText>
            This popover is controlled programmatically using the open prop.
          </CdrText>
        </CdrPopover>
      </div>
    `,
  }),
};
