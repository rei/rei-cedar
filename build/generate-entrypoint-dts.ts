import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const entrypointsDir = path.join(distDir, 'entrypoints');
const internalDeclarationPatterns = [/\.stories\.d\.ts$/, /\/examples\//];

const toPosixPath = (value: string) => value.replace(/\\/g, '/');
const normalizeDeclarationContents = (contents: string) =>
  contents.replace(/export type \* from/g, 'export * from');

const writeProxyDeclaration = (targetPath: string, sourcePath: string) => {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });

  const relativeImportPath = toPosixPath(
    path.relative(path.dirname(targetPath), sourcePath),
  ).replace(/\.d\.ts$/, '');
  const specifier = relativeImportPath.startsWith('.')
    ? relativeImportPath
    : `./${relativeImportPath}`;
  const sourceContents = normalizeDeclarationContents(fs.readFileSync(sourcePath, 'utf8'));
  const proxyContents = [
    sourceContents.includes('export { default') ? `export { default } from '${specifier}';` : '',
    `export * from '${specifier}';`,
  ]
    .filter(Boolean)
    .join('\n');

  fs.writeFileSync(targetPath, `${proxyContents}\n`);
};

const normalizeDeclarations = (currentDir: string) => {
  fs.readdirSync(currentDir, { withFileTypes: true }).forEach((dirent) => {
    const currentPath = path.join(currentDir, dirent.name);

    if (dirent.isDirectory()) {
      normalizeDeclarations(currentPath);
      return;
    }

    if (!dirent.name.endsWith('.d.ts')) return;

    const contents = fs.readFileSync(currentPath, 'utf8');
    const normalizedContents = normalizeDeclarationContents(contents);

    if (contents !== normalizedContents) {
      fs.writeFileSync(currentPath, normalizedContents);
    }
  });
};

const copyEntrypointDeclarations = (currentDir: string) => {
  fs.readdirSync(currentDir, { withFileTypes: true }).forEach((dirent) => {
    const sourcePath = path.join(currentDir, dirent.name);

    if (dirent.isDirectory()) {
      copyEntrypointDeclarations(sourcePath);
      return;
    }

    if (!dirent.name.endsWith('.d.ts')) return;

    const relativePath = path.relative(entrypointsDir, sourcePath);
    const targetPath = path.join(distDir, relativePath);

    writeProxyDeclaration(targetPath, sourcePath);
  });
};

const removeInternalDeclarations = (currentDir: string) => {
  fs.readdirSync(currentDir, { withFileTypes: true }).forEach((dirent) => {
    const currentPath = path.join(currentDir, dirent.name);

    if (dirent.isDirectory()) {
      removeInternalDeclarations(currentPath);

      if (fs.existsSync(currentPath) && fs.readdirSync(currentPath).length === 0) {
        fs.rmdirSync(currentPath);
      }

      return;
    }

    if (!dirent.name.endsWith('.d.ts')) return;

    const posixPath = toPosixPath(currentPath);
    const shouldRemove = internalDeclarationPatterns.some((pattern) => pattern.test(posixPath));

    if (shouldRemove) {
      fs.unlinkSync(currentPath);
    }
  });
};

if (fs.existsSync(entrypointsDir)) {
  copyEntrypointDeclarations(entrypointsDir);
}

if (fs.existsSync(distDir)) {
  normalizeDeclarations(distDir);
  removeInternalDeclarations(distDir);
}
