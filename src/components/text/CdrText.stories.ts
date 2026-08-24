import type { Meta, StoryObj } from '@storybook/vue3';
import CdrText from './CdrText.vue';
import CdrBody from './presets/CdrBody.vue';
import CdrEyebrow from './presets/CdrEyebrow.vue';
import CdrHeadingDisplay from './presets/CdrHeadingDisplay.vue';
import CdrHeadingSans from './presets/CdrHeadingSans.vue';
import CdrHeadingSerif from './presets/CdrHeadingSerif.vue';
import CdrSubheadingSans from './presets/CdrSubheadingSans.vue';
import CdrUtilitySans from './presets/CdrUtilitySans.vue';
import CdrUtilitySerif from './presets/CdrUtilitySerif.vue';

const meta: Meta<typeof CdrText> = {
  title: 'Components/Text',
  component: CdrText,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { CdrText },
    setup() {
      return { args };
    },
    template: `
      <CdrText v-bind="args">
        This is a default text paragraph using CdrText component.
      </CdrText>
    `,
  }),
  args: {
    tag: 'p',
  },
};

export const AllPresets: Story = {
  render: () => ({
    components: {
      CdrText,
      CdrBody,
      CdrEyebrow,
      CdrHeadingDisplay,
      CdrHeadingSans,
      CdrHeadingSerif,
      CdrSubheadingSans,
      CdrUtilitySans,
      CdrUtilitySerif,
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h4>Heading Display</h4>
          <CdrHeadingDisplay>This is a display heading</CdrHeadingDisplay>
        </div>
        
        <div>
          <h4>Heading Sans</h4>
          <CdrHeadingSans>This is a sans-serif heading</CdrHeadingSans>
        </div>
        
        <div>
          <h4>Heading Serif</h4>
          <CdrHeadingSerif>This is a serif heading</CdrHeadingSerif>
        </div>
        
        <div>
          <h4>Subheading Sans</h4>
          <CdrSubheadingSans>This is a sans-serif subheading</CdrSubheadingSans>
        </div>
        
        <div>
          <h4>Body</h4>
          <CdrBody>This is body text with standard paragraph styling.</CdrBody>
        </div>
        
        <div>
          <h4>Eyebrow</h4>
          <CdrEyebrow>This is eyebrow text</CdrEyebrow>
        </div>
        
        <div>
          <h4>Utility Sans</h4>
          <CdrUtilitySans>This is utility sans-serif text</CdrUtilitySans>
        </div>
        
        <div>
          <h4>Utility Serif</h4>
          <CdrUtilitySerif>This is utility serif text</CdrUtilitySerif>
        </div>
      </div>
    `,
  }),
};

export const BodyText: Story = {
  render: () => ({
    components: { CdrBody },
    template: `
      <div>
        <CdrBody>
          This is a paragraph of body text. It uses the standard body text preset
          which provides appropriate sizing and spacing for readable paragraphs.
        </CdrBody>
        <CdrBody>
          Multiple paragraphs can be used to create longer-form content with
          proper vertical rhythm and spacing between sections.
        </CdrBody>
      </div>
    `,
  }),
};

export const Headings: Story = {
  render: () => ({
    components: { CdrHeadingDisplay, CdrHeadingSans, CdrHeadingSerif, CdrSubheadingSans },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <CdrHeadingDisplay>Display Heading</CdrHeadingDisplay>
        <CdrHeadingSans>Sans Heading Level 1</CdrHeadingSans>
        <CdrHeadingSerif>Serif Heading Level 1</CdrHeadingSerif>
        <CdrSubheadingSans>Subheading Sans</CdrSubheadingSans>
      </div>
    `,
  }),
};

export const UtilityText: Story = {
  render: () => ({
    components: { CdrUtilitySans, CdrUtilitySerif },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <CdrUtilitySans>Utility sans-serif for labels and small text</CdrUtilitySans>
        <CdrUtilitySerif>Utility serif for accents and special cases</CdrUtilitySerif>
      </div>
    `,
  }),
};

export const CustomTag: Story = {
  render: (args) => ({
    components: { CdrText },
    setup() {
      return { args };
    },
    template: `
      <CdrText v-bind="args">
        This text is rendered as a span element instead of a paragraph.
      </CdrText>
    `,
  }),
  args: {
    tag: 'span',
  },
};
