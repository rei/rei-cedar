import type { Meta, StoryObj } from '@storybook/vue3';
import CdrFilmstrip from './CdrFilmstrip.vue';
import LifestyleExample from './examples/Lifestyle/Example.vue';
import ProductRecommendationExample from './examples/ProductRecommendation/Example.vue';
import CustomDataExample from './examples/CustomData/Example.vue';

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

export const CustomData: Story = {
  name: 'Custom data pattern',
  render: () => ({
    components: { CustomDataExample },
    template: '<CustomDataExample />',
  }),
  parameters: {
    docs: {
      description: {
        story:
          '**What is an adapter?**\n\nAn adapter is a function that converts data from one format to another. Think of it like a travel adapter - it converts your plug to fit the wall outlet.\n\n**Why use an adapter?**\n\n- Your app has data in its own format (e.g., products with IDs, names, prices)\n- Cedar Filmstrip needs data in a different format (frames with keys and props)\n- The adapter converts your data into Cedar\'s format\n- This keeps your data unchanged and lets you control how it maps to Cedar\n\n**How it works:**\n\n1. Define your data model (the structure your app uses)\n2. Create an adapter function that maps each item to a "frame"\n3. Each frame needs a unique key (Vue uses this to track items)\n4. Each frame has props (the data your frame component needs)\n5. The adapter returns configuration (how many items to show, spacing, etc.)\n\n**See the code files for detailed step-by-step comments:**\n- `types.ts` - Explains what a data model is\n- `custom-adapter.ts` - Shows the adapter implementation with line-by-line comments\n- `Example.vue` - Shows how to use the adapter with your data',
      },
    },
  },
};
