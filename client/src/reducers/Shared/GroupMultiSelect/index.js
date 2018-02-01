import { combineReducers } from "redux";

import { INIT, DESTROY } from "constants/GroupMultiSelectActions";

import filterText from "./filterText";
import path from "./path";
import selectedItems from "./selectedItems";

const reducer = combineReducers({
    filterText,
    path,
    selectedItems
});

const initialState = {};

const rootReducer = (state=initialState, action) => {
    const { type } = action;
    let newState;
    switch(type) {
        case INIT:
            if(!state[action.cid]) {
                return {
                    ...state,
                    ...{
                        [action.cid]: reducer({
                            selectedItems: action.selectedItems
                        }, action)
                    }
                };
            } else if(action.cid in state) {
                return {
                    ...state,
                    ...{ [action.cid]: reducer(state[action.cid], action) }
                };
            }
            break;

        case DESTROY:
            if(action.cid in state) {
                newState = { ...state };
                delete newState[action.cid];
                return newState;
            }
            break;

        default:
            if(action.cid in state) {
                return {
                    ...state,
                    ...{ [action.cid]: reducer(state[action.cid], action) }
                };
            }
            break;
    }
    return state;
};

export default rootReducer;
