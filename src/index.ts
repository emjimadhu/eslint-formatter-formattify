const formatter = ((results: any) => {
    console.log('Hello World')
    return JSON.stringify(results, null, 2);
});

export = formatter;
