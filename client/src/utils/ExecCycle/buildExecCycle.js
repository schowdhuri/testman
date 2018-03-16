const buildExecCycle = data => {
    const execCycle = {};
    if(data.id)
        execCycle.id = data.id;
    execCycle.name = data.name;
    execCycle.status = data.status;
    if(data.testCases)
        execCycle.testCases = data.testCases.map(tc => tc.id);
    else
        execCycle.testCases = (data.testRuns || []).map(tr => tr.testCase);
    return execCycle;
};

export default buildExecCycle;
