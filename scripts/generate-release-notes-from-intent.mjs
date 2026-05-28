#!/usr/bin/env node

/**
 * Standalone release notes generator using cedar-docs-skill functions
 * Reads release-intent.md and generates release notes artifacts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  compareBranchToMaster,
  detectBreakingChanges,
  draftMigrationSteps,
  summarizeComponentApiChanges,
  generateHumanReleaseNotes,
  generateMachineReleaseNotes,
} from './mcp/cedar-docs-skill.mjs';

const REPO = 'rei-cedar';

async function main() {
  console.log(`[generate] Generating release notes for ${REPO}...`);

  // Get diff from current branch
  const diff = compareBranchToMaster(REPO);
  if (diff.error) {
    console.error(`[generate] Error: ${diff.error}`);
    process.exit(1);
  }

  console.log(
    `[generate] Found ${diff.totalFiles} changed files in ${Object.keys(diff.groups).length} groups`,
  );

  // Detect breaking changes
  const breakingChanges = detectBreakingChanges(diff);
  console.log(`[generate] Found ${breakingChanges.length} potential breaking changes`);

  // Draft migration steps for breaking changes
  const breakingWithMigrations = breakingChanges.map((bc) => draftMigrationSteps(bc));

  // Summarize component API changes
  const componentSummary = summarizeComponentApiChanges(diff);
  console.log(
    `[generate] Component API changes: ${Object.keys(componentSummary).length} components affected`,
  );

  // Build structured diff for generation
  const structuredDiff = {
    diff,
    breakingChanges: breakingWithMigrations,
    componentSummary,
    repo: REPO,
  };

  // Generate human release notes
  const humanNotes = generateHumanReleaseNotes(structuredDiff);

  // Generate machine release notes
  const machineNotes = generateMachineReleaseNotes(structuredDiff);

  // Write outputs
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const ROOT = path.resolve(__dirname, '..');
  const DIST = path.join(ROOT, 'dist');

  // Ensure dist directory exists
  if (!fs.existsSync(DIST)) {
    fs.mkdirSync(DIST, { recursive: true });
  }

  // Write human draft
  fs.writeFileSync(path.join(DIST, 'release-notes.draft.md'), humanNotes);
  console.log(`[generate] Wrote release-notes.draft.md (${humanNotes.length} chars)`);

  // Write machine JSON
  fs.writeFileSync(path.join(DIST, 'release-notes.json'), JSON.stringify(machineNotes, null, 2));
  console.log(`[generate] Wrote release-notes.json (${machineNotes.length} records)`);

  console.log('[generate] Done. Review the generated files in dist/');
}

main().catch(console.error);
