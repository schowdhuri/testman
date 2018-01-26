import { combineReducers } from "redux";

import isLoading from "./Shared/isLoading";
import testDesign from "./TestDesign";

const rootReducer = combineReducers({
    isLoading,
    testDesign
});

export default rootReducer;
