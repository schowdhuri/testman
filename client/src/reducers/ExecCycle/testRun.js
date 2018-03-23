import * as ACTIONS from "constants/ExecCyclesActions";
import { RCV_DELETE_DEFECT } from "constants/DefectsActions";
import { RCV_SAVE_COMMENT, RCV_DELETE_COMMENT } from "constants/SharedActions";

const initialState = {
    name: "",
    testCase: {},
    defects: [],
    comments: [],
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
                name: action.testRun.testCase.name,
                defects: action.testRun.defects || []
            };

        case ACTIONS.RCV_ADD_NEW_DEFECT: {
            const { defect } = action;
            if(!state.defects.find(d => d.id==defect.id)) {
                return {
                    ...state,
                    defects: [
                        ...state.defects,
                        defect
                    ]
                };
            }
            break;
        }

        case ACTIONS.RCV_LINK_DEFECTS: {
            const { defects } = action;
            const newDefects = [];
            defects.forEach(defect => {
                if(!state.defects.find(d => d.id==defect.id)) {
                    newDefects.push(defect)
                }
            });
            return {
                ...state,
                defects: [
                    ...state.defects,
                    ...newDefects
                ]
            };
        }

        case RCV_DELETE_DEFECT:
        case ACTIONS.RCV_UNLINK_DEFECT: {
            const { defect } = action;
            const index = state.defects.findIndex(d => d.id==defect.id);
            if(index != -1) {
                return {
                    ...state,
                    defects: [
                        ...state.defects.slice(0, index),
                        ...state.defects.slice(index + 1)
                    ]
                };
            }
            break;
        }

        case RCV_SAVE_COMMENT: {
            const { comment } = action;
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

        case ACTIONS.RESET_TR_ADD_EDIT:
            return initialState;
    }
    return state;
};

export default addEditExecCycle;
