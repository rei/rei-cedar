---
default: false
version: 17.0.0
date: 2025-05-18
---

# Release Notes - v17.0.0

## Overview

This release introduces the new Storybook Release Notes panel with automatic branch change tracking.

## New Features

- Adds Release Notes panel to Storybook for tracking release documentation
- Automatically displays changes in the current branch compared to master
- Supports markdown front-matter for release note metadata
- Implements ticket cleanup automation for completed tickets

## Documentation

- Release notes now consume markdown files from the `releaseNotes/` directory
- Each release note can specify `default: true` in front-matter to be selected as the default
- If no default is specified, the newest file by timestamp is selected
