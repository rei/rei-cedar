import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, watch } from 'vue';
import CdrPagination from './CdrPagination.vue';
import type { PaginationItem } from '../../types/interfaces';

const meta = {
  title: 'Components/Pagination',
  component: CdrPagination,
  tags: ['autodocs'],
  args: {
    linkTag: 'a',
  },
} satisfies Meta<typeof CdrPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper to generate pagination data
const generatePages = (totalPages: number): PaginationItem[] => {
  return Array.from({ length: totalPages }, (_, i) => ({
    page: i + 1,
    url: `#page-${i + 1}`,
  }));
};

export const Default: Story = {
  args: {
    pages: generatePages(10),
    totalPages: 10,
  },
  render: (args) => ({
    components: { CdrPagination },
    setup() {
      const currentPage = ref(1);
      watch(
        () => args.modelValue,
        (newVal) => {
          if (newVal !== undefined) currentPage.value = newVal;
        },
      );
      const handleNavigate = (pageNum: number) => {
        currentPage.value = pageNum;
      };
      const { modelValue: _, ...restArgs } = args;
      return { restArgs, currentPage, handleNavigate };
    },
    template: `
      <div>
        <p>Current page: {{ currentPage }}</p>
        <CdrPagination 
          v-bind="restArgs"
          v-model="currentPage"
          @navigate="handleNavigate"
        />
      </div>
    `,
  }),
};

export const FewPages: Story = {
  args: {
    pages: generatePages(5),
    totalPages: 5,
  },
  render: (args) => ({
    components: { CdrPagination },
    setup() {
      const currentPage = ref(1);
      watch(
        () => args.modelValue,
        (newVal) => {
          if (newVal !== undefined) currentPage.value = newVal;
        },
      );
      const handleNavigate = (pageNum: number) => {
        currentPage.value = pageNum;
      };
      const { modelValue: _, ...restArgs } = args;
      return { restArgs, currentPage, handleNavigate };
    },
    template: `
      <div>
        <p>Current page: {{ currentPage }}</p>
        <CdrPagination 
          v-bind="restArgs"
          v-model="currentPage"
          @navigate="handleNavigate"
        />
      </div>
    `,
  }),
};

export const ManyPages: Story = {
  args: {
    pages: generatePages(50),
    totalPages: 50,
  },
  render: (args) => ({
    components: { CdrPagination },
    setup() {
      const currentPage = ref(1);
      watch(
        () => args.modelValue,
        (newVal) => {
          if (newVal !== undefined) currentPage.value = newVal;
        },
      );
      const handleNavigate = (pageNum: number) => {
        currentPage.value = pageNum;
      };
      const { modelValue: _, ...restArgs } = args;
      return { restArgs, currentPage, handleNavigate };
    },
    template: `
      <div>
        <p>Current page: {{ currentPage }} of {{ args.totalPages }}</p>
        <CdrPagination 
          v-bind="restArgs"
          v-model="currentPage"
          @navigate="handleNavigate"
        />
      </div>
    `,
  }),
};

export const MiddlePage: Story = {
  args: {
    pages: generatePages(20),
    totalPages: 20,
    modelValue: 10,
  },
  render: (args) => ({
    components: { CdrPagination },
    setup() {
      const currentPage = ref(args.modelValue || 1);
      watch(
        () => args.modelValue,
        (newVal) => {
          if (newVal !== undefined) currentPage.value = newVal;
        },
      );
      const handleNavigate = (pageNum: number) => {
        currentPage.value = pageNum;
      };
      const { modelValue: _, ...restArgs } = args;
      return { restArgs, currentPage, handleNavigate };
    },
    template: `
      <div>
        <p>Current page: {{ currentPage }}</p>
        <CdrPagination 
          v-bind="restArgs"
          v-model="currentPage"
          @navigate="handleNavigate"
        />
      </div>
    `,
  }),
};

export const LastPage: Story = {
  args: {
    pages: generatePages(15),
    totalPages: 15,
    modelValue: 15,
  },
  render: (args) => ({
    components: { CdrPagination },
    setup() {
      const currentPage = ref(args.modelValue || 1);
      watch(
        () => args.modelValue,
        (newVal) => {
          if (newVal !== undefined) currentPage.value = newVal;
        },
      );
      const handleNavigate = (pageNum: number) => {
        currentPage.value = pageNum;
      };
      const { modelValue: _, ...restArgs } = args;
      return { restArgs, currentPage, handleNavigate };
    },
    template: `
      <div>
        <p>Current page: {{ currentPage }}</p>
        <CdrPagination 
          v-bind="restArgs"
          v-model="currentPage"
          @navigate="handleNavigate"
        />
      </div>
    `,
  }),
};

export const WithButtons: Story = {
  args: {
    pages: generatePages(10),
    totalPages: 10,
    linkTag: 'button',
  },
  render: (args) => ({
    components: { CdrPagination },
    setup() {
      const currentPage = ref(1);
      watch(
        () => args.modelValue,
        (newVal) => {
          if (newVal !== undefined) currentPage.value = newVal;
        },
      );
      const handleNavigate = (pageNum: number, url: string, e: Event) => {
        e.preventDefault();
        currentPage.value = pageNum;
        console.log('Navigate to:', pageNum, url);
      };
      const { modelValue: _, ...restArgs } = args;
      return { restArgs, currentPage, handleNavigate };
    },
    template: `
      <div>
        <p>Current page: {{ currentPage }}</p>
        <CdrPagination 
          v-bind="restArgs"
          v-model="currentPage"
          @navigate="handleNavigate"
        />
      </div>
    `,
  }),
};
