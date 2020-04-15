import { CLIEngine } from 'eslint';

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

  if (totalErrorCount + totalWarningCount === 0) {
    return (
      'DONE: No lint errors found!\'}\n'
    );
  } else {
    return (
      ''
    );
  }
});

export = formatter;
