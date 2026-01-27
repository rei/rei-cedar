import type { Meta, StoryObj } from '@storybook/vue3';
import { CdrLayout } from '../../lib';

const meta: Meta<typeof CdrLayout> = {
  title: 'Components/CdrLayout',
  component: CdrLayout,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CdrLayout>;

const Box = ({ color = '#0067A0', height = '100px' }: any) => `
  <div style="background: ${color}; border-radius: 4px; padding: 16px; color: white; display: flex; align-items: center; justify-content: center; min-height: ${height};">
    Item
  </div>
`;

export const Default = {
  args: {
    columns: '3',
    gap: 'one-x',
  },
  render: (args: any) => ({
    components: { CdrLayout },
    setup() {
      return { args, Box };
    },
    template: `
      <CdrLayout v-bind="args">
        ${Box({})}
        ${Box({ color: '#00A3AD' })}
        ${Box({ color: '#78BE20' })}
        ${Box({ color: '#0067A0' })}
        ${Box({ color: '#00A3AD' })}
        ${Box({ color: '#78BE20' })}
      </CdrLayout>
    `,
  }),
};

export const TwoColumns: Story = {
  args: {
    columns: '2',
    gap: 'two-x',
  },
  render: (args: any) => ({
    components: { CdrLayout },
    setup() {
      return { args };
    },
    template: `
      <CdrLayout v-bind="args">
        ${Box({})}
        ${Box({ color: '#00A3AD' })}
        ${Box({ color: '#78BE20' })}
        ${Box({ color: '#0067A0' })}
      </CdrLayout>
    `,
  }),
};

export const FourColumns: Story = {
  args: {
    columns: '4',
    gap: 'one-x',
  },
  render: (args: any) => ({
    components: { CdrLayout },
    setup() {
      return { args };
    },
    template: `
      <CdrLayout v-bind="args">
        ${Box({})}
        ${Box({ color: '#00A3AD' })}
        ${Box({ color: '#78BE20' })}
        ${Box({ color: '#E94E1B' })}
        ${Box({ color: '#0067A0' })}
        ${Box({ color: '#00A3AD' })}
        ${Box({ color: '#78BE20' })}
        ${Box({ color: '#E94E1B' })}
      </CdrLayout>
    `,
  }),
};

export const CustomColumnSizes: Story = {
  args: {
    columns: '1fr 2fr 1fr',
    gap: 'one-x',
  },
  render: (args: any) => ({
    components: { CdrLayout },
    setup() {
      return { args };
    },
    template: `
      <CdrLayout v-bind="args">
        ${Box({})}
        ${Box({ color: '#00A3AD' })}
        ${Box({ color: '#78BE20' })}
      </CdrLayout>
    `,
  }),
};

export const WithRowsAndColumns: Story = {
  args: {
    columns: '3',
    rows: '2',
    gap: 'one-x',
  },
  render: (args: any) => ({
    components: { CdrLayout },
    setup() {
      return { args };
    },
    template: `
      <CdrLayout v-bind="args">
        ${Box({})}
        ${Box({ color: '#00A3AD' })}
        ${Box({ color: '#78BE20' })}
        ${Box({ color: '#E94E1B' })}
        ${Box({ color: '#0067A0' })}
        ${Box({ color: '#00A3AD' })}
      </CdrLayout>
    `,
  }),
};

export const DifferentGaps: Story = {
  args: {
    columns: '3',
    rowGap: 'two-x',
    columnGap: 'one-x',
  },
  render: (args: any) => ({
    components: { CdrLayout },
    setup() {
      return { args };
    },
    template: `
      <CdrLayout v-bind="args">
        ${Box({})}
        ${Box({ color: '#00A3AD' })}
        ${Box({ color: '#78BE20' })}
        ${Box({ color: '#E94E1B' })}
        ${Box({ color: '#0067A0' })}
        ${Box({ color: '#00A3AD' })}
      </CdrLayout>
    `,
  }),
};

export const AutoFlow: Story = {
  args: {
    columns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: 'one-x',
  },
  render: (args: any) => ({
    components: { CdrLayout },
    setup() {
      return { args };
    },
    template: `
      <CdrLayout v-bind="args">
        ${Box({})}
        ${Box({ color: '#00A3AD' })}
        ${Box({ color: '#78BE20' })}
        ${Box({ color: '#E94E1B' })}
        ${Box({ color: '#0067A0' })}
      </CdrLayout>
    `,
  }),
};

export const ResponsiveColumns: Story = {
  args: {
    columns: { xs: '1', sm: '2', md: '3', lg: '4' },
    gap: 'one-x',
  },
  render: (args: any) => ({
    components: { CdrLayout },
    setup() {
      return { args };
    },
    template: `
      <CdrLayout v-bind="args">
        ${Box({})}
        ${Box({ color: '#00A3AD' })}
        ${Box({ color: '#78BE20' })}
        ${Box({ color: '#E94E1B' })}
        ${Box({ color: '#0067A0' })}
        ${Box({ color: '#00A3AD' })}
        ${Box({ color: '#78BE20' })}
        ${Box({ color: '#E94E1B' })}
      </CdrLayout>
    `,
  }),
};

export const AsSection: Story = {
  args: {
    columns: '2',
    gap: 'two-x',
    as: 'section',
  },
  render: (args: any) => ({
    components: { CdrLayout },
    setup() {
      return { args };
    },
    template: `
      <CdrLayout v-bind="args">
        ${Box({})}
        ${Box({ color: '#00A3AD' })}
        ${Box({ color: '#78BE20' })}
        ${Box({ color: '#0067A0' })}
      </CdrLayout>
    `,
  }),
};
