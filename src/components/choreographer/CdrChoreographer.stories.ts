import type { Meta, StoryObj } from '@storybook/vue3';
import CdrChoreographer from './CdrChoreographer.vue';

const meta: Meta<typeof CdrChoreographer> = {
  title: 'Components/Choreographer',
  component: CdrChoreographer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CdrChoreographer>;

export const Default: Story = {
  render: () => ({
    components: { CdrChoreographer },
    setup() {
      const schema = [
        {
          type: 'kicker',
          content: 'Skills',
        },
        {
          type: 'title',
          props: { tag: 'h2' },
          content: 'Running nutrition basics',
        },
        {
          type: 'abstract',
          content:
            'Fueling well is the key to longevity and improvement in running. Our experts guide you on filling your plate for your goals.',
        },
      ];
      return { schema };
    },
    template: '<CdrChoreographer :schema="schema" />',
  }),
};

export const WithImage: Story = {
  render: () => ({
    components: { CdrChoreographer },
    setup() {
      const schema = [
        {
          type: 'image',
          props: {
            alt: 'Outdoor landscape',
            src: 'https://www.rei.com/dam/gerlach_090622_0135_web_lg.jpeg?t=ea16by9md',
            responsive: true,
            cover: true,
          },
        },
        {
          type: 'kicker',
          content: 'Adventure',
        },
        {
          type: 'title',
          props: { tag: 'h3' },
          content: 'Explore the outdoors',
        },
        {
          type: 'abstract',
          content: 'Discover amazing trails and scenic views on your next outdoor adventure.',
        },
      ];
      return { schema };
    },
    template: '<div style="max-width: 550px;"><CdrChoreographer :schema="schema" /></div>',
  }),
};
