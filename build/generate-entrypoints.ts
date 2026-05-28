import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const workspaceRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const componentsDir = path.join(workspaceRoot, 'src/components');
const componentEntrypointsDir = path.join(workspaceRoot, 'src/entrypoints');

const toImportPath = (fromFilePath: string, toFilePath: string) => {
  const relativePath = path.relative(path.dirname(fromFilePath), toFilePath).replace(/\\/g, '/');

  return relativePath.startsWith('.') ? relativePath : `./${relativePath}`;
};

export const generateComponentEntrypoints = () => {
  const entries: Record<string, string> = {};

  fs.rmSync(componentEntrypointsDir, { recursive: true, force: true });
  fs.mkdirSync(componentEntrypointsDir, { recursive: true });

  const writeEntrypoint = (entryName: string, entryFileContents: string) => {
    const entryFilePath = path.join(componentEntrypointsDir, `${entryName}.ts`);

    fs.mkdirSync(path.dirname(entryFilePath), { recursive: true });
    fs.writeFileSync(entryFilePath, `${entryFileContents}\n`);
    entries[entryName] = `./src/entrypoints/${entryName}.ts`;
  };

  fs.readdirSync(componentsDir, { withFileTypes: true }).forEach((dirEntry) => {
    if (!dirEntry.isDirectory()) return;

    const componentPath = path.join(componentsDir, dirEntry.name);
    const vueEntries = fs
      .readdirSync(componentPath)
      .filter((fileName) => fileName.endsWith('.vue') && fileName.startsWith('Cdr'));
    const typeSourceFileName = fs.existsSync(path.join(componentPath, 'types.ts'))
      ? 'types'
      : fs.existsSync(path.join(componentPath, 'interfaces.ts'))
        ? 'interfaces'
        : null;

    vueEntries.forEach((fileName) => {
      const componentExportName = fileName.replace(/\.vue$/, '');
      const entryName = componentExportName;
      const componentEntryFilePath = path.join(componentEntrypointsDir, `${entryName}.ts`);
      const componentFilePath = path.join(componentPath, fileName);
      const entryFileContents = [
        `export { default, default as ${componentExportName} } from '${toImportPath(componentEntryFilePath, componentFilePath)}';`,
        typeSourceFileName
          ? `export type * from '${toImportPath(componentEntryFilePath, path.join(componentPath, typeSourceFileName))}';`
          : '',
      ]
        .filter(Boolean)
        .join('\n');

      writeEntrypoint(entryName, entryFileContents);

      if (typeSourceFileName) {
        const typeEntryName = `${entryName}/types`;
        const typeEntryFilePath = path.join(componentEntrypointsDir, `${typeEntryName}.ts`);

        writeEntrypoint(
          typeEntryName,
          `export type * from '${toImportPath(typeEntryFilePath, path.join(componentPath, typeSourceFileName))}';`,
        );
      }
    });
  });

  return entries;
};

// When run directly as a script (e.g. `tsx build/generate-entrypoints.ts`),
// execute the entrypoint generation immediately.
const isDirectExecution =
  import.meta.url === `file://${process.argv[1]}` ||
  import.meta.url === new URL(`file://${process.argv[1]}`).href;

if (isDirectExecution) {
  generateComponentEntrypoints();
}
