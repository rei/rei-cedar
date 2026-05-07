import fs from 'node:fs';
import path from 'node:path';

type AnyRecord = Record<string, any>;

type DocgenAllowlist = {
  componentsMissingDescription: string[];
  propsMissingDescription: string[];
};

const rootDir = process.cwd();
const docgenPath = path.join(rootDir, 'dist', 'component-docgen.json');
const allowlistPath = path.join(rootDir, 'build', 'docgen-metadata-allowlist.json');

function readJson<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw) as T;
}

function main() {
  if (!fs.existsSync(docgenPath)) {
    console.error(
      'Docgen contract validation failed: dist/component-docgen.json not found. Run build:docgen first.',
    );
    process.exit(1);
  }

  if (!fs.existsSync(allowlistPath)) {
    console.error('Docgen contract validation failed: allowlist file is missing.');
    process.exit(1);
  }

  const docs = readJson<Record<string, AnyRecord>>(docgenPath);
  const allowlist = readJson<DocgenAllowlist>(allowlistPath);

  const components = Object.entries(docs);
  if (components.length === 0) {
    console.error('Docgen contract validation failed: no components found in docgen output.');
    process.exit(1);
  }

  const errors: string[] = [];
  const missingComponentDescription = new Set<string>();
  const missingPropDescription = new Set<string>();

  for (const [componentName, component] of components) {
    const sourceFiles = Array.isArray(component.sourceFiles) ? component.sourceFiles : [];
    if (sourceFiles.length === 0) {
      errors.push(`${componentName} has no sourceFiles in docgen output.`);
    }

    const componentDescription =
      typeof component.description === 'string' ? component.description : '';
    if (!componentDescription.trim()) {
      missingComponentDescription.add(componentName);
    }

    const props = Array.isArray(component.props) ? component.props : [];
    for (const prop of props) {
      const description = typeof prop.description === 'string' ? prop.description : '';
      if (!description.trim()) {
        missingPropDescription.add(`${componentName}.${String(prop.name)}`);
      }
    }
  }

  const allowedMissingComponents = new Set(allowlist.componentsMissingDescription);
  const allowedMissingProps = new Set(allowlist.propsMissingDescription);

  for (const componentName of missingComponentDescription) {
    if (!allowedMissingComponents.has(componentName)) {
      errors.push(`Component missing description and not allowlisted: ${componentName}`);
    }
  }

  for (const propKey of missingPropDescription) {
    if (!allowedMissingProps.has(propKey)) {
      errors.push(`Prop missing description and not allowlisted: ${propKey}`);
    }
  }

  const staleAllowedComponents = [...allowedMissingComponents].filter(
    (name) => !missingComponentDescription.has(name),
  );
  const staleAllowedProps = [...allowedMissingProps].filter(
    (key) => !missingPropDescription.has(key),
  );

  if (errors.length > 0) {
    console.error('Docgen contract validation failed with the following issues:');
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  if (staleAllowedComponents.length > 0 || staleAllowedProps.length > 0) {
    console.warn('Docgen contract validation passed with stale allowlist entries to clean up:');
    for (const name of staleAllowedComponents) {
      console.warn(`- component: ${name}`);
    }
    for (const key of staleAllowedProps) {
      console.warn(`- prop: ${key}`);
    }
  }

  console.log('Docgen contract validation passed.');
}

main();
