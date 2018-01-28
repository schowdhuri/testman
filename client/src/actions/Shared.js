import * as ACTIONS from "constants/SharedActions";

export const setLoading = (id, status) => ({
    type: ACTIONS.IS_LOADING,
    id,
    status
});

export const redirectToTestPlan = testPlanId => ({
    type: ACTIONS.REDIRECT_TEST_PLAN,
    testPlanId
});
