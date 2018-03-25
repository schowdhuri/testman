const buildTestCase = data => {
    const testCase = {};
    if(data.id)
        testCase.id = data.id;
    testCase.name = data.name;
    testCase.description = {
        value: data.description.value || ""
    };
    if(data.description.attachments)
        testCase.description.attachments = data.description.attachments
            .map(a => ({ id: a.id }));

    return testCase;
};

export default buildTestCase;
