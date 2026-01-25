import kebabCase from '../kebabCase';

describe('kebabCase', () => {
  it('converts camelCase to kebab-case', () => {
    expect(kebabCase('backgroundColor')).toBe('background-color');
    expect(kebabCase('fontSize')).toBe('font-size');
    expect(kebabCase('borderRadius')).toBe('border-radius');
  });

  it('converts PascalCase to kebab-case', () => {
    expect(kebabCase('PascalCase')).toBe('pascal-case');
    expect(kebabCase('ComponentName')).toBe('component-name');
  });

  it('converts snake_case to kebab-case', () => {
    expect(kebabCase('snake_case_string')).toBe('snake-case-string');
    expect(kebabCase('under_score')).toBe('under-score');
  });

  it('converts space-separated to kebab-case', () => {
    expect(kebabCase('Space Separated Text')).toBe('space-separated-text');
    expect(kebabCase('Multiple   Spaces')).toBe('multiple-spaces');
  });

  it('handles already kebab-cased strings', () => {
    expect(kebabCase('already-kebab')).toBe('already-kebab');
    expect(kebabCase('kebab-case-string')).toBe('kebab-case-string');
  });

  it('handles mixed formats', () => {
    expect(kebabCase('mixedFormat_withSnake andSpaces')).toBe('mixed-format-with-snake-and-spaces');
  });

  it('handles single words', () => {
    expect(kebabCase('word')).toBe('word');
    expect(kebabCase('Word')).toBe('word');
  });

  it('handles empty strings', () => {
    expect(kebabCase('')).toBe('');
  });

  it('handles strings with numbers', () => {
    expect(kebabCase('value1AndValue2')).toBe('value1and-value2');
  });
});
