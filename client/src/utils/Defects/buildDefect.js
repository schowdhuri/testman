const buildDefect = data => {
    const defect = {};
    if(data.id)
        defect.id = data.id;
    if(data.status)
        defect.status = data.status;

    defect.name = data.name;
    defect.description = {
        value: data.description.value
    };
    if(data.description.attachments)
        defect.description.attachments = data.description.attachments
            .map(a => ({ id: a.id }));
    defect.testCases = data.testCases.map(tc => tc.id);
    defect.testRuns = data.testRuns
        ? data.testRuns.map(tr => tr.id)
        : [];
    defect.assignee = data.assignee
        ? { id: data.assignee.id }
        : null;
    return defect;
};

export default buildDefect;
