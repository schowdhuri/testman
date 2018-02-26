import { combineReducers } from "redux";

import addEdit from "./addEdit";
import importTestDialog from "./importTestDialog";
import list from "./list";
import testRun from "./testRun";
import testRuns from "./testRuns";

const execCycleReducer = combineReducers({
    addEdit,
    importTestDialog,
    list,
    testRun,
    testRuns
});

export default execCycleReducer;
