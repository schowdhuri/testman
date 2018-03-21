import * as ACTIONS from "constants/DefectsActions";
import {
    RCV_DELETE_ATTACH,
    RCV_DELETE_COMMENT,
    RCV_UPDATE_ATTACH,
    RCV_SAVE_COMMENT
} from "constants/SharedActions";

const initialState = {
    assignee: null,
    name: "",
    description: {
        value: "",
        attachments: []
    },
    comments: [],
    testCases: []
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

        case RCV_SAVE_COMMENT: {

            const { defect, comment } = action;
            if(!defect)
                break;
            const index = state.comments.findIndex(c => c.id==comment.id);
            if(index == -1) {
                return {
                    ...state,
                    comments: [
                        comment,
                        ...state.comments,
                    ]
                };
            }
            return {
                ...state,
                comments: [
                    ...state.comments.slice(0, index),
                    comment,
                    ...state.comments.slice(index + 1)
                ]
            };
        }

        case RCV_DELETE_COMMENT: {
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

        case RCV_DELETE_ATTACH: {
            const { attachment } = action;
            const index = state.description.attachments.findIndex(a => a.id==attachment.id);
            if(index != -1) {
                return {
                    ...state,
                    description: {
                        ...state.description,
                        attachments: [
                            ...state.description.attachments.slice(0, index),
                            ...state.description.attachments.slice(index + 1),
                        ]
                    }
                };
            }
            // check all comment attachments
            const comments = state.comments.map(comment => {
                const index = comment.attachments.findIndex(a => a.id==attachment.id);
                if(index != -1) {
                    return {
                        ...comment,
                        attachments: [
                            ...comment.attachments.slice(0, index),
                            ...comment.attachments.slice(index + 1),
                        ]
                    };
                }
                return comment;
            });
            return {
                ...state,
                comments
            };
        }

        case RCV_UPDATE_ATTACH: {
            const { attachment } = action;
            const index = state.description.attachments.findIndex(a => a.id==attachment.id);
            if(index != -1) {
                return {
                    ...state,
                    description: {
                        ...state.description,
                        attachments: [
                            ...state.description.attachments.slice(0, index),
                            attachment,
                            ...state.description.attachments.slice(index + 1),
                        ]
                    }
                };
            }
            // check all comment attachments
            const comments = state.comments.map(comment => {
                const index = comment.attachments.findIndex(a => a.id==attachment.id);
                if(index != -1) {
                    return {
                        ...comment,
                        attachments: [
                            ...comment.attachments.slice(0, index),
                            attachment,
                            ...comment.attachments.slice(index + 1),
                        ]
                    };
                }
                return comment;
            });
            return {
                ...state,
                comments
            };
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
