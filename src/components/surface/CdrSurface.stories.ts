import type { Meta, StoryObj } from '@storybook/vue3';
import surfaceTokenMetadata from '@rei/cdr-tokens/docsite/json/components/cdr-surface.json';
import radiusTokenMetadata from '@rei/cdr-tokens/docsite/json/foundations/cdr-radius.json';
import prominenceTokenMetadata from '@rei/cdr-tokens/docsite/json/foundations/cdr-prominence.json';
import spacingTokenMetadata from '@rei/cdr-tokens/docsite/json/foundations/cdr-space.json';
import CdrSurface from './CdrSurface.vue';
import {
  borderStyleOptions,
  surfaceBackgroundOptions,
  surfaceBackgroundTokens,
  surfaceBorderColorOptions,
  surfaceBorderColorTokens,
  surfacePaletteOptions,
  surfaceRadiusOptions,
  surfaceRadiusTokens,
  surfaceShadowOptions,
  surfaceShadowTokens,
  spaceFixedOptions,
  spaceFixedTokens,
} from '../../types/componentOptions';

type TokenDescription = string | { what?: string; when?: string };
type TokenMetadata = {
  docs?: { description?: TokenDescription };
  attributes?: { item?: string; type?: string; subitem?: string };
};

function formatDescription(description: TokenDescription | undefined): string | undefined {
  if (!description) return undefined;

  if (typeof description === 'string') return description;

  return [description.what, description.when].filter(Boolean).join(' ');
}

function getTokenDescriptions(
  options: readonly string[],
  tokenMap: Record<string, string>,
  matcher: (option: string) => TokenMetadata | undefined,
): string {
  return options
    .map((option) => {
      const tokenName = tokenMap[option];
      const match = matcher(option);
      const description = formatDescription(match?.docs?.description);

      return description ? `${option} (${tokenName}): ${description}` : `${option} (${tokenName})`;
    })
    .join('\n');
}

const surfaceColorMetadata = surfaceTokenMetadata.colors as TokenMetadata[];
const surfaceRadiusMetadata = radiusTokenMetadata.radius as TokenMetadata[];
const surfaceProminenceMetadata = prominenceTokenMetadata.prominence as TokenMetadata[];
const surfaceSpacingMetadata = spacingTokenMetadata.spacing as TokenMetadata[];

const backgroundSummary = getTokenDescriptions(
  surfaceBackgroundOptions,
  surfaceBackgroundTokens,
  (option) =>
    surfaceColorMetadata.find(
      (token) =>
        token.attributes?.item === 'surface' &&
        token.attributes?.type === 'background' &&
        token.attributes?.subitem === option,
    ),
);

const borderColorSummary = getTokenDescriptions(
  surfaceBorderColorOptions,
  surfaceBorderColorTokens,
  (option) =>
    surfaceColorMetadata.find(
      (token) =>
        token.attributes?.item === 'surface' &&
        token.attributes?.type === 'border' &&
        token.attributes?.subitem === option,
    ),
);

const borderRadiusSummary = getTokenDescriptions(
  surfaceRadiusOptions,
  surfaceRadiusTokens,
  (option) => surfaceRadiusMetadata.find((token) => token.attributes?.type === option),
);

const boxShadowSummary = getTokenDescriptions(surfaceShadowOptions, surfaceShadowTokens, (option) =>
  surfaceProminenceMetadata.find((token) => token.attributes?.type === option),
);

const borderWidthSummary = getTokenDescriptions(spaceFixedOptions, spaceFixedTokens, (option) =>
  surfaceSpacingMetadata.find((token) => token.attributes?.type === option),
);

const meta: Meta<typeof CdrSurface> = {
  title: 'Components/Surface',
  component: CdrSurface,
  tags: ['autodocs'],
  argTypes: {
    background: {
      control: 'select',
      options: surfaceBackgroundOptions,
      description: 'Adds in a background color based on the current palette tokens.',
      table: {
        type: { summary: backgroundSummary },
      },
    },
    borderColor: {
      control: 'select',
      options: surfaceBorderColorOptions,
      description: 'Specifies a border color based on the surface border tokens.',
      table: {
        type: { summary: borderColorSummary },
      },
    },
    borderStyle: {
      control: 'select',
      options: borderStyleOptions,
      description: 'Specifies a border style based on the token options within Cedar',
      table: {
        type: { summary: borderStyleOptions.join(' | ') },
      },
    },
    borderWidth: {
      control: 'select',
      options: spaceFixedOptions,
      description: 'Specifies a border width based on the space token options used by Surface.',
      table: {
        type: { summary: borderWidthSummary },
      },
    },
    borderRadius: {
      control: 'select',
      options: surfaceRadiusOptions,
      description: 'Adds in a border radius based on the radius tokens.',
      table: {
        type: { summary: borderRadiusSummary },
      },
    },
    boxShadow: {
      control: 'select',
      options: surfaceShadowOptions,
      description: 'Adds a shadow based on the prominence tokens.',
      table: {
        type: { summary: boxShadowSummary },
      },
    },
    palette: {
      control: 'select',
      options: surfacePaletteOptions,
      description: 'Defines a palette for the component style variations.',
      table: {
        type: { summary: surfacePaletteOptions.join(' | ') },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { CdrSurface },
    setup() {
      return { args };
    },
    template: `
      <CdrSurface v-bind="args">
        <div style="padding: 24px;">
          <h2>Surface Content</h2>
          <p>This is content inside a surface container.</p>
        </div>
      </CdrSurface>
    `,
  }),
  args: {
    background: 'primary',
  },
};

export const WithBorder: Story = {
  render: (args) => ({
    components: { CdrSurface },
    setup() {
      return { args };
    },
    template: `
      <CdrSurface v-bind="args">
        <div style="padding: 24px;">
          <h3>Bordered Surface</h3>
          <p>This surface has a border applied.</p>
        </div>
      </CdrSurface>
    `,
  }),
  args: {
    background: 'secondary',
    borderColor: 'primary',
    borderStyle: 'solid',
    borderWidth: 'one-x',
  },
};

export const WithShadow: Story = {
  render: (args) => ({
    components: { CdrSurface },
    setup() {
      return { args };
    },
    template: `
      <CdrSurface v-bind="args">
        <div style="padding: 32px;">
          <h3>Shadowed Surface</h3>
          <p>This surface has a box shadow for depth.</p>
        </div>
      </CdrSurface>
    `,
  }),
  args: {
    background: 'primary',
    boxShadow: 'raised',
  },
};

export const RoundedCorners: Story = {
  render: (args) => ({
    components: { CdrSurface },
    setup() {
      return { args };
    },
    template: `
      <CdrSurface v-bind="args">
        <div style="padding: 24px;">
          <h3>Rounded Surface</h3>
          <p>This surface has rounded corners.</p>
        </div>
      </CdrSurface>
    `,
  }),
  args: {
    background: 'secondary',
    borderRadius: 'soft',
  },
};

export const SandstonePalette: Story = {
  render: (args) => ({
    components: { CdrSurface },
    setup() {
      return { args };
    },
    template: `
      <CdrSurface v-bind="args">
        <div style="padding: 24px;">
          <h3>Sandstone Palette</h3>
          <p>This surface uses the sandstone palette.</p>
        </div>
      </CdrSurface>
    `,
  }),
  args: {
    palette: 'sandstone',
  },
};

export const MembershipSubtle: Story = {
  render: (args) => ({
    components: { CdrSurface },
    setup() {
      return { args };
    },
    template: `
      <CdrSurface v-bind="args">
        <div style="padding: 24px;">
          <h3>Membership Subtle</h3>
          <p>This surface uses the membership-subtle palette.</p>
        </div>
      </CdrSurface>
    `,
  }),
  args: {
    palette: 'membership-subtle',
  },
};

export const MembershipVibrant: Story = {
  render: (args) => ({
    components: { CdrSurface },
    setup() {
      return { args };
    },
    template: `
      <CdrSurface v-bind="args">
        <div style="padding: 24px;">
          <h3>Membership Vibrant</h3>
          <p>This surface uses the membership-vibrant palette.</p>
        </div>
      </CdrSurface>
    `,
  }),
  args: {
    palette: 'membership-vibrant',
  },
};

export const AsSection: Story = {
  render: (args) => ({
    components: { CdrSurface },
    setup() {
      return { args };
    },
    template: `
      <CdrSurface v-bind="args">
        <div style="padding: 32px;">
          <h2>Section Title</h2>
          <p>This surface is rendered as a section element.</p>
        </div>
      </CdrSurface>
    `,
  }),
  args: {
    tag: 'section',
    background: 'primary',
    borderRadius: 'soft',
    boxShadow: 'elevated',
  },
};
