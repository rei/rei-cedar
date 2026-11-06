import fs from 'fs';
import buttonAdapter from './adapters/button';
import { checkAdapterSync, type SyncFinding, type SyncReport } from './adapter';
import { FigmaApiError, FigmaClient } from './client';
import { datasetFromResponse, mergeFigmaDatasets } from './resolve';
import { loadInstalledTokenColors } from './tokens';
import type { FigmaComponentAdapter } from './types';

const adapters: Record<string, FigmaComponentAdapter> = {
  button: buttonAdapter,
};

interface CliOptions {
  adapterId: string;
  token?: string;
  verbose: boolean;
  jsonPath?: string;
}

function usage(): string {
  return [
    'Usage: tsx build/figma/cli.ts [button] [--verbose] [--json <path>] [--token <pat>]',
    '',
    'The token can also be supplied through FIGMA_ACCESS_TOKEN (preferred) or FIGMA_TOKEN.',
    'The command is read-only: it compares Figma variables with the Cedar contract and',
    'the installed @rei/cdr-tokens package.',
  ].join('\n');
}

function parseArgs(argv: string[]): CliOptions {
  let adapterId = 'button';
  let token: string | undefined;
  let verbose = false;
  let jsonPath: string | undefined;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--help' || arg === '-h') {
      console.log(usage());
      process.exit(0);
    }
    if (arg === '--verbose' || arg === '-v') {
      verbose = true;
      continue;
    }
    if (arg === '--json') {
      jsonPath = argv[index + 1];
      if (!jsonPath) throw new Error('--json requires a file path');
      index += 1;
      continue;
    }
    if (arg === '--token') {
      token = argv[index + 1];
      if (!token) throw new Error('--token requires a Figma personal access token');
      index += 1;
      continue;
    }
    if (arg.startsWith('-')) throw new Error(`Unknown option: ${arg}`);
    adapterId = arg;
  }

  return { adapterId, token, verbose, jsonPath };
}

function formatFinding(finding: SyncFinding): string {
  const icon = finding.severity === 'error' ? '✖' : finding.severity === 'warning' ? '⚠' : '•';
  const location = [finding.figma, finding.target].filter(Boolean).join(' → ');
  return `${icon} ${location ? `${location}: ` : ''}${finding.message}`;
}

function printVerboseEntries(report: SyncReport): void {
  console.log('\nMapped variables:');
  for (const entry of report.entries) {
    if (entry.legacy) continue;
    const status = entry.targets.every((target) => target.ok) ? '✓' : '✖';
    console.log(`${status} ${entry.figma}`);
    for (const target of entry.targets) {
      const state = target.ok ? '✓' : '✖';
      const expected = target.expectedVar
        ? `${target.expectedVar}${target.expectedColor ? ` (${target.expectedColor})` : ''}`
        : '(no token)';
      const actual = target.actualAlias
        ? `${target.actualAlias}${target.actualColor ? ` (${target.actualColor})` : ''}`
        : '(no alias)';
      console.log(`  ${state} ${target.target}: expected ${expected}; Figma ${actual}`);
    }
  }
}

function printReport(report: SyncReport, verbose: boolean): void {
  console.log(`Figma → Cedar sync: ${report.adapter} (${report.component})`);
  console.log(`Source: ${report.source.collectionName} (${report.source.collectionId})`);
  console.log(`Mode: ${report.source.modeId ?? '(default not reported)'}`);
  console.log(
    `Mapped ${report.counts.mappedVariables} variables → ${report.counts.targets} contract targets; ` +
      `${report.counts.okTargets}/${report.counts.targets} verified; ` +
      `${report.counts.legacyVariables} legacy; ` +
      `${report.counts.errors} error${report.counts.errors === 1 ? '' : 's'}, ` +
      `${report.counts.warnings} warning${report.counts.warnings === 1 ? '' : 's'}.`,
  );

  if (verbose) printVerboseEntries(report);

  const errors = report.findings.filter((finding) => finding.severity === 'error');
  const warnings = report.findings.filter((finding) => finding.severity === 'warning');
  const legacy = report.findings.filter((finding) => finding.code === 'legacy');

  if (errors.length > 0) {
    console.log('\nDrift:');
    for (const finding of errors) console.log(formatFinding(finding));
  }

  if (warnings.length > 0) {
    console.log('\nWarnings:');
    for (const finding of warnings) console.log(formatFinding(finding));
  }

  if (legacy.length > 0) {
    console.log('\nLegacy Figma variables (kept for traceability, not rendered by Cedar):');
    for (const finding of legacy) console.log(formatFinding(finding));
  }

  console.log(report.ok ? '\nResult: IN SYNC' : '\nResult: DRIFT DETECTED');
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  const adapter = adapters[options.adapterId];
  if (!adapter) {
    throw new Error(
      `Unknown adapter "${options.adapterId}". Available adapters: ${Object.keys(adapters).join(', ')}`,
    );
  }

  const token = options.token ?? process.env.FIGMA_ACCESS_TOKEN ?? process.env.FIGMA_TOKEN;
  if (!token) {
    throw new Error(
      'No Figma token found. Set FIGMA_ACCESS_TOKEN (or FIGMA_TOKEN), or pass --token. The command is read-only.',
    );
  }

  const client = new FigmaClient({ token });
  const fileKeys = [adapter.source.fileKey, ...adapter.libraryFileKeys];
  const responses = await Promise.all(fileKeys.map((fileKey) => client.getLocalVariables(fileKey)));
  const dataset = mergeFigmaDatasets(...responses.map(datasetFromResponse));
  const tokenColors = loadInstalledTokenColors();
  const report = checkAdapterSync(adapter, dataset, tokenColors);

  printReport(report, options.verbose);

  if (options.jsonPath) {
    fs.writeFileSync(options.jsonPath, `${JSON.stringify(report, null, 2)}\n`);
    console.log(`\nJSON report written to ${options.jsonPath}`);
  }

  if (!report.ok) process.exitCode = 1;
}

main().catch((error) => {
  if (error instanceof FigmaApiError && error.status === 403) {
    console.error(
      'Figma denied access. Check that FIGMA_ACCESS_TOKEN has read access to the file and variables.',
    );
  }
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
