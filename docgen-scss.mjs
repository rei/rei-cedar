import fs from 'fs-extra';
import postcss from 'postcss-scss';

function extractCssVariables(rule, prevNode) {
  const varAssignmentMatches = rule.value.match(/(--[\w-]+):\s*([^;]+)/);
  const varUsageMatches = rule.value.match(/var\((--[\w-]+),\s*(.*?)\)/);
  const varInPropMatches = rule.value.match(/(--[\w-]+)/);

  let name, defaultValue;

  if (varAssignmentMatches) {
    name = varAssignmentMatches[1];
    defaultValue = varAssignmentMatches[2];
  } else if (varUsageMatches) {
    name = varUsageMatches[1];
    defaultValue = varUsageMatches[2].replace('var(', '');
  } else if (varInPropMatches) {
    name = varInPropMatches[0];
    defaultValue = null;
  } else {
    return null;
  }

  let description = null;

  if (prevNode && prevNode.type === 'comment') {
    const commentParts = prevNode.text.split('//');
    for (const part of commentParts) {
      if (part.startsWith('ITEM_DOC:')) {
        description = part.split('ITEM_DOC:')[1].trim();
      }
    }
  }

  return {
    name,
    defaultValue,
    description,
  };
}

async function parseSCSS(filePath) {
  try {
    const css = await fs.readFile(filePath, 'utf-8');

    const root = postcss.parse(css.toString());
    let prevNode = null;

    let properties = [];

    root.walk((node) => {
      if (node.type === 'decl') {
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
