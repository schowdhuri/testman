import * as ACTIONS from "constants/ExecCyclesActions";
import { RCV_EC_SAVE, RCV_IMPORT_TESTS } from "constants/TestCaseSelectorActions";

const initialState = {
    name: "",
    testCase: {},
    defects: [],
    comments: [],
    newComment: {},
    status: "New"
};

const addEditExecCycle = (state=initialState, action) => {
    const { type } = action;
    switch(type) {
        case ACTIONS.RCV_TEST_RUN:
        case ACTIONS.RCV_SAVE_TR:
            return {
                ...initialState,
                ...action.testRun,
                name: action.testRun.testCase.name
            };

        case ACTIONS.RCV_TR_COMMENTS:
            return {
                ...state,
                comments: action.comments
            };

        case ACTIONS.RCV_TR_DEFECTS:
            return {
                ...state,
                defects: action.defects
            };

        case ACTIONS.CHANGE_TR_COMMENT:
            return {
                ...state,
                newComment: action.value
            };

        case ACTIONS.RCV_SAVE_TR_COMMENT: {
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

        case ACTIONS.RESET_TR_ADD_EDIT:
            return initialState;
    }
    return state;
};

export default addEditExecCycle;
