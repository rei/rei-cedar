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
  args: { containerWidth: 600, xs: 2, sm: 2, md: 3, lg: 4 },
  argTypes: {
    containerWidth: { control: { type: 'range', min: 320, max: 1400, step: 1 } },
    xs: { control: { type: 'range', min: 1, max: 6, step: 1 } },
    sm: { control: { type: 'range', min: 1, max: 6, step: 1 } },
    md: { control: { type: 'range', min: 1, max: 6, step: 1 } },
    lg: { control: { type: 'range', min: 1, max: 6, step: 1 } },
  },
  render: (args) => ({
    components: { LifestyleExample },
    setup: () => ({ args }),
    template:
      '<div :style="{ width: args.containerWidth + \'px\', maxWidth: \'100%\' }"><LifestyleExample :responsive-frames="{ xs: args.xs, sm: args.sm, md: args.md, lg: args.lg }" /></div>',
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Change the container width and the xs, sm, md, or lg frame counts. The layout and navigation use the same values.',
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
