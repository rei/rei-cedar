import fs from 'node:fs';
import path from 'node:path';
import { globSync } from 'glob';

type ExportEntry = string | null | Record<string, ExportEntry>;

type PackageJson = {
  exports?: Record<string, ExportEntry>;
};

const rootDir = process.cwd();
const packageJsonPath = path.join(rootDir, 'package.json');

function readPackageJson(filePath: string): PackageJson {
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw) as PackageJson;
}

function validateTarget(exportKey: string, conditionPath: string, target: string): string[] {
  const errors: string[] = [];

  if (!target.startsWith('./')) {
    return errors;
  }

  const relPath = target.slice(2);

  if (target.includes('*')) {
    const matches = globSync(relPath, {
      cwd: rootDir,
      nodir: true,
    });

    if (matches.length === 0) {
      errors.push(`${exportKey} (${conditionPath}) pattern target matched no files: ${target}`);
    }

    return errors;
  }

  const absPath = path.join(rootDir, relPath);
  if (!fs.existsSync(absPath)) {
    errors.push(`${exportKey} (${conditionPath}) target file does not exist: ${target}`);
  }

  return errors;
}

function walkExportEntry(exportKey: string, entry: ExportEntry, conditionPath = 'root'): string[] {
  if (entry === null) return [];
  if (typeof entry === 'string') return validateTarget(exportKey, conditionPath, entry);

  return Object.entries(entry).flatMap(([condition, nested]) =>
    walkExportEntry(exportKey, nested, `${conditionPath}.${condition}`),
  );
}

function validateRequiredContracts(exportsMap: Record<string, ExportEntry>): string[] {
  const errors: string[] = [];

  const rootEntry = exportsMap['.'];
  if (!rootEntry || typeof rootEntry !== 'object' || Array.isArray(rootEntry)) {
    errors.push('Missing or invalid root export contract for ".".');
  } else {
    const requiredRootConditions = ['types', 'import', 'require'];
    for (const condition of requiredRootConditions) {
      if (!(condition in rootEntry)) {
        errors.push(`Root export contract is missing required condition: ${condition}`);
      }
    }
  }

  const wildcardEntry = exportsMap['./*'];
  if (!wildcardEntry || typeof wildcardEntry !== 'object' || Array.isArray(wildcardEntry)) {
    errors.push('Missing or invalid focused wildcard export contract for "./*".');
  } else {
    const requiredWildcardConditions = ['types', 'import'];
    for (const condition of requiredWildcardConditions) {
      if (!(condition in wildcardEntry)) {
        errors.push(`Wildcard export contract is missing required condition: ${condition}`);
      }
    }
  }

  return errors;
}

function main() {
  const pkg = readPackageJson(packageJsonPath);
  const exportsMap = pkg.exports;

  if (!exportsMap) {
    console.error('Consumer contract validation failed: package.json has no exports map.');
    process.exit(1);
  }

  const structuralErrors = validateRequiredContracts(exportsMap);
  const targetErrors = Object.entries(exportsMap).flatMap(([exportKey, entry]) =>
    walkExportEntry(exportKey, entry),
  );

  const errors = [...structuralErrors, ...targetErrors];

  if (errors.length > 0) {
    console.error('Consumer contract validation failed with the following issues:');
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log('Consumer contract validation passed.');
}

main();
