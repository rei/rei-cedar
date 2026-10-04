# Token filter video

A small, self-contained [Remotion](https://remotion.dev) project that renders the
journey from **all primitive palettes** to **the semantic color structure**:

1. Shows every palette in `web-tokens.json` (16 palettes, 290 steps) in the Cedar
   doc-site chrome.
2. Filters the grid to the steps whose hex appears in
   `.agents/skills/semantic-token-migration/references/semantic-colors.json`
   (51 steps across 14 palettes) — the rest ghost out and collapse.
3. Explains the semantic grammar one level at a time, following the reference:
   **Foundation → Family → Role → Identity → Expression**. Each row answers
   one simple question and shows only the relevant values — especially the six
   families: Universal, Graphic, Action, Feedback, Selection, and Control.
4. Applies OKLCH to interaction states: a stable `action / surface / brand`
   meaning is expressed as rest, hover, and active by tuning lightness/chroma
   while keeping the semantic identity stable.
5. Closes on the summary: 51/290 steps back 148/157 semantic tokens, with a note
   on the nine sale tokens (`#D44703`, `#FFE9E0`) that have no palette step.

Matching is an **exact hex match** (case-insensitive). That is deliberately
strict, so the video never claims a mapping the token files don't contain.

## Styling

The visual language follows Storybook / the Cedar doc site, and the values are
kept next to their sources:

- Chrome colors, fonts and radii: `.storybook/cedar-theme.ts` and
  `@rei/cdr-tokens/dist/docsite` (page `#f7f5f3`, card `#ffffff`, border
  `#d5cfc3`, ink `#2e2e2b`, brand `#1f513f`, radius 4/8).
- Type: Graphik (sans), Stuart (display serif), Pressura (mono) — the same
  families `src/styles/cdr-fonts.scss` declares. `npm run fonts` mirrors the
  woff2 files into `public/fonts` (gitignored) so renders are offline-safe.
- The dark closing note reuses the knockout surface from Storybook's code
  panels (`#2e2e2b`).

## Commands

```bash
npm install          # install Remotion + React (this folder only)
npm run build:data   # regenerate src/data/token-model.json from the repo JSONs
npm run fonts        # fetch Graphik / Pressura / Stuart into public/fonts
npm run dev          # build data + fonts, open Remotion Studio
npm run render       # render out/token-filter.mp4 (1920x1080, 30 fps, 52.7 s)
npm run still        # render one frame (out/token-filter.png, filtered grid)
npm run typecheck    # build data + tsc --noEmit
```

`web-tokens.json` is read from the repository root (two levels up). The project
does not modify the repository's sources; it only writes generated data
(`src/data/token-model.json`), fetched fonts (`public/fonts`) and render output
(`out/`), all gitignored.

## Structure

```
video/
├── scripts/build-data.mjs        # tokens + semantic colors -> model incl. structure tree
├── scripts/fetch-fonts.mjs       # mirrors the Storybook webfonts into public/fonts
├── src/
│   ├── index.ts                  # Remotion entry (registerRoot)
│   ├── Root.tsx                  # TokenFilter composition
│   ├── TokenFilter.tsx           # acts: palette grid / taxonomy / outro
│   ├── timeline.ts               # one timeline for all scenes (30 fps)
│   ├── theme.ts                  # doc-site tokens, fonts, geometry
│   ├── fonts.tsx                 # @font-face injection + delayRender loader
│   ├── data/model.ts             # typed access to the generated token model
│   ├── lib/color.ts              # luminance / readable ink on a swatch
│   ├── components/
│   │   ├── SwatchGrid.tsx        # palette grid: entrance, filter, reflow
│   │   ├── Header.tsx / Footer.tsx / StatChip.tsx
│   └── scenes/
│       ├── TitleOverlay.tsx
│       ├── TaxonomyScene.tsx     # Foundation → Family → Role → Identity → Expression
│       └── OutroOverlay.tsx
└── remotion.config.ts
```

## Editing the numbers

Everything the video says is computed from the two JSON sources at
`npm run build:data` time — counts, per-palette matched totals, and the
unmatched-hex note. Change
the sources and rebuild; no numbers are hard-coded in components.
