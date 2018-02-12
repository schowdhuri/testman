const buildExecCycle = data => {
    const execCycle = {};
    if(data.id)
        execCycle.id = data.id;
    execCycle.name = data.name;
    execCycle.testRuns = data.testRuns || [];

    return execCycle;
};

export default buildExecCycle;
