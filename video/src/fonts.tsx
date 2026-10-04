import { continueRender, delayRender, staticFile } from 'remotion';
import { useEffect, useState } from 'react';

/**
 * Cedar's Storybook loads Graphik (sans), Stuart (serif display) and Pressura
 * (mono) from rei.com — see `src/styles/cdr-fonts.scss`. `scripts/fetch-fonts.mjs`
 * mirrors those files into `public/fonts` so renders stay offline-safe.
 */
const faces = [
  { family: 'Graphik', file: 'fonts/Graphik-VF-Web-Subset.woff2', weight: '1 999', variable: true },
  {
    family: 'Pressura',
    file: 'fonts/gt-pressura-mono-regular.woff2',
    weight: '400',
    variable: false,
  },
  { family: 'Pressura', file: 'fonts/gt-pressura-mono-bold.woff2', weight: '700', variable: false },
  {
    family: 'Stuart',
    file: 'fonts/REIStuart-VF-Web-Subset.woff2',
    weight: '1 999',
    variable: true,
  },
];

const fontCss = faces
  .map(
    (face) =>
      `@font-face { font-family: '${face.family}'; src: url('${staticFile(face.file)}') format('woff2${
        face.variable ? '-variations' : ''
      }'); font-weight: ${face.weight}; font-display: block; }`,
  )
  .join('\n');

export const FontFaces: React.FC = () => <style>{fontCss}</style>;

export const useCedarFonts = (): void => {
  const [handle] = useState(() => delayRender('Loading Cedar fonts'));

  useEffect(() => {
    const loads = [
      '1em Graphik',
      '600 1em Graphik',
      '1em Pressura',
      '700 1em Pressura',
      '1em Stuart',
    ];
    const timeout = new Promise<void>((resolve) => {
      setTimeout(resolve, 8000);
    });

    Promise.race([Promise.all(loads.map((font) => document.fonts.load(font))), timeout])
      .then(() => continueRender(handle))
      .catch(() => continueRender(handle));
  }, [handle]);
};
