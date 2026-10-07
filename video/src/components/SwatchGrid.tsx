import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Palette, PaletteStep, palettes, keptPalettes } from '../data/model';
import { textOn } from '../lib/color';
import {
  FOOTER_HEIGHT,
  GRID_PADDING_X,
  GRID_TOP,
  HEADER_HEIGHT,
  HEIGHT,
  theme,
  TRAY_GAP,
  TRAY_HEIGHT,
  WIDTH,
} from '../theme';
import { timeline } from '../timeline';

const COLUMN_GAP = 8;
const ROW_GAP = 4;
const NAME_HEIGHT = 58;

const bodyWidth = WIDTH - GRID_PADDING_X * 2;
const gridHeight = HEIGHT - HEADER_HEIGHT - FOOTER_HEIGHT - GRID_TOP - TRAY_HEIGHT - TRAY_GAP;
const swatchAreaHeight = gridHeight - NAME_HEIGHT;
const baseColumnWidth = (bodyWidth - (palettes.length - 1) * COLUMN_GAP) / palettes.length;
const finalColumnWidth = (bodyWidth - (keptPalettes.length - 1) * COLUMN_GAP) / keptPalettes.length;

const clamp = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
} as const;

type SwatchProps = {
  step: PaletteStep;
  stepIndex: number;
  columnIndex: number;
  keptStepIndex: number;
  matchedHeight: number;
  columnBaseHeight: number;
  columnReflow: number;
};

const Swatch: React.FC<SwatchProps> = ({
  step,
  stepIndex,
  columnIndex,
  keptStepIndex,
  matchedHeight,
  columnBaseHeight,
  columnReflow,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isMatched = step.semantic.length > 0;
  const tokenCount = step.semantic.length;

  const enter = spring({
    frame:
      frame -
      (timeline.gridInStart +
        columnIndex * timeline.gridInPerPalette +
        stepIndex * timeline.gridInPerStep),
    fps,
    config: { damping: 200, mass: 0.5 },
  });

  const filterDelay =
    timeline.filterStart +
    columnIndex * timeline.filterPerPalette +
    stepIndex * timeline.filterPerStep;
  const ghost = isMatched
    ? 0
    : interpolate(frame, [filterDelay, filterDelay + timeline.filterGhostDuration], [0, 1], {
        ...clamp,
        easing: Easing.inOut(Easing.quad),
      });
  const pulse = isMatched
    ? interpolate(frame, [filterDelay, filterDelay + 9, filterDelay + 28], [0, 1, 0], clamp)
    : 0;
  const ring = isMatched
    ? interpolate(frame, [filterDelay, filterDelay + 8, filterDelay + 30], [0, 0.45, 0.18], clamp)
    : 0;

  const sourceTop = stepIndex * (columnBaseHeight + ROW_GAP);
  const targetTop = keptStepIndex * (matchedHeight + ROW_GAP);
  const top = isMatched ? interpolate(columnReflow, [0, 1], [sourceTop, targetTop]) : sourceTop;
  const height = interpolate(
    columnReflow,
    [0, 1],
    [columnBaseHeight, isMatched ? matchedHeight : 0],
  );

  const opacity = enter * (1 - ghost * 0.9) * (isMatched ? 1 : 1 - columnReflow);
  const scale = 1 + pulse * 0.025 - ghost * 0.03;

  const labelIn = timeline.labelsIn + columnIndex * 1.5 + stepIndex * 1;
  const labelOpacity = isMatched ? interpolate(frame, [labelIn, labelIn + 10], [0, 1], clamp) : 0;
  const extraOpacity = interpolate(height, [62, 76], [0, 1], clamp);

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top,
        height,
        borderRadius: theme.radiusSoft,
        border: '1px solid rgba(46, 46, 43, 0.12)',
        backgroundColor: step.hex,
        boxShadow: isMatched ? `inset 0 0 0 1.5px rgba(31, 81, 63, ${ring * 0.45})` : 'none',
        opacity: Math.max(0, opacity),
        transform: `translateY(${(1 - enter) * 8}px) scale(${scale})`,
        filter: isMatched ? 'none' : `grayscale(${ghost})`,
        overflow: 'hidden',
        zIndex: isMatched ? 2 : 1,
      }}
    >
      {isMatched ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '6px 8px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            color: textOn(step.hex),
            opacity: labelOpacity,
          }}
        >
          <span
            style={{
              fontFamily: theme.fontMono,
              fontSize: 10.5,
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            {step.step}
          </span>
          <span
            style={{
              fontFamily: theme.fontMono,
              fontSize: 8.5,
              lineHeight: 1.1,
              opacity: 0.75,
            }}
          >
            {step.hex}
          </span>
          <span
            style={{
              fontFamily: theme.fontMono,
              fontSize: 9,
              lineHeight: 1.1,
              opacity: 0.62 * extraOpacity,
            }}
          >
            {tokenCount} token{tokenCount === 1 ? '' : 's'}
          </span>
        </div>
      ) : null}
    </div>
  );
};

type PaletteColumnProps = {
  palette: Palette;
  columnIndex: number;
  frame: number;
};

const PaletteColumn: React.FC<PaletteColumnProps> = ({ palette, columnIndex, frame }) => {
  const isKeptPalette = palette.matchedCount > 0;
  const keptIndex = keptPalettes.findIndex((kept) => kept.name === palette.name);
  const reflow = interpolate(
    frame,
    [
      timeline.reflowStart + columnIndex * timeline.reflowPerPalette,
      timeline.reflowStart + columnIndex * timeline.reflowPerPalette + timeline.reflowDuration,
    ],
    [0, 1],
    { ...clamp, easing: Easing.inOut(Easing.cubic) },
  );

  const sourceX = columnIndex * (baseColumnWidth + COLUMN_GAP);
  const targetX = isKeptPalette ? keptIndex * (finalColumnWidth + COLUMN_GAP) : sourceX;
  const x = interpolate(reflow, [0, 1], [sourceX, targetX]);
  const width = interpolate(
    reflow,
    [0, 1],
    [baseColumnWidth, isKeptPalette ? finalColumnWidth : 0],
  );
  const opacity = isKeptPalette ? 1 : 1 - reflow;

  const columnBaseHeight =
    (swatchAreaHeight - (palette.steps.length - 1) * ROW_GAP) / palette.steps.length;
  const matchedHeight =
    palette.matchedCount > 0
      ? (swatchAreaHeight - (palette.matchedCount - 1) * ROW_GAP) / palette.matchedCount
      : swatchAreaHeight;

  const matchedLabel = interpolate(
    frame,
    [timeline.reflowStart + 26 + columnIndex * 2, timeline.reflowStart + 38 + columnIndex * 2],
    [0, 1],
    clamp,
  );

  const hue = palette.steps[0]?.hue ?? null;
  let keptStepIndex = -1;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: 0,
        width,
        height: gridHeight,
        opacity,
      }}
    >
      <div
        style={{
          height: NAME_HEIGHT,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          paddingRight: 4,
        }}
      >
        <span
          style={{
            fontFamily: theme.fontSans,
            fontSize: 12.5,
            fontWeight: 600,
            lineHeight: 1.25,
            color: theme.ink,
            wordBreak: 'break-word',
          }}
        >
          {palette.name}
        </span>
        <span style={{ fontFamily: theme.fontMono, fontSize: 9.5, color: theme.muted }}>
          {hue !== null ? `h ${hue} · ` : ''}
          {palette.steps.length} steps
        </span>
        <span
          style={{
            fontFamily: theme.fontMono,
            fontSize: 9.5,
            color: theme.brand,
            opacity: matchedLabel,
          }}
        >
          {palette.matchedCount} matched
        </span>
      </div>

      <div style={{ position: 'relative', height: swatchAreaHeight }}>
        {palette.steps.map((step, stepIndex) => {
          const isMatched = step.semantic.length > 0;
          if (isMatched) keptStepIndex += 1;
          return (
            <Swatch
              key={step.step}
              step={step}
              stepIndex={stepIndex}
              columnIndex={columnIndex}
              keptStepIndex={isMatched ? keptStepIndex : 0}
              matchedHeight={matchedHeight}
              columnBaseHeight={columnBaseHeight}
              columnReflow={reflow}
            />
          );
        })}
      </div>
    </div>
  );
};

const Sweep: React.FC<{ frame: number }> = ({ frame }) => {
  const progress = interpolate(
    frame,
    [timeline.filterStart, timeline.filterStart + 72],
    [0, 1],
    clamp,
  );
  const opacity = interpolate(
    frame,
    [
      timeline.filterStart,
      timeline.filterStart + 8,
      timeline.filterStart + 58,
      timeline.filterStart + 72,
    ],
    [0, 1, 1, 0],
    clamp,
  );

  return (
    <div
      style={{
        position: 'absolute',
        top: -GRID_TOP,
        left: 0,
        width: 240,
        height: gridHeight + GRID_TOP,
        transform: `translateX(${progress * (bodyWidth + 240) - 240}px)`,
        background:
          'linear-gradient(90deg, rgba(31, 81, 63, 0) 0%, rgba(31, 81, 63, 0.05) 35%, rgba(31, 81, 63, 0.12) 50%, rgba(31, 81, 63, 0.05) 65%, rgba(31, 81, 63, 0) 100%)',
        opacity,
        pointerEvents: 'none',
      }}
    />
  );
};

export const SwatchGrid: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: 'absolute',
        left: GRID_PADDING_X,
        top: GRID_TOP,
        width: bodyWidth,
        height: gridHeight,
      }}
    >
      {palettes.map((palette, columnIndex) => (
        <PaletteColumn
          key={palette.name}
          palette={palette}
          columnIndex={columnIndex}
          frame={frame}
        />
      ))}
      <Sweep frame={frame} />
    </div>
  );
};
