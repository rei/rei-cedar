import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { theme } from '../theme';
import { cue } from './timing';
import {
  Arrow,
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
  Topography,
} from './kit';

export const FrictionScene: React.FC = () => {
  const f = useCurrentFrame();
  const repeated = ease(f, cue('friction', 1) - 10, cue('friction', 1) + 20);
  return (
    <AbsoluteFill style={{ background: cream }}>
      <Heading
        index="01"
        title="The same decision. Again."
        detail="When intent stays in conversations, every handoff starts another conversation."
      />
      <div
        style={{
          position: 'absolute',
          top: 368,
          left: 96,
          right: 96,
          display: 'flex',
          gap: 54,
          alignItems: 'center',
        }}
      >
        {['Design', 'Engineering', 'The next component'].map((label, i) => (
          <Reveal
            key={label}
            delay={18 + i * 18}
            style={{ flex: 1 }}
          >
            <Panel
              style={{
                height: 365,
                padding: 32,
                boxSizing: 'border-box',
                transform: `translateY(${Math.sin(f / 35 + i) * 3}px)`,
              }}
            >
              <Eyebrow>{label}</Eyebrow>
              <div
                style={{
                  width: 66,
                  height: 66,
                  background: green,
                  borderRadius: 10,
                  margin: '32px 0',
                }}
              />
              <div
                style={{ fontFamily: theme.fontSerif, fontSize: 42, color: ink, lineHeight: 1.15 }}
              >
                What does this
                <br />
                color mean?
              </div>
              <div
                style={{
                  ...mono,
                  fontSize: 20,
                  color: '#8E887D',
                  marginTop: 27,
                  opacity: i === 0 ? 1 : repeated,
                }}
              >
                Decide. Translate. Repeat.
              </div>
            </Panel>
          </Reveal>
        ))}
      </div>
      {[625, 1212].map((left, i) => (
        <div
          key={left}
          style={{
            position: 'absolute',
            left,
            top: 535,
            color: green,
            opacity: ease(f, 34 + i * 18, 45 + i * 18),
            transform: `translateX(${Math.sin(f / 15) * 4}px)`,
          }}
        >
          <Arrow size={35} />
        </div>
      ))}
      <Caption>Codified decisions help teams spend more time solving the next problem.</Caption>
    </AbsoluteFill>
  );
};

export const PillarsScene: React.FC = () => {
  const f = useCurrentFrame();
  const cards = [
    ['Semantic framework', 'Shared language', 'Capture what a design choice means.', 'Intent'],
    [
      'Unified system',
      'Connected decisions',
      'Carry the same meaning from design to code.',
      'Design → code',
    ],
    [
      'Dynamic system',
      'Adaptable foundations',
      'Use variables across modes and platforms.',
      'Web · iOS · Android',
    ],
  ];
  return (
    <AbsoluteFill style={{ background: green, color: cream }}>
      <Topography
        dark
        frame={f}
      />
      <Heading
        index="02"
        title="Three capabilities. One foundation."
        detail="Connected, focused, and ready to evolve with the needs of the business."
        light
      />
      <div
        style={{ position: 'absolute', left: 96, right: 96, top: 374, display: 'flex', gap: 28 }}
      >
        {cards.map(([title, benefit, detail, tag], i) => {
          const p = ease(f, cue('pillars', i + 1) - 8, cue('pillars', i + 1) + 12);
          return (
            <Reveal
              key={title}
              delay={16 + i * 9}
              style={{ flex: 1 }}
            >
              <Panel
                dark
                style={{
                  height: 416,
                  padding: 34,
                  boxSizing: 'border-box',
                  borderColor: p > 0.5 ? lime : '#385443',
                  transform: `translateY(${-p * 10}px)`,
                }}
              >
                <div style={{ ...mono, color: lime, fontSize: 22 }}>0{i + 1}</div>
                <div
                  style={{
                    fontFamily: theme.fontSerif,
                    fontSize: 47,
                    lineHeight: 1.12,
                    marginTop: 27,
                  }}
                >
                  {title}
                </div>
                <div style={{ color: lime, fontSize: 25, marginTop: 20 }}>{benefit}</div>
                <div style={{ fontSize: 23, color: '#C0CCBE', lineHeight: 1.5, marginTop: 18 }}>
                  {detail}
                </div>
                <div style={{ ...mono, fontSize: 20, marginTop: 31, opacity: p }}>{tag}</div>
              </Panel>
            </Reveal>
          );
        })}
      </div>
      <Caption light>
        A shared language becomes more powerful when the tools carry it together.
      </Caption>
    </AbsoluteFill>
  );
};

export const ArchitectureScene: React.FC = () => {
  const f = useCurrentFrame();
  const labels = [
    'Compositions',
    'Component tokens',
    'Components',
    'Semantic layer',
    'Primitives',
    'Values',
  ];
  const connect = ease(f, cue('architecture', 1), cue('architecture', 1) + 25);
  return (
    <AbsoluteFill style={{ background: cream }}>
      <Heading
        index="03"
        title="A new layer of meaning."
        detail="The third layer connects the raw material to the interface we create."
      />
      <div style={{ position: 'absolute', left: 96, top: 346, width: 850 }}>
        {labels.map((label, i) => {
          const semantic = i === 3;
          const width = 340 + i * 84;
          return (
            <Reveal
              key={label}
              delay={12 + (5 - i) * 10}
            >
              <div
                style={{
                  width,
                  height: 70,
                  margin: '0 auto 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 9,
                  background: semantic ? '#255F86' : i > 3 ? '#E7E4DC' : '#E2EBCF',
                  color: semantic ? '#FFFFFF' : green,
                  fontSize: 26,
                  boxShadow: semantic
                    ? `0 5px ${18 + connect * 18}px rgba(37,95,134,.20)`
                    : undefined,
                  transform: semantic ? `translateX(${connect * 14}px)` : undefined,
                }}
              >
                {label}
                {semantic && (
                  <span
                    style={{
                      ...mono,
                      fontSize: 16,
                      marginLeft: 20,
                      padding: '5px 10px',
                      border: '1px solid #A3C9DF',
                      borderRadius: 20,
                    }}
                  >
                    NEW
                  </span>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
      <Reveal
        delay={cue('architecture', 1) - 10}
        style={{ position: 'absolute', top: 429, left: 1060, width: 720 }}
      >
        <Eyebrow>Meaning remains</Eyebrow>
        <div
          style={{
            fontFamily: theme.fontSerif,
            fontSize: 66,
            lineHeight: 1.13,
            color: green,
            marginTop: 23,
          }}
        >
          What are we trying
          <br />
          to communicate?
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 27,
            marginTop: 40,
            fontSize: 26,
            color: ink,
          }}
        >
          <span>Design intent</span>
          <Arrow color={green} />
          <span>Engineering intent</span>
        </div>
        <div style={{ color: '#746E63', fontSize: 25, lineHeight: 1.5, marginTop: 27 }}>
          Components and implementations can evolve.
          <br />
          The purpose travels with them.
        </div>
      </Reveal>
      <Caption>
        The semantic layer explains why a value exists, so teams can reuse the decision.
      </Caption>
    </AbsoluteFill>
  );
};

const Cart: React.FC<{ dark: boolean; p: number }> = ({ dark, p }) => (
  <Panel
    style={{
      height: 404,
      padding: 30,
      boxSizing: 'border-box',
      background: dark ? green : '#FFFFFF',
      borderColor: dark ? '#48624D' : '#D7D4CE',
      color: dark ? cream : green,
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22 }}>
      <span>REI CO-OP</span>
      <span>Your cart · 1</span>
    </div>
    <div style={{ display: 'flex', gap: 25, alignItems: 'center', marginTop: 38 }}>
      <div
        style={{
          width: 130,
          height: 130,
          borderRadius: 12,
          background: dark ? '#385443' : '#EEF1E7',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <svg
          width="70"
          height="94"
          viewBox="0 0 70 94"
        >
          <path
            d="M20 14h30l7 11v50H13V25Z M23 15V8h24v7 M18 31h34v24H18Z M13 60h44 M18 77v9 M52 77v9"
            fill="none"
            stroke={dark ? lime : green}
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <div style={{ fontFamily: theme.fontSerif, fontSize: 36 }}>Trail essentials</div>
        <div style={{ fontSize: 23, opacity: 0.7, marginTop: 11 }}>
          Ready for the next adventure.
        </div>
        <div style={{ ...mono, fontSize: 22, marginTop: 18 }}>$89.95</div>
      </div>
    </div>
    <div
      style={{
        marginTop: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <span style={{ fontSize: 24 }}>Subtotal</span>
      <div
        style={{
          background: dark ? lime : green,
          color: dark ? green : '#FFFFFF',
          borderRadius: 7,
          padding: '18px 28px',
          fontSize: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 26,
          transform: `scale(${1 + p * 0.015})`,
        }}
      >
        Checkout
        <Arrow size={25} />
      </div>
    </div>
  </Panel>
);

export const DynamicScene: React.FC = () => {
  const f = useCurrentFrame();
  const shift = ease(f, cue('dynamic', 1), cue('dynamic', 1) + 22);
  return (
    <AbsoluteFill style={{ background: cream }}>
      <Heading
        index="11"
        title="Same intent. Adaptable expression."
        detail="Variables carry shared meaning across themes, modes, and platforms."
      />
      <div
        style={{ position: 'absolute', left: 96, right: 96, top: 340, display: 'flex', gap: 38 }}
      >
        {[false, true].map((dark, i) => (
          <Reveal
            key={String(dark)}
            delay={i ? cue('dynamic', 1) - 12 : 20}
            style={{ flex: 1 }}
          >
            <div style={{ ...mono, fontSize: 21, color: green, marginBottom: 17 }}>
              {dark ? 'ADAPTED EXPRESSION' : 'SHARED INTENT'}
            </div>
            <Cart
              dark={dark}
              p={shift}
            />
          </Reveal>
        ))}
      </div>
      <Reveal
        delay={cue('dynamic', 2) - 8}
        style={{
          position: 'absolute',
          top: 832,
          left: 96,
          right: 96,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ ...mono, fontSize: 26, color: green }}>color.action.surface.brand</div>
        <div style={{ display: 'flex', gap: 15 }}>
          {['Web', 'iOS', 'Android'].map((platform) => (
            <span
              key={platform}
              style={{
                padding: '13px 27px',
                border: '1px solid #C9CDC0',
                borderRadius: 30,
                fontSize: 23,
                color: green,
              }}
            >
              {platform}
            </span>
          ))}
        </div>
      </Reveal>
      <Caption>Illustrated modes: the values can adapt while the purpose stays the same.</Caption>
    </AbsoluteFill>
  );
};
