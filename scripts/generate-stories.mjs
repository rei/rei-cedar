#!/usr/bin/env node

/**
 * Storybook story generator for rei-cedar
 * Calls summarizeComponentApiChanges then scaffoldStory or updateStory per component.
 * Writes to src/components/<ComponentName>/<ComponentName>.stories.ts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import {
  compareBranchToMaster,
  summarizeComponentApiChanges,
  scaffoldStory,
  updateStory,
} from './mcp/cedar-docs-skill.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const REPO = 'rei-cedar';

async function main() {
  console.log(`[generate-stories] Starting for ${REPO}...`);

  const diff = compareBranchToMaster(REPO);
  const componentSummary = summarizeComponentApiChanges(diff);
  const componentNames = Object.keys(componentSummary);

  let created = 0;
  let updated = 0;

  for (const name of componentNames) {
    const componentDir = path.join(ROOT, 'src/components', name);
    const storyFile = path.join(componentDir, `${name}.stories.ts`);
    const apiDiff = componentSummary[name];

    if (!fs.existsSync(storyFile)) {
      // Scaffold a new story
      const content = scaffoldStory(name, apiDiff);
      if (content) {
        fs.writeFileSync(storyFile, content, 'utf-8');
        created++;
        console.log(`[generate-stories] Created: ${storyFile}`);
      }
    } else {
      // Attempt to update existing story
      const existing = fs.readFileSync(storyFile, 'utf-8');
      const result = updateStory(existing, apiDiff);
      if (result?.needsReview) {
        updated++;
        console.log(`[generate-stories] Needs review: ${storyFile} — ${result.reason}`);
      }
    }
  }

  console.log(`[generate-stories] Stories created: ${created}, updated: ${updated}`);
  console.log('[generate-stories] Done.');
}

main().catch((err) => {
  console.error('[generate-stories] Fatal error:', err);
  process.exit(1);
});
