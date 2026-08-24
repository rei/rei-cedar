import { addons } from 'storybook/manager-api';
import { cedarTheme } from './cedar-theme';

// Load Cedar fonts and sidebar overrides in the manager frame
import './manager.css';

addons.setConfig({
  theme: cedarTheme,
  showPanel: false,
});
