import type { Meta, StoryObj } from '@storybook/vue3';
import CdrBreadcrumb from './CdrBreadcrumb.vue';
import type { BreadcrumbItem } from '../../types/interfaces';

const meta: Meta<typeof CdrBreadcrumb> = {
  title: 'Components/Breadcrumb',
  component: CdrBreadcrumb,
  tags: ['autodocs'],
  args: {
    truncationEnabled: true,
  },
};

export default meta;
type Story = StoryObj<typeof CdrBreadcrumb>;

const shortBreadcrumbItems: BreadcrumbItem[] = [
  {
    item: {
      url: 'http://google.com',
      name: 'Item 1',
    },
  },
  {
    item: {
      url: 'http://rei.com',
      name: 'Item 2',
    },
  },
];

const averageBreadcrumbItems: BreadcrumbItem[] = [
  {
    item: {
      url: 'http://google.com',
      name: 'Breadcrumb 1',
    },
  },
  {
    item: {
      url: 'http://rei.com',
      name: 'Longer Breadcrumb 2',
    },
  },
  {
    item: {
      url: 'http://yahoo.com',
      name: 'Breadcrumb 3',
    },
  },
  {
    item: {
      url: 'http://bing.com',
      name: 'Really Really Long Breadcrumb 4',
    },
  },
  {
    item: {
      url: 'http://bing.com',
      name: 'Breadcrumb 5',
    },
  },
];

const superLongBreadcrumbItems: BreadcrumbItem[] = [
  {
    item: {
      url: 'http://google.com',
      name: 'Long Breadcrumb Item 1',
    },
  },
  {
    item: {
      url: 'http://rei.com',
      name: 'Super Long Breadcrumb Item 2',
    },
  },
  {
    item: {
      url: 'http://yahoo.com',
      name: 'Super Really Long Breadcrumb Item 3',
    },
  },
];

const reiExampleBreadcrumbItems: BreadcrumbItem[] = [
  {
    item: {
      url: 'http://rei.com',
      name: 'Clothing',
    },
  },
  {
    item: {
      url: 'http://rei.com',
      name: 'Clothing Accessories',
    },
  },
  {
    item: {
      url: 'http://rei.com',
      name: 'Gloves and Mittens',
    },
  },
  {
    item: {
      url: 'http://rei.com',
      name: 'Gloves',
    },
  },
  {
    item: {
      url: 'http://rei.com',
      name: 'Snowsports Gloves',
    },
  },
  {
    item: {
      url: 'http://rei.com',
      name: 'Cross-Country Ski Gloves',
    },
  },
  {
    item: {
      url: 'http://rei.com',
      name: "Women's Cross-Country Ski Gloves",
    },
  },
];

/**
 * Two-item breadcrumb - no truncation occurs
 */
export const TwoItem: Story = {
  args: {
    items: shortBreadcrumbItems,
    id: 'two-item-breadcrumb',
  },
  render: (args) => ({
    components: { CdrBreadcrumb },
    setup() {
      return { args };
    },
    template: '<CdrBreadcrumb v-bind="args" />',
  }),
};

/**
 * Three-item breadcrumb - shows truncation feature
 */
export const ThreeItem: Story = {
  args: {
    items: superLongBreadcrumbItems,
    id: 'three-item-breadcrumb',
  },
  render: (args) => ({
    components: { CdrBreadcrumb },
    setup() {
      return { args };
    },
    template: '<CdrBreadcrumb v-bind="args" />',
  }),
};

/**
 * Five-item breadcrumb with ellipsis truncation
 */
export const WithEllipsis: Story = {
  args: {
    items: averageBreadcrumbItems,
    truncationEnabled: true,
    id: 'ellipsis-breadcrumb',
  },
  render: (args) => ({
    components: { CdrBreadcrumb },
    setup() {
      return { args };
    },
    template: '<CdrBreadcrumb v-bind="args" />',
  }),
};

/**
 * Long breadcrumb trail based on REI.com example
 */
export const LongestBreadcrumb: Story = {
  args: {
    items: reiExampleBreadcrumbItems,
    id: 'longest-breadcrumb',
  },
  render: (args) => ({
    components: { CdrBreadcrumb },
    setup() {
      return { args };
    },
    template: '<CdrBreadcrumb v-bind="args" />',
  }),
};

/**
 * Breadcrumb with navigation event handling
 */
export const WithNavigateEvent: Story = {
  args: {
    items: shortBreadcrumbItems,
    id: 'navigate-event-breadcrumb',
  },
  render: (args) => ({
    components: { CdrBreadcrumb },
    setup() {
      const handleNavigate = (breadcrumb: BreadcrumbItem, event: MouseEvent) => {
        event.preventDefault();
        console.log('Navigated to:', breadcrumb.item);
        alert(`Navigated to: ${breadcrumb.item.name}`);
      };

      return { args, handleNavigate };
    },
    template: '<CdrBreadcrumb v-bind="args" @navigate="handleNavigate" />',
  }),
};

/**
 * Breadcrumb without truncation enabled
 */
export const WithoutTruncation: Story = {
  args: {
    items: averageBreadcrumbItems,
    truncationEnabled: false,
    id: 'no-truncation-breadcrumb',
  },
  render: (args) => ({
    components: { CdrBreadcrumb },
    setup() {
      return { args };
    },
    template: '<CdrBreadcrumb v-bind="args" />',
  }),
};
