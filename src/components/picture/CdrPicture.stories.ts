import type { Meta, StoryObj } from '@storybook/vue3';
import CdrPicture from './CdrPicture.vue';

const meta = {
  title: 'Components/Picture',
  component: CdrPicture,
  tags: ['autodocs'],
  args: {
    alt: 'Outdoor adventure',
  },
} satisfies Meta<typeof CdrPicture>;

export default meta;
type Story = StoryObj<typeof meta>;

const imageSrc =
  'https://www.rei.com/dam/content_team_041115_25915_campaign_yosemite_0291_article_c_1.jpg';
const imageWebP =
  'https://www.rei.com/dam/content_team_041115_25915_campaign_yosemite_0291_article_c_1.webp';

export const Default: Story = {
  args: {
    src: imageSrc,
    sources: {
      source1: {
        media: '(min-width: 1024px)',
        srcset: imageSrc,
      },
    },
  },
  render: (args) => ({
    components: { CdrPicture },
    setup() {
      return { args };
    },
    template: `
      <CdrPicture v-bind="args" />
    `,
  }),
};

export const WithWebP: Story = {
  args: {
    src: imageSrc,
    sources: {
      webp: {
        media: '(min-width: 0px)',
        srcset: imageWebP,
        type: 'image/webp',
      },
      fallback: {
        media: '(min-width: 0px)',
        srcset: imageSrc,
        type: 'image/jpeg',
      },
    },
  },
  render: (args) => ({
    components: { CdrPicture },
    setup() {
      return { args };
    },
    template: `
      <CdrPicture v-bind="args" />
    `,
  }),
};

export const ResponsiveSources: Story = {
  args: {
    src: imageSrc,
    sources: {
      large: {
        media: '(min-width: 1024px)',
        srcset: imageSrc,
        width: '1200',
        height: '675',
      },
      medium: {
        media: '(min-width: 768px)',
        srcset: imageSrc,
        width: '800',
        height: '450',
      },
      small: {
        media: '(min-width: 0px)',
        srcset: imageSrc,
        width: '400',
        height: '225',
      },
    },
  },
  render: (args) => ({
    components: { CdrPicture },
    setup() {
      return { args };
    },
    template: `
      <CdrPicture v-bind="args" />
    `,
  }),
};

export const WithAspectRatio: Story = {
  args: {
    src: imageSrc,
    ratio: '16/9',
    fit: 'cover',
    sources: {
      source1: {
        media: '(min-width: 0px)',
        srcset: imageSrc,
      },
    },
  },
  render: (args) => ({
    components: { CdrPicture },
    setup() {
      return { args };
    },
    template: `
      <CdrPicture v-bind="args" />
    `,
  }),
};

export const SquareRatio: Story = {
  args: {
    src: imageSrc,
    ratio: '1/1',
    fit: 'cover',
    sources: {
      source1: {
        media: '(min-width: 0px)',
        srcset: imageSrc,
      },
    },
  },
  render: (args) => ({
    components: { CdrPicture },
    setup() {
      return { args };
    },
    template: `
      <div style="max-width: 400px;">
        <CdrPicture v-bind="args" />
      </div>
    `,
  }),
};

export const MultipleFormats: Story = {
  args: {
    src: imageSrc,
    ratio: '16/9',
    sources: {
      avif: {
        media: '(min-width: 0px)',
        srcset: imageWebP,
        type: 'image/avif',
      },
      webp: {
        media: '(min-width: 0px)',
        srcset: imageWebP,
        type: 'image/webp',
      },
      jpeg: {
        media: '(min-width: 0px)',
        srcset: imageSrc,
        type: 'image/jpeg',
      },
    },
  },
  render: (args) => ({
    components: { CdrPicture },
    setup() {
      return { args };
    },
    template: `
      <CdrPicture v-bind="args" />
    `,
  }),
};
