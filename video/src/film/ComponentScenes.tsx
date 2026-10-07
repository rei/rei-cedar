import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { theme } from '../theme';
import { button, states } from './data';
import { cue } from './timing';
import {
  AccordionPreview,
  Arrow,
  ButtonPreview,
  Caption,
  Code,
  cream,
  Cursor,
  ease,
  Eyebrow,
  green,
  Heading,
  ink,
  lime,
  mono,
  Panel,
  Reveal,
} from './kit';
import type { InteractionState } from '../../../build/component-tokens/types';

const PhaseRail: React.FC<{ active: number }> = ({ active }) => (
  <div style={{ position: 'absolute', left: 96, right: 96, top: 317, display: 'flex', gap: 14 }}>
    {[
      '01 Understand & map',
      '02 Write the contract',
      '03 Connect the styling',
      '04 Test the interaction',
    ].map((label, i) => (
      <div
        key={label}
        style={{
          flex: 1,
          ...mono,
          fontSize: 19,
          padding: '13px 18px',
          borderRadius: 6,
          background: i === active ? green : '#EAE7E4',
          color: i === active ? lime : '#8E887D',
        }}
      >
        {label}
      </div>
    ))}
  </div>
);

const StateRail: React.FC<{ state: InteractionState }> = ({ state }) => (
  <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
    {states.map((s) => (
      <span
        key={s}
        style={{
          ...mono,
          fontSize: 17,
          padding: '8px 10px',
          borderRadius: 5,
          background: state === s ? green : '#EAE7E4',
          color: state === s ? lime : '#8E887D',
        }}
      >
        {s}
      </span>
    ))}
  </div>
);

export const ButtonScene: React.FC = () => {
  const f = useCurrentFrame();
  const contractAt = cue('button', 2);
  const styleAt = cue('button', 3);
  const testAt = cue('button', 4);
  const phase = f < contractAt ? 0 : f < styleAt ? 1 : f < testAt ? 2 : 3;
  const state: InteractionState =
    phase < 3
      ? 'rest'
      : f < cue('button', 5)
        ? 'hover'
        : f < cue('button', 6)
          ? 'focus-visible'
          : f < cue('button', 6) + 63
            ? 'active'
            : f < cue('button', 7)
              ? 'disabled'
              : 'rest';
  const contractLines = [
    'const contract = {',
    `  component: '${button.component}',`,
    "  interaction: 'action',",
    '  hooks: true,',
    "  defaultVariant: 'primary',",
    '  defaults: {',
    "    radius: token('cdr-radius-softer'),",
    "    padding: token('cdr-space-inset-one-x-squish'),",
    '  },',
    '  variants: { primary: {',
    "    rest: { surface: 'brand', text: 'neutral-trace' },",
    "    hover: { surface: 'brand-faint', text: 'brand' },",
    '  } },',
    '};',
  ];
  return (
    <AbsoluteFill style={{ background: cream }}>
      <Heading
        index="09 / Example 1"
        title="An Action, built into a Button."
        detail="“Add to cart” moves the user forward. Its primary purpose is Action."
      />
      <PhaseRail active={phase} />
      <div style={{ position: 'absolute', left: 96, width: 905, top: 395 }}>
        {phase === 0 ? (
          <Reveal>
            <Panel style={{ padding: 34, height: 453, boxSizing: 'border-box' }}>
              <Eyebrow>Start with intent</Eyebrow>
              <div
                style={{ fontFamily: theme.fontSerif, fontSize: 46, marginTop: 22, color: green }}
              >
                Help the user complete a purchase.
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                  marginTop: 30,
                  fontSize: 26,
                  color: ink,
                }}
              >
                <span>Add to cart</span>
                <Arrow color={green} />
                <span>Action</span>
              </div>
              <Reveal
                delay={cue('button', 1) - 10}
                style={{ marginTop: 33 }}
              >
                {['Surface → Brand', 'Text → Neutral · trace'].map((label, i) => (
                  <div
                    key={label}
                    style={{
                      padding: '19px 22px',
                      background: i ? '#F1F3EA' : '#E2EBCF',
                      borderRadius: 8,
                      marginTop: 12,
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 25,
                      color: green,
                    }}
                  >
                    <span>{label}</span>
                    <span style={{ ...mono, fontSize: 20 }}>{i ? 'Label' : 'Background'}</span>
                  </div>
                ))}
              </Reveal>
            </Panel>
          </Reveal>
        ) : phase === 1 ? (
          <Code
            title="Component contract · primary color excerpt"
            lines={contractLines}
            frame={f}
            start={contractAt - 8}
            fontSize={21}
            highlight={f < contractAt + 35 ? 2 : 11}
          />
        ) : (
          <Code
            title="Contract → generated tokens → component styles"
            lines={[
              '// The component consumes its color map',
              '.cdr-button {',
              '  background-color: map.get(',
              '    maps.$button-colors, primary, background',
              '  );',
              '}',
              '',
              '// Resolved semantic purpose',
              '// color.action.surface.brand',
              '// Hover: same intent, faint expression',
            ]}
            frame={f}
            start={styleAt - 8}
            fontSize={23}
            highlight={phase === 3 ? 9 : 3}
          />
        )}
      </div>
      <Reveal
        delay={22}
        style={{ position: 'absolute', top: 395, right: 96, width: 775 }}
      >
        <Panel style={{ padding: 32, height: 490, boxSizing: 'border-box' }}>
          <Eyebrow>From intent to interaction</Eyebrow>
          <div
            style={{
              position: 'relative',
              height: 206,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 25,
              background: '#F2F4EC',
              borderRadius: 10,
            }}
          >
            <ButtonPreview
              state={state}
              scale={1.55}
            />
            {phase === 3 && state !== 'disabled' && state !== 'rest' && (
              <Cursor
                x={526}
                y={139}
                pressed={state === 'active'}
              />
            )}
          </div>
          <div style={{ marginTop: 25 }}>
            <StateRail state={state} />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 31,
              fontSize: 25,
              color: green,
            }}
          >
            <span>Purpose: Action</span>
            <span>Identity: Brand</span>
          </div>
          <div style={{ fontSize: 23, color: '#746E63', marginTop: 13 }}>
            The meaning stays stable as the state changes.
          </div>
        </Panel>
      </Reveal>
      <Caption>
        {phase === 0
          ? 'Map what the user is trying to do, then assign a role to each part.'
          : phase === 1
            ? 'The contract records design intent once, so component styles can reuse it.'
            : phase === 2
              ? 'Generated tokens connect the design choice to the rendered component.'
              : 'Hover, focus, and pressed states still communicate the same Action.'}
      </Caption>
    </AbsoluteFill>
  );
};

export const AccordionScene: React.FC = () => {
  const f = useCurrentFrame();
  const contractAt = cue('accordion', 1);
  const behaviorAt = cue('accordion', 2);
  const phase = f < contractAt ? 0 : f < behaviorAt ? 1 : 3;
  const open =
    ease(f, behaviorAt + 12, behaviorAt + 29) * (1 - ease(f, behaviorAt + 98, behaviorAt + 115));
  const hovered = f >= behaviorAt && f < behaviorAt + 125;
  const pressed =
    (f >= behaviorAt + 8 && f < behaviorAt + 18) || (f >= behaviorAt + 94 && f < behaviorAt + 104);
  return (
    <AbsoluteFill style={{ background: cream }}>
      <Heading
        index="10 / Example 2"
        title="A Control, built into an Accordion."
        detail="Opening content changes the interface in place. Map each part separately."
      />
      <PhaseRail active={phase} />
      <div style={{ position: 'absolute', left: 96, top: 395, width: 905 }}>
        {phase === 0 ? (
          <Reveal>
            <Panel style={{ padding: 30 }}>
              <Eyebrow>Intent → component parts</Eyebrow>
              <div
                style={{ fontFamily: theme.fontSerif, fontSize: 43, color: green, marginTop: 22 }}
              >
                Reveal information in place.
              </div>
              {[
                ['Frame', 'Border', 'Define the panel edge.'],
                ['Trigger', 'Text + icon', 'Open or close the content.'],
                ['Content', 'Text', 'Make the revealed information readable.'],
              ].map(([name, roles, detail], i) => (
                <Reveal
                  key={name}
                  delay={18 + i * 7}
                  style={{ paddingTop: 18, marginTop: 12, borderTop: '1px solid #EAE7E4' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      color: green,
                      fontSize: 27,
                    }}
                  >
                    <span>{name}</span>
                    <span style={{ ...mono, fontSize: 20 }}>{roles}</span>
                  </div>
                  <div style={{ color: '#746E63', fontSize: 22, marginTop: 9 }}>{detail}</div>
                </Reveal>
              ))}
            </Panel>
          </Reveal>
        ) : phase === 1 || f < behaviorAt + 115 ? (
          <Code
            title="Component contract · color scopes excerpt"
            lines={[
              'const contract = {',
              "  interaction: 'control',",
              '  defaults: {',
              "    'header-surface': literal('transparent'),",
              '  },',
              '  variants: {',
              '    frame: { rest: {',
              "      border: 'neutral-faint' } },",
              '    header: {',
              "      rest: { text: 'neutral-prominent' },",
              "      hover: { surface: 'neutral-faint' },",
              '    },',
              '    content: { rest: {',
              "      text: 'neutral-prominent' } },",
              '  },',
              '};',
            ]}
            frame={f}
            start={contractAt - 20}
            fontSize={20}
            highlight={phase === 3 ? 10 : 1}
          />
        ) : (
          <Code
            title="Connected tokens → rendered behavior"
            lines={[
              '// Each part consumes its scoped map',
              'color: var(',
              '  --cdr-color-accordion-header-text,',
              '  map.get(maps.$accordion-colors,',
              '    header, text)',
              ');',
              '',
              '// Purpose: Control',
              '// Role: Text',
              '// Identity: Neutral',
              '// Expression: Prominent',
            ]}
            frame={f}
            start={behaviorAt - 8}
            fontSize={23}
            highlight={4}
          />
        )}
      </div>
      <Reveal
        delay={22}
        style={{ position: 'absolute', top: 395, right: 96, width: 775 }}
      >
        <Panel style={{ padding: 32, height: 490, boxSizing: 'border-box' }}>
          <Eyebrow>From intent to interaction</Eyebrow>
          <div
            style={{
              position: 'relative',
              height: 300,
              padding: '20px 14px',
              boxSizing: 'border-box',
              marginTop: 22,
              background: '#F2F4EC',
              borderRadius: 10,
            }}
          >
            <AccordionPreview
              open={open}
              hover={hovered}
              scale={1.1}
            />
            {phase === 3 && (
              <Cursor
                x={584}
                y={67}
                pressed={pressed}
                opacity={1 - ease(f, behaviorAt + 125, behaviorAt + 145)}
              />
            )}
          </div>
          <div style={{ fontSize: 25, color: green, marginTop: 25 }}>Purpose: Control</div>
          <div style={{ fontSize: 23, lineHeight: 1.5, marginTop: 10, color: '#746E63' }}>
            Open the panel. Keep the same intent.
          </div>
        </Panel>
      </Reveal>
      <Caption>
        {phase === 0
          ? 'A component contains several parts. Give each color-bearing part a role.'
          : phase === 1
            ? 'The contract connects the trigger, frame, icon, and content to shared meaning.'
            : 'The arrow rotates and the panel reveals. The interaction is still a Control.'}
      </Caption>
    </AbsoluteFill>
  );
};

export const WorkflowScene: React.FC = () => {
  const f = useCurrentFrame();
  const steps = [
    ['Choose a component', 'Begin with the component you want to migrate.'],
    ['Clarify its intent', 'Choose a category and map roles and supported states.'],
    ['Build the contract', 'Capture the choices, then generate the component tokens.'],
    ['Compare the result', 'Inspect before and after views and test the interactions.'],
  ];
  const active = Math.max(0, [1, 2, 3, 4].filter((beat) => f >= cue('workflow', beat)).length - 1);
  return (
    <AbsoluteFill style={{ background: cream }}>
      <Heading
        index="12 / Migration support"
        title="A skill to make migration easier."
        detail="We’re also releasing the Semantic Token Migration skill to guide adoption."
      />
      <Reveal
        delay={12}
        style={{ position: 'absolute', top: 350, left: 96, width: 750 }}
      >
        <Panel
          dark
          style={{ padding: 38, height: 521, boxSizing: 'border-box', color: cream }}
        >
          <Eyebrow light>Semantic Token Migration</Eyebrow>
          <div
            style={{ fontFamily: theme.fontSerif, fontSize: 61, lineHeight: 1.1, marginTop: 28 }}
          >
            Make the change.
            <br />
            <span style={{ color: lime }}>Carry the meaning.</span>
          </div>
          <div
            style={{
              ...mono,
              fontSize: 25,
              color: lime,
              padding: '22px 0',
              marginTop: 23,
              borderTop: '1px solid #385443',
              borderBottom: '1px solid #385443',
            }}
          >
            $semantic-token-migration
          </div>
          <div style={{ fontSize: 24, color: '#C0CCBE', lineHeight: 1.5, marginTop: 25 }}>
            A guided method for engineers.
            <br />A clear decision trail for the team.
          </div>
        </Panel>
      </Reveal>
      <div
        style={{
          position: 'absolute',
          top: 350,
          left: 902,
          right: 96,
          display: 'flex',
          flexDirection: 'column',
          gap: 17,
        }}
      >
        {steps.map(([title, detail], i) => (
          <Reveal
            key={title}
            delay={15 + i * 8}
          >
            <Panel
              style={{
                padding: '20px 26px',
                borderColor: i === active ? green : '#D7D4CE',
                background: i === active ? '#EFF3E8' : '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                gap: 23,
              }}
            >
              <span style={{ ...mono, color: green, fontSize: 25, width: 48 }}>0{i + 1}</span>
              <div>
                <div style={{ fontSize: 28, fontWeight: 500, color: green }}>{title}</div>
                <div style={{ fontSize: 22, color: '#746E63', lineHeight: 1.4, marginTop: 7 }}>
                  {detail}
                </div>
              </div>
            </Panel>
          </Reveal>
        ))}
      </div>
      <Caption>The skill turns the migration method into a guided, repeatable workflow.</Caption>
    </AbsoluteFill>
  );
};
