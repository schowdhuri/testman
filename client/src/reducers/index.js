import { combineReducers } from "redux";

import defects from "./Defects";
import defectSelector from "./DefectSelector";
import execCycle from "./ExecCycle";
import isLoading from "./Shared/isLoading";
import testDesign from "./TestDesign";
import testSelector from "./TestSelector";

import groupMultiSelect from "reducers/Shared/GroupMultiSelect";

const rootReducer = combineReducers({
    defects,
    defectSelector,
    execCycle,
    isLoading,
    testDesign,
    testSelector,

    groupMultiSelect
});

export default rootReducer;
