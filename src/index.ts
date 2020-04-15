import { CLIEngine } from 'eslint';

const formatter = ((results: CLIEngine.LintResult[]): string => {
  return JSON.stringify(results, null, 2);
});

export = formatter;
