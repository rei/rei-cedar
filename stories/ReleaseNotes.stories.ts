import type { Meta, StoryObj } from '@storybook/vue3';
import { defineComponent, h } from 'vue';
import { releaseNotesData } from '../.storybook/generated/release-notes.generated';
import { markdownToHtml } from '../.storybook/release-notes/markdown-to-html';

const ReleaseNotesView = defineComponent({
  name: 'ReleaseNotesView',
  setup() {
    const html = markdownToHtml(releaseNotesData.markdown);
    const meta = `Selected file: ${releaseNotesData.selectedFile} | Available files: ${releaseNotesData.availableFiles.length} | Generated: ${releaseNotesData.generatedAt}`;

    return () =>
      h('div', {
        class: 'docs-page cdr-doc-content',
        innerHTML: `
          <article>
            ${html}
            <p class="release-notes-meta">${meta}</p>
          </article>
        `,
      });
  },
});

const meta: Meta<typeof ReleaseNotesView> = {
  title: 'Release Notes/V17.0.0',
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

export const Overview: Story = {};
