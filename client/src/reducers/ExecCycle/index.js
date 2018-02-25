import { combineReducers } from "redux";

import addEdit from "./addEdit";
import list from "./list";
import testRun from "./testRun";
import testRuns from "./testRuns";

const execCycleReducer = combineReducers({
    addEdit,
    list,
    testRun,
    testRuns
});

export default execCycleReducer;
