import type { Meta, StoryObj } from '@storybook/vue3';
import CdrFilmstrip from './CdrFilmstrip.vue';
import LifestyleExample from './examples/Lifestyle/Example.vue';
import ProductRecommendationExample from './examples/ProductRecommendation/Example.vue';
import CustomDataExample from './examples/CustomData/Example.vue';
import CustomFrame from './examples/CustomData/CustomFrame.vue';
import customAdapter from './examples/CustomData/custom-adapter';

const meta: Meta = {
  title: 'Components/Filmstrip',
  component: CdrFilmstrip as unknown as NonNullable<Meta['component']>,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Filmstrip provides a shared horizontal-navigation engine. Use an adapter to translate your data into frame components. See the "Custom data pattern" story for a step-by-step guide on how to use adapters.',
      },
    },
  },
  argTypes: {
    adapter: {
      table: {
        disable: true,
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
  args: {
    item1Name: 'Product A',
    item1Value: 100,
    item2Name: 'Product B',
    item2Value: 200,
    item3Name: 'Product C',
    item3Value: 300,
  },
  argTypes: {
    item1Name: {
      control: 'text',
      description: '👉 Try changing this to "Hiking Boots"',
    },
    item1Value: {
      control: { type: 'range', min: 50, max: 500, step: 10 },
      description: '👉 Try changing this to 150',
    },
    item2Name: {
      control: 'text',
      description: 'Name of the second item',
    },
    item2Value: {
      control: { type: 'range', min: 50, max: 500, step: 10 },
      description: 'Value of the second item',
    },
    item3Name: {
      control: 'text',
      description: 'Name of the third item',
    },
    item3Value: {
      control: { type: 'range', min: 50, max: 500, step: 10 },
      description: 'Value of the third item',
    },
  },
  render: (args) => {
    const items = [
      { id: 1, name: args.item1Name, value: args.item1Value },
      { id: 2, name: args.item2Name, value: args.item2Value },
      { id: 3, name: args.item3Name, value: args.item3Value },
    ];

    const customModel = {
      title: 'Product Catalog',
      items,
    };

    const adapter = (model: typeof customModel) => ({
      component: CustomFrame,
      frames: model.items.map((item) => ({
        key: `custom-item-${item.id}`,
        props: {
          name: item.name,
          value: item.value,
        },
      })),
      filmstripId: 'custom-data',
      description: model.title,
      framesGap: 12,
      responsiveFrames: { xs: 1, sm: 2, md: 3, lg: 3 },
      focusSelector: '[data-focus]',
    });

    return {
      components: { CdrFilmstrip },
      setup: () => ({ customModel, adapter }),
      template: '<CdrFilmstrip :model="customModel" :adapter="adapter" />',
    };
  },
  parameters: {
    docs: {
      description: {
        story:
          '**What is an adapter?**\n\nAn adapter is a function that converts data from one format to another. Think of it like a travel adapter - it converts your plug to fit the wall outlet.\n\n**Why use an adapter?**\n\n- Your app has data in its own format (e.g., products with IDs, names, prices)\n- Cedar Filmstrip needs data in a different format (frames with keys and props)\n- The adapter converts your data into Cedar\'s format\n- This keeps your data unchanged and lets you control how it maps to Cedar\n\n**How it works:**\n\n1. Define your data model (the structure your app uses)\n2. Create an adapter function that maps each item to a "frame"\n3. Each frame needs a unique key (Vue uses this to track items)\n4. Each frame has props (the data your frame component needs)\n5. The adapter returns configuration (how many items to show, spacing, etc.)\n\n**Real-world integration example:**\n\nIf this were the product page, here\'s how you would use it:\n\n```vue\n<!-- src/views/ProductPage.vue -->\n<template>\n  <CdrFilmstrip :model="products" :adapter="productAdapter" />\n</template>\n\n<script setup lang="ts">\nimport CdrFilmstrip from \'@rei/cedar-vue\';\nimport productAdapter from \'./adapters/productAdapter\';\nimport { useProducts } from \'./composables/useProducts\';\n\n// Your app\'s data (from API, state, etc.)\nconst products = useProducts();\n</script>\n```\n\n```typescript\n// src/views/adapters/productAdapter.ts\nimport type { CdrFilmstripAdapter } from \'@rei/cedar-vue\';\nimport ProductFrame from \'./ProductFrame.vue\';\n\nexport const productAdapter: CdrFilmstripAdapter = (model) => ({\n  component: ProductFrame,\n  frames: model.items.map((product) => ({\n    key: product.id,\n    props: {\n      name: product.name,\n      price: product.price,\n      image: product.imageUrl,\n    },\n  })),\n  filmstripId: \'products\',\n  description: \'Featured Products\',\n  framesGap: 12,\n  responsiveFrames: { xs: 1, sm: 2, md: 3, lg: 4 },\n});\n```\n\n**Key points:**\n\n- The adapter lives in your app (not in Cedar)\n- Your component imports the adapter and passes it to CdrFilmstrip\n- Your data stays in your app\'s format\n- Cedar doesn\'t need to know about your data structure\n\n**Interactive example:**\n\n👉 Use the controls to change the item names and values. Watch how the adapter transforms your data into Cedar\'s frame structure in real-time.\n\n**See the code files for detailed step-by-step comments:**\n\n- `src/components/filmstrip/examples/CustomData/types.ts` - Explains what a data model is and why we need an adapter\n- `src/components/filmstrip/examples/CustomData/custom-adapter.ts` - Shows the adapter implementation with line-by-line comments\n- `src/components/filmstrip/examples/CustomData/Example.vue` - Shows how to use the adapter with your data\n- `src/components/filmstrip/examples/CustomData/CustomFrame.vue` - The frame component that renders each item',
      },
    },
  },
};

export const CustomDataPlayground: Story = {
  name: 'Custom data playground',
  args: {
    item1Name: 'Product A',
    item1Value: 100,
    item2Name: 'Product B',
    item2Value: 200,
    item3Name: 'Product C',
    item3Value: 300,
  },
  argTypes: {
    item1Name: {
      control: 'text',
      description: '👉 Try changing this to "Hiking Boots"',
    },
    item1Value: {
      control: { type: 'range', min: 50, max: 500, step: 10 },
      description: '👉 Try changing this to 150',
    },
    item2Name: {
      control: 'text',
      description: 'Name of the second item',
    },
    item2Value: {
      control: { type: 'range', min: 50, max: 500, step: 10 },
      description: 'Value of the second item',
    },
    item3Name: {
      control: 'text',
      description: 'Name of the third item',
    },
    item3Value: {
      control: { type: 'range', min: 50, max: 500, step: 10 },
      description: 'Value of the third item',
    },
  },
  render: (args) => {
    // Build data from args
    const items = [
      { id: 1, name: args.item1Name, value: args.item1Value },
      { id: 2, name: args.item2Name, value: args.item2Value },
      { id: 3, name: args.item3Name, value: args.item3Value },
    ];

    const customModel = {
      title: 'Product Catalog',
      items,
    };

    const adapter = (model: typeof customModel) => {
      const frames = model.items.map((item) => ({
        key: `custom-item-${item.id}`,
        props: {
          name: item.name,
          value: item.value,
        },
      }));

      return {
        component: CustomFrame,
        frames,
        filmstripId: 'custom-playground',
        description: model.title,
        framesGap: 12,
        responsiveFrames: { xs: 1, sm: 2, md: 3, lg: 3 },
        focusSelector: '[data-focus]',
      };
    };

    return {
      components: { CdrFilmstrip },
      setup: () => ({ customModel, adapter }),
      template: '<CdrFilmstrip :model="customModel" :adapter="adapter" />',
    };
  },
  parameters: {
    docs: {
      description: {
        story:
          '**Interactive Playground**\n\n**Your task:**\n\n1. 👉 Change "Product A" to "Hiking Boots"\n2. 👉 Change the value to 150\n3. Watch how the adapter transforms your data\n\n**What you\'ll learn:**\n\n- The adapter takes your data (Product A, 100) and converts it to a frame\n- Each frame gets a unique key (custom-item-1)\n- The frame component receives the props (name, value)\n- The filmstrip renders with your data\n\n**Try it:**\n\nUse the controls to modify the item names and values. See how the adapter pattern transforms your data into Cedar\'s frame structure in real-time.',
      },
    },
  },
};
