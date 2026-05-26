export type FrontMatter = {
  default?: boolean;
  status?: string;
};

export type ParsedMarkdown = {
  frontMatter: FrontMatter;
  body: string;
};

export type ParsedReleaseNote = ParsedMarkdown & {
  fileName: string;
};

function parseFrontMatterValue(rawValue: string): string | boolean {
  const trimmed = rawValue.trim();

  if (trimmed === 'true') {
    return true;
  }

  if (trimmed === 'false') {
    return false;
  }

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

// Parses optional YAML-like front matter without introducing extra dependencies.
export function parseFrontMatter(markdownSource: string): ParsedMarkdown {
  if (!markdownSource.startsWith('---\n')) {
    return { frontMatter: {}, body: markdownSource.trim() };
  }

  const endIndex = markdownSource.indexOf('\n---\n', 4);
  if (endIndex === -1) {
    return { frontMatter: {}, body: markdownSource.trim() };
  }

  const frontMatterBlock = markdownSource.slice(4, endIndex);
  const body = markdownSource.slice(endIndex + '\n---\n'.length).trim();

  const frontMatter: FrontMatter = {};
  for (const line of frontMatterBlock.split('\n')) {
    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = parseFrontMatterValue(line.slice(separatorIndex + 1));

    if (key === 'default' && typeof value === 'boolean') {
      frontMatter.default = value;
      continue;
    }

    if (key === 'status' && typeof value === 'string') {
      frontMatter.status = value;
    }
  }

  return { frontMatter, body };
}

export function timestampFromFileName(fileName: string): number {
  const fileBase = fileName.replace(/\.md$/i, '');
  const match = fileBase.match(
    /(\d{4})[-_]?([01]\d)[-_]?([0-3]\d)(?:[T-_]?([0-2]\d)([0-5]\d)?([0-5]\d)?)?/,
  );

  if (!match) {
    return 0;
  }

  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  const hour = Number(match[4] ?? '0');
  const minute = Number(match[5] ?? '0');
  const second = Number(match[6] ?? '0');

  return Date.UTC(year, month, day, hour, minute, second);
}

// Selection contract used by Storybook release notes:
// 1) explicit `default: true`, otherwise 2) newest timestamp in filename.
export function selectReleaseNote(parsedFiles: ParsedReleaseNote[]): ParsedReleaseNote {
  const explicitDefault = parsedFiles.find((entry) => entry.frontMatter.default === true);
  if (explicitDefault) {
    return explicitDefault;
  }

  return [...parsedFiles].sort((left, right) => {
    const rightTimestamp = timestampFromFileName(right.fileName);
    const leftTimestamp = timestampFromFileName(left.fileName);

    if (rightTimestamp !== leftTimestamp) {
      return rightTimestamp - leftTimestamp;
    }

    return right.fileName.localeCompare(left.fileName);
  })[0]!;
}
