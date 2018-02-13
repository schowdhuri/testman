const buildExecCycle = data => {
    const execCycle = {};
    if(data.id)
        execCycle.id = data.id;
    execCycle.name = data.name;
    execCycle.status = data.status;
    execCycle.testCases = (data.testCases || []).map(tc => tc.id);
    return execCycle;
};

export default buildExecCycle;
