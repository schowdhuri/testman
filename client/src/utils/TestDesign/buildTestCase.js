const buildTestCase = data => {
    const testCase = {};
    if(data.id)
        testCase.id = data.id;
    testCase.name = data.name;
    testCase.description = data.description;

    return testCase;
};

export default buildTestCase;