import { combineReducers } from "redux";

import testPlans from "./testPlans";
import addEdit from "./addEdit";

const designReducer = combineReducers({
    testPlans,
    addEdit
});

export default designReducer;
