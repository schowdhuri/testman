import * as ACTIONS from "constants/TestDesignActions";
import {
    RCV_DELETE_ATTACH,
    RCV_DELETE_COMMENT,
    RCV_UPDATE_ATTACH,
    RCV_SAVE_COMMENT
} from "constants/SharedActions";

const initialState = {
    name: "",
    description: {
        value: "",
        attachments: []
    },
    comments: [],
    defects: []
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

        case RCV_SAVE_COMMENT: {

            const { testCase, comment } = action;
            if(!testCase)
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
