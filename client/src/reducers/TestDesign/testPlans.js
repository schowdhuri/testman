import * as ACTIONS from "constants/TestDesignActions";

const initialState = {
    all: [],
    selectedId: null,
    testCases: {}
};

const testCases = (state=initialState, action) => {
    const { type } = action;
    switch(type) {
        case ACTIONS.RCV_TEST_PLANS:
            return {
                ...state,
                all: action.testPlans
            };

        case ACTIONS.RCV_TP_SAVE: {
            const { testPlan } = action;
            const index = state.all.findIndex(tp => tp.id==testPlan.id);
            if(index==-1) {
                return {
                    ...state,
                    all: [
                        ...state.all,
                        testPlan
                    ]
                };
            }
            return {
                ...state,
                all: [
                    ...state.all.slice(0, index),
                    testPlan,
                    ...state.all.slice(index + 1)
                ]
            };
        }

        case ACTIONS.SELECT_TEST_PLAN:
            return {
                ...state,
                selectedId: action.testPlanId
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
