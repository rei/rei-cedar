import * as tokens from '@rei/cdr-tokens';
import { Breakpoint, Space } from '../types/other';
import { NameValuePair } from '../types/interfaces';

const capitalize = (text: string) => String(text[0]).toUpperCase() + String(text).slice(1);

export const breakpoints: Breakpoint[] = ['xs', 'sm', 'md', 'lg'];

export const spacing = {
  ...[
    'zero',
    'sixteenth-x',
    'eighth-x',
    'three-sixteenth-x',
    'quarter-x',
    'three-eighth-x',
    'half-x',
    'three-quarter-x',
    'one-x',
    'one-and-a-half-x',
    'two-x',
    'three-x',
    'four-x',
  ].reduce((acc: NameValuePair, cur) => {
    const name = `CdrSpace${cur.split('-').map(capitalize).join('')}` as keyof typeof tokens;
    const token = `${tokens[name]}px`;
    acc[cur] = token;
    return acc;
  }, {}),
  'scale-0': 'var(--cdr-space-scale-0)',
  'scale-1': 'var(--cdr-space-scale-1)',
  'scale-2': 'var(--cdr-space-scale-2)',
  'scale-3': 'var(--cdr-space-scale-3)',
  'scale-4': 'var(--cdr-space-scale-4)',
  'scale-5': 'var(--cdr-space-scale-5)',
  'scale-6': 'var(--cdr-space-scale-6)',
  'scale-7': 'var(--cdr-space-scale-7)',
  'scale-8': 'var(--cdr-space-scale-8)',
  'scale-0--1': 'var(--cdr-space-scale-0--1)',
  'scale-3--4': 'var(--cdr-space-scale-3--4)',
  'scale-3--5': 'var(--cdr-space-scale-3--5)',
} as { [key in Space]: string };
