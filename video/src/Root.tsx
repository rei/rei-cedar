import { Composition } from 'remotion';
import { TokenFilter } from './TokenFilter';
import { DURATION_IN_FRAMES, FPS, HEIGHT, WIDTH } from './theme';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="TokenFilter"
      component={TokenFilter}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
