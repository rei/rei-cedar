import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { parseFrontMatter, selectReleaseNote } from './release-notes-utils';

type ReleaseNoteSelection = {
  fileName: string;
  markdown: string;
};

const repoRoot = process.cwd();
const releaseNotesDir = path.join(repoRoot, 'releaseNotes');
const generatedDir = path.join(repoRoot, '.storybook', 'generated');
const generatedOutputPath = path.join(generatedDir, 'release-notes.generated.ts');

const ticketDirectoryCandidates = [
  path.join(repoRoot, 'tickets'),
  path.join(repoRoot, 'docs', 'tickets'),
];

function getReleaseNoteSelection(): { selection: ReleaseNoteSelection; allFiles: string[] } {
  if (!fs.existsSync(releaseNotesDir)) {
    return {
      selection: {
        fileName: 'none',
        markdown:
          '# Release Notes\n\nNo release notes found in `releaseNotes/`. Add markdown files to populate this section.',
      },
      allFiles: [],
    };
  }

  const markdownFiles = fs
    .readdirSync(releaseNotesDir)
    .filter((fileName) => fileName.endsWith('.md'))
    .sort((a, b) => a.localeCompare(b));

  if (markdownFiles.length === 0) {
    return {
      selection: {
        fileName: 'none',
        markdown:
          '# Release Notes\n\nNo release notes found in `releaseNotes/`. Add markdown files to populate this section.',
      },
      allFiles: [],
    };
  }

  const parsedFiles = markdownFiles.map((fileName) => {
    const filePath = path.join(releaseNotesDir, fileName);
    const parsed = parseFrontMatter(fs.readFileSync(filePath, 'utf-8'));
    return { fileName, ...parsed };
  });

  const selected = selectReleaseNote(parsedFiles);

  return {
    selection: {
      fileName: selected.fileName,
      markdown: selected.body,
    },
    allFiles: markdownFiles,
  };
}

function getChangedFiles(): string[] {
  try {
    const output = execSync('git diff master...HEAD --name-only', {
      cwd: repoRoot,
      encoding: 'utf-8',
    });

    return output
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function groupLabelFromPath(filePath: string): string {
  const topLevel = filePath.split('/')[0] ?? '';

  if (topLevel === '.storybook') return 'Storybook';
  if (topLevel === 'stories') return 'Story previews';
  if (topLevel === 'releaseNotes') return 'Release notes';
  if (topLevel === 'docs') return 'Documentation';
  if (topLevel === 'scripts') return 'Tooling scripts';
  if (topLevel === 'src') return 'Source';
  if (topLevel === 'build') return 'Build scripts';
  if (!topLevel) return 'Repository root';

  return topLevel;
}

function verbForPath(filePath: string): 'Adds' | 'Updates' | 'Fixes' {
  const normalizedPath = filePath.toLowerCase();

  if (normalizedPath.includes('fix')) {
    return 'Fixes';
  }

  if (normalizedPath.startsWith('releasenotes/')) {
    return 'Adds';
  }

  return 'Updates';
}

function summarizeFiles(files: string[], maxVisible = 3): string {
  if (files.length <= maxVisible) {
    return files.join(', ');
  }

  const visibleFiles = files.slice(0, maxVisible);
  const hiddenCount = files.length - maxVisible;
  return `${visibleFiles.join(', ')}, +${hiddenCount} more`;
}

function buildBranchChangesMarkdown(changedFiles: string[]): string {
  if (changedFiles.length === 0) {
    return '- Updates branch: no file changes detected.';
  }

  const grouped = new Map<string, string[]>();

  for (const filePath of changedFiles) {
    const group = groupLabelFromPath(filePath);
    const existing = grouped.get(group) ?? [];
    existing.push(filePath);
    grouped.set(group, existing);
  }

  const lines: string[] = [];

  for (const group of [...grouped.keys()].sort((a, b) => a.localeCompare(b))) {
    const files = (grouped.get(group) ?? []).sort((a, b) => a.localeCompare(b));
    const verb = verbForPath(files[0] ?? '');
    lines.push(`- ${verb} ${group} (${files.length} files): ${summarizeFiles(files)}`);
  }

  return lines.join('\n').trim();
}

function cleanupDoneTicketDocs(): { deleted: string[]; scannedDirs: string[] } {
  const existingTicketDirs = ticketDirectoryCandidates.filter((dirPath) => fs.existsSync(dirPath));
  const deleted: string[] = [];

  for (const ticketDir of existingTicketDirs) {
    const entries = fs
      .readdirSync(ticketDir)
      .filter((name) => name.endsWith('.md'))
      .sort((a, b) => a.localeCompare(b));

    for (const entry of entries) {
      const filePath = path.join(ticketDir, entry);
      const parsed = parseFrontMatter(fs.readFileSync(filePath, 'utf-8'));
      if (parsed.frontMatter.status === 'done') {
        fs.unlinkSync(filePath);
        deleted.push(path.relative(repoRoot, filePath));
      }
    }
  }

  return {
    deleted,
    scannedDirs: existingTicketDirs.map((dirPath) => path.relative(repoRoot, dirPath)),
  };
}

function buildGeneratedModuleSource(input: {
  selectedFile: string;
  allFiles: string[];
  markdown: string;
  changedFiles: string[];
  deletedTickets: string[];
}): string {
  return [
    '// AUTO-GENERATED FILE. DO NOT EDIT MANUALLY.',
    '// Generated by scripts/storybook-release-notes.ts.',
    '',
    'export type ReleaseNotesData = {',
    '  selectedFile: string;',
    '  availableFiles: string[];',
    '  markdown: string;',
    '  changedFiles: string[];',
    '  deletedTickets: string[];',
    '  generatedAt: string;',
    '};',
    '',
    `export const releaseNotesData: ReleaseNotesData = ${JSON.stringify(
      {
        selectedFile: input.selectedFile,
        availableFiles: input.allFiles,
        markdown: input.markdown,
        changedFiles: input.changedFiles,
        deletedTickets: input.deletedTickets,
        generatedAt: new Date().toISOString(),
      },
      null,
      2,
    )};`,
    '',
  ].join('\n');
}

function main(): void {
  const { selection, allFiles } = getReleaseNoteSelection();
  const changedFiles = getChangedFiles();
  const branchChangesMarkdown = buildBranchChangesMarkdown(changedFiles);
  const cleanupResult = cleanupDoneTicketDocs();

  const combinedMarkdown = `${selection.markdown}\n\n## Changes in this branch\n\n${branchChangesMarkdown}`;

  fs.mkdirSync(generatedDir, { recursive: true });
  fs.writeFileSync(
    generatedOutputPath,
    buildGeneratedModuleSource({
      selectedFile: selection.fileName,
      allFiles,
      markdown: combinedMarkdown,
      changedFiles,
      deletedTickets: cleanupResult.deleted,
    }),
    'utf-8',
  );

  process.stdout.write(
    [
      `Selected release note: ${selection.fileName}`,
      `Changed files found: ${changedFiles.length}`,
      `Ticket directories scanned: ${cleanupResult.scannedDirs.join(', ') || 'none'}`,
      `Ticket files deleted (status: done): ${cleanupResult.deleted.length}`,
    ].join('\n') + '\n',
  );
}

main();
