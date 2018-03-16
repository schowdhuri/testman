const validateTestRun = data => {
    if(!data.name) {
        return {
            valid: false,
            error: "Name is required"
        }
    }
    if(!data.execCycle) {
        return {
            valid: false,
            error: "execCycle is required"
        }
    }
    if(!data.testCase) {
        return {
            valid: false,
            error: "testCase is required"
        }
    }

    return {
        valid: true
    };
};

export default validateTestRun;
