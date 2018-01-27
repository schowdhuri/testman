import * as ACTIONS from "constants/TestDesignActions";

const initialState = {
    all: [],
    selected: null,
    testCases: {}
};

const testCases = (state=initialState, action) => {
    const { type } = action;
    switch(type) {
        case ACTIONS.RCV_TEST_PLANS:
            return {
                ...state,
                all: action.testPlans,
                selected: action.testPlans[0]
            };

        case ACTIONS.SELECT_TEST_PLAN:
            return {
                ...state,
                selected: action.testPlan
            };

        case ACTIONS.RCV_TEST_CASES:
            return {
                ...state,
                testCases: {
                    ...state.testCases,
                    [action.testPlanId]: action.testCases
                }
            };
    }
    return state;
};

export default testCases;
