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
                selected: state.selected || action.testPlans[0]
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

        case ACTIONS.RCV_TC_SAVE: {
            const { testPlanId, testCase } = action;
            let testCases = state.testCases[testPlanId] || [];
            const index = testCases.findIndex(tc => tc.id == testCase.id);
            if(index == -1) {
                testCases = [
                    ...testCases,
                    testCase
                ];
            } else {
                testCases = [
                    ...testCases.slice(0, index),
                    testCase,
                    ...testCases.slice(index + 1)
                ];
            }
            return {
                ...state,
                testCases: {
                    ...state.testCases,
                    [testPlanId]: testCases
                }
            };
        }

    }
    return state;
};

export default testCases;
