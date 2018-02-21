import { combineReducers } from "redux";

import addEdit from "./addEdit";
import list from "./list";
import testRun from "./testRun";
import testRuns from "./testRuns";
import testSelector from "./testSelector";

const execCycleReducer = combineReducers({
    addEdit,
    list,
    testRun,
    testRuns,
    testSelector
});

export default execCycleReducer;
