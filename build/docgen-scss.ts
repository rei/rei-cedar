import fs from 'fs-extra';
import postcssScss from 'postcss-scss';
import type { Declaration, Node, Comment } from 'postcss';

interface CSSProperty {
  name: string;
  defaultValue: string;
  description: string | null;
}

function extractCssVariables(rule: Declaration, prevNode: Node | null): CSSProperty[] | null {
  const varUsageMatches = Array.from(
    rule.value.matchAll(/var\((--[\w-]+),\s*(.*?)(?:, #\{\$[\w-]+\})?\)/g),
  );

  const cssProperties: CSSProperty[] = [];
  const uniqueNames = new Set<string>(); // Track unique CSS variable names

  if (prevNode && prevNode.type === 'comment') {
    const commentParts = (prevNode as Comment).text.split('ITEM_DOC:').slice(1);

    varUsageMatches.forEach((match, index) => {
      const name = match[1];
      if (uniqueNames.has(name)) {
        // If name already exists, skip this iteration
        return;
      }
      uniqueNames.add(name); // Add name to the set

      let defaultValue = match[2].replace('var(', '');

      // If the defaultValue starts with rgba( and doesn't have a closing parenthesis, add one
      if (defaultValue.startsWith('rgba(') && !defaultValue.endsWith(')')) {
        defaultValue += ')';
      }

      // Get description and remove any trailing '//'
      let description: string | null = commentParts[index] ? commentParts[index].trim() : null;
      if (description && description.endsWith('//')) {
        description = description.slice(0, -2).trim();
      }

      cssProperties.push({
        name,
        defaultValue,
        description,
      });
    });
  }

  return cssProperties.length > 0 ? cssProperties : null;
}

async function parseSCSS(filePath: string): Promise<CSSProperty[]> {
  try {
    const css = await fs.readFile(filePath, 'utf-8');

    const root = postcssScss.parse(css.toString());
    let prevNode: Node | null = null;

    let properties: CSSProperty[] = [];

    root.walk((node) => {
      if (node.type === 'decl') {
        // Handle multiline CSS properties
        const declNode = node as Declaration;
        const singleLineValue = declNode.value.replace(/\s+/g, ' ');
        declNode.value = singleLineValue;

        const cssProperties = extractCssVariables(declNode, prevNode);
        if (cssProperties) {
          properties = properties.concat(cssProperties);
        }
      }
      prevNode = node;
    });

    properties = properties.filter((property) => !!property.defaultValue);

    return properties;
  } catch (err) {
    console.error(`Error reading file: ${err}`);
    return [];
  }
}

export default parseSCSS;
