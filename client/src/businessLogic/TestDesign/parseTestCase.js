const parseTestCase = testCase => {
    const comments = testCase.comments.map(c => ({
        ...c,
        created: c.created || new Date("Jan 1 1970"),
        modified: c.modified || new Date("Jan 1 1970")
    }));
    comments.sort((c1, c2) => c1.created < c2.created)
    return {
        ...testCase,
        comments
    };
};

export default parseTestCase;
