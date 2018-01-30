const buildDefect = data => {
    const defect = {};
    if(data.id)
        defect.id = data.id;
    if(data.status)
        defect.status = data.status;

    defect.name = data.name;
    defect.description = data.description.value;

    return defect;
};

export default buildDefect;
