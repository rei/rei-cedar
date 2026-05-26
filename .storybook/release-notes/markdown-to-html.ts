function escapeHtml(raw: string): string {
  return raw
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function inlineMarkdown(text: string): string {
  const escaped = escapeHtml(text);
  return escaped
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

function isTableSeparatorLine(line: string): boolean {
  return /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?\s*$/.test(line);
}

function parseTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

export function markdownToHtml(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const html: string[] = [];

  let listType: 'ul' | 'ol' | null = null;
  let inCodeFence = false;

  const closeList = (): void => {
    if (listType) {
      html.push(`</${listType}>`);
      listType = null;
    }
  };

  for (let index = 0; index < lines.length; index += 1) {
    const rawLine = lines[index] ?? '';
    const line = rawLine.trimEnd();

    if (line.trimStart().startsWith('```')) {
      if (inCodeFence) {
        html.push('</code></pre>');
        inCodeFence = false;
      } else {
        closeList();
        const lang = line.trimStart().slice(3).trim();
        const langClass = lang ? ` class="language-${lang}"` : '';
        html.push(`<pre${langClass}><code>`);
        inCodeFence = true;
      }
      continue;
    }

    if (inCodeFence) {
      html.push(`${escapeHtml(rawLine)}\n`);
      continue;
    }

    if (!line) {
      closeList();
      continue;
    }

    const nextLine = lines[index + 1]?.trimEnd() ?? '';
    if (line.includes('|') && isTableSeparatorLine(nextLine)) {
      closeList();
      const headers = parseTableRow(line);
      html.push('<table>');
      html.push('<thead><tr>');
      for (const header of headers) {
        html.push(`<th>${inlineMarkdown(header)}</th>`);
      }
      html.push('</tr></thead>');
      html.push('<tbody>');
      index += 2;

      while (index < lines.length) {
        const rowLine = lines[index]?.trimEnd() ?? '';
        if (!rowLine || !rowLine.includes('|')) {
          index -= 1;
          break;
        }

        const cells = parseTableRow(rowLine);
        html.push('<tr>');
        for (const cell of cells) {
          html.push(`<td>${inlineMarkdown(cell)}</td>`);
        }
        html.push('</tr>');
        index += 1;
      }

      html.push('</tbody>');
      html.push('</table>');
      continue;
    }

    if (line === 'Copy') {
      closeList();
      html.push('<p class="copy-chip">Copy</p>');
      continue;
    }

    if (line.startsWith('##### ')) {
      closeList();
      html.push(`<h5>${inlineMarkdown(line.slice(6))}</h5>`);
      continue;
    }

    if (line.startsWith('#### ')) {
      closeList();
      html.push(`<h4>${inlineMarkdown(line.slice(5))}</h4>`);
      continue;
    }

    if (line.startsWith('### ')) {
      closeList();
      html.push(`<h3>${inlineMarkdown(line.slice(4))}</h3>`);
      continue;
    }

    if (line.startsWith('## ')) {
      closeList();
      html.push(`<h2>${inlineMarkdown(line.slice(3))}</h2>`);
      continue;
    }

    if (line.startsWith('# ')) {
      closeList();
      html.push(`<h1>${inlineMarkdown(line.slice(2))}</h1>`);
      continue;
    }

    if (line.startsWith('> ')) {
      closeList();
      html.push(`<blockquote>${inlineMarkdown(line.slice(2))}</blockquote>`);
      continue;
    }

    const orderedMatch = line.match(/^(\d+)\.\s+(.*)$/);
    if (orderedMatch) {
      if (listType !== 'ol') {
        closeList();
        html.push('<ol>');
        listType = 'ol';
      }
      html.push(`<li>${inlineMarkdown(orderedMatch[2] ?? '')}</li>`);
      continue;
    }

    if (line.startsWith('- ')) {
      if (listType !== 'ul') {
        closeList();
        html.push('<ul>');
        listType = 'ul';
      }
      html.push(`<li>${inlineMarkdown(line.slice(2))}</li>`);
      continue;
    }

    closeList();

    html.push(`<p>${inlineMarkdown(line)}</p>`);
  }

  closeList();

  if (inCodeFence) {
    html.push('</code></pre>');
  }

  return html.join('\n');
}
