import type { Meta, StoryObj } from '@storybook/vue3';
import { CdrLayout } from '../../lib';

const meta: Meta<typeof CdrLayout> = {
  title: 'Components/CdrLayout',
  component: CdrLayout,
  parameters: {
    docs: {
      description: {
        component:
          'Foundational container for creating structured layouts. Provides a CSS Grid-based layout system with responsive columns, rows, and gap controls.',
      },
    },
  },
  argTypes: {
    columns: {
      control: 'text',
      description: 'Determines the number of columns at various breakpoints',
    },
    rows: {
      control: 'text',
      description: 'Determines the number of rows at various breakpoints',
    },
    gap: {
      control: 'select',
      options: ['zero', 'one-x', 'two-x', 'scale-4', 'scale-3--5'],
      description: 'Specifies a gap based on the token options within Cedar',
    },
    rowGap: {
      control: 'select',
      options: ['zero', 'one-x', 'two-x', 'scale-4', 'scale-3--5'],
      description: 'Specifies a row gap based on the token options within Cedar',
    },
    columnGap: {
      control: 'select',
      options: ['zero', 'one-x', 'two-x', 'scale-4', 'scale-3--5'],
      description: 'Specifies a column gap based on the token options within Cedar',
    },
    flow: {
      control: 'select',
      options: ['row', 'column'],
      description: 'Specifies the auto-placement behavior',
    },
    flowValue: {
      control: 'text',
      description: 'Specifies how auto-generated tracks will be created',
    },
    queryType: {
      control: 'select',
      options: ['container', 'media'],
      description: 'Determines if the layout uses container or media queries',
    },
    as: {
      control: 'text',
      description: 'The component or HTML tag to render at the root level',
    },
  },
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
