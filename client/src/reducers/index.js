import { combineReducers } from "redux";

import defects from "./Defects";
import execCycle from "./ExecCycle";
import isLoading from "./Shared/isLoading";
import testDesign from "./TestDesign";
import testSelector from "./TestSelector";

import groupMultiSelect from "reducers/Shared/GroupMultiSelect";

const rootReducer = combineReducers({
    defects,
    execCycle,
    isLoading,
    testDesign,
    testSelector,

    groupMultiSelect
});

export default rootReducer;
