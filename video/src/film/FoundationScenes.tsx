import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { palettes, structure } from '../data/model';
import { theme } from '../theme';
import { color, semanticTokens } from './data';
import { cue } from './timing';
import {
  Arrow,
  ButtonPreview,
  Caption,
  cream,
  ease,
  Eyebrow,
  green,
  Heading,
  ink,
  lime,
  mono,
  Panel,
  Reveal,
  rise,
  Topography,
} from './kit';

export const IntroScene: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: green, color: cream }}>
      <Topography
        dark
        frame={f}
      />
      <div
        style={{
          position: 'absolute',
          left: 1060,
          top: 115,
          width: 810,
          height: 810,
          transform: `rotate(${f / 12 - 18}deg)`,
        }}
      >
        {palettes.map((palette, i) => {
          const p = rise(f, i * 3);
          return (
            <div
              key={palette.name}
              style={{
                position: 'absolute',
                inset: 0,
                transform: `rotate(${i * 22.5}deg)`,
                opacity: p,
              }}
            >
              {palette.steps.map((step, j) => (
                <div
                  key={step.step}
                  style={{
                    position: 'absolute',
                    left: 382,
                    top: 6 + j * 12,
                    width: 35,
                    height: 11,
                    borderRadius: 3,
                    background: step.hex,
                    transform: `translateY(${(1 - p) * -60}px)`,
                  }}
                />
              ))}
            </div>
          );
        })}
        <div
          style={{
            position: 'absolute',
            inset: 270,
            border: '1px solid #72917C',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...mono,
            fontSize: 23,
            letterSpacing: 2,
            transform: `rotate(${-f / 12 + 18}deg)`,
          }}
        >
          COLOR / INTENT
        </div>
      </div>
      <div style={{ position: 'absolute', top: 252, left: 96, width: 920 }}>
        <Reveal delay={7}>
          <Eyebrow light>A field guide to Cedar</Eyebrow>
        </Reveal>
        <Reveal delay={14}>
          <div
            style={{
              fontFamily: theme.fontSerif,
              fontSize: 132,
              fontWeight: 450,
              letterSpacing: -5,
              lineHeight: 1.02,
              marginTop: 26,
            }}
          >
            Color with
            <br />
            <span style={{ color: lime }}>intent.</span>
          </div>
        </Reveal>
        <Reveal delay={30}>
          <div
            style={{ fontSize: 30, color: '#C0CCBE', marginTop: 35, width: 730, lineHeight: 1.5 }}
          >
            From a palette of possibilities
            <br />
            to components with a shared purpose.
          </div>
        </Reveal>
        <Reveal
          delay={48}
          style={{
            display: 'flex',
            gap: 24,
            alignItems: 'center',
            marginTop: 38,
            ...mono,
            fontSize: 20,
            color: cream,
          }}
        >
          PALETTES{' '}
          <Arrow
            size={22}
            color={lime}
          />{' '}
          SEMANTICS{' '}
          <Arrow
            size={22}
            color={lime}
          />{' '}
          COMPONENTS
        </Reveal>
      </div>
      <Caption light>Every color has a job. Let’s make that job visible.</Caption>
    </AbsoluteFill>
  );
};

export const PaletteScene: React.FC<{ filtered?: boolean }> = ({ filtered = false }) => {
  const f = useCurrentFrame();
  const transition = filtered ? ease(f, cue('filter', 1) - 15, cue('filter', 1) + 15) : 0;
  const scopes = [
    { name: 'Text', line: 'Readable information', path: 'text-brand' },
    { name: 'Surfaces', line: 'Backgrounds with a purpose', path: 'surface-neutral-subtle' },
    { name: 'Graphics', line: 'Visual expression', path: 'graphic-surface-rating' },
  ];
  return (
    <AbsoluteFill style={{ background: cream }}>
      <Heading
        index={filtered ? '05' : '04'}
        title={filtered ? 'Choose by purpose.' : 'A full spectrum of possibility.'}
        detail={
          filtered
            ? 'Color scopes help you choose what works for text, surfaces, and graphics.'
            : 'Every Cedar palette is here. Semantic meaning turns the range into decisions.'
        }
      />
      <div
        style={{
          position: 'absolute',
          top: 340,
          left: 96,
          width: filtered ? 670 : 1340,
          opacity: 1 - transition * 0.83,
        }}
      >
        {palettes.map((palette, i) => (
          <Reveal
            key={palette.name}
            delay={filtered ? 0 : 12 + i * 3}
          >
            <div style={{ height: 34, display: 'flex', alignItems: 'center', gap: 22 }}>
              <span style={{ ...mono, width: 205, fontSize: 19, color: ink }}>{palette.name}</span>
              <div
                style={{
                  flex: 1,
                  height: 21,
                  borderRadius: 5,
                  overflow: 'hidden',
                  display: 'flex',
                  transform: `translateX(${Math.sin(f / 38 + i * 0.3) * 3}px)`,
                }}
              >
                {palette.steps.map((step) => (
                  <span
                    key={step.step}
                    style={{
                      flex: 1,
                      background: step.hex,
                      opacity: filtered && step.semantic.length === 0 ? 0.12 : 1,
                    }}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      {!filtered ? (
        <Reveal
          delay={cue('palettes', 1) - 10}
          style={{ position: 'absolute', left: 1530, right: 96, top: 430 }}
        >
          <div
            style={{ fontFamily: theme.fontSerif, fontSize: 76, lineHeight: 1.15, color: green }}
          >
            OKLCH
          </div>
          <div style={{ fontSize: 25, color: '#746E63', lineHeight: 1.5, marginTop: 24 }}>
            A more perceptually uniform color model.
          </div>
          <div style={{ ...mono, fontSize: 20, marginTop: 31, color: green }}>
            Lightness
            <br />
            <br />
            Chroma
            <br />
            <br />
            Hue
          </div>
        </Reveal>
      ) : (
        <div style={{ position: 'absolute', left: 826, right: 96, top: 358 }}>
          <Reveal delay={cue('filter', 1) - 15}>
            <Eyebrow>Filtered through intent</Eyebrow>
            {scopes.map((scope, i) => (
              <Panel
                key={scope.name}
                style={{
                  marginTop: 20,
                  padding: '23px 27px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 26,
                  transform: `translateX(${(1 - transition) * (50 + i * 10)}px)`,
                }}
              >
                <div
                  style={{
                    width: 128,
                    height: 97,
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: 8,
                    background: i === 1 ? color(scope.path) : cream,
                    color: color(scope.path),
                    flexShrink: 0,
                  }}
                >
                  {i === 0 ? (
                    <span style={{ fontFamily: theme.fontSerif, fontSize: 60 }}>Aa</span>
                  ) : i === 2 ? (
                    <span style={{ fontSize: 27 }}>★★★</span>
                  ) : (
                    <span style={{ color: green, fontSize: 24 }}>Content</span>
                  )}
                </div>
                <div>
                  <div style={{ fontFamily: theme.fontSerif, fontSize: 38, color: green }}>
                    {scope.name}
                  </div>
                  <div style={{ fontSize: 23, color: '#746E63', marginTop: 5 }}>{scope.line}</div>
                  <div style={{ ...mono, fontSize: 18, color: '#8E887D', marginTop: 9 }}>
                    color.{scope.path.replaceAll('-', '.')}
                  </div>
                </div>
              </Panel>
            ))}
          </Reveal>
        </div>
      )}
      <Caption>
        {filtered
          ? 'A semantic name explains when to use a color, so there is less guesswork.'
          : 'Primitives provide the range. The semantic layer adds the reason to choose.'}
      </Caption>
    </AbsoluteFill>
  );
};

const familyDescriptions: Record<string, { line: string; example: string; path: string }> = {
  universal: {
    line: 'Plain content. No interaction context.',
    example: 'A quiet surface for a story.',
    path: 'surface-neutral-subtle',
  },
  graphic: {
    line: 'Decorative or informational visuals.',
    example: '★★★★★',
    path: 'graphic-surface-rating',
  },
  feedback: {
    line: 'Communicate a system status.',
    example: '✓  Ready for the trail',
    path: 'feedback-surface-success-faint',
  },
  action: {
    line: 'Commit, submit, navigate.',
    example: 'Add to cart',
    path: 'action-surface-brand',
  },
  control: {
    line: 'Configure the interface in place.',
    example: 'Trail details',
    path: 'control-surface-neutral-faint',
  },
  selection: {
    line: 'Choose among alternatives.',
    example: 'S     M     L',
    path: 'selection-surface-neutral-faint',
  },
};

export const FamiliesScene: React.FC = () => {
  const f = useCurrentFrame();
  const active = Math.max(
    0,
    [1, 2, 3, 4, 5, 6].filter((beat) => f >= cue('families', beat)).length - 1,
  );
  const categories = ['action', 'control', 'selection', 'feedback', 'universal', 'graphic'].map(
    (id) => structure.find((category) => category.id === id)!,
  );
  return (
    <AbsoluteFill style={{ background: cream }}>
      <Heading
        index="06"
        title="Classify by what it does."
        detail="Six categories. Four interaction families. One decision: why does this part exist?"
      />
      <div
        style={{
          position: 'absolute',
          left: 96,
          right: 96,
          top: 332,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
        }}
      >
        {categories.map((category, i) => {
          const d = familyDescriptions[category.id];
          const selected = i === active;
          return (
            <Reveal
              key={category.id}
              delay={16 + i * 8}
            >
              <Panel
                style={{
                  height: 246,
                  padding: 26,
                  boxSizing: 'border-box',
                  borderColor: selected ? green : '#D7D4CE',
                  boxShadow: selected ? '0 10px 26px rgba(20,53,40,.09)' : undefined,
                  transform: selected ? 'translateY(-4px)' : undefined,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                  }}
                >
                  <span style={{ fontFamily: theme.fontSerif, fontSize: 39, color: green }}>
                    {category.label}
                  </span>
                  <span style={{ ...mono, fontSize: 19, color: '#8E887D' }}>
                    {i < 4 ? 'Interaction' : i === 4 ? 'Content' : 'Visual'}
                  </span>
                </div>
                <div style={{ fontSize: 21, color: '#746E63', marginTop: 9 }}>{d.line}</div>
                <div style={{ height: 82, display: 'flex', alignItems: 'center', marginTop: 17 }}>
                  {category.id === 'action' ? (
                    <ButtonPreview scale={0.85} />
                  ) : category.id === 'graphic' ? (
                    <span
                      style={{
                        fontSize: 43,
                        letterSpacing: 6,
                        color: color('graphic-surface-rating'),
                      }}
                    >
                      {d.example}
                    </span>
                  ) : category.id === 'selection' ? (
                    <div style={{ display: 'flex', gap: 10 }}>
                      {['S', 'M', 'L'].map((s, j) => (
                        <span
                          key={s}
                          style={{
                            width: 58,
                            height: 53,
                            display: 'grid',
                            placeItems: 'center',
                            fontSize: 22,
                            borderRadius: 6,
                            border: `2px solid ${j === 1 ? green : '#D7D4CE'}`,
                            background: j === 1 ? color(d.path) : cream,
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        padding: '18px 20px',
                        background: color(d.path),
                        borderRadius: 7,
                        fontSize: 23,
                        color: green,
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      {d.example}
                      {category.id === 'control' ? (
                        <Arrow
                          size={23}
                          down
                        />
                      ) : null}
                    </div>
                  )}
                </div>
                <div style={{ ...mono, fontSize: 17, color: '#8E887D' }}>
                  {
                    [
                      'What can I do?',
                      'What can I configure?',
                      'What can I choose?',
                      'What is happening?',
                      'What am I reading?',
                      'What am I seeing?',
                    ][i]
                  }
                </div>
              </Panel>
            </Reveal>
          );
        })}
      </div>
      <Caption>Ask what the user is trying to do before choosing a component or a color.</Caption>
    </AbsoluteFill>
  );
};

export const GrammarScene: React.FC = () => {
  const f = useCurrentFrame();
  const tiers = [
    { label: 'Foundation', question: 'What system?', value: 'color', c: '#E5FD9C' },
    { label: 'Family', question: 'Why does it exist?', value: 'action', c: '#BFDDCA' },
    { label: 'Role', question: 'What job?', value: 'surface', c: '#FFD378' },
    { label: 'Identity', question: 'What meaning?', value: 'brand', c: '#C5D82A' },
    { label: 'Expression', question: 'How prominent?', value: 'faint', c: '#D7D4CE' },
  ];
  const expressions = ['trace', 'faint', 'subtle', 'base', 'prominent', 'bold', 'intense'];
  return (
    <AbsoluteFill style={{ background: green, color: cream }}>
      <Topography
        dark
        frame={f}
      />
      <Heading
        index="07"
        title="A name you can reason about."
        detail="The token path carries purpose, role, meaning, and prominence."
        light
      />
      <div
        style={{ position: 'absolute', left: 96, right: 96, top: 366, display: 'flex', gap: 18 }}
      >
        {tiers.map((t, i) => (
          <Reveal
            key={t.label}
            delay={cue('grammar', i + 1) - 8}
            style={{ flex: 1 }}
          >
            <div style={{ ...mono, fontSize: 19, color: '#9EBAA6', marginBottom: 17 }}>
              {t.label.toUpperCase()}
            </div>
            <div
              style={{
                fontFamily: theme.fontMono,
                fontSize: 42,
                padding: '28px 20px',
                borderRadius: 12,
                background: t.c,
                color: green,
                textAlign: 'center',
              }}
            >
              {t.value}
            </div>
            <div style={{ fontSize: 24, marginTop: 19, color: '#C0CCBE' }}>{t.question}</div>
          </Reveal>
        ))}
      </div>
      <Reveal
        delay={cue('grammar', 6) - 8}
        style={{ position: 'absolute', top: 595, left: 96, right: 96 }}
      >
        <div style={{ ...mono, fontSize: 36, color: lime }}>
          --cdr-color-action-surface-brand-faint
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 22,
            marginTop: 20,
            fontSize: 26,
            color: '#C0CCBE',
          }}
        >
          <div
            style={{
              width: 74,
              height: 45,
              borderRadius: 6,
              background: color('action-surface-brand-faint'),
            }}
          />
          An Action surface. Brand identity. A Faint expression.
        </div>
      </Reveal>
      <Reveal
        delay={cue('grammar', 6) + 24}
        style={{ position: 'absolute', top: 762, left: 96, right: 96 }}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          {expressions.map((e, i) => (
            <div
              key={e}
              style={{
                flex: 1,
                borderTop: `3px solid ${i === 1 ? lime : '#48624D'}`,
                paddingTop: 14,
                ...mono,
                fontSize: 22,
                color: i === 1 ? lime : '#9EBAA6',
              }}
            >
              {e}
            </div>
          ))}
        </div>
      </Reveal>
      <Caption light>
        Expression describes prominence, so meaning can stay stable as modes evolve.
      </Caption>
    </AbsoluteFill>
  );
};

export const RolesScene: React.FC = () => {
  const f = useCurrentFrame();
  const explode =
    ease(f, cue('roles', 1) - 10, cue('roles', 1) + 25) *
    (1 - ease(f, cue('roles', 2) + 18, cue('roles', 2) + 50));
  const roles = [
    { label: 'Surface', path: 'action-surface-brand', description: 'The background', y: 0 },
    {
      label: 'Border',
      path: 'action-border-brand',
      description: 'The edge and state outline',
      y: 1,
    },
    { label: 'Text', path: 'action-text-neutral-trace', description: 'The label', y: 2 },
    {
      label: 'Icon',
      path: 'action-icon-neutral-trace',
      description: 'An independently mapped glyph',
      y: 3,
    },
  ];
  return (
    <AbsoluteFill style={{ background: cream }}>
      <Heading
        index="08"
        title="One component. Four color jobs."
        detail="Assign the role to the part that actually paints the color."
      />
      <div
        style={{
          position: 'absolute',
          left: 136,
          top: 360,
          width: 820,
          height: 480,
          perspective: 1100,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 45,
            right: 100,
            bottom: 5,
            height: 50,
            borderRadius: '50%',
            background: 'rgba(20,53,40,.08)',
            filter: 'blur(24px)',
          }}
        />
        {[0, 1, 2, 3].map((i) => {
          const y = 208 + (i - 1.5) * -100 * explode;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 80 + i * 36 * explode,
                top: y,
                width: 540,
                height: 115,
                borderRadius: 12,
                background: i === 0 ? green : 'transparent',
                border: i === 1 ? `3px solid ${green}` : undefined,
                transform: `rotateX(${explode * 28}deg) rotateZ(${explode * -9}deg)`,
                boxShadow: i === 0 ? '0 18px 36px rgba(20,53,40,.14)' : undefined,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 20,
                color: i === 2 && explode > 0.5 ? green : '#FFFFFF',
                fontSize: 40,
                fontWeight: 500,
              }}
            >
              {i === 2 ? (
                <span style={{ transform: 'translateX(-38px)' }}>Add to cart</span>
              ) : i === 3 ? (
                <span style={{ position: 'absolute', left: 387, top: 35 }}>
                  <Arrow
                    size={45}
                    color={explode > 0.5 ? green : '#FFFFFF'}
                  />
                </span>
              ) : null}
              {explode > 0.1 ? (
                <span
                  style={{
                    ...mono,
                    position: 'absolute',
                    top: -32,
                    left: 0,
                    fontSize: 18,
                    color: '#746E63',
                    opacity: explode,
                  }}
                >
                  {roles[i].label.toUpperCase()}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 1020,
          right: 96,
          top: 350,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {roles.map((r, i) => (
          <Reveal
            key={r.label}
            delay={25 + i * 20}
          >
            <Panel style={{ padding: '18px 24px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 26,
                  fontWeight: 500,
                  color: green,
                }}
              >
                {r.label}
                <span
                  style={{
                    width: 42,
                    height: 26,
                    background: color(r.path),
                    border: '1px solid #D7D4CE',
                    borderRadius: 4,
                  }}
                />
              </div>
              <div style={{ fontSize: 20, color: '#746E63', marginTop: 5 }}>{r.description}</div>
              <div style={{ ...mono, fontSize: 18, color: '#8E887D', marginTop: 8 }}>
                color.{r.path.replaceAll('-', '.')}
              </div>
            </Panel>
          </Reveal>
        ))}
      </div>
      <Caption>Surface, border, text, and icon each have a job. Map them independently.</Caption>
    </AbsoluteFill>
  );
};

export const OutroScene: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: green, color: cream }}>
      <Topography
        dark
        frame={f}
      />
      <div style={{ position: 'absolute', left: 96, right: 96, top: 220 }}>
        <Reveal>
          <Eyebrow light>One shared language</Eyebrow>
        </Reveal>
        <Reveal delay={10}>
          <div
            style={{
              fontFamily: theme.fontSerif,
              fontSize: 110,
              lineHeight: 1.08,
              letterSpacing: -4,
              marginTop: 22,
            }}
          >
            Less translation.
            <br />
            <span style={{ color: lime }}>More shared understanding.</span>
          </div>
        </Reveal>
        <Reveal
          delay={32}
          style={{ display: 'flex', gap: 70, marginTop: 70 }}
        >
          {[
            ['Connected', 'One shared language'],
            ['Focused', 'Decisions that persist'],
            ['Adaptable', 'Meaning that travels'],
          ].map(([value, label]) => (
            <div key={label}>
              <div style={{ fontFamily: theme.fontSerif, fontSize: 49 }}>{value}</div>
              <div style={{ ...mono, fontSize: 20, color: '#C0CCBE', marginTop: 7 }}>{label}</div>
            </div>
          ))}
        </Reveal>
        <Reveal
          delay={60}
          style={{ marginTop: 48, display: 'flex', gap: 4 }}
        >
          {semanticTokens.map((t, i) => (
            <div
              key={t.name}
              style={{
                height: 20,
                width: 7,
                background: t.hex,
                transform: `translateY(${Math.sin(i * 0.4 + f / 35) * 5}px)`,
              }}
            />
          ))}
        </Reveal>
      </div>
      <Caption light>
        Start with what you want to communicate. Let Cedar carry that meaning.
      </Caption>
    </AbsoluteFill>
  );
};
