import type { Meta, StoryObj } from '@storybook/vue3';
import CdrMediaObject from './CdrMediaObject.vue';
import CdrImg from '../image/CdrImg.vue';
import CdrText from '../text/CdrText.vue';
import CdrButton from '../button/CdrButton.vue';

const meta = {
  title: 'Components/MediaObject',
  component: CdrMediaObject,
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
    },
    mediaPosition: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
    },
    mediaWidth: {
      control: 'text',
    },
    mediaHeight: {
      control: 'text',
    },
    mediaCover: {
      control: 'boolean',
    },
    overlay: {
      control: 'boolean',
    },
    contentPadding: {
      control: 'text',
    },
  },
  args: {
    align: 'start',
    mediaPosition: 'left',
    mediaWidth: '1fr',
    mediaHeight: 'auto',
    mediaCover: false,
    overlay: false,
    contentPadding: 'zero',
  },
} satisfies Meta<typeof CdrMediaObject>;

export default meta;
type Story = StoryObj<typeof meta>;

const imageSrc =
  'https://www.rei.com/dam/content_team_041115_25915_campaign_yosemite_0291_article_c_1.jpg';

export const Default: Story = {
  render: (args) => ({
    components: { CdrMediaObject, CdrImg, CdrText },
    setup() {
      return { args, imageSrc };
    },
    template: `
      <CdrMediaObject v-bind="args">
        <template #media>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" />
        </template>
        <template #content>
          <CdrText tag="h3">Explore Yosemite</CdrText>
          <CdrText>
            Discover the breathtaking beauty of Yosemite National Park. 
            From towering granite cliffs to cascading waterfalls, Yosemite 
            offers unforgettable adventures for outdoor enthusiasts.
          </CdrText>
        </template>
      </CdrMediaObject>
    `,
  }),
};

export const MediaRight: Story = {
  args: {
    mediaPosition: 'right',
  },
  render: (args) => ({
    components: { CdrMediaObject, CdrImg, CdrText },
    setup() {
      return { args, imageSrc };
    },
    template: `
      <CdrMediaObject v-bind="args">
        <template #media>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" />
        </template>
        <template #content>
          <CdrText tag="h3">Media on Right</CdrText>
          <CdrText>
            This media object has the image positioned on the right side 
            with content on the left.
          </CdrText>
        </template>
      </CdrMediaObject>
    `,
  }),
};

export const MediaTop: Story = {
  args: {
    mediaPosition: 'top',
  },
  render: (args) => ({
    components: { CdrMediaObject, CdrImg, CdrText, CdrButton },
    setup() {
      return { args, imageSrc };
    },
    template: `
      <CdrMediaObject v-bind="args">
        <template #media>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" />
        </template>
        <template #content>
          <CdrText tag="h3">Media on Top</CdrText>
          <CdrText>
            Vertical layout with media positioned above the content.
          </CdrText>
          <CdrButton modifier="secondary">Learn More</CdrButton>
        </template>
      </CdrMediaObject>
    `,
  }),
};

export const WithContentPadding: Story = {
  args: {
    contentPadding: 'one-x',
  },
  render: (args) => ({
    components: { CdrMediaObject, CdrImg, CdrText },
    setup() {
      return { args, imageSrc };
    },
    template: `
      <CdrMediaObject v-bind="args">
        <template #media>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" />
        </template>
        <template #content>
          <CdrText tag="h3">With Padding</CdrText>
          <CdrText>
            This media object has padding applied to the content area.
          </CdrText>
        </template>
      </CdrMediaObject>
    `,
  }),
};

export const WithOverlay: Story = {
  args: {
    overlay: true,
    overlayRowAlign: 'end',
    overlayColumnAlign: 'start',
    contentPadding: 'one-and-a-half-x',
  },
  render: (args) => ({
    components: { CdrMediaObject, CdrImg, CdrText, CdrButton },
    setup() {
      return { args, imageSrc };
    },
    template: `
      <CdrMediaObject v-bind="args">
        <template #media>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" fit="cover" />
        </template>
        <template #content>
          <CdrText tag="h2" style="color: white;">Overlay Content</CdrText>
          <CdrText style="color: white;">
            Content overlays the media in this configuration.
          </CdrText>
          <CdrButton modifier="primary">Explore Now</CdrButton>
        </template>
      </CdrMediaObject>
    `,
  }),
};

export const CenteredAlignment: Story = {
  args: {
    align: 'center',
  },
  render: (args) => ({
    components: { CdrMediaObject, CdrImg, CdrText },
    setup() {
      return { args, imageSrc };
    },
    template: `
      <CdrMediaObject v-bind="args">
        <template #media>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="1/1" />
        </template>
        <template #content>
          <CdrText tag="h3">Centered Alignment</CdrText>
          <CdrText>
            The media and content are center-aligned vertically in this example.
          </CdrText>
        </template>
      </CdrMediaObject>
    `,
  }),
};

export const WithCover: Story = {
  args: {
    mediaCover: true,
    mediaWidth: '200px',
  },
  render: (args) => ({
    components: { CdrMediaObject, CdrImg, CdrText },
    setup() {
      return { args, imageSrc };
    },
    template: `
      <CdrMediaObject v-bind="args">
        <template #media>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" />
        </template>
        <template #content>
          <CdrText tag="h3">Media Cover</CdrText>
          <CdrText>
            The mediaCover prop makes the image fill its container using object-fit: cover.
          </CdrText>
        </template>
      </CdrMediaObject>
    `,
  }),
};
