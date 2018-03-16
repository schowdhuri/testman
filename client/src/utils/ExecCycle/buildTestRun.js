const buildTestRun = data => {
    const testRun = {};
    if(data.id)
        testRun.id = data.id;
    testRun.execCycle = data.execCycle && data.execCycle.id
        ? data.execCycle.id
        : data.execCycle;
    testRun.name = data.name;
    testRun.status = data.status;
    testRun.testCase = data.testCase && data.testCase.id
        ? data.testCase.id
        : data.testCase;
    if(data.defects) {
        testRun.defects = data.defects.map(def => def.id);
    }
    return testRun;
};

export default buildTestRun;
