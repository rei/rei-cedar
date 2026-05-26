/**
 * Ticket cleanup script
 * Deletes ticket files where front-matter contains status: done
 * Run with: tsx build/cleanup-tickets.ts
 */

import fs from 'fs';
import path from 'path';

interface TicketMetadata {
  status?: string;
  [key: string]: any;
}

/**
 * Extract front-matter from markdown content
 */
function extractFrontMatter(content: string): { metadata: TicketMetadata; content: string } {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);

  if (!match) {
    return { metadata: {}, content };
  }

  const frontMatterText = match[1];
  const markdownContent = match[2];

  const metadata: TicketMetadata = {};
  const lines = frontMatterText.split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();

      // Parse boolean values
      if (value === 'true') value = true;
      if (value === 'false') value = false;

      metadata[key] = value;
    }
  }

  return { metadata, content: markdownContent };
}

/**
 * Process tickets directory and delete files with status: done
 */
function cleanupTickets(ticketsDir: string): { deleted: string[]; errors: string[] } {
  const deleted: string[] = [];
  const errors: string[] = [];

  if (!fs.existsSync(ticketsDir)) {
    console.log(`Tickets directory does not exist: ${ticketsDir}`);
    return { deleted, errors };
  }

  const files = fs.readdirSync(ticketsDir);
  const markdownFiles = files.filter((file) => file.endsWith('.md'));

  for (const file of markdownFiles) {
    const filepath = path.join(ticketsDir, file);

    try {
      const content = fs.readFileSync(filepath, 'utf-8');
      const { metadata } = extractFrontMatter(content);

      if (metadata.status === 'done') {
        fs.unlinkSync(filepath);
        deleted.push(file);
        console.log(`Deleted: ${file}`);
      }
    } catch (error) {
      errors.push(file);
      console.error(`Error processing ${file}:`, error);
    }
  }

  return { deleted, errors };
}

/**
 * Main execution
 */
function main() {
  // Determine tickets directory path
  // Check if running from rei-cedar or rei-cedar-tokens
  const rootDir = process.cwd();
  const ticketsDir = path.join(rootDir, 'docs/tickets');

  console.log(`Cleaning up tickets in: ${ticketsDir}`);
  console.log('---');

  const { deleted, errors } = cleanupTickets(ticketsDir);

  console.log('---');
  console.log(`Deleted ${deleted.length} ticket file(s) with status: done`);

  if (errors.length > 0) {
    console.log(`Encountered ${errors.length} error(s):`);
    errors.forEach((file) => console.log(`  - ${file}`));
    process.exit(1);
  } else {
    console.log('Cleanup completed successfully.');
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { cleanupTickets, extractFrontMatter };
