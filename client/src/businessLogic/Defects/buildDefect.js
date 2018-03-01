const buildDefect = data => {
    const defect = {};
    if(data.id)
        defect.id = data.id;
    if(data.status)
        defect.status = data.status;

    defect.name = data.name;
    if(data.description.value)
        defect.description = data.description.value;
    else
        defect.description = data.description;
    defect.testCases = data.testCases.map(tc => tc.id);

    return defect;
};

export default buildDefect;
