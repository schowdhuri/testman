import { combineReducers } from "redux";

import defects from "./Defects";
import isLoading from "./Shared/isLoading";
import testDesign from "./TestDesign";

import groupMultiSelect from "reducers/Shared/GroupMultiSelect";

const rootReducer = combineReducers({
    defects,
    isLoading,
    testDesign,

    groupMultiSelect
});

export default rootReducer;
