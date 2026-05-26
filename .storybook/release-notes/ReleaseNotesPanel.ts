import React from 'react';
import { releaseNotesData } from '../generated/release-notes.generated';
import { markdownToHtml } from './markdown-to-html';

const panelStyle: React.CSSProperties = {
  padding: '16px 20px',
  fontFamily: 'Graphik, "Graphik fallback", "Helvetica Neue", sans-serif',
  lineHeight: 1.5,
};

const mutedStyle: React.CSSProperties = {
  marginTop: '16px',
  color: '#736e65',
  fontSize: '12px',
};

const contentStyleSheet = `
.release-notes-panel h1,
.release-notes-panel h2,
.release-notes-panel h3,
.release-notes-panel h4,
.release-notes-panel h5 {
  font-family: Stuart, "Stuart fallback", Georgia, serif;
  color: #1f513f;
  line-height: 1.25;
}
.release-notes-panel h2 {
  border-top: 1px solid #edeae3;
  padding-top: 12px;
  margin-top: 24px;
}
.release-notes-panel pre {
  background: #f7f5f3;
  border: 1px solid #edeae3;
  border-radius: 8px;
  padding: 10px;
  overflow-x: auto;
}
.release-notes-panel code {
  background: #f7f5f3;
  border: 1px solid #edeae3;
  border-radius: 4px;
  padding: 0 4px;
  font-family: Pressura, monospace;
}
.release-notes-panel table {
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
}
.release-notes-panel th,
.release-notes-panel td {
  text-align: left;
  border: 1px solid #edeae3;
  padding: 8px;
}
.release-notes-panel th {
  background: #f7f5f3;
}
.release-notes-panel .copy-chip {
  display: inline-block;
  margin: 6px 0 12px;
  padding: 2px 8px;
  border-radius: 999px;
  background: #f4f2ed;
  border: 1px solid #d5cfc3;
  color: #4b4a48;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}
`;

export function ReleaseNotesPanel(): React.ReactElement {
  const html = markdownToHtml(releaseNotesData.markdown);

  return React.createElement('section', { style: panelStyle }, [
    React.createElement('style', { key: 'panel-style-sheet' }, contentStyleSheet),
    React.createElement('div', {
      key: 'content',
      className: 'release-notes-panel',
      dangerouslySetInnerHTML: { __html: html },
    }),
    React.createElement(
      'div',
      { key: 'meta', style: mutedStyle },
      [
        `Selected file: ${releaseNotesData.selectedFile}`,
        `Available notes: ${releaseNotesData.availableFiles.length}`,
        `Changed files: ${releaseNotesData.changedFiles.length}`,
        `Generated: ${releaseNotesData.generatedAt}`,
      ].join(' | '),
    ),
  ]);
}
