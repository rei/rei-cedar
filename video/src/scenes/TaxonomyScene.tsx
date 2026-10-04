import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { palettes, structure } from '../data/model';
import { eyebrowStyle, theme } from '../theme';

const taxonomyAccent = '#e6500f';
const STEP_FRAMES = 150;

/** Gentle overshoot entrances — staged, eased, never linear. */
const RISE_CONFIG = { damping: 30, stiffness: 170, mass: 0.9 } as const;

const familyById = (id: string) => structure.find((category) => category.id === id);

const SwatchStrip: React.FC<{ swatches: string[]; height?: number }> = ({
  swatches,
  height = 14,
}) => (
  <div style={{ display: 'flex', gap: 3 }}>
    {swatches.slice(0, 12).map((hex) => (
      <div
        key={hex}
        style={{
          flex: 1,
          height,
          borderRadius: 3,
          backgroundColor: hex,
          boxShadow: 'inset 0 0 0 1px rgba(46, 46, 43, 0.1)',
        }}
      />
    ))}
  </div>
);

type ExpressionItem = {
  value: string;
  token: string;
  hex: string;
  location: string;
  usage: string;
};

type Step = {
  label: string;
  description: string;
  migration: string;
  values?: string[];
  components?: { name: string; note: string; familyId: string }[];
  roles?: { name: string; usage: string; example: string }[];
  identities?: { name: string; token: string; hex: string; location: string; hue: string }[];
  expressions?: ExpressionItem[];
};

const steps: Step[] = [
  {
    label: 'Foundation',
    description: 'The system domain.',
    migration:
      'Color is the first foundation to go semantic. Size, spacing, radius and type follow the same grammar later — migrate color first.',
    values: ['Color'],
  },
  {
    label: 'Family',
    description: 'Why the thing exists.',
    migration:
      'A component migrates by intent, not by name. CdrButton is action because it submits — the same button never borrows feedback tokens for its rest state.',
    components: [
      { name: 'Action', note: 'CdrButton · CdrLink — submits, navigates', familyId: 'action' },
      { name: 'Feedback', note: 'CdrBanner · CdrToast — system status', familyId: 'feedback' },
      { name: 'Selection', note: 'CdrChip · tiles — “I want this one”', familyId: 'selection' },
      { name: 'Control', note: 'CdrInput · CdrSwitch — configures in place', familyId: 'control' },
      { name: 'Graphic', note: 'static rating stars — decorative', familyId: 'graphic' },
      { name: 'Universal', note: 'plain surfaces and text — omitted', familyId: 'universal' },
    ],
  },
  {
    label: 'Role',
    description: 'What job it performs.',
    migration:
      'Every color a component paints sits in exactly one layer of the box. Find the layer, and the role names itself.',
    roles: [
      {
        name: 'Surface',
        usage: 'backgrounds, fills, panels',
        example: '--cdr-color-action-surface-brand',
      },
      { name: 'Text', usage: 'type color', example: '--cdr-color-action-text-brand' },
      {
        name: 'Border',
        usage: 'lines, outlines, focus rings',
        example: '--cdr-color-action-border-brand',
      },
      {
        name: 'Icon',
        usage: 'glyph fills — independent of text',
        example: '--cdr-color-action-icon-neutral-bold',
      },
    ],
  },
  {
    label: 'Identity',
    description: 'What it means.',
    migration:
      'The meaning resolves to one primitive family each — an OKLCH hue curve. Retired names disappear: inverse becomes neutral at bold intensity, link becomes trigger.',
    identities: [
      {
        name: 'Brand',
        token: '--cdr-color-text-brand',
        hex: '#143528',
        location: 'blue-spruce-green · 1400',
        hue: '166',
      },
      {
        name: 'Accent',
        token: '--cdr-color-text-accent',
        hex: '#E5FD9C',
        location: 'lichen · 100',
        hue: '120',
      },
      {
        name: 'Trigger',
        token: '--cdr-color-action-text-trigger',
        hex: '#3D6DB9',
        location: 'alpine-lake-blue · 1100',
        hue: '259',
      },
      {
        name: 'Info',
        token: '--cdr-color-feedback-text-info-bold',
        hex: '#165154',
        location: 'info-blue · 1300',
        hue: '200',
      },
      {
        name: 'Success',
        token: '--cdr-color-feedback-text-success-bold',
        hex: '#1E5525',
        location: 'success-green · 1300',
        hue: '146',
      },
      {
        name: 'Warning',
        token: '--cdr-color-feedback-text-warning-bold',
        hex: '#5B4500',
        location: 'warning-yellow · 1300',
        hue: '92',
      },
      {
        name: 'Error',
        token: '--cdr-color-feedback-text-error-bold',
        hex: '#880E05',
        location: 'error-red · 1300',
        hue: '30',
      },
      {
        name: 'Sale',
        token: '--cdr-color-text-sale',
        hex: '#D44703',
        location: 'no exact palette step',
        hue: '39',
      },
      {
        name: 'Neutral',
        token: '--cdr-color-text-neutral',
        hex: '#746E63',
        location: 'warm-grey · 1100',
        hue: '82',
      },
      {
        name: 'Natural',
        token: '--cdr-color-text-natural',
        hex: '#F8F7F2',
        location: 'natural-grey · 050',
        hue: '89',
      },
      {
        name: 'Membership',
        token: '--cdr-color-surface-membership',
        hex: '#FFDB22',
        location: 'membership-yellow · 300',
        hue: '95',
      },
      {
        name: 'Rating',
        token: '--cdr-color-graphic-border-rating',
        hex: '#BA7B00',
        location: 'golden-yellow · 900',
        hue: '78',
      },
    ],
  },
  {
    label: 'Expression',
    description: 'How strongly it expresses itself.',
    migration:
      'Same identity, different prominence. Hover and active are expression moves — lightness and chroma shift, hue and meaning stay put.',
    expressions: [
      {
        value: 'Trace',
        token: '--cdr-color-surface-neutral-trace',
        hex: '#FFFFFF',
        location: 'warm-grey · 000',
        usage: 'faintest surfaces · disabled grounds',
      },
      {
        value: 'Faint',
        token: '--cdr-color-action-surface-brand-faint',
        hex: '#BFDDCA',
        location: 'sage-green · 400',
        usage: 'button hover — lighter response',
      },
      {
        value: 'Subtle',
        token: '--cdr-color-surface-neutral-subtle',
        hex: '#F7F7F5',
        location: 'warm-grey · 050',
        usage: 'quiet separation',
      },
      {
        value: 'Base',
        token: '--cdr-color-action-surface-brand',
        hex: '#143528',
        location: 'blue-spruce-green · 1400',
        usage: 'default rest state — suffix omitted',
      },
      {
        value: 'Prominent',
        token: '--cdr-color-text-neutral-prominent',
        hex: '#4C473E',
        location: 'warm-grey · 1300',
        usage: 'emphasized text',
      },
      {
        value: 'Bold',
        token: '--cdr-color-text-neutral-bold',
        hex: '#312D27',
        location: 'warm-grey · 1400',
        usage: 'strongest text · error text',
      },
      {
        value: 'Intense',
        token: '--cdr-color-surface-neutral-intense',
        hex: '#312D27',
        location: 'warm-grey · 1400',
        usage: 'inverse / dark surfaces',
      },
    ],
  },
];

const StepProgress: React.FC<{ active: number }> = ({ active }) => (
  <div style={{ display: 'flex', gap: 6 }}>
    {steps.map((step, index) => (
      <div
        key={step.label}
        style={{
          width: 44,
          height: 3,
          borderRadius: 2,
          backgroundColor: index <= active ? taxonomyAccent : theme.border,
        }}
      />
    ))}
  </div>
);

const LayerTag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    style={{
      position: 'absolute',
      top: -11,
      left: 14,
      backgroundColor: theme.card,
      border: `1px solid ${theme.border}`,
      borderRadius: 4,
      padding: '2px 8px',
      fontFamily: theme.fontMono,
      fontSize: 9.5,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: theme.muted,
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </span>
);

/** One button, four color layers — the box model as a role map. */
const BoxModel: React.FC<{ local: number; fps: number }> = ({ local, fps }) => {
  const layer = (index: number, base = 6, every = 10) =>
    spring({ frame: local - (base + index * every), fps, config: RISE_CONFIG });
  const styleFor = (index: number): React.CSSProperties => {
    const progress = layer(index);
    return {
      opacity: progress,
      transform: `translateY(${(1 - progress) * 12}px) scale(${1 - (1 - progress) * 0.015})`,
    };
  };

  return (
    <div
      style={{
        flex: 1.15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 0,
      }}
    >
      <div style={{ width: '100%', maxWidth: 640 }}>
        <div
          style={{
            position: 'relative',
            border: '1.5px dashed rgba(46, 46, 43, 0.25)',
            borderRadius: 16,
            padding: 30,
            ...styleFor(0),
          }}
        >
          <LayerTag>margin · spacing, not color</LayerTag>
          <div
            style={{
              position: 'relative',
              border: '4px solid #746E63',
              borderRadius: 12,
              padding: 26,
              backgroundColor: theme.card,
              ...styleFor(1),
            }}
          >
            <LayerTag>border</LayerTag>
            <div
              style={{
                position: 'relative',
                backgroundColor: '#143528',
                borderRadius: 9,
                padding: '30px 38px',
                ...styleFor(2),
              }}
            >
              <LayerTag>surface</LayerTag>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: theme.fontSans,
                    fontSize: 30,
                    fontWeight: 600,
                    color: '#FFFFFF',
                    ...styleFor(3),
                  }}
                >
                  Add to cart
                </span>
                <span
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 7,
                    backgroundColor: '#E5FD9C',
                    ...styleFor(4),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 8,
            marginTop: 12,
            opacity: layer(5),
          }}
        >
          <span
            style={{
              fontFamily: theme.fontMono,
              fontSize: 10,
              letterSpacing: 1,
              textTransform: 'uppercase',
              color: theme.brand,
              backgroundColor: '#f1f7f2',
              borderRadius: 999,
              padding: '4px 10px',
            }}
          >
            text
          </span>
          <span
            style={{
              fontFamily: theme.fontMono,
              fontSize: 10,
              letterSpacing: 1,
              textTransform: 'uppercase',
              color: theme.brand,
              backgroundColor: '#f1f7f2',
              borderRadius: 999,
              padding: '4px 10px',
            }}
          >
            icon
          </span>
          <span style={{ fontFamily: theme.fontSans, fontSize: 12, color: theme.muted }}>
            live inside the surface — the label and the glyph
          </span>
        </div>
      </div>
    </div>
  );
};

const RoleLegend: React.FC<{ roles: NonNullable<Step['roles']>; local: number; fps: number }> = ({
  roles,
  local,
  fps,
}) => {
  const lit = Math.min(roles.length - 1, Math.max(-1, Math.floor((local - 12) / 10)));

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 10,
        minWidth: 0,
      }}
    >
      {roles.map((role, index) => {
        const progress = spring({
          frame: local - (14 + index * 6),
          fps,
          config: RISE_CONFIG,
        });
        const isLit = index <= lit;
        return (
          <div
            key={role.name}
            style={{
              backgroundColor: isLit ? '#f1f7f2' : theme.card,
              border: `1px solid ${isLit ? theme.brand : theme.border}`,
              borderRadius: theme.radius,
              boxShadow: theme.shadow,
              padding: '13px 16px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              opacity: progress,
              transform: `translateX(${(1 - progress) * 14}px)`,
            }}
          >
            <span
              style={{
                fontFamily: theme.fontMono,
                fontSize: 14,
                letterSpacing: 1,
                textTransform: 'uppercase',
                color: isLit ? theme.brand : theme.ink,
              }}
            >
              {role.name}
            </span>
            <span style={{ fontFamily: theme.fontSans, fontSize: 12.5, color: theme.text }}>
              {role.usage}
            </span>
            <span
              style={{
                fontFamily: theme.fontMono,
                fontSize: 10,
                color: theme.muted,
                wordBreak: 'break-all',
              }}
            >
              {role.example}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const HueOrderStrip: React.FC<{ identities: NonNullable<Step['identities']> }> = ({
  identities,
}) => {
  const ordered = [...identities].sort((a, b) => Number(a.hue) - Number(b.hue));
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        paddingTop: 4,
      }}
    >
      <div style={{ display: 'flex', gap: 4 }}>
        {ordered.map((identity) => (
          <div
            key={identity.name}
            title={`${identity.name} · hue ${identity.hue}`}
            style={{
              flex: 1,
              height: 22,
              borderRadius: 4,
              backgroundColor: identity.hex,
              boxShadow: 'inset 0 0 0 1px rgba(46, 46, 43, 0.12)',
            }}
          />
        ))}
      </div>
      <span style={{ fontFamily: theme.fontMono, fontSize: 9.5, color: theme.muted }}>
        ordered by OKLCH hue, 30° → 259° — each identity is one hue curve
      </span>
    </div>
  );
};

const StepContent: React.FC<{ start: number; step: Step }> = ({ start, step }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - start;
  const enter = spring({ frame: local, fps, config: RISE_CONFIG });
  const rise = (index: number, base = 10, every = 5) =>
    spring({ frame: local - (base + index * every), fps, config: RISE_CONFIG });
  const riseStyle = (index: number, base?: number, every?: number): React.CSSProperties => {
    const progress = rise(index, base, every);
    return {
      opacity: progress,
      transform: `translateY(${(1 - progress) * 14}px)`,
    };
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '300px minmax(0, 1fr)',
        gap: 32,
        flex: 1,
        minHeight: 0,
        opacity: enter,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center' }}>
        <span
          style={{
            fontFamily: theme.fontSans,
            fontSize: 26,
            fontWeight: 600,
            color: taxonomyAccent,
            textTransform: 'uppercase',
          }}
        >
          {step.label}
        </span>
        <span
          style={{
            fontFamily: theme.fontSans,
            fontSize: 21,
            fontStyle: 'italic',
            fontWeight: 600,
            color: theme.ink,
            lineHeight: 1.3,
          }}
        >
          {step.description}
        </span>
        <span
          style={{
            fontFamily: theme.fontSans,
            fontSize: 13.5,
            lineHeight: 1.5,
            color: theme.text,
          }}
        >
          {step.migration}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        {step.values ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, ...riseStyle(0) }}>
              <span
                style={{
                  fontFamily: theme.fontMono,
                  fontSize: 30,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: theme.ink,
                }}
              >
                Color
              </span>
              <span
                style={{
                  fontFamily: theme.fontSans,
                  fontSize: 14,
                  color: theme.muted,
                  maxWidth: 560,
                }}
              >
                Every token in this video lives in the color domain — the primitive the filter ran
                over.
              </span>
            </div>
            <div
              style={{
                backgroundColor: theme.card,
                border: `1px solid ${theme.border}`,
                borderRadius: theme.radius,
                boxShadow: theme.shadow,
                padding: '14px 16px 12px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                ...riseStyle(1),
              }}
            >
              <span
                style={{
                  fontFamily: theme.fontMono,
                  fontSize: 10.5,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                  color: theme.muted,
                }}
              >
                one primitive family · blue-spruce-green · hue 166
              </span>
              <div style={{ display: 'flex', gap: 4 }}>
                {(
                  palettes.find((palette) => palette.name === 'blue-spruce-green')?.steps ?? []
                ).map((paletteStep) => (
                  <div
                    key={paletteStep.step}
                    style={{
                      flex: 1,
                      height: 34,
                      borderRadius: 4,
                      backgroundColor: paletteStep.hex,
                      boxShadow: 'inset 0 0 0 1px rgba(46, 46, 43, 0.1)',
                    }}
                  />
                ))}
              </div>
              <span style={{ fontFamily: theme.fontMono, fontSize: 10, color: theme.muted }}>
                18 steps · one OKLCH hue curve — the raw material semantic names resolve to
              </span>
            </div>
          </div>
        ) : null}

        {step.components ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: 14,
              flex: 1,
              alignContent: 'center',
            }}
          >
            {step.components.map((component, index) => {
              const family = familyById(component.familyId);
              return (
                <div
                  key={component.name}
                  style={{
                    backgroundColor: theme.card,
                    border: `1px solid ${theme.border}`,
                    borderRadius: theme.radius,
                    boxShadow: theme.shadow,
                    padding: '18px 18px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 5,
                    ...riseStyle(index, 10, 4),
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: theme.fontMono,
                        fontSize: 16,
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                        color: theme.ink,
                      }}
                    >
                      {component.name}
                    </span>
                    <span
                      style={{ fontFamily: theme.fontMono, fontSize: 10.5, color: theme.muted }}
                    >
                      {family?.count ?? ''} tokens
                    </span>
                  </div>
                  <span style={{ fontFamily: theme.fontSans, fontSize: 13, color: theme.text }}>
                    {component.note}
                  </span>
                  <div style={{ paddingTop: 8 }}>
                    {family ? <SwatchStrip swatches={family.swatches} /> : null}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        {step.roles ? (
          <div
            style={{
              display: 'flex',
              gap: 32,
              flex: 1,
              minHeight: 0,
              alignItems: 'center',
            }}
          >
            <BoxModel
              local={local}
              fps={fps}
            />
            <RoleLegend
              roles={step.roles}
              local={local}
              fps={fps}
            />
          </div>
        ) : null}

        {step.identities ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              minHeight: 0,
              justifyContent: 'space-evenly',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
                gap: 10,
              }}
            >
              {step.identities.map((identity, index) => (
                <div
                  key={identity.name}
                  style={{
                    backgroundColor: theme.card,
                    border: `1px solid ${theme.border}`,
                    borderRadius: 6,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    ...riseStyle(index, 10, 3),
                  }}
                >
                  <div style={{ height: 40, backgroundColor: identity.hex }} />
                  <div
                    style={{
                      padding: '8px 10px 9px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: theme.fontMono,
                        fontSize: 11.5,
                        textTransform: 'uppercase',
                        letterSpacing: 0.8,
                        color: theme.ink,
                      }}
                    >
                      {identity.name}
                    </span>
                    <span
                      style={{
                        fontFamily: theme.fontMono,
                        fontSize: 9,
                        color: theme.muted,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {identity.hex} · {identity.location}
                    </span>
                    <span style={{ fontFamily: theme.fontMono, fontSize: 9, color: theme.faint }}>
                      hue {identity.hue}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div style={riseStyle(4, 26, 5)}>
              <HueOrderStrip identities={step.identities} />
            </div>
          </div>
        ) : null}

        {step.expressions && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              minHeight: 0,
              justifyContent: 'space-evenly',
            }}
          >
            {step.expressions.map((expression, index) => (
              <div
                key={expression.value}
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    '110px 40px minmax(0, 300px) minmax(0, 1fr) minmax(0, 300px)',
                  alignItems: 'center',
                  gap: 14,
                  ...riseStyle(index, 10, 4),
                }}
              >
                <span
                  style={{
                    fontFamily: theme.fontMono,
                    fontSize: 13,
                    textTransform: 'uppercase',
                    letterSpacing: 0.8,
                    color: theme.ink,
                  }}
                >
                  {expression.value}
                </span>
                <span
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 6,
                    backgroundColor: expression.hex,
                    border: '1px solid rgba(46, 46, 43, 0.14)',
                  }}
                />
                <span
                  style={{
                    fontFamily: theme.fontMono,
                    fontSize: 10.5,
                    color: theme.ink,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {expression.token}
                  <span style={{ display: 'block', fontSize: 9.5, color: theme.muted }}>
                    {expression.hex} · {expression.location}
                  </span>
                </span>
                <span
                  style={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: theme.cardMuted,
                    overflow: 'hidden',
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      width: `${Math.round(((index + 1) / step.expressions!.length) * 100)}%`,
                      height: '100%',
                      borderRadius: 3,
                      backgroundColor: theme.brand,
                    }}
                  />
                </span>
                <span style={{ fontFamily: theme.fontSans, fontSize: 12.5, color: theme.text }}>
                  {expression.usage}
                </span>
              </div>
            ))}
            <span
              style={{
                fontFamily: theme.fontSans,
                fontSize: 12.5,
                color: theme.muted,
                ...riseStyle(7, 10, 4),
              }}
            >
              Hover and active are expression moves: a button rests at base (#143528), hovers
              lighter at faint (#BFDDCA) — lightness and chroma shift, hue and meaning stay put.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export const TaxonomyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneOpacity = interpolate(frame, [0, 16, 738, 750], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const active = Math.min(steps.length - 1, Math.max(0, Math.floor((frame - 14) / STEP_FRAMES)));
  const step = steps[active];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '24px 40px 22px',
        backgroundColor: theme.pageBg,
        opacity: sceneOpacity,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: 14,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <span style={eyebrowStyle}>after filtering · semantic color grammar</span>
          <span
            style={{
              fontFamily: theme.fontSerif,
              fontSize: 44,
              lineHeight: 1.05,
              color: theme.ink,
            }}
          >
            One color, five questions
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
          <span
            style={{
              fontFamily: theme.fontMono,
              fontSize: 11,
              letterSpacing: 1.6,
              color: theme.muted,
            }}
          >
            {String(active + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')} ·{' '}
            {step.label}
          </span>
          <StepProgress active={active} />
        </div>
      </div>

      <div
        style={{
          borderTop: `1px dotted ${theme.borderStrong}`,
          borderBottom: `1px dotted ${theme.borderStrong}`,
          padding: '20px 0',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
        }}
      >
        <StepContent
          key={step.label}
          start={14 + active * STEP_FRAMES}
          step={step}
        />
      </div>
    </div>
  );
};
