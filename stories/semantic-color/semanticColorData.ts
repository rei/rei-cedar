import semanticColors from '../../.agents/skills/semantic-token-migration/references/semantic-colors.json';

type Leaf = { name: string; value: string; legacy?: string };
type FlatToken = { token: string; path: string; hex: string };

function walk(node: unknown, trail: string[], out: FlatToken[]): void {
  if (!node || typeof node !== 'object') return;
  for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
    if (key.startsWith('$')) continue;
    const v = value as Record<string, unknown>;
    if (v && typeof v === 'object' && 'name' in v && 'value' in v) {
      const leaf = v as unknown as Leaf;
      out.push({
        token: String(leaf.name),
        path: [...trail, key].join('/'),
        hex: String(leaf.value).toUpperCase(),
      });
    } else if (v && typeof v === 'object') {
      walk(v, [...trail, key], out);
    }
  }
}

const flat: FlatToken[] = [];
walk((semanticColors as { color?: unknown }).color ?? semanticColors, [], flat);

export const tokenHex = (tokenName: string): string => {
  const found = flat.find((t) => t.token === tokenName);
  if (!found) throw new Error(`Unknown semantic token in Storybook docs: ${tokenName}`);
  return found.hex;
};

export const categories = [
  {
    id: 'action',
    label: 'Action',
    kind: 'Interaction',
    question: 'What can I do?',
    line: 'Commit, submit, navigate.',
    example: 'Add to cart',
    token: '--cdr-color-action-surface-brand',
  },
  {
    id: 'control',
    label: 'Control',
    kind: 'Interaction',
    question: 'What can I configure?',
    line: 'Configure the interface in place.',
    example: 'Trail details',
    token: '--cdr-color-control-surface-neutral-faint',
  },
  {
    id: 'selection',
    label: 'Selection',
    kind: 'Interaction',
    question: 'What can I choose?',
    line: 'Choose among alternatives.',
    example: 'S · M · L',
    token: '--cdr-color-selection-surface-neutral-faint',
  },
  {
    id: 'feedback',
    label: 'Feedback',
    kind: 'Interaction',
    question: 'What is happening?',
    line: 'Communicate a system status.',
    example: '✓ Ready for the trail',
    token: '--cdr-color-feedback-surface-success-faint',
  },
  {
    id: 'universal',
    label: 'Universal',
    kind: 'Content',
    question: 'What am I reading?',
    line: 'Plain content. No interaction context.',
    example: 'A quiet surface for a story.',
    token: '--cdr-color-surface-neutral-subtle',
  },
  {
    id: 'graphic',
    label: 'Graphics',
    kind: 'Visual',
    question: 'What am I seeing?',
    line: 'Decorative or informational visuals.',
    example: '★★★★★',
    token: '--cdr-color-graphic-surface-rating',
  },
] as const;

export const grammarTiers = [
  { label: 'Foundation', question: 'What system?', value: 'color' },
  { label: 'Family', question: 'Why does it exist?', value: 'action' },
  { label: 'Role', question: 'What job?', value: 'surface' },
  { label: 'Identity', question: 'What meaning?', value: 'brand' },
  { label: 'Expression', question: 'How prominent?', value: 'faint' },
] as const;

export const expressions = ['trace', 'faint', 'subtle', 'base', 'prominent', 'bold', 'intense'];

export const colorRoles = [
  {
    label: 'Surface',
    token: '--cdr-color-action-surface-brand',
    description: 'The background',
  },
  {
    label: 'Border',
    token: '--cdr-color-action-border-brand',
    description: 'The edge and state outline',
  },
  {
    label: 'Text',
    token: '--cdr-color-action-text-neutral-trace',
    description: 'The label',
  },
  {
    label: 'Icon',
    token: '--cdr-color-action-icon-neutral-trace',
    description: 'An independently mapped glyph',
  },
] as const;

export const docsShell = `
  font-family: Graphik, Helvetica, Arial, sans-serif;
  color: #312d27;
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 24px 64px;
  line-height: 1.5;
`;
