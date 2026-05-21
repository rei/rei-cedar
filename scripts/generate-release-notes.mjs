#!/usr/bin/env node

/**
 * Release notes validation for rei-cedar
 *
 * Checks that release note artifacts exist and are structurally valid.
 * Actual content generation is performed by the Cedar docs agent (Cascade).
 *
 * Validates:
 *   dist/release-notes.draft.md  — human-readable draft
 *   dist/release-notes.json      — machine-readable change records
 *
 * Never overwrites dist/release-notes.md (human-published file).
 * Exits 0 if artifacts are valid or absent (non-blocking).
 * Exits 1 only if artifacts exist but fail validation.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const INTENT = path.join(ROOT, 'scripts', 'agent-config', 'release-intent.md');
const REPO = 'rei-cedar';

const REQUIRED_JSON_FIELDS = ['id', 'repo', 'changeType', 'category', 'subject', 'breaking'];

function checkIntent() {
  if (!fs.existsSync(INTENT)) {
    console.warn(`[release-notes] Warning: ${INTENT} does not exist.`);
    return false;
  }
  const content = fs.readFileSync(INTENT, 'utf-8');
  if (content.includes('vX.X.X') || /## What this release is about\n<!--/.test(content)) {
    console.warn(
      '[release-notes] release-intent.md is a blank template. Fill it before running the agent.',
    );
    return false;
  }
  return true;
}

function validateHumanDraft(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf-8');
  const errors = [];
  if (content.length < 50) errors.push('Draft is too short (< 50 chars)');
  if (!content.includes('## Overview') && !content.includes('# Release notes')) {
    errors.push('Missing expected heading (## Overview or # Release notes)');
  }
  return { valid: errors.length === 0, errors, size: content.length };
}

function validateMachineJSON(filePath) {
  if (!fs.existsSync(filePath)) return null;
  try {
    const records = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    if (!Array.isArray(records))
      return { valid: false, errors: ['Root is not an array'], count: 0 };
    const errors = [];
    records.forEach((r, i) => {
      REQUIRED_JSON_FIELDS.forEach((f) => {
        if (r[f] === undefined) errors.push(`Record ${i}: missing field "${f}"`);
      });
      if (typeof r.breaking !== 'boolean') errors.push(`Record ${i}: "breaking" must be boolean`);
    });
    return { valid: errors.length === 0, errors, count: records.length };
  } catch (e) {
    return { valid: false, errors: [`JSON parse error: ${e.message}`], count: 0 };
  }
}

function main() {
  console.log(`[release-notes] Validating artifacts for ${REPO}...`);

  const intentOk = checkIntent();

  const draftPath = path.join(DIST, 'release-notes.draft.md');
  const jsonPath = path.join(DIST, 'release-notes.json');
  const designPath = path.join(DIST, 'release-notes.design.md');

  const draftResult = validateHumanDraft(draftPath);
  const jsonResult = validateMachineJSON(jsonPath);
  const hasDesign = fs.existsSync(designPath);

  let hasErrors = false;

  if (!draftResult && !jsonResult) {
    console.warn(
      '[release-notes] No artifacts found in dist/. Run the Cedar docs agent to generate them.',
    );
    console.log('[release-notes] Skipping validation (non-blocking).');
    process.exit(0);
  }

  if (draftResult) {
    if (draftResult.valid) {
      console.log(`[release-notes] ✓ Human draft valid (${draftResult.size} chars)`);
    } else {
      console.error(`[release-notes] ✗ Human draft invalid: ${draftResult.errors.join('; ')}`);
      hasErrors = true;
    }
  }

  if (jsonResult) {
    if (jsonResult.valid) {
      console.log(`[release-notes] ✓ Machine JSON valid (${jsonResult.count} records)`);
    } else {
      console.error(`[release-notes] ✗ Machine JSON invalid: ${jsonResult.errors.join('; ')}`);
      hasErrors = true;
    }
  }

  console.log(`[release-notes] Design summary: ${hasDesign ? 'present' : 'not found'}`);
  console.log(`[release-notes] Intent filled: ${intentOk ? 'yes' : 'no (template only)'}`);

  if (hasErrors) {
    console.error('[release-notes] Validation failed. Fix artifacts before publishing.');
    process.exit(1);
  }

  console.log('[release-notes] Done.');
}

main();
