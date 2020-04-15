import { relative } from 'path';
import { CLIEngine } from 'eslint';

import chalk from 'chalk';
// @ts-ignore
import mo from 'eslint-formatter-mo';

const formatter = ((results: CLIEngine.LintResult[]): string => {
  let totalErrorCount = 0;
  let totalWarningCount = 0;

  results.forEach((result: CLIEngine.LintResult) => {
    const {
      errorCount,
      warningCount
    } = result;

    if (errorCount + warningCount === 0) {
      return;
    }

    totalErrorCount = totalErrorCount + errorCount;
    totalWarningCount = totalWarningCount + warningCount;
  });

  const hasFixed = results.some((result: CLIEngine.LintResult) => {
    return result.output;
  });
  let fixedFilesMessage = '\n';
  if (hasFixed) {
    let fixedFiles = '';
    results.forEach((result: CLIEngine.LintResult) => {
      if (result.output) {
        const outputFileName = relative(process.cwd(), result.filePath);
        if (fixedFiles.length > 0) {
          fixedFiles = `${fixedFiles}  ${chalk.blue(outputFileName)}\n`;
        } else {
          fixedFiles = `  ${chalk.blue(outputFileName)}\n`;
        }
      }
    });

    fixedFilesMessage = `\nThe following files have been auto-fixed:\n\n${fixedFiles}\n`;
  }

  if (totalErrorCount + totalWarningCount === 0) {
    return (
      `${fixedFilesMessage}${chalk.bgHex('#2e7d32').white.bold(' DONE ')}: ${chalk.hex('#43a047')(hasFixed ? 'All lint errors auto-fixed.' : 'No lint errors found!')}\n`
    );
  } else {
    return (
      `${fixedFilesMessage}${mo(results)}`
    );
  }
});

export = formatter;
