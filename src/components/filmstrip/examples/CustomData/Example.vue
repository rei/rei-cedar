<template>
  <CdrFilmstrip
    class="custom-data-filmstrip"
    :model="customModelData"
    :adapter="customAdapter"
    @frame-click="onFrameClick"
    @arrow-click="onArrowClick"
  />
</template>

<script setup lang="ts">
import CdrFilmstrip from '../../CdrFilmstrip.vue';
import type { CdrFilmstripAdapter, CdrFilmstripConfig, CdrFilmstripFrame } from '../../interfaces';
import FrameComponent from './CustomFrame.vue';

// Custom model - this represents your application's data structure
interface CustomItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

interface CustomModel {
  items: CustomItem[];
  framesVisible: number;
}

// Custom frame props - what your frame component needs
interface CustomFrameProps {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

// Example custom data - replace this with your actual data
const customModelData: CustomModel = {
  items: [
    {
      id: '1',
      title: 'Hiking Boots',
      description: 'Waterproof and comfortable for long trails',
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
      category: 'Footwear',
    },
    {
      id: '2',
      title: 'Backpack',
      description: '60L capacity with rain cover',
      imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
      category: 'Gear',
    },
    {
      id: '3',
      title: 'Tent',
      description: '3-person, 4-season tent',
      imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop',
      category: 'Shelter',
    },
    {
      id: '4',
      title: 'Sleeping Bag',
      description: 'Rated for 0°F, synthetic fill',
      imageUrl: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=400&h=300&fit=crop',
      category: 'Sleeping',
    },
    {
      id: '5',
      title: 'Headlamp',
      description: '300 lumens, rechargeable',
      imageUrl: 'https://images.unsplash.com/photo-1578562266373-4a3d756b23e5?w=400&h=300&fit=crop',
      category: 'Lighting',
    },
  ],
  framesVisible: 3,
};

// The adapter translates your custom model into frame components
const customAdapter: CdrFilmstripAdapter<CustomFrameProps, CustomModel> = (model) => {
  const { items = [], framesVisible = 3 } = model;

  // Map your data items to frame components
  const frames: CdrFilmstripFrame<CustomFrameProps>[] = items.map((item) => ({
    key: item.id,
    props: {
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      category: item.category,
    },
  }));

  // Return the filmstrip configuration
  return {
    component: FrameComponent,
    frames,
    filmstripId: 'custom-data-example',
    description: 'Custom data example',
    framesGap: 24, // Gap between frames in pixels
    responsiveFrames: {
      xs: 1, // Show 1 frame on extra small screens
      sm: 2, // Show 2 frames on small screens
      md: 2, // Show 2 frames on medium screens
      lg: framesVisible, // Show configured number on large screens
    },
    focusSelector: '[data-focus]', // Element to focus when frame is activated
  } satisfies CdrFilmstripConfig<CustomFrameProps, CustomModel>;
};

// Event handlers
const onFrameClick = (payload?: unknown) => {
  console.log('Frame clicked:', payload);
};

const onArrowClick = (payload?: unknown) => {
  console.log('Arrow clicked:', payload);
};
</script>

<style lang="scss" scoped>
@use '@rei/cdr-tokens/scss' as *;

.custom-data-filmstrip {
  margin-left: -$cdr-space-one-x;
  margin-right: -$cdr-space-one-x;

  @include cdr-sm-mq-up {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
