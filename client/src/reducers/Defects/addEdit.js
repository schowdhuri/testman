import * as ACTIONS from "constants/DefectsActions";

const initialState = {
    assignee: null,
    name: "",
    description: {
        value: ""
    },
    comments: [],
    testCases: [],
    newComment: ""
};

const addEditDefect = (state=initialState, action) => {
    const { type } = action;
    switch(type) {
        case ACTIONS.ADD_TESTS_TO_DEFECT: {
            const { testCases } = action;
            const newTests = [];
            testCases.forEach(testCase => {
                const index = state.testCases.findIndex(tc => tc.id==testCase.id);
                if(index == -1) {
                    newTests.push({
                        id: testCase.id,
                        name: testCase.name,
                        testPlan: testCase.testPlan
                    });
                }
            });
            return {
                ...state,
                testCases: [
                    ...state.testCases,
                    ...newTests
                ]
            };
            break;
        }

        case ACTIONS.CHANGE_DF_ASSIGNEE:
            return {
                ...state,
                assignee: {
                    ...action.value
                }
            };

        case ACTIONS.CHANGE_DF_DESCR:
            return {
                ...state,
                description: {
                    ...state.description,
                    value: action.value
                }
            };

        case ACTIONS.CHANGE_DF_NAME:
            return {
                ...state,
                name: action.value
            };

        case ACTIONS.CHANGE_DF_STATUS:
            return {
                ...state,
                status: action.value
            };

        case ACTIONS.CHANGE_DF_COMMENT:
            return {
                ...state,
                newComment: action.value
            };

        case ACTIONS.DEL_TEST_FRM_DEFECT: {
            const { id } = action;
            const index = state.testCases.findIndex(tc => tc.id==id);
            if(index != -1) {
                return {
                    ...state,
                    testCases: [
                        ...state.testCases.slice(0, index),
                        ...state.testCases.slice(index + 1)
                    ]
                };
            }
            break;
        }

        case ACTIONS.RCV_SAVE_DF_COMMENT: {
            const comment = action.value;
            const index = state.comments.findIndex(c => c.id==comment.id);
            if(index == -1) {
                return {
                    ...state,
                    comments: [
                        comment,
                        ...state.comments,
                    ],
                    newComment: initialState.newComment
                };
            }
            return {
                ...state,
                comments: [
                    ...state.comments.slice(0, index),
                    comment,
                    ...state.comments.slice(index + 1)
                ],
                newComment: initialState.newComment
            };
        }

        case ACTIONS.RCV_DELETE_COMMENT: {
            const { id } = action;
            const index = state.comments.findIndex(c => c.id==id);
            if(index != -1) {
                return {
                    ...state,
                    comments: [
                        ...state.comments.slice(0, index),
                        ...state.comments.slice(index + 1)
                    ]
                };
            }
            break;
        }

        case ACTIONS.RESET_DF_ADD_EDIT:
            return initialState;

        case ACTIONS.RCV_DEFECT:
            return {
                ...initialState,
                ...action.defect
            };
    }
    return state;
};

export default addEditDefect;
