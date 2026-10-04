import { AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame } from 'remotion';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { SwatchGrid } from './components/SwatchGrid';
import { FontFaces, useCedarFonts } from './fonts';
import { OutroOverlay } from './scenes/OutroOverlay';
import { TaxonomyScene } from './scenes/TaxonomyScene';
import { TitleOverlay } from './scenes/TitleOverlay';
import { FOOTER_HEIGHT, HEADER_HEIGHT, HEIGHT, theme } from './theme';
import { timeline } from './timeline';

/** Palette grid, fading out as the semantic explanation arrives. */
const GridAct: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [timeline.structureIn - 20, timeline.structureIn + 24],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.in(Easing.cubic),
    },
  );

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 2, opacity }}>
      <SwatchGrid />
    </div>
  );
};

export const TokenFilter: React.FC = () => {
  useCedarFonts();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.pageBg,
        color: theme.text,
        fontFamily: theme.fontSans,
      }}
    >
      <FontFaces />

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: HEADER_HEIGHT,
          backgroundColor: theme.card,
          borderBottom: `1px solid ${theme.border}`,
        }}
      >
        <Header />
      </div>

      <div
        style={{
          position: 'absolute',
          top: HEADER_HEIGHT,
          left: 0,
          right: 0,
          height: HEIGHT - HEADER_HEIGHT - FOOTER_HEIGHT,
        }}
      >
        <GridAct />

        <Sequence
          from={timeline.taxonomyIn}
          durationInFrames={timeline.taxonomyOut - timeline.taxonomyIn}
        >
          <TaxonomyScene />
        </Sequence>

        <TitleOverlay />
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: FOOTER_HEIGHT,
          borderTop: `1px solid ${theme.border}`,
        }}
      >
        <Footer />
      </div>

      <OutroOverlay />
    </AbsoluteFill>
  );
};
