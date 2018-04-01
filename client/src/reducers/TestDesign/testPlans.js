import * as ACTIONS from "constants/TestDesignActions";

const initialState = {
    all: [],
    selected: null,
    testCases: {},
    _tempSelectedId: null
};

const testCases = (state=initialState, action) => {
    const { type } = action;
    switch(type) {
        case ACTIONS.RCV_TEST_PLANS: {
            const { testPlans } = action;
            if(state._tempSelectedId) {
                const match = testPlans.find(tp => tp.id == state._tempSelectedId);
                if(match) {
                    return {
                        ...state,
                        all: testPlans,
                        selected: match,
                        _tempSelectedId: null
                    };
                }
            }
            return {
                ...state,
                all: testPlans,
                selected: state.selected
                    ? state.selected
                    : testPlans.length
                        ? testPlans[0]
                        : null
            };
        }

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

        case ACTIONS.SELECT_TEST_PLAN: {
            const { testPlan } = action;
            const match = state.all.find(tp => tp.id == testPlan.id);
            if(!match) {
                return {
                    ...state,
                    selected: null,
                    _tempSelectedId: testPlan.id
                };
            }
            return {
                ...state,
                selected: match
            };
        }

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

        case ACTIONS.RCV_DEL_TC: {
            const { id, testPlanId } = action;
            let testCases = state.testCases[testPlanId] || [];
            const index = testCases.findIndex(tc => tc.id == id);
            if(index !== -1) {
                testCases = [
                    ...testCases.slice(0, index),
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

        case ACTIONS.RCV_UPLOAD_TESTS: {
            const { testPlanId, testCases } = action;
            const existing = state.testCases[testPlanId] || [];
            return {
                ...state,
                testCases: {
                    ...state.testCases,
                    [testPlanId]: [
                        ...existing,
                        ...testCases
                    ]
                }
            };
        }

    }
    return state;
};

export default testCases;
