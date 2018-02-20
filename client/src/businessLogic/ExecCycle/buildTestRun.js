const buildTestRun = data => {
    const testRun = {};
    if(data.id)
        testRun.id = data.id;
    testRun.execCycle = data.execCycle;
    testRun.name = data.name;
    testRun.status = data.status;
    testRun.testCase = data.testCase;

    return testRun;
};

export default buildTestRun;
