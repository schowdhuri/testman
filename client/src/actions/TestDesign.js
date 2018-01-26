import * as ACTIONS from "constants/TestDesignActions";

export const reqTestCases = () => ({
    type: ACTIONS.REQ_TEST_CASES
});

export const rcvTestCases = testCases => ({
    type: ACTIONS.RCV_TEST_CASES,
    testCases
});
