import { combineReducers } from "redux";

import list from "./list";
import addEdit from "./addEdit";

const defectsReducer = combineReducers({
    list,
    addEdit
});

export default defectsReducer;
