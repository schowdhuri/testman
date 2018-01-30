const validateDefect = defect => {
    if(!defect.testCases) {
        return {
            valid: false,
            error: "A Defect must be tagged to at least one test case"
        }
    }
    return {
        valid: true
    };
};

export default validateDefect;
