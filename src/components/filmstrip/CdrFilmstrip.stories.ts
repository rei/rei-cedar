import type { Meta, StoryObj } from '@storybook/vue3';
import CdrFilmstrip from './CdrFilmstrip.vue';
import LifestyleExample from './examples/Lifestyle/Example.vue';
import ProductRecommendationExample from './examples/ProductRecommendation/Example.vue';

const meta: Meta = {
  title: 'Components/Filmstrip',
  component: CdrFilmstrip as unknown as NonNullable<Meta['component']>,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Filmstrip provides a shared horizontal-navigation engine. Adapters translate consumer models into frame components and responsive behavior.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Lifestyle',
  render: () => ({
    components: { LifestyleExample },
    template: '<LifestyleExample />',
  }),
  parameters: {
    docs: {
      description: {
        story:
          'The Lifestyle adapter opts in with `responsiveFrames: { xs: 2, md: 3, lg: framesVisible }`. Counts follow the container width.',
      },
    },
  },
};

export const ContainerBreakpoints: Story = {
  name: 'Container breakpoints',
  args: { containerWidth: 600 },
  argTypes: {
    containerWidth: { control: { type: 'range', min: 320, max: 1400, step: 1 } },
  },
  render: (args) => ({
    components: { LifestyleExample },
    setup: () => ({ args }),
    template:
      "<div :style=\"{ width: args.containerWidth + 'px', maxWidth: '100%' }\"><LifestyleExample /></div>",
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Change the container width while keeping the viewport fixed. The same xs, md, and lg counts size frames before measurement and drive navigation.',
      },
    },
  },
};

export const ProductRecommendations: Story = {
  render: () => ({
    components: { ProductRecommendationExample },
    template: '<ProductRecommendationExample />',
  }),
  parameters: {
    docs: {
      description: {
        story:
          'A product recommendation rail composed with a separate model, adapter, frame component, and local placeholder image.',
      },
    },
  },
};
