import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, watch } from 'vue';
import CdrModal from './CdrModal.vue';
import CdrButton from '../button/CdrButton.vue';
import CdrText from '../text/CdrText.vue';

const meta = {
  title: 'Components/Modal',
  component: CdrModal,
  tags: ['autodocs'],
  argTypes: {
    opened: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    showTitle: {
      control: 'boolean',
    },
    role: {
      control: 'select',
      options: ['dialog', 'alertdialog'],
    },
  },
  args: {
    label: 'Modal Title',
    showTitle: true,
    role: 'dialog',
  },
} satisfies Meta<typeof CdrModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    opened: false,
  },
  render: (args) => ({
    components: { CdrModal, CdrButton, CdrText },
    setup() {
      const isOpen = ref(false);
      watch(
        () => args.opened,
        (newVal) => {
          isOpen.value = newVal ?? false;
        },
      );
      const openModal = () => {
        isOpen.value = true;
      };
      const closeModal = () => {
        isOpen.value = false;
      };
      const { opened: _, ...restArgs } = args;
      return { restArgs, isOpen, openModal, closeModal };
    },
    template: `
      <div>
        <CdrButton @click="openModal">Open Modal</CdrButton>
        <CdrModal v-bind="restArgs" :opened="isOpen" @closed="closeModal">
          <CdrText>
            This is a modal dialog. Modals interrupt the user's workflow and require 
            an action before they can return to the main content.
          </CdrText>
          <CdrText>
            Press ESC or click the X button to close this modal.
          </CdrText>
        </CdrModal>
      </div>
    `,
  }),
};

export const LongContent: Story = {
  args: {
    opened: false,
    label: 'Terms and Conditions',
  },
  render: (args) => ({
    components: { CdrModal, CdrButton, CdrText },
    setup() {
      const isOpen = ref(false);
      watch(
        () => args.opened,
        (newVal) => {
          isOpen.value = newVal ?? false;
        },
      );
      const openModal = () => {
        isOpen.value = true;
      };
      const closeModal = () => {
        isOpen.value = false;
      };
      const { opened: _, ...restArgs } = args;
      return { restArgs, isOpen, openModal, closeModal };
    },
    template: `
      <div>
        <CdrButton @click="openModal">Open Modal with Long Content</CdrButton>
        <CdrModal v-bind="restArgs" :opened="isOpen" @closed="closeModal">
          <CdrText tag="h2">Agreement</CdrText>
          <CdrText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </CdrText>
          <CdrText>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
            in culpa qui officia deserunt mollit anim id est laborum.
          </CdrText>
          <CdrText>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </CdrText>
          <CdrText>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
            sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          </CdrText>
          <CdrText>
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, 
            adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et 
            dolore magnam aliquam quaerat voluptatem.
          </CdrText>
        </CdrModal>
      </div>
    `,
  }),
};

export const NoTitle: Story = {
  args: {
    opened: false,
    label: 'Accessible Label',
    showTitle: false,
  },
  render: (args) => ({
    components: { CdrModal, CdrButton, CdrText },
    setup() {
      const isOpen = ref(false);
      watch(
        () => args.opened,
        (newVal) => {
          isOpen.value = newVal ?? false;
        },
      );
      const openModal = () => {
        isOpen.value = true;
      };
      const closeModal = () => {
        isOpen.value = false;
      };
      const { opened: _, ...restArgs } = args;
      return { restArgs, isOpen, openModal, closeModal };
    },
    template: `
      <div>
        <CdrButton @click="openModal">Open Modal without Visible Title</CdrButton>
        <CdrModal v-bind="restArgs" :opened="isOpen" @closed="closeModal">
          <CdrText>
            This modal has no visible title, but the label prop still provides 
            an accessible name for screen readers.
          </CdrText>
        </CdrModal>
      </div>
    `,
  }),
};

export const AlertDialog: Story = {
  args: {
    opened: false,
    label: 'Delete Confirmation',
    role: 'alertdialog',
  },
  render: (args) => ({
    components: { CdrModal, CdrButton, CdrText },
    setup() {
      const isOpen = ref(false);
      watch(
        () => args.opened,
        (newVal) => {
          isOpen.value = newVal ?? false;
        },
      );
      const openModal = () => {
        isOpen.value = true;
      };
      const closeModal = () => {
        isOpen.value = false;
      };
      const handleDelete = () => {
        alert('Item deleted!');
        closeModal();
      };
      const { opened: _, ...restArgs } = args;
      return { restArgs, isOpen, openModal, closeModal, handleDelete };
    },
    template: `
      <div>
        <CdrButton @click="openModal">Delete Item</CdrButton>
        <CdrModal v-bind="restArgs" :opened="isOpen" @closed="closeModal">
          <CdrText>
            Are you sure you want to delete this item? This action cannot be undone.
          </CdrText>
          <div style="display: flex; gap: 8px; margin-top: 16px;">
            <CdrButton modifier="primary" @click="handleDelete">Delete</CdrButton>
            <CdrButton modifier="secondary" @click="closeModal">Cancel</CdrButton>
          </div>
        </CdrModal>
      </div>
    `,
  }),
};

export const WithCustomClasses: Story = {
  args: {
    opened: false,
    label: 'Custom Styled Modal',
    contentClass: 'custom-modal-content',
  },
  render: (args) => ({
    components: { CdrModal, CdrButton, CdrText },
    setup() {
      const isOpen = ref(false);
      watch(
        () => args.opened,
        (newVal) => {
          isOpen.value = newVal ?? false;
        },
      );
      const openModal = () => {
        isOpen.value = true;
      };
      const closeModal = () => {
        isOpen.value = false;
      };
      const { opened: _, ...restArgs } = args;
      return { restArgs, isOpen, openModal, closeModal };
    },
    template: `
      <div>
        <CdrButton @click="openModal">Open Custom Styled Modal</CdrButton>
        <CdrModal v-bind="restArgs" :opened="isOpen" @closed="closeModal">
          <CdrText>
            This modal has custom CSS classes applied via the contentClass prop.
          </CdrText>
        </CdrModal>
      </div>
    `,
  }),
};
