import fs from 'fs-extra';
import postcss from 'postcss-scss';

function extractCssVariables(rule, prevNode) {
  const varUsageMatches = Array.from(
    rule.value.matchAll(/var\((--[\w-]+),\s*(.*?)(?:, #\{\$[\w-]+\})?\)/g),
  );

  const cssProperties = [];
  const uniqueNames = new Set(); // Track unique CSS variable names

  if (prevNode && prevNode.type === 'comment') {
    const commentParts = prevNode.text.split('ITEM_DOC:').slice(1);

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
      let description = commentParts[index] ? commentParts[index].trim() : null;
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

async function parseSCSS(filePath) {
  try {
    const css = await fs.readFile(filePath, 'utf-8');

    const root = postcss.parse(css.toString());
    let prevNode = null;

    let properties = [];

    root.walk((node) => {
      if (node.type === 'decl') {
        // Handle multiline CSS properties
        const singleLineValue = node.value.replace(/\s+/g, ' ');
        node.value = singleLineValue;

        const cssProperties = extractCssVariables(node, prevNode);
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
