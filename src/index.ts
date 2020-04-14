const formatter = ((results: any): string => {
  return JSON.stringify(results, null, 2);
});

export = formatter;
