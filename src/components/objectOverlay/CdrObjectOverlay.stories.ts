import type { Meta, StoryObj } from '@storybook/vue3';
import CdrObjectOverlay from './CdrObjectOverlay.vue';
import CdrImg from '../image/CdrImg.vue';
import CdrText from '../text/CdrText.vue';
import CdrButton from '../button/CdrButton.vue';

const meta = {
  title: 'Components/ObjectOverlay',
  component: CdrObjectOverlay,
  tags: ['autodocs'],
  args: {
    position: 'center-center',
    margin: 'zero',
    tag: 'div',
    gradientTheme: 'dark',
  },
} satisfies Meta<typeof CdrObjectOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

const imageSrc =
  'https://www.rei.com/dam/content_team_041115_25915_campaign_yosemite_0291_article_c_1.jpg';

export const CenterCenter: Story = {
  render: (args) => ({
    components: { CdrObjectOverlay, CdrImg, CdrText, CdrButton },
    setup() {
      return { args, imageSrc };
    },
    template: `
      <CdrObjectOverlay v-bind="args">
        <template #container>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" fit="cover" />
        </template>
        <template #content>
          <div style="text-align: center; color: white;">
            <CdrText tag="h2">Centered Content</CdrText>
            <CdrButton modifier="primary">Explore Now</CdrButton>
          </div>
        </template>
      </CdrObjectOverlay>
    `,
  }),
};

export const LeftTop: Story = {
  args: {
    position: 'left-top',
    margin: 'one-x',
  },
  render: (args) => ({
    components: { CdrObjectOverlay, CdrImg, CdrText },
    setup() {
      return { args, imageSrc };
    },
    template: `
      <CdrObjectOverlay v-bind="args">
        <template #container>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" fit="cover" />
        </template>
        <template #content>
          <div style="color: white; background: rgba(0, 0, 0, 0.5); padding: 16px; border-radius: 4px;">
            <CdrText tag="h3">Top Left</CdrText>
            <CdrText>Positioned in top left corner</CdrText>
          </div>
        </template>
      </CdrObjectOverlay>
    `,
  }),
};

export const RightBottom: Story = {
  args: {
    position: 'right-bottom',
    margin: 'one-x',
  },
  render: (args) => ({
    components: { CdrObjectOverlay, CdrImg, CdrText },
    setup() {
      return { args, imageSrc };
    },
    template: `
      <CdrObjectOverlay v-bind="args">
        <template #container>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" fit="cover" />
        </template>
        <template #content>
          <div style="color: white; background: rgba(0, 0, 0, 0.5); padding: 16px; border-radius: 4px;">
            <CdrText>Bottom Right Content</CdrText>
          </div>
        </template>
      </CdrObjectOverlay>
    `,
  }),
};

export const CenterTop: Story = {
  args: {
    position: 'center-top',
    margin: 'one-and-a-half-x',
  },
  render: (args) => ({
    components: { CdrObjectOverlay, CdrImg, CdrText, CdrButton },
    setup() {
      return { args, imageSrc };
    },
    template: `
      <CdrObjectOverlay v-bind="args">
        <template #container>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" fit="cover" />
        </template>
        <template #content>
          <div style="text-align: center; color: white;">
            <CdrText tag="h2">Top Centered</CdrText>
            <CdrButton>Take Action</CdrButton>
          </div>
        </template>
      </CdrObjectOverlay>
    `,
  }),
};

export const CenterBottom: Story = {
  args: {
    position: 'center-bottom',
    margin: 'two-x',
  },
  render: (args) => ({
    components: { CdrObjectOverlay, CdrImg, CdrText },
    setup() {
      return { args, imageSrc };
    },
    template: `
      <CdrObjectOverlay v-bind="args">
        <template #container>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" fit="cover" />
        </template>
        <template #content>
          <div style="text-align: center; color: white; background: rgba(0, 0, 0, 0.6); padding: 24px; border-radius: 8px;">
            <CdrText tag="h3">Bottom Centered Banner</CdrText>
            <CdrText>Perfect for captions or calls to action</CdrText>
          </div>
        </template>
      </CdrObjectOverlay>
    `,
  }),
};

export const LeftCenter: Story = {
  args: {
    position: 'left-center',
    margin: 'one-x',
  },
  render: (args) => ({
    components: { CdrObjectOverlay, CdrImg, CdrText, CdrButton },
    setup() {
      return { args, imageSrc };
    },
    template: `
      <CdrObjectOverlay v-bind="args">
        <template #container>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" fit="cover" />
        </template>
        <template #content>
          <div style="color: white; background: rgba(0, 0, 0, 0.5); padding: 20px; border-radius: 4px; max-width: 300px;">
            <CdrText tag="h3">Left Aligned</CdrText>
            <CdrText>Vertically centered on the left side</CdrText>
            <CdrButton modifier="primary" style="margin-top: 8px;">Learn More</CdrButton>
          </div>
        </template>
      </CdrObjectOverlay>
    `,
  }),
};

export const ResponsivePosition: Story = {
  args: {
    position: {
      xs: 'center-bottom',
      sm: 'center-bottom',
      md: 'left-center',
      lg: 'left-center',
    },
    margin: {
      xs: 'one-x',
      md: 'two-x',
    },
  },
  render: (args) => ({
    components: { CdrObjectOverlay, CdrImg, CdrText, CdrButton },
    setup() {
      return { args, imageSrc };
    },
    template: `
      <CdrObjectOverlay v-bind="args">
        <template #container>
          <CdrImg :src="imageSrc" alt="Yosemite landscape" ratio="16/9" fit="cover" />
        </template>
        <template #content>
          <div style="color: white; background: rgba(0, 0, 0, 0.6); padding: 20px; border-radius: 4px;">
            <CdrText tag="h3">Responsive Positioning</CdrText>
            <CdrText>
              This overlay changes position at different breakpoints. 
              Bottom center on mobile, left center on desktop.
            </CdrText>
            <CdrButton modifier="primary" style="margin-top: 8px;">Get Started</CdrButton>
          </div>
        </template>
      </CdrObjectOverlay>
    `,
  }),
};
