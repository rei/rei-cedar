import type { Preview } from '@storybook/vue3';
import { cedarTheme } from './cedar-theme';

// Import Cedar tokens CSS (provides CSS variables)
import '@rei/cdr-tokens/css';
// @rei/cdr-tokens 15.0.0-alpha.2 ships the semantic foundations as separate
// files; the main CSS entry does not import them yet.
import '@rei/cdr-tokens/css/color-action';
import '@rei/cdr-tokens/css/color-control';
import '@rei/cdr-tokens/css/color-feedback';
import '@rei/cdr-tokens/css/color-graphik';
import '@rei/cdr-tokens/css/color-selection';
import '@rei/cdr-tokens/css/color-surface';

// Import Cedar styles
import '../src/styles/cdr-reset.scss';
import '../src/styles/cdr-fonts.scss';
import '../src/styles/cdr-palette.scss';

// Custom styles for Storybook
import './storybook.scss';
import './_content.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: cedarTheme,
      toc: false,
    },
    options: {
      storySort: {
        order: ['Release Notes', '*'],
      },
    },
    backgrounds: {
      default: 'cedar-primary',
      values: [
        { name: 'cedar-light', value: '#fafbf9' },
        { name: 'cedar-primary', value: '#ffffff' },
        { name: 'cedar-secondary', value: '#f7f5f3' },
        { name: 'cedar-dark', value: '#2e2e2b' },
        { name: 'cedar-spruce', value: '#1f513f' },
        { name: 'cedar-sale', value: '#c7370f' },
      ],
    },
    viewport: {
      viewports: {
        xs: {
          name: 'Extra Small (xs)',
          styles: { width: '320px', height: '568px' },
        },
        sm: {
          name: 'Small (sm)',
          styles: { width: '768px', height: '1024px' },
        },
        md: {
          name: 'Medium (md)',
          styles: { width: '992px', height: '768px' },
        },
        lg: {
          name: 'Large (lg)',
          styles: { width: '1232px', height: '900px' },
        },
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
