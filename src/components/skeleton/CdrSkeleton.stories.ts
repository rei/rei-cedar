import type { Meta, StoryObj } from '@storybook/vue3';
import CdrSkeleton from './CdrSkeleton.vue';
import CdrSkeletonBone from './CdrSkeletonBone.vue';

const meta: Meta<typeof CdrSkeleton> = {
  title: 'Components/Skeleton',
  component: CdrSkeleton,
  tags: ['autodocs'],
  argTypes: {
    motion: {
      control: 'boolean',
      description: 'Toggle animation on/off',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { CdrSkeleton, CdrSkeletonBone },
    setup() {
      return { args };
    },
    template: `
      <CdrSkeleton v-bind="args">
        <CdrSkeletonBone type="heading" />
        <CdrSkeletonBone type="line" />
        <CdrSkeletonBone type="line" />
        <CdrSkeletonBone type="line" />
      </CdrSkeleton>
    `,
  }),
  args: {
    motion: true,
  },
};

export const NoMotion: Story = {
  render: (args) => ({
    components: { CdrSkeleton, CdrSkeletonBone },
    setup() {
      return { args };
    },
    template: `
      <CdrSkeleton v-bind="args">
        <CdrSkeletonBone type="heading" />
        <CdrSkeletonBone type="line" />
        <CdrSkeletonBone type="line" />
      </CdrSkeleton>
    `,
  }),
  args: {
    motion: false,
  },
};

export const BoneTypes: Story = {
  render: () => ({
    components: { CdrSkeleton, CdrSkeletonBone },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h3>Default</h3>
          <CdrSkeleton>
            <CdrSkeletonBone type="default" />
          </CdrSkeleton>
        </div>
        
        <div>
          <h3>Heading</h3>
          <CdrSkeleton>
            <CdrSkeletonBone type="heading" />
          </CdrSkeleton>
        </div>
        
        <div>
          <h3>Line</h3>
          <CdrSkeleton>
            <CdrSkeletonBone type="line" />
          </CdrSkeleton>
        </div>
        
        <div>
          <h3>Rectangle</h3>
          <CdrSkeleton>
            <CdrSkeletonBone type="rectangle" />
          </CdrSkeleton>
        </div>
        
        <div>
          <h3>Square</h3>
          <CdrSkeleton>
            <CdrSkeletonBone type="square" />
          </CdrSkeleton>
        </div>
      </div>
    `,
  }),
};

export const CardLayout: Story = {
  render: (args) => ({
    components: { CdrSkeleton, CdrSkeletonBone },
    setup() {
      return { args };
    },
    template: `
      <CdrSkeleton v-bind="args">
        <CdrSkeletonBone type="square" />
        <CdrSkeletonBone type="heading" />
        <CdrSkeletonBone type="line" />
        <CdrSkeletonBone type="line" />
        <CdrSkeletonBone type="line" />
      </CdrSkeleton>
    `,
  }),
  args: {
    motion: true,
  },
};

export const MultipleCards: Story = {
  render: (args) => ({
    components: { CdrSkeleton, CdrSkeletonBone },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
        <CdrSkeleton v-bind="args">
          <CdrSkeletonBone type="rectangle" />
          <CdrSkeletonBone type="heading" />
          <CdrSkeletonBone type="line" />
        </CdrSkeleton>
        
        <CdrSkeleton v-bind="args">
          <CdrSkeletonBone type="rectangle" />
          <CdrSkeletonBone type="heading" />
          <CdrSkeletonBone type="line" />
        </CdrSkeleton>
        
        <CdrSkeleton v-bind="args">
          <CdrSkeletonBone type="rectangle" />
          <CdrSkeletonBone type="heading" />
          <CdrSkeletonBone type="line" />
        </CdrSkeleton>
      </div>
    `,
  }),
  args: {
    motion: true,
  },
};
