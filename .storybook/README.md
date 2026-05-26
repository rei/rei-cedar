# Storybook Release Notes Addon

## Overview

This addon adds a "Release Notes" panel to Storybook that automatically displays release documentation and branch changes.

## Features

### 1. Release Notes Panel

- Automatically consumes all markdown files from the `releaseNotes/` directory
- Supports optional front-matter metadata
- Selects default release note based on:
  - `default: true` in front-matter (highest priority)
  - Newest file by timestamp in filename (fallback)
- Renders markdown content in a dedicated Storybook panel
- Allows switching between multiple release notes via dropdown

### 2. Changes in this Branch

- Automatically runs `git diff master...HEAD --name-only`
- Displays changed files grouped by type (Added, Updated, Renamed, Removed)
- Follows copy guidelines:
  - Uses present tense ("Adds", "Updates", "Fixes")
  - Keeps bullet points short
  - No internal jargon
  - Groups changes logically

### 3. Ticket Cleanup Script

- Deletes ticket files from `docs/tickets/` where front-matter contains `status: done`
- Run with: `pnpm cleanup:tickets`
- Safe: only deletes files explicitly marked as done

## File Structure

```
rei-cedar/
├── .storybook/
│   ├── ReleaseNotesPanel.tsx      # React component for the panel
│   ├── manager.ts                 # Panel registration
│   ├── release-notes-utils.ts     # Markdown parsing and file selection
│   └── git-diff-utils.ts          # Git diff integration
├── releaseNotes/                  # Directory for release note markdown files
│   ├── 2025-05-18-initial-release.md
│   └── 2025-06-01-upcoming.md
├── build/
│   └── cleanup-tickets.ts         # Ticket cleanup script
└── docs/
    └── tickets/                   # Directory for ticket documentation
```

## Release Note Format

Release notes are markdown files with optional front-matter:

```markdown
---
default: true
version: 17.0.0
date: 2025-05-18
---

# Release Notes - v17.0.0

## Overview

This release introduces new features...

## New Features

- Adds feature A
- Updates feature B
```

### Front-Matter Fields

- `default: true` - Marks this as the default release note (optional)
- `version: string` - Version number (optional, for display)
- `date: string` - Release date (optional, for display)
- Any custom fields can be added as needed

## Ticket Format

Ticket files are markdown files with front-matter:

```markdown
---
status: in-progress
priority: high
---

# Ticket Title

Ticket description...
```

### Ticket Status Values

- `status: done` - File will be deleted by cleanup script
- `status: in-progress` - File will be preserved
- Any other status - File will be preserved

## Usage

### Viewing Release Notes in Storybook

1. Start Storybook: `pnpm storybook`
2. Click the "Release Notes" tab in the Storybook panel
3. View the default release note with branch changes
4. Use the dropdown to switch between different release notes

### Running Ticket Cleanup

```bash
pnpm cleanup:tickets
```

This will delete all ticket files with `status: done` in their front-matter.

## Implementation Details

### Additive and Non-Breaking

- Does not modify the token pipeline
- Does not modify GitHub Actions
- Uses TypeScript, React, and Storybook 7 conventions
- Follows ADR-0001 through ADR-0005 patterns
- All changes are additive - no existing functionality is modified

### Dependencies

- Uses existing Storybook APIs (`@storybook/manager-api`)
- Uses Node.js built-in modules (`fs`, `path`, `child_process`)
- No new external dependencies required

### Architecture

The implementation follows the modular architecture pattern from ADR-0001:

- **Utilities**: Separate utility modules for specific concerns (markdown parsing, git operations)
- **UI Components**: React component for the Storybook panel
- **Build Scripts**: TypeScript scripts for automation (ticket cleanup)
- **Configuration**: Minimal changes to Storybook configuration

## Copy Guidelines for Changes

When formatting git changes for release notes:

1. **Use present tense**: "Adds", "Updates", "Fixes" (not "Added", "Updated", "Fixed")
2. **Keep bullet points short**: Focus on the file path, not detailed descriptions
3. **No internal jargon**: Use clear, user-friendly language
4. **Group changes logically**: Separate by change type (Added, Updated, Renamed, Removed)

Example output:

```markdown
## Changes in this branch

### Added

- Adds src/components/NewComponent.vue
- Adds src/styles/new-styles.scss

### Updated

- Updates package.json
- Updates .storybook/main.ts

### Removed

- Removes src/components/DeprecatedComponent.vue
```
