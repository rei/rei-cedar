/**
 * Cedar documentation agent MCP skill
 * Exposes structured tools for release note generation, breaking change detection,
 * storybook scaffolding, and diff analysis.
 *
 * Each tool loads rules from schema files by path reference, returns structured data,
 * and flags ambiguous diff cases as agentNote rather than blocking errors.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '../..');
const CONFIG_DIR = path.join(ROOT, 'scripts/agent-config');

// --- Schema loading (cached per process) ---

let _releaseNotesSchema = null;
let _storybookSchema = null;
let _editorialRules = null;

function loadSchema(name) {
  const filePath = path.join(CONFIG_DIR, name);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function releaseNotesSchema() {
  if (!_releaseNotesSchema) _releaseNotesSchema = loadSchema('release-notes.schema.json');
  return _releaseNotesSchema;
}

function storybookSchema() {
  if (!_storybookSchema) _storybookSchema = loadSchema('storybook.schema.json');
  return _storybookSchema;
}

function editorialRules() {
  if (!_editorialRules) _editorialRules = loadSchema('editorial.json');
  return _editorialRules;
}

// --- Utility helpers ---

/** Detect the default upstream branch (main or master) */
function detectBaseBranch() {
  try {
    const branches = execSync('git branch -a', { cwd: ROOT, encoding: 'utf-8' });
    if (branches.includes('remotes/origin/master')) return 'origin/master';
    if (branches.includes('remotes/origin/main')) return 'origin/main';
    return 'origin/master';
  } catch {
    return 'origin/master';
  }
}

function git(cmd) {
  return execSync(`git ${cmd}`, { cwd: ROOT, encoding: 'utf-8' }).trim();
}

function logUsage(toolName, inputKeys) {
  const ts = new Date().toISOString();
  process.stderr.write(`[cedar-docs-skill] ${ts} ${toolName} input=${JSON.stringify(inputKeys)}\n`);
}

// --- Tool 1: compareBranchToMaster ---

/**
 * Returns a structured diff object grouped by logical concern.
 * Never returns raw file lists — groups files into categories.
 */
export function compareBranchToMaster(repo) {
  logUsage('compareBranchToMaster', { repo });
  const schema = releaseNotesSchema();
  const baseBranch = detectBaseBranch();

  let nameStatus;
  try {
    nameStatus = git(`diff ${baseBranch}...HEAD --name-status`);
  } catch (e) {
    return { error: `git diff failed: ${e.message}`, groups: {}, baseBranch, files: [] };
  }

  if (!nameStatus) {
    return { groups: {}, baseBranch, totalFiles: 0, files: [] };
  }

  const ignorePatterns = schema.fileGroupingRules.ignoreInOutput;
  const lines = nameStatus.split('\n').filter(Boolean);
  const files = [];

  for (const line of lines) {
    const parts = line.split('\t');
    const status = parts[0];
    const filePath = parts.length > 2 ? parts[2] : parts[1]; // handle renames
    const oldPath = parts.length > 2 ? parts[1] : null;

    // Skip ignored patterns
    if (ignorePatterns.some((p) => filePath.startsWith(p))) continue;

    let type = 'modified';
    if (status === 'A') type = 'added';
    else if (status === 'D') type = 'deleted';
    else if (status.startsWith('R')) type = 'renamed';

    files.push({ path: filePath, oldPath, type, status });
  }

  // Group by logical concern
  const groups = {};
  for (const file of files) {
    const group = categorizeFile(file.path, repo);
    if (!groups[group]) groups[group] = [];
    groups[group].push(file);
  }

  return { groups, baseBranch, totalFiles: files.length, files };
}

/** Categorize a file path into a logical concern group */
function categorizeFile(filePath, _repo) {
  if (filePath.startsWith('tokens/')) return 'token-sources';
  if (filePath.startsWith('style-dictionary/filters/foundations/')) return 'foundation-filters';
  if (filePath.startsWith('style-dictionary/filters/components/')) return 'component-filters';
  if (filePath.startsWith('style-dictionary/filters/palettes/')) return 'palette-filters';
  if (filePath.startsWith('style-dictionary/filters/legacy/')) return 'legacy-filters';
  if (filePath.startsWith('style-dictionary/formats/')) return 'output-formats';
  if (filePath.startsWith('style-dictionary/transforms/')) return 'transforms';
  if (filePath.startsWith('style-dictionary/configs/')) return 'build-configs';
  if (filePath.startsWith('style-dictionary/')) return 'build-system';
  if (filePath.startsWith('stories/')) return 'storybook';
  if (filePath.startsWith('.storybook/')) return 'storybook-config';
  if (filePath.startsWith('docs/')) return 'documentation';
  if (filePath.startsWith('test-consumer/')) return 'consumer-contract-tests';
  if (filePath.startsWith('schema/')) return 'schema';
  if (filePath.startsWith('src/components/')) {
    const match = filePath.match(/^src\/components\/([^/]+)/);
    return match ? `component-${match[1]}` : 'components';
  }
  if (filePath.startsWith('src/')) return 'source';
  if (filePath.startsWith('.github/')) return 'ci';
  if (filePath.startsWith('.husky/')) return 'git-hooks';
  if (
    filePath.match(
      /^(package\.json|tsconfig|vitest|\.oxlint|\.oxfmt|\.editor|\.git(ignore|attributes))/,
    )
  )
    return 'config';
  return 'other';
}

// --- Tool 2: detectBreakingChanges ---

/**
 * Returns categorized breaking changes array using breakingChangeRules from schema.
 */
export function detectBreakingChanges(diff) {
  logUsage('detectBreakingChanges', { totalFiles: diff.totalFiles });
  const schema = releaseNotesSchema();
  if (!schema.breakingChangeRules.enabled) return [];

  const breaking = [];

  // Check for removed/renamed token source files
  for (const file of diff.files || []) {
    if (file.type === 'deleted' && file.path.startsWith('tokens/')) {
      breaking.push({
        ruleId: 'token-removed',
        file: file.path,
        description: `Token source file removed: ${file.path}`,
        agentNote:
          'Verify whether tokens from this file were part of the public API before classifying as breaking',
      });
    }
  }

  // Check for renamed token files (potential token renames)
  for (const file of diff.files || []) {
    if (file.type === 'renamed' && file.path.startsWith('tokens/')) {
      breaking.push({
        ruleId: 'token-renamed',
        file: file.path,
        oldPath: file.oldPath,
        description: `Token source file renamed: ${file.oldPath} → ${file.path}`,
        agentNote: null,
      });
    }
  }

  // Check for removed import paths (export map changes in package.json)
  const pkgChanges = (diff.files || []).filter((f) => f.path === 'package.json');
  if (pkgChanges.length > 0) {
    try {
      const pkgDiff = git('diff ' + diff.baseBranch + '...HEAD -- package.json');
      const removedExports = [...pkgDiff.matchAll(/^-\s+"\.\/([^"]+)"/gm)];
      for (const match of removedExports) {
        // Check if it's truly removed vs modified
        const exportPath = match[1];
        if (!pkgDiff.includes(`+    "./${exportPath}"`)) {
          breaking.push({
            ruleId: 'import-path-removed',
            subject: `./${exportPath}`,
            description: `Export path removed from package.json: ./${exportPath}`,
            agentNote: null,
          });
        }
      }
    } catch {
      // git diff on specific file failed — not blocking
    }
  }

  // Check for CSS variable removals in SCSS/CSS output configs
  const formatChanges = (diff.groups || {})['output-formats'] || [];
  if (formatChanges.length > 0) {
    breaking.push({
      ruleId: 'css-variable-removed',
      description: 'Output format files changed — review for CSS custom property surface changes',
      agentNote:
        'Output format changes may affect generated CSS variables. Review diff for removals.',
    });
  }

  return breaking;
}

// --- Tool 3: draftMigrationSteps ---

/**
 * Auto-drafts migration steps for a breaking change following editorial.json rules.
 */
export function draftMigrationSteps(breakingChange) {
  logUsage('draftMigrationSteps', { ruleId: breakingChange.ruleId });
  // Load editorial rules to ensure they're available for validation
  editorialRules();

  const steps = [];

  switch (breakingChange.ruleId) {
    case 'token-removed':
      steps.push('Search your codebase for references to the removed token');
      steps.push('Replace with the recommended alternative token (see token changes section)');
      steps.push('Run your build to confirm no unresolved token references remain');
      break;
    case 'token-renamed':
      steps.push(`Find all references to the old token name`);
      steps.push(`Replace with the new token name`);
      steps.push('Update any SCSS, CSS, or JS imports referencing the old name');
      break;
    case 'import-path-removed':
      steps.push(`Update import statements from \`${breakingChange.subject}\` to the new path`);
      steps.push('Check your bundler output to confirm the import resolves');
      break;
    case 'css-variable-removed':
      steps.push('Search stylesheets for references to the removed CSS custom property');
      steps.push('Replace with the recommended alternative');
      break;
    default:
      steps.push('Review the change details and update your code accordingly');
      if (breakingChange.agentNote) {
        steps.push(`Note: ${breakingChange.agentNote}`);
      }
  }

  return { ...breakingChange, migrationSteps: steps };
}

// --- Tool 4: summarizeTokenChanges ---

/**
 * Returns { added, removed, renamed, valueChanges, semanticChanges } from the diff.
 */
export function summarizeTokenChanges(diff) {
  logUsage('summarizeTokenChanges', { totalFiles: diff.totalFiles });

  const tokenSourceFiles = (diff.files || []).filter((f) => f.path.startsWith('tokens/'));
  const added = tokenSourceFiles.filter((f) => f.type === 'added');
  const removed = tokenSourceFiles.filter((f) => f.type === 'deleted');
  const renamed = tokenSourceFiles.filter((f) => f.type === 'renamed');
  const modified = tokenSourceFiles.filter((f) => f.type === 'modified');

  // Analyze modified token files for value changes
  const valueChanges = [];
  const semanticChanges = [];

  for (const file of modified) {
    try {
      const fileDiff = git(`diff ${diff.baseBranch}...HEAD -- "${file.path}"`);

      // Look for value changes in JSON token files
      const removedValues = [...fileDiff.matchAll(/^-\s+"value":\s*"([^"]+)"/gm)];
      const addedValues = [...fileDiff.matchAll(/^\+\s+"value":\s*"([^"]+)"/gm)];

      if (removedValues.length > 0 && addedValues.length > 0) {
        valueChanges.push({
          file: file.path,
          changeCount: Math.max(removedValues.length, addedValues.length),
          agentNote: 'Value changes detected in token source — review for semantic impact',
        });
      }

      // Look for description/comment changes (semantic changes)
      const descChanges = fileDiff.match(/[+-]\s+"description"/g);
      if (descChanges) {
        semanticChanges.push({
          file: file.path,
          agentNote: 'Token description changed — may indicate semantic usage change',
        });
      }
    } catch {
      // Individual file diff failed — continue
    }
  }

  return {
    added: added.map((f) => ({ path: f.path, type: f.type })),
    removed: removed.map((f) => ({ path: f.path, type: f.type })),
    renamed: renamed.map((f) => ({ path: f.path, oldPath: f.oldPath, type: f.type })),
    valueChanges,
    semanticChanges,
  };
}

// --- Tool 5: summarizeComponentApiChanges ---

/**
 * Returns per-component { props, slots, events, dom } change summaries.
 */
export function summarizeComponentApiChanges(diff) {
  logUsage('summarizeComponentApiChanges', { totalFiles: diff.totalFiles });

  const componentGroups = {};

  for (const [group, files] of Object.entries(diff.groups || {})) {
    if (!group.startsWith('component-')) continue;
    const componentName = group.replace('component-', '');
    const changes = { props: [], slots: [], events: [], dom: [], other: [] };

    for (const file of files) {
      if (file.path.endsWith('.vue') || file.path.endsWith('.ts')) {
        try {
          const fileDiff = git(`diff ${diff.baseBranch}...HEAD -- "${file.path}"`);

          // Detect prop changes
          const propAdds = [...fileDiff.matchAll(/^\+.*defineProps|^\+.*props:\s*{/gm)];
          const propRemoves = [...fileDiff.matchAll(/^-.*defineProps|^-.*props:\s*{/gm)];
          if (propAdds.length || propRemoves.length) {
            changes.props.push({
              file: file.path,
              added: propAdds.length,
              removed: propRemoves.length,
            });
          }

          // Detect emit/event changes
          const emitAdds = [...fileDiff.matchAll(/^\+.*defineEmits|^\+.*emit\(/gm)];
          const emitRemoves = [...fileDiff.matchAll(/^-.*defineEmits|^-.*emit\(/gm)];
          if (emitAdds.length || emitRemoves.length) {
            changes.events.push({
              file: file.path,
              added: emitAdds.length,
              removed: emitRemoves.length,
            });
          }

          // Detect slot changes
          const slotAdds = [...fileDiff.matchAll(/^\+.*<slot/gm)];
          const slotRemoves = [...fileDiff.matchAll(/^-.*<slot/gm)];
          if (slotAdds.length || slotRemoves.length) {
            changes.slots.push({
              file: file.path,
              added: slotAdds.length,
              removed: slotRemoves.length,
            });
          }
        } catch {
          changes.other.push({ file: file.path, agentNote: 'Could not parse diff for this file' });
        }
      }
    }

    if (
      changes.props.length ||
      changes.slots.length ||
      changes.events.length ||
      changes.other.length
    ) {
      componentGroups[componentName] = changes;
    }
  }

  return componentGroups;
}

// --- Tool 6: generateHumanReleaseNotes ---

/**
 * Outputs Markdown following release-notes.schema.json human output spec.
 */
export function generateHumanReleaseNotes(structuredDiff) {
  logUsage('generateHumanReleaseNotes', {
    groups: Object.keys(structuredDiff.diff?.groups || {}).length,
  });

  const { diff, breakingChanges = [], tokenSummary, componentSummary, repo } = structuredDiff;
  // Validate schema is loadable before generating output
  releaseNotesSchema();
  const sections = [];

  const breakingWithMigrations = breakingChanges.filter((b) => b.migrationSteps?.length > 0);
  const agentNotes = breakingChanges.filter((b) => b.agentNote);

  // Header
  const version = getPackageVersion();
  sections.push(`# Release notes – v${version}\n`);
  sections.push(
    `<!-- agent-diff: ${countSections(structuredDiff)} sections, ${breakingChanges.length} breaking changes, ${breakingWithMigrations.length} auto-drafted migrations, ${agentNotes.length} agent-notes -->`,
  );
  sections.push(
    '<!-- Review the agent-notes below before publishing. Promote draft to release-notes.md when ready. -->\n',
  );

  // Overview
  sections.push('## Overview\n');
  sections.push(generateOverview(structuredDiff) + '\n');

  // Breaking changes
  if (breakingChanges.length > 0) {
    sections.push('## Breaking changes\n');
    for (const bc of breakingChanges) {
      sections.push(`- \`${bc.subject || bc.file || bc.ruleId}\` — ${bc.description}`);
      if (bc.agentNote) {
        sections.push(`  <!-- agent-note: ${bc.subject || bc.ruleId} — ${bc.agentNote} -->`);
      }
      if (bc.migrationSteps?.length) {
        sections.push('  - **Migrate:**');
        bc.migrationSteps.forEach((step, i) => {
          sections.push(`    ${i + 1}. ${step}`);
        });
      }
    }
    sections.push('');
  }

  // New features
  const featureGroups = Object.entries(diff.groups || {}).filter(
    ([g]) => !['ci', 'git-hooks', 'config', 'other', 'documentation'].includes(g),
  );
  if (featureGroups.length > 0) {
    const addedFiles = (diff.files || []).filter((f) => f.type === 'added');
    if (addedFiles.length > 0) {
      sections.push('## New features\n');
      for (const [group, files] of Object.entries(diff.groups || {})) {
        const groupAdded = files.filter((f) => f.type === 'added');
        if (groupAdded.length > 0 && !['ci', 'git-hooks', 'config', 'other'].includes(group)) {
          sections.push(
            `- \`${group}\` — adds ${groupAdded.length} new file(s) for ${humanizeGroup(group)}`,
          );
        }
      }
      sections.push('');
    }
  }

  // Improvements
  const modifiedGroups = Object.entries(diff.groups || {}).filter(
    ([g, files]) =>
      files.some((f) => f.type === 'modified') && !['ci', 'git-hooks', 'other'].includes(g),
  );
  if (modifiedGroups.length > 0) {
    sections.push('## Improvements\n');
    for (const [group, files] of modifiedGroups) {
      const modCount = files.filter((f) => f.type === 'modified').length;
      sections.push(`- ${humanizeGroup(group)} — updates ${modCount} file(s)`);
    }
    sections.push('');
  }

  // Token changes (rei-cedar-tokens only)
  if (tokenSummary && repo === 'rei-cedar-tokens') {
    sections.push('## Token changes\n');
    if (tokenSummary.added.length > 0) {
      sections.push('### Added');
      for (const t of tokenSummary.added) {
        sections.push(`- \`${path.basename(t.path, '.json')}\` — new token source`);
      }
      sections.push('');
    }
    if (tokenSummary.removed.length > 0) {
      sections.push('### Removed');
      for (const t of tokenSummary.removed) {
        sections.push(`- \`${path.basename(t.path, '.json')}\` — removed`);
      }
      sections.push('');
    }
    if (tokenSummary.renamed.length > 0) {
      sections.push('### Renamed');
      for (const t of tokenSummary.renamed) {
        sections.push(
          `- \`${path.basename(t.oldPath, '.json')}\` → \`${path.basename(t.path, '.json')}\``,
        );
      }
      sections.push('');
    }
    if (tokenSummary.valueChanges.length > 0) {
      sections.push('### Value changes');
      for (const vc of tokenSummary.valueChanges) {
        sections.push(
          `- \`${path.basename(vc.file, '.json')}\` — ${vc.changeCount} value(s) changed`,
        );
        if (vc.agentNote) sections.push(`  <!-- agent-note: ${vc.agentNote} -->`);
      }
      sections.push('');
    }
    if (tokenSummary.semanticChanges.length > 0) {
      sections.push('### Semantic changes');
      for (const sc of tokenSummary.semanticChanges) {
        sections.push(
          `- \`${path.basename(sc.file, '.json')}\` — description or usage intent changed`,
        );
        if (sc.agentNote) sections.push(`  <!-- agent-note: ${sc.agentNote} -->`);
      }
      sections.push('');
    }
  }

  // Component API changes (rei-cedar only)
  if (componentSummary && repo === 'rei-cedar' && Object.keys(componentSummary).length > 0) {
    sections.push('## Component API changes\n');
    for (const [name, changes] of Object.entries(componentSummary)) {
      sections.push(`### \`cdr-${name}\``);
      for (const p of changes.props) {
        sections.push(`- Props: ${p.added} addition(s), ${p.removed} removal(s)`);
      }
      for (const e of changes.events) {
        sections.push(`- Events: ${e.added} addition(s), ${e.removed} removal(s)`);
      }
      for (const s of changes.slots) {
        sections.push(`- Slots: ${s.added} addition(s), ${s.removed} removal(s)`);
      }
      sections.push('');
    }
  }

  // Migration guide
  if (breakingChanges.length > 0) {
    sections.push('## Migration guide\n');
    breakingChanges.forEach((bc, i) => {
      sections.push(`### ${i + 1}. \`${bc.subject || bc.file || bc.ruleId}\`\n`);
      if (bc.migrationSteps?.length) {
        bc.migrationSteps.forEach((step, j) => {
          sections.push(`${j + 1}. ${step}`);
        });
      } else {
        sections.push('Review the breaking change details above and update your code accordingly.');
      }
      sections.push('');
    });
  }

  return sections.join('\n');
}

// --- Tool 7: generateMachineReleaseNotes ---

/**
 * Outputs JSON array of change records per machineRecord schema.
 */
export function generateMachineReleaseNotes(structuredDiff) {
  logUsage('generateMachineReleaseNotes', {
    groups: Object.keys(structuredDiff.diff?.groups || {}).length,
  });

  const { diff, breakingChanges = [], tokenSummary, _componentSummary, repo } = structuredDiff;
  const records = [];
  let idCounter = 1;

  // Breaking changes
  for (const bc of breakingChanges) {
    records.push({
      id: `${repo}-breaking-${idCounter++}`,
      repo,
      changeType: 'breaking',
      category: bc.ruleId?.includes('token') ? 'token' : 'config',
      subject: bc.subject || bc.file || bc.ruleId,
      before: bc.oldPath || null,
      after: bc.file || bc.subject || null,
      breaking: true,
      affectedComponents: [],
      migrationSteps: bc.migrationSteps || [],
      agentNote: bc.agentNote || null,
    });
  }

  // Token changes
  if (tokenSummary) {
    for (const t of tokenSummary.added) {
      records.push({
        id: `${repo}-token-add-${idCounter++}`,
        repo,
        changeType: 'token',
        category: 'token',
        subject: path.basename(t.path, '.json'),
        before: null,
        after: t.path,
        breaking: false,
        affectedComponents: [],
        migrationSteps: [],
        agentNote: null,
      });
    }
    for (const t of tokenSummary.removed) {
      records.push({
        id: `${repo}-token-remove-${idCounter++}`,
        repo,
        changeType: 'token',
        category: 'token',
        subject: path.basename(t.path, '.json'),
        before: t.path,
        after: null,
        breaking: true,
        affectedComponents: [],
        migrationSteps: ['Find references to this token and replace with an alternative'],
        agentNote: 'Confirm whether this token was part of the public contract',
      });
    }
    for (const t of tokenSummary.renamed) {
      records.push({
        id: `${repo}-token-rename-${idCounter++}`,
        repo,
        changeType: 'token',
        category: 'token',
        subject: path.basename(t.oldPath || t.path, '.json'),
        before: t.oldPath,
        after: t.path,
        breaking: true,
        affectedComponents: [],
        migrationSteps: [`Rename references from old name to new name`],
        agentNote: null,
      });
    }
    for (const vc of tokenSummary.valueChanges) {
      records.push({
        id: `${repo}-token-value-${idCounter++}`,
        repo,
        changeType: 'token',
        category: 'token',
        subject: path.basename(vc.file, '.json'),
        before: null,
        after: `${vc.changeCount} value(s) changed`,
        breaking: false,
        affectedComponents: [],
        migrationSteps: [],
        agentNote: vc.agentNote || null,
      });
    }
  }

  // File group changes (features, improvements)
  for (const [group, files] of Object.entries(diff.groups || {})) {
    if (['ci', 'git-hooks', 'other'].includes(group)) continue;
    const added = files.filter((f) => f.type === 'added');
    const modified = files.filter((f) => f.type === 'modified');

    if (added.length > 0) {
      records.push({
        id: `${repo}-feature-${group}-${idCounter++}`,
        repo,
        changeType: 'feature',
        category: groupToCategory(group),
        subject: group,
        before: null,
        after: `${added.length} file(s) added`,
        breaking: false,
        affectedComponents: [],
        migrationSteps: [],
        agentNote: null,
      });
    }

    if (modified.length > 0) {
      records.push({
        id: `${repo}-improvement-${group}-${idCounter++}`,
        repo,
        changeType: 'improvement',
        category: groupToCategory(group),
        subject: group,
        before: null,
        after: `${modified.length} file(s) updated`,
        breaking: false,
        affectedComponents: [],
        migrationSteps: [],
        agentNote: null,
      });
    }
  }

  return records;
}

// --- Tool 8: scaffoldStory ---

/**
 * Outputs a full .stories.ts file per storybook.schema.json.
 */
export function scaffoldStory(componentName, apiDiff) {
  logUsage('scaffoldStory', { componentName });
  const sbSchema = storybookSchema();

  const title = sbSchema.namingConventions.storyTitle.replace('<ComponentName>', componentName);
  const tags = sbSchema.storyStructure.defaultExport.tags;

  const lines = [];
  lines.push(`import type { Meta, StoryObj } from '@storybook/vue3';`);
  lines.push(`import ${componentName} from './${componentName}.vue';`);
  lines.push('');
  lines.push(`/** ${componentName} stories — auto-generated by cedar-docs-skill */`);
  lines.push(`const meta: Meta<typeof ${componentName}> = {`);
  lines.push(`  title: '${title}',`);
  lines.push(`  component: ${componentName},`);
  lines.push(`  tags: ${JSON.stringify(tags)},`);

  // Generate argTypes from apiDiff if available
  if (apiDiff?.props?.length) {
    lines.push('  argTypes: {');
    for (const prop of apiDiff.props) {
      const controlType = inferControlType(prop.type);
      lines.push(`    ${prop.name}: { control: '${controlType}' },`);
    }
    lines.push('  },');
  }

  lines.push('};');
  lines.push('');
  lines.push('export default meta;');
  lines.push(`type Story = StoryObj<typeof ${componentName}>;`);
  lines.push('');

  // Default story
  lines.push(`/** Demonstrates ${componentName} with default props */`);
  lines.push('export const Default: Story = {};');

  return lines.join('\n');
}

// --- Tool 9: updateStory ---

/**
 * Patches an existing story file based on API diff.
 * Returns the updated content or null if no changes needed.
 */
export function updateStory(existingStory, apiDiff) {
  logUsage('updateStory', { hasApiDiff: !!apiDiff });

  if (!apiDiff || (!apiDiff.props?.length && !apiDiff.events?.length && !apiDiff.slots?.length)) {
    return null; // No changes needed
  }

  // For now, return a note that the story should be reviewed
  // Full patching would require AST manipulation
  return {
    needsReview: true,
    reason: 'Component API changed — review story for accuracy',
    changes: apiDiff,
  };
}

// --- Helper functions ---

function getPackageVersion() {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8'));
    return pkg.version || '0.0.0';
  } catch {
    return '0.0.0';
  }
}

function generateOverview(structuredDiff) {
  const { diff, breakingChanges = [], tokenSummary, repo } = structuredDiff;
  const groupCount = Object.keys(diff.groups || {}).length;
  const parts = [];

  if (repo === 'rei-cedar-tokens') {
    parts.push(`This release updates the Cedar design token pipeline across ${groupCount} areas.`);
    if (tokenSummary) {
      const changes = [];
      if (tokenSummary.added.length)
        changes.push(`${tokenSummary.added.length} new token source(s)`);
      if (tokenSummary.valueChanges.length)
        changes.push(`${tokenSummary.valueChanges.length} value change(s)`);
      if (tokenSummary.removed.length) changes.push(`${tokenSummary.removed.length} removal(s)`);
      if (changes.length) parts.push(`Token changes include ${changes.join(', ')}.`);
    }
  } else {
    parts.push(`This release updates Cedar components and tooling across ${groupCount} areas.`);
  }

  if (breakingChanges.length > 0) {
    parts.push(
      `There are ${breakingChanges.length} breaking change(s) — see the migration guide below.`,
    );
  }

  return parts.join(' ');
}

function countSections(structuredDiff) {
  let count = 1; // overview always
  if (structuredDiff.breakingChanges?.length) count += 2; // breaking + migration
  if (structuredDiff.tokenSummary) count++;
  if (structuredDiff.componentSummary && Object.keys(structuredDiff.componentSummary).length)
    count++;
  return count;
}

function humanizeGroup(group) {
  const map = {
    'token-sources': 'token source definitions',
    'foundation-filters': 'foundation token filters',
    'component-filters': 'component token filters',
    'palette-filters': 'palette token filters',
    'legacy-filters': 'legacy compatibility filters',
    'output-formats': 'output format generators',
    transforms: 'token transforms',
    'build-configs': 'build configuration',
    'build-system': 'build system',
    storybook: 'Storybook stories',
    'storybook-config': 'Storybook configuration',
    documentation: 'documentation',
    'consumer-contract-tests': 'consumer contract tests',
    schema: 'schema definitions',
    config: 'project configuration',
  };
  return map[group] || group.replace(/-/g, ' ');
}

function groupToCategory(group) {
  if (group.startsWith('token') || group.includes('filter') || group.includes('palette'))
    return 'token';
  if (group.startsWith('component')) return 'component';
  if (group.includes('build') || group.includes('config') || group.includes('transform'))
    return 'build';
  if (group.includes('doc') || group.includes('story')) return 'docs';
  return 'tooling';
}

function inferControlType(propType) {
  if (!propType) return 'text';
  if (propType === 'boolean' || propType === 'Boolean') return 'boolean';
  if (propType === 'number' || propType === 'Number') return 'number';
  if (propType.includes('|')) return 'select';
  return 'text';
}
