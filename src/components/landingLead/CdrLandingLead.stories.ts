import type { Meta, StoryObj } from '@storybook/vue3';
import { CdrLandingLead } from '../../lib';

const meta: Meta<typeof CdrLandingLead> = {
  title: 'Components/CdrLandingLead',
  component: CdrLandingLead,
  parameters: {
    docs: {
      description: {
        component:
          'Displays a full-width image and heading at the top of a page. Combines a hero image with heading and subheading text using CdrSplitSurface layout.',
      },
    },
  },
  argTypes: {
    imgSrc: {
      control: 'text',
      description: "Sets the landing lead's image source",
    },
    imgSrcset: {
      control: 'text',
      description: 'Comma-separated list of img srcsets',
    },
    imgAlt: {
      control: 'text',
      description: "Sets the landing lead's image alt",
    },
    heading: {
      control: 'text',
      description: "Sets the landing lead's heading",
    },
    subheading: {
      control: 'text',
      description: "Sets the landing lead's subheading",
    },
  },
};

export default meta;

type Story = StoryObj<typeof CdrLandingLead>;

export const Default: Story = {
  args: {
    imgSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
    imgAlt: 'Mountain landscape',
    heading: 'Camp with no reservations.',
    subheading: 'We have the know-how to equip you to camp in the middle of nowhere.',
  },
  render: (args: any) => ({
    components: { CdrLandingLead },
    setup() {
      return { args };
    },
    template: '<CdrLandingLead v-bind="args" />',
  }),
};

export const WithoutSubheading: Story = {
  args: {
    imgSrc: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=600&fit=crop',
    imgAlt: 'Mountain peak',
    heading: 'Adventure Awaits',
  },
  render: (args: any) => ({
    components: { CdrLandingLead },
    setup() {
      return { args };
    },
    template: '<CdrLandingLead v-bind="args" />',
  }),
};

export const WithSrcset: Story = {
  args: {
    imgSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
    imgSrcset:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop 600w, https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop 1200w, https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&h=900&fit=crop 1800w',
    imgAlt: 'Responsive mountain image',
    heading: 'Responsive Images',
    subheading: 'Optimized for all screen sizes.',
  },
  render: (args: any) => ({
    components: { CdrLandingLead },
    setup() {
      return { args };
    },
    template: '<CdrLandingLead v-bind="args" />',
  }),
};

export const HikingTheme: Story = {
  args: {
    imgSrc: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=600&fit=crop',
    imgAlt: 'Hiking trail',
    heading: 'Hit the Trail',
    subheading: 'Find the perfect gear for your next hike.',
  },
  render: (args: any) => ({
    components: { CdrLandingLead },
    setup() {
      return { args };
    },
    template: '<CdrLandingLead v-bind="args" />',
  }),
};

export const CampingTheme: Story = {
  args: {
    imgSrc: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&h=600&fit=crop',
    imgAlt: 'Camping scene',
    heading: 'Camp Anywhere',
    subheading: 'Essential gear for every camping adventure.',
  },
  render: (args: any) => ({
    components: { CdrLandingLead },
    setup() {
      return { args };
    },
    template: '<CdrLandingLead v-bind="args" />',
  }),
};

export const ClimbingTheme: Story = {
  args: {
    imgSrc: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=1200&h=600&fit=crop',
    imgAlt: 'Rock climbing',
    heading: 'Reach New Heights',
    subheading: 'Climbing gear for every skill level.',
  },
  render: (args: any) => ({
    components: { CdrLandingLead },
    setup() {
      return { args };
    },
    template: '<CdrLandingLead v-bind="args" />',
  }),
};

export const WinterTheme: Story = {
  args: {
    imgSrc: 'https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=1200&h=600&fit=crop',
    imgAlt: 'Winter mountain scene',
    heading: 'Winter Adventures',
    subheading: 'Stay warm and safe on cold weather expeditions.',
  },
  render: (args: any) => ({
    components: { CdrLandingLead },
    setup() {
      return { args };
    },
    template: '<CdrLandingLead v-bind="args" />',
  }),
};
