import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import CdrChip from './CdrChip.vue';
import CdrChipGroup from './CdrChipGroup.vue';
import { IconHeartStroke, IconHeartFill, IconXLg } from '../icon';

const meta: Meta<typeof CdrChip> = {
  title: 'Components/Chip',
  component: CdrChip,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CdrChip>;

export const Default: Story = {
  render: () => ({
    components: { CdrChip },
    template: '<CdrChip>Default Chip</CdrChip>',
  }),
};

export const DefaultLongText: Story = {
  render: () => ({
    components: { CdrChip },
    template: '<CdrChip>Very Long Default Chip Text Content</CdrChip>',
  }),
  parameters: {
    docs: {
      description: {
        story: 'Tests default chip with longer text content to ensure proper spacing and layout.',
      },
    },
  },
};

export const WithIconLeft: Story = {
  render: () => ({
    components: { CdrChip, IconHeartStroke },
    template: `
      <CdrChip>
        <template #icon-left>
          <IconHeartStroke inherit-color size="small" />
        </template>
        Favorite
      </CdrChip>
    `,
  }),
};

export const WithIconLeftLongText: Story = {
  render: () => ({
    components: { CdrChip, IconHeartStroke },
    template: `
      <CdrChip>
        <template #icon-left>
          <IconHeartStroke inherit-color size="small" />
        </template>
        Very Long Favorite Item Name
      </CdrChip>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Tests icon-left spacing with longer text content to ensure proper spacing between icon and text.',
      },
    },
  },
};

export const WithIconRight: Story = {
  render: () => ({
    components: { CdrChip, IconXLg },
    template: `
      <CdrChip>
        Filter
        <template #icon-right>
          <IconXLg inherit-color size="small" />
        </template>
      </CdrChip>
    `,
  }),
};

export const WithIconRightLongText: Story = {
  render: () => ({
    components: { CdrChip, IconXLg },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <CdrChip>
          Very Long Filter Name That Should Have Proper Spacing
          <template #icon-right>
            <IconXLg inherit-color size="small" />
          </template>
        </CdrChip>
        <CdrChip>
          Another Filter With Icon Right
          <template #icon-right>
            <IconXLg inherit-color size="small" />
          </template>
        </CdrChip>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'This example specifically tests icon-right spacing with longer text content. The icon should be properly spaced from the text without overlapping. This story would have exposed the v16→v17 render order issue where the CSS selector broke.',
      },
    },
  },
};

export const ToggleChip: Story = {
  render: () => ({
    components: { CdrChip, IconHeartStroke, IconHeartFill },
    setup() {
      const toggled = ref(false);
      return { toggled };
    },
    template: `
      <CdrChip
        @click="toggled = !toggled"
        :aria-pressed="toggled ? 'true' : 'false'"
      >
        <template #icon-left>
          <IconHeartStroke v-if="!toggled" inherit-color size="small" />
          <IconHeartFill v-else inherit-color size="small" />
        </template>
        {{ toggled ? 'Favorited' : 'Favorite' }}
      </CdrChip>
    `,
  }),
};

export const ToggleChipLongText: Story = {
  render: () => ({
    components: { CdrChip, IconHeartStroke, IconHeartFill },
    setup() {
      const toggled = ref(false);
      return { toggled };
    },
    template: `
      <CdrChip
        @click="toggled = !toggled"
        :aria-pressed="toggled ? 'true' : 'false'"
      >
        <template #icon-left>
          <IconHeartStroke v-if="!toggled" inherit-color size="small" />
          <IconHeartFill v-else inherit-color size="small" />
        </template>
        {{ toggled ? 'Very Long Favorited Item Name' : 'Very Long Favorite Item Name' }}
      </CdrChip>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Tests toggle chip with longer text content to ensure proper spacing and icon positioning during state changes.',
      },
    },
  },
};

export const FilterChip: Story = {
  render: () => ({
    components: { CdrChip, IconXLg },
    setup() {
      const filters = ref(['Hiking', 'Camping', 'Backpacking']);
      const removeFilter = (index: number) => {
        filters.value.splice(index, 1);
      };
      return { filters, removeFilter };
    },
    template: `
      <div>
        <p style="margin-bottom: 12px; color: #666;">Active Filters:</p>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <CdrChip
            v-for="(filter, index) in filters"
            :key="filter"
            @click="removeFilter(index)"
            aria-pressed="true"
          >
            {{ filter }}
            <template #icon-right>
              <IconXLg size="small" inherit-color />
            </template>
          </CdrChip>
        </div>
        <p v-if="filters.length === 0" style="margin-top: 12px; color: #999;">
          No active filters
        </p>
      </div>
    `,
  }),
};

export const FilterChipLongText: Story = {
  render: () => ({
    components: { CdrChip, IconXLg },
    setup() {
      const filters = ref([
        'Very Long Hiking Activity Name',
        'Extended Camping Experience',
        'Backpacking Adventure Trip',
      ]);
      const removeFilter = (index: number) => {
        filters.value.splice(index, 1);
      };
      return { filters, removeFilter };
    },
    template: `
      <div>
        <p style="margin-bottom: 12px; color: #666;">Active Filters (Long Text):</p>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <CdrChip
            v-for="(filter, index) in filters"
            :key="filter"
            @click="removeFilter(index)"
            aria-pressed="true"
          >
            {{ filter }}
            <template #icon-right>
              <IconXLg size="small" inherit-color />
            </template>
          </CdrChip>
        </div>
        <p v-if="filters.length === 0" style="margin-top: 12px; color: #999;">
          No active filters
        </p>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Tests filter chips with longer text content and icon-right to ensure proper spacing and prevent overlap issues.',
      },
    },
  },
};

export const ChipGroupRadio: Story = {
  render: () => ({
    components: { CdrChipGroup, CdrChip },
    setup() {
      const months = ['January', 'February', 'March', 'April', 'May', 'June'];
      const selectedMonth = ref('March');
      const selectMonth = (month: string) => {
        selectedMonth.value = month;
      };
      return { months, selectedMonth, selectMonth };
    },
    template: `
      <div>
        <CdrChipGroup label="Pick One Month">
          <CdrChip
            v-for="(month, i) in months"
            :key="month"
            @click="selectMonth(month)"
            :disabled="i === 4"
            :aria-checked="selectedMonth === month ? 'true' : 'false'"
            role="radio"
            :tabindex="selectedMonth === month ? '0' : '-1'"
          >
            {{ month }}
          </CdrChip>
        </CdrChipGroup>
        <p style="margin-top: 16px; color: #666;">Selected: {{ selectedMonth }}</p>
      </div>
    `,
  }),
};

export const ChipGroupCheckbox: Story = {
  render: () => ({
    components: { CdrChipGroup, CdrChip },
    setup() {
      const months = ['January', 'February', 'March', 'April', 'May', 'June'];
      const selectedMonths = ref<string[]>(['February', 'April']);
      const selectMonths = (month: string) => {
        const index = selectedMonths.value.indexOf(month);
        if (index > -1) {
          selectedMonths.value.splice(index, 1);
        } else {
          selectedMonths.value.push(month);
        }
      };
      return { months, selectedMonths, selectMonths };
    },
    template: `
      <div>
        <CdrChipGroup label="Pick As Many Months As You Like">
          <CdrChip
            v-for="(month, i) in months"
            :key="month"
            @click="selectMonths(month)"
            :disabled="i === 3"
            :aria-checked="selectedMonths.includes(month) ? 'true' : 'false'"
            role="checkbox"
          >
            {{ month }}
          </CdrChip>
        </CdrChipGroup>
        <p style="margin-top: 16px; color: #666;">
          Selected: {{ selectedMonths.length > 0 ? selectedMonths.join(', ') : 'None' }}
        </p>
      </div>
    `,
  }),
};

export const DisabledChip: Story = {
  render: () => ({
    components: { CdrChip },
    template: '<CdrChip disabled>Disabled Chip</CdrChip>',
  }),
};

export const DisabledChipLongText: Story = {
  render: () => ({
    components: { CdrChip },
    template: '<CdrChip disabled>Very Long Disabled Chip Text Content</CdrChip>',
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Tests disabled chip with longer text content to ensure proper spacing and disabled state rendering.',
      },
    },
  },
};

export const MultipleChips: Story = {
  render: () => ({
    components: { CdrChip, IconHeartStroke },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <CdrChip>Hiking</CdrChip>
        <CdrChip>Camping</CdrChip>
        <CdrChip>Backpacking</CdrChip>
        <CdrChip>Climbing</CdrChip>
        <CdrChip>
          <template #icon-left>
            <IconHeartStroke inherit-color size="small" />
          </template>
          Favorites
        </CdrChip>
      </div>
    `,
  }),
};

export const MultipleChipsLongText: Story = {
  render: () => ({
    components: { CdrChip, IconHeartStroke },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <CdrChip>Extended Hiking Activity</CdrChip>
        <CdrChip>Camping Experience Weekend</CdrChip>
        <CdrChip>Backpacking Adventure Trip</CdrChip>
        <CdrChip>Rock Climbing Course</CdrChip>
        <CdrChip>
          <template #icon-left>
            <IconHeartStroke inherit-color size="small" />
          </template>
          Favorite Activities List
        </CdrChip>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Tests multiple chips with longer text content to ensure proper spacing and layout in flex containers.',
      },
    },
  },
};

export const BothIconsLongText: Story = {
  render: () => ({
    components: { CdrChip, IconHeartStroke, IconXLg },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <CdrChip>
          <template #icon-left>
            <IconHeartStroke inherit-color size="small" />
          </template>
          Very Long Chip With Both Icons
          <template #icon-right>
            <IconXLg inherit-color size="small" />
          </template>
        </CdrChip>
        <CdrChip>
          <template #icon-left>
            <IconHeartStroke inherit-color size="small" />
          </template>
          Another Long Text Example
          <template #icon-right>
            <IconXLg inherit-color size="small" />
          </template>
        </CdrChip>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Tests chips with both icon-left and icon-right using longer text to ensure spacing works correctly in both directions. This would have exposed spacing issues in either icon position.',
      },
    },
  },
};
