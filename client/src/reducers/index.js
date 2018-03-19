import { combineReducers } from "redux";

import defects from "./Defects";
import defectSelector from "./DefectSelector";
import execCycle from "./ExecCycle";
import isLoading from "./Shared/isLoading";
import session from "./Shared/session";
import testDesign from "./TestDesign";
import testSelector from "./TestSelector";
import users from "./Shared/users";

import groupMultiSelect from "reducers/Shared/GroupMultiSelect";

const rootReducer = combineReducers({
    defects,
    defectSelector,
    execCycle,
    isLoading,
    session,
    testDesign,
    testSelector,
    users,

    groupMultiSelect
});

export default rootReducer;
