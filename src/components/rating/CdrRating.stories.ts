import type { Meta, StoryObj } from '@storybook/vue3';
import CdrRating from './CdrRating.vue';

const meta: Meta<typeof CdrRating> = {
  title: 'Components/Rating',
  component: CdrRating,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rating: 3.7,
    count: 142,
  },
};

export const Small: Story = {
  args: {
    rating: 4.5,
    count: 89,
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    rating: 3.2,
    count: 256,
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    rating: 4.8,
    count: 1024,
    size: 'large',
  },
};

export const Compact: Story = {
  args: {
    rating: 4.0,
    count: 42,
    compact: true,
  },
};

export const WithLink: Story = {
  args: {
    rating: 3.5,
    count: 78,
    href: '#reviews',
  },
};

export const NoCount: Story = {
  args: {
    rating: 4.2,
  },
};

export const NoReviews: Story = {
  args: {
    rating: 0,
    count: 0,
  },
};

export const FullRating: Story = {
  args: {
    rating: 5.0,
    count: 500,
  },
};

export const QuarterStars: Story = {
  render: () => ({
    components: { CdrRating },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <CdrRating :rating="0.25" count="1" />
        <CdrRating :rating="1.5" count="10" />
        <CdrRating :rating="2.75" count="25" />
        <CdrRating :rating="3.25" count="50" />
        <CdrRating :rating="4.5" count="100" />
      </div>
    `,
  }),
};
