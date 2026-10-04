/**
 * Single timeline for the whole composition (30 fps, 1580 frames = 52.7s).
 * Holds are generous on purpose: every slide stays up long enough to read.
 */
export const timeline = {
  /** Big intro title. */
  titleIn: 0,
  titleOut: 140,
  /** Swatches pop in, palette by palette. */
  gridInStart: 128,
  gridInPerPalette: 2,
  gridInPerStep: 1.4,
  /** Filter: unmatched swatches ghost out left to right. */
  filterStart: 340,
  filterPerPalette: 3,
  filterPerStep: 0.7,
  filterGhostDuration: 22,
  /** Reflow: surviving swatches expand, empty palettes collapse. */
  reflowStart: 470,
  reflowPerPalette: 0.8,
  reflowDuration: 36,
  /** Step/hex labels fade onto the surviving swatches. */
  labelsIn: 500,
  /** Grid fades out, then the semantic taxonomy appears. */
  structureIn: 620,
  /** Five taxonomy questions, one at a time — 5s each to read. */
  taxonomyIn: 620,
  taxonomyOut: 1370,
  /** Summary card. */
  outroIn: 1390,
} as const;
