import type { Meta, StoryObj } from '@storybook/vue3';
import { defineComponent, h } from 'vue';
import { releaseNotesData } from '../.storybook/generated/release-notes.generated';
import { markdownToHtml } from '../.storybook/release-notes/markdown-to-html';

const releaseNotesChrome = `
  <style>
    .release-notes-shell {
      background: radial-gradient(circle at 0% 0%, #f1f7f4 0%, #fafbf9 45%, #ffffff 100%);
      border: 1px solid #e3e0d8;
      border-radius: 14px;
      padding: 32px 28px;
    }
    .release-notes {
      max-width: 860px;
      margin: 0 auto;
      font-family: Graphik, "Graphik fallback", "Helvetica Neue", sans-serif;
      color: #2e2e2b;
      line-height: 1.66;
    }
    .release-notes h1,
    .release-notes h2,
    .release-notes h3,
    .release-notes h4,
    .release-notes h5 {
      font-family: Stuart, "Stuart fallback", Georgia, serif;
      color: #1f513f;
      margin: 1.4rem 0 0.8rem;
      line-height: 1.25;
    }
    .release-notes h1 {
      font-size: 2.35rem;
      margin-top: 0;
    }
    .release-notes h2 {
      border-top: 1px solid #edeae3;
      margin-top: 2.1rem;
      padding-top: 1.4rem;
      font-size: 1.6rem;
    }
    .release-notes h3 {
      font-size: 1.3rem;
    }
    .release-notes p,
    .release-notes li {
      font-size: 15px;
    }
    .release-notes h1 + p {
      font-size: 1.06rem;
      color: #4b4a48;
      margin-top: 0.2rem;
      margin-bottom: 1.25rem;
    }
    .release-notes ul {
      padding-left: 1.25rem;
    }
    .release-notes ol {
      padding-left: 1.4rem;
    }
    .release-notes blockquote {
      margin: 1rem 0;
      padding: 0.7rem 0.9rem;
      border-left: 4px solid #1f513f;
      background: #f7f9f7;
      color: #2e2e2b;
    }
    .release-notes code {
      background: #f7f5f3;
      border: 1px solid #edeae3;
      border-radius: 4px;
      padding: 0 4px;
      font-family: Pressura, monospace;
      font-size: 13px;
    }
    .release-notes pre {
      background: #f7f5f3;
      border: 1px solid #edeae3;
      border-radius: 8px;
      padding: 12px;
      overflow-x: auto;
    }
    .release-notes table {
      width: 100%;
      border-collapse: collapse;
      margin: 0.9rem 0 1.1rem;
      background: #fff;
      border: 1px solid #edeae3;
      border-radius: 8px;
      overflow: hidden;
      display: block;
    }
    .release-notes thead,
    .release-notes tbody,
    .release-notes tr {
      display: table;
      width: 100%;
      table-layout: fixed;
    }
    .release-notes th,
    .release-notes td {
      text-align: left;
      padding: 10px 12px;
      border-bottom: 1px solid #edeae3;
      vertical-align: top;
      font-size: 14px;
    }
    .release-notes th {
      background: #f7f5f3;
      font-weight: 600;
    }
    .release-notes tr:last-child td {
      border-bottom: none;
    }
    .release-notes .copy-chip {
      display: inline-block;
      margin: 0.35rem 0 0.9rem;
      padding: 2px 8px;
      border-radius: 999px;
      background: #f4f2ed;
      border: 1px solid #d5cfc3;
      color: #4b4a48;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }
    .release-notes a {
      color: #1b437e;
      text-underline-offset: 2px;
    }
    .release-notes-meta {
      margin-top: 24px;
      font-size: 12px;
      color: #736e65;
      border-top: 1px solid #edeae3;
      padding-top: 12px;
    }
  </style>
`;

const ReleaseNotesView = defineComponent({
  name: 'ReleaseNotesView',
  setup() {
    const html = markdownToHtml(releaseNotesData.markdown);
    const meta = `Selected file: ${releaseNotesData.selectedFile} | Available files: ${releaseNotesData.availableFiles.length} | Generated: ${releaseNotesData.generatedAt}`;

    return () =>
      h('div', {
        innerHTML: `
          ${releaseNotesChrome}
          <section class="release-notes-shell">
            <article class="release-notes">
              ${html}
              <p class="release-notes-meta">${meta}</p>
            </article>
          </section>
        `,
      });
  },
});

const meta: Meta<typeof ReleaseNotesView> = {
  title: 'Release Notes/Current',
  component: ReleaseNotesView,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
};

export default meta;
type Story = StoryObj<typeof ReleaseNotesView>;

export const Current: Story = {};
