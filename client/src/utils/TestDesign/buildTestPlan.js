const buildTestPlan = data => {
    const testPlan = {};
    if(data.id)
        testPlan.id = data.id;
    testPlan.name = data.name;
    
    return testPlan;
};

export default buildTestPlan;
