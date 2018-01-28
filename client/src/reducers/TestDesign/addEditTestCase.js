import * as ACTIONS from "constants/TestDesignActions";

const initialState = {
    name: "",
    description: {
        value: ""
    },
    comments: [],
    defects: [],
    newComment: ""
};

const testCases = (state=initialState, action) => {
    const { type } = action;
    switch(type) {
        case ACTIONS.CHANGE_TC_DESCR:
            return {
                ...state,
                description: {
                    ...state.description,
                    value: action.value
                }
            };

        case ACTIONS.CHANGE_TC_NAME:
            return {
                ...state,
                name: action.value
            };

        case ACTIONS.CHANGE_TC_COMMENT:
            return {
                ...state,
                newComment: action.value
            };

        case ACTIONS.RCV_SAVE_TC_COMMENT: {
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

        case ACTIONS.RESET_TC_ADD_EDIT:
            return initialState;

        case ACTIONS.RCV_TEST_CASE:
            return {
                ...initialState,
                ...action.testCase
            };
    }
    return state;
};

export default testCases;
