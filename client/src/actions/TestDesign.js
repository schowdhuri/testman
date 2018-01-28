import * as ACTIONS from "constants/TestDesignActions";

export const reqTestCases = testPlanId => ({
    type: ACTIONS.REQ_TEST_CASES,
    testPlanId
});

export const rcvTestCases = (testPlanId, testCases) => ({
    type: ACTIONS.RCV_TEST_CASES,
    testPlanId,
    testCases
});

export const reqTestPlans = () => ({
    type: ACTIONS.REQ_TEST_PLANS
});

export const rcvTestPlans = testPlans => ({
    type: ACTIONS.RCV_TEST_PLANS,
    testPlans
});

export const resetAddEdit = () => ({
    type: ACTIONS.RESET_TC_ADD_EDIT
});

export const reqTestCase = id => ({
    type: ACTIONS.REQ_TEST_CASE,
    id
});

export const rcvTestCase = testCase => ({
    type: ACTIONS.RCV_TEST_CASE,
    testCase
});

export const reqSaveTestCase = (testPlanId, testCase) => ({
    type: ACTIONS.REQ_TC_SAVE,
    testPlanId,
    testCase
});

export const rcvSaveTestCase = testCase => ({
    type: ACTIONS.RCV_TEST_CASE,
    testCase
});

export const selectTestPlan = testPlanId => ({
    type: ACTIONS.SELECT_TEST_PLAN,
    testPlanId
});

export const changeTCDescription = value => ({
    type: ACTIONS.CHANGE_TC_DESCR,
    value
});

export const changeTCName = value => ({
    type: ACTIONS.CHANGE_TC_NAME,
    value
});

export const reqSaveTestPlan = testPlan => ({
    type: ACTIONS.REQ_TP_SAVE,
    testPlan
});

export const rcvSaveTestPlan = testPlan => ({
    type: ACTIONS.RCV_TP_SAVE,
    testPlan
});
