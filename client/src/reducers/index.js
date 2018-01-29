import { combineReducers } from "redux";

import defects from "./Defects";
import isLoading from "./Shared/isLoading";
import testDesign from "./TestDesign";

const rootReducer = combineReducers({
    defects,
    isLoading,
    testDesign
});

export default rootReducer;
