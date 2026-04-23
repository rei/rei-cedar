import type { Preview } from '@storybook/vue3';

// Import Cedar tokens CSS (provides CSS variables)
import '@rei/cdr-tokens/rei-dot-com/css/cdr-tokens.css';

// Import Cedar styles
import '../src/styles/cdr-reset.scss';
import '../src/styles/cdr-fonts.scss';
import '../src/styles/cdr-palette.scss';
import '../src/styles/cdr-fluid-vars.scss';

// Custom styles for Storybook
import './storybook.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#292929' },
        { name: 'sale', value: '#b11020' },
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
