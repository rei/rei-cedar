import fs from 'node:fs';
import path from 'node:path';

type PackageExport = string | Record<string, string | null> | null;

type PackageJson = {
  main?: string;
  module?: string;
  types?: string;
  exports?: Record<string, PackageExport>;
};

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8')) as PackageJson;
const distDir = path.resolve('dist');
const missingFiles: string[] = [];
const invalidFiles: string[] = [];

const requiredFiles = [
  packageJson.main,
  packageJson.module,
  packageJson.types,
  './dist/cedar.css',
  './dist/cdr-fonts.css',
  './dist/cdr-palette.css',
  './dist/cdr-reset.css',
  './dist/style/cdr-fonts.css',
  './dist/style/cdr-palette.css',
  './dist/style/cdr-reset.css',
].filter((file): file is string => Boolean(file));

const walkFiles = (directory: string): string[] => {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return walkFiles(entryPath);
    }

    return [entryPath];
  });
};

const assertFileExists = (filePath: string): void => {
  if (filePath.includes('*')) return;

  const resolvedPath = path.resolve(filePath);

  if (!fs.existsSync(resolvedPath)) {
    missingFiles.push(filePath);
  }
};

if (!fs.existsSync(distDir)) {
  console.error('Package dist directory does not exist. Run pnpm run build first.');
  process.exit(1);
}

for (const file of requiredFiles) {
  assertFileExists(file);
}

for (const exportValue of Object.values(packageJson.exports ?? {})) {
  if (typeof exportValue === 'string') {
    assertFileExists(exportValue);
    continue;
  }

  if (!exportValue) continue;

  for (const target of Object.values(exportValue)) {
    if (typeof target === 'string') {
      assertFileExists(target);
    }
  }
}

for (const file of walkFiles(distDir)) {
  const normalizedPath = file.split(path.sep).join('/');

  if (/\.(stories|spec|test)\./.test(normalizedPath) || normalizedPath.includes('/examples/')) {
    invalidFiles.push(path.relative(distDir, file));
  }

  if (file.endsWith('.mjs') && path.dirname(file) === distDir) {
    const declarationPath = file.replace(/\.mjs$/, '.d.ts');

    if (!fs.existsSync(declarationPath)) {
      missingFiles.push(path.relative(process.cwd(), declarationPath));
    }
  }
}

if (missingFiles.length > 0 || invalidFiles.length > 0) {
  if (missingFiles.length > 0) {
    console.error('Package build is missing expected files:');
    missingFiles.forEach((file) => console.error(`- ${file}`));
  }

  if (invalidFiles.length > 0) {
    console.error('Package build contains internal-only files:');
    invalidFiles.forEach((file) => console.error(`- ${file}`));
  }

  process.exit(1);
}

console.log('Package build outputs are valid.');
