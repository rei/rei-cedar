import fs from 'node:fs';
import path from 'node:path';

const outputDir = path.resolve(process.argv[2] ?? 'storybook-static');
const sourceExtensions = new Set(['.html', '.js']);
const assetExtensions = new Set([
  '.css',
  '.gif',
  '.ico',
  '.jpeg',
  '.jpg',
  '.js',
  '.json',
  '.mjs',
  '.png',
  '.svg',
  '.webp',
  '.woff',
  '.woff2',
]);

const htmlReferencePattern = /\s(?:href|src)=["'](\.\/[^"']+)["']/g;
const cssPreloadReferencePattern = /["'](\.\/[^"']+\.css(?:[?#][^"']*)?)["']/g;

type MissingReference = {
  sourceFile: string;
  reference: string;
};

const walkFiles = (directory: string): string[] => {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return walkFiles(entryPath);
    }

    return [entryPath];
  });
};

const hasAssetExtension = (reference: string): boolean => {
  const referencePath = reference.split(/[?#]/, 1)[0];
  return assetExtensions.has(path.extname(referencePath));
};

const missingReferences: MissingReference[] = [];

if (!fs.existsSync(outputDir)) {
  console.error(`Storybook output directory does not exist: ${outputDir}`);
  process.exit(1);
}

for (const sourceFile of walkFiles(outputDir)) {
  if (!sourceExtensions.has(path.extname(sourceFile))) continue;

  const source = fs.readFileSync(sourceFile, 'utf8');
  const referencePattern =
    path.extname(sourceFile) === '.html' ? htmlReferencePattern : cssPreloadReferencePattern;

  for (const match of source.matchAll(referencePattern)) {
    const reference = match[1];

    if (!hasAssetExtension(reference)) continue;

    const referencedPath = reference.split(/[?#]/, 1)[0];
    const resolvedPath = path.resolve(path.dirname(sourceFile), referencedPath);

    if (!fs.existsSync(resolvedPath)) {
      missingReferences.push({ sourceFile, reference });
    }
  }
}

if (missingReferences.length > 0) {
  console.error('Storybook contains references to missing static assets:');

  for (const { sourceFile, reference } of missingReferences) {
    console.error(`- ${path.relative(outputDir, sourceFile)} -> ${reference}`);
  }

  process.exit(1);
}

console.log('Storybook static asset references are valid.');
