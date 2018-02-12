import { combineReducers } from "redux";

import addEdit from "./addEdit";
import list from "./list";
import testRuns from "./testRuns";
import testSelector from "./testSelector";

const execCycleReducer = combineReducers({
    addEdit,
    list,
    testRuns,
    testSelector
});

export default execCycleReducer;
