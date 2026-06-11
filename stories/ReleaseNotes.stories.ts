import type { Meta, StoryObj } from '@storybook/vue3';
import { defineComponent, h } from 'vue';
import { releaseNotesData } from '../.storybook/generated/release-notes.generated';
import { markdownToHtml } from '../.storybook/release-notes/markdown-to-html';

const ReleaseNotesView = defineComponent({
  name: 'ReleaseNotesView',
  props: {
    markdown: {
      type: String,
      default: releaseNotesData.markdown,
    },
  },
  setup(props) {
    const html = markdownToHtml(props.markdown);
    return () =>
      h('div', {
        class: 'docs-page cdr-doc-content',
        innerHTML: `
          <article>
            ${html}
            <p class="release-notes-meta">Cedar is supported one major version back from the current release. For questions or help upgrading, reach out in the <strong>#cedar-user-support</strong> Slack channel.</p>
          </article>
        `,
      });
  },
});

const meta: Meta<typeof ReleaseNotesView> = {
  title: 'Release Notes',
  component: ReleaseNotesView,
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    actions: { disable: true },
  },
};

export default meta;
type Story = StoryObj<typeof ReleaseNotesView>;

export const V17_0_0: Story = {
  name: '17.0.0',
  render: () =>
    h(ReleaseNotesView, {
      markdown: releaseNotesData.markdown,
    }),
};

export const V17_0_1: Story = {
  name: '17.0.1',
  render: () =>
    h(ReleaseNotesView, {
      markdown: `# Release notes – v17.0.1

## Overview

This patch release simplifies Cedar's component prop API by removing verbose token prefixes from consumer-facing props. Scale props now use numeric values (e.g., \`scale="3"\` instead of \`scale="scale-3"\`), and space props use simplified format (e.g., \`gap="4"\` instead of \`gap="scale-4"\`). The Node engine requirement now supports Node 24 LTS by removing the upper version bound. SASS deprecation warnings from component variables are resolved by migrating to modern @use modules.

## Migration guide

### Must update

- [ ] Update scale prop values to numeric format (e.g., \`scale="3"\` instead of \`scale="scale-3"\`)
- [ ] Update space prop values to simplified format (e.g., \`gap="4"\` instead of \`gap="scale-4"\`)

### Optional update

- [ ] Review your build logs for any remaining SASS deprecation warnings
- [ ] If you were blocked by Node 23 requirement, you can now use Node 24 LTS

### To get the most out of this update

This release enables the following new capabilities:

- Cleaner, more intuitive component prop API with numeric values
- Support for Node 24 LTS (no upper version bound)
- Elimination of SASS deprecation warnings in component variables

## Breaking changes

Scale prop format changed from verbose token format to simplified numeric format

- **Why:** The prop name already indicates it's a scale value, so repeating "scale" in the prop value is redundant and verbose

- **Before:** \`<CdrHeadingSerif scale="scale-3">\` or \`<CdrUtilitySans scale="scale-minus-1">\`

- **After:** \`<CdrHeadingSerif scale="3">\` or \`<CdrUtilitySans scale="-1">\`

- **Migrate:** Search your codebase for \`scale="scale-\` and replace with \`scale="\` (remove the "scale-" prefix). Negative scales use the \`-N\` format

Space prop format changed from verbose token format to simplified format

- **Why:** Similar to scale props, the prop name indicates it's a space value, so repeating "scale" is redundant

- **Before:** \`<CdrLayout gap="scale-4">\` or \`<CdrLayout gap="scale-3--5">\`

- **After:** \`<CdrLayout gap="4">\` or \`<CdrLayout gap="3--5">\`

- **Migrate:** Search your codebase for gap/rowGap/columnGap props with \`scale-\` prefix and remove it. Fixed space values (zero, one-x, two-x) remain unchanged

## New features

Simplified scale prop API — text components now accept numeric scale values instead of verbose token format. The adapter layer handles conversion to CSS custom properties internally, so consumers get a cleaner API without losing functionality.

To get started: \`<CdrHeadingSerif scale="3">\` instead of \`<CdrHeadingSerif scale="scale-3">\`

Simplified space prop API — layout components now accept simplified space values. The adapter layer converts simplified format to token names internally.

To get started: \`<CdrLayout gap="4">\` instead of \`<CdrLayout gap="scale-4">\`

Node 24 LTS support — removed the upper bound on Node engine requirement, allowing teams to use the latest Node LTS version without being blocked by the package.json engines field.

To get started: No action needed if you're already on a supported Node version. If you were blocked from upgrading to Node 24, you can now do so.

SASS deprecation warnings resolved — @rei/cdr-component-variables migrated from legacy @import to modern @use modules, eliminating deprecation warnings in build logs.

To get started: No action needed — the package now uses modern SASS modules internally

## Bug fixes

Fixed SASS deprecation warnings in @rei/cdr-component-variables by migrating from @import to @use modules with global namespace (as *)

Fixed Node engine version requirement blocking Node 24 LTS by removing upper bound (<23) from engines field

## Be Aware Of

The scale and space prop format changes are breaking for consumers using the verbose format. However, the adapter layer maintains backward compatibility with the old format during the transition period

If you have custom components that extend Cedar components and override scale/space props, ensure they use the new simplified format

## Component API changes

Text preset components (CdrHeadingSerif, CdrUtilitySans, CdrBody, CdrHeadingDisplay, CdrHeadingSans, CdrSubheadingSans, CdrUtilitySerif)
- scale prop now accepts numeric values: '1' | '2' | '3' | '4' | '5' (or '-2' | '-1' | '0' | '1' for components that support negative scales)
- Default values updated to use numeric format
- Adapter layer handles conversion to CSS custom properties

CdrFulfillmentTile
- scale prop in FulfillmentTileContent now accepts numeric values: '-2' | '-1' | '0' | '1'
- Component usage updated to use numeric format

Layout components (CdrLayout)
- gap, rowGap, columnGap props now accept simplified format: '4' instead of 'scale-4', '3--5' instead of 'scale-3--5'
- Fixed space values (zero, one-x, two-x) remain unchanged
- Adapter layer handles conversion to CSS custom properties`,
    }),
};
