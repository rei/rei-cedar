// lint-report-generator.mjs
import stylelint from 'stylelint';
import fs from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Formats the current date as YYYY-MM-DD
 */
const getFormattedDate = () => {
    const date = new Date();
    return date.toISOString().split('T')[0];
};

/**
 * Creates directory if it doesn't exist
 */
const ensureDirectoryExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

/**
 * Processes stylelint results into a structured format
 */
const processStylelintResults = (styleResults) => {
    return styleResults.results.reduce((acc, file) => {
        if (file.warnings.length > 0) {
            const relativePath = relative(process.cwd(), file.source);
            acc.push({
                file: relativePath,
                warnings: file.warnings.map(w => ({
                    line: w.line,
                    column: w.column,
                    rule: w.rule,
                    text: w.text,
                    severity: w.severity
                }))
            });
        }
        return acc;
    }, []);
};

/**
 * Generates markdown content from warnings
 */
const generateMarkdownContent = (styleWarnings, reportDate) => {
    let mdReport = `# Stylelint Warning Report (${reportDate})\n\n`;
    mdReport += `## Summary\n\n`;
    
    const totalWarnings = styleWarnings.reduce((sum, file) => 
        sum + file.warnings.length, 0);
    
    mdReport += `- Total files with warnings: ${styleWarnings.length}\n`;
    mdReport += `- Total warnings: ${totalWarnings}\n\n`;
    
    if (styleWarnings.length === 0) {
        mdReport += 'No style warnings found.\n\n';
        return mdReport;
    }

    mdReport += `## Detailed Warnings\n\n`;
    styleWarnings.forEach(file => {
        mdReport += `### ${file.file}\n\n`;
        mdReport += '| Line:Col | Rule | Message |\n';
        mdReport += '|----------|------|---------||\n';
        file.warnings.forEach(warning => {
            const escapedText = warning.text.replace(/\|/g, '\\|');
            mdReport += `| ${warning.line}:${warning.column} | \`${warning.rule}\` | ${escapedText} |\n`;
        });
        mdReport += '\n';
    });

    return mdReport;
};

/**
 * Main function to generate lint reports
 */
const generateLintReport = async () => {
    try {
        const reportDate = getFormattedDate();
        const reportDir = join(process.cwd(), 'reports');
        
        ensureDirectoryExists(reportDir);

        const styleResults = await stylelint.lint({
            files: 'src/**/*.scss',
            formatter: 'json'
        });

        const styleWarnings = processStylelintResults(styleResults);
        const mdReport = generateMarkdownContent(styleWarnings, reportDate);

        const reportPath = join(reportDir, `stylelint-report-${reportDate}.md`);
        const jsonReportPath = join(reportDir, `stylelint-report-${reportDate}.json`);
        
        fs.writeFileSync(reportPath, mdReport);
        fs.writeFileSync(jsonReportPath, JSON.stringify({
            date: reportDate,
            styleWarnings
        }, null, 2));

        const summary = {
            totalFiles: styleWarnings.length,
            totalWarnings: styleWarnings.reduce((sum, file) => 
                sum + file.warnings.length, 0),
            reportPath,
            jsonReportPath
        };

        console.log(`
Reports generated successfully:
- Markdown: ${summary.reportPath}
- JSON: ${summary.jsonReportPath}
Summary:
- Total files with warnings: ${summary.totalFiles}
- Total warnings: ${summary.totalWarnings}
        `);

        return summary;

    } catch (error) {
        console.error('Error generating lint report:', error);
        throw error;
    }
};

// Execute if called directly
if (import.meta.url === `file://${__filename}`) {
    generateLintReport().catch(error => {
        process.exit(1);
    });
}

export default generateLintReport;