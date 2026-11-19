import type { Meta, StoryObj } from '@storybook/vue3';
import { defineComponent, h } from 'vue';
import { releaseNotesData } from '../.storybook/generated/release-notes.generated';
import { markdownToHtml } from '../.storybook/release-notes/markdown-to-html';

const meta: Meta = {
  title: 'Release Notes',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    actions: { disable: true },
    releaseNotes: { disable: false },
  },
};

export default meta;

// Helper to create a story for a release note
const createReleaseNoteStory = (version: string, markdown: string): StoryObj => ({
  name: version,
  render: () => {
    const html = markdownToHtml(markdown);
    const ReleaseNotesView = defineComponent({
      name: 'ReleaseNotesView',
      setup() {
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
    return ReleaseNotesView;
  },
});

// Get all release notes from the generated data
const allReleaseNotes = releaseNotesData.availableFiles || [];

// Export each version as a named story
export const V18_0_0: StoryObj = createReleaseNoteStory(
  '18.0.0',
  releaseNotesData.allReleaseNotes.find((rn) => rn.version === '18.0.0')?.markdown || releaseNotesData.markdown,
);

export const V17_0_0: StoryObj = createReleaseNoteStory(
  '17.0.0',
  releaseNotesData.allReleaseNotes.find((rn) => rn.version === '17.0.0')?.markdown || '',
);

export const V16_0_0: StoryObj = createReleaseNoteStory(
  '16.0.0',
  releaseNotesData.allReleaseNotes.find((rn) => rn.version === '16.0.0')?.markdown || '',
);
