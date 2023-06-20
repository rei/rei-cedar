import fs from 'fs-extra';
import postcss from 'postcss-scss';

function extractCssVariables(rule, prevNode) {
  const varUsageMatches = rule.value.matchAll(/var\((--[\w-]+),\s*(.*?)\)/g);

  let cssProperties = [];

  for (const match of varUsageMatches) {
    const name = match[1];
    const defaultValue = match[2].replace('var(', '');

    let description = null;

    if (prevNode && prevNode.type === 'comment') {
      const commentParts = prevNode.text.split('//');
      for (const part of commentParts) {
        if (part.startsWith('ITEM_DOC:')) {
          description = part.split('ITEM_DOC:')[1].trim();
          break;
        }
      }
    }

    cssProperties.push({
      name,
      defaultValue,
      description,
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

    console.log(properties);
    return properties;
  } catch (err) {
    console.error(`Error reading file: ${err}`);
    return [];
  }
}

export default parseSCSS;
