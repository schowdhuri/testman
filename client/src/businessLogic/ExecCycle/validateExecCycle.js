const validateExecCycle = data => {
    if(!data.name) {
        return {
            valid: false,
            error: "Name is required"
        }
    }

    return {
        valid: true
    };
};

export default validateExecCycle;
