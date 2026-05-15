import fs from 'node:fs';
import path from 'node:path';

const outputDir = path.resolve(process.argv[2] ?? 'storybook-static');
const sourceExtensions = new Set(['.css', '.html', '.js']);
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

const htmlReferencePattern = /\s(?:href|poster|src)=["']([^"']+)["']/g;
const htmlSrcsetPattern = /\ssrcset=["']([^"']+)["']/g;
const jsAssetReferencePattern = /["'](\.\/[^"']+\.(?:css|js|mjs)(?:[?#][^"']*)?)["']/g;
const cssUrlPattern = /url\(["']?([^"')]+)["']?\)/g;

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

const hasJekyllIgnoredPath = (filePath: string): boolean => {
  return path
    .relative(outputDir, filePath)
    .split(path.sep)
    .some((segment) => segment.startsWith('_'));
};

const hasAssetExtension = (reference: string): boolean => {
  const referencePath = reference.split(/[?#]/, 1)[0];
  return assetExtensions.has(path.extname(referencePath));
};

const normalizeReference = (reference: string): string => reference.split(/[?#]/, 1)[0];

const resolveReference = (sourceFile: string, reference: string): string | undefined => {
  const normalizedReference = normalizeReference(reference);

  if (
    normalizedReference.startsWith('data:') ||
    normalizedReference.startsWith('http://') ||
    normalizedReference.startsWith('https://') ||
    normalizedReference.startsWith('//') ||
    normalizedReference.startsWith('#')
  ) {
    return undefined;
  }

  if (normalizedReference.startsWith('/rei-cedar/')) {
    return path.resolve(outputDir, normalizedReference.replace(/^\/rei-cedar\//, ''));
  }

  if (normalizedReference.startsWith('/')) {
    return path.resolve(outputDir, normalizedReference.replace(/^\//, ''));
  }

  return path.resolve(path.dirname(sourceFile), normalizedReference);
};

const collectReferences = (sourceFile: string, source: string): string[] => {
  const extension = path.extname(sourceFile);

  if (extension === '.html') {
    const references = [...source.matchAll(htmlReferencePattern)].map((match) => match[1]);

    for (const match of source.matchAll(htmlSrcsetPattern)) {
      references.push(
        ...match[1]
          .split(',')
          .map((srcsetPart) => srcsetPart.trim().split(/\s+/, 1)[0])
          .filter(Boolean),
      );
    }

    return references;
  }

  if (extension === '.css') {
    return [...source.matchAll(cssUrlPattern)].map((match) => match[1]);
  }

  return [...source.matchAll(jsAssetReferencePattern)].map((match) => match[1]);
};

const missingReferences: MissingReference[] = [];

if (!fs.existsSync(outputDir)) {
  console.error(`Storybook output directory does not exist: ${outputDir}`);
  process.exit(1);
}

const outputFiles = walkFiles(outputDir);

if (outputFiles.some(hasJekyllIgnoredPath) && !fs.existsSync(path.join(outputDir, '.nojekyll'))) {
  console.error('Storybook output contains underscore-prefixed assets but is missing .nojekyll.');
  process.exit(1);
}

for (const sourceFile of outputFiles) {
  if (!sourceExtensions.has(path.extname(sourceFile))) continue;

  const source = fs.readFileSync(sourceFile, 'utf8');

  for (const reference of collectReferences(sourceFile, source)) {
    if (!hasAssetExtension(reference)) continue;

    const resolvedPath = resolveReference(sourceFile, reference);

    if (resolvedPath && !fs.existsSync(resolvedPath)) {
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
