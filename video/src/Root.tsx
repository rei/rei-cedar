import { Composition } from 'remotion';
import { CedarFilm } from './film/CedarFilm';
import { DURATION_IN_FRAMES, FPS, HEIGHT, WIDTH } from './theme';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="CedarSemanticTokens"
      component={CedarFilm}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
