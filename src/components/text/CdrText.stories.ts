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
  parameters: {
    docs: {
      description: {
        component: [
          'Scale reference for text presets:',
          '- Body: -2, -1, 0, 1',
          '- Heading Display: 2, 3, 4, 5, 6, 7',
          '- Heading Sans: 1, 2, 3',
          '- Heading Serif: 1, 2, 3, 4, 5',
          '- Subheading Sans: -1, 0, 1, 2',
          '- Utility Sans/Serif: -1, 0, 1, 2, 3',
          '',
          'Use the Scale Playground stories to test each preset with controls.',
        ].join('\n'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;
type PresetStory = StoryObj<Record<string, unknown>>;

const bodyScaleOptions = ['-2', '-1', '0', '1'] as const;
const headingDisplayScaleOptions = ['2', '3', '4', '5', '6', '7'] as const;
const headingSansScaleOptions = ['1', '2', '3'] as const;
const headingSerifScaleOptions = ['1', '2', '3', '4', '5'] as const;
const subheadingSansScaleOptions = ['-1', '0', '1', '2'] as const;
const utilityScaleOptions = ['-1', '0', '1', '2', '3'] as const;

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

export const BodyText: PresetStory = {
  render: (args: Record<string, unknown>) => ({
    components: { CdrBody },
    setup() {
      return { args };
    },
    template: `
      <div>
        <CdrBody v-bind="args">
          This is a paragraph of body text. It uses the standard body text preset
          which provides appropriate sizing and spacing for readable paragraphs.
        </CdrBody>
        <CdrBody v-bind="args">
          Multiple paragraphs can be used to create longer-form content with
          proper vertical rhythm and spacing between sections.
        </CdrBody>
      </div>
    `,
  }),
  args: {
    scale: '0',
    strong: false,
  },
  argTypes: {
    scale: {
      control: 'select',
      options: bodyScaleOptions,
      description: 'Body scale options',
    },
  },
};

export const HeadingDisplay: PresetStory = {
  render: (args: Record<string, unknown>) => ({
    components: { CdrHeadingDisplay },
    setup() {
      return { args };
    },
    template: `
      <CdrHeadingDisplay v-bind="args">Display Heading</CdrHeadingDisplay>
    `,
  }),
  args: {
    scale: '7',
  },
  argTypes: {
    scale: {
      control: 'select',
      options: headingDisplayScaleOptions,
      description: 'Heading display scale options',
    },
  },
};

export const HeadingSans: PresetStory = {
  render: (args: Record<string, unknown>) => ({
    components: { CdrHeadingSans },
    setup() {
      return { args };
    },
    template: `
      <CdrHeadingSans v-bind="args">Sans Heading</CdrHeadingSans>
    `,
  }),
  args: {
    scale: '3',
  },
  argTypes: {
    scale: {
      control: 'select',
      options: headingSansScaleOptions,
      description: 'Heading sans scale options',
    },
  },
};

export const HeadingSerif: PresetStory = {
  render: (args: Record<string, unknown>) => ({
    components: { CdrHeadingSerif },
    setup() {
      return { args };
    },
    template: `
      <CdrHeadingSerif v-bind="args">Serif Heading</CdrHeadingSerif>
    `,
  }),
  args: {
    scale: '5',
    strong: false,
  },
  argTypes: {
    scale: {
      control: 'select',
      options: headingSerifScaleOptions,
      description: 'Heading serif scale options',
    },
  },
};

export const SubheadingSans: PresetStory = {
  render: (args: Record<string, unknown>) => ({
    components: { CdrSubheadingSans },
    setup() {
      return { args };
    },
    template: `
      <CdrSubheadingSans v-bind="args">Subheading Sans</CdrSubheadingSans>
    `,
  }),
  args: {
    scale: '1',
  },
  argTypes: {
    scale: {
      control: 'select',
      options: subheadingSansScaleOptions,
      description: 'Subheading sans scale options',
    },
  },
};

export const UtilitySans: PresetStory = {
  render: (args: Record<string, unknown>) => ({
    components: { CdrUtilitySans },
    setup() {
      return { args };
    },
    template: `
      <CdrUtilitySans v-bind="args">Utility Sans</CdrUtilitySans>
    `,
  }),
  args: {
    scale: '1',
    strong: false,
  },
  argTypes: {
    scale: {
      control: 'select',
      options: utilityScaleOptions,
      description: 'Utility sans scale options',
    },
  },
};

export const UtilitySerif: PresetStory = {
  render: (args: Record<string, unknown>) => ({
    components: { CdrUtilitySerif },
    setup() {
      return { args };
    },
    template: `
      <CdrUtilitySerif v-bind="args">Utility Serif</CdrUtilitySerif>
    `,
  }),
  args: {
    scale: '1',
    strong: false,
  },
  argTypes: {
    scale: {
      control: 'select',
      options: utilityScaleOptions,
      description: 'Utility serif scale options',
    },
  },
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
