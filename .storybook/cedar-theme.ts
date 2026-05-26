import { create } from 'storybook/theming/create';

/**
 * Cedar doc-site theme for Storybook.
 *
 * Values sourced from **docsite** tokens (rei-cedar-tokens/dist/docsite/).
 * Storybook's `create()` API requires static values — CSS custom properties
 * are not supported. Each value is annotated with its Cedar token mapping.
 */
export const cedarTheme = create({
  base: 'light',

  // Brand
  brandTitle: 'Cedar Design System',
  brandUrl: 'https://cedar.rei.com',
  brandTarget: '_blank',

  // Chrome colors (sidebar, toolbar)
  colorPrimary: '#1f513f', // $cdr-color-text-brand
  colorSecondary: '#1f513f', // $cdr-color-text-brand — matches doc site selected accent

  // UI
  appBg: '#f7f5f3', // $cdr-color-background-primary
  appContentBg: '#f7f5f3', // $cdr-color-background-primary — matches doc site page bg
  appPreviewBg: '#ffffff', // $cdr-color-background-secondary
  appBorderColor: '#d5cfc3', // $cdr-color-border-primary
  appBorderRadius: 4,

  // Text
  textColor: '#4b4a48', // $cdr-color-text-secondary
  textInverseColor: '#fafbf9', // $cdr-color-text-inverse
  textMutedColor: '#736e65', // warm-grey-700 — no docsite token

  // Toolbar
  barTextColor: '#736e65', // warm-grey-700 — no docsite token
  barSelectedColor: '#1f513f', // $cdr-color-text-brand
  barHoverColor: '#1f513f', // $cdr-color-text-brand — matches doc site hover
  barBg: '#ffffff', // $cdr-color-background-secondary

  // Inputs
  inputBg: '#ffffff', // $cdr-color-background-secondary
  inputBorder: '#958e83', // $cdr-color-border-secondary
  inputTextColor: '#2e2e2b', // $cdr-color-text-emphasis
  inputBorderRadius: 4,

  // Typography
  fontBase: 'Graphik, "Graphik fallback", "Helvetica Neue", sans-serif', // $cdr-font-family-sans
  fontCode: 'Pressura, "Courier New", monospace', // Pressura from $cdr-font-family-mono-brand-font + monospace fallback
});
